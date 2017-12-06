package service

import (
	"encoding/json"
	"log"
	"net/http"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
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
		err := Db.CreateTable(&Article{}, nil)
		if err != nil {
			log.Print(err)
			panic(nil)
		}
		w.Write([]byte("Create table successfully!"))
	})

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
