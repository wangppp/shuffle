package service

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

// NewServer configures and return a Server
// middleware 执行顺序是按照加入的顺序执行
func NewServer() *negroni.Negroni {
	// 将public目录作为静态资源目录
	n := negroni.Classic()
	// mx 是一个实现了http.Handler interface的 struct 的实体
	mx := mux.NewRouter()
	// Init Routes
	initRoutes(mx)
	// 传http.Handler struct
	n.UseHandler(mx)

	return n
}

func initRoutes(mx *mux.Router) {
	// API router init
	// public API such as /login, /index
	publicAPI := mux.NewRouter().PathPrefix("/api/v1/public").Subrouter().StrictSlash(true)
	adminAPI := mux.NewRouter().PathPrefix("/api/v1/admin").Subrouter().StrictSlash(true)
	
	// public routes handles
	publicAPI.HandleFunc("/login", LoginHandler).Methods("POST")

	// admin routes handles
	adminAPI.HandleFunc("/get-token", GetTokenHandler).Methods("GET")
	adminAPI.HandleFunc("/article", SaveArticle).Methods("POST")
	adminAPI.HandleFunc("/article", GetArticles).Methods("GET")
	adminAPI.HandleFunc("/article/{id:[0-9]+}", GetArticle).Methods("GET")

	// 可以将一组路由看成一个模块或控制器
	mx.PathPrefix("/api/v1/admin").Handler(negroni.New(
		customizeMiddleware,
		jwtMiddleWare,
		negroni.Wrap(adminAPI),
		endMiddleWare,
	))

	mx.PathPrefix("/api/v1/public").Handler(negroni.New(
		customizeMiddleware,
		negroni.Wrap(publicAPI),
		endMiddleWare,
	))
}
