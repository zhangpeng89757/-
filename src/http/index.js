
import axios from 'axios'
import { showLoading, hideLoading } from "@/SystemCom/loading";
import { ElMessage } from 'element-plus'
import router from '@/router'
//创建axios的一个实例
var instance = axios.create({
    // baseURL: 'http://ddq97t.natappfree.cc', //接口统一域名
    baseURL: APIURL, //接口统一域名
    timeout: 30000, //设置超时
    withCredentials: false,
    headers: {
        'content-type': 'application/json'
    }
})

//请求拦截器
instance.interceptors.request.use(
    config => {
        if(config.loading) showLoading(config.loadingText);
        // 每次发送请求之前判断是否存在Authorization，如果存在，则统一在http请求的header都加上Authorization
        const Authorization = window.sessionStorage.getItem('token');
        Authorization && (config.headers.Authorization = `Bearer ${Authorization}`);
        config.headers.UUID = window.sessionStorage.getItem('uuid');
        return config
    },
    error =>
        // 对请求错误做些什么
        Promise.reject(error)
)

//响应拦截器
instance.interceptors.response.use(
    response => {
        setTimeout(() => {
            hideLoading();
        }, 200);
        if (response.data) {
            if(response.data.success) {
                return response.data
            }  else if(response.data.status == 200) {
                return response.data;
            } else {
                ElMessage.error(response.data.errormessgae);
                return response.data;
            }
        } else {
            ElMessage.error(response.data?.errMsg);
            return response.data;
        }
    },
    error => {
        setTimeout(() => {
            hideLoading();
        }, 200);
        //响应错误
        if (error.response && error.response.status) {
            const status = error.response.status;
            var message = ''
            switch (status) {
                case 400:
                message = '请求错误'
                break
                case 401:
                message = '登录失效'
                break
                case 403:
                message = '暂无权限访问'
                break
                case 404:
                message = '请求地址出错'
                break
                case 408:
                message = '请求超时'
                break
                case 500:
                message = '服务器内部错误!'
                break
                case 501:
                message = '服务未实现!'
                break
                case 502:
                message = '网关错误!'
                break
                case 503:
                message = '服务不可用!'
                break
                case 504:
                message = '网关超时!'
                break
                case 505:
                message = 'HTTP版本不受支持'
                break
                default:
                message = '请求失败'
            }
            ElMessage.error(message)
            if(status == 401) {
                router.push("/login")
            }
            return Promise.reject(error)
        } else if(error.message == "Network Error"){
            ElMessage.error(`无法访问${error.config.url}!服务器访问失败`)
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default instance
