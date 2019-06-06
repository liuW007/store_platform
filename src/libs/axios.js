import Axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
import config from '@/config';

const {
    mockConfig: {
      useMock,
      devMock
    },
    toLogin
  } = config;
  
/**
 * @description ajax类
 * @description 基于axios开发
 */

class HttpRequest{

    constructor (baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * @description axios默认配置
     */
    setDefaultConfig () {
        // 判断是否启用了Mock数据
        const baseURL = useMock ? devMock : this.baseUrl;
        const default_config = {
            // `url`是请求的接口地址
            url: '',

            // `method`是请求的方法
            method: 'post', // default

            // `headers`是请求的头部，默认请求数据的类型
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

            // 如果url不是绝对路径，那么会将baseURL和url拼接作为请求的接口地址
            baseURL,

            // `maxRedirects`是最大重定向的个数
            maxRedirects: 5, // default

            // `timeout`是请求超时时间（毫秒）
            timeout: 20000,

            // 是否携带cookie信息
            withCredentials: true,  // default

            // 响应格式
            // 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            responseType: 'json',   //default

            // 设置http响应内容的最大长度
            maxContentLength: 20000000000000

        };
        return default_config;
    }

    /**
     * @description 拦截器
     * @params instance 创建的axios实例
     * @params options axios的配置项
     */
    interceptors (instance, options) {
        // 显示loading
        // iView.Spin.show();

        /**
         * @description 请求拦截，对请求方式进行控制
         */
        instance.interceptors.request.use(config => {
            let content_type = config.headers['Content-Type'];
            // 表单提交
            if (config.method == 'post' && content_type == 'application/x-www-form-urlencoded') {
                config.data = Qs.stringify(config.data);
            }
            // json提交
            if (content_type == 'application/json') {
                console.log('----json提交');
                config.data = JSON.stringify(config.data);
            }
            // 消息提交（二进制数据提交）
            if (content_type == 'multipart/form-data') {
                let form_data = new FormData();
                Object.keys(config.data).forEach(item => {
                    form_data.append(item, config.data[item]);
                })
                config.data = form_data;
            }
            console.log('请求拦截config=>', config);
            return config;
        }, error => {
            // 显示loading
            // iView.Spin.show();
            return Promise.reject(error);
        })

        /**
         * @description 响应拦截，在控制台输出接口返回成功与否的提示
         */
        instance.interceptors.response.use(res => {
            // 隐藏loading
            // iView.Spin.hide();
            const {
                data,
                status
            } = res;
            console.log('接口' + options.url + '返回成功=>', data);
            // Get方式请求路由，刷新缓存数据
            if (config && new RegExp(/js\/menu/).test(config.url)) {
              return res.data;
            }
      
            // 判断返回的code等于0表示正确返回数据，否则为异常返回
            let return_code = Number.parseInt(data.code);
            if (return_code === 0) {
              // 正常返回
              return data.data;
            } else {
              if(return_code === 2001 && window.location.href.indexOf('#/login') < 0) {
                // 登录失败2001，如果当前页不是登录页面，则跳转回登录页
                toLogin();
                return;
              }
              // 其他失败，弹出消息提示框
              iView.Message.error(data.msg);
              return Promise.reject({
                code_err: true,       //如果code_err存在，可用此字段判断是否是code错误
                data,
                status
              });
            }
        }, error => {
            // 隐藏loading
            // iView.Spin.hide();
            console.warn('接口' + options.url + '返回失败=>', error);
            let msg = 'http错误' + (error.status && '');
            iView.Message.info(msg);
            return Promise.reject({
                error,
                msg
            });
        })
    }

    /**
     * @description 创建axios实例，将接口和配置项结合，并调用拦截器
     * @params options 包括接口地址、方法、请求字段
     */
    request (options) {
        const instance = Axios.create();
        options = Object.assign(this.setDefaultConfig(), options);
        this.interceptors(instance, options);
        return instance(options);
    }

}

export default HttpRequest