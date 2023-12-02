<!--中间详情-->
<template>
    <div class="center-bottominfo-box">
        <div class="center-bottominfo-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
            <div class="center-bottominfo-item-title-box-title title-font">{{ components.com.title }}</div>
            <div v-if="components?.com?.data && !Array.isArray(components.com.data)">
                <template  v-for="(item,key,index) in components.com.data">
                    <div @click="changeData(item, index)" :class="['titlebar-piece-box', index == components.showDataIndex ? 'titlebar-piece-box-checked' : '']">
                        {{ key }}
                    </div>
                </template>
            </div>
        </div>
        <Scrolltable v-if="components?.com?.data && !Array.isArray(components.com.data)" :data="components.showData" :columns="components.showColumns"></Scrolltable>
        <Scrolltable v-else :data="components.com.data" :columns="components.com.columns"></Scrolltable>
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
    if(components?.com?.data && !Array.isArray(components.com.data)) {
        let firstKey = "";
        for(let item in components.com.data) {
            firstKey = item;
            break;
        }
        components.showColumns = components.com.data[firstKey].columns;
        components.showData = components.com.data[firstKey].data;
    }
}
let changeData = (item, index) => {
    components.showDataIndex = index;
    components.showColumns = item.columns;
    components.showData = item.data;
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
    padding: 16px;
    box-sizing: border-box;
}

.center-bottominfo-item-title-box { display: flex; color: #FFFFFF; margin-bottom: 10px;}
.center-bottominfo-item-title-box.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: 10px; }
.center-bottominfo-item-title-box .center-bottominfo-item-title-box-title {  font-size: var(--default-font-size);  line-height: 2; flex: 1; }

.titlebar-piece-box { 
    background-color: #142D72; display: inline-block; 
    font-size: var(--small-font-size);
    padding: 0 20px;
    box-sizing: border-box; 
    margin-left: 10px; 
    cursor: pointer; 
    border: 2px solid #25386b; 
    color: #2079A0; 
}
.titlebar-piece-box.titlebar-piece-box-checked { background-color: #142D72; border-color: #38549E; color: #A8FAFF; }
</style>