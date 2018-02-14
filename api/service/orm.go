package service

import (
	"fmt"

	"github.com/go-pg/pg"
)

// User user model
type User struct {
	ID           int64    `json:"-"`
	Name         string   `json:"name"`
	Emails       []string `json:"-"`
	PasswordSalt string   `json:"-"`
	PasswordHash string   `json:"-"`
	Role         int16    `json:"-"`
}

func (u User) String() string {
	return fmt.Sprintf("User<%d %s %v>", u.ID, u.Name, u.Emails)
}

// LoginToken table model struct 短信token等登录信息表
type LoginToken struct {
	TableName struct{} `sql:"logintokens"`
	ID int64 `json:"id"`
	User *User `json:"user"`
	UserID int64 `json:"user_id"`
	SmsToken string `json:"sms_token"`
	SmsExpire int64 `json:"sms_expire"`
}


// Article model struct
type Article struct {
	ID        int64                  `json:"id"`
	Title     string                 `json:"title"`
	HeroImg   string                 `json:"hero_img"`
	EnTitle   string                 `json:"en_title"`
	AuthorID  int64                  `json:"-"`
	Author    *User                  `json:"author"`
	Content   map[string]interface{} `json:"-"`
	Tag       string                 `json:"tag"`
	Views     int64                  `json:"views"`
	Comments  int64                  `json:"-"`
	CreatedAt int64                  `json:"created_at"`
	UpdatedAt int64                  `json:"updated_at"`
	PostState bool                   `json:"post_state"`
}

// ViewArticle table orm model
type ViewArticle struct {
	TableName struct{}               `sql:"articles"`
	ID        int64                  `json:"id"`
	Title     string                 `json:"title"`
	HeroImg   string                 `json:"hero_img"`
	EnTitle   string                 `json:"en_title"`
	AuthorID  int64                  `json:"-"`
	Author    *User                  `json:"author"`
	Content   map[string]interface{} `json:"content"`
	Tag       string                 `json:"tag"`
	Views     int64                  `json:"views"`
	Comments  int64                  `json:"-"`
	CreatedAt int64                  `json:"created_at"`
	UpdatedAt int64                  `json:"updated_at"`
	PostState bool                   `json:"post_state"`
}



// Db 全局的数据库链接
var Db *pg.DB

// GetPgOrm 获取数据库链接对象
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

func handleErr(err error) {
	if err != nil {
		panic(err)
	}
}
