import { CHANGE_IMAGE_LIST, CHANGE_PAGE, CHANGE_PAGE_STATE } from './actionTypes';
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
