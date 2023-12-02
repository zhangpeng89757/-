
<template>
    <div class="achievementOverview-left-box">
        <div class="titlt-content-ctl"><img :src="global.GetImages('c-t-l.png')" />知产创造</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div class="toplevel-box" v-for="(item,index) in viewData.topLevelData" ref="readbox" @click="changeDisplay(item)">
                <div>{{ item.title }}</div> 
                <div class="number-font">{{ item.value }}</div>
            </div>
        </div>
        <div style="margin: 30px 0 20px;" class="titlt-content-ctl"><img :src="global.GetImages('c-t-l.png')" />知产运用服务</div>
        <div class="achievementOverview-left-centerlevel-box" v-for="(item,index) in viewData.centerLevelData" ref="readbox" v-html="item.value" @click="changeCenterDisplay(index)"></div>
        <div style="margin: 30px 0 20px;" class="titlt-content-ctl"><img :src="global.GetImages('c-t-l.png')" />知产保护</div>
        <div class="achievementOverview-left-centerlevel-box" v-for="(item,index) in viewData.bottomLevelData" ref="readbox" v-html="item.value"  @click="changeBottomDisplay(index)"></div> 
        <div class="achievementOverview-left-infobox">
            <div class="achievementOverview-left-infobox-title">{{viewData.components.title}}<div style="flex: 1;" v-html="viewData.components.tools"></div></div>
            <component 
                :key="viewData.components.key"
                style="flex: 1;background-image: none; margin-top: 10px;"
                dataKey="data"
                titleKey="legend"
                dataItemTtileKey="name"
                dataItemDataValue="value"
                :otherObject="viewData.components?.otherObject" :showTitle="false" :is="viewData.components?.com" 
                :data="viewData.components?.data"
                :columns="viewData.components?.columns"></component>
        </div>
        <div class="lawenforcementprotection-rightcontent-info-box" v-if="viewData.showInfo">
            <div v-if="viewData.showInfo" style="text-align: right;margin:0 4px;"><el-icon @click="viewData.showInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <div class="lawenforcementprotection-rightcontent-info-body">
                <div class="lawenforcementprotection-rightcontent-info-body-title">{{ viewData.showData.title }}</div>
                <div class="lawenforcementprotection-rightcontent-info-body-content">{{ viewData.showData.content }}</div>
                <div class="lawenforcementprotection-rightcontent-info-body--images">
                    <template v-for="(img,index) in viewData.showData.images">
                        <div class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('lawenforcementprotection-img-bg.png') +')', padding: '12px', marginBottom: '10px'}">
                            <el-image style="width: 100%; margin-bottom: 4px;" :src="img" fit="contain"/>
                        </div>
                    </template>
                </div>
                <div class="lawenforcementprotection-rightcontent-info-body-content" style="text-align: right;">{{ viewData.showData.updateTime }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, ref, inject, onMounted, onUnmounted } from 'vue'
import Scrolltable from '@/components/table/achleftScrolltable.vue'
import Bar from '@/components/echarts/bar.vue'
import StereoscopicBar from '@/components/echarts/stereoscopic-bar.vue'
import StereoscopicPei from '@/components/echarts/stereoscopic-pei.vue'
import aoLeftSwiper from './aoLeftSwiper.vue'
import Targetline from '@/components/echarts/targetline.vue'
import Line from '@/components/echarts/line.vue'
import * as HTTPAPI from '../../api/achievementOverview/api'
import { highValuePtList } from '../../api/innovationcreation/api'
import {getProjectFundingDataV2, getSpecialSubsidyDataV2} from '../../api/applicationServices/index'
import {enterpriseServeListALL} from '../../api/applicationServices/api'
import {GetCaseList} from '../../api/lawenforcementprotection/api' 
const global = inject('global');
const { proxy } = getCurrentInstance();
const readbox = ref([]);
let interval = null;
let displayIndex = 0;
const viewData = reactive({
    lastEl: null,
    topLevelData: {
        effectiveTm: {
            title: "有效注册商标(件)",
            index: 0,
            value: 0,
            com: "Line",
            comTitle: "有效注册商标近三年增长趋势(件)",
            api: HTTPAPI.effectiveTmList
        },
        effectivePt: {
            title: "有效专利(件)",
            index: 1,
            value: 0,
            com: "Line",
            comTitle: "有效专利近三年增长趋势(件)",
            api: HTTPAPI.effectivePtList
        },
        highValuePt: {
            title: "高价值发明专利(件)",
            index: 2,
            value: 0,
            tools:`<a target="_blank" href="${aogjzzlFileUrl}">查看更多&nbsp;></a>`,
            comTitle: "高价值发明专利",
            com: "Scrolltable",
            api: highValuePtList
        },
        tenThousandPeoplePt: {
            title: "万人有效发明专利拥有量(件)",
            index: 3,
            value: 0,
            com: "Line",
            comTitle: "万人有效发明专利拥有量三年增长趋势(件)",
            api: HTTPAPI.validInventionPatents
        }
    },
    centerLevelData: [
        {
            template: "省级知识产权项目资助{projectFunding}件，资助金额{projectFundingAmount}万元。",
            value: "",
            comTitle: "省级知识产权项目资助",
            com: "Scrolltable",
            api: getProjectFundingDataV2,
            columns:  [
                { field: 'level', width: 80, title: '年度'},
                { field: 'projectName', title: '项目名称'},
                { field: 'projectUnit', title: '项目单位'},
                { field: 'money', title: '项目金额(万元)', align: 'center'}
            ]
        },
        {
            template: "知识产权质押融资件数{pledgeFinancing}件，质押融资金额{pledgeFinancingAmount}万元",
            value: "",
            comTitle: "知识产权质押融资",
            com: "Scrolltable",
            api: getSpecialSubsidyDataV2,
            columns:  [
                { field: 'projectUnit', title: '权利人'},
                { field: 'pledgedSubject',width: 100, title: '质押融资类型'},
                { field: 'pledgeMoney',width: 140, title: '质押融资金额(万元)', align: 'center'},
                { field: 'year', width: 80, title: '质押时间'}
            ]
        },{
            template: "企业服务需求共计{requirement}件，已完成{requirementCompleted}件",
            value: "",
            comTitle: "企业服务需求",
            tools:`<a target="_blank" href="${LinkToUrl}">查看更多&nbsp;></a>`,
            com: "Scrolltable",
            api: enterpriseServeListALL,
            columns:  [
                { field: 'applicant', title: '申请人'},
                { field: 'type',width: 100, title: '服务类型'},
                { field: 'requirements',width: 140, title: '服务要求'},
                { field: 'statusStr', width: 80, title: '服务状态'}
            ]
        }
    ],
    bottomLevelData: [
        {
            template: "立案查处知识产权案件数{putOnRecord}件，罚没{penaltyAmount}万元。",
            value: "",
            comTitle: "知识产权行政保护案件",
            tools: `<a target="_blank" href="${LinkToUrl}">查看更多&nbsp;></a>`,
            com: "Scrolltable",
            api: HTTPAPI.putOnRecordList,
            columns:  [
                { field: 'agency', width: 80, title: '办案机构'},
                { field: 'filingNumber', title: '立案号'},
                { field: 'caseName', title: '案件名称'},
                { field: 'penaltyAmount', title: '罚没金额(万元)', align: 'center'}
            ]
        },
        {
            template: "省级典型案例{classicCase}件",
            value: "",
            comTitle: "省级典型案例",
            com: "Swiper",
            api: GetCaseList
        },{
            template:"办理知识产权诉中委托调解案件{mediationCase}件，调解成功{mediationSuccessful}件。",
            value: "",
            comTitle: "委托调解案件",
            com: "Swiper",
            api: GetCaseList
        }
    ],
    components: {
        key: 0,
        com: null,
        data: [],
        columns: [],
        title: "",
        tools: ''
    }
})
let lastEl = null;
const changeDisplay = (item) => {
    displayIndex = item.index;
    displayBox();
    startPlay();
}
const changeCenterDisplay = (index) => {
    displayIndex = index + 4;
    displayBox();
    startPlay();
}
const changeBottomDisplay = (index) => {
    displayIndex = index + 7;
    displayBox();
    startPlay();
}

const displayBox = () => {
    if(lastEl != null) lastEl.classList.remove("selected");
    lastEl = readbox.value[displayIndex];
    lastEl?.classList?.add("selected");
    viewData.components = {
        key: Math.random(),
        com: null,
        data: [],
        columns: [],
        title: "",
        tools: ""
    }
    if(displayIndex == 0){
        let effectiveTm = viewData.topLevelData.effectiveTm;
        effectiveTm.api().then(res => {
            viewData.components.title = effectiveTm.comTitle;
            viewData.components.com = getCom(effectiveTm.com);
            let data = [];
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                data.push({
                    name: element.year + "年",
                    value: element.num
                });
            }
            viewData.components.data = [{data, legend: "当年现状"}];
        });
    } else if(displayIndex == 1){
        let effectivePt = viewData.topLevelData.effectivePt;
        viewData.components.title = effectivePt.comTitle;
        viewData.components.com = getCom(effectivePt.com);
        effectivePt.api().then(res => {
            let data = [];
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                data.push({
                    name: element.year + "年",
                    value: element.num
                });
            }
            viewData.components.data = [{data, legend: "当年现状"}];
        });
      
    } else if(displayIndex == 2){
        let highValuePt = viewData.topLevelData.highValuePt;
        viewData.components.title = highValuePt.comTitle;
        viewData.components.tools = highValuePt.tools;
        viewData.components.com = getCom(highValuePt.com);
        viewData.components.columns = [
            { field: 'enterpriseName', title: '企业名称'},
            { width: 120, field: 'highValueNum', title: '高价值专利(件)', align: 'center'}
        ];
        highValuePt.api().then(res => {
            viewData.components.data = res.data.list;
            viewData.components.title = `${highValuePt.comTitle}(${res.data.total})`
        });
    } else if(displayIndex == 3){
        let tenThousandPeoplePt = viewData.topLevelData.tenThousandPeoplePt;
        viewData.components.title = tenThousandPeoplePt.comTitle;
        viewData.components.com = getCom(tenThousandPeoplePt.com);
        tenThousandPeoplePt.api().then(res => {
            let data = [];
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                data.push({
                    name: element.year + "年",
                    value: element.num
                });
            }
            viewData.components.data = [{data, legend: "当年现状"}];
        });
      
    } else if(displayIndex < 7){
        let index = displayIndex - 4
        let comconfig = viewData.centerLevelData[index];
        viewData.components.title = comconfig.comTitle;
        viewData.components.com = getCom(comconfig.com);
        viewData.components.columns = comconfig.columns;
        viewData.components.tools = comconfig?.tools;
        comconfig.api().then(res => {
            viewData.components.data = res.data?.totalList || res.data?.list;
        });
    }  else {
        let index = displayIndex - 7
        let comconfig = viewData.bottomLevelData[index];
        viewData.components.title = comconfig.comTitle;
        viewData.components.com = getCom(comconfig.com);
        viewData.components.columns = comconfig.columns;
        viewData.components.tools = comconfig?.tools;
        if(displayIndex == 8) {
            viewData.components.data = [];
            comconfig.api(1).then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                    let images = JSON.parse(element.images);
                    let imgArr = [];
                    if(images != null) {
                        for (let i = 0; i < images.length; i++) {
                            const img = images[i];
                            imgArr.push(FileUrl + img.url)
                        }
                    }
                    element.images = imgArr;
                    console.log(images, imgArr)
                    viewData.components.data.push({
                        title: element.title,
                        content: element.content,
                        detailTile: element.content,
                        images: element.images
                    })
                }
            })
        } else if(displayIndex == 9) {
            comconfig.api(2).then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                    let images = JSON.parse(element.images);
                    let imgArr = [];
                    if(images != null) {
                        for (let i = 0; i < images.length; i++) {
                            const img = images[i];
                            imgArr.push(FileUrl + img.url)
                        }
                    }
                    element.images = imgArr;
                    viewData.components.data.push({
                        title: element.title,
                        content: element.content,
                        detailTile: element.content,
                        images: element.images
                    })
                }
            })
        } else {
            comconfig.api().then(res => {
                viewData.components.data = res.data;
            });
        }
    }
    if(displayIndex < readbox.value.length - 1)
        displayIndex++;
    else 
        displayIndex = 0;
}
let getCom = (comname) => {
    if (comname == 'Scrolltable') {
        return Scrolltable;
    } else if (comname == 'StereoscopicBar') {
        return StereoscopicBar;
    } else if (comname == 'Targetline') {
        return Targetline;
    } else if (comname == 'Line') {
        return Line;
    } else if (comname == 'StereoscopicPei') {
        return StereoscopicPei;
    } else if (comname == 'Bar') {
        return Bar;
    }  else if(comname == "Swiper") {
        return aoLeftSwiper;
    }
}
let startPlay = () => {
    if(interval != null) clearInterval(interval);
    interval = setInterval(() => {
        //displayBox();
    }, 10000);
}
let regex = /\{(.+?)\}/g;  // {} 花括号
onMounted(()=>{
    HTTPAPI.ipAchievements().then(res => {
        for(var item in viewData.topLevelData) {
            viewData.topLevelData[item].value = res.data[item];
        }
        for (let index = 0; index < viewData.centerLevelData.length; index++) {
            let obj = viewData.centerLevelData[index];
            let arr = obj.template.match(regex);
            for (let i = 0; i < arr.length; i++) {
                let regexStrs = arr[i];
                let regexStr = regexStrs.replace("{", "").replace("}", "");
                obj.template = obj.template.replace(regexStrs, `<span class="number-font">${res.data[regexStr]}</span>` );
            }
            obj.value = obj.template;
        }
        for (let index = 0; index < viewData.bottomLevelData.length; index++) {
            let obj = viewData.bottomLevelData[index];
            let arr = obj.template.match(regex);
            for (let i = 0; i < arr.length; i++) {
                let regexStrs = arr[i];
                let regexStr = regexStrs.replace("{", "").replace("}", "");
                obj.template = obj.template.replace(regexStrs, `<span class="number-font">${res.data[regexStr]}</span>` );
            }
            obj.value = obj.template;
        }
    });
    displayBox();
    //startPlay();
})

onUnmounted(()=>{
    if(interval != null) clearInterval(interval);
})

defineExpose({
    displayData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    displayFun: displayBox
})
</script>
<style scoped>
    .achievementOverview-left-box { padding: 17px 20px 0 20px; box-sizing: border-box;  overflow: hidden; }
    .titlt-content-ctl { display: flex; align-items: center; margin-bottom: 4px; color: #FFFFFF; font-size: var(--default-font-size); margin-bottom: 20px;}
    .titlt-content-ctl img { width: 16px; height: 16px; margin-right: 4px; }
    .toplevel-box, .achievementOverview-left-centerlevel-box { border: 1px solid rgba(91, 191, 255, 0.40); box-shadow: 2px 3px 10px 0px rgba(91, 191, 255, 0.40) inset; color: #FFFFFF; font-size: 14px; text-align: center; padding: 8px 0 10px; }
    .toplevel-box .number-font { font-size: 24px; margin-top: 5px; }
    .toplevel-box.selected, .achievementOverview-left-centerlevel-box.selected { background-image: linear-gradient(180deg, #008EFF -16.67%, rgba(0, 31, 55, 0.00) 95%); }
    .toplevel-box.selected .number-font { color: #5FFFE2; }
    .achievementOverview-left-centerlevel-box { padding: 2px 0 2px 10px; text-align: left; margin-bottom: 10px; display: flex; align-items: center;}
    .achievementOverview-left-infobox { height: 320px; margin-top: 20px; overflow: hidden; background-image: linear-gradient(180deg, rgba(0, 142, 255, 0.40) 0.06%, rgba(0, 17, 58, 0.00) 99.64%); display: flex; flex-direction: column; padding: 12px 12px 0 12px; overflow: hidden; box-sizing: border-box; }
    .achievementOverview-left-infobox .achievementOverview-left-infobox-title { display: flex; align-items: center; font-size: 16px; }
    .achievementOverview-left-infobox .achievementOverview-left-infobox-title::before { content: " "; width: 3px; height: 15px; background-color: #5FFFE2; display: block; float: left; margin-right: 10px; }
</style>
<style>
.achievementOverview-left-centerlevel-box span{ font-size: 24px; margin: 0 10px;  }
.achievementOverview-left-centerlevel-box.selected span { color: #5FFFE2; }
.achievementOverview-left-infobox .achievementOverview-left-infobox-title a { color: #FFFFFF; font-size: 12px; float: right;}
</style>