
<template>
    <!--  企业服务-->
    <div class="enterpriseServices">
      <knowledgeTitle title="企业服务"></knowledgeTitle>
      <div class="content">
        <div class="item">
          <div class="head"><p class="radio"></p>知产咨询</div>
          <div id="content">
            <div id="item">
              <p class="text">58</p>
              <p>已完成服务</p>
            </div>
            <div id="item">
              <p class="text">200</p>
              <p>企业需求</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="head"><p class="radio"></p>知产托管</div>
          <div id="content">
            <div id="item">
              <p class="text">58</p>
              <p>已完成服务</p>
            </div>
            <div id="item">
              <p class="text">200</p>
              <p>企业需求</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="head"><p class="radio"></p>项目资助</div>
          <div id="content">
            <div id="item">
              <p class="text">58</p>
              <p>已完成服务</p>
            </div>
            <div id="item">
              <p class="text">200</p>
              <p>企业需求</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="head"><p class="radio"></p>质押融资</div>
          <div id="content">
            <div id="item">
              <p class="text">58</p>
              <p>已完成服务</p>
            </div>
            <div id="item">
              <p class="text">200</p>
              <p>企业需求</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="head"><p class="radio"></p>维权援助</div>
          <div id="content">
            <div id="item">
              <p class="text">58</p>
              <p>已完成服务</p>
            </div>
            <div id="item">
              <p class="text">200</p>
              <p>企业需求</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="head"><p class="radio"></p>纠纷调节</div>
          <div id="content">
            <div id="item">
              <p class="text">58</p>
              <p>已完成服务</p>
            </div>
            <div id="item">
              <p class="text">200</p>
              <p>企业需求</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.enterpriseServices{
  height: 50%;
}
.content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height:  calc(100% - 40px);
}
.item{
  width: 32%;
  margin-top:5px ;
  background: #051e46;
  border-radius: 3px;

}
.head{
  display: flex;
  font-size: 10px;
  margin: 5px;
  align-items: center;
}
.radio{
  height: 3px;
  width: 3px;
  background-color: #00ddff;
  margin-right: 3px;
}
#content{
  display: flex;
  height: 70%;
  justify-content: center;
  align-items: center;
}
#item{
  width: 50%;
  font-size: 8px;
  text-align: center;

}
.text{
  background: linear-gradient(to right, #fff1f1, #00d9d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 15px;
}
</style>
<script setup>
import KnowledgeTitle from "./knowledgeTitle.vue";
import { ref } from 'vue';
// const message = ref();
</script>