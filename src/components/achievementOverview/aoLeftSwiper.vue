<template>
    <div class="ao-left-swiper-box" @mouseleave="autoPlay" @mouseenter="stopAutoPlay">
        <div @mouseleave="autoPlay" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; margin-top: 10px;">
            <div style="flex: 1; display: flex; overflow: hidden;">
                <button v-if="viewData.showChangeBtn" type="button"
                    class="el-carousel__arrow el-carousel__arrow--left swiper-button-prev" style="position: relative;">
                    <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path>
                    </svg></i>
                </button>
                <Swiper 
                    @swiper="onSwiper"
                    ref="aoCBSwiper"
                    :autoplay="{ delay: 200000, pauseOnMouseEnter: true }" 
                    :centeredSlides="true" 
                    :slidesPerGroup="1" 
                    :slidesPerView="1" 
                    :loop="true" 
                    :navigation="navigation" 
                    :modules="modules" 
                    :loopAdditionalSlides="viewData.imageData.length"
                    style="flex: 1;margin: 0 10px;" >
                    <SwiperSlide v-for="(item,index) in viewData.imageData" style="display: flex; flex-direction: column;" @click="showInfoContent(item)">
                        <div class="ao-left-swiper-content-item">
                            <div class="ao-left-swiper-content-item-title">
                                <div>{{  index + 1 }}</div>
                                <div>{{ item.title }}</div>
                            </div>
                            <div class="ao-left-swiper-content-item-content">
                                {{ item.content?.substr(0, 100) }}...<span style="margin-left: 10px;color: #4ACBF3;">查看更多</span>
                            </div>
                            <div class="ao-left-swiper-content-item-images">
                                <template v-for="(img,index) in item.images">
                                    <div class="ao-left-swiper-content-item-image" v-if="index < 2" :style="{backgroundImage:'url('+ global.GetImages('lawenforcementprotection-img-bg.png') +')'}">
                                        <el-image style="width: 180px; height: 90px; margin: 2px auto;" :src="img" fit="contain"/>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div class="policy-document-changebtnbox">
                    <button  v-if="viewData.showChangeBtn" type="button" class="el-carousel__arrow el-carousel__arrow--right swiper-button-next" style="position: relative;"><i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg></i></button>
                </div>
            </div>
        </div>
        <div class="ao-left-swiper-content-info-box" v-if="viewData.showInfo">
            <div v-if="viewData.showInfo" style="text-align: right;margin:0 4px;"><el-icon @click="viewData.showInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <div class="ao-left-swiper-content-info-body">
                <div class="ao-left-swiper-content-info-body-title">{{ viewData.showData.detailTile }}</div>
                <div class="ao-left-swiper-content-info-body-content" v-html="viewData.showData.detailContent"></div>
                <div class="ao-left-swiper-content-info-body--images">
                    <template v-for="(img,index) in viewData.showData.images">
                        <div class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('lawenforcementprotection-img-bg.png') +')', padding: '12px', marginBottom: '10px'}">
                            <el-image style="width: 100%; margin-bottom: 4px;" :src="img" fit="contain"/>
                        </div>
                    </template>
                </div>
                <div class="ao-left-swiper-content-info-body-content" style="text-align: right;">{{ viewData.showData.updateTime }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, watch, inject,getCurrentInstance, onMounted,ref } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Autoplay } from 'swiper/modules';
    import 'swiper/css';
    const global = inject('global');
    const { proxy } = getCurrentInstance();
    /**定义父组件传参开始 */
    const props = defineProps({
        data: { //数据
            type: Object,
            default: () => new Array()
        }
    })
    let viewData = reactive({
        showInfo: false,
        showData: {},
        arrow: "always",
        displayIndex: 1,
        showChangeBtn: true,
        imageData: [],
        content: "",
    });
    const navigation = ref({
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    });
    // 在modules加入要使用的模块
    const modules = [Navigation, Autoplay]
    const swiperInstance = ref(null)
    function onSwiper(swiper) {
        swiperInstance.value = swiper
    }
    let showInfoContent = (data) => {
        viewData.showInfo = true;
        viewData.showData = data;
    }
    let autoPlay = () => {
        swiperInstance?.value?.autoplay.start()
    }
    watch(()=>props, ()=>{
        viewData.imageData = props.data
    },{
        deep:true,
        immediate: true
    })
    onMounted(()=>{
        
    })
</script>
<style scoped>
    .ao-left-swiper-box { flex: 1; display: flex; flex-direction: column; position: relative; overflow: hidden;}

    .ao-left-swiper-content-item { display: flex; flex-direction: column; cursor: pointer; }
    .ao-left-swiper-content-item-title { display: flex; align-items: center; font-size: var(--default-font-size);}
    .ao-left-swiper-content-item-title div:nth-child(1) { width: 22px; height: 22px; border-radius: 22px; color: #fff; background-color: #FFB013; text-align: center; line-height: 22px; margin-right: 10px;}
    .ao-left-swiper-content-item-title div:nth-child(2) { 
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .ao-left-swiper-content-item-content { 
        margin: 10px 0; 
        max-lines: 4; 
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        line-height: 1.7;
        text-indent:2em;
        font-size: var(--medium-font-size);
    }
    .ao-left-swiper-content-item-images { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px;  align-items:center; }
    .ao-left-swiper-content-item-image {
        margin: 10px 0;
        padding: 4px 0;
        height: 94px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
    }
    .ao-left-swiper-content-info-box { position: absolute; top: 0; left: 0;  height: 100%; width: 100%; box-sizing: border-box; z-index: 120;  background: rgba(5, 5, 76, 0.94); display: flex; overflow: hidden; flex-direction: column;}
    .ao-left-swiper-content-info-body { margin: 0 10px 20px 20px; overflow-y: auto;}

    .ao-left-swiper-content-info-body-title { font-size: var(--default-font-size); margin-bottom: 20px; }
    .ao-left-swiper-content-info-body-content { font-size: var(--medium-font-size); margin-bottom: 20px; line-height: 1.7;}
    .ao-left-swiper-content-info-body--images { display: grid; grid-template-columns: repeat(1,1fr); }

    .ao-left-swiper-content-info-box { position: absolute; top: 0; left: 0;  height: 100%; width: 100%; box-sizing: border-box; z-index: 120;  background: rgba(5, 5, 76, 0.94); display: flex; overflow: hidden; flex-direction: column; }

    .ao-left-swiper-content-info-body { margin: 0 10px 20px 20px; overflow-y: auto;}
    .ao-left-swiper-content-info-body-title { font-size: var(--default-font-size); margin-bottom: 20px; }
    .ao-left-swiper-content-info-body-content { font-size: var(--medium-font-size); margin-bottom: 20px; line-height: 1.7;}
    .ao-left-swiper-content-info-body--images { display: grid; grid-template-columns: repeat(1,1fr); }
</style>