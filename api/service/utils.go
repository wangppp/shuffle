package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
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

func sendSMSViaTwilio(msg string) error {
	var err error
	AccountSid := os.Getenv("SMS_SID")
	AccountToken := os.Getenv("SMS_TOKEN")
	ToNumber := os.Getenv("SMS_TO")
	FromNumber := os.Getenv("SMS_FROM")
	urlStr := "https://api.twilio.com/2010-04-01/Accounts/" + AccountSid + "/Messages.json"

	fmt.Println(urlStr)

	msgData := url.Values{}
	msgData.Set("To", ToNumber)
	msgData.Set("From", FromNumber)
	msgData.Set("Body", msg)
	msgDataReader := *strings.NewReader(msgData.Encode())

	client := &http.Client{}
	req, err := http.NewRequest("POST", urlStr, &msgDataReader)
	if err != nil {
		return err
	}
	req.SetBasicAuth(AccountSid, AccountToken)
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		var data map[string]interface{}
		decoder := json.NewDecoder(resp.Body)
		err := decoder.Decode(&data)
		if err != nil {
			return err
		}
		if err == nil {
			fmt.Println(data["sid"])
		}
	} else {
		res, _ := ioutil.ReadAll(resp.Body)
		fmt.Println(string(res))
		return errors.New("Bad request")
	}

	return err
}
