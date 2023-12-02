<template>
    <div class="content-view">
        <div style="margin-left: 10px; width: 500px; overflow: hidden; height: 100%;" class=" model-backgroud">
            <titlebar content="知识产权成果"></titlebar>
            <leftView ref="leftViewCom"></leftView>
            <!-- <div class="achievementOverview-left-modebox model-backgroud">
                <titlebar :content="`高价值专利 (512)`"></titlebar>
                <gjzzl style="margin: 20px; flex: 1;" @count="(d)=>{ numberData.gjzzlNum = d; }"></gjzzl>
            </div>
            <div class="achievementOverview-left-modebox model-backgroud">
                <titlebar :content="`驰名商标 (${numberData.cmsbNum})`"></titlebar>
                <cmsb style="margin: 20px 10px; flex: 1;" @dataChange="(d)=> { numberData.cmsbNum = d.length; }"></cmsb>
            </div>
            <div class="achievementOverview-left-modebox model-backgroud">
                <titlebar :content="`地理标志产品 (${numberData.dlbzNum})`" style="margin-bottom: 10px;"></titlebar>
                <dlbz style="margin: 10px; flex: 1;" @dataChange="(d)=> { numberData.dlbzNum = d.length; }"></dlbz>
            </div> -->
        </div>
        <div style="margin: 40px 20px 0; width: 860px; overflow: hidden; height: 810px;">
            <div class="achievementOverview-center-modebox model-backgroud" style="height: 450px;">
                <FlowBox>
                    <titlebar content="领导关怀 重点工作展示" algin="center"/>
                    <centertop ref="centerViewCom" style="flex: 1; margin: 10px;"></centertop>
                </FlowBox>
            </div>
            <div class="achievementOverview-center-modebox model-backgroud" style="height: 370px; box-sizing: border-box;">
                <titlebar content="德阳市旌阳区知识产权情况简介" algin="center"/>
                <centerbottom :key="centerbottomKey" style="flex: 1; margin: 10px 20px;"></centerbottom>
            </div>
        </div>
        <div class="achievementOverview-tables" style="margin-right: 10px; width: 500px; overflow: hidden; height: 100%;">
            <div class="achievementOverview-right-modebox model-backgroud">
                <titlebar :content="`知识产权优势企业 (${rightTableData.protectionAchievementDataCount})`" style="margin-bottom: 10px;">
                    <template #tools>
                        <a class="achievementOverview-read-more" target="_blank" :href="link">查看更多&ensp;></a>
                    </template>
                </titlebar>
                <Scrolltable style="flex: 1;" :columns="rightColumns" :data="rightTableData.protectionAchievementData"></Scrolltable>
            </div>
            <div class="achievementOverview-right-modebox model-backgroud">
                <titlebar :content="`知识产权贯标企业 (${rightTableData.consistentEnterpriseDataCount})`" style="margin-bottom: 10px;">
                    <template #tools>
                        <a class="achievementOverview-read-more" target="_blank" :href="link">查看更多&ensp;></a>
                    </template>
                </titlebar>
                <Scrolltable :showHeader="false" style="flex: 1;" :columns="rightColumns" :data="rightTableData.consistentEnterpriseData"></Scrolltable>
            </div>
            <div class="achievementOverview-right-modebox model-backgroud">
                <titlebar :content="`高新技术企业 (${rightTableData.hightechEnterpriseDataCount})`" style="margin-bottom: 10px;">
                    <template #tools>
                        <a class="achievementOverview-read-more" target="_blank" :href="link">查看更多&ensp;></a>
                    </template>
                </titlebar>
                <Scrolltable :showHeader="false" style="flex: 1;" :columns="rightColumns" :data="rightTableData.hightechEnterpriseData"></Scrolltable>
            </div>
            <div class="achievementOverview-right-modebox model-backgroud">
                <titlebar :content="`专精特新企业 (${rightTableData.specializedEnterpriseDataCount})`" style="margin-bottom: 10px;">
                    <template #tools>
                        <a class="achievementOverview-read-more" target="_blank" :href="link">查看更多&ensp;></a>
                    </template>
                </titlebar>
                <Scrolltable :showHeader="false" style="flex: 1;" :columns="rightColumns" :data="rightTableData.specializedEnterpriseData"></Scrolltable>
            </div>
            <div class="achievementOverview-right-modebox model-backgroud">
                <titlebar :content="`规上企业 (${rightTableData.complianceEnterpriseDataCount})`" style="margin-bottom: 10px;">
                    <template #tools>
                        <a class="achievementOverview-read-more" target="_blank" :href="link">查看更多&ensp;></a>
                    </template>
                </titlebar>
                <Scrolltable :showHeader="false" style="flex: 1;" :columns="rightColumns" :data="rightTableData.complianceEnterpriseData"></Scrolltable>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, inject,onMounted, reactive, ref } from 'vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import titlebar from '@/components/titlebar.vue'
import centertop from '@/components/achievementOverview/centertop.vue';
import leftView from './../../components/achievementOverview/left.vue'
import centerbottom from '@/components/achievementOverview/centerbottom.vue';
import * as HTTPAPI from '../../api/achievementOverview/api'
const link = aoqylbFileUrl;
const leftViewCom = ref(null);
const centerViewCom = ref(null);
const centerbottomKey = Math.random();
/**右侧统计表头 */
const rightColumns = [
    { field: 'name', title: '企业名称' },
    { field: 'patentCount', width: 130, title: '发明专利拥有量', align: 'center' },
    { field: 'tradmarCount', width: 130, title: '注册商标拥有量', align: 'center' },
]
const rightTableData = reactive({
    complianceEnterpriseData: [], //规上企业
    complianceEnterpriseDataCount: 0,
    hightechEnterpriseData: [], //高新技术企业
    hightechEnterpriseDataCount: 0,
    consistentEnterpriseData: [], //⾼知识产权贯标企业
    consistentEnterpriseDataCount: 0,
    specializedEnterpriseData: [], //专精特新企业
    specializedEnterpriseDataCount: 0,
    protectionAchievementData: [], //知识产权优势企业
    protectionAchievementDataCount: 0,
})
const numberData = reactive({
    gjzzlNum: 0,
    cmsbNum: 0,
    dlbzNum: 0
})
onMounted(() => {
    //获取规上企业知识产权统计数据
    HTTPAPI.complianceEnterprise().then(res=> {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            if(element?.patentCount <= 0) element.patentCount = "-";
            if(element?.tradmarCount <= 0) element.tradmarCount = "-";
        }
        rightTableData.complianceEnterpriseData = res.data.list;
        rightTableData.complianceEnterpriseDataCount = res.data.total;
    })
    //⾼新技术企业知识产权统计列表
    HTTPAPI.hightechEnterprise().then(res=> {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            if(element?.patentCount <= 0) element.patentCount = "-";
            if(element?.tradmarCount <= 0) element.tradmarCount = "-";
        }
        rightTableData.hightechEnterpriseData = res.data.list;
        rightTableData.hightechEnterpriseDataCount = res.data.total;
    })
    //⾼知识产权贯标企业知识产权统计列表
    HTTPAPI.consistentEnterprise().then(res => {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            if(element?.patentCount <= 0) element.patentCount = "-";
            if(element?.tradmarCount <= 0) element.tradmarCount = "-";
        }
        rightTableData.consistentEnterpriseData = res.data.list;
        rightTableData.consistentEnterpriseDataCount = res.data.total;
    })
    //⾼专精特殊新企业知识产权统计列表
    HTTPAPI.specializedEnterprise().then(res => {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            if(element?.patentCount <= 0) element.patentCount = "-";
            if(element?.tradmarCount <= 0) element.tradmarCount = "-";
        }
        rightTableData.specializedEnterpriseData = res.data.list;
        rightTableData.specializedEnterpriseDataCount = res.data.total;
    })
    //⾼知识产权优势企业知识产权统计列表
    HTTPAPI.protectionAchievementsList().then(res => {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            if(element?.patentCount <= 0) element.patentCount = "-";
            if(element?.tradmarCount <= 0) element.tradmarCount = "-";
        }
        rightTableData.protectionAchievementData = res.data.list;
        rightTableData.protectionAchievementDataCount = res.data.total;
    })
})
/**获取要播放的组件*/
const GetPlayCom = (reslove) => {
    let playCom = [{
        type: 'PlayData',
		changeData: leftViewCom.value.displayFun,
        data: leftViewCom.value.displayData
    }, {
        type: 'PlayData',
		changeData: centerViewCom.value.displayFun,
        data: centerViewCom.value.displayData
    },];
    
    reslove(playCom)
}
defineExpose({
    GetPlayCom
})
</script>
<style scoped>
.content-view {  
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    width: 1920px;
    margin: 0 auto;
}
.achievementOverview-left-modebox {
    height: 310px; display: flex; flex-direction: column; margin-bottom: 10px;
}

.achievementOverview-right-modebox {
    height: 180px; display: flex; flex-direction: column; margin-bottom: 14px; box-sizing: border-box;
}
.achievementOverview-center-modebox {
    display: flex; flex-direction: column; margin-bottom: 15px; overflow: hidden;
}

.achievementOverview-read-more { font-size: 12px; font-weight: 400; cursor: pointer;z-index: 9999; color: #fff;}

a:hover { background-color: transparent; }
</style>
<style>
.achievementOverview-tables .el-table .el-table__header .cell { padding: 0 6px !important; line-height: 34px !important; font-size: var(--default-font-size); }
</style>