<template>
    <div class="overalloverview-centertop-item-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('targetleft-b-item-bg.png') +')'}">
        <div class="centertop-item-title">{{ data[titleKey] }}<span style="font-size: 12px;" v-if="data.unit">（{{ data.unit }}）</span></div>
        <div class="centertop-item-content">
            <div class="centertop-content-l">
                <el-image :src="global.getAssetsFile(`qjgk/${data[iconPath]}`)" fit="contain" />
            </div>
            <div v-for="(item, index) in data[dataKey]" class="centertop-content-r">
                <div :class="['number-font', getColorClass(data[dataKey], index), `centertop-content-r${index}`]">{{ item?.[dataItemDataValue]?.toLocaleString() }}</div>
                <div>{{ item?.[dataItemTtileKey]?.toLocaleString() }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch, inject } from 'vue'
import { isArray } from 'xe-utils';
const global = inject('global');
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => new Array()
    },
    titleKey: { // 数据标题KEY
        type: String,
        default: () => null
    },
    dataKey: { // 显示数据KEY
        type: String,
        default: () => null
    },
    dataItemTtileKey: { //子数据标题KEY
        type: String,
        default: () => null
    },
    dataItemDataValue: { //子数据KEY
        type: String,
        default: () => null
    },
    iconPath: { //图标地址
        type: String,
        default: () => null
    },
})
let getColorClass = function(data, index) {
    if (!isArray(data) || index == 0) {
        return;   
    }
    if(index == 1 && data[0]?.[props.dataItemDataValue] > data[1]?.[props.dataItemDataValue]) {
        return 'overalloverview-smallmb';
    } else if(index == 2) {
        return data[2]?.[props.dataItemDataValue] < 100 ?  'overalloverview-smallmb' : ''; 
    }
}
</script>
<style scoped>
    .overalloverview-centertop-item-box { display: flex; flex-direction: column;}
    .centertop-item-title { color: #FFFFFF; display: flex; align-items: center; font-size: 14px; overflow: hidden; white-space:nowrap; line-height: 2; text-overflow: ellipsis; }
    .centertop-item-title::before { content: " "; width: 4px; height: 4px; display: block; background-color: #5FFFE2; margin-right: 2px;  }
    .centertop-item-content { display: flex; overflow: hidden; flex: 1; align-items: center;}
    .centertop-content-l {  overflow: hidden; float: left; display: flex; margin-right: 10px; width: 34px; height: 34px; }
    .centertop-content-r { float: left; text-align: center; flex: 1; }
    .centertop-content-r div:nth-child(1) { font-weight: bold; font-size: var(--font24-size);}
    .centertop-item-content .centertop-content-r div:nth-child(1){  color: #5FFFE2;}
    .centertop-item-content .centertop-content-r .overalloverview-smallmb { color: #FFC757 !important; }

    .centertop-item-content .centertop-content-r0{ color: #FFFFFF !important; }
    .centertop-item-content .centertop-content-r2::after { content: "%"; font-size: 20px; }
</style>