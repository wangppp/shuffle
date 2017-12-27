import { SET_LOGIN, SET_NEW_CONTENT, SET_FORM_VALUE } from './actionTypes';
import { isLogin } from '../../utils/auth';
import { EditorState } from 'draft-js';
const cloneDeep = require('lodash/cloneDeep');

// 初始化state， 在各自的 reducers 里
export default (state = { 
  isLogin: isLogin(),
  new_article_content: EditorState.createEmpty(),
  tag_options: [
    { key: 'm', text: '哲学', value: 'male' },
    { key: 'f', text: '政治', value: 'female' }
  ],
  form_value: {
    head_title: '',
    en_title: '',
    tag: '',
    post_to_index: true
  }
}, action) => {
  switch(action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: action.isLogin
      };
    }
    case SET_NEW_CONTENT: {
      return {
        ...state,
        new_article_content: action.new_article_content
      }
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
      console.log(form_value)
      return {
        ...state,
        form_value
      };
    }
    default:
      return state;
  }
}
