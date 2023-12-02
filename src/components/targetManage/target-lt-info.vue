<!--目标坐上详情-->
<template>
    <div class="target-lt-info-box">
        <div class="target-lt-info-item">
            <div class="target-lt-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="target-lt-info-item-title-box-title title-font">{{ components.leftCom.title }}  {{ components.leftCom.total ? `(${components.leftCom.total})` : '' }}</div>
            </div>
            <component :otherObject="components.leftCom?.otherObject" :showTitle="false" :is="components.leftCom.com" :data="components.leftCom.data" :tablePaddingLeft="components.leftCom.tablePaddingLeft"></component>
        </div>
        <div class="target-lt-info-item">
            <div class="target-lt-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="target-lt-info-item-title-box-title title-font">
                    <div style="flex: 1;">{{ components.centerCom.title }} {{ components.centerCom.total ? `(${components.centerCom.total})` : '' }}</div><div v-html="components.centerCom?.link"></div>
                </div>
            </div>
            <component :otherObject="components.centerCom?.otherObject" :showTitle="false" :is="components.centerCom.com" :columns="components.centerCom.columns" :data="components.centerCom.data" :tablePaddingLeft="components.centerCom.tablePaddingLeft"></component>
        </div>
        <div class="target-lt-info-item">
            <div class="target-lt-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="target-lt-info-item-title-box-title title-font">
                    <div style="flex: 1;">{{ components.rightCom.title }} {{ components.rightCom.total ? `(${components.rightCom.total})` : '' }}</div><div v-html="components.rightCom?.link"></div>
                </div>
            </div>
            <component :otherObject="components.rightCom?.otherObject" :showTitle="false" :is="components.rightCom?.com" :data="components.rightCom?.data" :columns="components.rightCom?.columns" :tablePaddingLeft="components.rightCom.tablePaddingLeft"></component>
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
        if(props.leftCom != null && props?.leftCom?.comname != null) {
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
.target-lt-info-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px;
    overflow: hidden;
}
.target-lt-info-item { display: flex; flex-direction: column; overflow: hidden;}

.target-lt-info-item-title-box { display: flex; color: #FFFFFF; margin-bottom: 10px;}
.target-lt-info-item-title-box.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: 10px; }
.target-lt-info-item-title-box .target-lt-info-item-title-box-title {  font-size: var(--default-font-size);  line-height: 2; flex: 1; display: flex; }
</style>