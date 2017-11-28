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

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

// func createSchema(db *pg.DB) error {
// 	for _, model := range []interface{}{&User{}, &Story{}} {
// 		err := db.CreateTable(model, nil)
// 		log.Print(model)
// 		if err != nil {
// 			return err
// 		}
// 	}
// 	return nil
// }

func handleErr(err error) {
	if err != nil {
		panic(err)
	}
}
