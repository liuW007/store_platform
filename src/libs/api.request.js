import HttpRequest from './axios'
import config from '@/config'

const {
    baseUrl:{
        dev,
        pro
    }
} = config;
const baseUrl = process.env.NODE_ENV !== 'production' ? dev : pro;
const axios = new HttpRequest(baseUrl);
export default axios;