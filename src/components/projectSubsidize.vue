<template>
  <!--  知识产权项目资助-->
  <div class="projectSubsidize">
    <knowledgeTitle title="知识产权项目资助"></knowledgeTitle>
    <div class="button">
      <button  class="btn" v-for="(item,index) in btn" :key="index" @click="handleClick(index,$e)" :id="'active'?index===btnIndex:false">{{item}}</button>
    </div>
    <div style="width: 100%;height: 100%" >
      <el-table
          :data="scrollList"
          style="width: 100%"
          class="top"
          :header-cell-style="{textAlign: 'center',backgroundColor: '#051e46',border:0,color:'#ffffff'}"
          :cell-style="{border:0}"
      >
        <el-table-column v-for="(item, index) in title"  :label="item" align="center"  :key="index" />
      </el-table>
        <Vue3SeamlessScroll id="box" :list="scrollList" class="seamless-warp scroll" :hover="true" :step="0.3">
          <el-table :row-style="{ height: '34px' }" :height="tableHeight" :data="scrollList" :cell-style="{ textAlign: 'center',color:'#ffffff',border:0}" :header-cell-style="{textAlign: 'center',backgroundColor: '#051e46',border:0}" :show-header="false" stripe>
            <el-table-column prop="year" show-overflow-tooltip/>
            <el-table-column prop="projectName" show-overflow-tooltip/>
            <el-table-column prop="projectUnit" show-overflow-tooltip/>
            <el-table-column prop="money" show-overflow-tooltip/>
            <el-table-column prop="type" show-overflow-tooltip/>
            <el-table-column prop="conclusion" show-overflow-tooltip/>
          </el-table>
        </Vue3SeamlessScroll>
    </div>
  </div>
</template>

<style lang="scss" scoped>
 #box .el-table__row{
  height: 100px;
 }
.projectSubsidize{
  margin-top: 20px;
  height: 80%;
  position: relative;
}
.button{
  position: absolute;
  top: 0;
  right: 0;
}
.btn{
  background: linear-gradient(to top, #1c3b72, #051d42);
  color: #ffffff;
  padding: 2px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin: 5px;
  font-size: 8px;
  width:40px;
  border-radius: 2px;
}
.th{
  width: 100%;
}
.th th{
  width: 16%;
  font-size: 10px;
  background-color: #051e46;
  border: none;
  height: 30px;
}
::v-deep .seamless-warp {
  height: 70%;
  overflow: hidden;
}
::v-deep .top .el-table__body-wrapper {
  display: none;
}
::v-deep .bottom .el-table__header-wrapper {
  display: none;
  width: 100%;
}
#true{
  background: linear-gradient(to top, #bcffed, #03112a);
}
</style>
<script setup>
const { proxy } = getCurrentInstance();
import KnowledgeTitle from "./knowledgeTitle.vue";
import {getCurrentInstance,ref} from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { onMounted , onUpdated } from 'vue';
onMounted(async() => {
  try {
    const response = await fetch('http://47.109.45.24:8302/dls/projectFunding');
    const a = await response.json();
    List.value = a.data
    console.log(a.data)
    scrollList.value = List.value.totalList;
  } catch (error) {
    console.error(error);
  } finally {
  }
});
onUpdated(()=>{
  const rowlength = scrollList.value.length
  console.log(rowlength)
  tableHeight.value = rowlength*34
  console.log(tableHeight.value)
})
const title = ref(["年度","项目名称","项目单位","项目金额","知识产权类型","验收结果"])
// 子传父
const rowClick = (row, column, event) => {
  console.log(row,column,event)
  proxy.$emit("rowClick",row, column, event)
}
const tableHeight = ref(null)
const scrollList = ref([])
const btnIndex = ref(0)
const btn = ref(["全部","申请中","实施中","已完成"])
const List=ref({})
function handleClick(index,e) {
  console.log(index,btnIndex.value)
  btnIndex.value = index
  console.log(index,btnIndex.value)
  if(index === 0){
    scrollList.value = List.value.totalList
  }else if (index === 1) {
    scrollList.value = List.value.applyList
  }else if (index === 2) {
    scrollList.value = List.value.implementList
  }else if (index === 3) {
    scrollList.value = List.value.completedList
  }
}
</script>