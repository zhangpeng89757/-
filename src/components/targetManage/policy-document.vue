<!--政策文件-->
<template>
    <div class="policy-document-box">
        <div class="policy-document-changebtnbox">
            <button v-if="viewData.showChangeBtn" type="button" @click.stop="prevEl"
                class="el-carousel__arrow el-carousel__arrow--left swiper-button-prev" style="position: relative;">
                <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path>
                </svg></i>
            </button>
        </div>
        <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
            <div class="policy-document-title-box">
                <template v-for="(item,index) in viewData.displayArray">
                    <div class="policy-document-title-item" @click.stop="displayBig(item, index)" :class="viewData.displayItem == item ? 'policy-document-title-item-check':''">
                        {{ item.name }}
                    </div>
                </template>
            </div>
            <div style="flex: 1; display: flex; overflow: hidden; margin: 20px 0;">
                <template v-if="viewData.fileData.length > 0">
                    <Swiper style="flex: 1;" @slideChange="slideChange" ref="policySwiper" :slides-per-view="viewData.displayNumber" :loop="true" :navigation="navigation" :modules="modules" :spaceBetween="60" :activeIndex="viewData.displayIndex">
                        <SwiperSlide v-for="(item,index) in viewData.fileData" class="policy-document-item" :class="viewData.displayItem == item ? 'swiper-slide-active-big' : '' " @click.stop="displayBig(item, index, true)">
                            <img :src="item.imagePath" :style="{objectFit: 'contain', width:' 100%', height: '100%' }">
                        </SwiperSlide>
                    </Swiper>
                </template>
                <template v-else>
                    <div style="display: flex; justify-content: center; align-items: center; min-height: 150px;flex-direction: column;width: 100%;">
                        <div style="display: flex; flex-direction: column; color: #b5b3b3; justify-content: center; align-items: center; min-height: 150px;">
                            <el-image style="height: 30px; margin: 10px 0" :src="global.GetImages('nodata.png')" fit="contain"/>暂无数据</div>
                    </div>
                </template>
            </div>
        </div>
        <div class="policy-document-changebtnbox">
            <button v-if="viewData.showChangeBtn" type="button" @click.stop="nextEl" class="el-carousel__arrow el-carousel__arrow--right swiper-button-next" style="position: relative;"><i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg></i></button>
        </div>
        <div class="policy-document-pdf-box" v-if="viewData.showPdf">
            <div class="policy-document-pdf-content">
                <iframe ref="pdfWrapper" allowTransparency="true" style="flex: 1;border: 0; margin: 0 10px 10px;" :src="'static/pdf/web/viewer.html?file=' + viewData.displayItem.filePath"></iframe>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, watch, inject,getCurrentInstance, onMounted,ref, computed, toRefs, onUnmounted } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation } from 'swiper/modules';
    import * as API from '../../api/targetManage/api'
    import 'swiper/css';
    /**定义父组件传参开始 */
    const props = defineProps({
        type: { //数据类型 PolicyZhiscqghmb： 政策文件-知识产权规划目标,PolicyHexyqxzb：政策文件-核心预期性指标
            type: String,
            default: 'PolicyZhiscqghmb'
        }
    })
    const global = inject('global');
    const { proxy } = getCurrentInstance();
    const policySwiper = ref(null);
    const pdfWrapper = ref(null);
    const viewData = reactive({
        showChangeBtn: true,
        showPdf: false,
        displayIndex: 0,
        realIndex: 0,
        pdfPageNumber: 0,
        activePage: 0,
        displayItem: { },
        displayArray: [],
        displayNumber: 5, //显示数量
        isPlayBigImg: false,
        pdfInfo: {
            numPages: 0
        },
        fileData: []
    });
    const navigation = ref({
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    });
    // 在modules加入要使用的模块
    const modules = [Navigation]
    // 在modules加入要使用的模块
    const prevEl = (item) => {
    };
    const nextEl = (item) => {
    };
    const displayBig = (item, index, t) => {
        viewData.displayItem = item;
        viewData.displayIndex = index;
        if(t != null) viewData.showPdf = true;
    }
    const slideChange = (swiper) => {
        viewData.realIndex = swiper.realIndex;
        viewData.displayArray = [];
        if (viewData.realIndex + viewData.displayNumber < viewData.fileData.length) {
            for (let index = viewData.realIndex; index < viewData.displayNumber + viewData.realIndex; index++) {
                viewData.displayArray.push(viewData.fileData[index]);
            }
        } else {
            for (let index = viewData.realIndex; index < viewData.fileData.length; index++) {
                viewData.displayArray.push(viewData.fileData[index]);
            }
            for (let index = 0; index < viewData.displayNumber - (viewData.fileData.length - viewData.realIndex); index++) {
                viewData.displayArray.push(viewData.fileData[index]);
            }
        }
    }
    
    const closePdf = () => {
        viewData.showPdf = false;
    }
    window.addEventListener('message',closePdf);
    onUnmounted(()=>{
        window.removeEventListener('message', closePdf);
    })
    let getData = () => {
        if(props.type == "PolicyZhiscqghmb") {
            viewData.fileData = [];
            
            API.megaPolicyList("zhiscqghmb").then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                    var flies = JSON.parse(element.zhengcwjfj);
                    if(viewData.fileData.filter(el => el.id == element.id).length == 0) {
                        viewData.fileData.push({
                            id: element.id,
                            imagePath: '/static/images/pdf.png',
                            name: element.name,
                            filePath: FileUrl + encodeURIComponent(flies?.[0]?.url)
                        })
                    }
                }
                if(res.data.length < 5) { viewData.displayNumber = res.data.length; viewData.showChangeBtn = false; } else { viewData.displayNumber = 5; viewData.showChangeBtn = true;}
                slideChange({ realIndex: 0})
            })
        } else {
            API.megaPolicyList("hexyqxzb").then(res => {
                viewData.fileData = [];
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                    var flies = JSON.parse(element.zhengcwjfj);
                    if(viewData.fileData.filter(el => el.id == element.id).length == 0) {
                        viewData.fileData.push({
                            id: element.id,
                            imagePath: '/static/images/pdf.png',
                            name: element.name,
                            filePath: FileUrl + encodeURIComponent(flies?.[0]?.url)
                        })
                    }
                }
                if(res.data.length < 5) { viewData.displayNumber = res.data.length; viewData.showChangeBtn = false; } else { viewData.displayNumber = 5; viewData.showChangeBtn = true;}
                slideChange({ realIndex: 0})
            })
        }
    }
    watch(()=>props, ()=>{
        getData();
    },{
        deep:true,
        immediate: true
    })
    onMounted(()=>{
        getData()
    });
</script>
<style scoped>
    .policy-document-box {
        display: flex; overflow: hidden; position: relative;
    }
    .policy-document-title-box {
        display: flex;
        overflow: hidden;
    }
    .policy-document-changebtnbox { margin: 0 10px; }
    .policy-document-title-item {
        color: #447CA6;
        font-size: var(--medium-font-size);
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 4px 12px;
        background-color: #17387D;
        border: 1px solid #17387D;
        cursor: pointer;
        float: left;
        margin-right: 10px;
        height: 30px;
        box-sizing: border-box;
        max-width: 50%;
        overflow: hidden;
        word-break: keep-all;
        min-width: 100px;
        text-overflow: ellipsis;
    }
    .policy-document-title-item-check {
        color: #1FC6FF;
        border: 1px solid #1FC6FF;
    }
    .policy-document-item { padding: 12px;box-sizing: border-box; background-image: linear-gradient(180deg, rgba(164, 228, 250, 0.18) 23.49%, rgba(140, 226, 255, 0.38) 105.65%); cursor: pointer; transform: scale(0.9); min-width: 240px; max-width: 240px;}
    .policy-document-item.swiper-slide-active-big {  background-image: linear-gradient(180deg, rgba(31, 198, 255, 0.18) 23.49%, rgba(52, 204, 255, 0.38) 105.65%);  transform: scale(1);}
    .policy-document-pdf-box { display: flex; position: absolute; width: 100%; height: 100%; overflow: hidden; z-index: 20; background-color: rgba(5, 5, 76, 0.94);}
    .policy-document-pdf-content { display: flex; flex: 1; flex-direction: column; overflow: hidden;}
    .left-box {
        width: 80%;
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        position: relative;
        overflow-y: auto;
        
    }
</style>