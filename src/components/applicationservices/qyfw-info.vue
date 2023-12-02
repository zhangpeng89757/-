<!--中间详情-->
<template>
    <div class="center-bottominfo-box">
        <div class="center-bottominfo-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
            <div class="center-bottominfo-item-title-box-title title-font">{{ components.com.title }}</div>
        </div>
        <Scrolltable :data="components.com.data" :columns="components.com.columns"></Scrolltable>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject } from 'vue'
import Scrolltable from '@/components/table/scrolltable.vue'
const global = inject('global');
const { proxy } = getCurrentInstance();
//组件对象
const components = reactive({
    showDataIndex: 0,
    com: {
        columns: [],
        data: null,
        title: ""
    },
    showData: [],
    showColumns: []
})
/**定义父组件传参开始 */
const props = defineProps({
    com: { //数据 { comname: '组件名称', data: '数据' }
        type: Object,
        default: null
    },
})
let resaveData = () => {
    components.showDataIndex = 0;
    components.com = {
        com: null,
        data: null,
        title: ""
    }
    Object.assign(components.com, props.com);
}
watch(()=>props, ()=>{
    proxy.$nextTick(() => {
        resaveData();
    })
},{
    deep:true,
    immediate: true
})
</script>
<style scoped>
.center-bottominfo-box {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
}

.center-bottominfo-item-title-box { display: flex; color: #FFFFFF; margin-bottom: 10px;}
.center-bottominfo-item-title-box.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: 10px; }
.center-bottominfo-item-title-box .center-bottominfo-item-title-box-title {  font-size: var(--default-font-size);  line-height: 2; }
</style>