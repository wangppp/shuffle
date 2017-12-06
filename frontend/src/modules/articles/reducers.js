import { SET_ARTICLE_LIST } from './actionTypes'

// 初始化状态放在reducer 里
export default (state = { article_list: [] }, action) => {
    switch (action.type) {
        case SET_ARTICLE_LIST:
            return {
                ...state,
                article_list: action.list
            }
        default:
            return state;
    }
}
