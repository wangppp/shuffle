package main

import (
	"os"
	_ "github.com/lib/pq"
	"github.com/wangppp/shuffle/api/service"
)

func main() {
	// testPgOrm()
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "4000"
	}
	server := service.NewServer()
	server.Run(":" + port)
}

func handleErr(err error) {
	if err != nil {
		panic(err)
	}
}
