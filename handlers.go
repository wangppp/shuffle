package main

import (
	"net/http"
	
	"github.com/unrolled/render"
)

func createMatchHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		// Add Header.location
		w.Header().Add("Location", "thisis-locationtest")
		formatter.JSON(w, http.StatusCreated, struct{
			Test string
		}{
			Test: "this is testing",
		})
	}
}
