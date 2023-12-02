<!--展示详情的表格-->
<template>
    <div class="playDetailTable-box">
        <div class="playDetailTable-title" v-if="!hideHead">
            <div>{{ title }}</div>
            <el-icon @click="close" style="cursor: pointer;" :size="20"><Close /></el-icon>
        </div>
        <div class="playDetailTable-content">
            <Scrolltable height="100%" style="flex: 1;" :columns="columns" :data="data"></Scrolltable>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch, inject, getCurrentInstance } from 'vue'
import Scrolltable from '@/components/table/scrolltable.vue'
const { proxy } = getCurrentInstance();
const viewObject = reactive({
    loading: true
})
/**定义父组件传参开始 */
const props = defineProps({
    title: { //标题
        type: String,
        default: "标题"
    },
    data: { //API参数对象
        type: Array,
        default: () =>  []
    },
    columns: { //表头
        type: Array,
        default: () =>  []
    },
    hideHead: { //是否隐藏头部
        type: Boolean,
        default: false
    }
})

let close = function(){
    proxy.$emit("close");
}
</script>
<style scoped>
.playDetailTable-box { flex: 1; display: flex; flex-direction: column; overflow: hidden;}
.playDetailTable-title { font-size: 14px; padding: 9px 0; display: flex; align-items: center;}
.playDetailTable-title div:nth-child(1) { flex: 1; }
.playDetailTable-content { flex: 1; overflow: hidden; display: flex; flex-direction: column;}
</style>