<template>
  <div :class="animate ? 'bg-img bg-img-animate' : 'bg-img'">
    <div class="bgImg" :style="`background-image: url(${src})`"></div>
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
    animate: {type: Boolean},
  },

}
</script>

<style lang="less" scoped>
.bgImg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
@import "../assets/css/util.less";

/*背景大图动画*/
.bg-img-animate {
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
</style>
