import moment from 'moment';
import 'moment/locale/zh-cn'

moment.locale("en")

export function getTime (unixTime) {
    return moment.unix(unixTime).format('LL')
}

export default moment