<!--地理标志-->
<template>
    <div class="dlbz-box">
        <div class="dlbz-box-title">{{ title }}</div>
        <el-carousel style="flex:1;overflow: hidden;" :interval="5000" :arrow="viewData.arrow" indicator-position="none" height="100%">
            <el-carousel-item v-for="items in viewData.data" :key="items">
                <div class="carousel-item-content" v-for="item in items" :key="item">
                    <div class="carousel-item-img-box" @click="playDetail(item)" :style="{backgroundImage:'url('+ global.GetImages('dlbz-bg.png') +')', width: items.length == 2 ? '100%' : '290px'}">
                        <el-image :src="item.imgPath" fit="contain"/>
                    </div>
                    <div class="carousel-item-name">{{ item.name }}<span style="font-size: 14px; margin-left: 10px;">(编号：{{ item.orderNum }})</span></div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="dlbz-detail-box" v-if="viewData.showDetail.show">
            <div class="dlbz-detail-head">
                <div class="dlbz-detail-title">
                    <div class="dlbz-detail-icon" :style="{backgroundImage:'url('+ global.GetImages('dlbz-bg.png') +')'}">
                        <el-image :src="viewData.showDetail.showData.imgPath" fit="contain"/>
                    </div>
                </div>
                <el-icon @click="()=> { viewData.showDetail.show = false }" style="cursor: pointer;" :size="20"><Close /></el-icon>
            </div>
            <div class="dlbz-detail-content">
                <div>核准使用地理标志企业</div>
                <playDetailTable style="flex: 1;" hideHead="true" :data="viewData.showDetail.detailData" :columns="viewData.showDetail.detailDataHead"></playDetailTable>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, reactive, getCurrentInstance } from "vue"
import playDetailTable from '@/components/table/playDetailTable.vue'
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
        //详情头部列
        detailDataHead: [{ field: 'ap', title: '企业名称' },{ field: 'xydm', width: 180, title: '社会统一信用代码' },],
        //数据详情
        detailData: [],
        showData: {
            
        }
    }
})
let playDetail = function(data){
    API.geographicalIndication(data.id).then(res => {
        viewData.showDetail.detailData = res.data;
    })
    Object.assign(viewData.showDetail.showData, data);
    viewData.showDetail.show = true;
}
onMounted(()=>{
    API.getDilbzcp().then(res => {
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
.dlbz-box { display: flex; flex-direction: column; overflow: hidden; position: relative;}
.dlbz-box-title { 
    background-color: rgba(13, 48, 99, 0.5); box-sizing: border-box;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    font-size: var(--default-font-size);  
    line-height: 2; 
    margin-bottom: 10px;
}
.dlbz-box-title::before { content: " ";  background-color: #12539D; display:block; font-size: var(--default-font-size);  line-height: 2; width: 10px; margin-right: 10px; }
.el-carousel__item {
    display: flex;
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
.carousel-item-img-box { display: block; overflow: hidden; height: 160px; display: flex; align-items: center; justify-content: center; background-size: 100% 160px; background-repeat: no-repeat;  width: 80%; margin: 0 auto;}
.carousel-item-img-box .el-image { width: calc(100% - 20px); height:  calc(100% - 20px); }
.carousel-item-title { color: #FFFFFF; font-size: var(--medium-font-size);  overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical; cursor: pointer; margin-top: 16px;}
.carousel-item-name { font-size: var(--large-font-size); margin-top: 14px; text-align: center;}
/**详情开始 */
.dlbz-detail-box { position: absolute; left: 0; top: 0px; display: flex; flex-direction: column; overflow: hidden; background: rgba(5, 5, 76, 0.94); z-index: 20; width: 100%; height: 100%;}
.dlbz-detail-head { display: flex; margin-left: 20px; margin-right: 20px;}
.dlbz-detail-title { flex: 1; overflow: hidden; }
.dlbz-detail-icon { margin: 0 auto; width: 130px; height: 80px; overflow: hidden; background-repeat: no-repeat; background-size: 100% 100%; display: flex; justify-content: center;}
.dlbz-detail-icon .el-image { width: 120px; height: 70px; margin: 5px; }
.dlbz-detail-content { margin-left: 20px; font-size: 14px; margin-right: 20px; flex: 1; display: flex; flex-direction: column; }
/**详情结束 */
</style>
