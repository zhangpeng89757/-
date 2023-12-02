<template>
    <div class="centercenter-box">
        <div class="centercenter-title" >
            <img :src="global.GetImages('c-t-l.png')">
            <div class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('Subtract.png') +')'}">
                {{  data[titleKey]  }}
            </div>
        </div>
        <div class="centercenter-content">
            <el-row style="flex: 1;" justify="space-around">
                <template v-for="item in data[dataKey]">
                    <el-col :span=" parseInt(22/data[dataKey].length)" class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('centerdatabox.png') +')'}">
                        <div class="centercenter-content-data number-font">
                            {{ item[dataItemDataValue].toLocaleString() }}
                        </div>
                        <div class="centercenter-content-title">
                            {{ item[dataItemTtileKey] }}
                        </div>
                    </el-col>
                </template>
            </el-row>
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
    }
})

</script>
<style scoped>
.centercenter-box { display: flex; flex-direction: column; align-items: flex-start;}
.centercenter-title { color: #FFFFFF;  display: flex; align-items: center; font-size: var(--medium-font-size); line-height: 1.5; margin: 4px 0; }
.centercenter-title img { width: var(--medium-font-size); height: var(--medium-font-size); }
.centercenter-title .background-image-box { padding-left: var(--medium-font-size); }
.centercenter-content { display: flex; align-items: center; width: 100%;}
.centercenter-content .background-image-box { padding: 4px 0; }
.centercenter-content-data { color: var(--mian-number-color); font-size: var(--default-font-size); font-weight: bold; text-align: center; line-height: 1.5;}
.centercenter-content-title { color: #FFFFFF;  text-align: center; font-size: var(--small-font-size); line-height: 1.5;}
</style>