<template>
     <div class="centercenter-title" >
        <img :src="global.GetImages('c-t-l.png')">
        <div class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('Subtract.png') +')'}">
            {{  content  }}
        </div>
    </div>
</template>
<script setup>
import { inject } from "vue"
const global = inject('global');
/**定义父组件传参开始 */
const props = defineProps({
    content: { //显示标题文本
        type: String,
        default: () =>  ""
    },
    algin: { //显示标题显示位置方式 center, right
        type: String,
        default: () =>  "left"
    },
    size: { //显示标题大小 small, default, large
        type: String,
        default: () =>  "default"
    }
})
/**定义父组件传参结束 */
</script>
<style>
.centercenter-title { color: #FFFFFF;  display: flex; align-items: center; font-size: var(--medium-font-size); line-height: 1.5; margin: 4px 0; }
.centercenter-title img { width: var(--medium-font-size); height: var(--medium-font-size); }
.centercenter-title .background-image-box { padding-left: var(--medium-font-size); }
</style>