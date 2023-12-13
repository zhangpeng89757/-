<!-- 知识产权重点企业展示 -->
<template>
    <div class="keyEnterprises-box-title background-image-box">
        <knowledgeTitle title="知识产权重点企业展示" text="家"></knowledgeTitle>
        <div class="-content-box">
                <div class="KeyEnterprises-content-item">
                    <el-image class="KeyEnterprises-background" :src="GetPublicSource('enterprises-background.png')"></el-image>
                </div>
        </div>
    </div>
</template>
<script setup>
import knowledgeTitle from '@/components/knowledgeTitle.vue'
import { GetPublicSource } from '../../SystemCom/GetImages'
</script>
<style scoped>
.keyEnterprises-box-title{
    width: 50%;
}
</style>