<!--正方形组件-->
<template>
    <template v-if="data.length > 0">
        <div class="block-box" 
            :style="{gridTemplateColumns:`repeat(${lineNumber},1fr)`, gridTemplateRows:`repeat(${ Math.ceil(data.length / lineNumber)},1fr)`}">
            <template v-for="item in data">
                <div class="block-box-item">
                    <div class="block-box-item-title" v-if="titleKey != null">{{ item[titleKey] }}</div>
                    <div class="block-box-item-data number-font" :class="[item[dataKey] == '暂无数据' ? 'block-box-item-not-data' : '']" :style="{backgroundImage:'url('+ global.GetImages('zhutishuju.png') +')'}">
                        <span>{{ item[dataKey]?.toLocaleString() }}</span>
                    </div>
                </div>
            </template>
        </div>
    </template>
</template>
<script setup>
import { reactive, watch , inject} from 'vue'
const global = inject('global');
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
.block-box { 
    background-color:rgba(18, 17, 91, 0.8);
    box-sizing: border-box; 
    display: grid;
    gap: 10px;
    padding-bottom: 10px;
}

.block-box-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}
.block-box-item-title {
    color: #fff;
    font-size: var(--medium-font-size);
    overflow: hidden;
    text-align: center;
    flex: 1;
    display: flex;
    align-items: end;
    justify-content: center;
}
.block-box-item-data span { margin-bottom: 20px; }
.block-box-item-data.block-box-item-not-data {
    font-size: var(--small-font-size);
}
.block-box-item-data {
    flex: 2;
    color: #5FFFE2;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    width: 100%;
    text-align: center;
    font-size: var(--large-font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: border-box;
    background-position: bottom;
}
</style>