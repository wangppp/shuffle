import { SET_ARTICLE_LIST, SET_ARTICLE_CONTENT } from './actionTypes'
import { EditorState } from 'draft-js'

// 初始化状态放在reducer 里
// 初始化的文章状态用 draftjs 里EditorState.createEmpty 来创建
export default (state = { 
    article_list: [],
    article_content: EditorState.createEmpty()
}, action) => {
    switch (action.type) {
        case SET_ARTICLE_LIST:
            return {
                ...state,
                article_list: action.list
            }
        case SET_ARTICLE_CONTENT:
            return {
                ...state,
                article_content: action.article_content
            }
        default:
            return state;
    }
}
