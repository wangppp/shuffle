package main

import (
	"strings"
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	
	"github.com/unrolled/render"
)



var (
	formatter = render.New(render.Options{IndentJSON: true})
)

func TestCreateMatch(t *testing.T) {
	// use go 内置test服务器，来测试我们的handler
	client := http.Client{}
	server := httptest.NewServer(http.HandlerFunc(createMatchHandler(formatter)))
	defer server.Close()

	body := []byte(`{
		\"gridsize\": 19,
		\"players\": [
			{
				\"name\": \"bob\",
				\"color\": \"white\"
			},
			{
				\"name\": \"alfred\",
				\"color\": \"black\"
			}
		]
	}`)

	req, err := http.NewRequest("POST",
		server.URL, bytes.NewBuffer(body))
	
	if err != nil {
		t.Errorf("Err in creating POST request for createMatchHandler: %v", err)
	}
	
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		t.Errorf("Error in POST to createMatchHandler: %v", err)
	}

	defer res.Body.Close()

	payload, err := ioutil.ReadAll(res.Body)

	if err != nil {
		t.Errorf("Error reading response body: %v", err)
	}

	if res.StatusCode != http.StatusCreated {
		t.Errorf("Expected response status 201, recived: %s", res.Status)
	}

	if loc, ok := res.Header["Location"]; !ok {
		t.Error("Location header is not set")
	} else {
		if !strings.Contains(loc[0], "/matches/") {
			t.Errorf("Location header should contain '/matchs/'")
		}

		if len(loc[0]) != len(FakeMatchLocationRes) {
			t.Errorf("Location header does not contain guid of new match")
		}
	}

	fmt.Printf("Payload: %s", string(payload))

}