<template>
    <div class="content-view">
        <div style="margin:40px 20px 0 20px; width: 1620px; overflow: hidden; height: 100%;">
            <div style="width: 100%; height: 400px; display: flex;flex-direction:column ; position: relative; margin-bottom: 10px;" class="model-backgroud2">
                <titlebar content="国家知识产权强县建设试点县(区)建设期-核心预期性指标" algin="center" style="position: relative;">
                    <template #tools>
                        <div style="position: absolute; right: 0; top: 6px;">
                            <div @click="changeBottomContent(0)" :class="[viewData.letBottomShowIndex == 0 ? ' pagebutton-checked' : '', 'pagebutton']">现状情况</div>
                            <div @click="changeBottomContent(1)" :class="[viewData.letBottomShowIndex == 1 ? ' pagebutton-checked' : '', 'pagebutton']">政策文件</div>
                            <!-- <div @click="changeBottomContent(2)" :class="[viewData.letBottomShowIndex == 2 ? ' pagebutton-checked' : '', 'pagebutton']">领导小组</div> -->
                        </div>
                    </template>
                </titlebar>
                <leftbottom style="flex: 1; margin-top: 16px;"  v-show="viewData.letBottomShowIndex == 0"></leftbottom>
                <policyDocument type="PolicyHexyqxzb" style="flex: 1; margin-top: 20px;" v-show="viewData.letBottomShowIndex == 1" :key="pdf2"></policyDocument>
                <leadgroup type="LeaderHexyqxzb" style="flex: 1; margin-top: 20px;" v-show="viewData.letBottomShowIndex == 2"></leadgroup>
            </div>
            <div style="width: 100%; height: 430px; display: flex;flex-direction:column ; overflow: hidden; position: relative;" class="model-backgroud">
                <titlebar content="德阳市“十四五”知识产权规划目标旌阳区细分工作目标" algin="center" style="position: relative;">
                    <template #tools>
                        <div style="position: absolute; right: 0; top: 6px;">
                            <div @click="changeTopContent(0)" :class="[viewData.letTopShowIndex == 0 ? ' pagebutton-checked' : '', 'pagebutton']">现状情况</div>
                            <div @click="changeTopContent(1)" :class="[viewData.letTopShowIndex == 1 ? ' pagebutton-checked' : '', 'pagebutton']">政策文件</div>
                            <!-- <div @click="changeTopContent(2)" :class="[viewData.letTopShowIndex == 2 ? ' pagebutton-checked' : '', 'pagebutton']">领导小组</div> -->
                        </div>
                    </template>
                </titlebar>
                <targetlefttop style="flex: 1; margin-top: 20px;" v-show="viewData.letTopShowIndex == 0"></targetlefttop>
                <policyDocument type="PolicyZhiscqghmb" style="flex: 1; margin-top: 20px;" v-show="viewData.letTopShowIndex == 1" :key="pdf1"></policyDocument>
                <leadgroup type="LeaderZhiscqghmb" style="flex: 1; margin-top: 20px;" v-show="viewData.letTopShowIndex == 2"></leadgroup>
            </div>
        </div>
        <div style="width: 250px; overflow: hidden; height: 100%; display: flex; padding:14px 10px; flex-direction: column; box-sizing: border-box;" class="model-backgroud">
            <targetcarousel title="目标工作动态" style="flex: 1;"/>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject } from 'vue'
import titlebar from '@/components/titlebar.vue'
import targetlefttop from '@/components/targetManage/targetlefttop.vue';
import policyDocument from '@/components/targetManage/policy-document.vue'
import leftbottom from '@/components/targetManage/leftbottom.vue';
import targetcarousel from '@/components/targetManage/targetcarousel.vue';
import leadgroup from '@/components/targetManage/leadgroup.vue';
const global = inject('global');
const { proxy } = getCurrentInstance();

const viewData = reactive({
    letTopShowIndex: 0, //左上显示位置
    letBottomShowIndex: 0, //左上显示位置
})
//切换左上内容显示
let changeTopContent = (index) => {
    viewData.letTopShowIndex = index;
}
//切换左下内容显示
let changeBottomContent = (index) => {
    viewData.letBottomShowIndex = index;
}
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
.model-backgroud2 { background-image: linear-gradient(180deg, #050457 10.9%, rgba(5, 4, 87, 0.00) 100%);}
.model-backgroud2 .titlebar-box{
    line-height: 40px;
}
.pagebutton { width: 56px; height: 20px; display: inline-flex; margin-right: 10px; align-items: center; justify-content: center; 
    color: #ffffff60;
    font-size: var(--medium-font-size);
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 4px 12px;
    background-color: #17387D;
    cursor: pointer;
}
.pagebutton.pagebutton-checked {
    border-top: 1px solid #1FC6FF;
    background: linear-gradient(180deg, rgba(31, 198, 255, 0.32) 0%, rgba(31, 198, 255, 0.00) 100%);
    color: #1FC6FF;
}
</style>