import { SET_ARTICLE_LIST, SET_ARTICLE_CONTENT } from './actionTypes'
import http from '../../utils/http'
import { EditorState, convertFromRaw } from 'draft-js'

export const setArticleList = (list) => ({
    type: SET_ARTICLE_LIST,
    list
})

export const setArticleContent = (article_content) => ({
    type: SET_ARTICLE_CONTENT,
    article_content
})

export const getArticleListFromServe = (dispatch) => {
    return async (dispatch) => {
        const { data } = await http.get('/admin/article')
        dispatch(setArticleList(data.data))
    }
}

export const getArticleContent = (dispatch, articleID) => {
    return async () => {
        const { data } = await http.get(`/admin/article/${articleID}`)
        dispatch(setArticleContent(EditorState.createWithContent(convertFromRaw(data.data.content))))
    }
}

