<!--百度地图-->
<template>
    <BaiduMap ref="mapBaidu" class="baidumap-box"></BaiduMap>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, getCurrentInstance, inject } from 'vue';
import deyangMap from '@/assets/mapdata/deyangare.json'
import { constants, getMapData } from '@/api/lawenforcementprotection'
import { filledNullNumber } from '@/SystemCom/DataDeal'
const global = inject('global');
const { proxy } = getCurrentInstance();
const mapBaidu=ref()
let map = null;
let data = [];
let markers = [];
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
                point: resData[index].point? resData[index].point : constants.defaultMapLocationData[resData[index].region],
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
            if (element.point && element.point.length  == 2) dataArray.push(element);
        }
        data = dataArray;
        addBulderToMap();
        if(data.length > 0) {
            let d = markers.find(el => el.data.name == data[0].name);
            var pt = new BMapGL.Point(d.data.point[0], d.data.point[1]);
            map?.centerAndZoom(pt, 14);
            map?.openInfoWindow(d.infoWindow, pt); 
            d.marker.setIcon(d.lightMyIcon)
        }
    })
}
//将数据添加到地图
const addBulderToMap = () => {
    // 默认图标
    var bulderIcon = new BMapGL.Icon(global.GetImages("map-bulder.png"), new BMapGL.Size(80, 80));
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // 创建Marker标注
        var pt = new BMapGL.Point(element.point[0], element.point[1]);
        var marker = new BMapGL.Marker(pt, {
            icon: bulderIcon
        });
        
        var opts = {
            position: pt, // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(-60, 30) // 设置文本偏移量
        };
        // 创建文本标注对象
        var label = new BMapGL.Label(element.name, opts);
        // 自定义文本标注样式
        label.setStyle({
            color: '#ffffff',
            backgroundColor: '#00000000',
            borderRadius: '0',
            borderColor: '#00000000',
            fontSize: '14px',
            fontFamily: '微软雅黑'
        });
        map.addOverlay(label);
        // 将标注添加到地图
        map.addOverlay(marker);
        //有此属性即只添加点 不添加窗口
        if(element.isNotInMap == undefined) {
            addInfoWindow(marker, element)
        }
    }
    
}
const addInfoWindow = (marker, data) => {
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
    var infoWindow = new BMapGL.InfoWindow(sContent, {
        offset: new BMapGL.Size(230, 160) // 设置偏移量
    });
    // marker添加点击事件
    marker.addEventListener('click', function (event) {
        // 设置新的地图图标
        let lightMyIcon =  new BMapGL.Icon(global.GetImages("map-bulder-checked.png"), new BMapGL.Size(60, 200));
        // 使用setIcon
        marker.setIcon(lightMyIcon)
        this.openInfoWindow(infoWindow);
    })
    infoWindow.addEventListener("close", () => {
        // 默认图标
        var bulderIcon = new BMapGL.Icon(global.GetImages("map-bulder.png"), new BMapGL.Size(80, 80));
        // 使用setIcon
        marker.setIcon(bulderIcon)
    })
    markers.push({
        marker,
        data,
        infoWindow,
        lightMyIcon: new BMapGL.Icon(global.GetImages("map-bulder-checked.png"), new BMapGL.Size(60, 200)),
        bulderIcon: new BMapGL.Icon(global.GetImages("map-bulder.png"), new BMapGL.Size(80, 80))
    })
}
onMounted(()=>{
    const body = document.querySelector(".wrapper");
    if (body.append) {
        body.append(proxy.$el);
    } else {
        body.appendChild(proxy.$el);
    }
    proxy.$nextTick(()=>{
        map = new BMapGL.Map(mapBaidu.value);          // 创建地图实例 
        //设置地图的中心点如成都的坐标
        var point = new BMapGL.Point(104.370831, 31.220107);
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 12.8);
        map.setMapStyleV2({     
            styleId: 'e32eabd4e124ab3b5cde5fc8ab020d7c'
        }); 
        // 将地图在水平位置上移动x像素，垂直位置上移动y像素(x,y)
        map.panBy(0, 30);
        // 允许滚轮缩放
        map.enableScrollWheelZoom();
        //只显示德阳区域
        InitDeyang();
        // 初始化数据
        initMapData();
    })
})
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
//只显示德阳区域
const InitDeyang = () => {
    var xyArr = deyangMap.data.split(";");
    var ptArr = [];
    for (var j = 0; j < xyArr.length; j++) {
        var tmp = xyArr[j].split(',');
        var pt = new BMapGL.Point(tmp[0], tmp[1]);
        ptArr.push(pt);
    }
    var mapmask = new BMapGL.MapMask(ptArr, {
        isBuildingMask: true,
        isPoiMask: true,
        isMapMask: true,
        showRegion: 'inside',
        topFillColor: '#5679ea',
        topFillOpacity: 0.5,
        sideFillColor: '#5679ea',
        sideFillOpacity: 0.9
    });
    map.addOverlay(mapmask);
    var border = new BMapGL.Polyline(ptArr, {
        strokeColor: '#4ca7a2',
        strokeWeight: 3,
        strokeOpacity: 1
    });
    map.addOverlay(border);
}
onBeforeUnmount(()=>{
    document.querySelector(".wrapper").removeChild(proxy.$el)
})
const DisplayToMap = (item) => {
    let toMapData = markers.find(el => el.data.name == item.name)
    if(toMapData != null && toMapData != undefined) {
        let {marker, data, infoWindow, lightMyIcon, bulderIcon} = toMapData;
        map.centerAndZoom(new BMapGL.Point(data.point[0], data.point[1]), 14);
        var pt = new BMapGL.Point(data.point[0], data.point[1]);
        map.openInfoWindow(infoWindow, pt); 
        marker.setIcon(lightMyIcon)
    }
}
const GetMap = () => {
    return {
        markers,
        map,
        type: 'baidumap'
    };
}
defineExpose({
	GetMap,
    DisplayToMap
})
</script>
<style>
body .BMap_bubble_content { width: auto !important; height: auto !important;}
.baidumap-box { width: 100%; height: 100%; top: 0; left: 0; position: absolute; margin: 1px; background-color: rgb(7, 18, 33); }

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
</style>