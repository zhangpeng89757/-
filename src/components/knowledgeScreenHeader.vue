<template>
  <div class="header" :style="{backgroundImage:'url('+ global.GetImages('knowledgeScreen-header.png') +')'}">
    <div class="box-left">
      <img :src="global.GetImages('left-boxs.png')" alt="">
      <div class="time">2023-11.30 星期三 18.10.20</div>
    </div>
    <div class="box-left box-right">
      <img :src="global.GetImages('right-boxs.png')" alt="">
    </div>
 </div>
</template>
<script setup>
import { useRouter  } from "vue-router"
import {ref, reactive, getCurrentInstance, watch, onMounted, inject } from "vue"
import { getDataUpdateDate } from '@/api/header'
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
    pointer-events: none;
      z-index: 20;
      width: 100%;
      height: 130px;
      overflow: hidden;
      background-position: center;
    background-size: cover;
      background-repeat: no-repeat;
      color: #FFFFFF;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
    
  }
  .box-left{
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 98%;
    width: 14vw;
    img{
      width: 100%;
      height: 100%;
    }
    .time{
      position: absolute;
    right: -192px;
    top: 0;
    z-index: 22;
    font-size: 14px;
    color: #fff;
    }
  }
  .box-right{
    left: auto;
    right: 0 !important;
  }
</style>
