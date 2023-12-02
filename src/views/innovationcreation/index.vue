<template>
    <div class="content-view innovationcreation-box">
        <div style="margin-left: 10px; width: 590px; max-width: 590px; overflow: hidden;">
            <div style="height: 430px; overflow: hidden;display: flex; flex-direction: column;" class="model-backgroud">
                <titlebar :content="`创新创造主体(${viewData.cxczDataCount})`">
                    <template #tools>
                        <a target="_blank" :href="link" style="font-size: 12px; font-weight: 400; cursor: pointer;z-index: 9999; color: #fff;">查看更多&ensp;></a>
                    </template>
                </titlebar>
                <Scrolltable height="100%" style="flex: 1; overflow: hidden; background-color: rgba(21, 20, 92, 1);" :columns="cxczColumns" :data="viewData.cxczData"></Scrolltable>
            </div>
            <Line :backgroundImage="global.getAssetsFile('cxcz/left-line.png')" ref="echarts-line1" style="height: 240px; width: 100%; margin-top: 20px;" :data="innovationcreation.getInventionPtTrendsData" title="专利/发明专利近三年累积授权量趋势" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量" xUnit="件"></Line>
            <Line :backgroundImage="global.getAssetsFile('cxcz/left-line.png')" ref="echarts-line2" style="height: 240px; width: 100%; margin-top: 20px;" :data="innovationcreation.getApplyRegisterTrendsData" title="商标申请/注册累积量近三年趋势" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量" xUnit="件"></Line>
        </div>
        <div style="width: 700px; max-width: 700px; overflow: hidden; margin: 30px 20px 0;">
            <div class="model-backgroud" style="height: 350px; overflow: hidden; display: flex; flex-direction: column; overflow: hidden;">
                <titlebar content="知识产权创新创造概览" algin="center"/>
                <FlowBox style="position: relative;">
                    <MainListBlock gap="20px 10px" :data="innovationcreation.getInnovateAchievementsData" :lineNumber="5" style="flex: 1; overflow: hidden; padding:15px;">
                        <template v-slot:item="{slotData}">
                            <CenterTop :data="slotData" titleKey="title" dataKey="data" @click="showInfoFun(slotData)"></CenterTop>
                        </template>
                    </MainListBlock>
                    <div class="innovationcreation-center-top-info-box" v-if="viewData.showInfo">
                        <div v-if="viewData.showInfo" style="text-align: right;margin-right: 4px;"><el-icon @click="hideInfo" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
                        <Info style="flex: 1;padding: 0 20px 20px; box-sizing: border-box;" :leftCom="infoObject.leftCom"></Info>
                    </div>
                </FlowBox>
            </div>
            <Pei class="model-backgroud" :backgroundImage="global.getAssetsFile('cxcz/center-line.png')" ref="echarts-pei1" :data="innovationcreation.getHighValuePtAnalysisData" title="高价值专利分类" style="height: 220px; margin-top: 10px;"></Pei>
            <Pei class="model-backgroud" :backgroundImage="global.getAssetsFile('cxcz/center-line.png')" ref="echarts-pei2" :data="innovationcreation.getMainBodyTypeAnalysisData" title="知识产权主体类型分析" style="height: 220px; margin-top: 10px;"></Pei>
        </div>
        <div style="margin-right:10px; width: 590px; max-width: 590px; overflow: hidden;">
            <Hotword class="model-backgroud" title="近三年区域专利申请热门关键词" :word-arr="innovationcreation.getApplyHotWordsData" style="height: 260px;"></Hotword>
            <div style="position: relative;  margin-top: 10px;">
                <div style="height: 120px; overflow: hidden; display: flex; flex-direction: column;" class="model-backgroud">
                    <titlebar content="装备制造产业知识产权概况"/>
                    <MainListBlock :data="innovationcreation.getIndustryInfo2Data" :lineNumber="3"  style="flex: 1; overflow: hidden; padding: 10px;">
                        <template v-slot:item="{slotData}">
                            <rightRange @click="showRightInfoFun('装备制造产业', slotData)" :data="slotData" titleKey="title" dataKey="data" />
                        </template>
                    </MainListBlock>
                </div>
                <div style="height: 120px; overflow: hidden; margin-top: 20px; display: flex; flex-direction: column;" class="model-backgroud">
                    <titlebar content="电线电缆产业知识产权概况"/>
                    <MainListBlock :data="innovationcreation.getIndustryInfo1Data" :lineNumber="3" style="flex: 1; overflow: hidden; padding: 10px;">
                        <template v-slot:item="{slotData}">
                            <rightRange @click="showRightInfoFun('电线电缆产业', slotData)" :data="slotData" titleKey="title" dataKey="data" />
                        </template>
                    </MainListBlock>
                </div>
                <div class="innovationcreation-center-top-info-box" v-if="viewData.showRightInfo">
                    <div v-if="viewData.showRightInfo" style="text-align: right;margin-right: 4px;position: absolute; right: 0; top: 0;"><el-icon @click="viewData.showRightInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
                    <Info style="flex: 1;padding: 0 20px 20px; box-sizing: border-box;" :leftCom="rightInfoObject.leftCom"></Info>
                </div>
            </div>
            <div style="height: 200px; overflow: hidden; margin-top: 10px; display: flex; flex-direction: column;" class="model-backgroud">
                <titlebar :content="`疑似非正常专利申请线索(${viewData.mainBodyPtClueListData.length})`">
                    <template #tools>
                        <el-tooltip effect="light" content="专利数据来源于：专利非正常申请名单。">
                            <div
                                style="width: 100%; padding-left: 4rem; font-size: 0.7rem; display: flex; align-items: center; cursor: pointer;">
                                <el-icon size="1rem">
                                    <QuestionFilled />
                                </el-icon>数据来源
                            </div>
                        </el-tooltip>
                    </template>
                </titlebar>
                <div style="flex: 1; overflow: hidden; padding: 10px;">
                    <Scrolltable style="flex: 1; background-color: rgba(21, 20, 92, 1);" height="100%" :columns="ZLZTXSColumns" :data="viewData.mainBodyPtClueListData"></Scrolltable>
                </div>
            </div>
            <div style="height: 200px; overflow: hidden; margin-top: 10px; display: flex; flex-direction: column;" class="model-backgroud">
                <titlebar :content="`恶意申请商标注册行为线索(${viewData.agencyTmClueListData.length})`">
                    <template #tools>
                        <el-tooltip effect="light" content="商标数据来源于：国家知识产权局商标局、中国商标网、商标评审文书、异议决定书和商标注册审查决定书。">
                            <div
                                style="width: 100%; padding-left: 4rem; font-size: 0.7rem; display: flex; align-items: center; cursor: pointer;">
                                <el-icon size="1rem">
                                    <QuestionFilled />
                                </el-icon>数据来源
                            </div>
                        </el-tooltip>
                    </template>
                </titlebar>
                <div style="flex: 1; overflow: hidden; padding: 10px;">
                    <Scrolltable style="flex: 1; background-color: rgba(21, 20, 92, 1);" height="100%" :columns="ZLJGXSColumns" :data="viewData.agencyTmClueListData"></Scrolltable>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject, onMounted } from 'vue'
import titlebar from '@/components/titlebar.vue'
import Line from '@/components/echarts/line.vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import Info from '@/components/innovationcreation/center-top-info.vue'
import CenterTop from '@/components/innovationcreation/center-top.vue'
import rightRange from '@/components/innovationcreation/right-range.vue'
import Pei from '@/components/echarts/pei2.vue'
import Hotword from '@/components/innovationcreation/hotword.vue'
import innovationcreation from '../../api/innovationcreation'
import * as HTTPAPI from '../../api/innovationcreation/api'
const global = inject('global');
const link = aoqylbFileUrl;
const { proxy } = getCurrentInstance();
//中间详情
let infoObject = reactive({
    leftCom: { comname: null, data: null }
})
//右边详情
let rightInfoObject = reactive({
    leftCom: { comname: null, data: null }
})
const viewData = reactive({
    showInfo: false, // 中间详情
    showRightInfo: false, //右边详情
    cxczData: [], //创新创造主体数据,
    cxczDataCount: 0,
    agencyTmClueListData: [], //恶意申请商标注册行为线索
    mainBodyPtClueListData: [], //疑似非正常专利申请线索
    

})
/**创新创造主体表头 */
const cxczColumns = [
    { field: 'bodyName',  title: '主体名称' },
    { field: 'inventNum', width: 120, title: '发明专利授权量', align: 'center' },
    { field: 'authorizedNum', width: 100, title: '专利授权量', align: 'center' },
    { field: 'registerNum', width: 100, title: '注册商标量', align: 'center' }
]
/** 商标非正常申请线索表头*/
/**主体线索 */
const SBZTXSColumns = [
    { field: 'name',  title: '主体名称' },
    { field: 'zcsb', width: 90, title: '疑似商标数', align: 'center' },
]
/**机构线索 */
const SBJGXSColumns = [
    { field: 'name',  title: '机构名称' },
    // { field: 'zcsb', width: 90, title: '疑似商标数', align: 'center' },
]
/** 专利非正常申请线索*/
/**主体线索 */
const ZLZTXSColumns = [
    { field: 'applicantName',  title: '主体名称' },
    { field: 'applyNum', width: 90, title: '疑似专利数', align: 'center' },
    { field: 'handleSituation', width: 90, title: '处理情况', align: 'center' },
    { field: 'handleResult', title: '处理结果', align: 'center' },
]
/**机构线索 */
const ZLJGXSColumns = [
    { field: 'applicantName',  title: '主体名称' },
    { field: 'applyNum', width: 90, title: '疑似商标数', align: 'center' },
    { field: 'handleSituation', width: 90, title: '处理情况', align: 'center' },
    { field: 'handleResult', title: '处理结果', align: 'center' },
]
let showInfoFun = function(data) {
    viewData .showInfo = true;
    let columns = [];
    if(data.title == "授权专利") {
        columns = [
            { field: 'patentNumber', title: '专利号' },
            { field: 'patentee', title: '权利人'}
        ]
        HTTPAPI.patentInfoList(1).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "授权发明专利") {
        columns = [
            { field: 'patentNumber', title: '专利号' },
            { field: 'patentee', title: '权利人'}
        ]
        HTTPAPI.patentInfoList(2).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "高价值发明专利") {
        columns = [
            { field: 'enterpriseName', title: '企业名称' },
            { field: 'highValueNum', title: '高价值发明专利数量', width: 150, align: 'center'}
        ]
        HTTPAPI.highValuePtList().then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "PCT专利") {
        columns = [
            { field: 'patentNumber', title: '专利号' },
            { field: 'patentee', title: '权利人'}
        ]
        HTTPAPI.patentInfoList(3).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "注册商标") {
        columns = [
            { field: 'tmName', title: '商标名称' },
            { field: 'tmAn', title: '商标号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.trademarkInfoList(1).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "驰名商标") {
        columns = [
            { field: 'tmName', title: '商标名称' },
            { field: 'tmAn', title: '商标号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.trademarkInfoList(2).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "马德里商标") {
        columns = [
            { field: 'tmName', title: '商标名称' },
            { field: 'tmAn', title: '商标号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.trademarkInfoList(3).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "特殊标志") {
        columns = [
            { field: 'tmName', title: '商标名称' },
            { field: 'tmAn', title: '商标号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.trademarkInfoList(4).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "地理标志商标") {
        columns = [
            { field: 'tmName', title: '商标名称' },
            { field: 'tmAn', title: '商标号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.trademarkInfoList(5).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "地理标志") {
        columns = [
            { field: 'productName', title: '名称' }
        ]
        HTTPAPI.landmarkList(1).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "农产品地理标志") {
        columns = [
            { field: 'productName', title: '产品名称' },
            { field: 'num', title: '核准使用企业数' }
        ]
        HTTPAPI.landmarkList(2).then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "版权") {
        columns = [
            { field: 'copyrightName', title: '版权名称' },
            { field: 'copyrightNumber', title: '版权号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.copyrightInfoList().then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "集成电路布图") {
        columns = [
            { field: 'registrationNumber', title: '布图设计登记号' },
            { field: 'obligee', title: '权利人'}
        ]
        HTTPAPI.integratedCircuitList().then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    } else if(data.title == "授权植物新品种") {
        columns = [
            { field: 'name', title: '新品种名称' }
        ]
        HTTPAPI.newVarietiesList().then(res => {
            infoObject.leftCom.data = res.data.list;
        });
    }
    infoObject.leftCom = { comname: 'Scrolltable', data: [], title: data.title, columns: columns }
}
let hideInfo = function() {
    viewData.showInfo = false;
}
let showRightInfoFun = function(type, data) {
    viewData.showRightInfo = true;
    let typeIndex = type == "电线电缆产业" ? 1 : 2;
    let columnName = data.title.indexOf("量") == -1 ? `${data.title}量` : data.title;
    let columns = [
        { field: 'enterpriseName', title: '企业名称' },
        { field: 'num', title: columnName, width: 140}
    ]
    rightInfoObject.leftCom = { comname: 'Scrolltable', data: [], title:`${type}-${data.title}`, columns: columns }
    let t = 1;
    if(data.title == "专利授权量") {
        t = 2;
    } else if(data.title == "注册商标量") {
        t = 3;
    }
    HTTPAPI.industryList(t, typeIndex).then(res => {
        rightInfoObject.leftCom.data = res.data.list;
    });
}

/**
 * 创新创造主体数据 
 */
const GetCXCZData = () => {
    HTTPAPI.protectionAchievementsList().then(res => {
        viewData.cxczDataCount = res.data.total;
        viewData.cxczData = res.data.list;
    })
    innovationcreation.getPtClueListData.then(res => {
        viewData.agencyTmClueListData = res.data.tmClueList;
        viewData.mainBodyPtClueListData = res.data.ptClueList;
    })
}
onMounted(()=>{
    GetCXCZData();
})
/**自动播放相关开始 */
/**获取要播放的组件*/
const GetPlayCom = (reslove) => {
    let playCom = [];
    for(var item in proxy.$refs) {
        if(item.indexOf("echarts-") == 0) {
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
    .content-view { flex: 1; position: relative; overflow: hidden; height: 100%; display: flex; }
    .titlt-content-ctl { display: flex; align-items: center; margin-bottom: 4px; color: #FFFFFF; font-size: var(--default-font-size);}
    .titlt-content-ctl img { width: var(--default-font-size); height: var(--default-font-size); margin-right: 4px; }

    .innovationcreation-center-top-info-box { position: absolute; display: flex; flex-direction: column; top: 0px; left: 0; width: 100%; height: 100%; z-index: 20;  background: rgba(5, 5, 76, 0.94);}
</style>
<style>
.innovationcreation-box .pei-content-view .pei-content-tool .pei-content-tool-title { font-size: 18px; }
</style>