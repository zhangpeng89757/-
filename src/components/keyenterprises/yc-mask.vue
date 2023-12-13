<template>
    <div class="mask">
      <!-- 外层的遮罩 -->
      <div class="mask-cover" v-if="isShow" @click="closeByMask"></div>
      <!-- 设置动画 -->
      <transition name="fade">
        <!-- 内容区 -->
        <div class="mask-content" v-if="isShow">
          <!-- 插槽，放置要插入到遮罩里的内容 -->
          <slot name="default"></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  export default {
    props: {
      //是否可以点击遮罩关闭，默认是
      closeOnClickModal: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      //控制遮罩的显示
      let isShow = ref(false);
  
      //打开遮罩，由外部进行调用
      let showMask = () => {
        isShow.value = true;
      };
  
      //关闭遮罩
      let closeMask = () => {
        isShow.value = false;
      };
  
      //通过点击遮罩关闭
      let closeByMask = () => {
        if (props.closeOnClickModal) {
          isShow.value = false;
        }
      };
  
      return {
        isShow,
        showMask,
        closeMask,
        closeByMask,
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  // 最外层，设置position定位
  .mask {
    position: relative;
    color: #2e2c2d;
    font-size: 16px;
  }
  //遮罩，设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
  .mask-cover {
    background: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    z-index: 9999;
    // 设置top、left、宽高保证全屏遮罩
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  
  //内容层，z-index要大于遮罩层，确保内容在遮罩上显示
  .mask-content {
    position: fixed;
    top: 30%;
    height: 70%;
    z-index: 10000;
  }
  
  //动画
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  