package main

import (
	"net/http"
	
	"github.com/unrolled/render"
)

const (
	// FakeMatchLocationRes match uid example
	FakeMatchLocationRes = "/matches/213fd-1234f-dfdf-454gfkmvc"
)

func createMatchHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		// Add Header.location
		w.Header().Add("Location", FakeMatchLocationRes)
		formatter.JSON(w, http.StatusCreated, struct{
			Test string
		}{
			Test: "this is testing",
		})
	}
}
