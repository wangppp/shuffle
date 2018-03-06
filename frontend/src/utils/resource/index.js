import http from '../http';
import { isLogin } from '../auth';
import { store } from '../../index';
import { listChange } from '../../modules/media/actions';

const RESOURCES_KEY = 'img_resources';

function checkListIsSet() {
  return Array.isArray(localStorage.getItem(RESOURCES_KEY));
}

// 从完整的url获取缩略图url
export function getThumbnailSrc(imageUrl) {
  const split_src = imageUrl.split("upload/")
  if (split_src.length === 2) {
    return split_src[0] + "upload/t_media_lib_thumb/" + split_src[1];
  }
  return "";
}

// 初始化localStorage里的数据
export async function initImageList() {
  // 检查是否为空
  console.log("123")
  if( !checkListIsSet() || getImageListByPage().length === 0 ) {
    setImageListToLocalStorage();
    if (isLogin) {
      const  { data } = await http.get("/admin/picture-list");
      setImageListToLocalStorage(data.data);
      store.dispatch(listChange(data.data));
    }
  }
}

// 刷新localStorage里的数据
export const getFreshLocalStorage = async () => {
    if (isLogin) {
      const  { data } = await http.get("/admin/picture-list");
      setImageListToLocalStorage(data);
      return data;
    }
    return [];
}

// 将数据存储到localStorage
export function setImageListToLocalStorage(list = []) {
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
}

// 获取指定页的图片列表切片
export function getImageListByPage(page = 1) {
  const pagesize = 10
  const start = pagesize * (page - 1);
  const end = pagesize * page;
  // 内存使用待优化
  const list = JSON.parse(localStorage.getItem(RESOURCES_KEY));
  return {
    list: list.slice(start, end),
    count: list.length
  };
}

export function getImageListLength() {
  
}
