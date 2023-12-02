import axios from '@/http/axios'
/**
 * 高价值专利
 * @param {*} params 
 * @returns 
 */
export const getGaojzzl = () => {
    return axios({
        method: 'GET',
        url: '/mega/number/list',
        data: { type: "gaojzzl"},
    });
}

/**
 * 高价值专利
 * @param {1-维持年限超10年,2-战略性新兴产业,3-获得较高质押融资金额,4-获得国家科技奖或中国专利奖,5-在海外有同族专利权} type 
 * @returns 
 */
export const getPatentTypeListCount = (type) => {
    return axios({
        method: 'GET',
        url: '/ovr/patentTypeListCount',
        data: { type},
    });
}

/**
 * 驰名商标
 * @param {*} params 
 * @returns 
 */
export const getTrademark = () => {
    return axios({
        method: 'GET',
        url: '/mega/trademark/list'
    });
}

/**
 * 驰名商标详情
 * @param {商标号} an 
 * @returns 
 */
export const getTradeMarkerDetail = (an) => {
    return axios({
        method: 'GET',
        url: '/ovr/tradeMarkerDetail',
        data: { an }
    });
}

/**
 * 地理标志产品
 * @param {*} params 
 * @returns 
 */
export const getDilbzcp = () => {
    return axios({
        method: 'GET',
        url: '/mega/number/list',
        data: { type: "dilbzcp"},
    });
}

/**
 * 每个地理标志产品的详情数据
 * @param {*} product 
 * @returns 
 */
export const geographicalIndication = () => {
    return axios({
        method: 'GET',
        url: `${host}/ovr/geographicalIndication`
    });
}


/**
 * 重大工作进展、领导关怀
 * @param {*} params 
 * @returns 
 */
export const getZhongdgzjzhldgh = () => {
    return axios({
        method: 'GET',
        url: '/mega/item/list',
        data: { type: "zhongdgzjzhldgh"},
    });
}
/**
 * 知识产权情况简介
 * @param {*} params 
 * @returns 
 */
export const getJinyqzscqqkjj = () => {
    return axios({
        method: 'GET',
        url: '/mega/number/list',
        data: { type: "jinyqzscqqkjj"},
    });
}
/**
 * 知识产权情况图片组
 * @param {*} params 
 * @returns 
 */
export const getJinyqzscqqkjjImages = () => {
    return axios({
        method: 'GET',
        url: '/mega/item/list',
        data: { type: "rongyjp"},
    });
}
/**
 * 荣誉奖牌
 * @param {*} params 
 * @returns 
 */
export const getRongyjp = () => {
    return axios({
        method: 'GET',
        url: '/mega/item/list?type=rongyjp',
        data: { type: "rongyjp"},
    });
}
/**
 * 企业名单
 * @param {*} params 
 * @returns 
 */
export const getQiymd = () => {
    return axios({
        method: 'GET',
        url: '/mega/number/list?type=qiymd',
        data: {},
    });
}
/**
 * 知识产权优势企业
 * @param {*} params 
 * @returns 
 */
export const getAdvantageEnterprise = () => {
    return axios({
        method: 'GET',
        url: '/ovr/advantageEnterprise',
        data: {},
    });
}
