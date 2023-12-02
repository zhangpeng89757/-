<template>
  <div class="bar-box">
    <div :id="uuid" class="bar-content"></div>
  </div>
</template>
<script setup>
import { onMounted, getCurrentInstance, watch } from 'vue'
import * as echarts from 'echarts';
import { v4 as uuidv4 } from "uuid";
const { proxy } = getCurrentInstance();
const uuid = uuidv4();
/**定义父组件传参开始 */
const props = defineProps({
    data: { //数据
        type: Object,
        default: () => { return { sbdata: [], zldata: [], legendData: [] }  }
    },
})
const Init = () => {
  var chartDom = document.getElementById(uuid);
  var myChart = echarts.init(chartDom);
  var option;
  const seriesLabel = {
    show: true
  };
  let sbdata = props.data?.sbdata ?? [];
  let zldata = props.data?.zldata ?? [];
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: '1%',
      right: '3%',
      icon: 'roundRect',//长方形
      itemWidth: 12,   // 图例标记的图形宽度  
      itemHeight: 4,   // 图例标记的图形高度 在修改图例标记图形的时候可以用到。比如矩形变成直线
      inactiveColor: "#ccc",
      type: 'plain',
      inactiveColor: "#ccc",  //当点击图例关闭后的颜色
      //图例中文字的样式
      textStyle: {
          color: "#fff", //文字的颜色
          fontSize: 12, //文字的字号
          lineHeight: 14, //行高
      },
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: [{
      type: 'category',
      splitLine: {
        show: false,
      },
      axisLine: {
        //y轴
        show: false,
      },
      axisTick: {
        show:false
      },
      data: props.data?.legendData ?? [],
      axisLabel: {
        color: "#fff",
        formatter: function(params) {
          var newParamsName = ""; // 最终拼接成的字符串
          var paramsNameNumber = params.length; // 实际标签的个数
          var provideNumber = 6; // 每行能显示的字的个数
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
          /**
           * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
           */
          // 条件等同于rowNumber>1
          if (paramsNameNumber > provideNumber) {
            /** 循环每一行,p表示行 */
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ""; // 表示每一次截取的字符串
              var start = p * provideNumber; // 开始截取的位置
              var end = start + provideNumber; // 结束截取的位置
              // 此处特殊处理最后一行的索引值
              if (p == rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr; // 最终拼成的字符串
            }

          } else {
            // 将旧标签的值赋给新标签
            newParamsName = params;
          }
          //将最终的字符串返回
          return newParamsName
        }
      },
    },
    {
      triggerEvent: true,
      show: true,
      data: sbdata,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        color: "#fff",
        align: "left",
        margin: 10,
        lineHeight: 16,
        fontSize: 13,
        formatter: function (value, index) {
          return  '{a|'+ sbdata[index]  +'}' + '\n' + '{b|'+ zldata[index]  +'}'
        },
        textStyle:{
          //在rich中给formatter添加个别字体颜色
          rich:{
              a:{
                color:'#5FFFE2'
              },
              b:{
                color:'#43BAFF'
              },
          },
      },
      },
    }],
    series: [
      {
        name: '商标',
        type: 'bar',
        color: '#5FFFE2',
        showBackground: true,
        data: sbdata,
        barGap: '50%', //不同系列的柱间距离，为百分比（如 '30%'，表示柱子宽度的 30%）。
        barCategoryGap: '40%', //同一系列的柱间距离，默认为类目间距的20%，可设固定值
      },
      {
        name: '专利',
        type: 'bar',
        color: '#43BAFF',
        showBackground: true,
        data: zldata,
        barGap: '50%', //不同系列的柱间距离，为百分比（如 '30%'，表示柱子宽度的 30%）。
        barCategoryGap: '40%', //同一系列的柱间距离，默认为类目间距的20%，可设固定值
      },
      
    ]
  };
  option && myChart.setOption(option);
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

    }).then(()=>{
        setTimeout(() => {
            Init();
        }, 500);
    })
})
</script>
<style scoped>
.bar-box { 
  display: flex; 
  flex-direction: column;
  flex: 1;
  position: relative;
}
.bar-content {
  flex: 1;
}
</style>