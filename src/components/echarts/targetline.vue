<template>
    <div class="targetline-content-box">
        <div class="targetline-total-mb">总目标: <span class="number-font">{{ viewObject.totalTargetNums }}</span></div>
        <div :id="uuid" class="targetline-content-content"></div>
    </div>
</template>
<script setup>
import { onMounted, getCurrentInstance, inject, reactive,ref,watch, onUnmounted  } from 'vue'
import * as echarts from 'echarts';
import { v4 as uuidv4 } from "uuid";
const { proxy } = getCurrentInstance();
const uuid = uuidv4();
//echarts对象
let myChart = null;
//X轴单位
let xUnit = ""; 
//Y轴单位
let yUnit = "";
/**页面对象 */
const viewObject = reactive({
    checkDataKey: "", //当前选中的数据KEY
    showData: [], //要显示的数据
    showTool: false, //是否显示选择框
    showObj: {}, //显示的对象
    totalTargetNums: 0,
})
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => new Array()
    },
})

/**颜色配置 */
const chartColorConfigs = [
    {
        lineColor: [ {offset: 0, color: 'rgba(132, 167, 255, 0.0001)'}, {offset: 0.25, color: 'rgba(2, 198, 255, 1)' }, {offset: 0.75, color: 'rgba(3, 104, 255, 1)'}, {offset: 1, color: 'rgba(2, 140, 255, 0.26)'}], //折线颜色
        areaCOlor: [ {offset: 0, color: 'rgba(27, 90, 183, 0.502)'}, {offset: 1, color: 'rgba(27, 90, 183, 0.0)'}] //折线到底部的颜色
    },
    {
        lineColor: [ {offset: 0, color: 'rgba(255, 255, 255, 0.0001)'}, {offset: 0.25, color: 'rgba(95, 255, 226, 1)' }, {offset: 0.75, color: 'rgba(95, 255, 226, 1)'}, {offset: 1, color: 'rgba(95, 255, 226, 0.2)'}], //折线颜色
        areaCOlor: [ {offset: 0, color: 'rgba(5, 198, 196, 0.17)'}, {offset: 1, color: 'rgba(255, 255, 255, 0)'}] //折线到底部的颜色
    },
    {
        lineColor: [ {offset: 0, color: 'rgba(255, 255, 255, 0.0001)'}, {offset: 0.25, color: 'rgba(255, 224, 176, 1)' }, {offset: 0.75, color: 'rgba(255, 215, 136, 1)'}, {offset: 1, color: 'rgba(255, 199, 167, 0.35)'}], //折线颜色
        areaCOlor: [ {offset: 0, color: 'rgba(198, 162, 34, 0.31)'}, {offset: 1, color: 'rgba(255, 255, 255, 0)'}] //折线到底部的颜色
    }
]
const Init = () => {
    var chartDom = document.getElementById(uuid);
    if(chartDom == undefined) return;
    myChart = echarts.init(chartDom, 'dark', {
        useDirtyRect: true
    });
    let legendData = ["当年现状", "当年目标"];
    let yData = [];
    let xData = [];
    let series = [];
    let xzLines = [];
    let mbLines = [];
    viewObject.totalTargetNums = 0;
    for (let index = 0; index < viewObject?.showData?.length; index++) {
        const element = viewObject.showData[index];
        // const targetNums = Number(element.targetNums) == -1 ? '-' :element.targetNums
        xData.push(element.yearly + "年");
        xzLines.push(element.targetNums);
        mbLines.push(element.currentNums);
        yData.push(element.targetNums);
        yData.push(element.currentNums);
        viewObject.totalTargetNums = element.targetNums;
    }
    series.push(CreateSeries(xzLines, legendData[1], chartColorConfigs[0]))
    series.push(CreateSeries(mbLines, legendData[0], chartColorConfigs[1]))
    
    let sortArray = JSON.parse(JSON.stringify(yData)).sort((a, b) => b - a);
    let maxValue = sortArray[0];
    var option = {
        backgroundColor: '',
        max: maxValue + parseInt(maxValue / sortArray.length),
        legend: {
            icon: 'roundRect',//长方形
            itemWidth: 16,   // 图例标记的图形宽度  
            itemHeight: 4,   // 图例标记的图形高度 在修改图例标记图形的时候可以用到。比如矩形变成直线
            inactiveColor:"#ccc",
            top: 10,
            right: 20,
            type: 'plain',
            formatter:`{name}${xUnit != '' ? ` (${xUnit})` : ''}`,
            inactiveColor:"#ccc",  //当点击图例关闭后的颜色
            //图例中文字的样式
            textStyle:{
                color:"#fff", //文字的颜色
                fontSize: 12 , //文字的字号
                lineHeight: 20, //行高
            },
            data: legendData
        },
        tooltip: {
            confine: true,
            tooltip: {
                trigger: 'axis',
            },
            formatter: (val) =>{
                let str = val[0].axisValue + '</br>'
                val.forEach(val => {
                    const valueReal = val.value == -1 ? '-' : val.value
                    str += `${val.marker}${val.seriesName}：    ${valueReal}</br>`
                });
                return str
            },
            backgroundColor: "rgba(24, 64, 151, 0.63)",
            borderColor: "rgba(24, 64, 151, 0.63)",
            textStyle: {
                color: "#FFFFFF",
                fontSize: 12 , //文字的字号
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#2079A03D" //X轴颜色
                }
            },
            axisPointer: {
                type: 'line',
                z: 0,
                snap: true,
                lineStyle: {
                    color: ' rgba(176, 216, 245, 0.2)',
                    opacity: 1,
                    width: 3,
                    type: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 30,
                    shadowOffsetX: 30,
                },
                label: {
                    show: false,
                },
                triggerEmphasis: true,
                triggerTooltip: true,
                handle: {
                    show: true,
                    color: '#7581BD'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(122, 173, 255, 1)"
                }
            },
            data: xData
        },
        yAxis: {
            name: yUnit,
            type: 'value',
            nameGap: 20,
            offset: 0,
            nameTextStyle: {
                color: '#FFFFFF'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#2079A03D" //Y轴颜色
                }
            },
            axisLabel: { 
                textStyle: { 
                    show:true,
                    fontFamily:'微软雅黑',
                    color: "#fff",
                },      
                interval: (index, value) => {
                    return value > 250;
                },                     
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#2079A03D" //Y轴颜色
                }
            }
        },
        dataZoom: [
            {
                type: 'inside',
                throttle: 50
            }
        ],
        series: series
    };

    option && myChart.setOption(option);
}
/**
 * 生成一条折线数据
 * @param {*} data 数据
 * @param {*} name 名称
 * @param {*} chartColorConfig  //颜色配置
 */
const CreateSeries = (data, name = "", chartColorConfig = chartColorConfigs[0]) =>{
    console.log(name)
    return {
        name: name,
        type: 'line',
        smooth: false, //是否曲线显示
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        // tooltip: {
        //     formatter: (val) =>{
        //         console.log('formatter', val)
        //     }
        // },
        //设置折线颜色和粗细
        lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, chartColorConfig?.lineColor)
        },
        //折线底部颜色
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, chartColorConfig?.areaCOlor)
        },
        data: data == -1 ? '-' : data
    }
}
watch(()=>props, ()=>{
    viewObject.showData = props.data;
    Init();
},{
    deep:true,
    immediate: true
})
const resizeChart = () => {
    myChart?.resize?.();
}
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
    return {myChart, pData: props.data};
}
defineExpose({
	GetChart
})
</script>
<style scoped>
.targetline-content-box {
    display: flex; 
    flex-direction: column;
    flex: 1;
    position: relative;
}
.targetline-content-content {
    flex: 1;
}
.targetline-total-mb { position: absolute; left: 10px; top: 10px; font-size: 14px; color: #F3FFFF; display: flex; align-items: center; justify-content: center;}

.targetline-total-mb span { font-size: 18px; color: #5FFFE2; margin-left: 10px; }
</style>