//执法保护新增接口
import axios from '@/http/axios'
/**
 * ⾼知识产权优势企业知识产权统计列表
 * @returns 
 */
export const protectionAchievementsList = () => {
    return axios({
        method: 'GET',
        url: `/ovr/advantageEnterprise`,
    });
}

/**
 * 规上企业知识产权统计列表
 * @returns 
 */
export const complianceEnterprise = () => {
    return axios({
        method: 'GET',
        url: `/ovr/complianceEnterprise`,
    });
}

/**
 * ⾼知识产权贯标企业知识产权统计列表
 * @returns 
 */
export const consistentEnterprise = () => {
    return axios({
        method: 'GET',
        url: `/ovr/consistentEnterprise`,
    });
}

/**
 * ⾼新技术企业知识产权统计列表
 * @returns 
 */
export const hightechEnterprise = () => {
    return axios({
        method: 'GET',
        url: `/ovr/hightechEnterprise`,
    });
}

/**
 * 每个指标点击后的列表数据
 * @param {企业类型：1-维持年限超10年,2-战略性新兴产业,3-获得较高质押融资金额,4-获得国家科技奖或中国专利奖,5-在海外有同族专利权} type 
 * @returns 
 */
export const patentTypeListCount = (type) => {
    return axios({
        method: 'GET',
        url: `/ovr/patentTypeListCount`,
        data: { type }
    });
}

/**
 * ⾼专精特殊新企业知识产权统计列表
 * @returns 
 */
export const specializedEnterprise = () => {
    return axios({
        method: 'GET',
        url: `/ovr/specializedEnterprise`,
    });
}

/**
 * 驰名商标列表详情数据
 * @param {商标编码	} an 
 * @returns 
 */
export const tradeMarkerDetail = (an) => {
    return axios({
        method: 'GET',
        url: `/ovr/tradeMarkerDetail`,
        data: { an }
    });
}

/**
 * 知识产权成果接口
 * @returns 
 */
export const ipAchievements = () => {
    return axios({
        method: 'GET',
        url: `/ovr/ipAchievements`,
    });
}

/**
 * 有效专利近三年增长趋势
 * @returns 
 */
export const effectivePtList = () => {
    return axios({
        method: 'GET',
        url: `/ovr/effectivePtList`,
    });
}

/**
 * 万人有效发明专利拥有量三年增长趋势
 * @returns 
 */
export const validInventionPatents = () => {
    return axios({
        method: 'GET',
        url: `/ovr/validInventionPatents`,
    });
}

/**
 * 有效注册商标量近三年增长趋势
 * @returns 
 */
export const effectiveTmList = () => {
    return axios({
        method: 'GET',
        url: `/ovr/effectiveTmList`,
    });
}

/**
 * 知识产权行政保护案件
 * @returns 
 */
export const putOnRecordList = () => {
    return axios({
        method: 'GET',
        url: `/ovr/putOnRecordList`,
    });
}