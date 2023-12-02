<template>
    <div class="right-range-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('centerdatabox.png') +')'}">
        <div class="right-range-content-data number-font">
            {{ data[dataKey]?.toLocaleString() }}
        </div>
        <div class="right-range-content-title">
            {{  data[titleKey] }}
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
    }
})

</script>
<style scoped>
.right-range-box { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
    height: 43px;
    box-sizing: border-box;
 }
.right-range-content-data { 
    color: #5FFFE2;
    font-size: var(--font18-size);
    font-weight: 700;
}
.right-range-content-title { 
    color: #fff;
    font-size: var(--small-font-size);
}
</style>