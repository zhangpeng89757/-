<template>
    <el-row class="content-view">
        <div style="margin-left: 0.5%; width: 23%; max-width: 23%; overflow: hidden;">
            <div style="height: 32%; overflow: hidden; display: flex; flex-direction: column;">
                <titlebar content="知识产权主体数据概况" style="margin-bottom: 10px;"/>
                <block style="flex: 1; overflow: hidden;" :data="overallOverview.getApOverviewData" titleKey="title" dataKey="data" :lineNumber="4"/>
            </div>
            <div style="height: 32%; overflow: hidden; display: flex; flex-direction: column;">
                <titlebar content="商标数据概况" style="margin-bottom: 10px;"/>
                <MainListBlock :gap="20" style="flex: 1; overflow: hidden; padding: 10px;" :data="overallOverview.getTradeMarkOverviewData" :lineNumber="2">
                    <template v-slot:item="{slotData}">
                    <RectangleItem 
                            :data="slotData" 
                            titleKey="title" 
                            dataKey="data" 
                            dataItemTtileKey="title"
                            dataItemDataValue="data"></RectangleItem>
                    </template>
                </MainListBlock>
            </div>
            <div style="height: 32%; overflow: hidden; display: flex; flex-direction: column;">
                <titlebar content="专利数据概况" style="margin-bottom: 10px;"/>
                <MainListBlock :gap="20" style="flex: 1; overflow: hidden; padding: 10px;" :data="overallOverview.getPatentOverviewData" :lineNumber="2">
                    <template v-slot:item="{slotData}">
                    <RectangleItem 
                            :data="slotData" 
                            titleKey="title" 
                            dataKey="data" 
                            dataItemTtileKey="title"
                            dataItemDataValue="data"></RectangleItem>
                    </template>
                </MainListBlock>
            </div> 
        </div>
        <div style="width: 52%; max-width: 52%; overflow: hidden; margin: 30px 0.5% 0;">
            <div style="overflow: hidden; display: flex; flex-direction: column; overflow: hidden;">
                <titlebar content="国家知识产权强县建设试点县(区)建设期-核心预期性指标" size="large" algin="center"/>
                <Centertop style="flex: 1; overflow: hidden;"></Centertop>
            </div>
            <div style="overflow: hidden; margin-top: 10px;">
                <el-row justify="space-around" gutter="20">
                    <el-col :span="12" style="display: flex; flex-direction: column; overflow: hidden;">
                        <titlebar content="电线电缆产业知识产权概况" />
                        <MainListBlock :gap="0" style="flex: 1; overflow: hidden;" :data="overallOverview.getDxDlZscqOverviewData" :lineNumber="1">
                            <template v-slot:item="{slotData}">
                                <CenterCenter :data="slotData" titleKey="title" dataKey="data" dataItemTtileKey="title" dataItemDataValue="data" />
                            </template>
                        </MainListBlock>
                    </el-col>
                    <el-col :span="12" style="display: flex; flex-direction: column; overflow: hidden;">
                        <titlebar content="装备制造产业知识产权概况" />
                        <MainListBlock :gap="0" style="flex: 1; overflow: hidden;" :data="overallOverview.getZbZzZscqOverviewData" :lineNumber="1">
                            <template v-slot:item="{slotData}">
                                <CenterCenter :data="slotData" titleKey="title" dataKey="data" dataItemTtileKey="title" dataItemDataValue="data" />
                            </template>
                        </MainListBlock>
                    </el-col>
                </el-row>
            </div>
            <div style="height: 160px; overflow: hidden; margin-top: 10px; display: flex; flex-direction: column;">
                <el-row justify="space-around" gutter="20" style="flex: 1; overflow: hidden; height: 160px; flex-wrap: nowrap;">
                    <el-col :span="12" style="display: flex; flex-direction: column; overflow: hidden; ">
                        <titlebar content="2023年执法保护概况" />
                        <MainListBlock style="flex: 1; overflow: hidden; height: 150px;" :data="overallOverview.getLawEnforcementProtectData" :lineNumber="overallOverview.getLawEnforcementProtectData.length">
                            <template v-slot:item="{slotData}">
                                <Zfgk :data="slotData" dataItemTtileKey="title" dataItemDataValue="data" />
                            </template>
                        </MainListBlock>
                    </el-col>
                    <el-col :span="12" style="display: flex; flex-direction: column; overflow: hidden; ">
                        <titlebar content="重点关注企业" />
                        <Scrolltable style="flex: 1; height: 150px;" :columns="columns"  :Data="overallOverview.getFocusEnterprisesData"></Scrolltable>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div style="margin-right: 0.5%; width: 23%; max-width: 23%; overflow: hidden;">
            <Line style="height: 23%; width: 100%; overflow: hidden;" title="项目资助近三年趋势" :data="overallOverview.getLastThreeYearsFundingTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量" xUnit="件"></Line>
            <Line style="height: 23%; width: 100%; overflow: hidden; margin-top: 10px;" title="知识产权奖补近三年趋势" :data="overallOverview.getLastThreeYearsRewardCompensationTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="金额" xUnit="万元"></Line>
            <Line style="height: 23%; width: 100%; overflow: hidden; margin-top: 10px;" title="知识产权质押融资近三年趋势" :data="overallOverview.getLastThreeYearsPledgeFinancingTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量" xUnit="家"></Line>
            <Line style="height: 23%; width: 100%; overflow: hidden; margin-top: 10px;" title="知识产权交易/许可近三年趋势" :data="overallOverview.getLastThreeYearsTradingLicensingTrendsData" titleKey="title" dataKey="data" dataItemTtileKey="name" dataItemDataValue="value" yUnit="数量"></Line>
        </div>
    </el-row>
</template>
<script setup>
import titlebar from '@/components/titlebar.vue'
import block from '@/components/datadisplay/block.vue'
import rectangle from '@/components/datadisplay/rectangle.vue'
import Line from '@/components/echarts/line.vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import Center145 from '@/components/overalloverview/center145.vue'
import CenterCenter from '@/components/overalloverview/centercenter.vue'
import Centertop from '@/components/overalloverview/centertop.vue'
import Zfgk from '@/components/overalloverview/zfgk.vue'
import overallOverview from '@/api/overallOverview/index.js'
import RectangleItem from '@/components/overalloverview/rectangleItem.vue'
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
    { field: 'reason', title: '关注原因' },
];
</script>
<style scoped>
    .content-view { display: flex; flex: 1; }
</style>