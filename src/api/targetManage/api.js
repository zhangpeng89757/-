//目标管理API
import axios from '@/http/axios'

/**
 * 每万人高价值发明专利拥有量-每万人高价值发明专利拥有量与实际完成目标完成情况
 * @returns 
 */
export const perTargetCount = () => {
    return axios({
        method: 'GET',
        url: `/target/per/perTargetCount`
    });
}

/**
 * 有效发明专利-有效发明专利完成情
 * @returns 
 */
export const validPatentFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/validPatent/finishCount`
    });
}

/**
 * 有效注册商标量-有效注册商标量完成情况
 * @returns 
 */
export const validTradeMarkerFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/validTradeMarker/finishCount`
    });
}

/**
 * 知识产权质押融资规模-知识产权质押融资实际与目标完成情况
 * @returns 
 */
export const impawnFinancialFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/impawnFinancial/finishCount`
    });
}

/**
 * 知识产权服务机构数-知识产服务机构实际与目标完成情况
 * @returns 
 */
export const serverOrgFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/serverOrg/finishCount`
    });
}

/**
 * 地理标志商标-产品实际与目标完成情况
 * @returns 
 */
export const geographyFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/geography/finishCount`
    });
}

/**
 * 版权等级数-实际与目标完成情况
 * @returns 
 */
export const copyrightFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/copyright/finishCount`
    });
}


/**
 * 每万人高价值发明专利拥有量-高价值专利发明增长情况
 * @returns 
 */
export const highPatentUpInfo = () => {
    return axios({
        method: 'GET',
        url: `/target/per/highPatentUpInfo`
    });
}

/**
 * 每万人高价值发明专利拥有量-人口情况
 * @returns 
 */
export const yearlyPersonInfoCount = () => {
    return axios({
        method: 'GET',
        url: `/target/per/yearlyPersonInfoCount`
    });
}

/**
 * 有效发明专利-即将到期发明专利
 * @returns 
 */
export const validPatentExpire = () => {
    return axios({
        method: 'GET',
        url: `/target/validPatent/expire`
    });
}

/**
 * 有效发明专利-装备制造/电线电缆产业
 * @returns 
 */
export const validPatentIndustry = () => {
    return axios({
        method: 'GET',
        url: `/target/validPatent/industry`
    });
}


/**
 * 有效注册商标量-即将到期的注册商标
 * @returns 
 */
export const validTradeMarkerExpire = () => {
    return axios({
        method: 'GET',
        url: `/target/validTradeMarker/expire`
    });
}

/**
 * 有效注册商标量-有效注册商标类别占比
 * @returns 
 */
export const validTradeMarkerTypePercentage = () => {
    return axios({
        method: 'GET',
        url: `/target/validTradeMarker/typePercentage`
    });
}

/**
 * 知识产权质押融资规模-质押融资借贷银行
 * @returns 
 */
export const impawnFinancialBank = () => {
    return axios({
        method: 'GET',
        url: `/target/impawnFinancial/bank`
    });
}

/**
 * 知识产权质押融资规模-质押融资商标/专利金额占比
 * @returns 
 */
export const impawnFinancialTypePercentage = () => {
    return axios({
        method: 'GET',
        url: `/target/impawnFinancial/typePercentage`
    });
}

/**
 * 知识产权服务机构数-服务机构名单
 * @returns 
 */
export const serverOrgListCount = () => {
    return axios({
        method: 'GET',
        url: `/target/serverOrg/listCount`
    });
}

/**
 * 知识产权服务机构数-当年商标/专利基础业务量排行
 * @returns 
 */
export const serverOrgOrderCount = () => {
    return axios({
        method: 'GET',
        url: `/target/serverOrg/orderCount`
    });
}

/**
 * 地理标志商标-挖掘地标资源
 * @returns 
 */
export const geographySource = () => {
    return axios({
        method: 'GET',
        url: `/target/geography/source`
    });
}

/**
 * 版权登记数-版权列表
 * @returns 
 */
export const copyrightList = () => {
    return axios({
        method: 'GET',
        url: `/target/copyright/list`
    });
}

/**
 * 每万人高价值发明专利拥有量-近3年价值专利发明增长情况
 * @returns 
 */
export const builderPerHighPatentUpInfo = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/per/highPatentUpInfo`
    });
}

/**
 * 每万人高价值发明专利拥有量-近3年每万人高价值发明专利拥有量
 * @returns 
 */
export const builderPerTargetCount = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/per/perTargetCount`
    });
}

/**
 * 有效注册商标总量-即将到期的注册商标
 * @returns 
 */
export const builderValidTradeMarkerExpire = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/validTradeMarker/expire`
    });
}

/**
 * 有效注册商标总量-近3年有效注册商标量情况
 * @returns 
 */
export const builderValidTradeMarkerFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/validTradeMarker/finishCount`
    });
}

/**
 * 海外发明专利授权量-近3年海外发明专利授权情况
 * @returns 
 */
export const builderForeignEmpowerment = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/foreign/empowerment`
    });
}

/**
 * 海外发明专利授权量--专利海关备案
 * @returns 
 */
export const builderForeignFiling = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/foreign/filing`
    });
}

/**
 * 马德里商标国际注册量-商标海关备案
 * @returns 
 */
export const builderMadridFiling = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/madrid/filing`
    });
}

/**
 * 马德里商标国际注册量-近3年马德里商标国标注册量情况
 * @returns 
 */
export const builderMadridRegistered = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/madrid/registered`
    });
}

/**
 * 国、省级知识产权优势示范企业-近三年专精特新企业量
 * @returns 
 */
export const builderAdvantageOrgCount = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/advantage/orgCount`
    });
}

/**
 * 国、省级知识产权优势示范企业-带培育企业
 * @returns 
 */
export const builderAdvantageOrgCultivate= () => {
    return axios({
        method: 'GET',
        url: `/target/builder/advantage/orgCultivate`
    });
}

/**
 * 知识产权质押融资金额-近3年质押融资金额趋势
 * @returns 
 */
export const builderIntellectualPropertyPledgeFinancTrends = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/intellectualPropertyPledge/FinancTrends`
    });
}

/**
 * 知识产权质押融资金额-质押融资借贷银行
 * @returns 
 */
export const builderIntellectualPropertyPledgeBank= () => {
    return axios({
        method: 'GET',
        url: `/target/builder/intellectualPropertyPledge/bank`
    });
}

/**
 * 高新技术企业-质押融资借贷银行
 * @returns 
 */
export const builderHighTechPledgeBank = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/highTechPledge/bank`
    });
}

/**
 * 高新技术企业-近3年质押融资金额趋势
 * @returns 
 */
export const builderHighTechPledgeFinancTrends= () => {
    return axios({
        method: 'GET',
        url: `/target/builder/highTechPledge/financTrends`
    });
}

/**
 * 知识产权保护社会满意度-近三年社会满意度情况
 * @returns 
 */
export const builderSocietySatisfyFinancTrends = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/societySatisfy/financTrends`
    });
}

/**
 * 知识产权保护社会满意度-6种企业服务处理率占比
 * @returns 
 */
export const builderSocietySatisfyDealPer= () => {
    return axios({
        method: 'GET',
        url: `/target/builder/societySatisfy/dealPer`
    });
}

/**
 * 专精特新企业-近3年专精特新企业量
 * @returns 
 */
export const builderSpecializeFinancTrends = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/specialize/financTrends`
    });
}

/**
 * 专精特新企业-待挖掘企业
 * @returns 
 */
export const builderSpecializeOrgDig= () => {
    return axios({
        method: 'GET',
        url: `/target/builder/specialize/orgDig`
    });
}

/**
 * 知识产权调解案件-调解案件
 * @returns 
 */
export const builderMediateDealNums = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/mediate/dealNums`
    });
}


/**
 * 知识产权调解案件-近3年知识产权调解量
 * @returns 
 */
export const builderMediateNums = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/mediate/nums`
    });
}

/**
 * 专利行政执法结案率-专利案件结案率
 * @returns 
 */
export const builderLawEnforcementLawEnforcement = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/lawEnforcement/lawEnforcement`
    });
}

/**
 * 专利行政执法结案率-各所专利未结案情况
 * @returns 
 */
export const builderLawEnforcementOpenCase = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/lawEnforcement/openCase`
    });
}

/**
 * 专利行政执法结案率-未结案案件
 * @returns 
 */
export const builderLawEnforcementLawOpenCaseItem = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/lawEnforcement/openCaseItem`
    });
}

/**
 * 专利代理师数量-专利授权/专利案件多的代理机构
 * @returns 
 */
export const builderAgentProxyOrgTop = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/agent/proxyOrgTop`
    });
}

/**
 * 专利代理师数量-近三年专利代理师数量
 * @returns 
 */
export const builderAgentYearlyTotal = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/agent/yearlyTotal`
    });
}

/**
 * 知识产权托管企业数量-服务机构名单
 * @returns 
 */
export const builderHostingHosting = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/hosting/hosting`
    });
}

/**
 * 知识产权托管企业数量-近3年知识产权服务机构数情况
 * @returns 
 */
export const builderHostingYearlyOrgNums = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/hosting/yearlyOrgNums`
    });
}

/**
 * 地理标志拥有量-挖掘地标资源
 * @returns 
 */
export const builderGeographyLandmarkResources = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/geography/landmarkResources`
    });
}

/**
 * 地理标志拥有量-近3年地理标志商标/产品情况
 * @returns 
 */
export const builderGeographyYearlyProductCount = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/geography/yearlyProductCount`
    });
}

/**
 * 著作权登记量-近3年著作权登记目标与实际完成情况
 * @returns 
 */
export const builderCopyrightFinishCount = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/copyright/finishCount`
    });
}


/**
 * 著作权登记量-版权列表
 * @returns 
 */
export const builderCopyrightList = () => {
    return axios({
        method: 'GET',
        url: `/target/builder/copyright/list`
    });
}

/**
 * 领导小组
 * @param {zhiscqghmb: 知识产权规划目标 ， hexyqxzb: 核心预期性指标} type 
 * @returns 
 */
export const megaLeaderList = (type) => {
    return axios({
        method: 'GET',
        url: `/mega/leader/list`,
        data: { type }
    });
}

/**
 * 政策文件
 * @param {zhiscqghmb: 知识产权规划目标 ， hexyqxzb: 核心预期性指标} type 
 * @returns 
 */
export const megaPolicyList = (type) => {
    return axios({
        method: 'GET',
        url: `/mega/policy/list`,
        data: { type }
    });
}

/**
 * 目标管理
 * @returns 
 */
export const megaDynamicList = () => {
    return axios({
        method: 'GET',
        url: `/mega/dynamic/list`
    });
}

/**
 * 国家知识产权强县建设试点县(区)建设期-核心预期性指标
 * @returns 
 */
export const megaPresentcList = () => {
    return axios({
        method: 'GET',
        url: `/mega/present/list`,
        data: {type: "HEXYQXZB"}
    });
}

