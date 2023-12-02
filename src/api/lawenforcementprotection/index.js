import axios from '@/http/axios'
import {reactive} from 'vue'
import { filledNullNumber } from '@/SystemCom/DataDeal'

export const constants = {
    topCountData: {
        ptClueTotal: '总线索量(专利)',
        ptCountPenaltyAmount: '累计罚没金额(专利)',
        ptPenaltyNum: '行政处罚案件量(专利)',
        ptRegisterTotal: '总立案量(专利)',
        tmClueTotal: '总线索量(商标)',
        tmCountPenaltyAmount: '累计罚没金额(商标)',
        tmPenaltyNum: '行政处罚案件量(商标)',
        tmRegisterTotal: '总立案量(商标)',
    },
    defaultMapLocationData : {
        '孝感市场监督管理所': [104.401137,31.153495],
        '天元市场监督管理所': [104.370674,31.134626],
        '旌阳市场监督管理所': [104.401816,31.117307],
        '东湖市场监督管理所': [104.432495,31.166919],
        '孝泉市场监督管理所': [104.290088,31.25592],
        '德新市场监督管理所': [104.41153,31.249835],
        '柏隆市场监督管理所': [104.339089,31.304005],
        '黄许市场监督管理所': [104.421458,31.239874],
        '双东市场监督管理所': [104.492928,31.176066],
        '和新市场监督管理所': [104.479922,31.056884],
        '新中市场监督管理所': [104.54182,31.128962],
        "德阳市市场监督管理局": [104.411241,31.102168],
        "德阳市旌阳区市监局": [104.432116,31.169124],
    },
}
// 获取头部统计数据
export const getTopCountData = (params) => {
    return axios({
        method: 'GET',
        url: '/dls/caseOverview',
        data: params,
    });
}
// 获取地图数据
export const getMapData = (params) => {
    return axios({
        method: 'GET',
        url: '/dls/mapData',
        data: params
    });
}
// 获取执法保护目标数据
export const getLawEnforcementTargetData = (params) => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/lawEnforcementTarget',
        data: params,
    }).then(res => {
        let resData = res.data;
        for (let index = 0; index < resData.length; index++){
            dataArray.push({
                name: resData[index].unitName,
                type: '线索',
                dq: filledNullNumber(resData[index].clueCurrentNum),
                mb: filledNullNumber(resData[index].clueTargetNum),
                wcbl: filledNullNumber(resData[index].reachNum),
            })
        }
    });
    return dataArray;
}
// 获取地图数据
export const getMapLeftData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/mapData',
        data: {},
    }).then(res => {
        let resData = res.data;
        let keys = ["clueCurrentNum", "clueTargetNum", "complaintsReportNum","departmentNum", "lawEnforcerNum", "mediateNum", "punishNum",
        "reachNum", "region" , "registerNum", "resolvedNum","superiorNum", "superviseNum"];
        for (let index = 0; index < resData.length; index++){
            dataArray.push({
                name: resData[index].region,
                type: "线索",
                dq: filledNullNumber(resData[index].clueCurrentNum),
                mb: filledNullNumber(resData[index].clueTargetNum),
                wcbl: filledNullNumber(resData[index].reachNum),
            })
        }
    })
    return dataArray;
}
// 获取知识产权行政案件近三年趋势/dls/caseTrends
export const getCaseTrends = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/caseTrends',
        data: {},
    }).then(res => {
        let resData = res.data;
        let titles = ['商标行政案件', '专利行政案件'];
        let xUnits = ['件', '件'];
        let yUnits = ['数量', '数量']
        for (let index = 0; index < 1; index++) {
            let element = { title: `大数据${index + 1}`, data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < 2; j++) {
                let element2 = { title: titles[j], data: [] }
                for (let k = 0; k < resData.length; k++) {
                    element2.data.push({
                        name: resData[k].year,
                        value: j == 0 ? resData[k].tmCaseNum : resData[k].ptCaseNum,
                    });
                }
                element.data.push(element2);
            }
            dataArray.push(element);
        }
    });
    return dataArray;
}
// 获取案件线索类型分析数据
export const getClueSourceAnalysisData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/clueSourceAnalysis',
        data: {},
    }).then(res => {
        let resData = res.data;
        let titles = ['自主发现','投诉举报'];
        let keys = ['proactivelyDiscoverNum','complaintsReportNum'];
        for (let index = 0; index < 2; index++) {
            dataArray.push({
                name: titles[index],
                value: filledNullNumber(resData[keys[index]]),
            })
        }
    });
    return dataArray;
}
// 获取当事人类型分析数据
export const getCaseTypeAnalysisData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/caseTypeAnalysis',
        data: {},
    }).then(res => {
        let resData = res.data;
        let titles = ['个人','企业','个体'];
        let keys = ['personalNum','enterpriseNum','individualNum'];
        for (let index = 0; index < 3; index++) {
            dataArray.push({
                name: titles[index],
                value: filledNullNumber(resData[keys[index]]),
            })
        }
    });
    return dataArray;
}
// 获取专利/商标占比情况
export const getClueRegisterRatioData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/clueRegisterRatio',
        data: {},
    }).then(res => {
        let resData = res.data;
        let titles = ['线索占比', '立案占比', '结案占比', '行政处罚案件占比','案件调解占比','累计案值金额占比','累计罚没金额占比'];
        let names = ['商标', '专利'];
        let key1s = ['tmClueNum','tmRegisterNum','tmCloseCaseNum','tmPunishNum','tmMediateNum','tmCaseValueMoney','tmPenaltyMoney'];
        let key2s = ['tmClueRatio','tmRegisterRatio','tmCloseCaseRatio','tmPunishRatio','tmMediateRatio','tmCaseValueRatio','tmPenaltyRatio'];
        let key3s = ['ptClueNum','ptRegisterNum','ptCloseCaseNum','ptPunishNum','ptMediateNum','ptCaseValueMoney','ptPenaltyMoney'];
        let key4s = ['ptClueRatio','ptRegisterRatio','ptCloseCaseRatio','ptPunishRatio','ptMediateRatio','ptCaseValueRatio','ptPenaltyRatio'];
        for (let index = 0; index < titles.length; index++) {
            dataArray.push({
                name: titles[index],
                leftDataName: names[1],
                leftDataNumber:filledNullNumber(resData[key3s[index]]), 
                leftScale: filledNullNumber(resData[key4s[index]]),
                rightDataName: names[0],
                rightDataNumber: filledNullNumber(resData[key1s[index]]),
                rightScale: filledNullNumber(resData[key2s[index]]),
            })
        }
    });
    return dataArray;
}