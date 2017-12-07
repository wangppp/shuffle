package service

import (
	"github.com/go-pg/pg/orm"
	"encoding/json"
	"log"
	"net/http"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"strconv"
)

// NewServer configures and return a Server
func NewServer() *negroni.Negroni {
	// 将public目录作为静态资源目录
	n := negroni.Classic()

	// 使用USE来加入中间件use -> Middleware
	n.Use(negroni.HandlerFunc(customizeMiddleware))

	// mx 是一个实现了http.Handler interface的 struct 的实体
	mx := mux.NewRouter()
	initRoutes(mx)

	// 传http.Handler struct
	n.UseHandler(mx)
	return n
}

func initRoutes(mx *mux.Router) {
	
	// init all routes here
	mx.HandleFunc("/api/v1/login", LoginHandler).Methods("POST")
	mx.HandleFunc("/api/v1/get-token", GetTokenHandler).Methods("GET")
	mx.Handle("/api/v1/products", negroni.New(
		negroni.HandlerFunc(jwtMiddleWare.HandlerWithNext),
		negroni.HandlerFunc(func(w http.ResponseWriter, r *http.Request, n http.HandlerFunc) {
			// check token whether it is valid!
			// if such as expired time is valid, then go to next handler...
			if true {
				log.Print("Authorization pass")
				n(w, r)
			}
		}),
		negroni.Wrap(ProductsHandler),
	)).Methods("GET")

	mx.HandleFunc("/api/v1/createnewtable", func (w http.ResponseWriter, r *http.Request) {
		user := User{}
		err := Db.Model(&user).
			Where("name = ?", "Adam").
			Limit(1).
			Select()
		log.Print(err)
		if err != nil {
			// 不存在管理员的话就新建表
			for _, model := range []interface{}{
				&User{},
				&Article{},
			} {
				err := Db.CreateTable(model, &orm.CreateTableOptions{IfNotExists: true})
				handleErr(err)
			}

			err := Db.Insert(&User{
				Name: "Adam",
				PasswordHash: "$2a$04$w1CC5RcMTcgYk27B6DkMb.6slCJVkEH5i//0Y3kGCYh3glRU1KVOC",
				Role: 7,
			})
			handleErr(err)
			w.Write([]byte("Init table successfuly"))
		} else {
			w.Write([]byte("No need to init database"))
		}

	}).Methods("GET")

	mx.HandleFunc("/api/v1/getarticles", func (w http.ResponseWriter, r *http.Request) {
		var articles []Article
		err := Db.Model(&articles).Select()
		if (err == nil) {
			res, _ := json.Marshal(articles)
			w.Write(res)
		}
	})

	mx.HandleFunc("/api/v1/article", SaveArticle).Methods("POST")
	mx.HandleFunc("/api/v1/article", GetArticles).Methods("GET")

	mx.HandleFunc("/api/v1/article/{id:[0-9]+}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		articleID := vars["id"]
		intID, err := strconv.Atoi(articleID)
		handleErr(err)
		article := ViewArticle{
			Id: int64(intID),
		}
		err = Db.Select(&article)
		handleErr(err)
		httpReturnJSON(w, article)
	}).Methods("GET")

	// CRUD
	// mx.HandleFunc("/api/v1/get_users", func(w http.ResponseWriter, r *http.Request) {
	// 	type UserResults struct {
	// 		Name string `json:"name"`
	// 		Users []User `json:"users"`
	// 	}
	// 	var users []User
	// 	err := Db.Model(&users).Select()
	// 	handleErr(err)
	// 	res := UserResults{
	// 		"ok",
	// 		users,
	// 	}
	// 	resjson, err := json.Marshal(res)
	// 	handleErr(err)
	// 	w.Write(resjson)
	// 	w.Header().Add("Content-Type", "application/json")
	// })

	// mx.HandleFunc("/api/v1/insert_users", func(w http.ResponseWriter, r *http.Request) {
	// 	user1 := &User{
	// 		Name:   "Adam",
	// 		Emails: []string{"adam@gmail", "wang@gmail"},
	// 	}
	// 	err := Db.Insert(user1)
	// 	handleErr(err)
	// 	w.Write([]byte("sucessfully insert users"))
	// })

	// mx.HandleFunc("/api/v1/insert_stories", func(w http.ResponseWriter, r *http.Request) {
	// 	story := Story{Title: "Bad Romance", AuthorId: 1}
	// 	Db.Insert(&story)
	// 	w.Write([]byte("Insert story successfully"))
	// })

	// mx.HandleFunc("/api/v1/story", func(w http.ResponseWriter, r *http.Request) {
	// 	var story Story
	// 	err := Db.Model(&story).Column("story.*", "Author").
	// 	Where("story.id= ?", 1).
	// 	Select()
	// 	handleErr(err)

	// 	res, err := json.Marshal(story)
	// 	handleErr(err)

	// 	w.Write(res)
	// 	w.Header().Add("Content-Type", "application/json")
	// })
}
