<!--知识产权确权预警-->
<template>
    <div class="zscqqqyj-box model-backgroud">
        <div class="zscqqqyj-box-title background-image-box" :style="{backgroundImage:'url('+ GetPublicSource('echart-t-bg.png') +')'}">
            <div class="zscqqqyj-box-box-title-box">知识产权预警</div>
        </div>
        <div class="zscqqqyj-content-box">
            <div :class="['zscqqqyj-content-item', { 'active':  viewObj.info.title === '重点品牌监测预警'}]" @click="showInfoFun('重点品牌监测预警')">
                <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                <div class="zscqqqyj-content-item-content">
                    <div class="number-font">{{ viewObj.monitorWarning }}</div>
                    <div style="width: 57px">重点品牌监测预警</div>
                </div>
            </div>
            <div  :class="['zscqqqyj-content-item', { 'active':  viewObj.info.title === '知识产权线索侵权预警'}]" @click="showInfoFun('知识产权线索侵权预警')">
                <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                <div class="zscqqqyj-content-item-content">
                    <div class="number-font">{{ viewObj.infringementWarning }}</div>
                    <div style="width: 60px">知识产权线索侵权预警</div>
                </div>
            </div>
            <div  :class="['zscqqqyj-content-item', { 'active':  viewObj.info.title === '公共资源商标申请预警'}]" @click="showInfoFun('公共资源商标申请预警')">
                <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-red.png')"></el-image>
                <div class="zscqqqyj-content-item-content">
                    <div class="number-font">{{ viewObj.tmEncroachWarning }}</div>
                    <div style="width: 60px">公共资源商标申请预警</div>
                </div>
            </div>
            <div  :class="['zscqqqyj-content-item', { 'active':  viewObj.info.title === '重点企业字号品牌保护提示'}]" @click="showInfoFun('重点企业字号品牌保护提示')">
                <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-yellow.png')"></el-image>
                <div class="zscqqqyj-content-item-content">
                    <div class="number-font">{{ viewObj.brandProtectionWarning }}</div>
                    <div style="width: 82px">重点企业字号品牌保护提示</div>
                </div>
            </div>
             <div  :class="['zscqqqyj-content-item', { 'active':  viewObj.info.title === '企业“商标清零”提示'}]" @click="showInfoFun('企业“商标清零”提示')">
                <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-yellow.png')"></el-image>
                <div class="zscqqqyj-content-item-content">
                    <div class="number-font">{{ viewObj.tmClearingPrompt }}</div>
                    <div style="width: 60px" >企业“商标清零”提示</div>
                </div>
            </div>
            <div  :class="['zscqqqyj-content-item', { 'active':  viewObj.info.title === '科技型中小企业“专利清零”提示'}]" @click="showInfoFun('科技型中小企业“专利清零”提示')">
                <el-image class="zscqqqyj-content-item-icon" :src="GetPublicSource('warning-yellow.png')"></el-image>
                <div class="zscqqqyj-content-item-content">
                    <div class="number-font">{{ viewObj.ptClearingPrompt }}</div>
                    <div style="width: 100px;">科技型中小企业  “专利清零”提示 </div>
                </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%; height: 100%;" class="model-backgroud">
            <ZscqqqyjInfo ref="refZscqqqyjInfo" :com="viewObj.info" :searchKey="searchKey.key" @getSearchKey="getSearchKey"></ZscqqqyjInfo>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted, ref } from 'vue'
import { GetPublicSource } from './../../SystemCom/GetImages'
import * as HTTPAPI from './../../api/applicationServices/api'
import ZscqqqyjInfo from './zscqqqyj-info.vue'
const global = inject('global');
const viewObj = reactive({
    monitorWarning: 0,
    infringementWarning: 0,
    tmEncroachWarning: 0,
    brandProtectionWarning: 0,
    tmClearingPrompt: 0,
    ptClearingPrompt: 0,
    info: { title: "重点品牌监测预警", data: null, columns: [], notice: '' }
})

const refZscqqqyjInfo = ref(null)

const searchKey = reactive({
    key: '爱达乐'
})
const getSearchKey = (key) => {
    searchKey.key = key
    showInfoFun('重点品牌监测预警')
}

let showInfoFun = (title) => {
    viewObj.info.title = title;
    viewObj.info.linkUrl = '' // 先做清除 避免没有地址的展示出了地址
    viewObj.info.notice = ''
    // viewObj.info.data = [];
    switch(title){
        case '重点品牌监测预警': {
            viewObj.info.linkUrl = jkresUrl;
            viewObj.info.columns = [
                { field: 'tm', title: '近似商标',  width: 120},
                { field: 'applicant', title: '申请人'},
                { field: 'applyTime', title: '申请时间', width: 100 }
            ]
            HTTPAPI.monitorWarningList({ pageNum: 1, pageSize: 100, searchKey: searchKey.key }).then(res => {
                viewObj.info.data = res.data.list;
            })
            break
        }
        case '知识产权线索侵权预警': {
            viewObj.info.linkUrl = tortUrl;
            viewObj.info.columns = [
                { field: 'caseName', title: '案件名称'},
                { field: 'createTime', title: '创建时间', width: 100 },
            ]
            HTTPAPI.infringementWarningList({ pageNum: 1, pageSize: 100 }).then(res => {
                viewObj.info.data = res.data.list;
            })
            break
        }
        case '公共资源商标申请预警': {
            // viewObj.info.linkUrl = publicServiceUrl; //TODO  这个还没有线上页面
            viewObj.info.columns = [
                { field: 'tm', title: '商标名称', width: 100},
                { field: 'applicant', title: '申请人'},
                { field: 'registerTime', title: '申请时间', width: 100 },
                { field: 'publicResource', title: '公共资源', width: 100 }
            ]
            viewObj.info.notice = '旌阳区公共资源：凯江大回湾、溪月谷、德孝城、奇石岭、邻姑泉、孝古豫圆、通江李花、龙护舍利宝塔'
            HTTPAPI.tmEncroachWarningList({ pageNum: 1, pageSize: 100 }).then(res => {
                viewObj.info.data = res.data.list;
            })
            break
        }
        case '重点企业字号品牌保护提示': {
            viewObj.info.linkUrl = apUrl;
            viewObj.info.columns = viewObj.info.columns = [
                { field: 'enterpriseName', title: '企业名称'},
                { field: 'type', title: '名下字号商标情况', width: 200, align: 'center'},
            ]
            HTTPAPI.brandProtectionWarningList({ pageNum: 1, pageSize: 100 }).then(res => {
                viewObj.info.data = res.data.list;
            })
            break
        }
        case '企业“商标清零”提示': {
            viewObj.info.linkUrl = apUrl;
            viewObj.info.columns = viewObj.info.columns = [
                { field: 'enterpriseName', title: '企业名称'},
                { field: 'type', title: '名下商标情况', width: 200, align: 'center'},
            ]
            HTTPAPI.tmClearingPrompt({ pageNum: 1, pageSize: 100 }).then(res => {
                viewObj.info.data = res.data.list;
            })
            break
        }
        case '科技型中小企业“专利清零”提示': {
            viewObj.info.linkUrl = apUrl;
            viewObj.info.columns = viewObj.info.columns = [
                { field: 'enterpriseName', title: '企业名称'},
                { field: 'type', title: '名下专利情况', width: 200, align: 'center'},
            ]
            HTTPAPI.ptClearingPromptList({ pageNum: 1, pageSize: 100 }).then(res => {
                viewObj.info.data = res.data.list;
            })
        }
    }
}

onMounted(()=>{
    //确权预警-统计数据
    HTTPAPI.warningStatisticsNew().then(res => {
        let data = res.data;
        Object.keys(data).forEach(key => {
            viewObj[key] = data[key]
        })
    })
    showInfoFun('重点品牌监测预警')
    // console.log('refZscqqqyjInfo.value', refZscqqqyjInfo.value.displayData, refZscqqqyjInfo.value.displayFun)
})


defineExpose({
    displayData:  [
        // refZscqqqyjInfo.value.displayData, // refZscqqqyjInfo.value得到null... why
        [
            '重点品牌监测预警',
            '知识产权线索侵权预警',
            '公共资源商标申请预警',
            '重点企业字号品牌保护提示',
            '企业“商标清零”提示',
            '科技型中小企业“专利清零”提示'
        ]
    ],
    displayFun: [
        // refZscqqqyjInfo.value.displayFun,
        showInfoFun
    ]
})

</script>

<style scoped>
    .zscqqqyj-box {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0 20px 20px;
        box-sizing: border-box;
    }
    .zscqqqyj-box-title { display: flex; align-items: center; }
    .zscqqqyj-box-title.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: 4px; }
    .zscqqqyj-box-title .zscqqqyj-box-box-title-box {  flex: 1; font-size: 18px;  line-height: 2; padding-left: 10px;}
    .zscqqqyj-content-box { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2,1fr); gap: 7px; margin-top: 14px;}
    .zscqqqyj-content-item { display: flex;  align-items: center; background-color: #1e1d68; height: 91px; padding: 10px 0 15px 21px; box-sizing: border-box; cursor: pointer; }
    .zscqqqyj-content-item.active{
        background: rgba(81, 41, 28, 0.50);
    }
    .zscqqqyj-content-box  .zscqqqyj-content-item:nth-child(3n) {padding-left: 10px;}
    .zscqqqyj-content-item .zscqqqyj-content-item-icon { width: 52px; height: 52px;}
    .zscqqqyj-content-item-content { flex: 1; display: flex; flex-direction: column; margin: 0 10px;}
    .zscqqqyj-content-item-content div:nth-child(1) { font-weight: 700; font-size: var(--font18-size); }
    .zscqqqyj-content-item-content div:nth-child(2) { font-size: var(--small-font-size); margin-top: 3px;}
    .zscqqqyj-content-item-arrow { width: 24px; height: 24px;}
    .zscqqqyj-content-item-content .number-font {
        line-height: 31px;
        background-image:-webkit-linear-gradient(top, #FF4C00, #FFAA85);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
    }
    .zscqqqyj-content-box .zscqqqyj-content-item:nth-child(n+4) .number-font{
        background-image:-webkit-linear-gradient(top, #FFAF12, #FFB359);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
    }
</style>
