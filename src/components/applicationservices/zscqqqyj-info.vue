<!--中间详情-->
<template>
    <div class="center-bottominfo-box">
        <div class="center-bottominfo-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('blue-dot.png') +')'}">
            <div class="center-bottominfo-item-title-box-title title-font">
                <div> {{ components.com.title }} </div>
                <div v-if="components.com.title === '重点品牌监测预警'" class="type-btns">
                    <div :class="{'active': searchKey === '爱达乐'}" @click="handleClickType('爱达乐')" :style="{backgroundImage:'url('+ GetPublicSource(`zdppjcyj_bg${searchKey === '爱达乐'?'_active':''}.png`) +')'}">爱达乐</div>
                    <div :class="{'active': searchKey === '洋洋'}" @click="handleClickType('洋洋')" :style="{backgroundImage:'url('+ GetPublicSource(`zdppjcyj_bg${searchKey === '洋洋'?'_active':''}.png`) +')'}">洋洋百货</div>
                </div>
            </div>
            <el-tooltip v-if="components.com.notice" placement="left" effect="light" :content="components.com.notice">
                <div style="font-size: 0.8rem; display: flex; align-items: center; cursor: pointer; margin-left: 10px">
                    <el-icon size="1rem">
                        <QuestionFilled />
                    </el-icon>
                </div>
            </el-tooltip>
            <a v-if="components.com.linkUrl" style="font-size:14px;" target="_blank" :href="components.com.linkUrl">查看更多&nbsp;></a>
        </div>
        <Scrolltable :data="components.com.data" :columns="components.com.columns" :height="180" :switchTitle="components.com.title"></Scrolltable>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject } from 'vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import { GetPublicSource } from './../../SystemCom/GetImages'
const global = inject('global');
const { proxy } = getCurrentInstance();

//组件对象
const components = reactive({
    showDataIndex: 0,
    com: {
        columns: [],
        data: null,
        title: "",
        linkUrl: ""
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
    searchKey: {
        type: String,
        default: ''
    },
})

let resaveData = () => {
    components.showDataIndex = 0;
    components.com = {
        com: null,
        data: null,
        title: "",
        linkUrl: ""
    }
    Object.assign(components.com, props.com);
}
const handleClickType = (searchKey) => {
    proxy.$emit('getSearchKey', searchKey)
}
watch(()=>props, ()=>{
    proxy.$nextTick(() => {
        resaveData();
    })
},{
    deep:true,
    immediate: true
})


defineExpose({
    displayData: [ '爱达乐', '洋洋' ],
    displayFun: handleClickType
})
</script>
<style scoped>
.center-bottominfo-box {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* padding: 10px; */
    margin-top: 20px;
    box-sizing: border-box;
}

.center-bottominfo-item-title-box { display: flex; justify-content: space-between; align-items: center; color: #FFFFFF; margin-bottom: 20px; padding-left: 26px;}
.center-bottominfo-item-title-box.background-image-box { 
    background-size: 16px;
    background-position-y: 3px;
    height: 24px;
    line-height: 24px;
}
.center-bottominfo-item-title-box .center-bottominfo-item-title-box-title {
    font-size: var(--default-font-size);
    display: flex;
    align-items: flex-end;
    /* justify-content: space-between; */
    line-height: 20px;
}

.type-btns{ display: inline-block; }
.type-btns div{
    display: inline-block;
    width: 60px;
    height: 20px;
    cursor: pointer;
    line-height: 20px;
    margin-left: 10px;
    background-position: top;
    color: var(--text-ffffff-75, rgba(255, 255, 255, 0.75));
    text-align: center;
    font-size: var(--small-font-size);
    font-weight: 400;
}
.type-btns div.active{  }
</style>