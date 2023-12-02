<template>
    <div class="nav-menu">
        <div style="display: flex; align-items: baseline;">
            <div class="background-image-box" 
                :class="checkedIndex == 0 ? 'nav-menu-selected' : ''" 
                :style="{backgroundImage:'url('+ global.GetImages(checkedIndex == 0 ? 'nav-bg-nactive.png' : 'nav-bg.png') +')'}" 
                @click="navClik(0, '/')">
                成果概览
            </div>
            <div class="background-image-box" 
                :class="checkedIndex == 1 ? 'nav-menu-selected' : ''" 
                :style="{backgroundImage:'url('+ global.GetImages(checkedIndex == 1 ? 'nav-bg-nactive.png' : 'nav-bg.png') +')'}" 
                @click="navClik(1, '/targetManage')">
                目标管理
            </div>
            <div class="background-image-box" 
                :class="checkedIndex == 2 ? 'nav-menu-selected' : ''" 
                :style="{backgroundImage:'url('+ global.GetImages(checkedIndex == 2 ? 'nav-bg-nactive.png' : 'nav-bg.png') +')'}" 
                @click="navClik(2, '/innovationcreation')">
                创新创造
            </div>
            <div class="background-image-box" 
                :class="checkedIndex == 3 ? 'nav-menu-selected' : ''" 
                :style="{backgroundImage:'url('+ global.GetImages(checkedIndex == 3 ? 'nav-bg-nactive.png' : 'nav-bg.png') +')'}" 
                @click="navClik(3, '/lawenforcementprotection')">
                执法保护
            </div>
            <div class="background-image-box" 
                :class="checkedIndex == 4 ? 'nav-menu-selected' : ''" 
                :style="{backgroundImage:'url('+ global.GetImages(checkedIndex == 4 ? 'nav-bg-nactive.png' : 'nav-bg.png') +')'}" 
                @click="navClik(4, '/applicationservices')">
                运用服务
            </div>
        </div>
        <div class="nav-menu-sysinfo">
            <div class="nav-play-box" style="color: #4672AA;" @click="Play">
                <img :src="global.GetImages(playState ? 'stop.png' : 'play.png')" style="margin-right: 6px;">
                {{ playState ? '停止' : '播放' }}
            </div>
            <div style="margin-left: 30px;">技术支持：四川中知慧智数据科技股份有限公司</div>
        </div>
    </div>
</template>
<script setup>

import {ref, getCurrentInstance, watch, inject, reactive, onMounted} from "vue"
import { useRouter,onBeforeRouteUpdate } from 'vue-router';
const global = inject('global');
const { proxy } = getCurrentInstance();
const checkedIndex = ref(0)
/**自动播放相关开始 */
const playState = ref(false);
const navClik = (index, url) => {
    playState.value = false;
    checkedIndex.value = index;
    proxy.$router.push(url);
}
const router = useRouter();
watch(() =>router.currentRoute.value,(newValue,oldValue)=> {
    if(newValue.path == "/") {
        checkedIndex.value = 0
    } else if(newValue.path.indexOf("/targetManage") == 0) {
        checkedIndex.value = 1
    } else if(newValue.path.indexOf("/innovationcreation") == 0) {
        checkedIndex.value = 2
    } else if(newValue.path.indexOf("/lawenforcementprotection") == 0) {
        checkedIndex.value = 3
    }else if(newValue.path.indexOf("/applicationservices") == 0) {
        checkedIndex.value = 4
    }
},{ immediate: true })
const Play = () => {
    playState.value = !playState.value;
    //播放
    if(playState.value) {
        proxy.$emit("play", checkedIndex.value)
    } else { //暂停
        proxy.$emit("stop", checkedIndex.value)
    }
}
onMounted(() => {
    Play();
})
//播放下一个页面
const NextPlay = () => {
    if(!playState.value) return;
    if(checkedIndex.value == 4) {
        checkedIndex.value = 0;
    } else {
        checkedIndex.value ++;
    }
    let url = ''
    if(checkedIndex.value == 0) {
        url = '/';
    } else if(checkedIndex.value == 1) {
        url = '/targetManage';
    } else if(checkedIndex.value == 2) {
        url = '/innovationcreation';
    } else if(checkedIndex.value == 3) {
        url = '/lawenforcementprotection';
    } else if(checkedIndex.value == 4) {
        url = '/applicationservices';
    } 
    proxy.$router.push(url);
    setTimeout(() => {
        proxy.$emit("play", checkedIndex.value)
    }, 10000);
}
defineExpose({
	NextPlay
})
/**自动播放相关结束 */
</script>

<style lang="less" scoped>
    .nav-menu {
        z-index: 300;
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 700px;
        left: calc((100% - 700px) / 2);
        bottom: 0;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: 100% auto;    
        background-position-y: 50px;
    }

    .nav-menu .background-image-box { 
        width: 150px;  
        height: 40px;
        line-height: 2;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-origin: border-box;
        text-align: center;
        font-size: var(--default-font-size);
        color: #FFFFFF;
        cursor: pointer;
        z-index: 1;
    }
    .nav-menu-sysinfo { display: flex; align-items: center; justify-content: center; color: #4672AA; font-size: var(--medium-font-size); text-align: center;} 
    .nav-menu .nav-menu-selected { text-shadow: 1px 1px 8px #FFFFFF5A; font-size: var(--large-font-size);  height: 50px; width: 150px; }
    .nav-menu .nav-menu-selected.background-image-box:nth-child(2), .nav-menu .nav-menu-selected.background-image-box:nth-child(3), .nav-menu .nav-menu-selected.background-image-box:nth-child(4) { top: -4px; }
    .nav-play-box { color: #4672AA; font-size: var(--default-font-size); display: flex; align-items: center; cursor: pointer; margin: 10px 0; }
    .nav-play-box img { width: var(--large-font-size); height: var(--large-font-size);}
</style>
