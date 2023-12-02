<!--目标坐上详情-->
<template>
    <div class="target-lb-info-box" :style="{gridTemplateColumns: `repeat(${components.columnNumber}, 1fr)`}">
        <div class="target-lb-info-item">
            <div class="target-lb-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="target-lb-info-item-title-box-title title-font">{{ components.leftCom.title }}</div>
            </div>
            <component :otherObject="components.leftCom?.otherObject" :showTitle="false" :is="components.leftCom.com" :data="components.leftCom.data" :tablePaddingLeft="components.leftCom.tablePaddingLeft"></component>
        </div>
        <div class="target-lb-info-item" v-if="components.centerCom.com != null">
            <div class="target-lb-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="target-lb-info-item-title-box-title title-font">
                    <div style="flex: 1;">{{ components.centerCom.title }} {{ components.centerCom.total ? `(${components.centerCom.total})` : '' }}</div>
                    <el-tooltip v-if="components.centerCom.title === '价值较高专利挖掘'" placement="left" effect="light" content="专利价值评价：根据知识产权出版社专利价值算法计算得出，本列表为分数较高的专利，可着重关注以下列表专利。">
                        <div style="font-size: 0.8rem; display: flex; align-items: center; cursor: pointer;">
                            <el-icon size="1rem">
                                <QuestionFilled />
                            </el-icon>数据来源
                        </div>
                    </el-tooltip>
                    <div v-else v-html="components.centerCom?.link"></div>
                </div>
            </div>
            <component :otherObject="components.centerCom?.otherObject" :showTitle="false" :is="components.centerCom.com" :columns="components.centerCom.columns" :data="components.centerCom.data" :height="330" :tablePaddingLeft="components.centerCom.tablePaddingLeft"></component>
        </div>
        <div class="target-lb-info-item" v-if="components.rightCom.com != null">
            <div class="target-lb-info-item-title-box background-image-box" :style="{backgroundImage:'url('+ global.GetImages('echart-t-bg.png') +')'}">
                <div class="target-lb-info-item-title-box-title title-font">
                    <div style="flex: 1;">{{ components.rightCom.title }} </div><div v-html="components.rightCom?.link"></div>
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
// import titlebar from '@/components/titlebar.vue'
import { min } from 'xe-utils'
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
.target-lb-info-box {
    display: grid;
    gap: 20px;
    overflow: hidden;

}
.target-lb-info-item { display: flex; flex-direction: column; overflow: hidden;}

.target-lb-info-item-title-box { display: flex; color: #FFFFFF; margin-bottom: 25px;}
.target-lb-info-item-title-box.background-image-box { background-size: 100% auto; background-position: bottom; padding: 6px 14px 2px 0; }
.target-lb-info-item-title-box .target-lb-info-item-title-box-title {  font-size: var(--default-font-size);  line-height: 32px; flex: 1; display: flex;}
</style>