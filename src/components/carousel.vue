<!--轮播组件-->
<template>
    <div class="carousel-box">
        <div class="carousel-box-title">{{ title }}</div>
        <el-carousel style="flex:1;overflow: hidden;" :interval="5000" arrow="always" indicator-position="none" height="100%">
            <el-carousel-item v-for="items in applicationServices.getServiceNewsData()" :key="items">
                <div class="carousel-item-content" v-for="item in items" :key="item">
                    <div class="carousel-item-img-box">
                        <el-image :src="global.getAssetsFile(item.imgPath)" fit="contain" />
                    </div>
                    <el-tooltip effect="light" :content="item.title">
                        <div class="carousel-item-title">
                            {{ item.content }}
                        </div>
                    </el-tooltip>
                    <div class="carousel-item-titme">{{ item.date }}</div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>
import { inject, reactive } from "vue"
import applicationServices from '@/api/applicationServices'
const global = inject('global');
/**定义父组件传参开始 */
const props = defineProps({
    title: { //显示标题文本
        type: String,
        default: () =>  ""
    }
})
/**定义父组件传参结束 */

</script>
<style scoped>
.carousel-box { display: flex; flex-direction: column; overflow: hidden; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 0.5), rgba(21, 20, 92, 0)); }
.carousel-box-title { 
    background-color: rgba(13, 48, 99, 0.5); box-sizing: border-box;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    font-size: var(--default-font-size);  
    line-height: 2; 
    margin-bottom: 10px;
}
.carousel-box-title::before { content: " ";  background-color: #12539D; display:block; font-size: var(--default-font-size);  line-height: 2; width: 10px; margin-right: 10px; }
.el-carousel__item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: baseline;
}
.el-carousel__item .carousel-item-content {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;
}
.el-carousel__item .carousel-item-content:first-child { margin:0 0.5rem 0 1rem; }

.el-carousel__item .carousel-item-content:last-child { margin:0 1rem 0 0.5rem; }
.carousel-item-img-box { display: block; flex: 1; overflow: hidden; }
.carousel-item-img-box .el-image { width: 100%; height: 100%; }
.carousel-item-title { color: #FFFFFF; font-size: var(--medium-font-size);  overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical; cursor: pointer; margin-top: 16px;}
.carousel-item-titme { color: #ffffff60; font-size: var(--small-font-size); margin-top: 14px;}

</style>
<style>
.carousel-box .el-carousel__arrow--left { left: 0; }
.carousel-box .el-carousel__arrow--right { right: 0; }
</style>
