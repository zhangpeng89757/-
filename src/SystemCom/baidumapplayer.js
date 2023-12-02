import {ref} from 'vue'
let PlayResolve = null;//Promiss回调
let mapObj = null;
let markers = [];
//数据集合
let dataIndex = 0; //播放所在下标
let timer = 8000; //播放间隔时间
const playState = ref(true);
function play(){
    let {marker, data, infoWindow, lightMyIcon, bulderIcon} = markers[dataIndex];
    mapObj?.centerAndZoom(new BMapGL.Point(data.point[0], data.point[1]), 14);
    var pt = new BMapGL.Point(data.point[0], data.point[1]);
    mapObj?.openInfoWindow(infoWindow, pt); 
    marker.setIcon(lightMyIcon)
    dataIndex++;
    //本次series[dataIndex]的数据播放完毕
    if(dataIndex >= markers.length) {
        setTimeout(() => {
            //延时推送播放完毕
            mapObj?.closeInfoWindow?.();
            PlayResolve();
        }, timer);
    } else{
        setTimeout(() => {
            if(playState.value) {
                play();
            }
        }, timer);
    }

}

export const PlayBaiduMap = (baiduMap, resolve) => {
    playState.value = true;
    dataIndex = 0;
    PlayResolve = resolve;
    mapObj = baiduMap.map;
    markers = baiduMap.markers;
    play();
}

export const StopPlayBaiduMap = () => {
    playState.value = false;
}