/**
 * @description 引入各个接口文件夹，再填入到api对象中
 */
import * as api_client from './client'

const api = {
    ...api_client
}

export default api;