<template>
    <div class="wrapper" v-if="showFlag" :style="{backgroundImage:'url('+ global.GetImages('sys-bg.jpg') +')'}">
        <Header @changs="changs"></Header>
        <div class="animation">
            <router-view v-slot="{ Component }" name="mainRouter">
                <transition :name="transitionName">
                    <component ref="Component" :is="Component" />
                </transition>
            </router-view>
        </div>
        <Menu ref="menu" class="menu" @play="play" @stop="stop"></Menu>
    </div>
    <div class="wrapper"  v-else>
      <knowledgeScreenHeader></knowledgeScreenHeader>
      <router-view v-slot="{ Component }" name="mainRouter">
                <transition :name="transitionName">
                    <component ref="Component" :is="Component" />
                </transition>
            </router-view>
    </div>
</template>
<script setup>
import { RouterLink, useRouter,  } from 'vue-router';
import { ref, inject, getCurrentInstance} from 'vue';
import Menu from './components/menu.vue'
import Header from './components/header.vue'
import knowledgeScreenHeader from './components/knowledgeScreenHeader.vue'

import { PlayEcharts, StopPlayEcharts } from './SystemCom/echartsplayer'
import { PlayLuoKuangMap, StopPlayLuoKuangMap } from './SystemCom/luokuangmapplayer'
import { StopPlayData, PlayData } from './SystemCom/displayData'
const { proxy } = getCurrentInstance();
const global = inject('global');
let transitionName = ref();
let showFlag = ref(true)//控制公共头部跟背景切换
let router = useRouter();
const menu = ref(null)
const changs = ()=>{
  showFlag.value= false
}
router.beforeEach((to, from) => {
  console.log(to,"9999999999999")
  if(to.fullPath != "/knowledgeScreen"){
    showFlag.value = true
  }else{
    showFlag.value = false

  }
    if (to.meta.index > from.meta.index) {
        transitionName.value = 'slide-right';
    } else if (to.meta.index < from.meta.index) {
        transitionName.value = 'slide-left';
    } else {
        transitionName.value = '';
    }
});
const playerState = ref(false);
const stop = () => {
    playerState.value = false;
    StopPlayEcharts();
    StopPlayLuoKuangMap();
    StopPlayData();
}
const play = () => {
    playerState.value = true;
    new Promise(relove => { 
        setTimeout(() => {
            if(proxy.$refs.Component?.GetPlayCom) {
                proxy.$refs.Component?.GetPlayCom?.(relove);
            } else {
                //假如页面没有提供播放组件，则10秒后跳过
                setTimeout(()=>{
                    menu.value.NextPlay();
                }, 10000)
            }
        }, 3000);
        
    }).then(res => {
        playCom(res);
    })
}
//播放组件
const playCom = (res, index = 0) => {
    // debugger
    if(playerState.value) {
        new Promise(resolve => {
            if (res[index]?.type == 'PlayData') {
                PlayData(res[index], resolve);
            } else
            if(res[index]?.type == 'luokuangmap') {
                PlayLuoKuangMap(res[index], resolve);
            } else {
                PlayEcharts(res[index], resolve);
            }
        }).then(()=>{ //组件播放完成
            index += 1;
            //假如没有播完继续下一个
            if(index < res.length) {
                playCom(res, index);
            } else { //假如播放完毕
                menu.value.NextPlay();
            }
        })
    } else {
        StopPlayEcharts();
        StopPlayData();
        StopPlayLuoKuangMap();
    }
}
</script>
<style scoped>
    .wrapper {
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        flex: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    .animation {
        display: flex;
        height: calc(100% - 110px);
        max-height: calc(100% - 110px);
        min-height: calc(100% - 110px);
        overflow: hidden;
        box-sizing: border-box;
        margin-top: -30px;
    }
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition: transform 1s;
    }
    .slide-right-enter-from {
        transform: translateX(0);
    }
    .slide-right-enter-to {
        transform: translateX(-100%);
    }
    .slide-right-leave-from {
        transform: translateX(0);
    }
    .slide-right-leave-to {
        transform: translateX(-100%);
    }
    .slide-left-enter-from {
        transform: translateX(-200%);
    }
    .slide-left-enter-to {
        transform: translateX(-100%);
    }
</style>