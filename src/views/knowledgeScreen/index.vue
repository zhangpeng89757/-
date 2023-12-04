<template>
  <div class="knowledgeScreen_box">
  <div class="box_left">
    <knowledgeTitle title="知识产权创造结果"></knowledgeTitle>
  </div>
  <div class="box_min">{{ test }}</div>
  <div class="box_right">
    <div class="zhuo" style="height: 50%"></div>
    <div style="height: 50%">
      <servicesAndSubsidize></servicesAndSubsidize>
      <projectSubsidize></projectSubsidize>
    </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import knowledgeTitle from '@/components/knowledgeTitle.vue'
import servicesAndSubsidize from '../../components/enterpriseServices.vue'
import projectSubsidize from '../../components/projectSubsidize.vue'
let test = "知识大屏"
</script>
<style lang="less" scoped>
  .knowledgeScreen_box{
    width: 100%;
   
    .box_left{
      width: 26vw;
    height: 89vh;
    position: fixed;
    top: 6vh;
    left: 50px;
      background: red;
    }
    .box_min{
      padding-top: 60px;
    box-sizing: border-box;
    width: 42vw;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
      box-sizing: border-box;
      height: 88%;
      background: #666;
    }
    .box_right{
      width: 26vw;
      height: 89vh;
      position: fixed;
      top: 6vh;
      right: 50px;
      //background: blue;
    }
  }
</style>