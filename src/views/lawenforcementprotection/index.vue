<template>
    <div class="content-view">
        <!-- <Baidumap ref="baiduMap"></Baidumap> -->
        <!-- <dyMap ref="echarts-deyangMap"></dyMap> -->
        <Luokuangmap ref="luokuang-deyangMap"></Luokuangmap>
        <div class="zfbh-head-top" ref="topbox">
            <div class="zfbh-head-top-item background-image-box" :style="{backgroundImage:'url('+ global.GetImages('zfbh-c-b.png') +')'}">
                <div class="zfbh-letf-item-image-box">
                    <el-image :src="global.GetImages('zfbh-top1.png')" fit="contain" />
                </div>
                <div class="zfbh-letf-item-content">
                    <div class="number-font" @click="turnToPage">{{ viewObj.headTopData.no1.count?.toLocaleString() }}</div>
                    <div>当年案件量</div>
                    <div>监督检查：<span class="number-font">{{ viewObj.headTopData.no1.data1?.toLocaleString() }}</span>&emsp;举报投诉：<span>{{ viewObj.headTopData.no1.data2?.toLocaleString() }}</span></div>
                </div>
            </div>
            <div  class="zfbh-head-top-item background-image-box" :style="{backgroundImage:'url('+ global.GetImages('zfbh-c-b.png') +')'}">
                <div class="zfbh-letf-item-image-box">
                    <el-image :src="global.GetImages('zfbh-top2.png')" fit="contain" />
                </div>
                <div class="zfbh-letf-item-content">
                    <div class="number-font" @click="turnToPage">{{ viewObj.headTopData.no2.count?.toLocaleString() }}</div>
                    <div>当年立案量</div>
                    <div>已结案量：<span class="number-font">{{ viewObj.headTopData.no2.data1?.toLocaleString() }}</span></div>
                </div>
            </div>
           
            <div  class="zfbh-head-top-item background-image-box" :style="{backgroundImage:'url('+ global.GetImages('zfbh-c-b.png') +')'}">
                <div class="zfbh-letf-item-image-box">
                    <el-image :src="global.GetImages('zfbh-top4.png')" fit="contain" />
                </div>
                <div class="zfbh-letf-item-content">
                    <div class="number-font" @click="turnToPage">{{ viewObj.headTopData.no4.count?.toLocaleString() }}</div>
                    <div>当年结案量</div>
                    <div>行政处罚：<span class="number-font">{{ viewObj.headTopData.no4.data1?.toLocaleString() }}</span></div>
                </div>
            </div>
            <!-- <div  class="zfbh-head-top-item background-image-box" :style="{backgroundImage:'url('+ global.GetImages('zfbh-c-b.png') +')'}">
                <div class="zfbh-letf-item-image-box">
                    <el-image :src="global.GetImages('zfbh-top5.png')" fit="contain" />
                </div>
                <div class="zfbh-letf-item-content">
                    <div class="number-font" @click="turnToPage">{{ viewObj.headTopData.no5.count?.toLocaleString() }}</div>
                    <div>当年春雷行动主动发现线索</div>
                    <div>已结案件量：<span class="number-font">{{ viewObj.headTopData.no5.data1?.toLocaleString() }}</span></div>
                </div>
            </div> -->
            <div :span="4" class="zfbh-head-top-item background-image-box" :style="{backgroundImage:'url('+ global.GetImages('zfbh-c-b.png') +')'}">
                <div class="zfbh-letf-item-image-box">
                    <el-image :src="global.GetImages('zfbh-top6.png')" fit="contain" />
                </div>
                <div class="zfbh-letf-item-content">
                    <div class="number-font" @click="turnToPage">{{ viewObj.headTopData.no6.count?.toLocaleString() }}</div>
                    <div>当年累积案值金额 <span>（万元）</span></div>
                    <div>罚款金额：<span class="number-font">{{ viewObj.headTopData.no6.data1?.toLocaleString() }}</span>&emsp;没收金额：<span>{{ viewObj.headTopData.no6.data2?.toLocaleString() }}</span></div>
                </div>
            </div>
            <div  class="zfbh-head-top-item background-image-box" :style="{backgroundImage:'url('+ global.GetImages('zfbh-c-b.png') +')'}">
                <div class="zfbh-letf-item-image-box">
                    <el-image :src="global.GetImages('zfbh-top3.png')" fit="contain" />
                </div>
                <div class="zfbh-letf-item-content">
                    <div class="number-font" @click="turnToPage">{{ viewObj.headTopData.no3.count?.toLocaleString() }}</div>
                    <div>当年调解案件量</div>
                    <div>调解已结案件量：<span class="number-font">{{ viewObj.headTopData.no3.data1?.toLocaleString() }}</span></div>
                </div>
            </div>
        </div>
        <div :class="['zfbh-body-left-box', 'model-backgroud', viewObj.showLeft ? 'left-show' : 'left-hide']" ref="leftbox" style="height: 770px;">
            <titlebar content="执法保护目标">
                <!-- TODO  目标和完成需要删除 重写样式 -->
                <template #tools>
                    <div :class="['left-showhide-box', viewObj.showLeft ? 'left-show-box' : 'left-hide-box']" @click="showHideLeft">
                        <el-icon size="1rem">
                            <ArrowLeft v-if="viewObj.showLeft"/>
                            <ArrowRight v-else />
                        </el-icon>
                    </div>
                </template>
            </titlebar>
            <div class="zfbh-body-left-content">
                <div style="display: flex; font-size: var(--default-font-size); color: #fff; align-items: flex-end;">
                    <div style="flex: 1;">德阳市旌阳区市场监督管理局</div>
                    <div style="font-size: var(--small-font-size); display: flex; align-items: center;">
                        <span style="display: block; width: 18px; height: 4px; border-radius: 4px; background-color: rgba(38, 255, 203, 1); margin-right: 10px; box-shadow: 5px 5px 10px 0px rgba(38, 255, 203, 0.5);"></span>
                        当年案件量(件)
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 6px;">
                    <div class="zfbh-body-left-item">
                        <div class="background-image-box zfbh-body-left-item-img" :style="{backgroundImage:'url('+ global.GetImages('zfbh-left-bg1.png') +')'}">
                            <span class="number-font">{{ viewObj.leftData.xsmb?.toLocaleString() }}</span>
                        </div>
                        <div class="zfbh-body-left-item-title">案件目标</div>
                    </div>
                    <div class="zfbh-body-left-item" >
                        <div class="background-image-box zfbh-body-left-item-img" :style="{backgroundImage:'url('+ global.GetImages('zfbh-left-bg1.png') +')'}">
                            <span class="number-font" style="color: #34FFDA;">{{ viewObj.leftData.dnxszl?.toLocaleString() }}</span>
                        </div>
                        <div class="zfbh-body-left-item-title">当年案件办理总量</div>
                    </div>
                    <div class="zfbh-body-left-item">
                        <Shield style="height: 65px; width: 65px;" :data="viewObj.leftData.mbdcl"></Shield>
                        <div class="zfbh-body-left-item-title">目标达成率</div>
                    </div>
                </div>
                <Rankinglist @toMap="DisplayToMap" style="flex: 1; overflow: hidden; margin-top: 6px;" :data="getLawEnforcementTargetData()"></Rankinglist>
            </div>
        </div>
        <div class="zfbh-body-right-box model-backgroud" ref="rightbox" style="width: 440px; height: 770px;display: flex;flex-direction: column;">
            <titlebar content="典型案例"></titlebar>
            <RightContent></RightContent>
        </div>
        <div ref="mapTopBox" style="position: absolute; width: 100px; height: 40px; left: 0; bottom: 0; z-index: 401; background-color: #01010b;"></div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted, onBeforeUnmount, ref, getCurrentInstance} from "vue"
import titlebar from '@/components/titlebar.vue'
import Shield from '@/components/echarts/shield.vue'
import Luokuangmap from "@/components/luokuangmap.vue"
import Rankinglist from '@/components/lawenforcementprotection/rankinglist.vue'
import RightContent from '@/components/lawenforcementprotection/rightcontent.vue'
import {getTopCountData,getLawEnforcementTargetData,getCaseTrends,getClueSourceAnalysisData,getCaseTypeAnalysisData,getClueRegisterRatioData} from '@/api/lawenforcementprotection'
import { filledNullNumber } from '@/SystemCom/DataDeal'
const { proxy } = getCurrentInstance();
const global = inject('global');
const viewObj = reactive({
    //头部数据
    headTopData: {
        no1: {
           count: 1622,
           data1: 1000,
           data2: 1000 
        },
        no2: {
           count: 1622,
           data1: 1000,
        },
        no3: {
           count: 1234,
           data1: 1000,
        }
        ,
        no4: {
           count: 456789,
           data1: 1000,
        }
        ,
        no5: {
           count: 897456,
           data1: 1000,
        },
        no6: {
           count: 123456,
           data1: 1000,
           data2: 1000 
        },
    },
    //左边数据
    leftData: {
        xsmb: 1024,
        dnxszl: 2048,
        mbdcl: 60
    },
    //左边是否显示
    showLeft: true,
})
const leftbox=ref()
const rightbox=ref()
const topbox=ref();
const mapTopBox=ref();
const showHideLeft = () => {
    viewObj.showLeft = !viewObj.showLeft;
}

const turnToPage = () => {
    // TODO 地址还要加参数 等参数
    let tempwindow = window.open('_blank'); // 防止被拦截
    tempwindow.location = jgsUrl; 
}

onMounted(()=>{
    // 初始化头部数据
    getTopCountData().then(res => {
        let resData = res.data;
        viewObj.headTopData.no1.count = filledNullNumber(resData.clueTotal);
        viewObj.headTopData.no1.data1 = filledNullNumber(resData.proactivelyDiscoverNum);
        viewObj.headTopData.no1.data2 = filledNullNumber(resData.complaintsReportNum);
        viewObj.headTopData.no2.count = filledNullNumber(resData.tmRegisterTotal);
        viewObj.headTopData.no2.data1 = filledNullNumber(resData.registerCloseNum);
        viewObj.headTopData.no3.count = filledNullNumber(resData.mediateNum);
        viewObj.headTopData.no3.data1 = filledNullNumber(resData.resolvedNum);
        viewObj.headTopData.no4.count = filledNullNumber(resData.closeCaseNum);
        viewObj.headTopData.no4.data1 = filledNullNumber(resData.punishNum);
        viewObj.headTopData.no5.count = filledNullNumber(resData.activeClueNum);
        viewObj.headTopData.no5.data1 = filledNullNumber(resData.resolvedActiveClueNum);
        viewObj.headTopData.no6.count = filledNullNumber(resData.totalAmount);// 待定
        viewObj.headTopData.no6.data1 = filledNullNumber(resData.punishAmount);// 待定
        viewObj.headTopData.no6.data2 = filledNullNumber(resData.confiscateAmount);// 待定
        viewObj.leftData.xsmb = resData.clueTargetNum;
        viewObj.leftData.dnxszl = resData.clueTotal;
        viewObj.leftData.mbdcl = resData.targetReachNum;
    });
    const body = document.querySelector(".wrapper");
    if (body.append) {
        body.append(leftbox.value);
        body.append(rightbox.value);
        body.append(topbox.value);
        body.append(mapTopBox.value);
    } else {
        body.appendChild(leftbox.value);
        body.appendChild(rightbox.value);
        body.appendChild(topbox.value);
        body.append(mapTopBox.value);
    }
})
onBeforeUnmount(()=> {
    leftbox.value.remove();
    rightbox.value.remove();
    topbox.value.remove();
    mapTopBox.value.remove();
})
/**自动播放相关开始 */
/**获取要播放的组件*/
const GetPlayCom = (reslove) => {
    let playCom = [];
    for(var item in proxy.$refs) {
        if(item.indexOf("luokuang-deyangMap") == 0) {
            playCom.push(proxy.$refs[item].GetMap());
        }
    }
    reslove(playCom)
}
//跳转到地图显示
const DisplayToMap = (item) => {
    console.log(proxy.$refs["luokuang-deyangMap"])
    proxy.$refs["luokuang-deyangMap"].DisplayToMap(item);
}
defineExpose({
	GetPlayCom
})
/**自动播放相关结束 */
</script>
<style scoped>
    .content-view { z-index: 6; flex: 1; position: relative; overflow: hidden; display: flex; flex-direction: column; margin-top: 30px; margin-bottom: 30px; z-index: 3;}
    .zfbh-head-top { box-sizing: border-box;  overflow: hidden; display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: 1; gap: 40px; padding: 0 10px; z-index: 300; width: 100%; left: 0; top: 140px; position: absolute; z-index: 300;}
    .zfbh-head-top-item { display: flex; overflow: hidden; align-items: center; padding: 0 1%; height: 100px; cursor: pointer;}
    .zfbh-letf-item-image-box {  overflow: hidden; box-sizing: border-box; height: 80px; width: 80px; }
    .zfbh-letf-item-content { flex: 1;  display: flex; flex-direction: column; justify-content:center; margin-left: var(--small-font-size);}
    .zfbh-letf-item-content div:nth-child(1) { color: #FFC757; font-size: var(--large-font-size); flex: 1; line-height: 1.5; }
    .zfbh-letf-item-content div:nth-child(2) { color: #90D7FC; font-size: var(--medium-font-size); flex: 1; line-height: 1.5; }
    .zfbh-letf-item-content div:nth-child(3) { color: #90D7FC; font-size: var(--small-font-size);  flex: 1; line-height: 1.5; }
    .zfbh-letf-item-content div:nth-child(3) span { color: #FFFFFF; }

    .zfbh-body-left-box,.zfbh-body-right-box { width: 470px; height: calc(100% - 280px); position: absolute; z-index: 100; }
    .zfbh-body-left-box { left: 10px; top: 260px;  display: flex; flex-direction: column;}
    .zfbh-body-right-box { right: 10px; top: 260px; }

    .zfbh-body-left-content { display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; background-color: rgba(18, 17, 91, 0.8); flex: 1; overflow: hidden; padding: 10px; }
    .zfbh-body-left-item { display: flex; flex-direction: column; align-items: center; margin: 10px 0; }
    .zfbh-body-left-item-img { font-size: var(--large-font-size);  text-align: center; width: 72px; height: 65px; font-weight: bold;}
    .zfbh-body-left-item-title { font-size: var(--small-font-size); }

    .zfbh-body-left-box .left-showhide-box { color:#FFFFFF;   display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;}
    .zfbh-body-left-box .left-showhide-box:hover { color: rgb(38, 255, 203); }
    .zfbh-body-left-box.left-hide .left-showhide-box { 
        position: absolute; 
        animation: showHideBtnAnimate 1.5s linear 1 forwards; 
    }
    .zfbh-body-left-box.left-show { animation: showAnimate 1.5s linear 1 forwards; }

    .zfbh-body-left-box.left-hide { animation: hideAnimate 1.5s linear 1 forwards; }

    @keyframes hideAnimate {
        0% {
            left: 10px;
        }
        50%,
        100% {
            left: -490px;
        }
    }
    @keyframes showAnimate {
        0% {
            left: -490px;
        }
        50%,
        100% {
            left: 10px;
        }
    }
    @keyframes showHideBtnAnimate {
        0% {
            right: 0px;
            top: 1px;
            width: 30px; 
            height: 30px; 
        }
        50%,
        100% {
            right: -50px;
            background-color: #15145C; 
            width: 30px; 
            height: 30px; 
            top: 1px;
        }
    }
</style>