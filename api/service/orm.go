package service

import (
	"fmt"

	"github.com/go-pg/pg"
)

// User user model
type User struct {
	Id           int64    `json:"-"`
	Name         string   `json:"name"`
	Emails       []string `json:"emails"`
	PasswordSalt string   `json:"-"`
	PasswordHash string   `json:"-"`
	Role         int16    `json:"role"`
}

func (u User) String() string {
	return fmt.Sprintf("User<%d %s %v>", u.Id, u.Name, u.Emails)
}

// Story story model struct
type Story struct {
	Id       int64
	Title    string
	AuthorId int64
	Author   *User
}

func (s Story) String() string {
	return fmt.Sprintf("Story <%d %s %s>", s.Id, s.Title, s.Author)
}

var Db *pg.DB

func GetPgOrm() *pg.DB {
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
