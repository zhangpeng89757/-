<template>
    <div class='map-box'>
        <div id="main" class="myChart"></div>
    </div>
</template>

<script setup>
import MAP from '@/assets/mapdata/jingyangqu.json'
import { onMounted, onUnmounted, getCurrentInstance, reactive, inject } from 'vue'
import { constants, getMapData } from '@/api/lawenforcementprotection'
import { filledNullNumber } from '@/SystemCom/DataDeal'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

const { proxy } = getCurrentInstance();
const global = inject('global');
let checkedBulder = global.getAssetsFile("map-bulder-checked.png");
let bulder = global.getAssetsFile("map-bulder.png");
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer
]);
var series = [];
const viewObj = reactive({
    data: [],
})
// 初始化地图数据
const initMapData = () => {
    let dataArray = [];
    getMapData().then(res => {
        let resData = res.data;
        for (let index = 0; index < resData.length; index++){
            let element = {
                // 执法单位名称
                name : resData[index].region,
                // 执法单位坐标
                value: resData[index].point? resData[index].point : constants.defaultMapLocationData[resData[index].region],
                // 执法队员人数
                lawEnforcerNum: filledNullNumber(resData[index].lawEnforcerNum),
                // 当年线索数量
                clueCurrentNum: filledNullNumber(resData[index].clueCurrentNum),
                // 当年线索目标
                clueTargetNum : filledNullNumber(resData[index].clueTargetNum),
                // 完成占比
                reachNum : filledNullNumber(resData[index].reachNum),
                // 监督检查
                superviseNum : filledNullNumber(resData[index].superviseNum),
                // 投诉举报
                complaintsReportNum : filledNullNumber(resData[index].complaintsReportNum),
                // 部门移送
                departmentNum : filledNullNumber(resData[index].departmentNum),
                // 上级交办
                superiorNum : filledNullNumber(resData[index].superiorNum),
                // 准予立案
                registerNum : filledNullNumber(resData[index].registerNum),
                // 行政调解协议
                mediateNum : filledNullNumber(resData[index].mediateNum),
                // 行政处罚决定
                punishNum : filledNullNumber(resData[index].punishNum),
                // 结案归档
                resolvedNum : filledNullNumber(resData[index].resolvedNum),
                // 超时案件量
                timeoutCaseNum: filledNullNumber(resData[index].timeoutCaseNum),
                // 超时案件率
                timeoutCaseRatio: filledNullNumber(resData[index].timeoutCaseRatio),
            }
            if (element.value && element.value.length  == 2) dataArray.push(element);
        }
        viewObj.data = dataArray;
        addBulderToMap();
        initMap();
    })
}
//将数据添加到地图
const addBulderToMap = () => {
    series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 2 //波纹圆环最大限制，值越大波纹越大
        },
        tooltip: {
            show: true,
        },
        label: {
            normal: {
                show: true,
                position: 'right', //显示位置
                offset: [-60, 30], //偏移设置
                formatter: function(params){//圆环显示文字
                    return params.data.name;
                },
                color: '#4BF9DA',
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        symbol: `image://${bulder}`,
        symbolSize: [30, 30],
        symbolOffset: [0, '-40%'],
        itemStyle: {
            normal: {
                show: false,
                color: '#f00'
            }
        },
        data: viewObj.data
    })
    series.push({
        name: 'showTipBulder',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 1 //波纹圆环最大限制，值越大波纹越大
        },
        tooltip: {
            show: true,
        },
        label: {
            normal: {
                show: true,
                position: 'right', //显示位置
                offset: [-60, 70], //偏移设置
                formatter: function(params){//圆环显示文字
                    return params.data.name;
                },
                color: '#4BF9DA',
                fontSize: 13
            },
            emphasis: {
                show: true
            }
        },
        symbol: `image://${checkedBulder}`,
        symbolSize: [40, 80],
        symbolOffset: [0, 0],
        itemStyle: {
            normal: {
                show: false,
                color: '#f00'
            }
        },
        data: []
    })
}
//将数据添加到地图
const addShowBulderToMap = () => {
    let arr = JSON.parse(JSON.stringify(viewObj.data));
    series[1].data = [showData];
    let index = arr.findIndex(el => showData.name == el.name);
    if(index != -1) {
        arr.splice(index, 1);
        series[0].data = arr;
    }
    myChart.setOption({
        tooltip: {
            alwaysShowContent: true
        },
        series: series
    });
}
const GetBgColor = (item) => {
    if(item > 70) {
        return "progressbg-color";
    } else if (item > 30) {
        return "progressbg-color1";
    } else {
        return "progressbg-color2";
    }
}
const GetColor = (item) => {
    if(item > 70) {
        return "rgba(44, 193, 166, 1)";
    } else if (item > 30) {
        return "rgba(255, 180, 30, 1)";
    } else {
        return "rgba(255, 125, 97, 1)";
    }
}
//监听缩放事件
const listenerZoom = () => {      
    myChart.on("georoam", params => {
        if(showData != null) {
            myChart.dispatchAction({
                type: 'showTip',
                // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                seriesIndex: 1,
                // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
                name: showData?.name,
            })
        }
    });
}
//监听点击事件
const listenerClick = () => {      
    myChart.on("click", params => {
        let option = myChart.getOption();
        //点击的图标
        if(params.dataIndex != undefined) {
            showData = params.data;
            showTip();
        } else { //点击其他
            series[1].data = [];
            series[0].data = viewObj.data;
            myChart.setOption({
                tooltip: {
                    alwaysShowContent: false
                },
                series: series
            });
            showData = null;
            document.querySelector(".echarts-deyang-tooltip").style.display = "none";

        }
    });
}
let myChart = null;
//当前显示的tooltip
let showData = null;
const initMap = () => {
    var chartDom = document.getElementById('main');
    myChart = echarts.init(chartDom);
    echarts.registerMap('deyang', MAP);
    var option;
    option = {
        tooltip: {
            className: 'echarts-deyang-tooltip',
            alwaysShowContent: true,
            confine: true,
            triggerOn: 'click',
            position: function (point, params, dom, rect, size) {
                showData = params;
                if(isNaN(point[0])) {
                    point = myChart.convertToPixel('geo',  (typeIndex == 0 || typeIndex == 2) ? params.data.coords[1] : params.data.coords[0]);
                }
                let x = point[0] + 30;
                let y = point[1] - size.contentSize[1] / 2 + 10;
                return [x, y];
            },
            backgroundColor: 'none',
            borderColor: "#FFFFFF00",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            padding: 0,
            transitionDuration: 0,
            extraCssText: 'z-index:999',
            formatter: function(params, ticket, callback) {
                var data = params.data;
                // 创建文信息窗口
                var sContent = `<div class="map-info-window background-image-box" style="background-image: url(${global.GetImages("mapinfo.png")})">
                        <div class="map-info-window-content">
                            <div class="map-info-title"><div>${data.name}</div><div>执法队员：<span>${data.lawEnforcerNum}</span></div></div>
                            <div class="map-info-xs"><div>当年线索量：&emsp;&emsp;<span class='${data.clueTargetNum=='暂无数据' ? 'not-data' : ''}'>${data.clueCurrentNum}</span></div><div>&emsp;&emsp;&emsp;&emsp;当年线索目标：&emsp;&emsp;<span class="${data.clueTargetNum=='暂无数据' ? 'not-data' : ''}">${data.clueTargetNum}</span></div></div>
                            <div class="map-info-jdbox">
                                <div class="map-info-jd">
                                    <div>
                                        <div class="map-info-jd-in ${GetBgColor(data.reachNum)}" style="width:${data.reachNum}%;"></div>
                                    </div>
                                    <div>目标：${data.clueTargetNum}</div>
                                    <span class="map-info-jd-in-text">当年：${data.clueCurrentNum}</span>
                                </div>
                                <div>完成：<span style="color:${GetColor(data.reachNum)}">${data.reachNum}%</span></div>
                            </div>
                            <div class="map-info-first-div">
                                <div>监督检查&emsp;${data.superviseNum}</div>
                                <div>投诉举报&emsp;${data.complaintsReportNum}</div>
                                <div>部门移送&emsp;${data.departmentNum}</div>
                                <div>上级交办&emsp;${data.superiorNum}</div>
                            </div>
                            <div class="map-info-bottom">
                                <div class="mapinfobottom-item"><span class='${data.registerNum=='暂无数据' ? 'not-data' : ''}'>${data.registerNum}</span><div>准予立案</div></div>   
                                <div class="mapinfobottom-item"><span class='${data.mediateNum=='暂无数据' ? 'not-data' : ''}'>${data.mediateNum}</span><div>行政调解协议</div></div>   
                                <div class="mapinfobottom-item"><span class='${data.punishNum=='暂无数据' ? 'not-data' : ''}'>${data.punishNum}</span><div>行政处罚决定</div></div>   
                                <div class="mapinfobottom-item"><span class='${data.resolvedNum=='暂无数据' ? 'not-data' : ''}'>${data.resolvedNum}</span><div>结案归档</div></div>  
                                <div class="mapinfobottom-item"><span class='${data.timeoutCaseNum=='暂无数据' ? 'not-data' : ''}'>${data.timeoutCaseNum}</span><div>超时案件量</div></div> 
                                <div class="mapinfobottom-item"><span class='${data.timeoutCaseRatio=='暂无数据' ? 'not-data' : ''}'>${data.timeoutCaseRatio}%</span><div>超时案件率</div></div>  
                            </div>
                        </div>
                    </div>`;
                return sContent;
            },
            textStyle: {
                color: "#FFFFFF"
            }
        },
        backgroundColor:'rgba(128, 128, 128, 0.1)',
        geo: {
            show: true,
            map: 'deyang',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            tooltip: {
                show: false,
            },
            zoom: 1,
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#031525',
                }
            }
        },
        series: series
    }
    myChart?.setOption(option);
    if(series.length > 0) {
        showData = series[0].data[0];
        showTip();
    }
    listenerClick();
    listenerZoom();
}
const showTip = () => {
    addShowBulderToMap();
    myChart.setOption({
        geo: {
            center: showData.value,
            zoom:3,
        }
    });
    myChart.dispatchAction({
        type: 'showTip',
        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
        seriesIndex: 1,
        // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
        dataIndex: 0,
    })
}
const ResizeMap=()=>{
    myChart?.resize();
}
onMounted(()=>{
    proxy.$nextTick(()=>{
        // const body = document.querySelector(".content-view");
        // if (body.append) {
        //     body.append(proxy.$el);
        // } else {
        //     body.appendChild(proxy.$el);
        // }
    }).then(() => {
        setTimeout(() => {
            initMapData();
            initMap();
        }, 1000);
    })
    window.addEventListener('resize', ResizeMap);
});
onUnmounted(()=>{
    window.removeEventListener('resize', ResizeMap);
})
const GetChart = () => {
    return {myChart, pData: viewObj.data};
}
const DisplayToMap = (item) => {
    let sData = viewObj.data.find(el => el.name == item.name);
    if(sData != null) {
        showData = sData;
        showTip();
    }
}
defineExpose({
	GetChart,
    DisplayToMap
})
</script>
<style>
.map-box { width: 100%; height: 100%; top: 0; left: 0; position: absolute; margin: 1px; background-color: rgb(7, 18, 33, 0.1); }
.map-box .myChart { flex: 1; width: 100%; height: 100%; display: flex }

.map-info-window { padding: var(--medium-font-size); color: #fff; width: 430px; overflow: hidden; font-size: var(--small-font-size); padding:20px 18px 20px 28px; box-sizing: border-box; overflow: hidden;}
.map-info-window-content { width: 100%; height: 100%; display: block; overflow: hidden; }
.map-info-window .map-info-title { display: flex; line-height: 2; align-items: baseline; }
.map-info-window .map-info-title div:nth-child(1) { color: #fff; flex: 1; font-weight: bold; font-size: var(--default-font-size);}
.map-info-window .map-info-title div:nth-child(2) {  color: #A8D6FF; }
.map-info-window .map-info-title div:nth-child(2) span { color: #fff; font-size: var(--medium-font-size); }
.map-info-window .map-info-xs { color: #A8D6FF; display: inline-block; line-height: 2; width: 100%; }
.map-info-window .map-info-xs div { float: left; }
.map-info-window .map-info-xs div:nth-child(1) span { color: #5EC5FF; font-size: var(--default-font-size); }
.map-info-window .map-info-xs div:nth-child(2) span { color: #FFF; font-size: var(--default-font-size); }
.map-info-window .map-info-jdbox { display: flex; width: 100%; position: relative; overflow: hidden; align-items: center; margin-bottom: 10px;}
.map-info-window .map-info-jdbox .map-info-jd { position: relative; flex: 1; align-items: center; padding: 0 4px; border-radius: 20px; background-color: #ffffff42; text-align: right; height: var(--default-font-size); }
.map-info-window .map-info-jdbox .map-info-jd div:nth-child(1) { position: relative; margin-top: 2px; }
.map-info-window .map-info-jdbox .map-info-jd div:nth-child(2) { position: absolute;top: -4px; right: 4px;}
.map-info-window .map-info-jdbox .map-info-jd .map-info-jd-in { position: absolute; height: var(--small-font-size); left: 0; border-radius: 20px; display: flex; align-items: center; justify-content: end; overflow: hidden;}
.map-info-window .map-info-jdbox .map-info-jd .map-info-jd-in-text { position: absolute; z-index: 1; left: 20px;left: 20px; font-size: 12px; top: -4px; }
.map-info-window .map-info-jdbox div:nth-child(2) { margin-left: 10px; }
.map-info-window .map-info-jdbox div:nth-child(2) span { color: #5EC5FF; font-size: var(--default-font-size); }
.map-info-window .map-info-first-div { background-color: #004664; color: #fff; border-radius: 20px;  display: flex; margin-bottom: 1rem; }
.map-info-window .map-info-first-div div { flex: 1; width: 23%; margin: 0 1%; align-items: center; }
.map-info-window .map-info-first-div div::before { content: "·"; color: #5FC5FF; font-size: var(--small-font-size);; margin-right: 0.2rem; }

.map-info-window .map-info-bottom {  display: grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:repeat(2, 1fr); gap: 20px;}
.map-info-window .map-info-bottom .mapinfobottom-item{ border-radius: 4px; display: flex; padding: 0; flex-direction: column; align-items: center;  background-color: #004664;;}
.map-info-window .map-info-bottom .mapinfobottom-item span { color: #5EC5FF; font-size: var(--default-font-size); }
.map-info-window .map-info-bottom .mapinfobottom-item .not-data { font-size: var(--small-font-size) !important; color: #c1c1c1 !important; font-weight: 500; }
body .map-info-window .map-info-xs .not-data { font-size: var(--small-font-size) !important; color: #c1c1c1 !important; font-weight: 500; line-height: 32px; }

.progressbg-color { background-image: linear-gradient(to right, rgba(44, 193, 166, 0.5), rgba(44, 193, 166, 1)); }
.progressbg-color1 { background-image: linear-gradient(to right,rgba(255, 180, 30, 0.5), rgba(255, 180, 30, 1)); }
.progressbg-color2 { background-image: linear-gradient(to right, rgba(255, 125, 97, 0.5), rgba(255, 125, 97, 1)); }

.echarts-deyang-tooltip { box-shadow: none !important; }
</style>
