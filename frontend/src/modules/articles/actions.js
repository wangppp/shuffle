import { SET_ARTICLE_LIST, SET_ARTICLE_CONTENT, SET_ARTICLE_ID } from './actionTypes'
import http from '../../utils/http'
import { EditorState, convertFromRaw } from 'draft-js'

export const setArticleList = (list) => ({
    type: SET_ARTICLE_LIST,
    list
})

export const setArticleID = (id) => ({
    type: SET_ARTICLE_ID,
    id
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
        dispatch(setArticleContent(
            EditorState.createWithContent(convertFromRaw(data.data.content)
        )))
    }
}

export const updateExistArticle = (dispatch, id, content) => {
    return async () => {
        const { data } = await http.post(`/admin/article/${id}/update`, {
            id,
            content
        })
        if (data.status === true) {
            alert("保存成功")
            dispatch(setArticleContent(
                EditorState.createEmpty()
            ))
        }
    }
}

