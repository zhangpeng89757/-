<template>
    <div class="rectangle-box-item">
        <div class="rectangle-box-item-title" v-if="titleKey != null">
            <span style="flex: 1;">{{ data[titleKey] }}</span>
            <!--多选数据下拉注册开始-->
            <template v-if="!Array.isArray(data[dataKey])">
                <el-select v-model="viewObject.checkDataKey" size="small" @change="dataChange">
                    <el-option v-for="(item,key,index) in data[dataKey]" :key="index" :label="key" :value="key"/>
                </el-select>
            </template>
            <!--多选数据下拉注册结束-->
        </div>
        <!--正常二维数组循环开始-->
        <template v-if="Array.isArray(data[dataKey])">
            <div class="rectangle-box-item-child-box" :style="{backgroundImage:'url('+ global.GetImages('rectangle-bg.png') +')'}">
                <template v-for="child in data[dataKey]">
                    <div class="rectangle-box-item-child-box-item">
                        <div class="rectangle-box-item-child-title">
                            {{ child[dataItemTtileKey] }}
                        </div>
                        <div class="rectangle-box-item-child-data">
                            {{ child[dataItemDataValue].toLocaleString() }}
                        </div>
                    </div>
                </template>
            </div>
        </template>
        <!--正常二维数组循环结束-->
        <!--二维是对象操作-->
        <template v-else>
            <div class="rectangle-box-item-child-box" :style="{backgroundImage:'url('+ global.GetImages('rectangle-bg.png') +')'}">
                <template v-for="child in viewObject.checkData">
                    <div class="rectangle-box-item-child-box-item">
                        <div class="rectangle-box-item-child-title">
                            {{ child[dataItemTtileKey] }}
                        </div>
                        <div class="rectangle-box-item-child-data">
                            {{ child[dataItemDataValue].toLocaleString() }}
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
<script setup>
import { reactive, watch, inject } from 'vue'
const global = inject('global');
const reg = /(?!^)(?=(\d{3})+$)/g;
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
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
    }
})
const viewObject = reactive({
    checkDataKey: "",
    checkData: []
})
watch(()=>props, ()=>{
    if(!Array.isArray(props.data[props.dataKey])) {
        for (let key in props.data[props.dataKey]) {
            viewObject.checkDataKey = key;
            break;
        }
        viewObject.checkData = props.data[props.dataKey][viewObject.checkDataKey];
    }
},{
    deep:true,
    immediate: true
})
const dataChange = (v) => {
    viewObject.checkData = props.data[props.dataKey][v];
}
</script>
