<template>
    <div class="targetlefttop-box">
        <div class="targetlefttop-box-yearbox">
            <div v-for="item in viewData.data[0].yearData" class="targetlefttop-yearbox-item" :class="[nowYear == item.yearly ? 'targetlefttop-yearbox-nowyear' : '']">
                <template v-if="item.yearly == '完成情况'">{{ item.yearly }}</template>
                <template v-else>{{ item.yearly }}<span>年</span></template>
            </div>
        </div>
        <template v-for="(data,index) in viewData.data">
            <div  class="targetlefttop-data-item background-image-box" :style="{flex:index == 0 ? 'none' : 1 ,backgroundImage:'url('+ global.GetImages('targettop-item-d-bg.png') +')'}" @click="showInfoFun(data)">
                <div class="targetlefttop-data-item-head">
                    <div class="targetlefttop-data-item-head-title" style="font-size: 14px;">{{data.title}}<span style="font-size: 12px;">（{{ data.unit }}）</span></div>
                    <div class="targetlefttop-data-item-head-progoals background-image-box" :style="{backgroundImage:'url('+ global.GetImages('progoals-item-d-bg.png') +')'}">市级目标：<span>{{ data.proGoals }}</span></div>
                    <div class="targetlefttop-data-item-grid">
                        <div class="targetlefttop-data-grid-item" :style="{backgroundImage:'url('+ global.GetImages('targettop-item-bg.png') +')'}">区级目标</div>
                        <div class="targetlefttop-data-grid-item" :style="{backgroundImage:'url('+ global.GetImages('targettop-item-bg.png') +')'}">实际</div>
                        <div class="targetlefttop-data-grid-item" :style="{backgroundImage:'url('+ global.GetImages('targettop-item-bg.png') +')'}">完成度</div>
                    </div>
                </div>
                <div v-for="(item, index) in data.yearData " :class="[nowYear == item.yearly || item.yearly == '完成情况' ? 'targetlefttop-itemdata-nowyear' : '', 'targetlefttop-data-item-grid', 'targetlefttop-data-item-gridrow']" style="height: 30px; margin-bottom: 11px; font-size: 18px;">
                    <div :style="{fontSize: index == 0 ? '24px': ''}" class="targetlefttop-data-grid-item">{{ item?.targetNums == -1 || item?.targetNums == null ? "-" : item?.targetNums?.toLocaleString() }}</div>
                    <div :style="{fontSize: index == 0 ? '24px': ''}" :class="['targetlefttop-data-grid-item', getColorClass(item)]">{{ (item?.currentNums == -1 || item?.currentNums == null ? "-" : item?.currentNums?.toLocaleString())}}</div>
                    <div :style="{fontSize: index == 0 ? '24px': ''}" :class="['targetlefttop-data-grid-item', (item?.targetNums == -1 || item?.targetNums == null) ? '' : 'percentage-item', getPercentageColorClass(item)]">{{ (item?.targetNums == -1 || item?.targetNums == null) ? '-' : (item?.targetNums == 0 ? "0" : getPercentage(item)) }}</div>
                </div>
            </div>
        </template>
        <div class="target-lt-info" v-if="viewData.showInfo">
            <div v-if="viewData.showInfo" style="text-align: right;margin-right: 4px;"><el-icon @click="hideInfo" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <targetLtInfo style="flex: 1; padding: 0 20px;" :leftCom=" viewData.infoObject.leftCom" :centerCom=" viewData.infoObject.centerCom" :rightCom="viewData.infoObject.rightCom"></targetLtInfo>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject, onMounted } from 'vue'
import targetLtInfo from './target-lt-info.vue';
import * as HTTPAPI from '../../api/targetManage/api'
import * as HTTPAPI_APPICATION from './../../api/applicationServices/api'

import { isNumber } from 'xe-utils';
const global = inject('global');
const { proxy } = getCurrentInstance();
const nowYear = new Date().getFullYear();
const viewData = reactive({
    data: [],
    showInfo: false,
    infoObject: {
    leftCom: { comname: null, data: null },
    centerCom: { comname: null, data: null },
    rightCom: { comname: null, data: null }
    }
});
let titles = [{title: '每万人高价值发明专利拥有量', unit: '件', yearData: [], proGoals: 0 }, {title: '有效注册商标量', unit: '件', yearData: [], proGoals: 0}, {title: '知识产权质押融资规模', unit: '万元', yearData: [], proGoals: 0}, {title: '知识产权服务机构数', unit: '家', yearData: [], proGoals: 0},{title: '地理标志拥有量', unit: '件', yearData: [], proGoals: 0},{title: '版权登记数', unit: '件', yearData: [], proGoals: 0}];
let testData = function() {
    viewData.data = [];
    for (let index = 0; index < titles.length; index++) {
        let element = titles[index];
        viewData.data.push(element);
        let name = element.title;
        if(name == "每万人高价值发明专利拥有量") {
            //版权等级数-实际与目标完成情况
            HTTPAPI.perTargetCount().then(res => {
                let proGoalsIndex = res.data.findIndex(el => el.yearly == 'proGoals');
                if(proGoalsIndex != -1) {
                    element.proGoals = res.data[proGoalsIndex].targetNums || 0;
                    res.data.splice(proGoalsIndex, 1);
                }
                let nowCurrentNums = res.data.find(el => el.yearly == nowYear)?.currentNums;
                let target2025Nums = res.data.find(el => el.yearly == '2025')?.targetNums;
                let count = { targetNums: target2025Nums,  currentNums: nowCurrentNums, yearly: '完成情况'};
                res.data.unshift(count)
                viewData.data[0].yearData = res.data;
            })
        } else if(name == "有效注册商标量") {
            //版权等级数-实际与目标完成情况
            HTTPAPI.validTradeMarkerFinishCount().then(res => {
                let proGoalsIndex = res.data.findIndex(el => el.yearly == 'proGoals');
                if(proGoalsIndex != -1) {
                    element.proGoals = res.data[proGoalsIndex].targetNums || 0;
                    res.data.splice(proGoalsIndex, 1);
                }
                let nowCurrentNums = res.data.find(el => el.yearly == nowYear)?.currentNums;
                let target2025Nums = res.data.find(el => el.yearly == '2025')?.targetNums;
                let count = { targetNums: target2025Nums,  currentNums: nowCurrentNums, yearly: '完成情况'};
                res.data.unshift(count)
                viewData.data[1].yearData = res.data;
            })
        }
        else if(name == "知识产权质押融资规模") {
            //版权等级数-实际与目标完成情况
            HTTPAPI.impawnFinancialFinishCount().then(res => {
                let proGoalsIndex = res.data.findIndex(el => el.yearly == 'proGoals');
                if(proGoalsIndex != -1) {
                    element.proGoals = res.data[proGoalsIndex].targetNums || 0;
                    res.data.splice(proGoalsIndex, 1);
                }
                let nowCurrentNums = res.data.find(el => el.yearly == nowYear)?.currentNums;
                let target2025Nums = res.data.find(el => el.yearly == '2025')?.targetNums;
                let count = { targetNums: target2025Nums,  currentNums: nowCurrentNums, yearly: '完成情况'};
                res.data.unshift(count)
                viewData.data[2].yearData = res.data;
            })
        }
        else if(name == "知识产权服务机构数") {
            //版权等级数-实际与目标完成情况
            HTTPAPI.serverOrgFinishCount().then(res => {
                let proGoalsIndex = res.data.findIndex(el => el.yearly == 'proGoals');
                if(proGoalsIndex != -1) {
                    element.proGoals = res.data[proGoalsIndex].targetNums || 0;
                    res.data.splice(proGoalsIndex, 1);
                }
                let nowCurrentNums = res.data.find(el => el.yearly == nowYear)?.currentNums;
                let target2025Nums = res.data.find(el => el.yearly == '2025')?.targetNums;
                let count = { targetNums: target2025Nums,  currentNums: nowCurrentNums, yearly: '完成情况'};
                res.data.unshift(count)
                viewData.data[3].yearData = res.data;
            })
        }
        else if(name == "地理标志拥有量") {
            //版权等级数-实际与目标完成情况
            HTTPAPI.geographyFinishCount().then(res => {
                let proGoalsIndex = res.data.findIndex(el => el.yearly == 'proGoals');
                if(proGoalsIndex != -1) {
                    element.proGoals = res.data[proGoalsIndex].targetNums || 0;
                    res.data.splice(proGoalsIndex, 1);
                }
                let nowCurrentNums = res.data.find(el => el.yearly == nowYear)?.currentNums;
                let target2025Nums = res.data.find(el => el.yearly == '2025')?.targetNums;
                let count = { targetNums: target2025Nums,  currentNums: nowCurrentNums, yearly: '完成情况'};
                res.data.unshift(count)
                viewData.data[4].yearData = res.data;
            })
        }
        else if(name == "版权登记数") {
            //版权等级数-实际与目标完成情况
            HTTPAPI.copyrightFinishCount().then(res => {
                let proGoalsIndex = res.data.findIndex(el => el.yearly == 'proGoals');
                if(proGoalsIndex != -1) {
                    element.proGoals = res.data[proGoalsIndex].targetNums || 0;
                    res.data.splice(proGoalsIndex, 1);
                }
                let nowCurrentNums = res.data.find(el => el.yearly == nowYear)?.currentNums;
                let target2025Nums = res.data.find(el => el.yearly == '2025')?.targetNums;
                let count = { targetNums: target2025Nums,  currentNums: nowCurrentNums, yearly: '完成情况'};
                res.data.unshift(count)
                viewData.data[5].yearData = res.data;
            })
        }
    }
}
let getColorClass = function(item) {
    if(item.currentNums == undefined) return;
    if(item.currentNums < item.targetNums) {
        return 'targetlefttop-smallmb';
    } else if(item.currentNums > item.targetNums) {
        return 'targetlefttop-bigmb';
    } 
}
let getPercentageColorClass = function(item) {
    if(item.currentNums == undefined || item.targetNums == 0)  return 'targetlefttop-smallmb';
    if(parseInt((item.currentNums / item.targetNums) * 100) < 100) {
        return 'targetlefttop-smallmb';
    } else if(item.currentNums >= item.targetNums) {
        return 'targetlefttop-bigmb';
    } 
}
let getPercentage = function(item) {
    if(item.currentNums == undefined || item.targetNums == 0) return 0;
    return parseInt((item?.currentNums / item?.targetNums) * 100);
}
let showInfoFun = function(data) {
    viewData.showInfo = true;
    viewData.infoObject =({
        leftCom: { comname: 'Line', data: data.yearData, title: "" },
        centerCom: { comname: null, data: null },
        rightCom: { comname: null, data: null }
    })
    if(data.title == "每万人高价值发明专利拥有量") {
        viewData.infoObject.leftCom.title = "“十四五”每万人高价值发明专利拥有量实际与目标完成情况(件)"
        viewData.infoObject.centerCom = { comname: 'StereoscopicBar', data: [], title: "“十四五”人口情况(万人)" }
        viewData.infoObject.rightCom = { comname: 'StereoscopicBar', data: [], title: "“十四五”高价值发明专利增长情况(件)", link: `<a style="font-size:14px;" target="_blank" href="${jgsUrl}">查看更多&nbsp;></a>`};
        
        HTTPAPI.highPatentUpInfo().then(res => {
            let infoData = { leftData: [], rightData: [], legendData: [], dataName: [""] } ;
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                infoData.leftData.push(element. currentNums);
                infoData.legendData.push(element.yearly);
            }
            viewData.infoObject.rightCom.data = infoData;
        })
        HTTPAPI.yearlyPersonInfoCount().then(res => {
            let infoData = { leftData: [], rightData: [], legendData: [], dataName: [""] } ;
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                infoData.leftData.push(element. currentNums);
                infoData.legendData.push(element.yearly);
            }
            viewData.infoObject.centerCom.data = infoData;
        })
    } else if(data.title == "有效发明专利") {
        const centerColumns = [
            { field: 'name', title: '企业名称' },
            { field: 'number', title: '有效发明专利量', width: 150 }
        ]
        const rightColumns = [
            { field: 'spatentnumber', title: '专利号', width: 150 },
            { field: 'stitle', title: '失效发明专利名称', width: 150 },
            { field: 'dtEnddate', title: '到期时间',  width: 80 },
            { field: 'sproposer', title: '权利人' }
        ]
        viewData.infoObject.leftCom.title = "“十四五”有效发明专利实际与目标完成情况(件)"
        HTTPAPI.validPatentExpire().then(res => {
             viewData.infoObject.rightCom = { comname: 'Scrolltable', data: res.data.list, title: "即将到期发明专利",  columns: rightColumns }
        })
        HTTPAPI.validPatentIndustry().then(res => {
             viewData.infoObject.centerCom = { comname: 'Scrolltable', data: res.data.list, title: "装备制造/电线电缆产业(件)",  columns: centerColumns }
        })
        
    } else if(data.title == "有效注册商标量") {
        const rightColumns = [
            // { field: 'an', title: '商标号', width: 100 },
            { field: 'enterpriseName', title: '企业名称'},
            // { field: 'ic', title: '类别',  width: 80, align: 'center' },
            // { field: 'ap', title: '权利人'}
        ]
        viewData.infoObject.leftCom.title = "“十四五”有效注册商标量实际与目标完成情况(件)"
        viewData.infoObject.centerCom = { comname: 'StereoscopicPei', data: [], title: "有效注册商标类别占比", otherObject: { num: 0, title: "总商标" } , link: `<a style="font-size:14px;" target="_blank" href="${mdlUrl}">查看更多&nbsp;></a>`};
        viewData.infoObject.rightCom = { comname: 'Scrolltable', data: [], total: 0, title: "“商标清零行动”未清零企业",  columns: rightColumns, link: `<a style="font-size:14px;" target="_blank" href="${warninfoUrl}">查看更多&nbsp;></a>`, tablePaddingLeft: 25};
        //有效注册商标类别占比
        HTTPAPI.validTradeMarkerTypePercentage().then(res => {
            let data = [];
            for (let index = 0; index < res.data.trademarkTopList.length; index++) {
                const element = res.data.trademarkTopList[index];
                data.push({
                    name: element.kw,
                    value: element.num,
                })
            }
            viewData.infoObject.centerCom.data = data;
            viewData.infoObject.centerCom.otherObject.num = res.data.sum;
        })
        //即将到期的注册商标
        HTTPAPI_APPICATION.tmClearingPrompt({ pageNum: 1, pageSize: 100 }).then(res => {
            viewData.infoObject.rightCom.data = res.data.list;
            viewData.infoObject.rightCom.total = res.data.total;
        })
    } else if(data.title == "知识产权质押融资规模") {
        const rightColumns = [
            { field: 'name', title: '金融机构名称' },
            { field: 'number', title: '贷款金额',  width: 150, align: 'center'}
        ]
        viewData.infoObject.leftCom.title = "“十四五”知识产权质押融资实际与目标完成情况(万元)"
        viewData.infoObject.centerCom = { comname: 'StereoscopicPei', data: [], title: "质押融资商标/专利金额占比(万元)" }
        viewData.infoObject.rightCom = { comname: 'Scrolltable', data: [], title: "质押融资借贷银行(万元)",  columns: rightColumns }
        //质押融资商标/专利金额占比
        HTTPAPI.impawnFinancialTypePercentage().then(res => {
            let data = [];
            for (let index = 0; index < res.data.tnameCounts.length; index++) {
                const element = res.data.tnameCounts[index];
                data.push({
                    name: element.name,
                    value: element.number,
                })
            }
            viewData.infoObject.centerCom.data = data;
            viewData.infoObject.centerCom.otherObject.num = res.data.sum;
        })
        //质押融资借贷银行
        HTTPAPI.impawnFinancialBank().then(res => {
            viewData.infoObject.rightCom.data = res.data.list;
        })
    } else if(data.title == "知识产权服务机构数") {
        const centerColumns = [
            { field: 'name', title: '机构名称' },
            { field: 'number', title: '服务企业数(家)',  width: 120, align: 'center' },
        ]
        viewData.infoObject.leftCom.title = "“十四五”知识产权服务机构实际与目标完成情况(家)"
        viewData.infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "服务机构名单",  columns: centerColumns }
        viewData.infoObject.rightCom = { comname: 'Bar', data: { sbdata: [], zldata: [], legendData: [] }, title: "当年商标/专利基础业务量排行(件)" }
        HTTPAPI.serverOrgListCount().then(res => {
            viewData.infoObject.centerCom.data = res.data.list;
            viewData.infoObject.centerCom.total = res.data.total;
        })
        HTTPAPI.serverOrgOrderCount().then(res => {
            let data = { sbdata: [], zldata: [], legendData: [] };
            for (let index = res.data.list.length - 1; index > -1; index--) {
                const element = res.data.list[index];
                data.sbdata.push(element.sbsl);
                data.zldata.push(element.zlsl);
                data.legendData.push(element.ag);
            }
            viewData.infoObject.rightCom.data = data;
        })
    } else if(data.title == "地理标志拥有量") {
        const centerColumns = [
            { field: 'name', title: '产品名称' },
            { field: 'remark', title: '备注' }
        ]
        viewData.infoObject.leftCom.title = "“十四五”地理标志商标/产品实际与目标完成情况(件)"
        viewData.infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "挖掘地标资源",  columns: centerColumns }
        viewData.infoObject.rightCom = { comname: null }
        HTTPAPI.geographySource().then(res => {
            viewData.infoObject.centerCom.data = res.data;
            viewData.infoObject.centerCom.total = res.data?.length || 0;
        })
    } else if(data.title == "版权登记数") {
        const centerColumns = [
            { field: 'name', title: '版权名称' },
            { field: 'registeredTime', title: '登记时间',  width: 100 }
        ]
        viewData.infoObject.leftCom.title = "“十四五”版权登记数实际与目标完成情况(件)"
        viewData.infoObject.centerCom = { comname: 'Scrolltable', data: [], total: 0, title: "版权列表",  columns: centerColumns }
        viewData.infoObject.rightCom = { comname: null }
        HTTPAPI.copyrightList().then(res => {
            viewData.infoObject.centerCom.data = res.data;
            viewData.infoObject.centerCom.total = res.data?.length || 0;
        })
    } 
}
let hideInfo = function() {
    viewData.showInfo = false;
}
testData();

onMounted(()=>{
    
})
</script>
<style scoped>
.targetlefttop-box-yearbox { float: left; margin: 130px 0 20px; width: 110px; display: flex; flex-direction: column; align-items: center; font-size: 18px; font-weight: 400; opacity: 0.9;}
.targetlefttop-yearbox-item { margin-bottom: 10px; display: flex; justify-content: center; height: 30px; align-items: center;}
.targetlefttop-yearbox-item span, .targetlefttop-yearbox-item span { font-size: 12px; margin-left: 2px;}
/* .targetlefttop-yearbox-item:last-child, .targetlefttop-yearbox-item:nth-child(2) { font-size: 14px; }  */
.targetlefttop-yearbox-item:first-child { font-size: 18px;font-weight: 700; } 
.targetlefttop-box-yearbox .targetlefttop-yearbox-nowyear { font-size: 30px; font-weight: 700; opacity: 1;}
.targetlefttop-box-yearbox .targetlefttop-yearbox-nowyear span { font-size: 20px; margin-left: 2px; }
.targetlefttop-box { position: relative; font-family: Arial, Helvetica, sans-serif; display: flex;}
.targetlefttop-box .targetlefttop-data-item { padding: 8px 8px 0; float: left; margin: 0 10px; height: 360px; flex: 1;}
.targetlefttop-box .targetlefttop-data-item .targetlefttop-data-item-head { font-size: 12px; height: 114px; margin-bottom: 6px; display: flex; flex-direction: column;}
.targetlefttop-data-item-head-title { display: flex; align-items: center; justify-content: center; }
.targetlefttop-data-item-head-title::before {
    content: " ";
    width: 4px;
    height: 4px;
    display: block;
    background-color: #5FFFE2;
    margin-right: 10px;
}
.targetlefttop-data-item-grid { display: grid; grid-template-columns: repeat(3, 1fr); flex: 1; align-items: center; justify-content: center; }

.targetlefttop-data-item-gridrow .targetlefttop-data-grid-item:nth-child(1), .targetlefttop-data-item-gridrow .targetlefttop-data-grid-item:nth-child(2){ display: flex; align-items: center; justify-content: center; }
.targetlefttop-data-grid-item { position: relative; text-align: center; height: 30px; line-height: 32px; background-position: bottom; background-repeat: no-repeat; }
.targetlefttop-data-grid-item:nth-child(2) { margin: 0 7px; }
.targetlefttop-itemdata-nowyear, .targetlefttop-yearbox-nowyear { font-size: 24px!important; font-family: 'DDINBold'; }
.targetlefttop-bigmb { color: #5FFFE2; }
.targetlefttop-smallmb { color: #FFC757; }
.targetlefttop-data-grid-item.number-font { display: flex; align-items: center; justify-content: center; position: relative; }
.percentage-item::after { content: "%";  font-size: 14px; line-height: 30px;}
.target-lt-info { position: absolute; width: 100%; height:100%; padding-bottom: 20px; left: 0; display: flex; flex-direction: column; background: rgba(5, 5, 76, 0.94); z-index: 20; box-sizing: border-box;}

.targetlefttop-data-item-head-progoals { padding: 2px 0 8px 0; font-size: 12px; margin: 10px 0; display: flex; justify-content: center; align-items: center;}
.targetlefttop-data-item-head-progoals span{ font-size: 24px; font-family: 'DDINBold';}

</style>