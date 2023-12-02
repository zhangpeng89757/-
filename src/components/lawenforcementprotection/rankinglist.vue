<template>
    <div class="rankinglist-box">
        <Vue3SeamlessScroll 
            :list="data"
            :step="0.3"
            v-model="plays"
            :hover="true">
            <div v-for="(item,index) in data" :key="item" class="rankinglist-item" @click="ItemClick(item)">
                <div class="rankinglist-item-req background-image-box number-font" :style="{backgroundImage:'url('+ global.GetImages(index < 3 ? 'redq.png' : 'redbq.png') +')'}">
                    <span>{{ index + 1 }}</span>
                </div>
                <div class="rankinglist-item-box">
                    <div class="rankinglist-item-title">&emsp;{{ item.name }}</div>
                    <div class="rankinglist-item-content">
                        <!-- <div class="rankinglist-item-title">{{ item.type }}</div> -->
                        <div class="rankinglist-item-progress">
                            <div style="position: relative; height: var(--large-font-size);">
                                <div style="position: absolute;word-break: keep-all; word-wrap:normal; z-index: 1; height: var(--small-font-size); line-height: 1;top: 3px;">当年：{{ parseInt(item.dq) }}</div>
                                <div class="rankinglist-progress" :class="GetBgColor(item)" :style="{  width: `${item.wcbl }%` }"></div>
                                <div style="right: 0; position: absolute; word-break: keep-all; word-wrap:normal; z-index: 1; height: var(--small-font-size); line-height: 1;top: 3px;">目标：{{ item.mb }}</div>
                            </div>
                        </div>
                        <div class="rankinglist-item-over number-font">完成：
                            <span :style="{color: GetColor(item)}">{{ item.wcbl }}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Vue3SeamlessScroll>
    </div>
</template>
<script setup>
import { reactive, watch, inject, getCurrentInstance } from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const { proxy } = getCurrentInstance();
const global = inject('global');
const reg = /(?!^)(?=(\d{3})+$)/g;
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => new Array()
    }
})
let plays = true;
const GetBgColor = (item) => {
    if(item.dq / item.mb * 100 > 70) {
        return "rankinglist-progress-color";
    } else if (item.dq / item.mb * 100 > 30) {
        return "rankinglist-progress-color1";
    } else {
        return "rankinglist-progress-color2";
    }
}

const GetColor = (item) => {
    if(item.dq / item.mb * 100 > 70) {
        return "rgba(44, 193, 166, 1)";
    } else if (item.dq / item.mb * 100 > 30) {
        return "rgba(255, 180, 30, 1)";
    } else {
        return "rgba(255, 125, 97, 1)";
    }
}
const ItemClick = (item) => {
    proxy.$emit("toMap", item)
}
</script>
<style scoped>
.rankinglist-box {
    display: block;
    overflow: hidden;
    flex: 1;
    height: 100%;
    width: 100%;
}
.rankinglist-item {
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 10px;
    cursor: pointer;
}

.rankinglist-item-req { 
    width: 40px;
    height: 0;
    padding: 20px 0;
    outline: 20px solid transparent;
    line-height: 0;
    text-align: center;
    margin-right: var(--small-font-size);
}
.rankinglist-item-req span {
    margin-top: -4px;
    font-size: var(--small-font-size);
    display: block;
    font-weight: bold;
}

.rankinglist-item-box { display: flex; flex-direction: column; width: 100%; }
.rankinglist-item-title { font-size: var(--medium-font-size); line-height: 3; }
.rankinglist-item-content { flex: 1; display: flex; align-items: center; padding: 3px 4px; }
.rankinglist-item-progress { font-size: var(--medium-font-size); border-radius: 20px; padding: 0 6px; overflow: hidden; height: 18px; position: relative; flex: 1; background-color: #fff3; text-align: right; margin: 0 4px; }
.rankinglist-progress { text-align: left;  position: absolute; height: 12px; top: 3px; left: 0; border-radius: 20px; font-size: var(--medium-font-size); }
.rankinglist-item-over { margin-left: 4px; width: 85px; word-wrap: normal; display: flex; overflow: hidden; font-size: var(--medium-font-size); align-items: center; }
.rankinglist-item-over span { flex: 1; display: block; width: 60px; overflow: hidden; }
.rankinglist-progress-color { background-image: linear-gradient(to right, rgba(44, 193, 166, 0.5), rgba(44, 193, 166, 1)); }
.rankinglist-progress-color1 { background-image: linear-gradient(to right,rgba(255, 180, 30, 0.5), rgba(255, 180, 30, 1)); }
.rankinglist-progress-color2 { background-image: linear-gradient(to right, rgba(255, 125, 97, 0.5), rgba(255, 125, 97, 1)); }
</style>