import axios from '@/http/axios'
import {reactive } from 'vue'
import { filledNullNumber } from '@/SystemCom/DataDeal'
const constants = {
    // 主体信息字段映射解析
    innovateAchievements: {
        authorizedPtNum : '授权专利',
        inventAuthorizedNum: '授权发明专利',
        highValuePtNum : '高价值发明专利',
        pctPtNum : 'PCT专利',
        registerNum	: '注册商标',
        wellKnownNum : '驰名商标',
        madridNum : '马德里商标',
        specialSignsNum	: '特殊标志',
        landmarkNum : '地理标志商标',
        landmarkProductNum	: '地理标志产品',
        landmarkProduceNum : '农产品地理标志',
        copyrightNum : '版权',
        circuitLayoutNum : '集成电路布图',
        newPlantVarietyNum	: '授权植物新品种',
    }
}

// 获取创新创造主体数据
export const getInnovateApData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/innovateMainBody',
        data: {}
    }).then(res => {
        let resData = res.data;
        for (let index = 0; index < resData.length; index++) {

            dataArray.push({
                name: resData[index].mainBodyName,
                zcsb: filledNullNumber(resData[index].registerTmNum),
                zlsq: filledNullNumber(resData[index].authorizedPtNum),
                jzjg: filledNullNumber(resData[index].highValueNum),
                fmzlsq: filledNullNumber(resData[index].inventAuthorizedNum),
            })
        }
    });
    return dataArray;
}
// 专利/发明专利授权量近三年趋势
export const getInventionPtTrendsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/ptAuthorizeTrends',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['专利授权量', '发明专利授权量'];
        let keys = ['ptNum','inventionPtNum'];
        let xUnits = ['件', '件'];
        let yUnits = ['数量', '数量']
        for (let index = 0; index < 1; index++) {
            let element = { title: `大数据${index + 1}`, data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < 2; j++) {
                let element2 = { title: titles[j], data: [] }
                for (let k = 0; k < resData.length; k++) {
                    element2.data.push({
                        name: resData[k].year,
                        value: resData[k][keys[j]]
                    })
                }
                element.data.push(element2)
            }
            dataArray.push(element)
        }
    });
    return dataArray;
}
// 注册商标近三年趋势
export const getApplyRegisterTrendsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/applyRegisterTrends',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['商标申请量', '商标注册量'];
        let keys = ['applyNum','registerNum'];
        let xUnits = ['件', '件'];
        let yUnits = ['数量', '数量']
        for (let index = 0; index < 1; index++) {
            let element = { title: `大数据${index + 1}`, data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < 2; j++) {
                let element2 = { title: titles[j], data: [] }
                for (let k = 0; k < resData.length; k++) {
                    element2.data.push({
                        name: resData[k].year,
                        value: resData[k][keys[j]]
                    })
                }
                element.data.push(element2)
            }
            dataArray.push(element)
        }
    });
    return dataArray;
}
// 知识产权创新创造成果
export const getInnovateAchievementsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/innovateAchievements',
        data: {}
    }).then(res => {
        let resData = res.data;
        for (let key in constants.innovateAchievements) {
            console.log(key, constants.innovateAchievements[key])
            if(key != 'specialSignsNum' && key != 'landmarkProductNum' && key != 'landmarkProduceNum' && key != 'newPlantVarietyNum') {
                dataArray.push({
                    title: key == 'landmarkNum' ? '地理标志' : constants.innovateAchievements[key],
                    data: filledNullNumber(resData[key])
                })
            }
        }
    });
    return dataArray;
}

//高价值专利分析
export const getHighValuePtAnalysisData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/highValuePtAnalysis',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['战略性新兴产业的发明专利','在海外有同族专利权的发明专利','维持年限超过10年的发明专利','实现较高质押融资金额的发明专利','获得国家科学技术奖或中国专利奖的发明专利'];
        let keys = ['emergingIndustriesPtNum','overseasPtNum','moreThanTenYearsPtNum','highPledgeFinancingPtNum','awardsPtNum']
        for (let index = 0; index < titles.length; index++) {
            dataArray.push({
                name: titles[index],
                value: resData[keys[index]],
            })
        }
    });
    return dataArray;
}
// 知识产权主体类型分析
export const getMainBodyTypeAnalysisData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/mainBodyTypeAnalysis',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['企业','自然人','事业单位(暂无数据)','科研机构','高等院校'];
        let keys = ['enterpriseNum','naturalPersonNum','publicInstitutionsNum','researchInstitutionNum','collegeNum']
        for (let index = 0; index < titles.length; index++) {
            dataArray.push({
                name: titles[index],
                value: resData[keys[index]],
            })
        }
    });
    return dataArray;
}
// 近一年商标申请热门方向（商品/服务）
export const getApplyHotWordsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/applyHotWords',
        data: {}
    }).then(res => {
        let resData = res.data;
        for (let index = 0; index < resData.length; index++) {
            dataArray.push({
                name: resData[index].hotWords,
                value: resData[index].applyNum,
                color: "#fff"
            })
        }
    });
    return dataArray;
}
// 电线电缆产业知识产权概况
export const getIndustryInfo1Data = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/industryInfo',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['高价值发明专利', '专利授权量', '注册商标量', ]
        let keys = ['wireCableHighValuePtNum', 'wireCablePtAuthorizedNum', 'wireCableTmApplyNum']
        for (let index = 0; index < 3; index++) {
            dataArray.push({
                title: titles[index],
                data: filledNullNumber(resData[keys[index]]),
            })
        }
    });
    return dataArray;
}
// 装备制造产业知识产权概况
export const getIndustryInfo2Data = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/industryInfo',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['高价值发明专利', '专利授权量', '注册商标量', ]
        let keys = ['makeHighValuePtNum', 'makePtAuthorizedNum', 'makeTmApplyNum']
        for (let index = 0; index < 3; index++) {
            dataArray.push({
                title: titles[index],
                data: filledNullNumber(resData[keys[index]]),
            })
        }
    });
    return dataArray;
}

// 疑似非正常专利申请线索
export const getPtClueListData = () => {
    return axios({
        method: 'GET',
        url: '/dls/applyClue',
        data: {}
    })
}


const innovationcreation = {
    // 获取创新创造主体数据
    getInnovateApData: getInnovateApData(),
    // 专利/发明专利授权量近三年趋势
    getInventionPtTrendsData : getInventionPtTrendsData(),
    // 注册商标近三年趋势
    getApplyRegisterTrendsData : getApplyRegisterTrendsData(),
    // 知识产权创新创造成果
    getInnovateAchievementsData : getInnovateAchievementsData(),
    //高价值专利分析
    getHighValuePtAnalysisData : getHighValuePtAnalysisData(),
    // 主体类型分析
    getMainBodyTypeAnalysisData: getMainBodyTypeAnalysisData(),
    // 获取近一年商标申请热词
    getApplyHotWordsData : getApplyHotWordsData(),
    // 电线电缆产业知识产权概况
    getIndustryInfo1Data : getIndustryInfo1Data(),
    // 装备制造产业知识产权概况
    getIndustryInfo2Data : getIndustryInfo2Data(),
    // 非正常申请商标涉及机构线索
    getPtClueListData : getPtClueListData(),
}

export default innovationcreation;