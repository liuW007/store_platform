import Login from '@/views/login/login.vue'
import Home from '@/components/home/home'
import CropperTest from '@/views/cropper_test/index'
// 权限
import moduleManage from '@/views/account/module-manage/module-manage.vue'
import manager from '@/views/account/manager/manager.vue'
// 客户
import userManage from '@/views/client-manage/user-manage/user-manage.vue'
import shopManage from '@/views/client-manage/shop-manage/shop-manage.vue'

/**
 * @description 所有路由组件及路径
 */
export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login-登录',
            hideInMenu: true
        },
        component: Login
    },
    {
        path: '/',
        name: '_home',
        redirect: 'home',
        component: Home,
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                },
                component: CropperTest
            }
        ]
    },
    {
        path: '/account',
        name: 'account',
        meta: {
            title: '权限',
        },
        component: Home,
        children: [
            {
                path: '/moduleManage',
                name: 'moduleManage',
                meta: {
                    title: '模块管理'
                },
                component: moduleManage
            },{
                path: '/manager',
                name: 'manager',
                meta: {
                    title: '管理员'
                },
                component: manager
            }
        ]
    },
    {
        path: '/client',
        name: 'client',
        meta: {
            title: '客户'
        },
        component: Home,
        children: [
            {
                path: '/shopManage',
                name: 'shopManage',
                meta: {
                    title: '店铺管理'
                },
                component: shopManage
            },{
                path: '/userManage',
                name: 'userManage',
                meta: {
                    title: '用户管理'
                },
                component: userManage
            }
        ]
    }
]