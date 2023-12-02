<template>
    <div class="center-top-box">
        <div class="center-top-content number-font background-image-box" 
            :class="[data[dataKey] == '暂无数据' ? 'center-top-content-not-data' : '']"
            :style="{backgroundImage:'url('+ global.GetImages('zscqcxcg-bg.png') +')'}">{{ data[dataKey].toLocaleString() }}
        </div>
        <div class="center-top-title">{{ data[titleKey] }}</div>
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
})

</script>
<style scoped>
.center-top-box {  
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
 }
.center-top-title { 
    color: #fff;
    font-size: var(--default-font-size);
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: end;
    justify-content: center;
}
.center-top-content.background-image-box { background-size: 80% 80%; }
.center-top-content {  
    flex: 1;
    color: #5FFFE2;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    width: 100%;
    text-align: center;
    color: #FFC757;
    align-items: center;
    font-size: 32px; 
    background-repeat: no-repeat;
    background-origin: border-box;
    background-position: bottom;
    display: flex;
    justify-content: center;
    
}
.center-top-content-not-data {
    font-size: 18px; 
}
</style>