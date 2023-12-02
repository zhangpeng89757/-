<template>
    <div class="overalloverview-centertop-item-box">
        <div class="centertop-item-title">{{ data[titleKey] }}</div>
        <div class="centertop-item-content">
            <div  class="centertop-content-l">
                <el-image :src="global.getAssetsFile(`qjgk/${data[iconPath]}`)" fit="contain" />
            </div>
            <div v-for="item in data[dataKey]" class="centertop-content-r">
                <div class="number-font">{{ item?.[dataItemDataValue]?.toLocaleString() }}</div>
                <div>{{ item?.[dataItemTtileKey]?.toLocaleString() }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch, inject } from 'vue'
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

</script>
<style>
    .overalloverview-centertop-item-box { display: block; margin-right: 4px; }
    .centertop-item-title { color: #FFFFFF; display: flex; align-items: center; font-size: var(--medium-font-size); overflow: hidden; white-space:nowrap; line-height: 3; text-overflow: ellipsis; }
    .centertop-item-title::before { content: " "; width: 4px; height: 4px; display: block; background-color: #5FFFE2; margin-right: 2px;  }
    .centertop-item-content { display: flex; overflow: hidden;}
    .centertop-content-l {  overflow: hidden; float: left; display: flex; margin-right: 10px; width: 34px; height: 34px; }
    .centertop-content-r { overflow: hidden; float: left; flex: 1; text-align: left;}

    .centertop-content-r div:nth-child(1) { color: #FFC757; font-weight: bold; font-size: var(--large-font-size);}
    .centertop-content-r div:nth-child(2) { color: #fff; }
</style>