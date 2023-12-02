<!--长方形组件-->
<template>
    <template v-if="data.length > 0">
        <div class="rectangle-box">
            <template v-for="itemArray in viewObject.groupData">
                <el-row :gutter="20">
                    <template v-for="item in itemArray">
                        <el-col :span="24/lineNumber">
                            <rectangleItem 
                            :data="item" 
                            :titleKey="titleKey"  
                            :dataKey="dataKey"  
                            :dataItemDataValue="dataItemDataValue"
                            :dataItemTtileKey="titleKey"/>
                        </el-col>
                    </template>
                </el-row>
            </template>
        </div>
    </template>
</template>
<script setup>
import { reactive, watch } from 'vue'
import rectangleItem from './rectangleItem.vue'
const reg = /(?!^)(?=(\d{3})+$)/g;
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Array,
        default: () => new Array()
    },
    titleKey: { // 数据标题KEY
        type: String,
        default: () => null
    },
    dataKey: { // 显示数据KEY
        type: String,
        default: () => null
    },
    dataItemTtileKey: { //子数据标题KEY
        type: String,
        default: () => null
    },
    dataItemDataValue: { //子数据KEY
        type: String,
        default: () => null
    },
    lineNumber: { //每行多少个
        type: Number,
        default: () => 3
    },
    
})
const viewObject = reactive({
    groupData: []
})
const initData = () =>{
    let groupData = [];
    if(props.lineNumber < 1) {
        groupData[0] = props.data;
    } else {
        for (let index = 0; index < props.data.length; index++) {
            if(index % props.lineNumber == 0) {
                groupData[groupData.length] = new Array();
            } 
            groupData[groupData.length - 1].push(props.data[index]);
        }
    }
    viewObject.groupData = groupData;
}
watch(()=>props, ()=>{
    initData();
},{
    deep:true,
    immediate: true
})
/**定义父组件传参结束 */
</script>
<style scoped>
.rectangle-box { 
    padding: 0.2rem 0.5rem; 
    background-image: linear-gradient(to bottom, rgba(21, 20, 92, 0.5), rgba(21, 20, 92, 0));
    box-sizing: border-box; 
    display: flex; 
    flex-direction: column;
    overflow: hidden;
}
</style>