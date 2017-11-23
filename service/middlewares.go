package service

import (
	"net/http"
	"encoding/json"
	"time"
	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/unrolled/render"
	"log"
	"github.com/wangppp/shuffle/config"
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

// ProductsHandler 返回产品数据
var ProductsHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	log.Print("fetching products...")
	payload, _ := json.Marshal(products)
	w.Header().Set("Content-Type", "application/json")
	w.Write(payload)
	log.Print("products fetched")
	log.Print(payload)
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

	claims["admin"] = true
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
	w.Header().Add("Content-Type", "text/plain")
}
