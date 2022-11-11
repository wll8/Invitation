<template>
  <div :class="['com_bgimg bg-img', { 'bg-img-animate': obj.animate }]">
    <div
      class="bgImg"
      :style="`
        ${obj.src ? `background-image: url(${obj.src}); ` : ''};
        ${obj.color ? `background-color: ${obj.color}` : ''};
        ${obj.pos ? `background-position: ${obj.pos}` : ''};
      `"
    ></div>
  </div>
</template>

<script>
export default {
  name: `bgimg`,
  data() {
    return {}
  },
  props: [`bg`],
  computed: {
    obj() {
      return (typeof this.bg === `string` ? { src: this.bg } : this.bg) || {}
    },
  },
}
</script>

<style lang="less">
@import '../assets/css/util.less';
.com_bgimg {
  .bgImg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100%;
    // height: 100vh;
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
      .transform(scale(1.3));
    }
    100% {
      .transform(scale(1));
    }
  }
}
</style>
