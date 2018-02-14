package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"strconv"
	"math/rand"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sns"
	"os"
)

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
func httpReturnJSON(w http.ResponseWriter, result interface{}) {
	resultJSON, _ := json.Marshal(jsonResponse{result, true, ""})

	w.Header().Add("Content-Type", "application/json")
	w.Write(resultJSON)
}

// 生成指定位数的随机验证码
func getRandIntToken(n int) string {
	s := ""
	for i := 0; i < n; i++ {
		s = s + strconv.Itoa(rand.Intn(10))
	}
	return s
}

// AWS sns 发送短信
//
func sendSMS(msg string) error {
	fmt.Println("creating session")
	sess := session.Must(session.NewSession())
	fmt.Println("session created")

	svc := sns.New(sess)
	fmt.Println("service created")

	params := &sns.PublishInput{
		Message: aws.String(msg),
		PhoneNumber: aws.String(os.Getenv("GVOICE_NUMBER")),
	}
	resp, err := svc.Publish(params)

	if err != nil {
		// Print the error, cast err to awserr.Error to get the Code and
		// Message from an error.
		fmt.Println(err.Error())
		return err
	}

	// Pretty-print the response data.
	fmt.Println(resp)
	return nil
}
