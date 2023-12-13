<!--轮播组件-->
<template>
    <div class="targetcarousel-box">
        <el-icon @click="()=> {viewData.showPage=false;}" style="cursor: pointer;position: absolute; top: 38px; right: 0;"  v-if="viewData.showPage" :size="20"><Close /></el-icon>
        <div class="targetcarousel-box-title">{{ title }}</div>
        <div class="targetcarousel-content">
            <Vue3SeamlessScroll class="seamless-warp scroll" :class="['loadScroll']" :limitScrollNum="4" :list="viewData.data" :hover="true" :step="0.3" :style="{height: '100%'}">
                <div class="targetcarousel-item-content" v-for="item in viewData.data" :key="item" @click="displayPage(item)">
                    <div class="targetcarousel-item-img-box">
                        <el-image :src="item.imgPath" fit="contain" />
                    </div>
                    <el-tooltip effect="light" :content="item.title">
                        <div class="targetcarousel-item-title">
                            {{ item.title }}
                        </div>
                    </el-tooltip>
                    <div style="display: flex;">
                        <div class="targetcarousel-item-org">{{item.deptName}}</div>
                        <div class="targetcarousel-item-titme">{{ item.createTime }}</div>
                    </div>
                </div>
            </Vue3SeamlessScroll>
            <div v-if="viewData.showPage" class="targetcarousel-page">
                <div v-html="viewData.showUrl"></div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import { inject, reactive,onMounted } from "vue"
import * as HTTPAPI from './../../api/targetManage/api'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const global = inject('global');
/**定义父组件传参开始 */
const props = defineProps({
    title: { //显示标题文本
        type: String,
        default: () =>  ""
    }
})
const viewData = reactive({
    showPage: false,
    showUrl: "",
    data: []
})
let displayPage = (item) => {
    viewData.showUrl = item.content;
    viewData.showPage = true;
}
onMounted(()=>{
    HTTPAPI.megaDynamicList().then(res => {
        viewData.data = [];
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            let images = JSON.parse(element.tup);
            let imgArr = [];
            if(images != null) {
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    imgArr.push(FileUrl + img.url)
                }
            }
            element.imgPath = imgArr[0];
            viewData.data.push(element)
        }
    })
    
})
</script>
<style scoped>
//.seamless-warp {
//    height: 100%;
//    overflow: hidden;
//}
.scroll { overflow: hidden; flex: 1; }
.targetcarousel-box { position: relative; display: flex; flex-direction: column; overflow: hidden; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 0.5), rgba(21, 20, 92, 0)); }
.targetcarousel-box-title { 
    background-color: rgba(13, 48, 99, 0.5); box-sizing: border-box;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    font-size: var(--default-font-size);  
    line-height: 2; 
    margin-bottom: 10px;
}

.targetcarousel-box-title::before { content: " ";  background-color: #12539D; display:block; font-size: var(--default-font-size);  line-height: 2; width: 10px; margin-right: 10px; }
.targetcarousel-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; margin-top: 20px; position: relative;}
.targetcarousel-item-content { display: flex; flex-direction: column; margin-bottom: 15px; }
.targetcarousel-item-img-box { display: block; flex: 1; width: 100%; height: 190px; overflow: hidden; }
.targetcarousel-item-img-box .el-image { width: 100%; height:190px; }
.targetcarousel-item-title { color: #FFFFFF; font-size: var(--medium-font-size);  overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical; cursor: pointer; margin-top: 16px;}
.targetcarousel-item-titme { color: #ffffff60; font-size: var(--small-font-size); margin-top: 10px;}
.targetcarousel-item-org { color: #fff; font-size: var(--small-font-size); margin-top: 10px; flex: 1;}

.targetcarousel-page { font-size: 14px; font-weight: 500; width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 20; overflow-y: auto; background-color: rgba(5, 5, 76, 0.94); }
</style>
