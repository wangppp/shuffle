import { SET_LOGIN, SET_NEW_CONTENT, SET_FORM_VALUE, OPEN_DASHBOARD_LOADING, CLOSE_DASHBOARD_LOADING, SET_TAG_OPTIONS, EMPTY_FORM_VALUE, SHOW_SUCCESS_MSG, HIDE_SUCCESS_MSG } from "./actionTypes";
import http from '../../utils/http';

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// 文章编辑器变动
export const contentChange = (new_content) => ({
  type: SET_NEW_CONTENT,
  new_article_content: new_content
});

// 设置登录状态
export const setLogin = (isLogin) => ({
  type: SET_LOGIN,
  isLogin
});

// 设置表单变更
export const setFormChange = (form_change_value_obj) => ({
  type: SET_FORM_VALUE,
  form_change_value_obj
});

// 获取面板首页的初始化数据（下拉框选项）
export const getDashboardInitData = () => {
  return async (dispatch) => {
    dispatch({type: OPEN_DASHBOARD_LOADING});
    try {
      const { data } = await http.get('/admin/dashbord_init');
      dispatch({type: SET_TAG_OPTIONS, tag_options: data.data.tag_options});
    } catch (error) {
      dispatch({type: CLOSE_DASHBOARD_LOADING});
    }
    dispatch({type: CLOSE_DASHBOARD_LOADING});
  }
}

// 保存文章
export const saveNewArticle = (post) => {
  return async (dispatch) => {
    dispatch({type: OPEN_DASHBOARD_LOADING});
    try {
      const { data } = await http.post('/admin/article', post);
      if (data.status === true) {
        dispatch({type: SHOW_SUCCESS_MSG});
        dispatch({type: EMPTY_FORM_VALUE});
        dispatch({type: CLOSE_DASHBOARD_LOADING});
        await wait(3000);
        dispatch({type: HIDE_SUCCESS_MSG});
      }
    } catch (error) {
      dispatch({type: CLOSE_DASHBOARD_LOADING});
    }
    dispatch({type: CLOSE_DASHBOARD_LOADING});
  }
}