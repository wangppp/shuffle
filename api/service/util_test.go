package service

import (
	"fmt"
	"testing"
)

func TestSendSMS(t *testing.T) {
	err := sendSMS("测试发送消息")
	if err != nil {
		t.Errorf("发送消息失败: %v", err)
	} else {
		fmt.Println("发送成功")
	}
}

func TestGenerateRandomNumberToken(t *testing.T) {
	// test generating 6 length random token
	token := getRandIntToken(6)
	anotherToken := getRandIntToken(6)
	if token == anotherToken {
		t.Errorf("失败，连续生成两个相同token")
	} else {
		fmt.Println("测试成功")
	}
}