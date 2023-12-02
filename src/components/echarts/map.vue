<template>
    <div style="flex: 1; width: 100%; height: 100%;" :id="uuid"></div>
</template>
<script setup>
import { onMounted, getCurrentInstance, inject, reactive,ref,watch, onUnmounted  } from 'vue'
import * as echarts from 'echarts';
import { v4 as uuidv4 } from "uuid";
import chinaMap from '@/assets/mapdata/chinamap.json'
import chinaMapOutline from '@/assets/mapdata/chinamapoutline.json'
import { getInitMapData } from '@/api/applicationServices'
const { proxy } = getCurrentInstance();
const uuid = uuidv4();
const global = inject('global');
let myChart = {};
echarts.registerMap('chinaMap', chinaMap);
echarts.registerMap('china', chinaMapOutline);
let mapPointIn = global.getAssetsFile("mapPointIn.png");
let mapPointOut = global.getAssetsFile("mapPointOut.png");
//定义德阳坐标
let deyangPoint = [104.389648,31.130428];
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
    showCenterBottomInfo: { // 知识产权运用服务情况 是否打开详情列表
        type: Boolean,
        default: () => false
    }
})
var chinaGeoCoordMap = {
    '黑龙江': [127.9688, 45.368],
    '内蒙古': [110.3467, 41.4899],
    "吉林": [125.8154, 44.2584],
    '北京': [116.4551, 40.2539],
    "辽宁": [123.1238, 42.1216],
    "河北": [114.4995, 38.1006],
    "天津": [117.4219, 39.4189],
    "山西": [112.3352, 37.9413],
    "陕西": [109.1162, 34.2004],
    "甘肃": [103.5901, 36.3043],
    "宁夏": [106.3586, 38.1775],
    "青海": [101.4038, 36.8207],
    "新疆": [87.9236, 43.5883],
    "西藏": [91.11, 29.97],
    "四川": [103.9526, 30.7617],
    "重庆": [108.384366, 30.439702],
    "山东": [117.1582, 36.8701],
    "河南": [113.4668, 34.6234],
    "江苏": [118.8062, 31.9208],
    "安徽": [117.29, 32.0581],
    "湖北": [114.3896, 30.6628],
    "浙江": [119.5313, 29.8773],
    "福建": [119.4543, 25.9222],
    "江西": [116.0046, 28.6633],
    "湖南": [113.0823, 28.2568],
    "贵州": [106.6992, 26.7682],
    "云南": [102.9199, 25.4663],
    "广东": [113.12244, 23.009505],
    "广西": [108.479, 23.1152],
    "海南": [110.3893, 19.8516],
    '上海': [121.4648, 31.2891],
    '香港': [114.1543731,22.28198083],
    '澳门': [113.5528956,22.20787],
    '台湾': [121.509062,25.044332],
    '新加坡': [103.51, 1.17],
    '德阳市': [104.389648,31.130428]
}
var xkIn = reactive([]);
var xkOut = reactive([]);
var zrIn = reactive([]);
var zrOut = reactive([]);
const mapDataList = reactive([]);
var series = [];
let typeName = "转入";
let typeIndex = 0;
// 获取许可出的地图数据
/**获取出的数据 */
const GetOutData = (index) => {
    let tmName = '商标';
    let ptName = '专利';
    typeIndex = index;
    if(index == 0) {
        typeName = "许可出";
    } else {
        typeName = "转出";
    }
    if (!mapDataList || mapDataList.length < 1){
        return;
    }
    series = [];
    AddChinaMap();
    AddDeyangInMap();
    var lineData = [];
    var otherPointData = [];
    for(var i = 0; i < mapDataList[index].length; i++) {
        var dataItem = mapDataList[index][i];
        var fromCoord = deyangPoint;
        var toCoord = chinaGeoCoordMap[dataItem.region];
        if(fromCoord && toCoord) {
            lineData.push([{
                coord: fromCoord,
                name: dataItem.region,
                tmName: tmName,
                tmValue: dataItem.tmValue,
                ptName: ptName,
                ptValue: dataItem.ptValue,
                title: dataItem.title,
            }, {
                coord: toCoord,
            }]);
            otherPointData.push({
                name: dataItem.region,
                tmName: tmName,
                tmValue: dataItem.tmValue,
                ptName: ptName,
                ptValue: dataItem.ptValue,
                title: dataItem.title,
                value: toCoord.concat([0])
            })
        }
    }
    series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 1 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
            normal: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params){//圆环显示文字
                    return params.data.name;
                },
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        symbol: `image://${mapPointOut}`,
        symbolSize: [5, 20],
        symbolOffset: [0, '-40%'],
        itemStyle: {
            normal: {
                show: false,
                color: '#f00'
            }
        },
        data: otherPointData
    })
    series.push({
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 5, //图标大小
        },
        lineStyle: {
            normal: {
                color: '#005FED',
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
            }
        },
        data: lineData
    });
    Init();
}
/**获取入的数据 */
const GetInData = (index) => {
    let tmName = '商标';
    let ptName = '专利';
    typeIndex = index;
    if(index == 1) {
        typeName = "许可入";
    } else {
        typeName = "转入";
    }
    if (!mapDataList || mapDataList.length < 1){
        return;
    }
    series = [];
    AddChinaMap();
    AddDeyangInMap();
    var lineData = [];
    var otherPointData = [];
    for(var i = 0; i < mapDataList[index].length; i++) {
        var dataItem = mapDataList[index][i];
        var fromCoord = chinaGeoCoordMap[dataItem.region];
        var toCoord = deyangPoint;
        if(fromCoord && toCoord) {
            lineData.push([{
                coord: fromCoord,
                name: dataItem.region,
                tmName: tmName,
                tmValue: dataItem.tmValue,
                ptName: ptName,
                ptValue: dataItem.ptValue,
                title: dataItem.title,
            }, {
                coord: toCoord,
            }]);
            otherPointData.push({
                name: dataItem.region,
                tmName: tmName,
                tmValue: dataItem.tmValue,
                ptName: ptName,
                ptValue: dataItem.ptValue,
                title: dataItem.title,
                value: fromCoord.concat([0])
            })
        }
    }
    series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 1 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
            normal: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params){//圆环显示文字
                    return params.data.name;
                },
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        symbol: `image://${mapPointIn}`,
        symbolSize: [5, 20],
        symbolOffset: [0, '-40%'],
        itemStyle: {
            normal: {
                show: false,
                color: '#f00'
            }
        },
        data: otherPointData
    })
    series.push({
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 5, //图标大小
        },
        lineStyle: {
            normal: {
                color: '#FFDF88',
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
            }
        },
        data: lineData
    });
    Init();
}
//将德阳加入地图
const AddDeyangInMap = () => {
    series.push({
        tooltip: {
            show: false
        },
        name: '德阳',
        type: 'effectScatter',
        encode: {
            tooltip: 2
        },
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'fill', //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
            normal: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(){//圆环显示文字
                    return "德阳市旌阳区";
                },
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        symbol: 'circle',
        symbolSize: function(params) {
            return (params[2] / 100) * 10 + 5;
        },
        itemStyle: {
            normal: {
                show: false,
                color: '#28E3F2'
            }
        },
        data: [
            [104.389648,31.130428, 100],
        ]
        
    });
}
//添加中国地图
const AddChinaMap = () => {
    series.push(
        {
            map: 'china',
            silent: true,
            type: 'map',
            zoom: 1.2,
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            top: '10%',
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(0,255,255,.02)',
                    borderColor: '#00ffff',
                    borderWidth: 1.5,
                    shadowColor: '#00ffff',
                    shadowOffsetX: 0,
                    shadowOffsetY: 4,
                    shadowBlur: 10,
                },
                emphasis: {
                    areaColor: 'transparent', //悬浮背景
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        },
        {
            map: 'chinaMap',
            type: 'map',
            zoom: 1.7,
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            top: '29%',
            tooltip:{
                show:false
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor:'transparent',
                    borderColor: 'rgba(0,255,255,.1)',
                    borderWidth: 1,
                },
                emphasis: {
                    areaColor:'rgba(0,255,255,.1)',
                    textStyle: {
                        color: 'red'
                    }
                }
            }
        }
    );
}
// 获取地图初始数据
const getInitData = () => {
    let toTarget = ' → 旌阳区';
    let fromTarget = '旌阳区 → '
    let tmName = '商标';
    let ptName = '专利';
    getInitMapData().then(res =>{
        let resData = res.data;
        let licensingInList = resData.licensingInList;// 许可转入
        let licensingOutList = resData.licensingOutList;// 许可转出
        let tradingInList = resData.tradingInList;// 转让转入
        let tradingOutList = resData.tradingOutList;// 转让转出
        for (let index = 0; index < licensingInList.length; index++){
            xkIn.push({
                region: licensingInList[index].region,
                tmName: tmName,
                tmValue: licensingInList[index].trademarkNum,
                ptName: ptName,
                ptValue: licensingInList[index].patentNum,
                title: licensingInList[index].region + toTarget,
            });
        }
        for (let index = 0; index < licensingOutList.length; index++){
            xkOut.push({
                region: licensingOutList[index].region,
                tmName: tmName,
                tmValue: licensingOutList[index].trademarkNum,
                ptName: ptName,
                ptValue: licensingOutList[index].patentNum,
                title: fromTarget + licensingOutList[index].region,
            });
        }
        for (let index = 0; index < tradingInList.length; index++){
            zrIn.push({
                region: tradingInList[index].region,
                tmName: tmName,
                tmValue: tradingInList[index].trademarkNum,
                ptName: ptName,
                ptValue: tradingInList[index].patentNum,
                title: tradingInList[index].region + toTarget,
            });
        }
        for (let index = 0; index < tradingOutList.length; index++){
            zrOut.push({
                region: tradingOutList[index].region,
                tmName: tmName,
                tmValue: tradingOutList[index].trademarkNum,
                ptName: ptName,
                ptValue: tradingOutList[index].patentNum,
                title: fromTarget + tradingOutList[index].region,
            });
        }
        mapDataList.push(zrOut);
        mapDataList.push(zrIn);
        mapDataList.push(xkOut);
        mapDataList.push(xkIn);
        // Init();
        GetOutData(0);
    });
    
}

// 记录当前是否点击过地图 获取了参数 避免获取两次的情况【没法阻止冒泡的迂回作战】
let clickName = ''
// 在关闭详情列表后，清除点击项的记录
watch(()=>props.showCenterBottomInfo, (newV, oldV)=>{
    if(!newV){
        clickName = ''
    }
})
const Init = () => {
    let chartDom = document.getElementById(uuid);
    if(chartDom == undefined) return;
    myChart = echarts.init(chartDom);
    let option = {
        backgroundColor: '',
        tooltip: {
            confine: true,
            trigger: 'item',
            position: function (point, params, dom, rect, size) {
                if(isNaN(point[0])) {
                    point = myChart.convertToPixel('geo',  (typeIndex == 0 || typeIndex == 2) ? params.data.coords[1] : params.data.coords[0]);
                }
                let x = point[0] - size.contentSize[0] / 2;
                let y = point[1] - size.contentSize[1] - 20;
                if(y < 0) {
                    y =  point[1] + 20;
                    dom.firstChild.style.backgroundImage = `url(${global.GetImages('echarts-map-tooltipbg-b.png')}`;
                }
                
                return [x, y];
            },
            className: "echarts-tooltip",
            backgroundColor: "#0A1A3400",
            borderColor: "#59AFF900",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            padding: 0,
            transitionDuration: 0,
            extraCssText: 'z-index:999',
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params?.name;
                let tmName = params?.data?.tmName;
                let tmValue = params?.data?.tmValue;
                let ptName = params?.data?.ptName;
                let ptValue = params?.data?.ptValue;
                let title = params?.data?.title;
                res = `<div class='echarts-map-tool' style="background-image:url(${global.GetImages('echarts-map-tooltipbg.png')})">
                        <div>${title}</div>
                        <div class="type-class-${(typeIndex == 1 || typeIndex == 3) ? 'in' : 'out'}"><div class="circle"></div>${tmName}：${tmValue}</div>
                        <div class="type-class-${(typeIndex == 1 || typeIndex == 3) ? 'in' : 'out'}"><div class="circle"></div>${ptName}：${ptValue}</div>
                    </div>`;
                return res;
            },
            textStyle: {
                color: "#FFFFFF"
            }
        },
        geo: {
            silent: true,
            map: 'china',
            show: false,
            zoom: 1.2,
            top: '10%',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                                offset: 0,
                                color: 'rgba(45,68,121,0.15)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(45,68,121,0.18)' // 100% 处的颜色
                            }
                        ],
                        global: true // 缺省为 false
                    },
                    areaColor: 'transparent',
                    borderColor: '#83BAFF',
                    borderWidth: 1,
                    shadowColor: 'rgba(56,164,255,.26)',
                    opacity: 0.5,
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    shadowBlur: 5,
                    show: true, // 是否显示对应地名
                    textStyle: {
                        //字体颜色
                        color: '#797979'
                    }
                },
                emphasis: {
                    color: 'transparent', //悬浮背景
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
           
        },
        series: series
    }
    option && myChart.setOption(option);
    myChart.on('click', (params)=>{
        if(params.name !== clickName){
            clickName = params.name
            proxy.$emit('openDetailList', params.name)
        }
    })
}
const resizeChart = () => {
    myChart?.resize?.();
}
onMounted(()=> {
    proxy.$nextTick(() => {

    }).then(()=>{
        setTimeout(() => {
            AddChinaMap();
            AddDeyangInMap();
            getInitData();
            Init();
            window.addEventListener("resize", resizeChart);
        }, 1000);
    })
})
onUnmounted(()=>{
    window.removeEventListener("resize", resizeChart);
})
const GetChart = () => {
    return { myChart, pData: mapDataList };
}
defineExpose({
    GetInData,
    GetOutData,
    GetChart
})
</script>
<style>
.echarts-tooltip { z-index: 999; }
.echarts-map-tool { display: flex; background-size: 100% 100%; padding: 20px; color: #ffffff; display: flex; flex-direction: column; }
.echarts-map-tool div:nth-child(1) { font-size: var(--default-font-size); line-height: 2; margin-bottom: 10px;}
.echarts-map-tool div:nth-child(2) { font-size: var(--medium-font-size); line-height: 2; }
.echarts-map-tool div:nth-child(3) { font-size: var(--medium-font-size); line-height: 2; }
.type-class-out,.type-class-in { display: flex; align-items: center; }
.type-class-out::before, .type-class-in::before { border-radius: 14px; width: 14px; height: 14px; margin-right: 10px; content: " "; }
.type-class-out::before { background-color: #005FED; box-shadow: 0px 0px 10px #0f6fff;}
.type-class-in::before { background-color: #FFDF88;  box-shadow: 0px 0px 10px #0f6fff;}
</style>