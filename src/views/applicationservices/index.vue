<template>
    <div class="content-view">
        <div style="margin-left: 10px; width: 590px; max-width: 590px; overflow: hidden;">
            <div style="overflow: hidden;display: flex; flex-direction: column; height: 210px; box-sizing: border-box; position: relative;" class="model-backgroud">
                <titlebar content="省级知识产权项目资助">
                    <template #tools>
                        <div style="position: absolute; z-index: 9999; top: 0;">
                            <div class="titlebar-piece-box" :class="[viewObj.xmzzIndex == 0 ? 'line-piece-box-checked' : '']"
                                @click="GetXMZZData(0)">全部&emsp;{{ viewObj.xmzzCount[0] }}</div>
                            <div class="titlebar-piece-box" :class="[viewObj.xmzzIndex == 1 ? 'line-piece-box-checked' : '']"
                                @click="GetXMZZData(1)">申请中&emsp;{{ viewObj.xmzzCount[1] }}</div>
                            <div class="titlebar-piece-box" :class="[viewObj.xmzzIndex == 2 ? 'line-piece-box-checked' : '']"
                                @click="GetXMZZData(2)">实施中&emsp;{{ viewObj.xmzzCount[2] }}</div>
                            <div class="titlebar-piece-box" :class="[viewObj.xmzzIndex == 3 ? 'line-piece-box-checked' : '']"
                                @click="GetXMZZData(3)">已完成&emsp;{{ viewObj.xmzzCount[3] }}</div>
                        </div>
                    </template>
                </titlebar>
                <Scrolltable @rowClick="zscqxmzzRowClick" style="flex: 1; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0.5))" :columns="xmzzColumns" :data="viewObj.xmzzData"></Scrolltable>
                <div class="applicationservices-tbinfobox" v-if="viewObj.zscqxmzzShowInfo"> 
                    <div style="background-size: 100% auto; background-position: bottom; padding-left: 4px; display: flex;" class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                        <div style="flex: 1;margin-bottom: 8px;">项目资助详情</div>
                        <div style="text-align: right;margin-right: 4px;"><el-icon @click="()=>{ viewObj.zscqxmzzInfo = {}; viewObj.zscqxmzzShowInfo = false; }" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
                    </div>
                    <div style="flex:1;display: flex; flex-direction: column; overflow-y: auto; padding: 10px;">
                        <div style="display: flex;"><div>项目单位：</div><div style="flex: 1; margin-bottom: 10px;">{{ viewObj.zscqxmzzInfo.xmdw }}</div></div>
                        <div style="display: flex;"><div>项目名称：</div><div style="flex: 1; margin-bottom: 10px;">{{ viewObj.zscqxmzzInfo.xmmc }}</div></div>
                        <div style="display: flex;"><div>项目金额：</div><div style="flex: 1; margin-bottom: 10px;">{{ viewObj.zscqxmzzInfo.xmje }}万元</div></div>
                        <div style="display: flex;"><div>项目情况：</div><div style="flex: 1;">{{ viewObj.zscqxmzzInfo.content }}</div></div>
                    </div>
                </div>
            </div>
            <div style="overflow: hidden;display: flex; flex-direction: column; margin-top: 20px; height: 210px;box-sizing: border-box; position: relative;"  class="model-backgroud">
                <titlebar content="专利资助工作情况统计">
                    <template #tools>
                        <div class="titlebar-piece-box" :class="[viewObj.zlzzIndex == 0 ? 'line-piece-box-checked' : '']"
                            @click="GetZLZZData(0)">全部&emsp;{{ viewObj.zlzzCount[0] }}</div>
                        <div class="titlebar-piece-box" :class="[viewObj.zlzzIndex == 1 ? 'line-piece-box-checked' : '']"
                            @click="GetZLZZData(1)">资助中&emsp;{{ viewObj.zlzzCount[1] }}</div>
                        <div class="titlebar-piece-box" :class="[viewObj.zlzzIndex == 2 ? 'line-piece-box-checked' : '']"
                            @click="GetZLZZData(2)">已完成&emsp;{{ viewObj.zlzzCount[2] }}</div>
                    </template>
                </titlebar>
                <Scrolltable  @rowClick="zlzzRowClick" style="flex: 1; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0.5))" :columns="zlzzgzqqColumns" :data="viewObj.zlzzData"></Scrolltable>
                <div class="applicationservices-tbinfobox" v-if="viewObj.zlzzShowInfo"> 
                    <div style="background-size: 100% auto; background-position: bottom; padding-left: 4px; display: flex;" class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                        <div style="flex: 1;margin-bottom: 8px;">{{viewObj.zlzzYear}}年专利资助台账</div>
                        <div style="text-align: right;margin-right: 4px;"><el-icon @click="()=>{ viewObj.zlzzInfo = []; viewObj.zlzzShowInfo = false; }" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
                    </div>
                    <div style="flex:1;display: flex; flex-direction: column; overflow-y: auto;">
                        <Scrolltable style="flex: 1;" :columns="zlzztzColumns" :data="viewObj.zlzzInfo"></Scrolltable>
                    </div>
                </div>
            </div>
            <div style="overflow: hidden;display: flex; flex-direction: column; margin-top: 20px; height: 210px; box-sizing: border-box;" class="model-backgroud">
                <titlebar content="知识产权奖补情况">
                    <!-- <template #tools>
                        <div class="titlebar-piece-box" :class="[viewObj.zscqIndex == 0 ? 'line-piece-box-checked' : '']"
                            @click="GetZSCQData(0)">全部&emsp;{{ viewObj.zscqCount[0] }}</div>
                        <div class="titlebar-piece-box" :class="[viewObj.zscqIndex == 1 ? 'line-piece-box-checked' : '']"
                            @click="GetZSCQData(1)">申请中&emsp;{{ viewObj.zscqCount[1] }}</div>
                        <div class="titlebar-piece-box" :class="[viewObj.zscqIndex == 2 ? 'line-piece-box-checked' : '']"
                            @click="GetZSCQData(2)">已完成&emsp;{{ viewObj.zscqCount[2] }}</div>
                    </template> -->
                </titlebar>
                <Scrolltable
                    class="zscqzyrzzxbtcontent"
                    style="flex: 1; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0.5))" :columns="zscqzyrzzxbtColumns" :data="viewObj.zscqData"></Scrolltable>
            </div>
            <Line :backgroundImage="global.getAssetsFile('qjgk/line-bg.png')" ref="echarts-line1"
                style="height: 260px; width: 100%; margin-top: 20px;" title="知识产权质押融资数/融资金额近三年趋势"
                :data="applicationServices.getPledgeNumTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name"
                dataItemDataValue="value" yUnit="数量" xUnit="件"></Line>
        </div>
        <div style="width: 680px; max-width: 680px; overflow: hidden; margin: 20px 20px 0; box-sizing: border-box;">
            <div style="height: 500px; overflow: hidden; width: 100%; display: flex; flex-direction: column;margin-bottom: 20px;">
                <div style="display: flex; justify-content: center; align-items: flex-end; margin: 10px;">
                    <div class="background-image-box mapchange-box"
                        :class="[viewObj.checkedIndex == 0 ? 'mapchange-box-checked' : '']"
                        :style="{ backgroundImage: 'url(' + global.GetImages(viewObj.checkedIndex == 0 ? 'map-top-rect-checked.png' : 'map-top-rect.png') + ')' }"
                        @click="changemapData(0)">{{ mapType[0] }}</div>
                    <div class="background-image-box mapchange-box"
                        :class="[viewObj.checkedIndex == 1 ? 'mapchange-box-checked' : '']"
                        :style="{ backgroundImage: 'url(' + global.GetImages(viewObj.checkedIndex == 1 ? 'map-top-rect-checked.png' : 'map-top-rect.png') + ')' }"
                        @click="changemapData(1)">{{ mapType[1] }}</div>
                    <div class="background-image-box mapchange-box"
                        :class="[viewObj.checkedIndex == 2 ? 'mapchange-box-checked' : '']"
                        :style="{ backgroundImage: 'url(' + global.GetImages(viewObj.checkedIndex == 2 ? 'map-top-rect-checked.png' : 'map-top-rect.png') + ')' }"
                        @click="changemapData(2)">{{ mapType[2] }}</div>
                    <div class="background-image-box mapchange-box"
                        :class="[viewObj.checkedIndex == 3 ? 'mapchange-box-checked' : '']"
                        :style="{ backgroundImage: 'url(' + global.GetImages(viewObj.checkedIndex == 3 ? 'map-top-rect-checked.png' : 'map-top-rect.png') + ')' }"
                        @click="changemapData(3)">{{ mapType[3] }}</div>
                </div>
                <Map ref="refMap" style="flex: 1;" :showCenterBottomInfo="viewObj.showCenterBottomInfo" @openDetailList="openDetailList"></Map>
            </div>
            <div class="model-backgroud" style="height: 300px; overflow: hidden; display: flex;flex-direction: column; overflow: hidden; position: relative;">
                <titlebar content="知识产权运用服务情况" algin="center"/>
                <FlowBox style="position: relative;">
                    <el-carousel class="center-buttom" style="flex:1;overflow: hidden;padding: 0 10px;" :interval="5000" arrow="always"
                        indicator-position="none" height="100%">
                        <el-carousel-item v-for="item in viewObj.centerBottomData" :key="item">
                            <MainListBlock :lineNumber="4" gap="10px" :data="item" style="flex: 1; overflow: hidden; height: 100%; margin: 0 20px 10px; background-image: unset; ">
                                <template v-slot:item="{ slotData }">
                                    <CenterBottom :data="slotData" titleKey="title" dataKey="data" @click="showCenterBottomInfoFun(slotData)"/>
                                </template>
                            </MainListBlock>
                        </el-carousel-item>
                    </el-carousel>
                    <div v-if="viewObj.showCenterBottomInfo" style="position: absolute; display: flex; flex-direction: column; left: 0; top: 0; z-index: 20; width: 100%; height: 100%;" class="model-backgroud">
                        <div v-if="viewObj.showCenterBottomInfo" style="text-align: right;margin-right: 4px;position: absolute; right: 0; top: -4px;"><el-icon @click="viewObj.showCenterBottomInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
                        <centerBottomInfoVue :com="viewObj.centerBottomInfo"></centerBottomInfoVue>
                    </div>
                </FlowBox>
            </div>
        </div>
        <div style="margin-right: 10px; width: 580px; max-width: 580px; overflow: hidden; box-sizing: border-box;z-index: 9999;">
            <ZScqqqyj ref="refZScqqqyj" style="height: 506px; overflow: hidden; box-sizing: border-box;"></ZScqqqyj>
            <div style="height: 200px; box-sizing: border-box; overflow: hidden; position: relative; margin-top: 14px; display: grid; grid-template-columns:repeat(2,1fr); gap: 20px;">
                <div style="display: flex; flex-direction: column; overflow: hidden;"  class="model-backgroud">
                    <titlebar content="装备制造产业知识产权运营" style="height: 30px; box-sizing: border-box;"/>
                    <MainListBlock :data="applicationServices.getIndustryInfo2Data" :lineNumber="2" style="flex: 1; overflow: hidden; padding:10px 6px;">
                        <template v-slot:item="{ slotData }">
                            <RightRange :data="slotData" titleKey="title" dataKey="data" @click="showRightCenterInfoFun(slotData, '装备制造产业')"/>
                        </template>
                    </MainListBlock>
                </div>
                <div style="display: flex; flex-direction: column; overflow: hidden;"  class="model-backgroud">
                    <titlebar content="电线电缆产业知识产权运营" style="height: 30px; box-sizing: border-box;"/>
                    <MainListBlock style="flex: 1; overflow: hidden; padding:10px 6px;" :data="applicationServices.getIndustryInfo1Data"
                        :lineNumber="2">
                        <template v-slot:item="{ slotData }">
                            <RightRange :data="slotData" titleKey="title" dataKey="data" @click="showRightCenterInfoFun(slotData, '电线电缆产业')"/>
                        </template>
                    </MainListBlock>
                </div>
                <div v-if="viewObj.showRightCenterInfo" style="position: absolute; display: flex; flex-direction: column; left: 0; top: 0; z-index: 20; width: 100%; height: 100%;" class="model-backgroud">
                    <div v-if="viewObj.showRightCenterInfo" style="text-align: right;margin-right: 4px;position: absolute; right: 0; top: 4px;"><el-icon @click="viewObj.showRightCenterInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
                    <centerBottomInfoVue :com="viewObj.rightCenterInfo" style="padding: 10px;"></centerBottomInfoVue>
                </div>
            </div>
            <Qyfw style="height: 216px; overflow: hidden; margin-top: 9px;"></Qyfw>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch, inject, onMounted, getCurrentInstance } from 'vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import RightRange from '@/components/applicationservices/right-range.vue'
import titlebar from '@/components/titlebar.vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import Line from '@/components/echarts/line.vue'
import CenterBottom from '@/components/applicationservices/center-bottom.vue'
import Map from '@/components/echarts/map.vue'
import applicationServices from '@/api/applicationServices'
import { filledNullNumber } from '@/SystemCom/DataDeal'
import ZScqqqyj from '@/components/applicationservices/zscqqqyj.vue'
import Qyfw from '../../components/applicationservices/qyfw.vue'
import centerBottomInfoVue from '@/components/applicationservices/center-bottom-info.vue'
import * as HTTPAPI from './../../api/applicationServices/api'

const { proxy } = getCurrentInstance();
const global = inject('global');
const viewObj = reactive({
    checkedIndex: 0,
    xmzzIndex: 0,
    xmzzData: [],
    xmzzCount: [0, 0, 0, 0],
    zlzzIndex: 0,
    zlzzData: [],
    zlzzCount: [0, 0, 0],
    zscqIndex: 0,
    zscqData: [],
    zscqCount: [0, 0, 0],
    centerBottomData: [],
    showCenterBottomInfo: false,
    centerBottomInfo: { title: "", data: null, columns: [] },
    showRightCenterInfo: false,
    rightCenterInfo: { title: "", data: null, columns: [] },
    zscqxmzzShowInfo: false,
    zscqxmzzInfo: { },
    zlzzShowInfo: false,
    zlzzYear: 0,
    zlzzInfo: []
})
// 接口数据
const apiData = reactive({
    xmzzData: [],
    zlzzData: [],
    zscqData: [],
})
//中间底部数据
const GetCenterBottomData = () => {
    applicationServices.getTransformSituationData.then(res => {
        let pageNumber = 8;
        let dataArray = [];
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (index % pageNumber == 0) {
                dataArray = [];
                viewObj.centerBottomData.push(dataArray);
            }
            dataArray.push(element)
        }
    });

}
// 项目资助总数据
const xmzzData = reactive([]);
// 专利资助总数据
const zlzzData = reactive([]);
// 知识产权总数据
const zscqData = reactive([]);
//中间底部数据
const refMap = ref(null);
// 知识产权预警
const refZScqqqyj = ref(null)
/**项目资助表头 */
const xmzzColumns = [
    { field: 'year', width: 60, title: '年度' },
    { field: 'xmmc', title: '项目名称' },
    { field: 'xmdw', title: '项目单位' },
    { field: 'xmje', width: 110, title: '项目金额(万元)', align: 'center' },
    { field: 'zscqlx', width: 110, title: '知识产权类型', align: 'center' },
    { field: 'ysjt', width: 110, title: '验收结题', align: 'center' }
]

/**专利资助工作情况统计表头 */
const zlzzgzqqColumns =  [
    { field: 'nd', width: 80, title: '年度' },
    { field: 'xmjb', width: 100, title: '项目级别' },
    // { field: 'zzlx', width: 80, title: '资助类型' },
    { field: 'zzsl', width: 200, title: '资助数量(件)', align: 'center' },
    { field: 'xmje', title: '项目金额(万元)', align: 'center' },
    // { field: 'zzzc', title: '资助政策' }
]
/**专利资助台账表头 */
const zlzztzColumns = [
    { field: 'payee', title: '收款人' },
    { field: 'ptNum', width: 180, title: '专利数量(件)', align: 'center' , align: 'center'},
    { field: 'amount', width: 180, title: '资助金额(万元)', align: 'center', align: 'center'},
]

/**知识产权质押融资专项补贴表头 */
const zscqzyrzzxbtColumns = [
    // { field: 'nd', width: 60, title: '年度' },
    { field: 'unit', title: '奖补单位' },
    { field: 'category', title: '奖补类型' },
    { field: 'amount', width: 120, title: '奖补金额(万元)', align: 'center'}
]

/**项目资助数据 */
const GetXMZZData = (index) => {
    if (apiData.xmzzData && apiData.xmzzData.length > 0) {
        // 已经有数据了
        viewObj.xmzzData = [];
        viewObj.xmzzData = apiData.xmzzData[index].data;
        viewObj.xmzzCount[index] = apiData.xmzzData[index].count;
    } else {
        // 没有数据，先取数据
        viewObj.xmzzData = [];
        apiData.xmzzData = [];
        applicationServices.getProjectFundingDataV2().then(res => {
            let resData = res.data;
            let titles = ['总体项目  ', '申请中  ', '实施中 ', '已完成  ']
            let keys1 = ['totalList', 'applyList', 'implementList', 'completedList']
            let keys2 = ['totalNum', 'applyNum', 'implementNum', 'completedNum'];
            for (let index = 0; index < titles.length; index++) {
                let element = { title: titles[index], count: resData[keys2[index]], data: [] }
                for (let jndex = 0; jndex < resData[keys1[index]].length; jndex++) {
                    let money = resData[keys1[index]][jndex].money
                    if ((!money && money != 0) || money < 0 || money === ''){
                        money = '-'
                    }
                    element.data.push({
                        year: filledNullNumber(resData[keys1[index]][jndex].year),
                        xmjb: filledNullNumber(resData[keys1[index]][jndex].level),
                        xmmc: filledNullNumber(resData[keys1[index]][jndex].projectName),
                        xmdw: filledNullNumber(resData[keys1[index]][jndex].projectUnit),
                        xmje: money,
                        zscqlx: filledNullNumber(resData[keys1[index]][jndex].type),
                        ysjt: filledNullNumber(resData[keys1[index]][jndex].conclusion),
                        content: filledNullNumber(resData[keys1[index]][jndex].content),
                    });
                }
                apiData.xmzzData.push(element);
            }
            viewObj.xmzzData = apiData.xmzzData[index].data;
            viewObj.xmzzCount[index] = apiData.xmzzData[index].count;
        })

    }
    viewObj.xmzzIndex = index;
}
/**专利资助数据 */
const GetZLZZData = (index) => {
    if (apiData.zlzzData && apiData.zlzzData.length > 0) {
        // 已经有数据了
        viewObj.zlzzData = [];
        viewObj.zlzzData = apiData.zlzzData[index].data;
        viewObj.zlzzCount[index] = apiData.zlzzData[index].count;
    } else {
        // 没有数据，先取数据
        viewObj.zlzzData = [];
        apiData.zlzzData = [];
        applicationServices.getPatentFundingDataV2().then(res => {
            let resData = res.data;
            let titles = ['总体资助  ', '资助中  ', '已完成  '];
            let keys1 = ['totalList', 'fundingList', 'completedList'];
            let keys2 = ['totalNum', 'fundingNum', 'completedNum'];
            for (let index = 0; index < titles.length; index++) {
                let element = { title: titles[index], count: resData[keys2[index]], data: [] }
                for (let jndex = 0; jndex < resData[keys1[index]].length; jndex++) {
                    let money = resData[keys1[index]][jndex].money
                    if ((!money && money != 0) || money < 0 || money === ''){
                        money = '-'
                    }
                    element.data.push({
                        nd: filledNullNumber(resData[keys1[index]][jndex].year),
                        xmjb: filledNullNumber(resData[keys1[index]][jndex].level),
                        zzlx: filledNullNumber(resData[keys1[index]][jndex].type),
                        zzsl: filledNullNumber(resData[keys1[index]][jndex].fundingNum),
                        xmje: money,
                        zzzc: filledNullNumber(resData[keys1[index]][jndex].policy),
                    });
                }
                apiData.zlzzData.push(element);
            }
            viewObj.zlzzData = apiData.zlzzData[index].data;
            viewObj.zlzzCount[index] = apiData.zlzzData[index].count;
        })

    }
    viewObj.zlzzIndex = index;
}
/**知识产权数据 */
const GetZSCQData = (index) => {
    viewObj.zscqData = [];
    viewObj.zscqIndex = index;
    viewObj.zscqData = applicationServices.getSpecialSubsidyData(index);
    //====================================================================
    if (apiData.zscqData && apiData.zscqData.length > 0) {
        // 已经有数据了
        viewObj.zscqData = [];
        viewObj.zscqData = apiData.zscqData[index].data;
        viewObj.zscqCount[index] = apiData.zscqData[index].count;
    } else {
        // 没有数据，先取数据
        viewObj.zscqData = [];
        apiData.zscqData = [];
        applicationServices.getSpecialSubsidyDataV2().then(res => {
            let resData = res.data;
            let titles = ['总体奖补  ', '申请中  ', '已完成  '];
            let keys1 = ['totalList', 'subsidyList', 'completedList'];
            let keys2 = ['totalNum', 'subsidyNum', 'completedNum'];
            for (let index = 0; index < titles.length; index++) {
                let element = { title: titles[index], count: resData[keys2[index]], data: [] }
                for (let jndex = 0; jndex < resData[keys1[index]].length; jndex++) {
                    element.data.push({
                        nd: filledNullNumber(resData[keys1[index]][jndex].year),
                        jbjb: filledNullNumber(resData[keys1[index]][jndex].level),
                        zybd: filledNullNumber(resData[keys1[index]][jndex].pledgedSubject),
                        xmdw: filledNullNumber(resData[keys1[index]][jndex].projectUnit),
                        zyje: filledNullNumber(resData[keys1[index]][jndex].pledgeMoney) + "万元",
                        dknll: filledNullNumber(resData[keys1[index]][jndex].lendingRate) + "%",
                        jbje: filledNullNumber(resData[keys1[index]][jndex].subsidyMoney) + "万元",
                    });
                }
                apiData.zscqData.push(element);
            }
            viewObj.zscqData = apiData.zscqData[index].data;
            viewObj.zscqCount[index] = apiData.zscqData[index].count;
        })

    }
    viewObj.zscqIndex = index;
}

/**电线电缆产业 */
const GetZBZZCYData = () => {
    let dataArray = [];
    for (let index = 0; index < 6; index++) {
        dataArray.push({
            title: `数据${index + 1}`,
            data: parseInt(Math.random() * 100000)
        })
    }
    return dataArray;
}

/**测试数据 */
const GetgjzzlwjData = () => {
    let dataArray = [];
    for (let index = 0; index < 117; index++) {
        dataArray.push({
            zlh: `数据${index + 1}`,
            zlmc: parseInt(Math.random() * 10000),
            zlr: parseInt(Math.random() * 10000),
            pgf: parseInt(Math.random() * 10000)
        })
    }
    return dataArray;
}
// 地图数据
const mapType = {
    0: '转让',
    1: '受让',
    2: '许可',
    3: '被许可',
}
// 记录是否是携带了地理位置的查询
let regionVal = ''
/**地图切换数据 */
const changemapData = (index) => {
    viewObj.checkedIndex = index;
    (index == 0 || index == 2) ?  refMap?.value?.GetOutData?.(index) : refMap?.value?.GetInData?.(index)
    if(regionVal){
        viewObj.showCenterBottomInfo = false;
    }
}
/* 点击地图-获取对应区域的数据 */
const openDetailList = (region) => {
    showCenterBottomInfoFun({title:  `知识产权${mapType[viewObj.checkedIndex]}量`}, region)
}
/**显示中间底部点击详情 */
const showCenterBottomInfoFun = (data, region) => {
    regionVal = region
    viewObj.showCenterBottomInfo = true;
    viewObj.centerBottomInfo.title = data.title;
    viewObj.centerBottomInfo.data = [];
    if(data.title == "知识产权受让量" || data.title == "知识产权转让量") {
        let type = data.title == "知识产权受让量" ? 1 : 2;
        viewObj.centerBottomInfo.data = {
            "商标": {
                columns: [
                    { field: 'trademarkNumber', title: '商标号', width: 150},
                    { field: 'trademarkName', title: '商标名称', width: 150},
                    { field: 'inCompany', title: '受让主体' },
                    { field: 'outCompany', title: '转让主体'}
                ],
                data: [],
            },
            "专利": {
                columns: [
                    { field: 'patentNumber', title: '专利号', width: 150},
                    { field: 'patentName', title: '专利名称', width: 150},
                    { field: 'inCompany', title: '受让主体' },
                    { field: 'outCompany', title: '转让主体'}
                ],
                data: []
            }
        }
        let params = { type }
        if(region){
            params.region = region
        }
        HTTPAPI.ptTransferList(params).then(res=> {
            viewObj.centerBottomInfo.data["专利"].data = res.data.list;
        })
        HTTPAPI.tmTransferList(params).then(res=> {
            viewObj.centerBottomInfo.data["商标"].data = res.data.list;
        })
    } else if(data.title == "知识产权许可量" || data.title == "知识产权被许可量") {
        let type = data.title == "知识产权许可量" ? 1 : 2;
        viewObj.centerBottomInfo.data = {
            "商标": {
                columns: [
                    { field: 'trademarkNumber', title: '商标号', width: 150},
                    { field: 'trademarkName', title: '商标名称', width: 150},
                    { field: 'obligee', title: '权利人', width: 100 },
                    { field: 'enterprise', title: '被许可企业'}
                ],
                data: [],
            },
            "专利": {
                columns: [
                    { field: 'patentNumber', title: '专利号', width: 150},
                    { field: 'patentName', title: '专利名称', width: 150},
                    { field: 'patentee', title: '权利人', width: 100 },
                    { field: 'enterprise', title: '被许可企业'}
                ],
                data: []
            }
        }
        let params = { type }
        if(region){
            params.region = region
        }
        HTTPAPI.ptLicenseList(params).then(res=> {
            viewObj.centerBottomInfo.data["专利"].data = res.data.list;
        })
        HTTPAPI.tmLicenseList(params).then(res=> {
            viewObj.centerBottomInfo.data["商标"].data = res.data.list;
        })
    } else if(data.title == "知识产权质押融资量") {
        viewObj.centerBottomInfo.columns = [
            { field: 'typename', title: '质押融资类型', width: 150},
            { field: 'obligee', title: '权利人' },
        ];
        
        HTTPAPI.pledgeFinancing().then(res => {
            if(res?.data) {
                for (let index = 0; index < res.data.list.length; index++) {
                    const element = res.data.list[index];
                    element.typename = element.type == 1 ?  "专利" : "商标";
                    viewObj.centerBottomInfo.data = res.data.list;
                }
            }
        })
    } else if(data.title == "知识产权质押融资金额") {
        viewObj.centerBottomInfo.columns = [
            { field: 'type', title: '质押融资类型', width: 150},
            { field: 'obligee', title: '权利人' },
            { field: 'amount', title: '质押融资金额(万元)', width: 150, align: 'center' },
        ];
        HTTPAPI.pledgeFinancing().then(res => {
            if(res?.data) {
                for (let index = 0; index < res.data.list.length; index++) {
                    const element = res.data.list[index];
                    element.type = element.type == 1 ?  "专利" : "商标";
                }
                viewObj.centerBottomInfo.data = res.data.list;
            }
        })
    } else if(data.title == "专利项目实施数") {
        viewObj.centerBottomInfo.columns = [
            { field: 'applyNumber', title: '申请号'},
            { field: 'patentee', title: '专利权人', width: 150 },
            { field: 'projectName', title: '项目名称' },
            { field: 'unit', title: '实施单位名称' },
        ];
        HTTPAPI.projectImplement().then(res => {
            if(res?.data) {
                viewObj.centerBottomInfo.data = res.data.list;
            }
        })
    } else if(data.title == "知识产权海关备案量") {
        viewObj.centerBottomInfo.columns = [
            { field: 'filingsNumber', title: '海关备案号'},
            { field: 'propertyNumber', title: '知识产权号' },
            { field: 'obligee', title: '权利人', width: 100 }
        ];
        HTTPAPI.customsRecord().then(res => {
            if(res?.data) {
                viewObj.centerBottomInfo.data = res.data.list;
            }
        })
    } else if(data.title == "项目资助量" || data.title == "项目资助金额") {
        viewObj.centerBottomInfo.columns = [
            { field: 'projectName', title: '项目名称'},
            { field: 'unit', title: '项目单位' },
            { field: 'amount', title: '项目金额(万元)', width: 150, align: 'center' }
        ];
        HTTPAPI.projectFunding().then(res => {
            if(res?.data) {
                viewObj.centerBottomInfo.data = res.data.list;
            }
        })
        
    } else if(data.title == "知识产权质押融资专项补贴数" || data.title == "知识产权质押融资专项补贴金额") {
        viewObj.centerBottomInfo.columns = [
            { field: 'unit', title: '奖补单位'},
            { field: 'category', title: '奖补类型' },
            { field: 'amount', title: '奖补金额(万元)', width: 150, align: 'center' }
        ];
        HTTPAPI.awardSubsidies(2).then(res => {
            viewObj.centerBottomInfo.data = res.data.list;
        })
    } else if(data.title == "商标服务机构数量") {
        viewObj.centerBottomInfo.columns = [
            { field: 'agency', title: '商标服务机构名称'},
        ];
        HTTPAPI.agency(1).then(res => {
            if(res?.data) {
                viewObj.centerBottomInfo.data = res.data.list;
            }
        })
    } else if(data.title == "专利服务机构数量") {
        viewObj.centerBottomInfo.columns = [
            { field: 'agency', title: '专利服务机构名称'},
        ];
        HTTPAPI.agency(2).then(res => {
            if(res?.data) {
                viewObj.centerBottomInfo.data = res.data.list;
            }
        })
    } else if(data.title == "知识产权奖补数"  || data.title == "知识产权奖补金额") {
        viewObj.centerBottomInfo.columns = [
            { field: 'unit', title: '奖补单位'},
            { field: 'category', title: '奖补类型' },
            { field: 'amount', title: '奖补金额(万元)', width: 150, align: 'center' }
        ];
        HTTPAPI.awardSubsidies(1).then(res => {
            viewObj.centerBottomInfo.data = res.data.list;
        })
    }
}
/**显示右边中间详情 */
const showRightCenterInfoFun = (data, type) => {
    let apiType = type == "装备制造产业" ? 1 : 2;
    viewObj.rightCenterInfo.title = `${type}-${data.title}`;
    viewObj.rightCenterInfo.data = [];
    viewObj.showRightCenterInfo = true;
    if(data.title == "专利交易") {
        viewObj.rightCenterInfo.columns = [
            { field: 'patentNumber', title: '专利号', width: 100},
            { field: 'patentName', title: '专利名称', width: 150 },
            { field: 'inCompany', title: '转入公司', },
            { field: 'outCompany', title: '转出公司', },
        ];
        HTTPAPI.industryPtTradeList(apiType).then(res => {
            if(res?.data) {
                viewObj.rightCenterInfo.data = res.data.list;
            }
        })
    } else if(data.title == "专利许可") {
        viewObj.rightCenterInfo.columns = [
            { field: 'patentNumber', title: '专利号', width: 100},
            { field: 'patentName', title: '专利名称', width: 150 },
            { field: 'patentee', title: '权利人', width: 100 },
            { field: 'enterprise', title: '被许可企业', },
        ];
        HTTPAPI.industryPtLicenseList(apiType).then(res => {
            if(res?.data) {
                viewObj.rightCenterInfo.data = res.data.list;
            }
        })
    } else if(data.title == "专利质押融资量") {
       viewObj.rightCenterInfo.columns = [
           { field: 'obligee', title: '权利人' },
           { field: 'countNum', title: '质押融资次数', },
       ];
       HTTPAPI.industryPledgeFinancing(apiType).then(res => {
           if(res?.data) {
               viewObj.rightCenterInfo.data = res.data.list;
           }
       })
   } else if(data.title == "专利质押融资金额(万元)") {
       
       viewObj.rightCenterInfo.columns = [
           { field: 'obligee', title: '权利人'},
           { field: 'amount', title: '质押融资金额(万元)', align: 'center'},
       ];
       HTTPAPI.industryPledgeFinancing(apiType).then(res => {
           if(res?.data) {
               viewObj.rightCenterInfo.data = res.data.list;
           }
       })
   } else if(data.title == "商标交易") {
        viewObj.rightCenterInfo.columns = [
            { field: 'trademarkNumber', title: '商标号', width: 100},
            { field: 'trademarkName', title: '商标名称', width: 150 },
            { field: 'inCompany', title: '转入公司', },
            { field: 'outCompany', title: '转出公司', },
        ];
        HTTPAPI.industryTmTradeList(apiType).then(res => {
            if(res?.data) {
                viewObj.rightCenterInfo.data = res.data.list;
            }
        })
    } else if(data.title == "商标许可") {
        viewObj.rightCenterInfo.columns = [
            { field: 'trademarkNumber', title: '商标号', width: 100},
            { field: 'trademarkName', title: '商标名称', width: 150 },
            { field: 'obligee', title: '权利人', width: 100 },
            { field: 'enterprise', title: '被许可企业', }
        ];
        HTTPAPI.industryTmLicenseList(apiType).then(res => {
            if(res?.data) {
                viewObj.rightCenterInfo.data = res.data.list;
            }
        })
    }
}
//省级知识产权项目资助表格行点击事件
const zscqxmzzRowClick = (row, column, event) => {
    viewObj.zscqxmzzShowInfo = true;
    viewObj.zscqxmzzInfo = row;
}
//专利资助台账
const zlzzRowClick = (row, column, event) => {
    viewObj.zlzzShowInfo = true;
    viewObj.zlzzYear = row.nd;
    HTTPAPI.ptFundingDetails(row.nd).then(res => {
        viewObj.zlzzInfo = res.data.list;
    })
    
}


onMounted(() => {
    // 获取项目数据
    proxy.$nextTick(() => {
        GetXMZZData(1);
        GetXMZZData(2);
        GetXMZZData(3);
        GetXMZZData(0);
        GetZLZZData(2);
        GetZLZZData(1);
        GetZLZZData(0);
        //GetZSCQData(0);
        HTTPAPI.awardSubsidies().then(res => {
            viewObj.zscqData = res.data.list;
        })
        GetCenterBottomData();
    }).then(() => {
        setTimeout(() => {
            //changemapData(0);
        }, 1000);
    })
    console.log('refZScqqqyj.value', refZScqqqyj.value)

})
/**自动播放相关开始 */
/**获取要播放的组件*/
const GetPlayCom = (reslove) => {
    let playCom = [{
        type: 'PlayData',
		changeData: changemapData,
        data: [0, 1, 2, 3]
    }, {
        type: 'PlayData',
		changeData: refZScqqqyj.value.displayFun[0],
        data: refZScqqqyj.value.displayData[0]
    }, 
    // {
    //     type: 'PlayData',
	// 	changeData: refZScqqqyj.value.displayFun[1],
    //     data: refZScqqqyj.value.displayData[1]
    // }
    ];
    for (var item in proxy.$refs) {
        if (item.indexOf("echarts-") == 0) {
            playCom.push(proxy.$refs[item].GetChart());
        }
    }
    reslove(playCom)
}
defineExpose({
    GetPlayCom
})
/**自动播放相关结束 */
</script>
<style scoped>
.content-view {
    flex: 1;
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
}

.titlt-content-ctl {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    color: #FFFFFF;
    font-size: var(--default-font-size);
}

.titlt-content-ctl img {
    width: var(--medium-font-size);
    height: var(--medium-font-size);
    margin-right: 4px;
}

.mapchange-box {
    cursor: pointer;
    color: #ffffff7d;
    display: flex;
    align-items: center;
    width: 20%;
    font-size: var(--medium-font-size);
    line-height: 2;
    justify-content: center;
    box-sizing: border-box;
}

.mapchange-box.mapchange-box-checked {
    color: #FFFFFF;
    font-size: var(--default-font-size);
}

.center-buttom {
    background-image: linear-gradient(to bottom, rgba(21, 20, 92, 0.5), rgba(21, 20, 92, 0));
}
</style>
<style>.center-buttom .el-carousel__arrow--left {
    left: 0;
}

.center-buttom .el-carousel__arrow--right {
    right: 0;
}
.applicationservices-tbinfobox { position: absolute; display: flex; flex-direction: column; top: 0px; left: 0; width: 100%; height: 100%; z-index: 9999;  background: rgba(5, 5, 76, 0.94); padding: 10px; box-sizing: border-box; }
</style>
<style>
/* .zscqzyrzzxbtcontent .el-table .el-table__header .cell { font-size: var(--small-font-size); } */
</style>