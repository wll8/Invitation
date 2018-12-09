<template>
  <div :class="['com_bgimg bg-img', {'bg-img-animate': animate}]">
    <div class="bgImg" :style="`background-color: ${color}; background-image: url(${src})`"></div>
  </div>
</template>

<script>
export default {
  name: 'bgimg',
  data () {
    return {}
  },
  props: {
    src: String,
    color: String,
    animate: {type: Boolean},
  },

}
</script>

<style lang="less" scoped>
@import "../assets/css/util.less";
.com_bgimg {
  .bgImg {
    position: absolute;
    width: 100%;
    height: 100%;
    .mbg;
  }

  /*背景大图动画*/
  &.bg-img-animate {
    .bgImg {
      animation: bgImgAnimate 10s infinite;
    }
  }

  @keyframes bgImgAnimate {
    50% {
      .transform(scale(1.3))
    }
    100% {
      .transform(scale(1))
    }
  }
}
</style>
