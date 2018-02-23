import { SET_LOGIN, SET_NEW_CONTENT, SET_FORM_VALUE, OPEN_DASHBOARD_LOADING, CLOSE_DASHBOARD_LOADING, SET_TAG_OPTIONS, EMPTY_FORM_VALUE, SHOW_SUCCESS_MSG, HIDE_SUCCESS_MSG } from './actionTypes';
import { isLogin } from '../../utils/auth';
import { EditorState } from 'draft-js';

const cloneDeep = require('lodash/cloneDeep');
const emptyForm = {
  head_title: '',
  en_title: '',
  hero_img: '',
  hero_img_thumbnail: '',
  tag: '',
  post_to_index: true
};

function getThumbnailSrc(heroImgSrc) {
  const split_src = heroImgSrc.split("upload/")
  if (split_src.length === 2) {
    return split_src[0] + "upload/t_media_lib_thumb/" + split_src[1]
  }
  return ""
}

// 初始化state， 在各自的 reducers 里
export default (state = { 
  isLogin: isLogin(),
  form_loading: false,
  new_article_content: EditorState.createEmpty(),
  tag_options: [],
  form_value: {...emptyForm},
  show_success_msg: false
}, action) => {
  switch(action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: action.isLogin
      };
    }
    case OPEN_DASHBOARD_LOADING: {
      return {
        ...state,
        form_loading: true
      }
    }
    case CLOSE_DASHBOARD_LOADING: {
      return {
        ...state,
        form_loading: false
      }
    }
    case SHOW_SUCCESS_MSG: {
      return {
        ...state,
        show_success_msg: true
      }
    }
    case HIDE_SUCCESS_MSG: {
      return {
        ...state,
        show_success_msg: false
      }
    }
    case SET_NEW_CONTENT: {
      return {
        ...state,
        new_article_content: action.new_article_content
      }
    }
    case SET_TAG_OPTIONS: {
      return {
        ...state,
        tag_options: action.tag_options
      }
    }
    // 清空表单值
    case EMPTY_FORM_VALUE: {
      let form_value = {...emptyForm};
      return {
        ...state,
        form_value,
        new_article_content: EditorState.createEmpty(),
      };
    }
    // 设置表单值
    case SET_FORM_VALUE: {
      // let {name, value} = action.form_change_value_obj;
      // let new_state = Object.assign({}, state);
      // new_state.form_value[name] = value;
      // console.log(new_state);
      // return new_state;
      let form_value = cloneDeep(state.form_value);
      let {name, value} = action.form_change_value_obj;

      if (name === 'post_to_index') {
        form_value[name] = action.form_change_value_obj.checked;
      } else {
        form_value[name] = value;
      }
      form_value.hero_img_thumbnail = getThumbnailSrc(form_value.hero_img)
      return {
        ...state,
        form_value
      };
    }
    // 
    default:
      return state;
  }
}
