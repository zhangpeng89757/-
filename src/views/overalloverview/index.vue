<template>
    <el-row class="content-view">
        <div style="margin-left:10px; width: 490px; max-width: 490px; overflow: hidden;">
            <div style="height: 440px; display: flex; flex-direction: column;">
                <titlebar content="知识产权主体数据概况" style="margin-bottom: 10px;"/>
                <block style="flex: 1; overflow: hidden; padding-bottom: 20px;" :data="overallOverview.getApOverviewData" titleKey="title" dataKey="data" :lineNumber="4"/>
            </div>
            <div style="height: 490px; overflow: hidden; display: flex; flex-direction: column; margin-top: 20px;">
                <titlebar content="重点关注企业" style="margin-bottom: 10px;"/>
                <Scrolltable style="flex: 1;" height="450" :columns="columns"  :data="overallOverview.getFocusEnterprisesData"></Scrolltable>
            </div>
        </div>
        <div style="width: 860px; max-width: 860px; overflow: hidden; margin: 50px 30px 0; display: flex; flex-direction: column; height: 80%;">
            <div style="overflow: hidden; display: flex; flex-direction: column; overflow: hidden;flex: 1;">
                <titlebar fontFamily="HarmonyOSBold" content="国家知识产权强县建设试点县(区)建设期-核心预期性指标" style="margin-bottom: 10px;" size="large" algin="center"/>
                <FlowBox>
                    <Centertop style="flex: 1; overflow: hidden; padding: 20px 10px 20px 30px;"></Centertop>
                </FlowBox>
            </div>
            <div style="overflow: hidden; margin-top: 20px;">
                <titlebar content="执法保护概况" style="margin-bottom: 10px;"/>
                <MainListBlock gap="0px 20px"  style="height: 150px; overflow: hidden; padding:0 20px;" :data="overallOverview.getLawEnforcementProtectData" :lineNumber="overallOverview.getLawEnforcementProtectData.length">
                    <template v-slot:item="{slotData}">
                        <Zfgk :data="slotData" dataItemTtileKey="title" dataItemDataValue="data" />
                    </template>
                </MainListBlock>
            </div>
        </div>
        <div style="margin-right: 10px; width: 490px; max-width: 490px; overflow: hidden;">
            <Line :backgroundImage="global.getAssetsFile('qjgk/line-bg.png')" ref="echarts-line1" style="height: 23%; width: 100%; overflow: hidden;" title="项目资助近三年趋势" :data="overallOverview.getLastThreeYearsFundingTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量" xUnit="件"></Line>
            <Line :backgroundImage="global.getAssetsFile('qjgk/line-bg.png')" ref="echarts-line2" style="height: 23%; width: 100%; overflow: hidden; margin-top: 20px;" title="知识产权奖补近三年趋势" :data="overallOverview.getLastThreeYearsRewardCompensationTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="金额" xUnit="万元"></Line>
            <Line :backgroundImage="global.getAssetsFile('qjgk/line-bg.png')" ref="echarts-line3" style="height: 23%; width: 100%; overflow: hidden; margin-top: 20px;" title="知识产权质押融资近三年趋势" :data="overallOverview.getLastThreeYearsPledgeFinancingTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量" xUnit="家"></Line>
            <Line :backgroundImage="global.getAssetsFile('qjgk/line-bg.png')" ref="echarts-line4" style="height: 23%; width: 100%; overflow: hidden; margin-top: 20px;" title="知识产权交易/许可近三年趋势" :data="overallOverview.getLastThreeYearsTradingLicensingTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量"></Line>
        </div>
    </el-row>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject } from 'vue'
import titlebar from '@/components/titlebar.vue'
import Smalltitlebar from '@/components/smalltitlebar.vue'
import block from '@/components/datadisplay/block.vue'
import Line from '@/components/echarts/line.vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import Centertop from '@/components/overalloverview/centertop.vue'
import Zfgk from '@/components/overalloverview/zfgk.vue'
import overallOverview from '@/api/overallOverview/index.js'
const { proxy } = getCurrentInstance();
const global = inject('global');
/**主体数据 */
const GetThemeData = () => {
    let dataArray = [];
    for (let index = 0; index < 7; index++) {
        dataArray.push({
            title: `数据${index + 1}`,
            data: parseInt(Math.random() * 10000)
        })
    }
    return dataArray;
}

/**重点关注企业 */
const GetEnterpriseData = () => {
    let dataArray = [];
    for (let index = 0; index < 17; index++) {
        let seq = index + 1 < 10 ? `0${index + 1}` : index + 1;
        dataArray.push({
            seq: seq,
            name: `数据${index + 1}`,
            reason: parseInt(Math.random() * 10000)
        })
    }
    return dataArray;
}



/**电线电缆产业 */
const GetDxDlData = () => {
    let dataArray = [];
    for (let index = 0; index < 2; index++) {
        let element = { title:  `数据${index + 1}`, data: [] };
        for (let j = 0; j < 3; j++) {
            element.data.push({
                title: `数据${j + 1}`,
                data: parseInt(Math.random() * 100000)
            })
        }
        dataArray.push(element);
    }
    return dataArray;
}
/**执法概况 */
const GetZFGKData = () => {
    let dataArray = [];
    for (let index = 0; index < 4; index++) {
        dataArray.push({
            title: `数据${index + 1}`,
            data: parseInt(Math.random() * 10000)
        })
    }
    return dataArray;
}
/**项目资助 */
const GetXMZZData = () => {
    let dataArray = [];
    for (let index = 0; index < 3; index++) {
        let element = { title: `数据${index + 1}`, data: [] }
        for (let j = 0; j < 4; j++) {
            element.data.push({
                name: `202${j}`,
                value: parseInt(Math.random() * 10000)
            })
        }
        dataArray.push(element)
    }
    return dataArray;
}
/**项目资助 */
const GetZSCQJYXKData = () => {
    let dataArray = [];
    for (let index = 0; index < 3; index++) {
        let element = { title: `大数据${index + 1}`, data: [] }
        for (let j = 0; j < 4; j++) {
            let element2 = { title: `小数据${j + 1}`, data: [] }
            for (let k = 0; k < 4; k++) {
                element2.data.push({
                    name: `202${j}`,
                    value: parseInt(Math.random() * 10000)
                })
            }
            element.data.push(element2)
        }
        dataArray.push(element)
    }
    return dataArray;
}
const columns = [
    { field: 'name',  title: '企业名称' },
    { field: 'reason', title: '知识产权优势' },
];
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
    .content-view { display: flex; flex: 1; }
</style>