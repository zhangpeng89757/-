<template>
    <div class="pei-content-box">
        <div class="pei-content-view">
            <div class="pei-content-tool background-image-box" :style="{backgroundImage:'url('+ global.getAssetsFile('zfbh/right-short.png') +')'}">
                <div class="pei-content-tool-title title-font">{{ title }}</div>
            </div>
            <div :id="uuid" class="pei-content-content"></div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, getCurrentInstance, inject, reactive,ref,watch, onUnmounted  } from 'vue'
import * as echarts from 'echarts';
import { v4 as uuidv4 } from "uuid";
const { proxy } = getCurrentInstance();
const uuid = uuidv4();
const global = inject('global');
let myChart = {};
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => new Array()
    },
    title: { // 数据标题
        type: String,
        default: () => null
    },
    legendPs: { //标注的位置
        type: String,
        default: () => "right"
    },
    unit: { //单位
        type: String,
        default: ""
    },
    backgroundImage: { //标题背景
        type: String,
        default: () => ""
    }
})

const Init = () => {
    let data = JSON.parse(JSON.stringify(props.data.sort((a, b) => b.value - a.value)));
    let showData = data.map((it) => {
        return {
            name: it.name,
            value: it.value, // 值越大，数据差越小 最大值为0.5
        }
    })
    let chartDom = document.getElementById(uuid);
    if(chartDom == undefined) return;
    myChart = echarts.init(chartDom);
    let option = {
        color: ['#4BF9DA', '#315AFF', '#24CBFF', '#FFC851', '#5A5476', '#1869A0', '#FF9393'],
        tooltip: {
            confine: true,
            tooltip: {
                trigger: 'item',
            },
            backgroundColor: "rgba(24, 64, 151, 0.63)",
            borderColor: "rgba(24, 64, 151, 0.63)",
            textStyle: {
                color: "#FFFFFF"
            },
            formatter: (p) => {
                let target = props.data.find((it) => it.name === p.name);
                return `${p.seriesName}</br>${p.marker}${p.name}&emsp;${target.value}`
            }
        },
        legend: {
            top: '1%',
            left: '3%',
            orient: 'vertical',
            icon: 'roundRect',//长方形
            itemWidth: 12,   // 图例标记的图形宽度  
            itemHeight: 4,   // 图例标记的图形高度 在修改图例标记图形的时候可以用到。比如矩形变成直线
            inactiveColor:"#ccc",
            type: 'plain',
            formatter: `{name}` + (props.unit != '' ? ` (${props.unit})` : ''),
            inactiveColor:"#ccc",  //当点击图例关闭后的颜色
            //图例中文字的样式
            textStyle:{
                color:"#fff", //文字的颜色
                fontSize: 12 , //文字的字号
                lineHeight: 14, //行高
            },
        },
        series: [
            {
                hoverAnimation: false, // 取消掉环形图鼠标移上去时自动放大
                name: props.title,
                type: 'pie',
                left: props.legendPs == "right" ? '40%' : '0%',
                top: props.legendPs == "right" ? '0' : '40%',
                radius: ['30%',  props.legendPs == "right" ? '60%' : '60%',],
                avoidLabelOverlap: true,
                label: {
                    color: '#4BF9DA',
                    alignTo: 'edge',
                    margin: 0,
                    // formatter: '{value|{d}%}\n{name|{b} }',
                    formatter: (p) => {
                        let target = props.data.find((it) => it.name === p.name);
                        return `${target.value}\n`
                    },
                    opacity: 1,
                    lineHeight: 20,
                    position: 'outer',
                    rich: {
                        value: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        name: {
                            fontSize: 14,
                        }
                    },
                    distanceToLabelLine: 0
                },
                labelLayout: function (params) {
                    const isLeft = params.labelRect.x < myChart.getWidth() / 2;
                    const points = params.labelLinePoints;
                    points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
                    return {
                        labelLinePoints: points
                    };
                },
                data: showData
            }
        ]
    };
    option && myChart.setOption(option);
}

const resizeChart = () => {
    myChart?.resize?.();
}
watch(()=>props.data, ()=>{
    proxy.$nextTick(() => {

    }).then(()=>{
        setTimeout(() => {
            Init();
        }, 500);
    })
},{
    deep:true,
    immediate: true
})
onMounted(()=> {
    proxy.$nextTick(() => {

    }).then(()=>{
        setTimeout(() => {
            Init();
            window.addEventListener("resize", resizeChart);
        }, 500);
    })
})
onUnmounted(()=>{
    window.removeEventListener("resize", resizeChart);
})
const GetChart = () => {
    return myChart;
}
defineExpose({
	GetChart
})
</script>
<style>
.pei-content-box {
    display: block; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0)); padding: 0 14px; padding-top: 4px;
}
.pei-content-view {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.pei-content-tool { display: flex; color: #FFFFFF; }
.pei-content-tool .pei-content-tool-title { font-size: var(--default-font-size);  line-height: 2; flex: 1; }
.pei-content-tool.background-image-box { background-position: bottom; padding-left:  var(--default-font-size); }
.pei-content-content {
    flex: 1;
}
.pei-content-tool-operate .el-select { width: 80%; float: right; }
.pei-content-tool-operate .el-select .el-input__wrapper { padding: 1px 20px; border-radius: 0; border: 1px solid #38549E; background-color: #142D72;}
.pei-content-tool-operate .el-select .el-input__inner{  color: #A8FAFF;  }
.pei-content-tool-operate .el-select .el-input .el-select__caret{  color: #A8FAFF !important;--el-input-border-color: red; }
.pei-content-tool-operate .el-input {
    --el-input-border-color: #172D68;
}
</style>