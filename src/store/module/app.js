import {
    getMenuByRouter
} from '@/libs/util'
import routers from '@/router/routers'

export default {
    state: {
        errorList: [],
    },
    getters: {
        // 菜单数组
        menuList: (state, getters) => {
            // console.log('routers',routers);
            return getMenuByRouter(routers);
        },
        errorCount: state => state.errorList.length
    },
    mutations: {},
    actions: {}
}