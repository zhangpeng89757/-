<template>
  <div class="title_box"  :style="{backgroundImage:'url('+ global.GetImages('nav-title-bg.png') +')'}">
    <div class="title_box_text">{{ title }}
      <div class="title_box_span" v-if="text">({{ text }})</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject,toRefs} from 'vue';
const global:any = inject('global');
interface types {
  title?: string;
  text?: string;

}
const props = withDefaults(defineProps<types>(), {
  title: "",
  text: "",

});
const {
  title,
  text,
} = toRefs(props);
</script>
<style scoped lang="scss">
.title_box{
  width: 100%;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .title_box_text{
    position: absolute;
    left: 0;
    text-indent: 25px;
    line-height: 30px;
    font-size: 18px;
    // color: #fff;
    display: flex;
    align-items: center;
    font-weight: bold;
    .title_box_span{
      margin-top: 5px;
      margin-left: -18px;
      font-size: 12px;
      color: #C1E5FD;
    }
    // background-image: -webkit-linear-gradient(bottom,#C1E5FD 5%,#FFFFFF 95%);
  }
}
</style>