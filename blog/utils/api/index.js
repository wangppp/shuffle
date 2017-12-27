const fetch = require('axios')
const baseUrl = process.env.APP_ENV !== 'production' ? 'http://localhost:5000/api/v1/public' : '//goapp/api/v1/public'


export const getArticles = async function () {
    const { data } = await fetch(`${baseUrl}/articles`)
    return data.data
}