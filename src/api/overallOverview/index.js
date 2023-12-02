import axios from "@/http/axios";
import { reactive } from 'vue'
import { filledNullNumber } from '@/SystemCom/DataDeal'
const constants = {
    // 主体信息字段映射解析
    apDataParse: {
        advantageNum: '知识产权优势企业',
        enterpriseNum: '企业',
        personalNum: '自然人',
        specializedNum: '专精特新企业',
        standardSizedNum: '规上企业',
        standardizedNum: '知识产权贯标企业',
        technologyNum: '高新技术企业',
    }
}
// 获取申请主体数据概况
export const getApOverviewData = () =>{
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/mainBodyInfo',
        data: {}
    }).then(res => {
        let titles = ['企业','自然人','事业单位','高等院校','科研机构','规上企业','贯标企业','高新技术企业','优势企业','专精特新企业'];
        let keys = ['enterpriseNum','personalNum','publicInstitutionsNum','collegeNum','researchInstitutionNum','standardSizedNum','standardizedNum','technologyNum','advantageNum','specializedNum'];
        let resData = res.data;
        for (let index = 0; index < titles.length; index++) {
            dataArray.push({
                title: titles[index],
                data: filledNullNumber(resData[keys[index]]),
            })
        }
    })
    return dataArray;
}
// 获取商标专利概况合并版v2.0
export const getTmAndPatentOverviewData = (params) => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/trademarkPatentData',
        data: params
    }).then(res => {
        let resData = res.data;
        let titles = ['商标申请量', '商标注册量', '专利授权量', '发明专利授权量']
        let subTitles = ['今年', '累积'];
        let keys = [['tmApplyYearNum','tmRegisterYearNum','ptAuthorizedYearNum','inventionPtAuthorizedYearNum'], 
        ['tmApplyNum','tmRegisterNum','ptAuthorizedNum','inventionPtAuthorizedNum']];
        for (let index = 0; index < titles.length; index++){
            let element = { title: titles[index], data: []}
            for (let j = 0; j < subTitles.length; j++){
                element.data.push({
                    title: subTitles[j],
                    data: resData[keys[j][index]]? resData[keys[j][index]] : 0,
                })
            }
            dataArray.push(element);
        }
    });
    return dataArray;
}
// 获取商标数据概况
export const getTradeMarkOverviewData = () =>{
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/trademarkCriticalData',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['商标申请量', '驰名商标量', '注册商标量', '地理标志量', '马德里注册量']
        let subTitles = ['今年', '累积'];
        let index = 0;
        // 封装数据
        // 1.商标申请量
        let element = {
            title: titles[index++], data: [
                {
                    title: subTitles[0],
                    data: resData.tmApplyYearNum == null ? '暂无数据' : resData.tmApplyYearNum,
                },
                {
                    title: subTitles[1],
                    data: resData.tmApplyNum == null ? '暂无数据' : resData.tmApplyNum,
                },
            ]
        };
        dataArray.push(element);
        // 2.驰名商标量
        element = {
            title: titles[index++], data: [
                {
                    title: subTitles[0],
                    data: resData.tmWellKnownYearNum == null ? 0 : resData.tmWellKnownYearNum,
                },
                {
                    title: subTitles[1],
                    data: resData.tmWellKnownNum == null ? 0 : resData.tmWellKnownNum,
                },
            ]
        };
        dataArray.push(element);
        // 3.注册商标量
        element = {
            title: titles[index++], data: {
                "有效注册商标": [
                    {
                        title: subTitles[0],
                        data: resData.tmRegisterValidYearNum == null ? 0 : resData.tmRegisterValidYearNum,
                    },
                    {
                        title: subTitles[1],
                        data: resData.tmRegisterValidNum == null ? 0 : resData.tmRegisterValidNum,
                    },
                ],
                "失效注册商标": [
                    {
                        title: subTitles[0],
                        data: resData.tmRegisterInvalidYearNum == null ? 0 : resData.tmRegisterInvalidYearNum,
                    },
                    {
                        title: subTitles[1],
                        data: resData.tmRegisterInvalidNum == null ? 0 : resData.tmRegisterInvalidNum,
                    },
                ],
            }
        };
        dataArray.push(element);
        // 4.地理标志量
        element = {
            title: titles[index++], data: {
                "商标": [
                    {
                        title: subTitles[0],
                        data: resData.landmarkTmYearNum == null ? 0 : resData.landmarkTmYearNum,
                    },
                    {
                        title: subTitles[1],
                        data: resData.landmarkTmNum == null ? 0 : resData.landmarkTmNum,
                    },
                ],
                "产品": [
                    {
                        title: subTitles[0],
                        data: resData.landmarkProductYearNum == null ? 0 : resData.landmarkProductYearNum,
                    },
                    {
                        title: subTitles[1],
                        data: resData.landmarkProductNum == null ? 0 : resData.landmarkProductNum,
                    },
                ],
                "农产品": [
                    {
                        title: subTitles[0],
                        data: resData.landmarkProduceYearNum == null ? 0 : resData.landmarkProduceYearNum,
                    },
                    {
                        title: subTitles[1],
                        data: resData.landmarkProduceNum == null ? 0 : resData.landmarkProduceNum,
                    },
                ],
            }
        };
        dataArray.push(element);
        // 5. 马德里注册量
        element = {
            title: titles[index], data: [
                {
                    title: subTitles[0],
                    data: resData.tmMadridYearNum == null ? 0 : resData.tmMadridYearNum,
                },
                {
                    title: subTitles[1],
                    data: resData.tmMadridNum == null ? 0 : resData.tmMadridNum,
                },
            ]
        };
        dataArray.push(element);
    })
    return dataArray;
}
// 查询专利数据
export const getPatentOverviewData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/patentCriticalData',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['专利授权量', '发明专利授权量', '专利申请量', 'PCT专利申请量', '万人发明专利拥有量', '高价值专利'];
        let key1s = ['ptAuthorizedYearNum', 'inventionPtAuthorizedYearNum', 'ptApplyYearNum', 'pctApplyYearNum', 'tenThousandPersonPtYearNum', 'highValuePtYearNum'];
        let key2s = ['ptAuthorizedNum', 'inventionPtAuthorizedNum', 'ptApplyNum', 'pctApplyNum', 'tenThousandPersonPtNum', 'highValuePtNum'];
        let subTitles = ['今年', '累积'];
        // 封装数据
        for (let index = 0; index < titles.length; index++) {
            let element = { title: titles[index], data: [] }
            element.data.push({
                title: subTitles[0],
                data: resData[key1s[index]] ? resData[key1s[index]] : 0,
            });
            element.data.push({
                title: subTitles[1],
                data: resData[key2s[index]] ? resData[key2s[index]] : 0,
            });
            dataArray.push(element);
        }
    })
    return dataArray;
}
// 第二版获取十四五规划目标及当前情况数据
export const get145PlanDataV2 = () => {
    return axios({
        method: 'GET',
        url: '/dls/fourteenthFiveYearPlan',
        data: {},
    });
}
// 查询十四五规划数据
export const get145PlanData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/fourteenthFiveYearPlan',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['每万人高价值发明专利拥有量', '有效发明专利', '有效注册商标量', '版权登记数', '地理标志商标/产品数', '知识产权质押融资规模', '知识产权服务机构数'];
        let subTitles = ['今年情况', '今年目标', '总目标']
        let key1s = ['tenThousandPeoplePtNum', 'validInventPtNum', 'tmRegisterValidNum', 'copyrightRegisterNum', 'landmarkTmNum', 'pledgeFinancingNum', 'serviceOrganizationNum'];
        let key2s = ['tenThousandPeoplePtYearTargetNum', 'validInventPtYearTargetNum', 'tmRegisterValidYearTargetNum', 'copyrightRegisterYearTargetNum', 'landmarkTmYearTargetNum', 'pledgeFinancingYearTargetNum', 'serviceOrganizationYearTargetNum'];
        let key3s = ['tenThousandPeoplePtTargetNum', 'validInventPtTargetNum', 'tmRegisterValidTargetNum', 'copyrightRegisterTargetNum', 'landmarkTmTargetNum', 'pledgeFinancingTargetNum', 'serviceOrganizationTargetNum'];
        for (let index = 0; index < 8; index++) {
            let element = { title: titles[index], data: [], icon: `c-c-${index + 1}.png` };
            element.data.push({
                title: subTitles[0],
                data: filledNullNumber(resData[key1s[index]]),
            });
            element.data.push({
                title: subTitles[1],
                data: filledNullNumber(resData[key2s[index]]),
            });
            element.data.push({
                title: subTitles[2],
                data: filledNullNumber(resData[key3s[index]]),
            });
            dataArray.push(element);
        }
    })
    return dataArray;
}
// 查询电线电缆知识产权概况
export const getDxDlZscqOverviewData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/industryOverview',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['专利情况', '商标情况'];
        let subTitles = [['专利授权量', '发明专利授权量', '高价值发明专利'],['商标申请量', '商标注册量', '有效商标量']];
        let keys = [['wireCablePtAuthorizedNum','wireCablePtInventionNum','wireCablePtHighValueNum'],['wireCableTmApplyNum','wireCableTmRegisterNum','wireCableTmValidNum']]
        for (let index = 0; index < 2; index++) {
            let element = { title:  titles[index], data: [] };
            for (let j = 0; j < 3; j++) {
                element.data.push({
                    title: subTitles[index][j],
                    data: filledNullNumber(resData[keys[index][j]]),
                })
            }
            dataArray.push(element);
        }
    })
    return dataArray;
}
// 查询装备制造知识产权概况
export const getZbZzZscqOverviewData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/industryOverview',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['专利情况', '商标情况'];
        let subTitles = [['专利授权量', '发明专利授权量', '高价值专利'],['商标申请量', '商标注册量', '有效商标量']];
        let keys = [['makePtAuthorizedNum','makePtInventionNum','makePtHighValueNum'],['makeTmApplyNum','makeTmRegisterNum','makeTmValidNum']]
        for (let index = 0; index < 2; index++) {
            let element = { title:  titles[index], data: [] };
            for (let j = 0; j < 3; j++) {
                element.data.push({
                    title: subTitles[index][j],
                    data: filledNullNumber(resData[keys[index][j]]),
                })
            }
            dataArray.push(element);
        }
    })
    return dataArray;
}
// 获取执法保护数据概况
export const getLawEnforcementProtectData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/lawEnforcementProtect',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['当前线索总量', '当前立案量','当前结案总量', '春雷行动案件量'];
        let keys = ['clueNum', 'registerNum', 'closeCaseNum','activeNum'];
        for (let index = 0; index < titles.length; index++) {
            dataArray.push({
                title: titles[index],
                data: filledNullNumber(resData[keys[index]]),
            })
        }
    })
    return dataArray;
}
// 获取重点关注企业数据列表
export const getFocusEnterprisesData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/focusEnterprises',
        data: {}
    }).then(res => {
        let resData = res.data;
        for (let index = 0; index < resData.length; index++) {
            dataArray.push({
                name: filledNullNumber(resData[index].enterprisesName),
                reason: filledNullNumber(resData[index].focusReason),
            })
        }
    })
    return dataArray;
}
// 获取项目资助近三年数据趋势
export const getLastThreeYearsFundingTrendsData = () => {
    let dataArray  = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/fundingTrends',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['项目资助数', '项目资助金额']
        let xUnits = ['件', '万元'];
        let yUnits = ['数量', '金额']
        for (let index = 0; index < 2; index++) {
            let element = { title: titles[index], data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < resData.length; j++) {
                element.data.push({
                    name: resData[j].fundingYear + '',
                    value: index == 0? (resData[j].fundingNum? resData[j].fundingNum : 0 )  : (resData[j].fundingMoney?resData[j].fundingMoney : 0)
                })
            }
            dataArray.push(element)
        }
    })
    return dataArray;
}
// 获取知识产权奖补近三年趋势
export const getLastThreeYearsRewardCompensationTrendsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/rewardCompensationTrends',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['奖补项目数', '奖补项目金额']
        let xUnits = ['件', '万元'];
        let yUnits = ['数量', '金额']
        for (let index = 0; index < 2; index++) {
            let element = { title: titles[index], data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < resData.length; j++) {
                element.data.push({
                    name: resData[j].rewardYear?resData[j].rewardYear : 2023,
                    value: index == 0? (resData[j].rewardNum? resData[j].rewardNum : 0 )  : (resData[j].rewardMoney?resData[j].rewardMoney : 0)
                })
            }
            dataArray.push(element)
        }
    })
    return dataArray;
}
// 获取知识产权质押融资近三年趋势
export const getLastThreeYearsPledgeFinancingTrendsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/pledgeFinancingTrends',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['质押融资主体数', '质押融资金额']
        let xUnits = ['家', '万元'];
        let yUnits = ['数量', '金额']
        for (let index = 0; index < 2; index++) {
            let element = { title: titles[index], data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < resData.length; j++) {
                element.data.push({
                    name: resData[j].pledgeYear,
                    value: index == 0? (resData[j].pledgeNum? resData[j].pledgeNum : 0 )  : (resData[j].pledgeMoney?resData[j].pledgeMoney : 0)
                })
            }
            dataArray.push(element)
        }
    })
    return dataArray;
}
// 获取知识产权交易/许可近三年趋势数据
export const getLastThreeYearsTradingLicensingTrendsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/tradingLicensingTrends',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['知识产权交易', '知识产权许可'];
        // let xUnits = ['件', '件'];
        let xUnits = ['', ''];
        let yUnits = ['数量', '数量']
        let subTitles = [['交易主体数', '交易商标数', '交易专利数'],['许可主体数', '许可商标数', '许可专利数']];
        let keys = [['tradingMainBodyNum', 'tradingTmNum', 'tradingPtNum'],['licensingMainBodyNum', 'licensingTmNum', 'licensingPtNum']];
        for (let index = 0; index < 2; index++) {
            let element = { title: titles[index], data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < 3; j++) {
                let element2 = { title: subTitles[index][j], data: [] }
                for (let k = 0; k < resData.length; k++) {
                    element2.data.push({
                        name: resData[k].year,
                        value: resData[k][keys[index][j]]? resData[k][keys[index][j]] : 0,
                    })
                }
                element.data.push(element2)
            }
            dataArray.push(element)
        }
    })
    return dataArray;
}
const overallOverview = {
    // 1.获取申请主体数据概况
    getApOverviewData : getApOverviewData(),
    // 获取商标专利概况数据合并版V2.0
    getTmAndPatentOverviewData,
    // 2.获取商标数据概况
    getTradeMarkOverviewData : getTradeMarkOverviewData(),
    // 3.查询专利数据
    getPatentOverviewData : getPatentOverviewData(),
    // 4.查询十四五规划数据
    get145PlanData : get145PlanData(),
    // 5.查询电线电缆知识产权概况
    getDxDlZscqOverviewData : getDxDlZscqOverviewData(),
    // 6.查询装备制造知识产权概况
    getZbZzZscqOverviewData : getZbZzZscqOverviewData(),
    // 7.获取执法保护数据概况
    getLawEnforcementProtectData : getLawEnforcementProtectData(),
    // 8.获取重点关注企业数据列表
    getFocusEnterprisesData : getFocusEnterprisesData(),
    // 9.获取项目资助近三年数据趋势
    getLastThreeYearsFundingTrendsData : getLastThreeYearsFundingTrendsData(),
    // 10.获取知识产权奖补近三年趋势
    getLastThreeYearsRewardCompensationTrendsData : getLastThreeYearsRewardCompensationTrendsData(),
    // 11.获取知识产权质押融资近三年趋势
    getLastThreeYearsPledgeFinancingTrendsData : getLastThreeYearsPledgeFinancingTrendsData(),
    // 12.获取知识产权交易/许可近三年趋势数据
    getLastThreeYearsTradingLicensingTrendsData : getLastThreeYearsTradingLicensingTrendsData(),

}
export default overallOverview;