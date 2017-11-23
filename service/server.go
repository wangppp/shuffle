package service

import (
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
	mx.HandleFunc("/get-token", GetTokenHandler).Methods("GET")
	mx.HandleFunc("/status", StatusHandler).Methods("GET")
	mx.Handle("/product", negroni.New(
		negroni.HandlerFunc(jwtMiddleWare.HandlerWithNext),
		negroni.HandlerFunc(func (w http.ResponseWriter, r *http.Request, n http.HandlerFunc) {
			// check token whether it is valid!
			// if such as expired time is valid, then go to next handler...
			if true {
				log.Print("Authorization pass")
				n(w, r)
			}
		}),
		negroni.Wrap(ProductsHandler),
	)).Methods("GET")
}
