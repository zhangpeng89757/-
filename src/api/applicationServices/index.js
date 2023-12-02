import axios from '@/http/axios'
import { reactive } from 'vue'
import { filledNullNumber } from '@/SystemCom/DataDeal'

const constants = {
    transformSituation: [
        {
            title: '知识产权受让量',
            key: 'transferInNum',
            unit: '件'
        }, {
            title: '知识产权转让量',
            key: 'outNum',
            unit: '件'
        },{
            title: '知识产权许可量',
            key: 'licenseNum',
            unit: '件'
        },{
            title: '知识产权被许可量',
            key: 'licensedNum',
            unit: '件'
        },{
            title: '知识产权质押融资量',
            key: 'pledgeFinancingNum',
            unit: '件'
        },{
            title: '知识产权质押融资金额',
            key: 'pledgeFinancingMoney',
            unit: '万元'
        },{
            title: '专利项目实施数',
            key: 'implementNum',
            unit: '件'
        },{
            title: '知识产权海关备案量',
            key: 'customsRecordNum',
            unit: '件'
        },{
            title: '项目资助量',
            key: 'fundingNum',
            unit: '件'
        },{
            title: '项目资助金额',
            key: 'fundingMoney',
            unit: '万元'
        },{
            title: '知识产权奖补数',
            key: 'rewardNum',
            unit: '件'
        },{
            title: '知识产权奖补金额',
            key: 'rewardMoney',
            unit: '万元'
        },{
            title: '知识产权质押融资专项补贴数',
            key: 'subsidyNum',
            unit: '件'
        },{
            title: '知识产权质押融资专项补贴金额',
            key: 'subsidyMoney',
            unit: '万元'
        },{
            title: '商标服务机构数量',
            key: 'tmAgNum',
            unit: '家'
        },{
            title: '专利服务机构数量',
            key: 'ptAgNum',
            unit: '家'
        },
    ],
}
export const getProjectFundingDataV2 = (params) => {
    return axios({
        method: 'GET',
        url: '/dls/projectFunding',
        data: {},
    });
}
// 获取项目资助工作情况统计
export const getProjectFundingData = (params) => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/projectFunding',
        data: {},
    }).then(res => {
        let resData = res.data;
        let totalList = resData.totalList;
        let applyList = resData.applyList;
        let implementList = resData.implementList;
        let completedList = resData.completedList;
        let titles = ['总体项目  ', '申请中  ', '实施中 ', '已完成  ']
        let keys1 = ['totalList', 'applyList', 'implementList', 'completedList']
        let keys2 = ['totalNum', 'applyNum', 'implementNum', 'completedNum'];
        // [[{count: 0, title: '', dataArray: []}],[{count: 0, title: '', dataArray: []}],[{count: 0, title: '', dataArray: []}],[{count: 0, title: '', dataArray: []}]]
        for (let index = 0; index < titles.length; index++){
            let element = {title: titles[index], count: resData[keys2[index]], data: []}
            for (let jndex = 0; jndex < resData[keys1[index]].length; jndex++){
                data.push({
                    xmjb: filledNullNumber(totalList[index].level),
                    xmmc: filledNullNumber(totalList[index].projectName),
                    xmdw: filledNullNumber(totalList[index].projectUnit),
                    xmje: filledNullNumber(totalList[index].money),
                    zscqlx: filledNullNumber(totalList[index].type),
                    ysjt: filledNullNumber(totalList[index].conclusion),
                });
            }
            dataArray.push(element);
        }
        // for (let index = 0; index < resData.totalList.length; index++) {
        //     dataArray.push({
        //         xmjb: totalList[index].level,
        //         xmmc: totalList[index].projectName,
        //         xmdw: totalList[index].projectUnit,
        //         xmje: totalList[index].money,
        //         zscqlx: totalList[index].type,
        //         ysjt: totalList[index].conclusion,
        //     })
        // }
        console.log('xmzz',dataArray)
    })
    return dataArray;
}
// 获取专利资助工作情况统计v2.0
export const getPatentFundingDataV2 = (params) => {
    return axios({
        method: 'GET',
        url: '/dls/patentFunding',
        data: {},
    })
}
// 获取专利资助工作情况统计
export const getPatentFundingData = (params) => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/patentFunding',
        data: {},
    }).then(res => {
        let resData = res.data;
        let totalList = resData.totalList;
        let fundingList = resData.fundingList;
        let completedList = resData.completedList;
        let titles = ['总体资助  ', '资助中  ', '已完成  '];
        let keys1 = ['totalList', 'fundingList', 'completedList'];
        let keys2 = ['totalNum', 'fundingNum', 'completedNum'];
        // for (let index = 0; index < 3; index++) {
                // todo 按照分列表进行数据封装
        // }
        for (let index = 0; index < totalList.length; index++) {
            dataArray.push({
                nd: filledNullNumber(totalList[index].year),
                xmjb: filledNullNumber(totalList[index].level),
                zzlx: filledNullNumber(totalList[index].type),
                zzsl: filledNullNumber(totalList[index].fundingNum),
                xmje: filledNullNumber(totalList[index].money),
                zzzc: filledNullNumber(totalList[index].policy),
            });
        }
    });
    return dataArray;
}
// 获取知识产权质押融资专项补贴V2.0
export const getSpecialSubsidyDataV2 = (params) => {
    return axios({
        method: 'GET',
        url: '/dls/specialSubsidy',
        data: {},
    });
}
// 获取知识产权质押融资专项补贴
export const getSpecialSubsidyData = (params) => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/specialSubsidy',
        data: {},
    }).then(res => {
        let resData = res.data;
        let totalList = resData.totalList;
        let subsidyList = resData.subsidyList;
        let completedList = resData.completedList;
        let titles = ['总体奖补  ', '申请中  ', '已完成  '];
        let keys1 = ['totalList', 'subsidyList', 'completedList'];
        let keys2 = ['totalNum', 'subsidyNum', 'completedNum'];
        for (let index = 0; index < 3; index++){
            // todo 按照分类对列表数据进行封装
        }
        for (let index = 0; index < totalList.length; index++){
            dataArray.push({
                nd: totalList[index].year,
                jbjb: filledNullNumber(totalList[index].level),
                zybd: filledNullNumber(totalList[index].pledgedSubject),
                zybd: filledNullNumber(totalList[index].pledgedSubject),
                xmdw: filledNullNumber(totalList[index].projectUnit),
                zyje: filledNullNumber(totalList[index].pledgeMoney),
                dknll: filledNullNumber(totalList[index].lendingRate),
                jbje: filledNullNumber(totalList[index].subsidyMoney),
            });
        }
    });
    return dataArray;
}
// 获取知识产权质押融资近三年趋势
export const getPledgeNumTrendsData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/pledgeNumTrends',
        data: {},
    }).then(res => {
        let resData = res.data;
        let titles = ['质押融资数', '质押融资金额'];
        let keys = ['pledgeNum', 'pledgeMoney'];
        let xUnits = ['件', '万元'];
        let yUnits = ['数量', '金额']
        for (let index = 0; index < 2; index++){
            let element = { title: titles[index], data: [], xUnit: xUnits[index], yUnit: yUnits[index] }
            for (let j = 0; j < resData.length; j++) {
                element.data.push({
                    name: resData[j].year,
                    value: resData[j][keys[index]],
                })
            }
            dataArray.push(element)
        }
    });
    return dataArray;
}
// 获取地图数据/dls/tradingLicensingMap
export const getInitMapData = (params) => {
    return axios({
        method: 'GET',
        url: '/dls/tradingLicensingMap',
        data: {},
    });
}
export const getMapData = () => {
    let dataArray = reactive({
        licensInput: [],
        licensOutput: [],
        tradingInput: [],
        tradingOutput: [],
    });
    axios({
        method: 'GET',
        url: '/dls/tradingLicensingMap',
        data: {},
    }).then(res => {
        let resData = res.data;
        let licensingInList = resData.licensingInList;// 许可转入
        let licensingOutList = resData.licensingOutList;// 许可转出
        let tradingInList = resData.tradingInList;// 转让转入
        let tradingOutList = resData.tradingOutList;// 转让转出
        // let licensInput = [];
        // let licensOutput = [];
        // let tradingInput = [];
        // let tradingOutput = [];
        for (let index = 0; index < licensingInList.length; index++){
            let element = {type: 'input', name: '许可入', data: []};
            element.data.push({
                region: licensingInList[index].region,
                tmName: '商标数量',
                tmValue: filledNullNumber(licensingInList[index].trademarkNum),
                ptName: '专利数量',
                ptValue: filledNullNumber(licensingInList[index].patentNum),
            });
            dataArray.licensInput.push(element);
        }
        for (let index = 0; index < licensingOutList.length; index++){
            let element = {type: 'output', name: '许可出', data: []};
            element.data.push({
                region: licensingOutList[index].region,
                tmName: '商标数量',
                tmValue: filledNullNumber(licensingOutList[index].trademarkNum),
                ptName: '专利数量',
                ptValue: filledNullNumber(licensingOutList[index].patentNum),
            });
            dataArray.licensOutput.push(element);
        }
        for (let index = 0; index < tradingInList.length; index++){
            let element = {type: 'input', name: '转让入', data: []};
            element.data.push({
                region: tradingInList[index].region,
                tmName: '商标数量',
                tmValue: filledNullNumber(tradingInList[index].trademarkNum),
                ptName: '专利数量',
                ptValue: filledNullNumber(tradingInList[index].patentNum),
            });
            dataArray.tradingInput.push(element);
        }
        for (let index = 0; index < tradingOutList.length; index++){
            let element = {type: 'input', name: '转让入', data: []};
            element.data.push({
                region: tradingOutList[index].region,
                tmName: '商标数量',
                tmValue: filledNullNumber(tradingOutList[index].trademarkNum),
                ptName: '专利数量',
                ptValue: filledNullNumber(tradingOutList[index].patentNum),
            });
            dataArray.tradingOutput.push(element);
        }
    });
    return dataArray;
}
// 获取知识产权运用服务情况
export const getTransformSituationData = () => {
    return new Promise(resolve => {
        axios({
            method: 'GET',
            url: '/dls/transformSituation',
            data: {},
        }).then(res => {
            let dataArray = [];
            let resData = res.data;
            for (let index = 0; index < constants.transformSituation.length; index++){
                let current = constants.transformSituation[index];
                dataArray.push({
                    title: current.title,
                    data: filledNullNumber(resData[current.key]),
                    unit: current.unit,
                });
            }
            resolve(dataArray)
        });
    })
}
// 获取服务动态数据
export const getServiceNewsData = () => {
    let dataArray = reactive([]);
    const data = [
        {
            imgPath: 'serviceNews/serviceNews_01.jpg',
            title: '旌阳区市场监管局开展“知识产权服务万里行”大走访活动',
            content: '旌阳区市场监管局开展“知识产权服务万里行”大走访活动',
            date: '2023-05-29 15:08',
        },{
            imgPath: 'serviceNews/serviceNews_02.jpg',
            title: '旌阳区市场监管局开展“春雷行动2023”整治知识产权领域假冒侵权违法专项行动',
            content: '旌阳区市场监管局开展“春雷行动2023”整治知识产权领域假冒侵权违法专项行动',
            date: '2023-02-22 15:57',
        },{
            imgPath: 'serviceNews/serviceNews_03.jpg',
            title: '旌阳区市场监督管理局开展白酒行业企业商标使用管理指导走访工作',
            content: '旌阳区市场监督管理局开展白酒行业企业商标使用管理指导走访工作',
            date: '2023-02-24 16:25',
        },
    ];
    let pageSize = 2;
    let tempArray = [];
    for (let index = 0; index < data.length; index++){
        let element = data[index];
        if (index % pageSize == 0){
            tempArray = [];
            dataArray.push(tempArray);
        }
        tempArray.push(element);
    }
    return dataArray;
}
// 电线电缆产业知识产权概况
export const getIndustryInfo1Data = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/industrialOperation',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['专利交易','专利许可', '专利质押融资量', '专利质押融资金额(万元)','商标交易', '商标许可', ]
        let keys = ['cableTransferNum','cablePtLicenseNum','cablePledgeNum','cablePledgeMoney','cableTransactionNum','cableTmLicenseNum',];
        for (let index = 0; index < titles.length; index++) {
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
        url: '/dls/industrialOperation',
        data: {}
    }).then(res => {
        let resData = res.data;
        let titles = ['专利交易','专利许可', '专利质押融资量', '专利质押融资金额(万元)','商标交易', '商标许可', ]
        let keys = ['makeTransferNum','makePtLicenseNum','makePledgeNum','makePledgeMoney','makeTransactionNum','makeTmLicenseNum',];
        for (let index = 0; index < titles.length; index++) {
            dataArray.push({
                title: titles[index],
                data: filledNullNumber(resData[keys[index]]),
            })
        }
    });
    return dataArray;
}
// 高价值专利挖掘
export const getPatentMiningData = () =>{
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/patentMining',
        data: {},
    }).then(res => {
        let resData = res.data;
        for (let index = 0; index< resData.length; index++){
            dataArray.push({
                zlh: filledNullNumber(resData[index].patentNo),
                zlmc: filledNullNumber(resData[index].patentName),
                zlr: filledNullNumber(resData[index].obligee),
                pgf: filledNullNumber(resData[index].valueEstimate),
            })
        }
    });
    return dataArray;
}
// 获取监测更新期数
export const getPdvlData = () => {
    return axios({
        method: 'GET',
        url: 'dls/monitorIssue',
        data: {},
    });
}
// 获取监测统计数据(弃用版)
export const getTmMonitorDataV1 = () => {
    return axios({
        method: 'GET',
        url: '/dls/trademarkMonitor',
        data: {},
    });
}
// 获取监测数据动态(新版)
export const getTmMonitorData = () => {
    let dataArray = reactive([]);
    axios({
        method: 'GET',
        url: '/dls/trademarkMonitor',
        data: {},
    }).then(res => {
        let resData = res.data;
        let pageSize = 2;
        let tempArray = [];
        let staticImgPathArray = {'四川爱达乐食品有限责任公司': 'zdsbyj/爱达乐logo 4倍图.png','四川洋洋百货股份有限公司':'zdsbyj/洋洋百货logo 4倍图.png'}
        for (let index = 0; index < resData.length; index++){
            let element  = { imgUrl: resData[index].imgUrl, imgPath: staticImgPathArray[resData[index].obligee], ap: resData[index].obligee, data: []};
            element.data.push({
                tmsbzs: resData[index].sameNameUnderReview,
                tmsbyx: resData[index].sameNameValid,
                gjssbzs: resData[index].similarUnderReview,
                gjssbyx: resData[index].similarValid,
            });
            if(index % pageSize == 0){
                tempArray = [];
                dataArray.push(tempArray);
            }
            tempArray.push(element);
        }
    });
    return dataArray;
}
const applicationServices = {
    // 获取项目资助工作情况统计
    getProjectFundingData,
    // 获取项目资助工作情况统计V2.0
    getProjectFundingDataV2,
    // 获取专利资助工作情况统计
    getPatentFundingData,
    // 获取专利资助工作情况统计V2.0
    getPatentFundingDataV2,
    // 获取知识产权质押融资专项补贴
    getSpecialSubsidyData,
    // 获取知识产权质押融资专项补贴V2.0
    getSpecialSubsidyDataV2,
    // 获取服务新闻动态
    getServiceNewsData,
    // 获取重点品牌预警监测数据
    getTmMonitorData,
    // 获取知识产权质押融资近三年趋势
    getPledgeNumTrendsData : getPledgeNumTrendsData(),
    // 获取地图数据
    getMapData : getMapData(),
    // 获取地图初始化数据
    getInitMapData: getInitMapData(),
    // 知识产权运用数据
    getTransformSituationData : getTransformSituationData(),
    // 电线电缆
    getIndustryInfo1Data: getIndustryInfo1Data(),
    // 装备制造
    getIndustryInfo2Data: getIndustryInfo2Data(),
    // 高价值专利挖掘
    getPatentMiningData: getPatentMiningData(),
}
export default applicationServices;