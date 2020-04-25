<template>
  <div class="page_integrated">
    <bgimg :bg="bgimgSrc"/>
    <div class="bg">
      <img :src="whiteCircleImg" class="white-circle" />
      <integrateditem
        position="item-1"
        :imgSrc="require('../assets/images/circle-1-1.png')"
        title="爱的邀约"
        intro="邀请信息"
        :click="() => $router.push('invite')"
      />
      <integrateditem
        position="item-2"
        :imgSrc="require('../assets/images/circle-2-1.png')"
        title="播映快照"
        intro="独家收藏"
        :click="() => $router.push('photos')"
      />
      <integrateditem
        position="item-3"
        :imgSrc="require('../assets/images/circle-2-1.png')"
        title="好友动态"
        intro="祝福留言"
        :click="() => $router.push('blessing')"
      />
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: "page_integrated",
  data() {
    return {
      whiteCircleImg: require('../assets/images/white-circle2.png'),
      bgimgSrc: this.$cfg.pageBg.integrated,
    };
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {
  },
  components: {
    integrateditem: Vue.component('integrateditem', {
      template: `
        <div :class="'integrated-item ' + position" @click="click">
          <img :src="imgSrc"/>
          <p class="p-title">{{title}}</p>
          <p class="p-intro">{{intro}}</p>
        </div>
      `,
      props: {
        click: {
          type: Function,
          default: () => {},
        },
        title: String,
        intro: String,
        imgSrc: String,
        position: String,
      },
    }),
  }
};
</script>

<style lang="less">
@import "../assets/css/util.less";
.page_integrated {
  .com_bgimg {
    .bgImg {
      transform:scaleX(-1);
    }
  }
  .bg {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 1;
    margin: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .white-circle {
    position: absolute;
    height: 67%;
    width: 62%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    left: 0;
    top: 18.473763%;
    opacity: 0.6;
    -webkit-animation: whiteCircle 2s ease 1 both;
    animation: whiteCircle 2s ease 1 both;
  }

  .item-1 {
    left: 39.166667%;
    top: 25.348597%;
    img {
      .animation(itemImgAnimate 0.7s ease 1 both);
    }
    p {
      .animation(itemTitleAnimate 2s ease 1 both);
    }
  }
  .item-2 {
    left: 52.666667%;
    top: 47.68094535%;
    img {
      .animation(itemImgAnimate 0.7s 0.5s ease 1 both);
    }
    p {
      .animation(itemTitleAnimate 2s 0.7s ease 1 both);
    }
  }
  .item-3 {
    left: 37%;
    top: 70.317578%;
    img {
      .animation(itemImgAnimate 0.7s 1s ease 1 both);
    }
    p {
      .animation(itemTitleAnimate 2s 1.2s ease 1 both);
    }
  }
  .integrated-back {
    left: 208px;
    bottom: 20px;
    .animation(backAnimate 1s 1.5s 1 both);
  }
  .integrated-item {
    position: absolute;
    width: 334px;
    height: 134px;
    img {
      width: 67px;
      height: 67px;
      position: absolute;
      left: 0;
      top: 0;
      .transform(scale(0));
    }
    p {
      position: absolute;
      font-family: FZKaTong;
      color: white;
    }
    .p-title {
      left: 68px;
      font-size: 20px;
      top: -10px;
    }
    .p-intro {
      font-size: 16.25px;
      left: 73.5px;
      top: 22px;
    }
  }
  @keyframes whiteCircle {
    0% {
      .transform(translateX(-625px));
      opacity: 0;
    }
    100% {
      .transform(translateX(0px));
      opacity: 0.6;
    }
  }
  @keyframes itemImgAnimate {
    0% {
      .transform(scale(0));
    }
    70% {
      .transform(scale(1.2));
    }
    90% {
      .transform(scale(0.9));
    }
    100% {
      .transform(scale(1));
    }
  }
  @keyframes itemTitleAnimate {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes backAnimate {
    0% {
      .transform(translate(625px) translate3d(0, 0, 0));
      opacity: 0;
    }
    100% {
      .transform(translateX(0px) translate3d(0, 0, 0));
      opacity: 0.6;
    }
  }

}
</style>
