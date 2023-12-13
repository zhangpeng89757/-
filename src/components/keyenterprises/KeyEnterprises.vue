<!-- 知识产权重点企业展示 -->
<template>
    <div class="keyEnterprises-box-title background-image-box">
        <knowledgeTitle title="知识产权重点企业展示" text="家"></knowledgeTitle>
        <el-image class="KeyEnterprises-background" :src="GetPublicSource('enterprises-background.png')"></el-image>
        <div class="enterprises-one">
            <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
            <div class="word-one" style="width: 180px;">知识产权优势企业
                <p class="text"><b>{{ viewObj.advantageEnterprise }}</b></p>
            </div>
        </div>
        <div class="enterprises-two">
            <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
            <div class="word-two" style="width: 180px;">专精特新企业
                <p class="text"><b>{{ viewObj.specializedEnterprises }}</b></p>
            </div>
        </div>
        <div class="enterprises-three">
            <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
            <div class="word-three" style="width: 180px;">知识产权贯标企业
                <p class="text"><b>{{ viewObj.intellectualEnterprises }}</b></p>
            </div>
        </div>
        <div class="enterprises-four">
            <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
            <div class="word-four" style="width: 180px;">高新技术企业
                <p class="text"><b>{{ viewObj.highTechEnterprises }}</b></p>
            </div>
        </div>
        <div class="enterprises-five">
            <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
            <div class="word-five" style="width: 180px;">规上企业
                <p class="text"><b>{{ viewObj.regulatedEnterprises }}</b></p>
            </div>

        </div>
    </div>
</template>
<script setup>
import knowledgeTitle from '@/components/knowledgeTitle.vue'
import { GetPublicSource } from '../../SystemCom/GetImages'
import { reactive } from 'vue';

const viewObj = reactive({
    advantageEnterprise: 0,
    specializedEnterprises: 0,
    intellectualEnterprises: 0,
    highTechEnterprises: 0,
    regulatedEnterprises: 0
})
</script>
<style scoped>
.keyEnterprises-box-title {
    width: 50%;
    position: relative;
}

.enterprises {
    width: 70px;
    height: 40px;
}

.enterprises-one {
    position: absolute;
    top: 25%;
    left: 10%;
}

.word-one {
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-two {
    position: absolute;
    top: 25%;
    left: 60%;
}

.word-two {
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-three {
    position: absolute;
    top: 50%;
}

.word-three {
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-four {
    position: absolute;
    top: 50%;
    right: 10%;
}

.word-four {
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-five {
    position: absolute;
    bottom: 10%;
    left: 40%;
}

.word-five {
    position: absolute;
    top: 10%;
    left: 30%;
    font-size: 12px;
}

.text {
    background: linear-gradient(to right, #fff1f1, #00d9d9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 15px;
}
</style>