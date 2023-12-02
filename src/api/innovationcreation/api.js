//创新创造新增接口
import axios from '@/http/axios'

/**
 * 创新创造-主体列表
 * @returns 
 */
export const protectionAchievementsList = () => {
    return axios({
        method: 'GET',
        url: `/icList/bodyList`,
    });
}

/**
 * 创新创造概览-版权列表
 * @returns 
 */
export const copyrightInfoList = () => {
    return axios({
        method: 'GET',
        url: `/icList/copyrightInfoList`,
    });
}

/**
 * 创新创造概览-高价值专利列表
 * @returns 
 */
export const highValuePtList = () => {
    return axios({
        method: 'GET',
        url: `/icList/highValuePtList`,
    });
}

/**
 * 创新创造-产业信息列表
 * @param {	分类 1-高价值专利 2-专利授权量 3-注册商标量 } category 
 * @param {	类型 1-电线电缆 2-装备制造 } type 
 * @returns 
 */
export const industryList = (category, type) => {
    return axios({
        method: 'GET',
        url: `/icList/industryList`,
        data: { category, type }
    });
}

/**
 * 创新创造概览-集成电路布图列表
 * @returns 
 */
export const integratedCircuitList = () => {
    return axios({
        method: 'GET',
        url: `/icList/integratedCircuitList`,
    });
}

/**
 * 创新创造概览-地理标志列表
 * @param {	类型 1-地理标志产品，2-农产品地理标志 } type 
 * @returns 
 */
export const landmarkList = () => {
    return axios({
        method: 'GET',
        url: `/icList/landmarkList`
    });
}

/**
 * 创新创造概览-授权植物新品种列表
 * @returns 
 */
export const newVarietiesList = () => {
    return axios({
        method: 'GET',
        url: `/icList/newVarietiesList`,
    });
}

/**
 * 创新创造概览-专利列表
 * @param { 类型 1-授权专利 2-授权发明专利 3-PCT专利 } type 
 * @returns 
 */
export const patentInfoList = (type) => {
    return axios({
        method: 'GET',
        url: `/icList/patentInfoList`,
        data: { type }
    });
}


/**
 * 创新创造概览-商标列表
 * @param { 类型 1-注册商标 2-驰名商标 3-马德里商标 4-特殊标志 5-地理标志商标 } type 
 * @returns 
 */
export const trademarkInfoList = (type) => {
    return axios({
        method: 'GET',
        url: `/icList/trademarkInfoList`,
        data: { type }
    });
}

/**
 * 创新创造-申请热词对应专利列表
 * @param { 关键词	} keywords 
 * @returns 
 */
export const keywordsPtList = (keywords) => {
    return axios({
        method: 'GET',
        url: `/icList/keywordsPtList`,
        data: { keywords }
    });
}
