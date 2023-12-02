import {ref} from 'vue'
let PlayResolve = null;//Promiss回调
let mapObj = null;
let markers = [];
let moveToMarker = null;
//数据集合
let dataIndex = 0; //播放所在下标
let timer = 8000; //播放间隔时间
const playState = ref(true);
function play(){
    let marker = markers[dataIndex];
    moveToMarker(marker);
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

export const PlayLuoKuangMap = (luokuangMap, resolve) => {
    playState.value = true;
    dataIndex = 0;
    PlayResolve = resolve;
    mapObj = luokuangMap.map;
    markers = luokuangMap.markers;
    moveToMarker = luokuangMap.moveToMarker;
    play();
}

export const StopPlayLuoKuangMap = () => {
    playState.value = false;
}