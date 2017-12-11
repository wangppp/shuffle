package service

import (
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"log"
	"github.com/codegangsta/negroni"
	"github.com/wangppp/shuffle/api/config"
	"github.com/gorilla/mux"
	"strconv"
)

// my token secret
var mySigningKey = []byte("secret")

var customizeMiddleware = negroni.HandlerFunc(func (w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
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
var endMiddleWare = negroni.HandlerFunc(func (w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
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
	result := struct{
		Status bool `json:"status"`
		Token string `json:"token"`
	} {
		true, generateJWTToken(&user),
	}

	httpReturnJSON(w, result)
})

// GetTokenHandler 将穿进去的匿名函数转化为HandlerFunc 类型, 实际上是一个类型转化过程
var GetTokenHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
	crossSiteOrigin := "";
	if config.GoDev {
		crossSiteOrigin = "http://localhost:3000"
	}

	w.Header().Add("Access-Control-Allow-Origin", crossSiteOrigin)
	w.Header().Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	w.Header().Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
}


type PostArticle struct {
	Title string `json:"title"`
	Content map[string]interface{}  `json:"content"`
}

// SaveArticle is successfully created!
var SaveArticle = http.HandlerFunc(func (w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var post PostArticle
	err := decoder.Decode(&post)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	article := Article{
		Title: "Hello, 世界!",
		AuthorId: 1,
		Content: post.Content,
		Views: 0,
		Comments:0,
		CreatedAt: time.Now().Unix(),
		UpdatedAt: time.Now().Unix(),
	}


	err = Db.Insert(&article)
	if err == nil {
		httpReturnJSON(w, map[string]interface{}{
			"success": true,
		})
	}
})

var GetArticles = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var articles  []Article
	err := Db.Model(&articles).Column("article.id", "article.title", "article.created_at", "article.updated_at", "Author").Select()
	handleErr(err)

	httpReturnJSON(w, articles)
	log.Print("App request!")
})

var GetArticle = func(w http.ResponseWriter, r *http.Request) {
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
