package service

import (
	"time"
	"net/http"
	"encoding/json"

	"github.com/dgrijalva/jwt-go"
)

const (
	// ADMIN Admin role level
	ADMIN = 7
)

type jsonResponse struct {
	Data interface{} `json:"data"`
	Status bool `json:"status"`
	Message string `json:"msg"`
}

func isAdmin(role int16) bool {
	return role == ADMIN
}

// 生成JWT token， 为用户
func generateJWTToken(u *User) string {
	// 本地登录使用用户名和密码哈哈,
	// 如果数据库存储了用户名和密码，那么验证匹配，如果匹配则
	// 签发jwt token
	// 包含权限，用户名，授权过期等
	// create the token
	token := jwt.New(jwt.SigningMethodHS256)

	// create a map to store our claims
	claims := token.Claims.(jwt.MapClaims)

	claims["admin"] = isAdmin(u.Role)
	claims["name"] = u.Name
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	// Sign the token with our secret
	tokenString, err := token.SignedString(mySigningKey)
	handleErr(err)

	return tokenString
}

// 格式化错误
func httpReturnError(w http.ResponseWriter, message string) {
	res, _ := json.Marshal(jsonResponse{Status: false, Message: message})
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	w.Write(res)
}

// 格式化返回结果
func httpReturnJSON (w http.ResponseWriter, result interface{}) {
	resultJSON, _ := json.Marshal(jsonResponse{result, true, ""})
	
	w.Header().Add("Content-Type", "application/json")
	w.Write(resultJSON)
}
