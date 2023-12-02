<template>
    <div class="gjzzl-box">
        <div class="gjzzl-box-item">
            <div @click="playDetail('wcnData')" class="background-image-box gjzzl-data-item" :style="{backgroundImage:'url('+ global.GetImages('gjzzl-bg1.png') +')'}">
                <div>
                    维持年限超10年<br>的有效发明专利
                </div>
                <div class="number-font">
                    {{viewData.wcnData.number.toLocaleString()}}
                </div>
            </div>
            <div @click="playDetail('zlxData')" class="background-image-box gjzzl-data-item" :style="{backgroundImage:'url('+ global.GetImages('gjzzl-bg1.png') +')'}">
                <div>
                    战略性新兴产业的<br>有效发明专利
                </div>
                <div class="number-font">
                    {{viewData.zlxData.number.toLocaleString()}}
                </div>
            </div>
        </div>
        <div class="gjzzl-box-item">
            <div @click="playDetail('jgzyData')" class="background-image-box gjzzl-data-item" :style="{backgroundImage:'url('+ global.GetImages('gjzzl-bg2.png') +')'}">
                <div>
                    获得较高质押融资金额的有效发明专利
                </div>
                <div class="number-font">
                    {{viewData.jgzyData.number.toLocaleString()}}
                </div>
                
            </div>
            <div @click="playDetail('kjjData')" class="background-image-box gjzzl-data-item" :style="{backgroundImage:'url('+ global.GetImages('gjzzl-bg2.png') +')'}">
                <div style="font-size: 13px;">
                    获得国家科技奖或中国专利奖的有效发明专利
                </div>
                <div class="number-font">
                    {{viewData.kjjData.number.toLocaleString()}}
                </div>
                
            </div>
            <div @click="playDetail('tzzlData')" class="background-image-box gjzzl-data-item" :style="{backgroundImage:'url('+ global.GetImages('gjzzl-bg2.png') +')'}">
                <div>
                    在海外有同族专利权的有效发明专利
                </div>
                <div class="number-font">
                    {{viewData.tzzlData.number.toLocaleString()}}
                </div>
            </div>
        </div>
        <playDetailTable 
            @close="()=>{ viewData.showDetail.show = false; }" 
            :title="viewData.showDetail.title"
            :data="viewData.showDetail.data"
            :columns="viewData.showDetail.columns"
            v-if="viewData.showDetail.show" class="detailPlay">
        </playDetailTable>
    </div>
</template>
<script setup>
import { reactive, watch, inject, onMounted, getCurrentInstance } from 'vue'
import playDetailTable from '@/components/table/playDetailTable.vue'
import { getGaojzzl, getPatentTypeListCount } from '../../api/achievementOverview/index'
const global = inject('global');
const { proxy } = getCurrentInstance();
let viewData = reactive({
    showDetail:{
        show: false,
        title: "",
        data: "",
        columns: ""
    },
    //维持年限超10年
    wcnData: {
        title: "维持年限超10年的有效发明专利",
        //数字统计
        number: 0,
        //详情头部列
        detailDataHead: [{ field: 'ap', title: '企业名称' },{ field: 'zlsl', width: 120, title: '该类型专利件数' },],
        //数据详情
        detailData: [],
    },
    //战略性新兴产业的
    zlxData: {
        title: "战略性新兴产业的有效发明专利",
        //数字统计
        number: 0,
        //详情头部列
        detailDataHead: [{ field: 'ap', title: '企业名称' },{ field: 'zlsl', width: 120, title: '该类型专利件数' },],
        //数据详情
        detailData: [],
    },
    //获得较高质押融资金额
    jgzyData: {
        title: "获得较高质押融资金额的有效发明专利",
        //数字统计
        number: 0,
        //详情头部列
        detailDataHead: [{ field: 'ap', title: '企业名称' },{ field: 'zlsl', width: 120, title: '该类型专利件数' },],
        //数据详情
        detailData: [],
    },
    //获得国家科技奖或中国专利奖的
    kjjData: {
        title: "获得国家科技奖或中国专利奖的有效发明专利",
        //数字统计
        number: 0,
        //详情头部列
        detailDataHead: [{ field: 'ap', title: '企业名称' },{ field: 'zlsl', width: 120, title: '该类型专利件数' },],
        //数据详情
        detailData: [],
    },
    //在海外有同族专利权的
    tzzlData: {
        title: "在海外有同族专利权的有效发明专利",
        //数字统计
        number: 0,
        //详情头部列
        detailDataHead: [{ field: 'ap', title: '企业名称' },{ field: 'zlsl', width: 120, title: '该类型专利件数' },],
        //数据详情
        detailData: [],
    }
})
let playDetail = function(key) {
    let data = viewData[key];
    viewData.showDetail.show = true;
    viewData.showDetail.data = data.detailData;
    viewData.showDetail.columns = data.detailDataHead;
    viewData.showDetail.title = data.title;
    let type = 1;
    if(key == "zlxData") type = 2;
    else if(key == "jgzyData") type = 3;
    else if(key == "kjjData") type = 4;
    else if(key == "tzzlData") type = 5;
    getPatentTypeListCount(type).then(res => {
        viewData.showDetail.data = res.data.list;
    })
}
onMounted(()=>{
    getGaojzzl().then(res => {
        let count = 0;
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            count += element.nums;
            if(element.name == "维持年限超10年的有效发明专利") {
                viewData.wcnData.number = element.nums; 
            } else if(element.name == "战略性新兴产业的有效发明专利") {
                viewData.zlxData.number = element.nums; 
            } else if(element.name == "获得较高质押融资金额的有效发明专利") {
                viewData.jgzyData.number = element.nums; 
            } else if(element.name == "获得国家科技奖或中国专利奖的有效发明专利") {
                viewData.kjjData.number = element.nums; 
            } else if(element.name == "在海外有同族专利权的有效发明专利") {
                viewData.tzzlData.number = element.nums; 
            }     
        }
        proxy.$emit("count", count)     
    })
})
</script>
<style scoped>
    .gjzzl-box { display: flex; flex-direction: column; font-size: 14px; position: relative; }
    .gjzzl-box-item { flex: 1; display: grid; gap: 20px;}

    .gjzzl-box-item:nth-child(1) { grid-template-columns:repeat(2, 1fr); margin-bottom: 15px; }
    .gjzzl-box-item:nth-child(2) { grid-template-columns:repeat(3, 1fr); }
    .gjzzl-data-item { padding: 10px 4px; display: flex; flex-direction: column; cursor: pointer;}
    .gjzzl-data-item div { text-align: center; }
    .gjzzl-data-item div:nth-child(1) { line-height: 26px; }
    .gjzzl-data-item div:nth-child(2) { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #5FFFE2; font-weight: 700;}

    .detailPlay { position: absolute; width: 100%; height: 100%; z-index: 1; background-color: rgba(5, 5, 76, 0.94);}
</style>