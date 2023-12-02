<template>
     <div class="ao-centerbottom-box" @mouseleave="autoPlay" @mouseenter="stopAutoPlay">
        <div class="ao-centerbottom-content-top" :class=" viewData.showTopText ? 'ao-centerbottom-content-top-showall' : ''">
            <div v-if="viewData.showTopText" style="text-align: right;"><el-icon @click="hideTopText" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <div ref="topTextContent" @click="displayText" :class="['ao-centerbottom-content', viewData.showTopText ? 'ao-centerbottom-content-showall' : '']" v-html="viewData.content">
            </div>
            <div v-if="!viewData.showTopText" @click="displayText" style="cursor: pointer; position: absolute; right: 0; bottom: 0;width: 29px; background-color: #050457; text-align: center;">
                <el-icon size="20"><ArrowDown /></el-icon>
            </div>
        </div>
        <div @mouseleave="autoPlay" :class="viewData.isPlayBigImg ? 'ao-centerbottom-bottom-big' : ''" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 20px;">
            <div v-if="viewData.isPlayBigImg" style="text-align: right;"><el-icon @click="()=> { viewData.isPlayBigImg=false; }" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <div style="flex: 1; display: flex; overflow: hidden; position: relative; align-items: center;">
                <div class="policy-document-changebtnbox">
                    <button @click.stop="slidePrev" v-if="viewData.showChangeBtn" type="button" :class="leftBtn" class="el-carousel__arrow el-carousel__arrow--left center-bottom-swiper-button-prev" style="position: relative;">
                        <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path>
                        </svg></i>
                    </button>
                </div>
                <Swiper 
                    v-if="viewData.loaded"
                    @swiper="onSwiper"
                    ref="swiperControl"
                    :autoplay="{ delay: 2000, pauseOnMouseEnter: true }" 
                    :centeredSlides="viewData.isPlayBigImg" 
                    :slidesPerGroup="1" 
                    :slidesPerView="viewData.isPlayBigImg ? 3 : 4" 
                    :loop="true" 
                    :key="SwiperKey"
                    :observer="false"
                    :observeParents="true"
                    :navigation="navigation" 
                    :modules="modules" 
                    :loopAdditionalSlides="viewData.imageData.length"
                    :spaceBetween="viewData.isPlayBigImg ? 20 : 20"
                    style="flex: 1; margin: 0 10px;">
                    <SwiperSlide v-for="(item,index) in viewData.imageData" :class="viewData.isPlayBigImg ? 'centerbottom-bigImg' : ''" style="display: flex; flex-direction: column;" @click="playBigImg(index)">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <img :src="item.imgPath">
                        </div>
                        <div v-if="!viewData.isPlayBigImg" style="font-size: 14px; margin-top: 10px; text-align: center; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; ">{{ item.title }}</div>
                    </SwiperSlide>
                </Swiper>
                <div class="policy-document-changebtnbox">
                    <button @click.stop="slideNext" v-if="viewData.showChangeBtn" type="button" :class="rightBtn"  class="el-carousel__arrow el-carousel__arrow--right center-bottom-swiper-button-next" style="position: relative;"><i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, watch, inject,getCurrentInstance, onMounted,ref, onUnmounted } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Autoplay } from 'swiper/modules';
    import * as API from '../../api/achievementOverview/index'
    import 'swiper/css';
    const global = inject('global');
    const { proxy } = getCurrentInstance();
    let viewData = reactive({
        arrow: "always",
        showTopText: false, //是否完全显示头部文字
        displayIndex: 0,
        displayOldIndex: 0,
        displayWidth: 0,
        showChangeBtn: true,
        isPlayBigImg: false,
        imageData: [],
        content: "",
        loaded: false
    });
    const leftBtn = ".center-bottom-swiper-button-next";    
    const rightBtn = ".center-bottom-swiper-button-prev";
    const topTextContent = ref(null);
    const navigation = ref({
        nextEl: leftBtn,
        prevEl: rightBtn,
    });
    // 在modules加入要使用的模块
    const modules = [Autoplay]
    //完全显示文字
    let displayText = function() {
        if (!viewData.showTopText) {
            viewData.showTopText = true;
        }
    } 
    //隐藏文字
    let hideTopText = () => {
        topTextContent.value.scrollTop = 0;
        viewData.showTopText=false;
    }
    const swiperInstance = ref(null)
    function onSwiper(swiper) {
        swiperInstance.value = swiper;
    }
    let playBigImg = function(index) {
        viewData.displayIndex = index;
        viewData.isPlayBigImg = true;
        swiperInstance?.value?.slideToLoop(index, 1000, null);
    }
    let autoPlay = () => {
        //swiperInstance?.value?.autoplay.start()
    }
    const slidePrev = () => {
        swiperInstance.value.slidePrev();
    }
    const slideNext = () => {
        swiperInstance.value.slideNext();
    }
    onMounted(()=>{
        API.getJinyqzscqqkjj().then(res => {
            let data = res.data?.[0];
            if(data) {
                viewData.content = data.remark
            }
        })
        API.getJinyqzscqqkjjImages().then(res => {
            viewData.imageData = [];
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                let images = JSON.parse(element.images);
                element.imgPath = FileUrl + images?.[0]?.url;
                viewData.imageData.push(element);
            }
            viewData.imageData = viewData.imageData.concat(viewData.imageData);
            proxy.$nextTick(()=>{
            }).then(()=>{
                viewData.loaded = true;
            })
        })
    })
    onUnmounted(()=> {
        swiperInstance.value.destroy();
    })
</script>
<style scoped>
    .ao-centerbottom-box { flex: 1;  position: relative; }
    .ao-centerbottom-content-top { font-size: 16px; position: relative; }
    .ao-centerbottom-content-top-showall { position: absolute; left: 0; top: 0; background: rgba(5, 5, 76, 0.94); z-index: 20; width: 100%; height: 100%; display: flex; flex-direction: column; }
    .ao-centerbottom-content { 
        line-height: 20px; height: 80px; overflow: hidden; text-overflow: ellipsis; word-break: keep-all; 
        word-wrap: break-word;
        word-break: break-all;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;line-height: 1.7;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space:pre-wrap;
    }
    .ao-centerbottom-content.ao-centerbottom-content-showall { 
        flex: 1;
        line-height: 28px; 
        letter-spacing: 0.32px;  
        overflow-y: auto; 
        -webkit-line-clamp:unset;
        line-clamp: unset;
        text-overflow: unset; 
        -webkit-box-orient:unset;
        word-break: break-all; 
        word-wrap: break-word;
    }
    .ao-centerbottom-box img { width: 170px; height: 120px; }
    .ao-centerbottom-box .ao-centerbottom-bottom-big { position: absolute; left: 0; top: 0;  background: rgba(5, 5, 76, 0.94); z-index: 20; width: 100%; height: 100%; margin: 0 !important; }
    .ao-centerbottom-box .centerbottom-bigImg.swiper-slide-prev, 
    .ao-centerbottom-box .centerbottom-bigImg.swiper-slide-next{ width: 200px !important; height: 280px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;; }
    .ao-centerbottom-box .centerbottom-bigImg.swiper-slide-active { width: 330px !important;  display: flex; align-items: center; justify-content: center; }

    .ao-centerbottom-box .centerbottom-bigImg.swiper-slide-active img{ width: 330px; height: 240px; }
</style>