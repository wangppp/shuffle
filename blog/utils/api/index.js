const fetch = require('axios')
const baseUrl = process.env.APP_ENV !== 'production' ? 'http://localhost:5000/api/v1/public' : '//goapp:4000/api/v1/public'
// const baseUrl = 'http://localhost:5000/api/v1/public'

function getUrl(url) {
    return `${baseUrl}${url}`
}

export const getArticles = async function () {
    const { data } = await fetch(getUrl('/articles'))
    return data.data
}

export const getArticleByEnTitle = async function (en_title) {
    const { data } = await fetch(getUrl('/article'), {
        params: { en_title }
    })
    return data.data
}
