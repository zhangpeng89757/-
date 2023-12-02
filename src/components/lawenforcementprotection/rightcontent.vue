<!--保护成果-->
<template>
    <div style="position: relative;display: flex; overflow: hidden; flex: 1;">
        <div class="lawenforcementprotection-rightcontent-box">
            <template v-for="(item, index) in viewData.data">
                <div class="lawenforcementprotection-rightcontent-item" @click="showInfoContent(item)">
                    <div class="lawenforcementprotection-rightcontent-item-title">
                        <div>{{  index + 1 }}</div>
                        <div>{{ item.title }}</div>
                    </div>
                    <div class="lawenforcementprotection-rightcontent-item-content">
                        {{ item.content?.substr(0, 75) }}<span style="margin-left: 10px;color: #4ACBF3;">查看全文</span>
                    </div>
                    <div class="lawenforcementprotection-rightcontent-item-images">
                        <template v-for="(img,index) in item.images">
                            <div class="lawenforcementprotection-rightcontent-item-image" v-if="index < 2" :style="{backgroundImage:'url('+ global.GetImages('lawenforcementprotection-img-bg.png') +')'}">
                                <el-image style="width: 180px; height: 90px; margin-bottom: 4px;" :src="img" fit="contain"/>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
        <div class="lawenforcementprotection-rightcontent-info-box" v-if="viewData.showInfo">
            <div v-if="viewData.showInfo" style="text-align: right;margin:0 4px;"><el-icon @click="viewData.showInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <div class="lawenforcementprotection-rightcontent-info-body">
                <div class="lawenforcementprotection-rightcontent-info-body-title">{{ viewData.showData.title }}</div>
                <div class="lawenforcementprotection-rightcontent-info-body-content">{{ viewData.showData.content }}</div>
                <div class="lawenforcementprotection-rightcontent-info-body--images">
                    <template v-for="(img,index) in viewData.showData.images">
                        <div class="background-image-box" :style="{backgroundImage:'url('+ global.GetImages('lawenforcementprotection-img-bg.png') +')', padding: '12px', marginBottom: '10px'}">
                            <el-image style="width: 100%; margin-bottom: 4px;" :src="img" fit="contain"/>
                        </div>
                    </template>
                </div>
                <div class="lawenforcementprotection-rightcontent-info-body-content" style="text-align: right;">{{ viewData.showData.updateTime }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, watch, inject, onMounted } from 'vue'
import * as HTTPAPI from '../../api/lawenforcementprotection/api' 
const global = inject('global');
let viewData = reactive({
    data: [],
    showInfo: false,
    showData: {}
})
let showInfoContent = (data) => {
    viewData.showInfo = true;
    viewData.showData = {};
    HTTPAPI.protectionAchievementInfo(data.id).then(res => {
        let data = res.data;
        let images = JSON.parse(data.images);
        let imgArr = [];
        if(images != null) {
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                imgArr.push(FileUrl + img.url)
            }
        }
        data.images = imgArr;
        viewData.showData = data;
    });
}
const LoadData = () => {
    HTTPAPI.protectionAchievementsList().then(res => {
        for (let index = 0; index < res.data.list.length; index++) {
            const element = res.data.list[index];
            let images = JSON.parse(element.images);
            let imgArr = [];
            if(images != null) {
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    imgArr.push(FileUrl + img.url)
                }
            }
            element.images = imgArr;
        }
        viewData.data = res.data.list;
    })
}

onMounted(()=>{
    LoadData();
})
</script>
<style scoped>
.lawenforcementprotection-rightcontent-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    margin-top: 10px;
}
.lawenforcementprotection-rightcontent-item { display: flex; flex-direction: column; margin:20px 10px 10px; cursor: pointer; padding: 10px; background-image: linear-gradient(180deg, rgba(5, 4, 87, 0.60) -31.62%, rgba(35, 65, 143, 0.60) 100%);}
.lawenforcementprotection-rightcontent-item-title { display: flex; align-items: center; font-size: var(--default-font-size);}
.lawenforcementprotection-rightcontent-item-title div:nth-child(1) { width: 22px; height: 22px; border-radius: 22px; color: #fff; background-color: #FFB013; text-align: center; line-height: 22px; margin-right: 10px;}
.lawenforcementprotection-rightcontent-item-title div:nth-child(2) { 
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.lawenforcementprotection-rightcontent-item-content { 
    margin: 10px 0; 
    max-lines: 3; 
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.7;
    text-indent:2em;
    font-size: var(--medium-font-size);
}
.lawenforcementprotection-rightcontent-item-images { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px;}
.lawenforcementprotection-rightcontent-item-image {
    width: 190px;
    height: 103px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
}
.lawenforcementprotection-rightcontent-info-box { position: absolute; top: 0; left: 0;  height: 100%; width: 100%; box-sizing: border-box; z-index: 120;  background: rgba(5, 5, 76, 0.94); display: flex; overflow: hidden; flex-direction: column;}
.lawenforcementprotection-rightcontent-info-body { margin: 0 10px 20px 20px; overflow-y: auto;}

.lawenforcementprotection-rightcontent-info-body-title { font-size: var(--default-font-size); margin-bottom: 20px; }
.lawenforcementprotection-rightcontent-info-body-content { font-size: var(--medium-font-size); margin-bottom: 20px; line-height: 1.7;}
.lawenforcementprotection-rightcontent-info-body--images { display: grid; grid-template-columns: repeat(1,1fr); }
</style>