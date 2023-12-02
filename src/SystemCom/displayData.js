import {ref} from 'vue'
let PlayResolve = null;//Promiss回调
let displayObj = null;
let displayData = [];
let changeData = null;
//数据集合
let dataIndex = 0; //播放所在下标
let timer = 8000; //播放间隔时间
const playState = ref(true);
function play(){
    let data = displayData[dataIndex];
    changeData(data);
    dataIndex++;
    //本次series[dataIndex]的数据播放完毕
    if(dataIndex >= displayData.length) {
        setTimeout(() => {
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

export const PlayData = (_displayObj, resolve) => {
    // console.log(_displayObj)
    playState.value = true;
    displayObj = _displayObj;
    displayData = _displayObj.data;
    dataIndex = 0;
    PlayResolve = resolve;
    changeData = _displayObj.changeData;
    play();
}

export const StopPlayData = () => {
    playState.value = false;
}