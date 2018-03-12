import { getImageListByPage, } from '../../utils/resource';
import { CHANGE_IMAGE_LIST, CHANGE_PAGE, CHANGE_PAGE_STATE, CHANGE_SELECTED_IMG } from './actionTypes';

const { list, count } = getImageListByPage();

export default (state = {
  // 图片列表
  list: list,
  // 一共多少页
  count: count,
  // 分页
  page: 0,
  // 当前选中的图片地址
  selected_img: ''
}, action) => {
  switch (action.type) {
    case CHANGE_IMAGE_LIST: {
      return {
        ...state,
        list: action.list
      }
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        page: action.page
      }
    }
    case CHANGE_PAGE_STATE: {
      const { page, list } = action.payload;
      return {
        ...state,
        page,
        list
      }
    }
    case CHANGE_SELECTED_IMG: {
      return {
        ...state,
        selected_img: action.selected_img
      }
    }
    default:
      return state;
  }
}