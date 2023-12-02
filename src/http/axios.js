import instance from './index'
/**
 * HTTP请求
 * @param {{ method: 请求模式, url: 请求地址, data: 请求数据, config: 请求配置 }} param0 
 * @returns 
 */
const axios = ({ method, url, data, config }) => {
    //window.httprequstconfig 静态文件配置的服务器请求地址
    // url = url?.indexOf('http://') != -1 ? url : `${window?.HttpConfig?.ServerUrl}${url}`;
    url = url?.indexOf('http://') != -1 ? url : `${url}`;
    method = method ? method.toLowerCase() : 'post'; 
    if (method == 'post') {
        return instance.post(url, JSON.stringify(data), { ...config })
    } else if (method == 'get') {
        let postUtrl = url + "?" + formatPrams(data);
        return instance.get(postUtrl, {
            ...config
        })
    } else if (method == 'delete') {
        return instance.delete(url, {
            params: data,
            ...config
        })
    } else if (method == 'put') {
        return instance.put(url, data, { ...config })
    } else {
        console.error('未知的method' + method)
        return false
    }
}

/**
 * 上传文件
 * @param {{uploadUrl: 上传地址, data: 上传数据, config: 上传配置}} param0 
 * @returns 
 */
export const upLoadAxios = ({ url, data }) => {
    var formData = new FormData();
    formData.append("formFile", data);
    return instance.post(url, formData, {headers: { 'Content-type' : 'multipart/form-data' }})
}

export default axios

/**
 * 后台接口没有使用json，次数需要把参数转成对应数据结构
 * @param {要传递的数据对象} data 
 * @returns 
 */
 function formatPrams(data) {
    if(data == null) return "";
    if (typeof(data)=="object") {
        return Object.keys(data).map(key => {
            return `${key}=${data[key]}`
        }).join('&');
    } else {
        return "arg0=" + data;
    }
}

/**
 * 数组对象的转换
 * @param {要传递的数组对象} data 
 * @returns 
 */
function formatArrData(data) {
    return data.map((d, index) => {
        return `arg${index}=${JSON.stringify(d)}`
    }).join('&')
}
