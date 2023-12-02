<template>
    <div class="line-content-box">
        <div class="line-content-view">
            <div v-if="props.showTitle" class="line-content-tool background-image-box" :style="{backgroundImage:`url(${backgroundImage})`}">
                <div class="line-content-tool-title title-font">{{ title }}</div>
                <div class="line-content-tool-operate" v-if="viewObject.showTool">
                    <template v-if="data.length > 0">
                        <template v-if="changeType=='select'">
                            <el-select v-model="viewObject.checkDataKey" size="small" @change="changeDataShow">
                                <el-option v-for="(item,key,index) in data" :key="index" :label="item[titleKey]" :value="item[titleKey]"/>
                            </el-select>
                        </template>
                        <template v-else-if="changeType=='piece'">
                            <div v-for="(item,index) in data" :key="index" @click="changeDataShow(item[titleKey])" :class="['line-piece-box', viewObject.checkDataKey == item[titleKey] ? 'line-piece-box-checked' : '']">{{ item[titleKey] }}</div>
                        </template>
                    </template>
                </div>
            </div>
            <div :id="uuid" class="line-content-content"></div>
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
const reg = /(?!^)(?=(\d{3})+$)/g;
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
    showObj: {} //显示的对象
})
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
    titleKey: { // 数据标题KEY
        type: String,
        default: () => null
    },
    dataKey: { // 显示数据KEY
        type: String,
        default: () => null
    },
    dataItemTtileKey: { //子数据标题KEY
        type: String,
        default: () => null
    },
    dataItemDataValue: { //子数据KEY
        type: String,
        default: () => null
    },
    changeType: { //切换数据的显示方式 select，piece
        type: String,
        default: () => "piece"
    },
    backgroundImage: { //标题背景
        type: String,
        default: () => ""
    },
    showTitle: {//是否显示标题
        type: Boolean,
        default: true
    },
})
/**数据切换  */
const changeDataShow = (changeValue) => {
    props.data.forEach(element => {
        if(element[props?.titleKey] == changeValue) {
            viewObject.showData = element[props.dataKey];
            xUnit = element?.xUnit || "";
            yUnit = element?.yUnit || "";
            viewObject.checkDataKey = changeValue;
            Init();
        }
    });
}
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
    let legendData = [];
    let yData = [];
    let xData = [];
    let series = [];
    for (let index = 0; index < viewObject?.showData?.length; index++) {
        const element = viewObject.showData[index];
        if( typeof element[props.dataItemDataValue] === 'number') { //只有一条线
            xData.push(element[props.dataItemTtileKey])
            yData.push(element[props.dataItemDataValue])
        } else { //多条线
            yData.push(element[props.dataKey])
            legendData.push(element[props?.titleKey])
        }
    }
    //一维数据
    if(legendData.length == 0) {
        if(viewObject.showTool) {
            legendData.push(viewObject.checkDataKey);
        } else {
            legendData.push(viewObject.showObj[props?.titleKey])
        }
        series = [CreateSeries(yData, legendData[0])]
    } else { //多条线
        let xDataSet = new Set();
        let colorConfigIndex = 0;
        for (let index = 0; index < yData.length; index++) {
            const element = yData[index];
            const lineData = [];
            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                xDataSet.add(element2[props.dataItemTtileKey]);
                lineData.push(element2[props.dataItemDataValue]);
            }
            series.push(CreateSeries(lineData, legendData[index], chartColorConfigs[colorConfigIndex]));
            colorConfigIndex ++;
            if(colorConfigIndex == chartColorConfigs.length) colorConfigIndex = 0;
        }
        xData = Array.from(xDataSet);
    }
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
const CreateSeries = (data, name = "", chartColorConfig= chartColorConfigs[0]) =>{
    return {
        name: name,
        type: 'line',
        smooth: false, //是否曲线显示
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        //设置折线颜色和粗细
        lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, chartColorConfig?.lineColor)
        },
        //折线底部颜色
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, chartColorConfig?.areaCOlor)
        },
        data: data
    }
}
watch(()=>props, ()=>{
    if(props.data.length > 1) {
        viewObject.showTool = true;
        viewObject.checkDataKey = props.data[0][props.titleKey];
        viewObject.showData = props.data[0][props.dataKey]
        xUnit = props.data?.[0]?.xUnit || "";
        yUnit = props.data?.[0]?.yUnit || "";
    } else  {
        viewObject.showTool = false;
        viewObject.showData = props.data?.[0]?.[props.dataKey];
        viewObject.showObj = props.data?.[0]
        xUnit = props.data?.[0]?.xUnit || "";
        yUnit = props.data?.[0]?.yUnit || "";
    }
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
    return {myChart, changeDataShow, pData: props.data, titleKey: props.titleKey};
}
defineExpose({
	GetChart
})
</script>
<style>
.line-content-box {
    display: block; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0));
}
.line-content-view {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.line-content-tool { display: flex; color: #FFFFFF; }
.line-content-tool .line-content-tool-title { font-size: 18px;  line-height: 50px; flex: 1; }
.line-content-tool.background-image-box { padding-left: 14px; margin:0 14px; }
.line-content-content {
    flex: 1;
}
.line-content-tool-operate {display: flex; align-items: center; justify-content: center;} 
.line-content-tool-operate .el-select { width: 80%; float: right; }
.line-content-tool-operate .el-select .el-input__wrapper { padding: 1px 20px; border-radius: 0; border: 1px solid #38549E; background-color: #142D72;}
.line-content-tool-operate .el-select .el-input__inner{  color: #A8FAFF;  }
.line-content-tool-operate .el-select .el-input .el-select__caret{  color: #A8FAFF !important;--el-input-border-color: red; }
.line-content-tool-operate .el-input {
    --el-input-border-color: #172D68;
}
.line-piece-box { 
    background-color: #142D72; display: inline-block; 
    font-size: var(--small-font-size);
    line-height: 1.5;
    padding: 0 8px;
    box-sizing: border-box; 
    margin-left: 10px; 
    cursor: pointer; 
    border: 2px solid #25386b; 
    color: #2079A0; 
}
.line-piece-box.line-piece-box-checked { background-color: #142D72; border-color: #38549E; color: #A8FAFF; }
</style>