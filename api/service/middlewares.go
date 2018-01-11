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
	"github.com/wangppp/shuffle/api/config"
	"golang.org/x/crypto/bcrypt"
)

// my token secret
var mySigningKey = []byte("secret")

var customizeMiddleware = negroni.HandlerFunc(func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	Db = GetPgOrm()
	setCrossOriginSite(w)
	// 手动调用下一个middleware
	if r.Method != "OPTIONS" {
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

var jwtMiddleWare = negroni.HandlerFunc(jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
}).HandlerWithNext)

// LoginHandler login
var LoginHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 登录校验
	username := r.FormValue("username")
	password := r.FormValue("password")

	user := User{}
	err := Db.Model(&user).Where("name = ?", username).
		Limit(1).
		Select()

	if err != nil {
		httpReturnError(w, "No user or invalid password!")
		panic(nil)
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

	httpReturnJSON(w, result)
})

// GetTokenHandlerAfterLogin 将穿进去的匿名函数转化为HandlerFunc 类型, 实际上是一个类型转化过程
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
	w.Header().Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	w.Header().Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
}

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
		AuthorId:  1,
		Content:   post.Content,
		Views:     0,
		Comments:  0,
		CreatedAt: time.Now().Unix(),
		UpdatedAt: time.Now().Unix(),
		Tag:       post.Tag,
		PostState: post.PostToIndex,
	}

	err = Db.Insert(&article)
	if err == nil {
		httpReturnJSON(w, map[string]interface{}{
			"success": true,
		})
	}
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
		Id:      int64(id),
		Content: post.Content,
	}

	_, err = Db.Model(&article).Set("content = ?content").Where("id = ?id").Update()

	handleErr(err)

	httpReturnJSON(w, jsonResponse{Status: true})
})

// GetArticles 获取所有文章的列表
var GetArticles = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var articles []Article
	err := Db.Model(&articles).Column("article.id", "article.title", "article.en_title", "article.tag", "article.created_at", "article.updated_at", "Author").Select()
	handleErr(err)

	httpReturnJSON(w, articles)
	log.Print("App request!")
})

// GetArticleByID 获取ID文章
var GetArticleByID = func(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	articleID := vars["id"]
	intID, err := strconv.Atoi(articleID)
	handleErr(err)
	article := ViewArticle{
		Id: int64(intID),
	}
	err = Db.Select(&article)
	handleErr(err)
	httpReturnJSON(w, article)
}

// GetArticleByTitle 根据en_title 来获取文章
var GetArticleByTitle = func(w http.ResponseWriter, r *http.Request) {
	enTitle := r.URL.Query().Get("en_title")
	if enTitle != "" {
		article := ViewArticle{}
		err := Db.Model(&article).Where("en_title = ?", enTitle).Limit(1).Select()
		if err != nil {
			// handleErr(err)
			httpReturnError(w, "文章不存在")
			return
		}
		httpReturnJSON(w, article)
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
	httpReturnJSON(w, map[string]interface{}{
		"tag_options": dashboardData,
	})
}
