<template>
    <div class="center-bottom-box">
        <div class="center-bottom-content background-image-box" :style="{backgroundImage:'url('+ global.GetImages('lawenforcementprotection-bottom.png') +')'}">
            <div :class="[data[dataKey] == '暂无数据' ? 'center-bottom-content-not-data' : '']">{{ data[dataKey].toLocaleString() }}</div>
        </div>
        <div class="center-bottom-title">{{ data[titleKey] }}{{ data?.["unit"] ? `(${data?.["unit"]})` : `` }}</div>
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
.center-bottom-box { 
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden; 
}
.center-bottom-title { 
    color: #fff;
    font-size: var(--small-font-size);
    overflow: hidden;
    text-align: center;
    flex: 1;
    display: flex;
    align-items: end;
    justify-content: center;
    height: 30px;
    width: 100%;
    align-items: center;
}
.center-bottom-content { 
    flex: 2;
    color: #5FFFE2;
    font-weight: bold;
    width: 100%;
    text-align: center;
    font-size: var(--large-font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFC757;
}
.center-bottom-content.background-image-box {
    background-size: 80% 80%;
    background-repeat: no-repeat;
    background-origin: border-box;
    background-position: bottom;
}
.center-bottom-content-not-data {
    font-size: var(--medium-font-size);  align-items: center; font-weight: 500;
}
</style>