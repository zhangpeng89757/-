
//运用服务详情接口
import axios from '@/http/axios'

/**
 * 运用服务-运用服务情况-服务机构
 * @param {	类型 1-商标服务机构，2-专利服务机构 } type  
 * @returns 
 */
export const agency = (type = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/agency`,
        data: { type },
    });
}

/**
 * 运用服务-运用服务情况-奖项与补贴
 * @param { 类型 1-奖补，2-质押融资专项补贴 } type  
 * @returns 
 */
export const awardSubsidies = (type = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/awardSubsidies`,
        data: { type },
    });
}

/**
 * 运用服务-运用服务情况-海关备案
 * @returns 
 */
export const customsRecord = () => {
    return axios({
        method: 'GET',
        url: `/asList/customsRecord`,
    });
}

/**
 * 运用服务-产业运营-质押融资量/金额
 * @param {	产业类别 1-装备制造，2-电线电缆 } category  
 * @returns 
 */
export const industryPledgeFinancing = (category = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/industryPledgeFinancing`,
        data: { category },
    });
}

/**
 * 运用服务-产业运营-专利许可
 * @param { 产业类别 1-装备制造，2-电线电缆 } category  
 * @returns 
 */
export const industryPtLicenseList = (category = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/industryPtLicenseList`,
        data: { category },
    });
}

/**
 * 运用服务-产业运营-专利交易
 * @param { 产业类别 1-装备制造，2-电线电缆 } category  
 * @returns 
 */
export const industryPtTradeList = (category = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/industryPtTradeList`,
        data: { category },
    });
}

/**
 * 运用服务-产业运营-商标许可
 * @param { 产业类别 1-装备制造，2-电线电缆 } category  
 * @returns 
 */
export const industryTmLicenseList = (category = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/industryTmLicenseList`,
        data: { category },
    });
}

/**
 * 运用服务-产业运营-商标交易
 * @param { 产业类别 1-装备制造，2-电线电缆 } category  
 * @returns 
 */
export const industryTmTradeList = (category = 1) => {
    return axios({
        method: 'GET',
        url: `/asList/industryTmTradeList`,
        data: { category },
    });
}

/**
 * 运用服务-运用服务情况-质押融资量/金额
 * @param { 类型 1-专利，2-商标 } type  
 * @returns 
 */
export const pledgeFinancing = (type) => {
    return axios({
        method: 'GET',
        url: `/asList/pledgeFinancing`,
        data: type,
    });
}

/**
 * 运用服务-运用服务情况-项目资助
 * @returns 
 */
export const projectFunding = () => {
    return axios({
        method: 'GET',
        url: `/asList/projectFunding`,
    });
}

/**
 * 运用服务-运用服务情况-项目实施
 * @returns 
 */
export const projectImplement = () => {
    return axios({
        method: 'GET',
        url: `/asList/projectImplement`,
    });
}

/**
 * 运运用服务-运用服务情况-专利许可
 * @param { 类型 1-许可 2-被许可 } type  
 * @returns 
 */
export const ptLicenseList = (data = {type: 1}) => {
    return axios({
        method: 'GET',
        url: `/asList/ptLicenseList`,
        data: data,
    });
}

/**
 * 运用服务-运用服务情况-专利转入转出
 * @param { 类型 1-转入，2-转出 } type  
 * @returns 
 */
export const ptTransferList = (data = {type: 1}) => {
    return axios({
        method: 'GET',
        url: `/asList/ptTransferList`,
        data: data,
    });
}

/**
 * 运用服务-运用服务情况-商标许可
 * @param { 类型 1-许可 2-被许可 } type  
 * @returns 
 */
export const tmLicenseList = (data = {type: 1}) => {
    return axios({
        method: 'GET',
        url: `/asList/tmLicenseList`,
        data: data,
    });
}

/**
 * 运用服务-运用服务情况-商标转入转出
 * @param { 类型 1-转入，2-转出 } type  
 * @returns 
 */
export const tmTransferList = (data = {type: 1}) => {
    return axios({
        method: 'GET',
        url: `/asList/tmTransferList`,
        data: data,
    });
}

/**
 * 运用服务-确权预警-统计数据
 * @returns 
 */
export const warningStatistics = () => {
    return axios({
        method: 'GET',
        url: `/asList/warningStatistics`
    });
}

/**
 * 运用服务-确权预警统计（新版）
 * @returns 
 */
 export const warningStatisticsNew = () => {
    return axios({
        method: 'GET',
        url: `/asList/warningNew`
    });
}

/**
 * 运用服务-确权预警-商标预警二级列表
 * @param {	预警类型：1-续展预警、2-宽展预警 } type 
 * @returns 
 */
export const tmWarningList = (type) => {
    return axios({
        method: 'GET',
        url: `/asList/tmWarningList`,
        data: { type }
    });
}

/**
 * 	预警类型：1-待缴年费、2-逾期未缴费
 * @param {	预警类型：1-续展预警、2-宽展预警 } type 
 * @returns 
 */
export const ptWarningList = (type) => {
    return axios({
        method: 'GET',
        url: `/asList/ptWarningList`,
        data: { type }
    });
}

/**
 * 	运用服务-知名企业字号品牌保护预警列表
 * @returns 
 */
 export const brandProtectionWarningList = ({pageNum, pageSize}) => {
    return axios({
        method: 'GET',
        url: `/asList/brandProtectionWarningList`,
        data: { pageNum, pageSize }
    });
}

/**
 * 	运用服务-重点保护名录侵权预警列表
 * @returns 
 */
 export const infringementWarningList = ({pageNum, pageSize}) => {
    return axios({
        method: 'GET',
        url: `/asList/infringementWarningList`,
        data: { pageNum, pageSize }
    });
}

/**
 * 	运用服务-重点品牌监测预警列表
 * @returns 
 */
 export const monitorWarningList = ({pageNum, pageSize, searchKey}) => {
    return axios({
        method: 'GET',
        url: `/asList/monitorWarningList`,
        data: { pageNum, pageSize, searchKey }
    });
}

/**
 * 	运用服务-科技型中小企业专利清零行动提示列表
 * @returns 
 */
 export const ptClearingPromptList = ({pageNum, pageSize}) => {
    return axios({
        method: 'GET',
        url: `/asList/ptClearingPromptList`,
        data: { pageNum, pageSize }
    });
}

/**
 * 	运用服务-企业商标清零行动提示
 * @returns 
 */
 export const tmClearingPrompt = ({pageNum, pageSize}) => {
    return axios({
        method: 'GET',
        url: `/asList/tmClearingPrompt`,
        data: { pageNum, pageSize }
    });
}

/**
 * 	运用服务-公共资源侵占商标预警（公共资源商标申请预警）列表
 * @returns 
 */
 export const tmEncroachWarningList = ({pageNum, pageSize}) => {
    return axios({
        method: 'GET',
        url: `/asList/tmEncroachWarningList`,
        data: { pageNum, pageSize }
    });
}


/**
 * 运用服务-企业服务-统计数据
 * @returns 
 */
export const enterpriseServeStatistics = () => {
    return axios({
        method: 'GET',
        url: `/asList/enterpriseServeStatistics`
    });
}

/**
 * 	运用服务-企业服务-二级列表
 * @param {	服务类型：知产咨询、知产托管、项目资助、纠纷调解、维权援助、质押融资 } type 
 * @returns 
 */
export const enterpriseServeList = (type) => {
    return axios({
        method: 'GET',
        url: `/asList/enterpriseServeList`,
        data: { type }
    });
}


/**
 * 	企业服务需求
 * @returns 
 */
export const enterpriseServeListALL = () => {
    return axios({
        method: 'GET',
        url: `/asList/enterpriseServeList`,
    });
}

/**
 * 	资助台账接口
 * @returns 
 */
export const ptFundingDetails = (year) => {
    return axios({
        method: 'GET',
        url: `/asList/ptFundingDetails`,
        data: { year }
    });
}