export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: '好像没有显示成功',

    /**
     * @description token在cookie中存储的天数
     */
    cookieExpires: 1,

    /**
     * @description api请求根路径，baseUrl.dev为开启代理proxy时设置的请求，解决本地开发跨域问题，baseUrl.pro为线上环境的请求
     */
    baseUrl: {
        // dev: 'http://192.168.9.107',
        dev: 'https://api.51dashitang.com',
        pro: 'https://api.51dashitang.com'
    },

    /**
     * @description 默认开启mock数据
     * @description 关闭mock数据，才能访问baseUrl.dev
     */
    mockConfig: {
        useMock: false,
        devMock: ''
    },

    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',

    /**
     * @description 需要加载的插件，一般为记录错误日志插件
     */
    plugin: {
        
    }
}