package service

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/auth0/go-jwt-middleware"
	"github.com/codegangsta/negroni"
	"github.com/dgrijalva/jwt-go"
	"github.com/go-pg/pg/orm"
	"github.com/gorilla/mux"
	"github.com/kyokomi/cloudinary"
	"github.com/wangppp/shuffle/api/config"
	"golang.org/x/crypto/bcrypt"
)

// my token secret
var mySigningKey = []byte("secret")

var customizeMiddleware = negroni.HandlerFunc(func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	Db = GetPgOrm()
	setCrossOriginSite(w)
	// 手动调用下一个middleware
	// 如果是 options 请求则直接返回 200
	if r.Method != http.MethodOptions {
		next(w, r)
	} else {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(""))
	}
})

// endMiddleWare 请求结束的中间件
// 用于关闭数据库链接之类的
var endMiddleWare = negroni.HandlerFunc(func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	Db.Close()
})

// jwt 中间件，解析jwt并验证
var jwtMiddleWare = negroni.HandlerFunc(jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
}).HandlerWithNext)

// smsMiddleWare 验证是否携带了短信验证码中间件
var smsMiddleWare = negroni.HandlerFunc(func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	smsToken := r.FormValue("sms_token")
	if len([]rune(smsToken)) != 6 {
		httpReturnError(w, "smstoken error")
		return
	}
	next(w, r)
})

// LoginHandler login执行登陆验证密码过程
var LoginHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 登录校验
	username := r.FormValue("username")
	password := r.FormValue("password")
	smsToken := r.FormValue("sms_token")

	user := User{}
	loginToken := LoginToken{}

	err := Db.Model(&user).
		Where("name = ?", username).
		Limit(1).
		Select()

	if err != nil {
		httpReturnError(w, "No user or invalid password!")
		return
	}

	err = Db.Model(&loginToken).
		Where("user_id = ?", user.ID).
		Limit(1).
		Select()

	if err != nil {
		httpReturnError(w, "Please request sms token first!")
		return
	}

	// 比对短信验证码是否相同或者过期
	if loginToken.SmsExpire < time.Now().Unix() {
		httpReturnError(w, "sms token is expired, please request again.")
		return
	}
	if loginToken.SmsToken != smsToken {
		httpReturnError(w, "sms token is not match!")
		return
	}

	// 比对密码
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		httpReturnError(w, "No user or invalid password!")
		panic(nil)
	}
	// 通过了登录
	// 返回token
	result := struct {
		Status bool   `json:"status"`
		Token  string `json:"token"`
	}{
		true, generateJWTToken(&user),
	}

	httpReturnJSON(w, result, "")
})

// GetTokenHandlerAfterLogin 将传进去的匿名函数转化为HandlerFunc 类型, 实际上是一个类型转化过程
var GetTokenHandlerAfterLogin = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 本地登录使用用户名和密码哈哈,
	// 如果数据库存储了用户名和密码，那么验证匹配，如果匹配则
	// 签发jwt token
	// 包含权限，用户名，授权过期等
	// create the token
	token := jwt.New(jwt.SigningMethodHS256)

	// create a map to store our claims
	claims := token.Claims.(jwt.MapClaims)

	claims["admin"] = isAdmin(1)
	claims["name"] = "Adam Wang"
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// Sign the token with our secret
	tokenString, _ := token.SignedString(mySigningKey)

	// Finally, write the token to the browser
	w.Write([]byte(tokenString))
})

// 设置跨域
func setCrossOriginSite(w http.ResponseWriter) {
	// set cors origin
	crossSiteOrigin := ""
	if config.GoDev {
		crossSiteOrigin = "*"
	}

	w.Header().Add("Access-Control-Allow-Origin", crossSiteOrigin)
	w.Header().Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control")
	w.Header().Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
}

// GetSmsToken 用户获取短信验证码
var GetSmsToken = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	username := r.FormValue("username")
	user := User{}
	err := Db.Model(&user).Where("name = ?", username).
		Limit(1).
		Select()
	if err != nil {
		httpReturnError(w, "user is not existed")
		panic(nil)
	}
	// 存在用户token，若过期则生成新的token，更新，并发送短信，不过期则不发送
	// 不存在则新增token， 再发送短信
	loginToken := LoginToken{UserID: user.ID}
	userExistErr := Db.Model(&loginToken).Select()
	newExpiredTime := time.Now().Add(time.Minute * 10).Unix()
	if userExistErr != nil {
		// 不存在token，新建token
		token := getRandIntToken(6)
		// 设置10 min后token过期
		loginToken.SmsExpire = newExpiredTime
		loginToken.SmsToken = token
		// 插入新的token
		err = Db.Insert(&loginToken)
		if err != nil {
			httpReturnError(w, "save token err")
			return
		}
		// 发送短信
		err = sendSMS("Your login sms code: " + token + ", valid in 10 minutes")
		if err != nil {
			httpReturnError(w, "sms error")
			return
		}
	} else {
		// token如果相对于现在已经过期
		now := time.Now().Unix()
		if loginToken.SmsExpire < now {
			// 不存在token，新建token
			token := getRandIntToken(6)
			// 设置10 min
			loginToken.SmsExpire = newExpiredTime
			loginToken.SmsToken = token
			// 更新新的token和过期时间
			_, err = Db.Model(&loginToken).Update()
			if err != nil {
				httpReturnError(w, "update error")
				return
			}
			// 发送短信
			err = sendSMS("Your login sms code: " + token + ", valid in 10 minutes")
			if err != nil {
				httpReturnError(w, "sms error")
				return
			}
		}
	}
	httpReturnJSON(w, nil, "sms sent to your phone")
})

// SaveArticle is successfully created!
var SaveArticle = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var post PostArticle
	err := decoder.Decode(&post)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	article := Article{
		Title:     post.HeadTitle,
		EnTitle:   post.EnTitle,
		HeroImg:   post.HeroImg,
		AuthorID:  1,
		Content:   post.Content,
		Views:     0,
		Comments:  0,
		CreatedAt: time.Now().Unix(),
		UpdatedAt: time.Now().Unix(),
		Tag:       post.Tag,
		PostState: post.PostToIndex,
		Thumbnail: post.HeroImgThumbnail,
	}

	err = Db.Insert(&article)
	handleErr(err)
	if err == nil {
		httpReturnJSON(
			w,
			map[string]interface{}{
				"success": true,
			},
			"文章保存成功",
		)
	}
})

// GetInitialData 获取博客首页的渲染配置，比如，首页文章列表，首页配置，首页文章排行
var GetInitialData = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var err error
	initialData := make(map[string]interface{})
	initialData["rank"], err = DbGetArticlesRank(Db)
	initialData["list"], _ = DbGetArticles(Db, 1, true)
	handleErr(err)
	httpReturnJSON(w, initialData, "")
})

// UpdateArticle 更新文章
var UpdateArticle = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var post PostUpdate
	err := decoder.Decode(&post)
	handleErr(err)
	defer r.Body.Close()

	id, err := strconv.Atoi(post.ID)

	article := Article{
		ID:      int64(id),
		Content: post.Content,
	}

	_, err = Db.Model(&article).Set("content = ?content").Where("id = ?id").Update()

	handleErr(err)

	httpReturnJSON(w, jsonResponse{Status: true}, "更新文章成功")
})

// GetArticles 获取所有文章的列表
var GetArticles = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var articles []Article
	articles, err := DbGetArticles(Db, 1, false)
	handleErr(err)
	httpReturnJSON(w, articles, "")
})

// GetArticleByID 获取ID文章
var GetArticleByID = func(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	articleID := vars["id"]
	intID, err := strconv.Atoi(articleID)
	handleErr(err)
	article := ViewArticle{
		ID: int64(intID),
	}
	err = Db.Select(&article)
	handleErr(err)
	httpReturnJSON(w, article, "")
}

// GetArticleByTitle 根据en_title 来获取文章
var GetArticleByTitle = func(w http.ResponseWriter, r *http.Request) {
	enTitle := r.URL.Query().Get("en_title")
	if enTitle != "" {
		article := ViewArticle{}
		// post_state == true 必须为发布状态
		err := Db.Model(&article).
			Where("en_title = ?", enTitle).
			Where("post_state = ?", true).
			Where("show_feed = ?", true).
			Limit(1).Select()
		if err != nil {
			handleErr(err)
			httpReturnError(w, "文章不存在")
			return
		}
		httpReturnJSON(w, article, "")
		// 更新文章访问量
		article.Views++
		Db.Model(&article).Update()
		return
	}
	httpReturnError(w, "参数不全")
}

// CreateInitialTableTestV1 create table api handler test:v1
var CreateInitialTableTestV1 = func(w http.ResponseWriter, r *http.Request) {
	user := User{}
	err := Db.Model(&user).
		Where("name = ?", "Adam").
		Limit(1).
		Select()
	log.Print(err)
	if err != nil {
		// 不存在管理员的话就新建表
		for _, model := range []interface{}{
			&User{},
			&Article{},
		} {
			err := Db.CreateTable(model, &orm.CreateTableOptions{IfNotExists: true})
			handleErr(err)
		}

		err := Db.Insert(&User{
			Name:         "Adam",
			PasswordHash: "$2a$04$w1CC5RcMTcgYk27B6DkMb.6slCJVkEH5i//0Y3kGCYh3glRU1KVOC",
			Role:         7,
		})
		handleErr(err)
		w.Write([]byte("Init table successfuly"))
	} else {
		w.Write([]byte("No need to init database"))
	}

}

// GetDashboardInitialData 获取Dashboard初始化数据
var GetDashboardInitialData = func(w http.ResponseWriter, r *http.Request) {
	dashboardData := []tagOption{
		{"1", "program", "编程"},
		{"2", "literature", "文学"},
	}
	httpReturnJSON(
		w,
		map[string]interface{}{
			"tag_options": dashboardData,
		},
		"",
	)
}

// UploadPicture 上传图片到Cloudinary 图床
var UploadPicture = func(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20)
	file, handler, error := r.FormFile("file")
	defer file.Close()
	handleErr(error)
	ctx := getCloudinaryContext()

	// 上传图片到cloudinary 图床
	error = cloudinary.UploadStaticImage(ctx, handler.Filename, file)
	handleErr(error)

	// 再获取下刚才刚上传的图片的地址
	uploadedImgURL := cloudinary.ResourceURL(ctx, handler.Filename)
	// 返回地址
	httpReturnJSON(w, uploadedImgURL, "")
}

// GetPictureListFromCloudinary 获取图床的列表
var GetPictureListFromCloudinary = func(w http.ResponseWriter, r *http.Request) {
	ctx := getCloudinaryContext()
	res, error := cloudinary.Resources(ctx)
	handleErr(error)
	httpReturnJSON(w, res, "")
}
