package service

// PostArticle 解析保存文章的结构体
type PostArticle struct {
	HeadTitle        string                 `json:"head_title"`
	HeroImg          string                 `json:"hero_img"`
	EnTitle          string                 `json:"en_title"`
	Tag              string                 `json:"tag"`
	PostToIndex      bool                   `json:"post_to_index"`
	Content          map[string]interface{} `json:"content"`
	HeroImgThumbnail string                 `json:"hero_img_thumbnail"`
}

// PostUpdate 更新文章的结构体
type PostUpdate struct {
	ID      string                 `json:"id"`
	Content map[string]interface{} `json:"content"`
}

const (
	// ADMIN Admin role level
	ADMIN = 7
)

type jsonResponse struct {
	Data    interface{} `json:"data"`
	Status  bool        `json:"status"`
	Message string      `json:"msg"`
}

type tagOption struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	Text  string `json:"text"`
}
