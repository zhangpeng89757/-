<template>
    <div class="overalloverview-centertop-box">
        <MainListBlock style="flex: 1; overflow: hidden;" :lineNumber="5" gap="10px 20px"   :data="viewObject.data" >
            <template v-slot:item="{slotData}">
                <CenterItem
                    @click="showInfoFun(slotData)"
                    style="margin: 4px 2px; padding:4px 12px; height: 94px; box-sizing: border-box; box-sizing: border-box;"
                    :data="slotData" 
                    titleKey="title" 
                    dataKey="data" 
                    dataItemTtileKey="title" 
                    dataItemDataValue="value"
                    iconPath="img"></CenterItem>
            </template>
        </MainListBlock>
        <div class="target-lb-info" v-if="viewObject.showInfo">
            <div v-if="viewObject.showInfo" class="target-lb-info-close" style="text-align: right;margin-right: 4px;"><el-icon @click="hideInfo" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <targetLBInfo style="flex: 1; padding: 0px 40px 0 25px" :leftCom="infoObject.leftCom" :centerCom="infoObject.centerCom" :rightCom="infoObject.rightCom"></targetLBInfo>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch, inject, onMounted } from 'vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import CenterItem from './leftbottom-item.vue'
import targetLBInfo from './target-lb-info.vue';
import * as HTTPAPI from '../../api/targetManage/api'
import * as HTTPAPI_APPICATION from './../../api/applicationServices/api'
import { patentInfoList, trademarkInfoList } from '../../api/innovationcreation/api'
import applicationServices from '@/api/applicationServices'

const global = inject('global');
const viewObject = reactive({
    //数据
    data: [],
    showInfo: false
})
let infoObject = reactive({
    leftCom: { comname: null, data: null },
    centerCom: { comname: null, data: null },
    rightCom: { comname: null, data: null }
})
let showInfoFun =  async (data) => {
    viewObject.showInfo = true;
    infoObject.leftCom = { comname: 'StereoscopicBar', data: { leftData: [], rightData: [], legendData: [] }, title: "", otherObject: { num: 0 } }
    if(data.title == "每万人高价值发明专利拥有量") {
        infoObject.leftCom.title = "近3年每万人高价值发明专利拥有量情况(件)"
        // infoObject.centerCom = { comname: 'StereoscopicBar', data: { leftData: [], rightData: [], legendData: [] } , title: "近3年高价值发明专利增长情况(件)", link: `<a style="font-size:14px;" target="_blank" href="${aogjzzlFileUrl}">查看更多&nbsp;></a>`, }
        const centerColumns = [
            { field: 'zlh', title: '专利号', width: 200 },
            { field: 'zlmc', title: '专利名称', width: 200 },
            { field: 'zlr', title: '权利人', width: 200},
            { field: 'pgf', title: '专利价值评估(分)' },
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0,title: "价值较高专利挖掘", columns: centerColumns,  link: `<a style="font-size:14px;" target="_blank" href="${aogjzzlFileUrl}">查看更多&nbsp;></a>`, }
        infoObject.rightCom = { comname: null }
        const PatentMiningData = await applicationServices.getPatentMiningData
        infoObject.centerCom.data = PatentMiningData;
        infoObject.centerCom.total = PatentMiningData?.length || 0

        // HTTPAPI.builderPerHighPatentUpInfo().then(res => {
            // let data = { leftData: [], rightData: [], legendData: [], dataName: ["当前现状"] } ;
            // for (let index = 0; index < res.data.targetCountList.length; index++) {
            //     const element = res.data.targetCountList[index];
            //     data.leftData.push(element.currentNums);
            //     data.legendData.push(element.yearly + "年");
            // }
            // infoObject.centerCom.data = data;
        // })
        HTTPAPI.builderPerTargetCount().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
    } else if(data.title == "海外发明专利授权量") {
        infoObject.leftCom.title = "近3年海外发明专利授权量情况(件)";
        const centerColumns = [
            { field: 'patentNumber', title: '专利号', width: 200 },
            { field: 'patentee', title: '权利人'},
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "PCT专利", columns: centerColumns,  link: `<a style="font-size:14px;" target="_blank" href="${aogjzzlFileUrl}">查看更多&nbsp;></a>`, }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderForeignEmpowerment().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        patentInfoList(3).then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "国、省级知识产权优势示范企业") {
        infoObject.leftCom.title = "近三年知识产权优势示范企业(家)";
        const centerColumns = [
            { field: 'ap', title: '企业名称'},
            { field: 'type', title: '培育原因'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "待培育企业", columns: centerColumns,link: `<a style="font-size:14px;" target="_blank" href="${aoqylbFileUrl}">查看更多&nbsp;></a>`, }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderAdvantageOrgCount().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderAdvantageOrgCultivate().then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "高新技术企业") {
        infoObject.leftCom.title = "近3年高新技术企业量";
        const centerColumns = [
            { field: 'ap', title: '企业名称'},
            { field: 'type', title: '挖掘原因'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "待挖掘企业", columns: centerColumns,link: `<a style="font-size:14px;" target="_blank" href="${aoqylbFileUrl}">查看更多&nbsp;></a>`, }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderHighTechPledgeFinancTrends().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderHighTechPledgeBank().then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "知识产权保护社会满意度") {
        infoObject.leftCom.title = "近3年社会满意度情况(家)"
        infoObject.centerCom = { comname: 'StereoscopicBar', data: { leftData: [], rightData: [], legendData: [] }, title: "6种企业服务处理率占比",link: `<a style="font-size:14px;" target="_blank" href="${qyfwlUrl}">查看更多&nbsp;></a>`, }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderSocietySatisfyDealPer().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [], dataName: ["需求量", "解决需求量"] };
            for (let index = 0; index < resData.length; index++) {
                const element = resData[index];
                data.legendData.push(element.name);
                data.leftData.push(element.needNums);
                data.rightData.push(element.dealNums);
            }
            infoObject.centerCom.data = data;
        })
        HTTPAPI.builderSocietySatisfyFinancTrends().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        
    } else if(data.title == "专利行政执法案件结案率") {
        infoObject.leftCom = { comname: 'StereoscopicPei', data: [], otherObject: {}, title: "专利案件结案率" }
        const centerColumns = [
            { field: 'name', title: '监督管理所名称'},
            { field: 'nums', title: '未结案件数量'}
        ]
        const rightColumns = [
            { field: 'name', title: '案件名称'},
            { field: 'times', title: '立案时间'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "各所专利未结案情况(件)", columns: centerColumns, link: `<a style="font-size:14px;" target="_blank" href="${jgsUrl}">查看更多&nbsp;></a>` }
        infoObject.rightCom = { comname: 'Scrolltable', data: [], total: 0, title: "未结案案件", columns: rightColumns, link: `<a style="font-size:14px;" target="_blank" href="${jgsUrl}">查看更多&nbsp;></a>`}
        //专利行政执法结案率-专利案件结案率
        
        HTTPAPI.builderLawEnforcementLawEnforcement().then(res => {
            let data = [{name : "已结案件", value: 0}, {name : "未结案件", value: 0}];
            for (let index = 0; index < res.data.targetCountList.length; index++) {
                const element = res.data.targetCountList[index];
                data[0].value += element.currentNums,
                data[1].value += element.targetNums - element.currentNums
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = res.data.total;
        })
        HTTPAPI.builderLawEnforcementOpenCase().then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
        HTTPAPI.builderLawEnforcementLawOpenCaseItem().then(res => {
            infoObject.rightCom.data = res.data.list;
            infoObject.rightCom.total = res.data.total;
        })
    } else if(data.title == "知识产权托管企业数量") {
        infoObject.leftCom.title = "近3年知识产权服务机构数情况(家)";
        const centerColumns = [
            { field: 'name', title: '机构名称'},
            { field: 'number', title: '服务企业数'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "服务机构名单", columns: centerColumns }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderHostingYearlyOrgNums().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderHostingHosting().then(res => {
            infoObject.centerCom.data = res.data;
            infoObject.centerCom.total = res.data?.length || 0;
        })
    } else if(data.title == "著作权登记量年增长") {
        infoObject.leftCom.title = "近3年著作权登记量目标与实际完成情况(件)";
        const centerColumns = [
            { field: 'name', title: '版权名称'},
            { field: 'registeredTime', title: '登记时间'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "版权列表", columns: centerColumns }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderCopyrightFinishCount().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderCopyrightList().then(res => {
            infoObject.centerCom.data = res?.data?.list || [];
            infoObject.centerCom.total = res?.data?.length || 0
        })
    } else if(data.title == "有效注册商标总量") {
        infoObject.leftCom.title = "近3年有效注册商标量情况(件)";
        const centerColumns = [
            // { field: 'an', title: '商标号'},
            { field: 'enterpriseName', title: '企业名称'},
            // { field: 'ic', title: '类别', width: 100, align: 'center' },
            // { field: 'ap', title: '权利人'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "“商标清零行动”未清零企业", columns: centerColumns,link: `<a style="font-size:14px;" target="_blank" href="${warninfoUrl}">查看更多&nbsp;></a>`, tablePaddingLeft: 40}
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderValidTradeMarkerFinishCount().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
         HTTPAPI_APPICATION.tmClearingPrompt({ pageNum: 1, pageSize: 100 }).then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "马德里商标国际注册量") {
        infoObject.leftCom.title = "近3年马德里商标国际注册量情况(件)";
        const centerColumns = [
            { field: 'tmAn', width: 140, title: '商标号'},
            { field: 'obligee', title: '申请人'},
            { field: 'ic', title: '国际分类', width: 140, align: 'center'},
            { field: 'dueTime', title: '专用权到期时间', width: 120},
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0,title: "马德里商标", columns: centerColumns,link: `<a style="font-size:14px;" target="_blank" href="${mdlUrl}">查看更多&nbsp;></a>`, }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderMadridRegistered().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        trademarkInfoList(3).then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "知识产权质押融资金额") {
        infoObject.leftCom.title = "近三年质押融资金额趋势(亿元)";
        const centerColumns = [
            { field: 'name', title: '金融机构名称'},
            { field: 'number', width: 150, title: '贷款金额(万元)', align: 'center'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "质押融资借贷银行", columns: centerColumns }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderIntellectualPropertyPledgeFinancTrends().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderIntellectualPropertyPledgeBank().then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "专精特新企业") {
        infoObject.leftCom.title = "近3年专精特新企业量(家)";
        const centerColumns = [
            { field: 'ap', title: '企业名称'},
            { field: 'type', title: '挖掘原因'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "待挖掘企业", columns: centerColumns, link: `<a style="font-size:14px;" target="_blank" href="${aoqylbFileUrl}">查看更多&nbsp;></a>`,}
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderSpecializeFinancTrends().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderSpecializeOrgDig().then(res => {
            infoObject.centerCom.data = res.data.list;
            infoObject.centerCom.total = res.data.total;
        })
    } else if(data.title == "知识产权调解案件") {
        infoObject.leftCom.title = "近3年知识产权调解案件量";
        const centerColumns = [
            { field: 'dealNums', title: '已处理'},
            { field: 'waitNums', title: '待处理'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "调解案件(件)", columns: centerColumns, link: `<a style="font-size:14px;" target="_blank" href="${jgsUrl}">查看更多&nbsp;></a>`,}
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderMediateNums().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderMediateDealNums().then(res => {
            infoObject.centerCom.data = res.data;
            infoObject.centerCom.total = res.data?.length || 0;
        })
    } else if(data.title == "专利代理师数量") {
        infoObject.leftCom = { comname: 'Line', data: [], title: "近3年专利代理律师数量(位)" }
        const centerColumns = [
            { field: 'institutionName', title: '代理机构名称'},
            { field: 'empowerNumber', title: '代理专利授权量', align: 'center'},
            { field: 'caseNumber', title: '代理专利案件量', align: 'center'},
            { field: 'empowerNumber', title: '专利代理师人数', align: 'center'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "专利授权/专利案件多的代理机构", columns: centerColumns }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderAgentProxyOrgTop().then(res => {
            infoObject.centerCom.data = res.data;
            infoObject.centerCom.total = res.data?.length || 0;
        })
        HTTPAPI.builderAgentYearlyTotal().then(res => {
            infoObject.leftCom.data = res.data.targetCountList;
            infoObject.leftCom.otherObject.num = resData.total;
        })
    } else if(data.title == "地理标志拥有量") {
        infoObject.leftCom.title = "近三年地理标志商标/产品情况(件)";
        const centerColumns = [
            { field: 'name', title: '产品名称'},
            { field: 'remark', title: '备注'}
        ]
        infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "挖掘地标资源", columns: centerColumns }
        infoObject.rightCom = { comname: null }
        HTTPAPI.builderGeographyYearlyProductCount().then(res => {
            let resData = res.data;
            let data = { leftData: [], rightData: [], legendData: [] } ;
            data.legendData.push("总目标");
            data.leftData.push(resData.total);
            data.rightData.push(null);
            for (let index = 0; index < resData.targetCountList.length; index++) {
                const element = resData.targetCountList[index];
                data.legendData.push(element.yearly + "年");
                data.leftData.push(element.targetNums);
                data.rightData.push(element.currentNums);
            }
            infoObject.leftCom.data = data;
            infoObject.leftCom.otherObject.num = resData.total;
        })
        HTTPAPI.builderGeographyLandmarkResources().then(res => {
            infoObject.centerCom.data = res.data;
            infoObject.centerCom.total = res.data?.length;
        })
    } 
}
let hideInfo = function() {
    viewObject.showInfo = false;
}
let getBottomData = function(){
    let DataObject = [{
        title: '每万人高价值发明专利拥有量',
        img: '1-1.png',
        dataKey1: 'tenThousandPeoplePtNum',
        dataKey2: 'tenThousandPeoplePtTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '有效注册商标总量',
        img: '1-3.png',
        dataKey1: 'tmRegisterValidNum',
        dataKey2: 'tmRegisterValidTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '海外发明专利授权量',
        img: '1-2.png',
        dataKey1: 'overseasInventPtNum',
        dataKey2: 'overseasInventPtTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '马德里商标国际注册量',
        img: '1-4.png',
        dataKey1: 'madridNum',
        dataKey2: 'madridTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '国、省级知识产权优势示范企业',
        img: '1-7.png',
        dataKey1: 'demonstrateNum',
        dataKey2: 'demonstrateTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: ''
    },{
        title: '知识产权质押融资金额',
        img: '1-8.png',
        dataKey1: 'demonstratePledgeNum',
        dataKey2: 'demonstratePledgeTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '亿元'
    },{
        title: '高新技术企业',
        img: '1-9.png',
        dataKey1: 'technologyNum',
        dataKey2: 'technologyTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: ''
    },{
        title: '专精特新企业', //专精特新企业
        img: '1-10.png',
        dataKey1: 'masteryNum',
        dataKey2: 'masteryTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: ''
    },{
        title: '知识产权保护社会满意度',
        img: '1-11.png',
        dataKey1: 'protectingNum',
        dataKey2: 'protectingTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '%'
    },{
        title: '知识产权托管企业数量',
        img: '1-15.png',
        dataKey1: 'trusteeshipNum',
        dataKey2: 'trusteeshipTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '家'
    },{
        title: '知识产权调解案件', //知识产权调解案件
        img: '1-12.png',
        dataKey1: 'arbitrateNum',
        dataKey2: 'arbitrateTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '专利行政执法案件结案率',
        img: '1-13.png',
        dataKey1: 'closeCaseNum',
        dataKey2: 'closeCaseTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '%'
    },{
        title: '地理标志拥有量',
        img: '1-5.png',
        dataKey1: 'landmarkTmNum',
        dataKey2: 'landmarkTmTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '著作权登记量年增长',
        img: '1-6.png',
        dataKey1: 'copyrightRegisterNum',
        dataKey2: 'copyrightRegisterTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '件'
    },{
        title: '专利代理师数量', //专利代理师数量
        img: '1-14.png',
        dataKey1: 'agentNum',
        dataKey2: 'agentTargetNum',
        dataKey3: 'percentage',
        data: [],
        unit: '人'
    }];
    let description = ['总目标', '实际', '完成度'];
    HTTPAPI.megaPresentcList().then(res => {
        let resData = res.data;
        const nowYear = new Date().getFullYear(); 
        for (let index = 0; index < DataObject.length; index++) {
            const element = DataObject[index];
            let name = element.title.split("(");
            let inputData = resData.find(el => el.name == name[0]);
            if(inputData == null) { console.log(element.title, name[0]); continue;}
            element.data = [];
            element.data.push({ 
                title: description[0],
                value: inputData[`target${2024}`] 
            });
            element.data.push({ 
                title: description[1],
                value: inputData[`real${nowYear}`] 
            });
            element.data.push({ 
                title: description[2],
                value:  inputData[`target${nowYear}`] != 0 ? parseInt((inputData[`real${nowYear}`]  / inputData[`target2024`] ) * 100) : 0
            });
        }
        
        viewObject.data = DataObject;
    })
}
onMounted(()=>{
    getBottomData();
})

</script>
<style scoped>
    .overalloverview-centertop-box { display: flex; flex-direction: column; font-size: var(--small-font-size); padding: 10px 8px; margin-left: 10px; position: relative;}
    .overalloverview-centertop-box .main-list-block{ background-image: none; }

    .target-lb-info { position: absolute; width: 100%; height:100%; left: 0; top: 0; display: flex; box-sizing: border-box; padding-bottom: 20px; box-sizing: border-box; flex-direction: column; background: rgba(5, 5, 76, 0.94); z-index: 20;}
    .target-lb-info-close{
        position: absolute;
        right: 0;
        top: 0;
    }
</style>