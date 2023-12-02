<template>
    <div class="water-eval-container">
        <div class="cityGreenLand-charts" :id="uuid"></div>
        <div class="count-box" v-if="props.otherObject != null">
            <div class="count-number number-font">{{ props.otherObject?.num }}</div>
            <div class="count-name">{{ props.otherObject?.title ?? `总体目标`}}</div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, getCurrentInstance, reactive, watch } from 'vue'
    import * as echarts from 'echarts'
    import 'echarts-gl';
    import { getPie3D, getParametricEquation } from "./echarts"; //工具类js，页面路径自己修改
    import { v4 as uuidv4 } from "uuid";
    const { proxy } = getCurrentInstance();
    const uuid = uuidv4();
    let myChart = {};
    /**定义父组件传参开始 */
    const props = defineProps({
        data: { //数据
            type: Object,
            default: () => new Array()
        },
        otherObject: { //其他杂项
            type: Object,
            default: null
        }
    })
    const color = ["#4962FC", "#fe9326", "#124fb7", "#383893", "#3cd6b7", "#4B7CF3", "#dd3ee5", "#12e78c", "#fe8104", "#01C2F9", "#F4CB29", "#FD9E06"];
    let Init = () => {
        let data = props.data ?? [];
        setLabel();
        let option = {}
        //构建3d饼状图
        myChart = echarts.init(document.getElementById(uuid));
        // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
        option = getPie3D(data, 0.85, 180, 40, 18, 0.95);
        myChart.setOption(option);
        // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
        option.series.push({
            name: "信用评价", //自己根据场景修改
            backgroundColor: "transparent",
            type: "pie",
            label: {
            opacity: 1,
            fontSize: 13,
            lineHeight: 20,
            },
            startAngle: -40, // 起始角度，支持范围[0, 360]。
            clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: ["20%", "60%"],
            center: ["50%", "50%"],
            data: data,
            itemStyle: {
            opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
            },
        });
        // 传入数据生成 option
        myChart.setOption(option);
    }
    // 初始化label样式
    const setLabel = ()=> {
        let data = props.data ?? [];
        data.forEach((item, index) => {
            item.itemStyle = {
                color: color[index],
            };
            item.label = {
                normal: {
                    show: true,
                    color: color[index],
                    position:'right',
                    // distance:-10,
                    offset:[0, 3] ,
                    formatter: [
                    "{d|{d}%}",
                    "————",
                    //   '{c|{c}}{b|台}',
                    "{b|{b}}",
                    ].join("\n"), // 用\n来换行
                    rich: {
                    b: {
                        // color: '#fff',
                        lineHeight: 25,
                        align: "left",
                        color: color[index],
                    },
                    c: {
                        fontSize: 22,
                        // color: '#fff',
                        textShadowColor: "#1c90a6",
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 2,
                        textShadowBlur: 5,
                        color: color[index],
                    },
                    d: {
                        color: color[index],
                        align: "left",
                    },
                    },
                },
            };
            item.labelLine = {
                normal: {
                    length2: 30,
                    lineStyle: {
                    width: 1,
                    color: color[index],
                    },
                },
            }
        });
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
    .water-eval-container {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }
    .cityGreenLand-charts {
        flex: 1;
    }
    .count-box { position: absolute; width: 100%; height: 100%; z-index: -1; display: flex; flex-direction: column; align-items: center; justify-content: center;}
    .count-number { font-size: var(--font24-size); }
    .count-name { font-size: 14px;  }
</style>