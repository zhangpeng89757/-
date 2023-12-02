<template>
    <div class="overalloverview-centertop-box">
        <MainListBlock style="flex: 1; overflow: hidden;" :data="viewObject.data" :lineNumber="4">
            <template v-slot:item="{slotData}">
                <CenterItem
                    style="margin-bottom: 10px;"
                    :data="slotData" 
                    titleKey="title" 
                    dataKey="data" 
                    dataItemTtileKey="title" 
                    dataItemDataValue="value"
                    iconPath="img"></CenterItem>
            </template>
        </MainListBlock>
    </div>
</template>
<script setup>
import { reactive, watch, inject, onMounted } from 'vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import CenterItem from './center-item.vue'
import { get145PlanDataV2 } from '@/api/overallOverview'
const global = inject('global');
const viewObject = reactive({
    //数据
    data: []
})
onMounted(()=>{
    get145PlanDataV2().then(res => {
        let resData = res.data;
        // 创造质量
        let czjzTitles = ['每万人高价值发明专利拥有量(件)','海外发明专利授权量(件)','有效注册商标总量(件)','马德里商标国际注册量(件)','地理标志拥有量 (件)','著作权登记量(件)'];
        let czjzKey1s = ['tenThousandPeoplePtNum','overseasInventPtNum','tmRegisterValidNum','madridNum','landmarkTmNum',"copyrightRegisterNum"];
        let czjzKey2s = ['tenThousandPeoplePtTargetNum','overseasInventPtTargetNum','tmRegisterValidTargetNum','madridTargetNum','landmarkTmTargetNum','copyrightRegisterTargetNum'];
        // 运用效益
        let yyxyTitles = ['国、省级知识产权优势示范企业','知识产权质押融资金额(亿元)','高新技术企业','专精特新企业'];
        let yyxyKey1s = ['demonstrateNum','demonstratePledgeNum','technologyNum','masteryNum'];
        let yyxyKey2s = ['demonstrateTargetNum','demonstratePledgeTargetNum','technologyTargetNum','masteryTargetNum'];
        // 保护环境
        let bhhjTitles = ['知识产权保护社会满意度(%)','知识产权仲裁和调解案件(件)','专利行政执法案件结案率(%)'];
        let bhhjKey1s = ['protectingNum','arbitrateNum','closeCaseNum'];
        let bhhjKey2s = ['protectingTargetNum','arbitrateTargetNum','closeCaseTargetNum'];
        // 优质服务
        let yzfwTitles = ['专利代理师数量(人)','知识产权托管企业数量(家)'];
        let yzfwKey1s = ['agentNum','trusteeshipNum'];
        let yzfwKey2s = ['agentTargetNum','trusteeshipTargetNum'];
        let description = ['当前', '目标'];
        let czjz = [];
        for (let index = 0; index < czjzTitles.length; index++){
            let element = {
                title: czjzTitles[index],
                img: "1-" + (index + 1)+ ".png",
                data: []
            };
            element.data.push({ 
                title: description[1],
                value: resData[czjzKey2s[index]] 
            });
            element.data.push({ 
                title: description[0],
                value: resData[czjzKey1s[index]] 
            });
            czjz.push(element);
        }
        for (let index = 0; index < yyxyTitles.length; index++){
            let element = {
                title: yyxyTitles[index],
                img: "1-" + (czjz.length + 1)+ ".png",
                data: []
            };
            element.data.push({ 
                title: description[1],
                value: resData[yyxyKey2s[index]] 
            });
            element.data.push({ 
                title: description[0],
                value: resData[yyxyKey1s[index]] 
            });
            czjz.push(element);
        }
        for (let index = 0; index < bhhjTitles.length; index++){
            let element = {
                title: bhhjTitles[index],
                img: "1-" + (czjz.length + 1)+ ".png",
                data: []
            };
            element.data.push({ 
                title: description[1],
                value: resData[bhhjKey2s[index]] 
            });
            element.data.push({ 
                title: description[0],
                value: resData[bhhjKey1s[index]] 
            });
            czjz.push(element);
        }
        for (let index = 0; index < yzfwTitles.length; index++){
            let element = {
                title: yzfwTitles[index],
                img: "1-" + (czjz.length + 1)+ ".png",
                data: []
            };
            element.data.push({ 
                title: description[1],
                value: resData[yzfwKey2s[index]] 
            });
            element.data.push({ 
                title: description[0],
                value: resData[yzfwKey1s[index]] 
            });
            czjz.push(element);
        }
        viewObject.data = czjz;
    });
})
</script>
<style scoped>
    .overalloverview-centertop-box { display: flex; flex-direction: column; font-size: var(--small-font-size);  background:  rgba(21, 20, 92, 0.8); padding: 10px 4px;}
    .overalloverview-centertop-box-item { display: flex; flex-wrap: wrap; }
    .overalloverview-centertop-box-title { padding-left: 40px; background-size: contain; line-height: 2; background-repeat: no-repeat; }
</style>