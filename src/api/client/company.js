/**
 * @description 引入封装好的axios文件
 */
import axios from '@/libs/api.request'

/**
 * @description 编写接口路径
 */
export default {
    //查询用户组
    query () {
        return axios.request({
            url: 'api/platform/account/group/query',
            method: 'post'
        })
    },
}