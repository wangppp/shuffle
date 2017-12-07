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

	api := mx.PathPrefix("/api/v1").Subrouter().StrictSlash(true)

	initRoutes(api)

	// 传http.Handler struct
	n.UseHandler(api)
	n.Use(negroni.HandlerFunc(func (w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
		log.Print("THe last out put?!")
		Db.Close()
	}))
	return n
}

func initRoutes(mx *mux.Router) {
	
	// init all routes here
	mx.HandleFunc("/login", LoginHandler).Methods("POST")
	mx.HandleFunc("/get-token", GetTokenHandler).Methods("GET")
	mx.Handle("/products", negroni.New(
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

	mx.HandleFunc("/createnewtable", func (w http.ResponseWriter, r *http.Request) {
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

	mx.HandleFunc("/getarticles", func (w http.ResponseWriter, r *http.Request) {
		var articles []Article
		err := Db.Model(&articles).Select()
		if (err == nil) {
			res, _ := json.Marshal(articles)
			w.Write(res)
		}
	})

	mx.HandleFunc("/article", SaveArticle).Methods("POST")
	mx.HandleFunc("/article", GetArticles).Methods("GET")

	mx.HandleFunc("/article/{id:[0-9]+}", func(w http.ResponseWriter, r *http.Request) {
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
	
}
