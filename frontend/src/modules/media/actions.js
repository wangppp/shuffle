import { CHANGE_IMAGE_LIST, CHANGE_PAGE, CHANGE_PAGE_STATE, CHANGE_COUNT_AND_LIST, CHANGE_SELECTED_IMG } from './actionTypes';
import { getImageListByPage } from '../../utils/resource';

export function pageChange(page) {
    const { list } = getImageListByPage(page);
    return {
        type: CHANGE_PAGE_STATE,
        payload: {
            page,
            list
        }
    };
}

export function listChange(list) {
    return {
        type: CHANGE_IMAGE_LIST,
        list
    }
}

export const listAndCountChange = ({ list, count }) => ({
    type: CHANGE_COUNT_AND_LIST,
    payload: { list, count }
})

export const selectedImgChange = selected_img => ({
    type: CHANGE_SELECTED_IMG,
    selected_img
})
