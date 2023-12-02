
import {ref} from 'vue'
import { isArray } from 'xe-utils';
let PlayResolve = null;//Promiss回调
let echartObj = null; //echart对象
let series = []; //播放数据
let changeEchartsData = null; //原始数据
let pData = null; //原始数据
let pDataIndex = 0; //原始数据下标
let dataKey = null; //二维数据数据KEY用来切换
//数据集合
let seriesIndex = 0; //数据下标
let dataIndex = 0; //播放所在下标
let timer = 2000; //播放间隔时间
const playState = ref(true);
function play(){
    try {
        if(series[seriesIndex]?.type =='effectScatter') {
            timer = 8000;
        } else {
            timer = 4000;
        }
        if(series[seriesIndex]?.tooltip?.show != false && (series[seriesIndex]?.type =='effectScatter' || series[seriesIndex]?.type == 'pie' || series[seriesIndex]?.type == 'line' || series[seriesIndex]?.type == 'lines')) {
            let playData = series?.[seriesIndex]?.data;
            if(!playData || (series[seriesIndex]?.type =='effectScatter' && seriesIndex > 0)) {
                PlayResolve();
            } 

            //对象空数据处理不显示
            if(playData[dataIndex]?.value != undefined && isNaN(playData[dataIndex]?.value) && !isArray(playData[dataIndex].value)) {

            } else {
                if(series[seriesIndex].type == "effectScatter") {
                    let eSeries = echartObj.getOption().series;
                    let arr = JSON.parse(JSON.stringify(pData));
                    eSeries[1].data = [playData[dataIndex]];
                    let index = arr.findIndex(el => playData[dataIndex].name == el.name);
                    if(index != -1) {
                        arr.splice(index, 1);
                        eSeries[0].data = arr;
                    }
                    echartObj.setOption({
                        geo: {
                            center: playData[dataIndex].value,
                            zoom:3,
                        }, 
                        series: eSeries
                    });
                    
                    echartObj.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 1,
                        name: playData[dataIndex].name,
                    });
                    
                } else {
                    echartObj.dispatchAction({
                        type: 'showTip',
                        seriesIndex,
                        dataIndex
                    });
                }
                
            }
            dataIndex++;
            //本次series[dataIndex]的数据播放完毕
            if(dataIndex >= playData.length) {
                seriesIndex ++;
                //是否所有的series都播放完毕
                if(seriesIndex >= series.length) {
                    //可以切换数据源的
                    pDataIndex++;
                    if(changeEchartsData != null && pData != null && pDataIndex < pData?.length) {
                        setTimeout(() => {
                            if(playState.value) {
                                echartObj.dispatchAction({
                                    type:'hideTip'
                                })
                                if(dataKey != null && dataKey != undefined) {
                                    changeEchartsData(pData[pDataIndex][dataKey]);
                                } else {
                                    changeEchartsData(pDataIndex);
                                }
                                //延时一秒 等待切换图形完成
                                setTimeout(() => {
                                    dataIndex = 0;
                                    seriesIndex = 0;
                                    play();
                                }, 1000);
                            }
                        }, timer);
                    } else {
                        setTimeout(() => {
                            echartObj.dispatchAction({
                                type:'hideTip'
                            })
                            //延时推送播放完毕
                            PlayResolve();
                        }, timer);
                    }
                } else{
                    dataIndex = 0;
                    playData = series[seriesIndex];
                    setTimeout(() => {
                        if(playState.value) {
                            play();
                        }
                    }, timer);
                }
            } else {
                setTimeout(() => {
                    if(playState.value) {
                        play();
                    }
                }, timer);
            }
        } else {
            seriesIndex ++;
            dataIndex = 0;
            if(seriesIndex >= series.length) { 
                setTimeout(() => {
                    echartObj.dispatchAction({
                        type:'hideTip'
                    })
                    //延时推送播放完毕
                    PlayResolve();
                }, timer);
            } else {
                setTimeout(() => {
                    if(playState.value) {
                        play();
                    }
                }, timer);
            }
        }
    } catch {
        setTimeout(() => {
            echartObj.dispatchAction({
                type:'hideTip'
            })
            //延时推送播放完毕
            PlayResolve();
        }, timer);
    }
    
}

export const PlayEcharts = (echartsViewObje, resolve) => {
    changeEchartsData = echartsViewObje?.changeDataShow;
    pData = echartsViewObje?.pData;
    dataKey = echartsViewObje?.titleKey;
    seriesIndex = 0;
    dataIndex = 0;
    pDataIndex = 0;
    playState.value = true;
    if(echartsViewObje?.myChart) {
        echartObj = echartsViewObje.myChart;
        series = echartObj?.getOption()?.series || [];
    } else {
        series = echartsViewObje?.getOption()?.series || [];
        echartObj = echartsViewObje;
    }
    if(series.length > 0) {
        PlayResolve = resolve;
        play();
    } else {
        resolve();
    }
}

export const StopPlayEcharts = () => {
    playState.value = false;
}