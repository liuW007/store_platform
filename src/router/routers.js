import Login from '@/views/login/login.vue'
import ShopManage from '@/views/client-manage/shop-manage/shop-manage.vue'

/**
 * @description 所有路由组件及路径
 */
export default [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'ShopManage',
        component: ShopManage
    }
]