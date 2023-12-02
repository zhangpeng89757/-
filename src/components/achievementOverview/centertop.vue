<!--重大工作进展、领导关怀-->
<template>
    <div class="ao-center-top-box">
        <div class="ao-center-top-left">
            <div style="width: 24px; position: relative;" v-if="viewData.showScrollBtn">
                <div style="position: absolute; top: 0px;" @click="changeDisplay('up')">
                    <i class="oa-next-icon icon-up">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g opacity="0.8" clip-path="url(#clip0_10_19685)">
                                <path d="M9 -3.93402e-07C13.95 -1.77031e-07 18 4.05 18 9C18 13.95 13.95 18 9 18C4.05 18 -6.09774e-07 13.95 -3.93402e-07 9C-1.77031e-07 4.05 4.05 -6.09774e-07 9 -3.93402e-07ZM9 16.5937C13.194 16.5937 16.5937 13.194 16.5937 9C16.5937 4.80603 13.194 1.40625 9 1.40625C4.80603 1.40625 1.40625 4.80603 1.40625 9C1.40625 13.194 4.80603 16.5937 9 16.5937Z" fill="#1C6FAC"/>
                                <path d="M5.39554 7.32225L8.93789 10.8646L12.6047 7.1978C12.845 6.9575 13.2345 6.9575 13.4748 7.1978L13.5991 7.32208C13.8394 7.56237 13.8394 7.9519 13.5991 8.19219L9.49722 12.294L9.37294 12.4183C9.13265 12.6586 8.74312 12.6586 8.50283 12.4183L4.40097 8.31647C4.16068 8.07618 4.16068 7.68665 4.40097 7.44635L4.52525 7.32207C4.76572 7.08196 5.15525 7.08196 5.39554 7.32225Z" fill="#1C6FAC"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_10_19685">
                                    <rect width="18" height="18" fill="white" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 18 0)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </i>
                </div>
                <div style="position: absolute; bottom: 2px;" @click="changeDisplay('down')">
                    <i class="oa-next-icon icon-down">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g opacity="0.8" clip-path="url(#clip0_10_19685)">
                            <path d="M9 -3.93402e-07C13.95 -1.77031e-07 18 4.05 18 9C18 13.95 13.95 18 9 18C4.05 18 -6.09774e-07 13.95 -3.93402e-07 9C-1.77031e-07 4.05 4.05 -6.09774e-07 9 -3.93402e-07ZM9 16.5937C13.194 16.5937 16.5937 13.194 16.5937 9C16.5937 4.80603 13.194 1.40625 9 1.40625C4.80603 1.40625 1.40625 4.80603 1.40625 9C1.40625 13.194 4.80603 16.5937 9 16.5937Z" fill="#1C6FAC"/>
                            <path d="M5.39554 7.32225L8.93789 10.8646L12.6047 7.1978C12.845 6.9575 13.2345 6.9575 13.4748 7.1978L13.5991 7.32208C13.8394 7.56237 13.8394 7.9519 13.5991 8.19219L9.49722 12.294L9.37294 12.4183C9.13265 12.6586 8.74312 12.6586 8.50283 12.4183L4.40097 8.31647C4.16068 8.07618 4.16068 7.68665 4.40097 7.44635L4.52525 7.32207C4.76572 7.08196 5.15525 7.08196 5.39554 7.32225Z" fill="#1C6FAC"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_10_19685">
                                <rect width="18" height="18" fill="white" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 18 0)"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </i>
                </div>
            </div>
            <div class="ao-left-content" ref="aoCenterTopLeft">
                <template v-for="(item,index) in viewData.data">
                    <div class="ao-center-top-left-item" :id="'aoscroll${{index}}'" @click="playItem(index)">
                        <div class="oa-item-left-div">
                            <el-image :class="viewData.checkedIndex == index?'oa-check-img' : 'oa-uncheck-img'"  :src=" viewData.checkedIndex == index ? global.GetImages('oa-c-t-check.png') : global.GetImages('oa-c-t-uncheck.png')" fit="contain"/>
                            <div class="left-item-line" v-if="index < viewData.data.length - 1"></div>
                        </div>
                        <div :class="[viewData.checkedIndex == index ? 'ao-center-top-left-item-checked' : '', 'oa-item-right-div'] ">
                            <div>
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="ao-center-top-right" :style="{backgroundImage:'url('+ global.GetImages('oa-c-t-bg.png') +')'}">
            <img :src="viewData.showDetail.imgPath"/>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch, inject,getCurrentInstance, onMounted } from 'vue'
import * as API from '../../api/achievementOverview/index'
const global = inject('global');
const { proxy } = getCurrentInstance();
let viewData = reactive({
    data: [],
    displayIndexArr: [],
    displayAre: [0, 5],
    checkedIndex: 0,
    showDetail: {imgPath: "", content: ""},
    showScrollBtn: false,
})
let playItem = function(index) {
    viewData.checkedIndex = index;
    Object.assign(viewData.showDetail, viewData.data[index]);
    proxy.$refs.aoCenterTopLeft?.scrollTo({
        top: viewData.checkedIndex * 75,
        left: 0,
        behavior: "smooth"
    });
}
playItem(viewData.checkedIndex);
const scollHeight = 350;
let changeDisplay = function(type) {
    let nowScollTop = proxy.$refs.aoCenterTopLeft.scrollTop;
    //下滑
    if(type == "down") {
        proxy.$refs.aoCenterTopLeft.scrollTo({
            top: nowScollTop + scollHeight,
            left: 0,
            behavior: "smooth"
        });
    } else { //上滑
        proxy.$refs.aoCenterTopLeft.scrollTo({
            top: nowScollTop - scollHeight,
            left: 0,
            behavior: "smooth"
        });
    }
}
let initScollBtn = function(){
    //没有有滚动内容
    if(proxy.$refs.aoCenterTopLeft.scrollHeight == proxy.$refs.aoCenterTopLeft.offsetHeight) {
        viewData.showScrollBtn = false;
    } else {
        viewData.showScrollBtn = true;
    }
}
let interval = null;
let autoPlay = function() {
    if(interval != null) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        viewData.checkedIndex ++;
        if(viewData.checkedIndex > viewData.data.length - 1) {
            viewData.checkedIndex = 0;
        }
        playItem(viewData.checkedIndex);
    }, 5000)
}
let stopAutoPlay = function() {
    if(interval != null) {
        clearInterval(interval);
    }
}
let displayIndexArr = [];
onMounted(() => {
    API.getZhongdgzjzhldgh().then(res => {
        viewData.data = [];
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            let images = JSON.parse(element.images);
            element.imgPath = FileUrl + images?.[0]?.url;
            viewData.data.push(element)
            displayIndexArr.push(index)
        }
        playItem(0);
    });
    proxy.$nextTick(()=>{
        initScollBtn();
        //autoPlay();
    });
})
defineExpose({
    displayData: displayIndexArr,
    displayFun: playItem
})
</script>
<style scoped>
.ao-center-top-box {
    display: flex;
    overflow: hidden;
}
.ao-center-top-left {
    flex: 1;
    display: flex;
    margin-right: 10px;
}
.ao-left-content { flex: 1; overflow: hidden; overflow-y: auto; }
.ao-left-content::-webkit-scrollbar {
    width: 0;
    display: none !important;
}
.ao-center-top-right {
    width: 530px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
}
.ao-center-top-box .ao-center-top-right img { width: 520px ; height: 380px;}

.ao-center-top-left-item { display: flex; font-size: var(--medium-font-size); color: #cbcacacc; cursor: pointer;}

.ao-center-top-left-item .ao-center-top-left-item-checked {  font-size: var(--default-font-size); color:#ffffff;}
.ao-center-top-left-item .oa-item-left-div { width: 22px; position: relative; }

.ao-center-top-left-item .oa-item-left-div .el-image.oa-check-img { width: 18px; height: 18px; }
.ao-center-top-left-item .oa-item-left-div .el-image.oa-check-img { width: 22px; height: 22px; }

.ao-center-top-left-item .oa-item-left-div .left-item-line { width: 2px; height: calc(100% - 22px); background-color: #479CFF; left: 10px; top: 22px; position: absolute; }

.ao-center-top-left-item .oa-item-right-div { flex: 1; padding-left: 10px; height: 75px; overflow: hidden;
    
}
.ao-center-top-left-item .oa-item-right-div div{
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
	overflow: hidden;				
	text-overflow: ellipsis;		
	display: -webkit-box;			
	-webkit-line-clamp: 2;	
	line-clamp: 2;				
	-webkit-box-orient: vertical;	
}

.oa-next-icon { width: 18px; height: 18px; display: block; overflow: hidden; margin-top: 2px; cursor: pointer;}
.icon-up {  transform: rotate(180deg) }
</style>