<template>
    <div class="center145-box">
        <div class="center145-title">{{  data[titleKey]  }}</div>
        <div class="center145-content">
            <div class="center145-content-icon">
                <el-image style="width: 100%; height: 100%" :src="global.GetImages(data[iconPath])" fit="fill" >
                    <template #error><img /></template>
                </el-image>
            </div>
            <div style="flex: 1;">
                <el-row :gutter="20">
                    <template v-for="item in data[dataKey]">
                        <el-col :span="24/data[dataKey].length">
                            <div class="center145-content-data">
                                {{ item[dataItemDataValue].toLocaleString() }}
                            </div>
                            <div class="center145-content-title">
                                {{ item[dataItemTtileKey] }}
                            </div>
                        </el-col>
                    </template>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch, inject } from 'vue'
const global = inject('global');
const reg = /(?!^)(?=(\d{3})+$)/g;
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
<style scoped>
.center145-box { display: flex; flex-direction: column; align-items: flex-start; margin: 1rem 0 2rem; }
.center145-title::before { content: "●"; color: var(--mian-number-color); margin-right: 0.2rem;}
.center145-title { color: #FFFFFF; margin-bottom: 10px; width: 100%; overflow: hidden; white-space:nowrap;}
.center145-content { display: flex; align-items: center; width: 100%; height: 1.5vw;}
.center145-content-icon { width: 2vw; height: 2vw; }
.center145-content-data { color: #FFC757; font-size: 1.5rem; font-weight: bold; text-align: center;}
.center145-content-title { color: #FFFFFF; font-size: 0.5rem; text-align: center;}
</style>