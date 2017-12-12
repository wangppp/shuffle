import { SET_ARTICLE_LIST, SET_ARTICLE_CONTENT, SET_ARTICLE_ID } from './actionTypes'
import { EditorState } from 'draft-js'

// 初始化状态放在reducer 里
// 初始化的文章状态用 draftjs 里EditorState.createEmpty 来创建
export default (state = {
    loading: false,
    current_title: 'Moren title',
    article_id: null,
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
        case SET_ARTICLE_ID:
            return {
                ...state,
                article_id: action.article_id
            }
        default:
            return state;
    }
}
