import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

/**
 * @description 挂载路由实例
 */
const router = new Router({
    routes
})

router.beforeEach((to,form,next) => {
    next();
})

export default router
