<!--立体柱状图-->
<template>
    <div class="stereoscopic-bar-box">
        <div :id="uuid" style="flex: 1;"></div>
        <div class="count-box" v-if="props.otherObject != null">
            <div class="count-name">总目标：<span class="count-number number-font">{{ props.otherObject?.num }}</span></div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, getCurrentInstance,watch } from 'vue'
import * as echarts from 'echarts';
import { v4 as uuidv4 } from "uuid";
import { isNumber } from 'xe-utils';
const { proxy } = getCurrentInstance();
const uuid = uuidv4();
let myChart = {};
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => { return { leftData: [], rightData: [], legendData: [], dataName: [] }  }
    },
    otherObject: { //其他杂项
        type: Object,
        default: null
    }
})
const Init = () => {
    var chartDom = document.getElementById(uuid);
    if(chartDom == undefined) return;
    var myChart = echarts.init(chartDom);
    var option;
    let colors = [];
    let colors1 = [];
    let dataName = (props.data?.dataName || props.data?.dataName?.length > 0) ? props.data.dataName :  ["当年目标", "当前现状"]; 
    for (let i = 0; i < 10; i++) {
        colors.push({
            type: 'linear',
            x: 0,
            x2: 1,
            y: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: '#3C7BB7', // 最左边
                },
                {
                    offset: 0.5,
                    color: '#3498BA', // 左边的右边 颜色
                },
                {
                    offset: 0.5,
                    color: '#4EAEFC', // 右边的左边 颜色
                },
                {
                    offset: 1,
                    color: '#46D9FA',
                },
            ],
        });
        colors1.push({
            type: 'linear',
            x: 0,
            x2: 1,
            y: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: '#00E4E8', // 最左边
                },
                {
                    offset: 0.5,
                    color: '#5FFFE2', // 左边的右边 颜色
                },
                {
                    offset: 0.5,
                    color: '#34D0B4', // 右边的左边 颜色
                },
                {
                    offset: 1,
                    color: '#34D0B4',
                },
            ],
        });
    }
    let barWidth = 20;
    option = {
        backgroundColor: '#010d3a',
        legend: {
            selectedMode: false, // 是否允许点击
            top: '1%',
            right: '3%',
            icon: 'roundRect',//长方形
            itemWidth: 12,   // 图例标记的图形宽度  
            itemHeight: 4,   // 图例标记的图形高度 在修改图例标记图形的时候可以用到。比如矩形变成直线
            inactiveColor: "#ccc",
            type: 'plain',
            inactiveColor: "#ccc",  //当点击图例关闭后的颜色
            //图例中文字的样式
            textStyle: {
                color: "#fff", //文字的颜色
                fontSize: 12, //文字的字号
                lineHeight: 14, //行高
            },
        },
        //提示框
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            tooltip: {
                trigger: 'axis',
            },
            backgroundColor: "rgba(24, 64, 151, 0.63)",
            borderColor: "rgba(24, 64, 151, 0.63)",
            textStyle: {
                color: "#FFFFFF",
                fontSize: 14 , //文字的字号
                lineHeight: 20,
            },
            trigger: "axis",
            formatter: function (params, ticket, callback) {
                if(params[0].axisValue == "总目标") {
                    return "总目标：" + params[0].value
                } else {
                    const item = params[1];
                    let str = item.name;
                    for (let index = 0; index < params.length; index++) {
                        const element = params[index];
                        if(element.seriesType == "bar" && isNumber(element.value)) {
                            str += `<br>${element.marker}${element.seriesName} ${element.value}`
                        }
                    }
                    return str;
                }
            },
        },
        /**区域位置*/
        grid: {
            left: "3%",
            right: "3%",
            top: "10%",
            bottom: "3%",
            containLabel: true,
        },
        //X轴
        xAxis: {
            data: props.data?.legendData?.filter(item => item !== 'proGoals') ?? [],
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: "#2B7BD6",
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: "#2B7BD6",
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#153D7D",
                },
            },
            axisLabel: {
                fontSize: 12,
            },
        },
        series: [
            {
                name: dataName[0],
                type: 'bar',
                barWidth: barWidth,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors[params.dataIndex % 7];
                        },
                    },
                },
                data: props.data?.leftData ?? [],
            },
            {
                name: dataName[0],
                z: 2,
                type: 'pictorialBar',
                data: props.data?.leftData ?? [],
                symbol: 'diamond',
                symbolOffset: ['-63%', '50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors[params.dataIndex % 7];
                        },
                    },
                },
            },
            {
                name: dataName[0],
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: props.data?.leftData ?? [],
                symbol: 'diamond',
                symbolOffset: ['-63%', '-50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        color: function (params) {
                            return colors[params.dataIndex % 7].colorStops[0].color;
                        },
                    },
                },
            },
            // ---------------------分割线---------------------
            {
                name: dataName[1],
                type: 'bar',
                barWidth: barWidth,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors1[params.dataIndex % 7];
                        },
                    },
                },
                data: props.data?.rightData ?? [],
            },
            {
                name: dataName[1],
                z: 2,
                type: 'pictorialBar',
                data: props.data?.rightData ?? [],
                symbol: 'diamond',
                symbolOffset: ['63%', '50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors1[params.dataIndex % 7];
                        },
                    },
                },
            },
            {
                name: dataName[1],
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: props.data?.rightData ?? [],
                symbol: 'diamond',
                symbolOffset: ['63%', '-50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        color: function (params) {
                            return colors1[params.dataIndex % 7].colorStops[0].color;
                        },
                    },
                },
            },
        ],
    };
    if(!props.data?.rightData || props.data.rightData.length == 0) {
        option.series = [
            {
                name: dataName[0],
                type: 'bar',
                barWidth: barWidth,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors[params.dataIndex % 7];
                        },
                    },
                },
                data: props.data?.leftData ?? [],
            },
            {
                name: dataName[0],
                z: 2,
                type: 'pictorialBar',
                data: props.data?.leftData ?? [],
                symbol: 'diamond',
                symbolOffset: ['0%', '50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors[params.dataIndex % 7];
                        },
                    },
                },
            },
            {
                name: dataName[0],
                z: 3,
                type: 'pictorialBar',
                symbolPosition: 'end',
                data: props.data?.leftData ?? [],
                symbol: 'diamond',
                symbolOffset: ['0%', '-50%'],
                symbolSize: [barWidth, barWidth * 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        color: function (params) {
                            return colors[params.dataIndex % 7].colorStops[0].color;
                        },
                    },
                },
            }
        ]
    }
    option && myChart.setOption(option);
}
watch(() => props.data, () => {
    proxy.$nextTick(() => {

    }).then(() => {
        setTimeout(() => {
            Init();
        }, 500);
    })
}, {
    deep: true,
    immediate: true
})
onMounted(()=> {
    proxy.$nextTick(() => {
        Init();
    })
})
</script>
<style scoped>
.stereoscopic-bar-box { display: flex; flex-direction: column; flex: 1; position: relative; }
.count-box { color: #fff; position: absolute; left: 10px; top: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;}
.count-number { font-size: 16px;color: #5FFFE2; }
.count-name { font-size: 14px; color: #fff;}
</style>