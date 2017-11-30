package service

import (
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/unrolled/render"
	"log"
	"github.com/wangppp/shuffle/api/config"
)

// my token secret
var mySigningKey = []byte("secret")

// Product 产品的结构
type Product struct {
	ID          int
	Name        string
	Slug        string
	Description string
}

var products = []Product{
	Product{1, "Hover Shooters", "hover-shooters", "shoot on your way to the top"},
	Product{2, "Ocean Explorer", "ocean-explorer", "shoot on your way to the top"},
}

func testHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK,
			struct{ Test string }{"this is a test"})
	}
}

func customizeMiddleware(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	log.Print("test custom middleware")
	setCrossOriginSite(w)
	// 手动调用下一个middleware
	if r.Method != "OPTIONS" {
		next(w, r)
	} else {
		log.Print("only for options")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(""))
	}
}

// DefaultHandler just simply return the message "Not Implememted"
func DefaultHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Not Implemented"))
}

// StatusHandler 返回API的状态
var StatusHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("API is running"))
})

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

// ProductsHandler 返回产品数据
var ProductsHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	httpReturnJSON(w, products)
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

var jwtMiddleWare = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	},
	SigningMethod: jwt.SigningMethodHS256,
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