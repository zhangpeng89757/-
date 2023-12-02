<!--领导小组-->
<template>
    <div class="leadgroup-box">
        <MainListBlock style="flex: 1; overflow: hidden;" :data="viewObject.data" :rowNumber="3" :lineNumber="3">
            <template v-slot:item="{slotData}">
                <div class="leadgroup-item">
                    <div class="leadgroup-image-box">
                        <img :src="slotData.image" style="objectFit:contain">
                    </div>
                    <div class="leadgroup-text-box">
                        <div class="leadgroup-item-name">{{ slotData.name }}</div>
                        <div class="leadgroup-item-js">{{ slotData.js }}</div>
                    </div>
                </div>
            </template>
        </MainListBlock>
    </div>
</template>
<script setup>
import { reactive, watch, inject, onMounted } from 'vue'
import MainListBlock from '@/components/datadisplay/main-list-block.vue'
import * as API from '../../api/targetManage/api'
const global = inject('global');
const viewObject = reactive({
    //数据
    data: []
})
/**定义父组件传参开始 */
const props = defineProps({
    type: { //数据类型 LeaderZhiscqghmb： 领导小组-知识产权规划目标,LeaderHexyqxzb：领导小组-核心预期性指标
        type: String,
        default: 'LeaderZhiscqghmb'
    }
})
let getData = () => {
    if(props.type == "LeaderZhiscqghmb") {
       API.megaLeaderList('zhiscqghmb').then(res => {
            viewObject.data = []
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                let images = JSON.parse(element.tup);
                let imgArr = [];
                if(images != null) {
                    for (let i = 0; i < images.length; i++) {
                        const img = images[i];
                        imgArr.push(FileUrl + img.url)
                    }
                }
                viewObject.data.push({
                    name: element.name,
                    js: element.posts,
                    image: imgArr?.[0]
                })
            }
       })
    } else {
        API.megaLeaderList('hexyqxzb').then(res => {
            viewObject.data = []
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                let images = JSON.parse(element.tup);
                let imgArr = [];
                if(images != null) {
                    for (let i = 0; i < images.length; i++) {
                        const img = images[i];
                        imgArr.push(FileUrl + img.url)
                    }
                }
                viewObject.data.push({
                    name: element.name,
                    js: element.posts,
                    image: imgArr?.[0]
                })
            }
       })
    }
}
watch(()=>props, ()=>{
    getData();
},{
    deep:true,
    immediate: true
})
onMounted(()=>{
    getData();
})
</script>
<style scoped>
    .leadgroup-box { display: flex; flex-direction: column; font-size: var(--small-font-size); padding: 10px 4px; margin: 10px; box-sizing: border-box;}
    .leadgroup-box .main-list-block{ background-image: none; }
    .leadgroup-item { display: flex; align-items: center; }
    .leadgroup-image-box { width: 80px; overflow: hidden; height: 80px;} 
    .leadgroup-image-box img { width: 100%; height: 100%; }
    .leadgroup-text-box { flex: 1; display: flex; flex-direction: column; margin-left: 18px; height: 80px; }
    .leadgroup-text-box .leadgroup-item-name { font-size: var(--font18-size); margin-bottom: 10px; }
    .leadgroup-text-box .leadgroup-item-js { font-size: var(--medium-font-size); }
</style>