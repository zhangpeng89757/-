<!--企业服务-->
<template>
    <div class="qyfw-box model-backgroud">
        <titlebar content="企业服务"/>
        <div class="qyfw-content-box">
            <div class="qyfw-content-item" @click="showInfoFun(item)" v-for="item in viewObj.data">
                <div class="qyfw-content-item-title">{{ item.type }}</div>
                <div class="qyfw-content-item-content">
                    <div class="qyfw-content-item-content-l">
                        <div class="number-font">{{  item.completed  }}</div>
                        <div>待服务</div>
                    </div>
                    <div class="qyfw-content-item-content-r">
                        <div class="number-font">{{  item.total  }}</div>
                        <div>已服务</div>
                    </div>
                </div>
            </div>
            
        </div>
        <div v-if="viewObj.showInfo" style="position: absolute; display: flex; flex-direction: column; overflow: hidden; left: 0; top: 0; z-index: 20; width: 100%; height: 100%;" class="model-backgroud">
            <div v-if="viewObj.showInfo" style="text-align: right;margin-right: 4px;position: absolute; right: 0; top: 4px;"><el-icon @click="viewObj.showInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <QyfwInfo :com="viewObj.info"></QyfwInfo>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
import titlebar from '@/components/titlebar.vue'
import QyfwInfo from './qyfw-info.vue';
import * as HTTPAPI from './../../api/applicationServices/api'

const global = inject('global');
const viewObj = reactive({
    data: [],
    showInfo: false,
    info: { title: "", data: null, columns: [] }
})
let showInfoFun = (data) => {
    viewObj.showInfo = true;
    viewObj.info.title = "企业服务-" + data.type;
    viewObj.info.data = [];
    viewObj.info.columns = [
        { field: 'applicant', title: '申请人'},
        { field: 'phone', title: '联系电话', width: 150 },
        { field: 'requirements', title: '服务要求'},
        { field: 'statusname', title: '服务状态', width: 100 }
    ]
    HTTPAPI.enterpriseServeList(data.type).then(res => {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            element.statusname = element.status == 1 ? "已处理" : "未处理";
        }
        viewObj.info.data = res.data.list;
    })
}
onMounted(()=>{
    HTTPAPI.enterpriseServeStatistics().then(res => {
        viewObj.data = res.data;
    })
})
</script>

<style scoped>
    .qyfw-box {
        display: flex;
        flex-direction: column;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
    }
    .qyfw-content-box { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr);  gap: 10px 20px; padding: 15px 20px;}
    .qyfw-content-item { display: flex; flex-direction: column; background-color: #1e1d68; box-sizing: border-box; cursor: pointer; padding: 6px 10px 10px;}
    .qyfw-content-item-title { font-size: var(--small-font-size); display: flex; align-items: center; height: 16px; justify-content:flex-start;}
    .qyfw-content-item-title::before { content: " "; width: 3px; height: 3px; background-color: #5FFFE2; margin-right: 4px;}
    .qyfw-content-item-content { flex: 1; display: grid; grid-template-columns: repeat(2,1fr); }
    .qyfw-content-item-content-l,.qyfw-content-item-content-r { display: flex; flex-direction: column; align-items: center; justify-content: center; }

    .qyfw-content-item-content-l div:nth-child(1),.qyfw-content-item-content-r div:nth-child(1) {
        color: #FFC757; font-size: var(--large-font-size); font-weight: 700;
    }
    .qyfw-content-item-content-l div:nth-child(2),.qyfw-content-item-content-r div:nth-child(2) {
        font-size: var(--small-font-size);
    }
</style>
