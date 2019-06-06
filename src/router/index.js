import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from '../../node_modules/iview/dist/iview'
import '../../node_modules/iview/dist/styles/iview.css'

Vue.use(Router);
Vue.use(iView);

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
