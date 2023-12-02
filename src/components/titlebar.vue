<!--标题组件-->
<template>
    <div class="titlebar-box model-backgroud" :style="{backgroundImage:'url('+ (algin == 'center' ?global.GetImages('center-title-bg.png') : global.GetImages('title-bg.png'))+')'}">
        <div :style="{ 
            fontFamily: fontFamily,
            flex:1, 
            textAlign: algin, 
            fontSize: `var(${size})` 
            }">
            {{ content }}
        </div>
        <div class="titlebar-box-tools">
            <slot name="tools"></slot>
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
        default: () =>  "--font18-size"
    },
    //字体
    fontFamily: {
        type:String,
        default: () => "HarmonyOSMedium"
    }
})
/**定义父组件传参结束 */
</script>
<style>
.titlebar-box { 
    background-size: auto 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-left: 30px;
    line-height: 2;
}
.titlebar-box .titlebar-box-tools { display: flex; color: #FFFFFF; justify-content: end; padding-right: 10px; }
.titlebar-piece-box { 
    background-color: #142D72; display: inline-block; 
    font-size: var(--small-font-size);
    line-height: 1.5;
    padding: 0 8px;
    box-sizing: border-box; 
    margin-left: 10px; 
    cursor: pointer; 
    border: 2px solid #25386b; 
    color: #2079A0; 
}
.titlebar-piece-box.line-piece-box-checked { background-color: #142D72; border-color: #38549E; color: #A8FAFF; }
</style>