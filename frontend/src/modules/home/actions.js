import { SET_LOGIN, SET_NEW_CONTENT, SET_FORM_VALUE } from "./actionTypes"


export const contentChange = (new_content) => ({
  type: SET_NEW_CONTENT,
  new_article_content: new_content
});

export const setLogin = (isLogin) => ({
  type: SET_LOGIN,
  isLogin
});

export const setFormChange = (form_change_value_obj) => ({
  type: SET_FORM_VALUE,
  form_change_value_obj
})
