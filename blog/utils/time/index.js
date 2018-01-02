import moment from 'moment';
import 'moment/locale/zh-cn'

moment.locale("zh-cn")

export function getTime (unixTime) {
    return moment.unix(unixTime).format('llll')
}

export default moment