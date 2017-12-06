import { SET_ARTICLE_LIST } from './actionTypes'
import http from '../../utils/http'

export const setArticleList = (list) => ({
    type: SET_ARTICLE_LIST,
    list
})

export const getArticleListFromServe = (dispatch) => {
    return async (dispatch) => {
        const { data } = await http.get('/article')
        dispatch(setArticleList(data.data))
    }
}


