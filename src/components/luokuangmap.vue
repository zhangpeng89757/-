<template>
    <div id="map" ref="mapBaidu" class="luokuangmap-box"></div>
</template>
<script setup>
	import { onMounted, reactive, inject, onBeforeUnmount, getCurrentInstance } from 'vue';
	import jingyangqu from '@/assets/mapdata/jingyangqu.json'
	import { constants, getMapData } from '@/api/lawenforcementprotection'
	import { filledNullNumber } from '@/SystemCom/DataDeal'
	const { proxy } = getCurrentInstance();
	const global = inject('global');
	const viewData = reactive({
		map: null, //地图对象
		geojson: null,
		buderData: [], //地图标注数据
		markers: [], //地图标注集合 
		labels: [], //文本标注集合
		lightIcon: new LKMap.Icon({
			image: global.GetImages("map-bulder-checked.png"),
			imageSize: new LKMap.Size(64, 121),
			imageOffset: new LKMap.Pixel(10, -60)
		}),
		defualtIcon: new LKMap.Icon({
			size: new LKMap.Size(27, 32),
			image: global.GetImages("map-bulder.png"),
			imageSize: new LKMap.Size(80, 80),
			imageOffset: new LKMap.Pixel(0, 0)
		})
	})
	//获取地图数据
	const InitMapData = () => {
		getMapData().then(res => {
			let resData = res.data;
			let dataArray = [];
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
					//单位ID
					orgId: resData[index].orgId
				}
				if (element.point && element.point.length  == 2) dataArray.push(element);
			}
			viewData.buderData = dataArray;
			addBulderToMap();
			if(dataArray.length > 0) {
				setTimeout(() => {
					let d = viewData.markers.find(el => el.data.name == dataArray[0].name);
					var pt = new LKMap.LngLat(d.data.point[0], d.data.point[1]);
					openInfoWindow(d.marker, pt);
					d.marker.setIcon(d.lightMyIcon);
				}, 1000);
				
			}
		});
	}
	//将数据添加到地图
	const addBulderToMap = () => {
		let map = viewData.map;
		viewData.markers = [];
		for (let index = 0; index < viewData.buderData.length; index++) {
			const element = viewData.buderData[index];
			var position = new LKMap.LngLat(element.point[0], element.point[1]);
			var marker = new LKMap.Marker({
				position: position,
				anchor: 'bottom',
				icon: viewData.defualtIcon,
				mName: element.name,
				data: element,
				bubble: false
			});
			var label = new LKMap.Text({
				position: position,
				text: element.name,   // 内容
				anchor: 'center',   // 设置文本对齐方式
				draggable: false,    // 是否可拖动
				opacity: 1,       // 设置透明度
				rotation: 0,   // 旋转角度
				style:{     // 自定义样式
					'cursor': 'pointer',
					'background-color': '#00000000',
					'border-width': 0,
					'text-align': 'center',
					'font-size': '14px',
					'color': '#fff',
					'font-family': '微软雅黑',
				},
			});
			label.setOffset(new LKMap.Pixel(30, 30))
			label.setMap(map);
			marker.setMap(map);
			//添加事件
			marker.on('click', markerClick);	
			viewData.markers.push({
				marker,
				data: element,
				lightMyIcon: viewData.lightIcon,
				bulderIcon: viewData.defualtIcon,
			})
		}
	}
	const markerClick = (e) => {
		let marker = e.layer;
		if(marker.options.icon.image == "/src/assets/images/map-bulder-checked.png") return; //已经打开了窗口
		let data = marker.options.data;
		var pt = new LKMap.LngLat(data.point[0], data.point[1]);
		marker.setIcon(viewData.lightIcon);
		openInfoWindow(marker, pt);
	}
	//构建自定义信息窗体
	const openInfoWindow = (marker, position) => {
		viewData.map?.setZoom(14);
		viewData.map?.setCenter(position);
		let data = marker.options.data;
		// 创建文信息窗口
		var sContent = `<div class="map-info-window background-image-box" style="background-image: url(${global.GetImages("mapinfo.png")})">
                        <div class="map-info-window-content">
                            <div class="map-info-title"><div><a style="color:#fff" target="_blank" href="${jgsUrl}${data.orgId}">${data.name}</a></div><div>执法队员：<span>${data.lawEnforcerNum}</span></div></div>
                            <div class="map-info-xs"><div>当年案件量：&emsp;&emsp;<span class='${data.clueTargetNum=='暂无数据' ? 'not-data' : ''}'>${data.clueCurrentNum}</span></div><div>&emsp;&emsp;&emsp;&emsp;当年案件目标：&emsp;&emsp;<span class="${data.clueTargetNum=='暂无数据' ? 'not-data' : ''}">${data.clueTargetNum=='暂无数据' ? '-' : data.clueTargetNum}</span></div></div>
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
                                <div>监督检查&emsp;${data.superviseNum=='暂无数据' ? '-' : data.superviseNum}</div>
                                <div>投诉举报&emsp;${data.complaintsReportNum == '暂无数据' ? '-' : data.complaintsReportNum}</div>
                                <div>部门移送&emsp;${data.departmentNum == '暂无数据' ? '-' : data.departmentNum}</div>
                                <div>上级交办&emsp;${data.superiorNum == '暂无数据' ? '-' : data.superiorNum}</div>
                            </div>
                            <div class="map-info-bottom">
								<a target="_blank" href="${jgsUrl}${data.orgId}"><div class="mapinfobottom-item"><span class='${data.registerNum=='暂无数据' ? 'not-data' : ''}'>${data.registerNum }</span><div>准予立案</div></div></a>
                                <a target="_blank" href="${jgsUrl}${data.orgId}"><div class="mapinfobottom-item"><span class='${data.mediateNum=='暂无数据' ? 'not-data' : ''}'>${data.mediateNum}</span><div>行政调解协议</div></div></a>  
                                <a target="_blank" href="${jgsUrl}${data.orgId}"><div class="mapinfobottom-item"><span class='${data.punishNum=='暂无数据' ? 'not-data' : ''}'>${data.punishNum}</span><div>行政处罚决定</div></div></a>
                                <a target="_blank" href="${jgsUrl}${data.orgId}"><div class="mapinfobottom-item"><span class='${data.resolvedNum=='暂无数据' ? 'not-data' : ''}'>${data.resolvedNum}</span><div>结案归档</div></div></a>
                                <a target="_blank" href="${jgsUrl}${data.orgId}"><div class="mapinfobottom-item"><span class='${data.timeoutCaseNum=='暂无数据' ? 'not-data' : ''}'>${data.timeoutCaseNum}</span><div>超时案件量</div></div></a>
                                <a target="_blank" href="${jgsUrl}${data.orgId}"><div class="mapinfobottom-item"><span class='${data.timeoutCaseRatio=='暂无数据' ? 'not-data' : ''}'>${data.timeoutCaseRatio}%</span><div>超时案件率</div></div></a> 
                            </div>
                        </div>
                    </div>`;
		let infoWindow = new LKMap.InforWindow({
			anchor: 'bottom',
			className: 'customClassName',
			closeOnClick: true, //鼠标点击地图时关闭窗口
			content: sContent,
			isCustom: true, //使用自定义窗体
			offset: new LKMap.Pixel(280, 100),
			showShadow: true,  // 控制是否显示信息窗体阴影
			showShadowOffset: new LKMap.Pixel(0, -11),  // 设置阴影偏移量
		});
		infoWindow.open(viewData.map, position);
		//添加事件
		infoWindow.on('close', ()=> {
			marker.setIcon(viewData.defualtIcon)
		});	
	}	
	//限制地图显示范围
	const lockMapBounds = () => {
			// 东北坐标
			var northEast = new LKMap.LngLat(104.93, 31.45);
			// 西南坐标
			var southWest = new LKMap.LngLat(103.9, 30.95);
			var bounds = new LKMap.Bounds(southWest, northEast)
			viewData.map.setMaxBounds(bounds);
		}
	//添加区域范围
	const addGeojsonPolygon = () => {
		viewData.geojson && viewData.geojson.remove();
		var polygonData2 = jingyangqu;
		viewData.geojson = new LKMap.GeoJSON({
			geoJSON: polygonData2,   // GeoJSON对象
			getPolygon: function (geojson, lnglats) {//还可以自定义getMarker和getPolyline
				var area = LKMap.GeometryUtil.ringArea(lnglats)
				return new LKMap.Polygon({
					path: lnglats,
					strokeWeight: 4,
					strokeOpacity: 1,
					strokeColor: '#4ca7a2',
					fillColor: '#000',
					fillOpacity: 0.3,
				});
			}
		});
		viewData.geojson.setMap(viewData.map);
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
	const DisplayToMap = (item) => {
		let marker = item?.marker || viewData.markers.find(el => el.data.name == item.name)?.marker;
		if(marker.options.icon.image == "/src/assets/images/map-bulder-checked.png") return; //已经打开了窗口
		let data = marker.options.data;
		var pt = new LKMap.LngLat(data.point[0], data.point[1]);
		marker.setIcon(viewData.lightIcon);
		openInfoWindow(marker, pt);
	}
    onMounted(()=>{
		const body = document.querySelector(".wrapper");
		if (body.append) {
			body.append(proxy.$el);
		} else {
			body.appendChild(proxy.$el);
		}
		proxy.$nextTick(()=>{
			
		}).then(()=>{
			var position = new LKMap.LngLat(104.370831, 31.220107);
			viewData.map = new LKMap.Map("map",{
				center: position,//中心点
				zoom: 10,//缩放等级
				style: 'lkmap://styles/74ba752dcfc2425b8d5290eb79ae60d0',// 设置自定义样式
			})
			viewData.map.on("load",function(){
				addGeojsonPolygon();
				lockMapBounds();
				InitMapData();
			});
		})
	});
	onBeforeUnmount(()=>{
		document.querySelector(".wrapper").removeChild(proxy.$el)
	})
	const GetMap = () => {
		return {
			markers: viewData.markers,
			map: viewData.map,
			type: 'luokuangmap',
			moveToMarker: DisplayToMap
		};
	}
	defineExpose({
		GetMap,
		DisplayToMap
	})
</script>
<style scoped>

body .BMap_bubble_content { width: auto !important; height: auto !important;}
.luokuangmap-box { flex: 1; width: 100%; height: calc(100% - 40px); top: 40px; left: 0; position: absolute; margin: 1px; background-color: rgb(7, 18, 33); z-index: 100;}
</style>
<style>
.luokuang-marker-label { color: #fff; background-color: #ffffff00; }
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
.map-info-window .map-info-jdbox .map-info-jd div:nth-child(2) { position: absolute;top: -1px; right: 4px;}
.map-info-window .map-info-jdbox .map-info-jd .map-info-jd-in { position: absolute; height: var(--small-font-size); left: 0; border-radius: 20px; display: flex; align-items: center; justify-content: end; overflow: hidden;}
.map-info-window .map-info-jdbox .map-info-jd .map-info-jd-in-text { position: absolute; z-index: 1; left: 20px;left: 20px; font-size: 12px; top: -1px; }
.map-info-window .map-info-jdbox div:nth-child(2) { margin-left: 10px; }
.map-info-window .map-info-jdbox div:nth-child(2) span { color: #5EC5FF; font-size: var(--default-font-size); }
.map-info-window .map-info-first-div { background-color: #004664; color: #fff; border-radius: 20px;  display: flex; margin-bottom: 1rem; }
.map-info-window .map-info-first-div div { flex: 1; width: 23%; margin: 0 1%; align-items: center; }
.map-info-window .map-info-first-div div::before { content: "·"; color: #5FC5FF; font-size: var(--small-font-size);; margin-right: 0.2rem; }

.map-info-window .map-info-bottom {  display: grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:repeat(2, 1fr); gap: 20px;}
.map-info-window .map-info-bottom .mapinfobottom-item{ border-radius: 4px; display: flex; padding: 0; flex-direction: column; align-items: center;  background-color: #004664; color: #fff;}
.map-info-window .map-info-bottom .mapinfobottom-item span { color: #5EC5FF; font-size: var(--default-font-size); }
.map-info-window .map-info-bottom .mapinfobottom-item .not-data { font-size: var(--small-font-size) !important; color: #c1c1c1 !important; font-weight: 500; }
body .map-info-window .map-info-xs .not-data { font-size: var(--small-font-size) !important; color: #c1c1c1 !important; font-weight: 500; line-height: 32px; }

.progressbg-color { background-image: linear-gradient(to right, rgba(44, 193, 166, 0.5), rgba(44, 193, 166, 1)); }
.progressbg-color1 { background-image: linear-gradient(to right,rgba(255, 180, 30, 0.5), rgba(255, 180, 30, 1)); }
.progressbg-color2 { background-image: linear-gradient(to right, rgba(255, 125, 97, 0.5), rgba(255, 125, 97, 1)); }
</style>