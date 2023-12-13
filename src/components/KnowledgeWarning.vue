<!--知识产权预警-->
<template>
    <div class="KnowledgeWarning">
        <div class="zscqqqyj-box">
            <div class="zscqqqyj-box-title background-image-box">
                <knowledgeTitle title="知识产权预警" text="家"></knowledgeTitle>
            </div>
            <div class="zscqqqyj-content-box">
                <div class="zscqqqyj-content-item">
                    <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                    <div class="zscqqqyj-content-item-content">
                        <div class="number-font">{{ viewObj.monitorWarning }}</div>
                        <div>重点品牌监测预警</div>
                    </div>
                </div>
                <div class="zscqqqyj-content-item">
                    <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                    <div class="zscqqqyj-content-item-content">
                        <div class="number-font">{{ viewObj.infringementWarning }}</div>
                        <div>重点企业字号品牌保护预警</div>
                    </div>
                </div>
                <div class="zscqqqyj-content-item">
                    <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                    <div class="zscqqqyj-content-item-content">
                        <div class="number-font">{{ viewObj.tmEncroachWarning }}</div>
                        <div >小微企业商标“清零行动”提醒</div>
                    </div>
                </div>
                <div class="zscqqqyj-content-item">
                    <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                    <div class="zscqqqyj-content-item-content">
                        <div class="number-font">{{ viewObj.brandProtectionWarning }}</div>
                        <div>科技型企业专利“清零行动”提醒</div>
                    </div>
                </div>
                <div class="zscqqqyj-content-item">
                    <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                    <div class="zscqqqyj-content-item-content">
                        <div class="number-font">{{ viewObj.tmClearingPrompt }}</div>
                        <div>商标续展提醒</div>
                    </div>
                </div>
                <div class="zscqqqyj-content-item">
                    <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                    <div class="zscqqqyj-content-item-content">
                        <div class="number-font">{{ viewObj.ptClearingPrompt }}</div>
                        <div>专利续费提醒 </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { GetPublicSource } from '../SystemCom/GetImages'
import knowledgeTitle from '@/components/knowledgeTitle.vue'
import { reactive } from 'vue';

const viewObj = reactive({
    monitorWarning: 0,
    infringementWarning: 0,
    tmEncroachWarning: 0,
    brandProtectionWarning: 0,
    tmClearingPrompt: 0,
    ptClearingPrompt: 0,
})

</script>
<style scoped>
.KnowledgeWarning{
  width: 50%;
  height: 100%;
}
.zscqqqyj-box {
    height: 100%;
    width: 100%;
}

.zscqqqyj-box {
    padding: 0 0 20px 0;
    box-sizing: border-box;
}

.zscqqqyj-box-title {
    display: flex;
    align-items: center;
}

.zscqqqyj-box-title.background-image-box {
    background-size: 100% auto;
    background-position: bottom;
    padding-left: 4px;
}

.zscqqqyj-box-title {
    flex: 1;
    font-size: 18px;
    line-height: 2;
    padding-left: 10px;
    position: relative;
}

.zscqqqyj-content-box {
    gap: 7px;
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    height:  calc(100% - 40px);
    width: 100%;
}

.zscqqqyj-content-item {
    display: flex;
    align-items: center;
    padding: 10px 0 15px 21px;
    box-sizing: border-box;
    cursor: pointer;
    width: calc(50% - 10px);
    height:  calc(33% - 10px);
}

.zscqqqyj-content-item {
    background: #071b3c;
}

.zscqqqyj-content-item-icon {
    width: 32px;
    height: 32px;
}
.zscqqqyj-content-item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
}

.zscqqqyj-content-item-content div:nth-child(1) {
    font-weight: 700;
    font-size: var(--font18-size);
}

.zscqqqyj-content-item-content div:nth-child(2) {
    font-size: var(--small-font-size);
    margin-top: 3px;
}

.zscqqqyj-content-item-arrow {
    width: 24px;
    height: 24px;
}

.zscqqqyj-content-item-content .number-font {
    line-height: 31px;
    background-image: -webkit-linear-gradient(top, #FF4C00, #FFAA85);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

</style>