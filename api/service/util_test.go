package service

import (
	"fmt"
	"testing"
)

func TestSendSMS(t *testing.T) {
	err := sendSMSViaTwilio("测试发送消息")
	if err != nil {
		t.Errorf("发送消息失败: %v", err)
	} else {
		fmt.Println("发送成功")
	}
}
