<!--中间详情-->
<template>
    <div class="center-top-info-box" :style="{gridTemplateColumns: `repeat(${components.columnNumber}, 1fr)`}">
        <div class="center-top-info-item">
            <div class="center-top-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="center-top-info-item-title-box-title title-font">{{ components.leftCom.title }}</div>
            </div>
            <component :showTitle="false" :is="components.leftCom.com" :data="components.leftCom.data" :columns="components.leftCom.columns"></component>
        </div>
        <div class="center-top-info-item" v-if="components.centerCom.com != null">
            <div class="center-top-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="center-top-info-item-title-box-title title-font">{{ components.centerCom.title }}</div>
            </div>
            <component :showTitle="false" :is="components.centerCom.com" :columns="components.centerCom.columns" :data="components.centerCom.data"></component>
        </div>
        <div class="center-top-info-item" v-if="components.rightCom.com != null">
            <div class="center-top-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="center-top-info-item-title-box-title title-font">{{ components.rightCom?.title }}</div>
            </div>
            <component :showTitle="false" :is="components.rightCom?.com" :data="components.rightCom?.data" :columns="components.rightCom?.columns"></component>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject } from 'vue'
import Scrolltable from '@/components/table/scrolltable.vue'
import Bar from '@/components/echarts/bar.vue'
import StereoscopicBar from '@/components/echarts/stereoscopic-bar.vue'
import StereoscopicPei from '@/components/echarts/stereoscopic-pei.vue'
import Targetline from '@/components/echarts/targetline.vue'
const global = inject('global');
const { proxy } = getCurrentInstance();
//左中右组件对象
const components = reactive({
    columnNumber: 0,
    leftCom: {
        com: null,
        data: null,
        title: ""
    },
    centerCom: {
        com: null,
        data: null,
        title: ""
    },
    rightCom: {
        com: null,
        data: null,
        title: ""
    },
})
/**定义父组件传参开始 */
const props = defineProps({
    leftCom: { //数据 { comname: '组件名称', data: '数据' }
        type: Object,
        default: null
    },
    centerCom: { //数据{ comname: '组件名称', data: '数据' }
        type: Object,
        default: null
    },
    rightCom: { //数据{ comname: '组件名称', data: '数据' }
        type: Object,
        default: null
    },
})
let resaveData = () => {
    components.leftCom = {
        com: null,
        data: null,
        title: ""
    };
    components.centerCom = {
        com: null,
        data: null,
        title: ""
    };
    components.rightCom = {
        com: null,
        data: null,
        title: ""
    };
}
watch(()=>props, ()=>{
    proxy.$nextTick(() => {
        resaveData();
        let columnNumber = 0;
        if(props.leftCom != null && props?.leftCom?.comname != null) {
            columnNumber++;
            if(typeof(props?.leftCom?.comname) === "string") {
                components.leftCom.com = getCom(props?.leftCom?.comname)
            } else {
                components.leftCom.com = props?.leftCom?.comname;
            }
            components.leftCom = Object.assign(components.leftCom, props.leftCom)
        }else {
            components.leftCom =  {
                com: null,
                data: null,
                title: ""
            };
        }
        if(props.centerCom != null && props?.centerCom?.comname != null) {
            columnNumber++;
            if(typeof(props?.centerCom?.comname) === "string") {
                components.centerCom.com = getCom(props?.centerCom?.comname)
            } else {
                components.centerCom.com = props?.centerCom?.comname;
            }
            components.centerCom = Object.assign(components.centerCom, props.centerCom)
        }else {
            components.centerCom =  {
                com: null,
                data: null,
                title: ""
            };
        }
        if(props.rightCom != null && props?.rightCom?.comname != null) {
            columnNumber++;
            if(typeof(props?.rightCom?.comname) === "string") {
                components.rightCom.com = getCom(props?.rightCom?.comname)
            } else {
                components.rightCom.com = props?.rightCom?.comname;
            }
            components.rightCom = Object.assign(components.rightCom, props.rightCom)
        } else {
            components.rightCom =  {
                com: null,
                data: null,
                title: ""
            };
        }
        components.columnNumber = columnNumber;
    })
},{
    deep:true,
    immediate: true
})
let getCom = (comname) => {
    if (comname == 'Scrolltable') {
        return Scrolltable;
    } else if (comname == 'StereoscopicBar') {
        return StereoscopicBar;
    } else if (comname == 'Line') {
        return Targetline;
    } else if (comname == 'StereoscopicPei') {
        return StereoscopicPei;
    } else if (comname == 'Bar') {
        return Bar;
    } 
}
</script>
<style scoped>
.center-top-info-box {
    display: grid;
    gap: 20px;
    overflow: hidden;

}
.center-top-info-item { display: flex; flex-direction: column; overflow: hidden;}

.center-top-info-item-title-box { display: flex; color: #FFFFFF; margin-bottom: 10px;}
.center-top-info-item-title-box.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: 10px; }
.center-top-info-item-title-box .center-top-info-item-title-box-title {  font-size: var(--default-font-size);  line-height: 2; flex: 1; }
</style>