import api from '@/api'
import config from '@/config'

export default {
    state: {
        userinfo: null,     // 登录用户信息
        storename: '',
    },
    getters: {
        // 获取用户登录信息
        getUserinfo (state) {
            let str = sessionStorage.getItem('userInfo');
            let userinfo = state.userinfo || (str ? JSON.parse(str) : null);
            if (!userinfo) {
                config.toLogin();
                return;
            }
            return userinfo;
        },
        // 获取仓库名
        login_store (state) {
            return state.storename || sessionStorage.getItem('storename');
        }
    },
    mutations: {
        setUserInfo (state, userinfo) {
            state.userinfo = userinfo;
            sessionStorage.setItem('userInfo', JSON.stringify(userinfo));
        },
        setStorename (state, storename) {
            state.storename = storename;
            sessionStorage.setItem('storename', storename);
        },
        logout (state) {
            state.userinfo = null;
            sessionStorage.clear();
            config.toLogin();
        },
    },
    actions: {
        // 登录
        login ({ commit }, { loginname, loginpassword }) {
            return new Promise((resolve, reject) => {
                api.admin.login({
                    loginname,
                    loginpassword
                }).then(res => {
                    // 存储登录信息到sessionStorage
                    commit('setUserinfo', res);
                    // 获取仓库名
                    api.store.query({ page: 1, pagesize: 999999, keyword: undefined, areaid: undefined }).then(store_res => {
                        let storename = '';
                        let storeid = res.storeid;
                        store_res.data.forEach(item => {
                            if (item.id == storeid) {
                                storename = item.name;
                            }
                        })
                        commit('setStorename', storename);
                        resolve();
                    }).catch(err => {
                        resolve();
                    })
                }).catch(err=>{
                    reject();
                })
            })
        },
        // 退出登录
        handleLogOut ({ state, commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                resolve();
            })
        }
    }
}