<!-- 知识产权重点企业展示 -->
<template>
    <div class="keyEnterprises-box-title background-image-box">
        <knowledgeTitle title="知识产权重点企业展示" text="家"></knowledgeTitle>
      <div class="box">
        <el-image class="KeyEnterprises-background" :src="GetPublicSource('enterprises-background.png')"></el-image>
        <div class="enterprises-one">
          <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
          <div class="word-one" style="width: 180px;">知识产权优势企业</div>
        </div>
        <div class="enterprises-two">
          <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
          <div class="word-two" style="width: 180px;">专精特新企业</div>
        </div>
        <div class="enterprises-three">
          <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
          <div class="word-three" style="width: 180px;">知识产权贯标企业</div>
        </div>
        <div class="enterprises-four">
          <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
          <div class="word-four" style="width: 180px;">高新技术企业</div>
        </div>
        <div class="enterprises-five">
          <el-image class="enterprises" :src="GetPublicSource('enterprisestittle.png')"></el-image>
          <div class="word-five" style="width: 180px;">规上企业</div>
        </div>
      </div>

    </div>
</template>
<script setup>
import knowledgeTitle from '@/components/knowledgeTitle.vue'
import { GetPublicSource } from '../../SystemCom/GetImages'
</script>
<style scoped>
.keyEnterprises-box-title {
    width: 50%;
    height: 100%;
}
.box{
  position: relative;
  height: calc(100% - 40px);
}
.enterprises {
    width: 70px;
    height: 40px;
}
.enterprises-one {
    position: absolute;
    top: 20%;
    //bottom: 3%;
}

.word-one {
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-two {
    position: absolute;
    top: 20%;
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
    top: 40%;
}

.word-three {
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-four {
    position: absolute;
    top: 40%;
    left: 60%;
}

.word-four{
    position: absolute;
    top: 15%;
    left: 30%;
    font-size: 12px;
}

.enterprises-five {
    position: absolute;
    top: 60%;
    left: 35%;
}

.word-five{
    position: absolute;
    top: 10%;
    left: 30%;
    font-size: 12px;
}

</style>