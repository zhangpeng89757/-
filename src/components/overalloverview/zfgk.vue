<template>
    <div class="zfgk-box" >
        <div class="zfgk-content-data  background-image-box number-font number-font" :class="[data[dataItemDataValue] == '暂无数据' ? 'zfgk-content-not-data' : '']" :style="{backgroundImage:'url('+ global.GetImages('zfbg.png') +')'}">
            {{ data[dataItemDataValue]?.toLocaleString() || 0 }}
        </div>
        <div class="zfgk-content-title">
            {{ data[dataItemTtileKey] }}
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
.zfgk-box { display: flex; flex-direction: column; align-items: center; overflow: hidden;}
.zfgk-box .background-image-box { 
    width: 80%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-origin: border-box;
    flex: 1;
    background-position: bottom;
    display: flex;
    align-items: center;
    justify-content: center;
}
.zfgk-content-data { color: var(--mian-number-color);  font-weight: bold; text-align: center; font-size: var(--font24-size); }
.zfgk-content-not-data { font-size: var(--medium-font-size); color: #c1c1c1; }
.zfgk-content-title { color: #FFFFFF;  text-align: center; font-size: var(--medium-font-size);}
</style>