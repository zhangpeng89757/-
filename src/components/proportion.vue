<!--占比图-->
<template>
    <div class="proportioncontent-box">
        <div class="proportioncontent-view">
            <div class="proportioncontent-tool background-image-box" :style="{backgroundImage:'url('+ global.getAssetsFile('qjgk/line-bg.png') +')'}">
                <div class="proportioncontent-tool-title">{{ title }}</div>
            </div>
            <div class="proportioncontent-content">
                <Vue3SeamlessScroll
                    :list="data"
                    :step="0.3"
                    :hover="true">
                    <template v-for="item in data">
                        <div class="proportioncontent-item">
                            <div class="proportioncontent-item-title">
                                <img :src="global.GetImages('c-t-l.png')"/>
                                {{ item.name }}
                            </div>
                            <div class="proportioncontent-item-content">
                                <div class="proportioncontent-item-content-title">{{ item.leftDataName }}</div>
                                <div class="proportioncontent-item-bar">
                                    <span style="z-index: 1;position: absolute; left: 10%; top: -3px;">{{item.leftDataNumber}}&ensp;{{ item.rightDataNumber=='暂无数据' ? '' : `${item.leftScale}%` }}</span>
                                    <div class="proportioncontent-left-bar" :class="[item.leftDataNumber=='暂无数据' ? 'proportioncontent-bar-notdata':'']" :style="{width: calc(item.leftScale)}"></div>
                                    <div class="proportioncontent-right-bar" :class="[item.rightDataNumber=='暂无数据' ? 'proportioncontent-bar-notdata':'']" :style="{width: calc(item.rightScale)}"></div>
                                    <span style="z-index: 1;position: absolute; right: 10%;top: -3px;">{{item.rightDataNumber}}&ensp;{{ item.rightDataNumber=='暂无数据' ? '' : `${item.rightScale}%` }}</span>
                                </div>
                                <div class="proportioncontent-item-content-title">{{ item.rightDataName }}</div>
                            </div>
                        </div>
                    </template>
                </Vue3SeamlessScroll>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, getCurrentInstance, inject, reactive,ref,watch, onUnmounted  } from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const { proxy } = getCurrentInstance();
const global = inject('global');
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => new Array()
    },
    title: { // 标题
        type: String,
        default: () => null
    }
})
onMounted(()=> {
    proxy.$nextTick(() => {

    }).then(()=>{
    })
})
const calc = (p) => {
    const bar = document.querySelector(".proportioncontent-item-bar");
    return `${p / 100 * bar?.clientWidth + 5}px`
}
onUnmounted(()=>{
})
</script>
<style scoped>
.proportioncontent-box {
    display: block; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0)); padding:0 14px; padding-top: 4px;
}
.proportioncontent-view {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.proportioncontent-tool { display: flex; color: #FFFFFF; margin-bottom: 10px;}
.proportioncontent-tool .proportioncontent-tool-title { font-size: var(--default-font-size); line-height: 2; flex: 1; }
.proportioncontent-tool.background-image-box { padding-left: 14px;}
.proportioncontent-content {
    flex: 1; overflow: hidden;
}
.proportioncontent-item { display: block; margin-bottom: 10px; }
.proportioncontent-item-title { display: flex; align-items: center; text-align: center; justify-content: center; font-size: var(--medium-font-size); line-height: 3; }
.proportioncontent-item-title img { width: var(--medium-font-size); height: var(--medium-font-size); margin-right: 4px;}
.proportioncontent-item-content { display: flex; font-size: var(--small-font-size); }
.proportioncontent-item-content-title { line-height: 1; }
.proportioncontent-item-bar { flex: 1; position: relative; overflow: hidden; margin: 0 10px; }
.proportioncontent-left-bar,.proportioncontent-right-bar {  position: absolute; border-radius: 20px;  text-align: center; overflow: hidden; height: var(--small-font-size);}
.proportioncontent-left-bar { left: 0; background-image: linear-gradient(to right, rgba(44, 193, 166, 0.9), rgba(0, 183, 255, 1)); }

.proportioncontent-bar-notdata { width: 50% !important; background-image: linear-gradient(to right, rgba(150, 150, 150, 0.21), rgba(150, 150, 150, 1)) !important; }
.proportioncontent-right-bar { right: 0; background-image: linear-gradient(to right, rgba(0, 75, 66, 0.9), rgba(0, 255, 253, 0.86)); }
</style>