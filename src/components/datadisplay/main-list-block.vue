<!--容器组件-->
<template>
    <template v-if="data.length > 0">
        <div class="main-list-block" :id="uuid" 
        :style="{gridTemplateColumns:`repeat(${lineNumber},1fr)`, gridTemplateRows:`repeat(${ rowNumber ?? Math.ceil(data.length / lineNumber)},1fr)`, gap: `${gap}`}">
            <template v-for="item in data">
                <slot name="item" :slotData="item"></slot>
            </template>
        </div>
    </template>
</template>
<script setup>
import { reactive, ref, watch, getCurrentInstance, onMounted, onUnmounted  } from 'vue'
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
const { proxy } = getCurrentInstance();
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Array,
        default: () => new Array()
    },
    lineNumber: { //每行多少个
        type: Number,
        default: () => 3
    },
    rowNumber: { //多少行
        type: Number,
        default: () => null
    },
    gap: { //元素间隔像素
        type: [Number,String],
        default: "10px"
    }
    
})
/**定义父组件传参结束 */
</script>
<style scoped>
.main-list-block { 
    background-image: linear-gradient(to bottom, rgba(21, 20, 92, 0.5), rgba(21, 20, 92, 0));
    box-sizing: border-box; 
    display: grid;
    overflow: hidden;
}
</style>