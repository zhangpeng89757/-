<template>
    <div class="header" :style="{backgroundImage:'url('+ global.GetImages('headbg.png') +')'}">
        <div class="header-left">
            <img :src="global.GetImages('headerleft.png')" style="height:60px;">
            &emsp;当前时间&emsp;{{ viewObject.dateTime.day }}&emsp;{{ viewObject.dateTime.week }}&emsp;{{ viewObject.dateTime.time }}
        </div>
        <div class="header-titile" :style="{backgroundImage:'url('+ global.GetImages('head-center.png') +')'}">
        </div>
        <div class="header-right" @click="navChange">
            数据更新：{{ viewObject.dataUpdateDate.date  }}
            <!-- <div style="display: flex; width: 100%;">
                <div>数据来源：</div><div style="flex: 1;">国家知识产权局、德阳市市场监管局、区市场监管局、区新闻出版局、区经科信局、区农村农业局</div>
            </div> -->
        </div>
    </div>
</template>
<script setup>
import { useRouter  } from "vue-router"
import {ref, reactive, getCurrentInstance, watch, onMounted, inject } from "vue"
import { getDataUpdateDate } from '@/api/header'
const { proxy } = getCurrentInstance();
const router = useRouter()
const emit = defineEmits(["changs"])
const global = inject('global');
const viewObject = reactive({
    dateTime: {
        time: "",
        day: "",
        week: ""
    },
    dataUpdateDate: {
        date: '2022年12月31日'
    },
})
const navChange = ()=>{
  emit("changs")
  router.push({
    path:"/knowledgeScreen"
  })
}
/**获取时间 */
const GetTime = () => {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    mm = mm < 10 ? "0" + mm : mm;
    let dd = new Date().getDate();
    dd = dd < 10 ? "0" + dd : dd;
    let week = new Date().getDay();
    let hh = new Date().getHours();
    let ms = new Date().getSeconds() < 10 ?  "0" + new Date().getSeconds() : new Date().getSeconds();
    let mf =  new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
    if (week == 1) {
        viewObject.dateTime.week = "星期一";
    } else if (week == 2) {
        viewObject.dateTime.week = "星期二";
    } else if (week == 3) {
        viewObject.dateTime.week = "星期三";
    } else if (week == 4) {
        viewObject.dateTime.week = "星期四";
    } else if (week == 5) {
        viewObject.dateTime.week = "星期五";
    } else if (week == 6) {
        viewObject.dateTime.week = "星期六";
    } else {
        viewObject.dateTime.week = "星期日";
    }
    viewObject.dateTime.time = hh + ":" + mf + ":" + ms;
    viewObject.dateTime.day = yy + "-" + mm + "-" + dd;

    // viewObject.dataUpdateDate = getDataUpdateDate().date;
}
const dataUpdateDate = () => {
    viewObject.dataUpdateDate = getDataUpdateDate();
}
onMounted(()=>{
    dataUpdateDate();
    setInterval(GetTime, 1000);
})
</script>

<style lang="less" scoped>
    .header {
        z-index: 9999;
        width: 100%;
        height: 130px;
        max-height: 130px;
        min-height: 130px;
        overflow: hidden;
        background-size: 100% 60%;
        background-repeat: no-repeat;
        color: #FFFFFF;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        .header-left { 
            max-width: 30%;
            height: 80px;
            width: 30%;
            flex: 0 0 30%;
            font-size: var(--font18-size);
            display: flex;
            align-items: center;
            overflow: hidden;
            box-sizing: border-box;
        }
        .header-titile { 
            width: 40%;
            max-width: 40%;
            overflow: hidden;
            flex: 0 0 40%;
            text-align: center; 
            background-size: contain;
            background-repeat: no-repeat;
            box-sizing: border-box;
            background-position: top;
        }
        .header-right { 
            width: 30%;
            max-width: 30%;
            overflow: hidden;
            font-weight: 200;
            flex: 30%;
            font-size: var(--font18-size);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: right;
            padding-right: 60px;
            height: 80px;
        }
    }
</style>
