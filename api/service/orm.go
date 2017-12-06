package service

import (
	"fmt"
	"github.com/go-pg/pg"
)

// User user model
type User struct {
	Id           int64    `json:"-"`
	Name         string   `json:"name"`
	Emails       []string `json:"-"`
	PasswordSalt string   `json:"-"`
	PasswordHash string   `json:"-"`
	Role         int16    `json:"-"`
}

func (u User) String() string {
	return fmt.Sprintf("User<%d %s %v>", u.Id, u.Name, u.Emails)
}

// Article model struct
type Article struct {
	Id int64	`json:"-"`
	Title string	`json:"title"`
	AuthorId int64	`json:"-"`
	Author *User	`json:"author"`
	Content map[string]interface{} 	`json:"-"`
	Views int64	`json:"views"`
	Comments int64	`json:"-"`
	CreatedAt int64	`json:"created_at"`
	UpdatedAt int64	`json:"updated_at"`
}

var Db *pg.DB

func GetPgOrm() *pg.DB {
	// Use Middleware to close db
	db := pg.Connect(&pg.Options{
		Addr:     "db:5432",
		User:     "docker",
		Password: "docker",
		Database: "docker",
	})

	// err := createSchema(db)
	// checkErr(err)
	return db
}

func init() {
	Db = GetPgOrm()
}

func handleErr(err error) {
	if err != nil {
		panic(err)
	}
}
