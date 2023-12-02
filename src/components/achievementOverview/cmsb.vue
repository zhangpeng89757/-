<!--驰名商标-->
<template>
    <div class="cmsb-box">
        <el-carousel style="flex:1;overflow: hidden;" :interval="5000" :arrow="viewData.arrow" indicator-position="none" height="100%">
            <el-carousel-item v-for="items in viewData.data" :key="items">
                <div class="carousel-item-content" v-for="item in items" :key="item">
                    <div class="carousel-item-img-box" @click="playDetail(item)" :style="{backgroundImage:'url('+ global.GetImages('cmsb-img-bg.png') +')'}">
                        <el-image :src="item.imgPath" />
                    </div>
                    <div class="carousel-item-name">{{ item.name }}</div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="cmsb-detail-box" v-if="viewData.showDetail.show">
            <div class="cmsb-detail-head">
                <div class="cmsb-detail-title">
                    <div class="cmsb-detail-icon" :style="{backgroundImage:'url('+ global.GetImages('cmsb-img-bg.png') +')'}">
                        <el-image :src="viewData.showDetail.showData.imgPath" />
                    </div>
                    <div style="display: flex;height: 100%;align-items: end; word-wrap: break-word; word-break: break-all; font-size: 18px; margin-left: 10px;">
                       {{viewData.showDetail.showData.ti}}
                    </div>
                </div>
                <el-icon @click="()=> { viewData.showDetail.show = false }" style="cursor: pointer;" :size="20"><Close /></el-icon>
            </div>
            <div class="cmsb-detail-content">
                <div style="display: grid; grid-template-columns:repeat(2, 1fr);">
                    <div>商标名称：{{ viewData.showDetail.showData.ti }}</div> <div>商标号码：{{ viewData.showDetail.showData.an }}</div>
                </div>
                <div>申请人：{{ viewData.showDetail.showData.ap }}</div>
                <div>申请人地址：{{ viewData.showDetail.showData.apad }}</div>
                <div>专用权期限：{{ viewData.showDetail.showData.bd }}~2{{ viewData.showDetail.showData.ed }}</div>
                <div>代理机构：{{ viewData.showDetail.showData.agency }}</div>
                <div>商品服务：{{ viewData.showDetail.showData.spfw }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, reactive, getCurrentInstance } from "vue"
import * as API from '../../api/achievementOverview/index'
const global = inject('global');
const { proxy } = getCurrentInstance();
const dataTemplate = {
    imgPath: "",
    name: "",
    sortName: "",
    number: 0,
    applicant: "",
    address: "",
    time: "",
    agency: "",
    service: ""
}
let viewData = reactive({
    arrow: "never",
    data: [],
    showDetail: {
        show: false,
        showData: {}
    }
})
let playDetail = function(data){
    viewData.showDetail.show = true;
    API.getTradeMarkerDetail(data.code).then(res => {
        res.data.imgPath = data.imgPath;
        viewData.showDetail.showData = res.data;
    })
}
onMounted(()=>{
    API.getTrademark().then(res => {
        let groupArr = [];
        viewData.data = [];
        for (let index = 0; index < res.data.length; index++) {
            if(index != 0 && index % 2 == 0) {
                viewData.data.push(groupArr);
                groupArr = [];
            }
            const element = res.data[index];
            let  remark = JSON.parse(element?.remark);
            groupArr.push(Object.assign({imgPath: FileUrl + remark?.[0]?.url}, element));
        }
        if(groupArr.length != 0) {
            viewData.data.push(groupArr);
        }
        proxy.$emit("dataChange", res.data)
    })
})
</script>
<style scoped>
.cmsb-box { display: flex; flex-direction: column; overflow: hidden; position: relative;}
.cmsb-box-title { 
    background-color: rgba(13, 48, 99, 0.5); box-sizing: border-box;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    font-size: var(--default-font-size);  
    line-height: 2; 
    margin-bottom: 10px;
}
.cmsb-box-title::before { content: " ";  background-color: #12539D; display:block; font-size: var(--default-font-size);  line-height: 2; width: 10px; margin-right: 10px; }
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
.carousel-item-img-box { display: block; flex: 1; overflow: hidden; display: flex; align-items: center; justify-content: center; background-size: 170px 120px; background-repeat: no-repeat; background-position: bottom; }
.carousel-item-img-box .el-image { width: 80px; height: 80px; }
.carousel-item-title { color: #FFFFFF; font-size: var(--medium-font-size);  overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical; cursor: pointer; margin-top: 16px;}
.carousel-item-name { font-size: var(--large-font-size); margin-top: 14px; text-align: center;}
/**详情开始 */
.cmsb-detail-box { position: absolute; left: 0; right: 0; display: flex; flex-direction: column; overflow: hidden; background: rgba(5, 5, 76, 0.94); z-index: 20; width: 100%; height: 100%;}
.cmsb-detail-head { display: flex; margin-left: 20px; margin-right: 20px;}
.cmsb-detail-title { flex: 1; overflow: hidden; }
.cmsb-detail-icon { float: left; width: 100px; height: 60px; overflow: hidden; background-repeat: no-repeat; background-size: 100% 100%; background-position: bottom; display: flex; justify-content: center;}
.cmsb-detail-icon .el-image { width: 42px; height: 42px; }
.cmsb-detail-content { margin-left: 20px; font-size: 14px; margin-right: 20px; flex: 1; overflow-y: auto; }
.cmsb-detail-content div{ margin: 5px 0;}
/**详情结束 */
</style>
