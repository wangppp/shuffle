FROM golang

ARG app_env
ENV APP_ENV $app_env

COPY . /go/src/github.com/wangppp/shuffle/api
WORKDIR /go/src/github.com/wangppp/shuffle/api

RUN go get ./ && go build

# 默认是开发环境，如需切换，写脚本，export APP_ENV=deveploment
CMD if [ ${APP_ENV} = production ]; \
	then \
	api; \
	else \
	go get github.com/pilu/fresh && \
	fresh; \
	fi