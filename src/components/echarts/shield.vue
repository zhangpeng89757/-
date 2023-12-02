<template>
    <div class="background-image-box shield-box" :style="{backgroundImage:'url('+ global.GetImages('shield-bg.png') +')'}">
        <div :id="uuid" style="flex: 1;"></div>
    </div>
</template>
<script setup>
import { onMounted, getCurrentInstance, inject, reactive,ref,watch, onUnmounted  } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import { v4 as uuidv4 } from "uuid";
const global = inject('global');
/**定义父组件传参开始 */
const props = defineProps({
    data: { //百分比浮点数据 例：0.4
        type: Number,
        default: 1
    },
})

const { proxy } = getCurrentInstance();
const uuid = uuidv4();
let myChart = {};
let color = ["#2CC1A6", "#FFB420", "#FF7D61"];
const Init = () => {
    let chartDom = document.getElementById(uuid);
    if(chartDom == undefined) return;
    myChart = echarts.init(chartDom);
    let playColor = color[0];
    if(props.data > 60) {
        playColor = color[0]
    } else if(props.data > 30) {
        playColor = color[1]; 
    } else { 
        playColor = color[2]; 
    }
    let path1 = 'path://M12.7771 41.6289C12.2518 38.4372 12.3647 32.974 12.3647 32.974L30.9635 26.3789L49.0474 32.9725C49.0474 32.9725 48.6354 48.2235 43.6893 55.643C38.7432 63.0625 30.5001 65.9465 30.5001 65.9465C30.5001 65.9465 22.4964 63.8884 17.7231 55.643C12.9497 47.3977 13.5234 46.1627 12.7771 41.6289Z ';
    let path2 = 'path://M264.533333 384c0 0-38.4 12.8-25.6 98.133333 0 0-72.533333 59.733333-85.333333 153.6 0 0-8.533333 157.866667 81.066667 21.333333 0 0 21.333333 51.2 55.466667 98.133333 0 0-68.266667 21.333333-59.733333 76.8 0 0-4.266667 64 140.8 59.733333 0 0 102.4-8.533333 132.266667-46.933333L512 844.8l0 0 12.8 0c29.866667 42.666667 132.266667 46.933333 132.266667 46.933333 145.066667 4.266667 140.8-59.733333 140.8-59.733333 4.266667-55.466667-59.733333-76.8-59.733333-76.8 38.4-46.933333 55.466667-98.133333 55.466667-98.133333 89.6 140.8 81.066667-21.333333 81.066667-21.333333-17.066667-93.866667-85.333333-153.6-85.333333-153.6 8.533333-85.333333-25.6-98.133333-25.6-98.133333C750.933333 123.733333 520.533333 128 512 128l0 0C503.466667 128 273.066667 123.733333 264.533333 384z ';
    let option = {
        series: [{
            type: 'liquidFill',
            data: [props.data / 100],
            radius: '100%',
            outline: {
                show: false
            },
            itemStyle: {
                color: playColor, // 水球显示的背景颜色
                opacity: 0.8, // 波浪的透明度
                shadowBlur: 10 // 波浪的阴影范围
            },
            backgroundStyle: {
                opacity: 0.5,
                color: '#0A208B', // 水球未到的背景颜色
            },
            shape: path1,
            label: {
                position: ['50%', '50%'],
                formatter: function(d) {
                    return `${ parseInt(d.data * 100)}%`;
                },
                fontSize: 12,
                color: '#FFFFFF'
            }
        }]
    };
    option && myChart.setOption(option);
}
const resizeChart = () => {
    myChart?.resize?.();
}
watch(()=>props.data, ()=>{
    proxy.$nextTick(() => {

    }).then(()=>{
        setTimeout(() => {
            Init();
        }, 1000);
    })
},{
    deep:true,
    immediate: true
})
onMounted(()=> {
    proxy.$nextTick(() => {

    }).then(()=>{
        setTimeout(() => {
            Init();
            window.addEventListener("resize", resizeChart);
        }, 1000);
    })
})
onUnmounted(()=>{
    window.removeEventListener("resize", resizeChart);
})
</script>
<style scoped>
.shield-box {  padding: 10px; display: flex; box-sizing: border-box; overflow: hidden;}
</style>