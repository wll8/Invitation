<template>
  <div class="page_call">
    <bgimg :src="bgimgSrc" animate/>
    <div class="bg">
      <div class="btnBox">
        <img class="tip" src="../assets/images/tip.png"/>
        <img class="message" src="../assets/images/message.png"/>
        <img class="refuse" src="../assets/images/refuse.png"/>
        <img class="answer" src="../assets/images/answer.png" @click="()=>this._redirectToTalk()"/>
      </div>
    </div>
    <audio class="hidden" id="call-audio" autoPlay loop>
      <source src="../assets/audio/calls.mp3" type="audio/ogg"/>
      <source src="../assets/audio/calls.ogg" type="audio/ogg"/>
    </audio>
  </div>
</template>

<script>
import bgimg from '@/components/bgimg.vue'

export default {
  name: 'page_call',
  data() {
    return {
      bgimgSrc: require('../assets/images/photos/call-bg.jpg'),
    };
  },
  computed: {},
  created() {},
  methods: {
    _redirectToTalk() {
      this.$router.push('/talk')
    }
  },
  components: {
    bgimg,
  }
};
</script>

<style lang="less" scoped>
  @import "../assets/css/util.less";

  .page_call {
    .bg {
      background-color: rgba(0, 0, 0, 0.31);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
    .btnBox {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      position: absolute;
      bottom: 80px;
      margin: auto;
      left: 0;
      right: 0;
      img {
        margin-bottom: 20px;
      }
    }
    .answer {
      .animation(call-answer-animation 2s infinite);
    }

    /*接听按钮动画*/
    @keyframes call-answer-animation {
      20% {
        .transform(scale(1.1) rotate(0deg))
      }
      30% {
        .transform(scale(1.1) rotate(10deg))
      }
      40% {
        .transform(scale(1.1) rotate(-10deg))
      }
      50% {
        .transform(scale(1.1) rotate(10deg))
      }
      60% {
        .transform(scale(1.1) rotate(-10deg))
      }
      70% {
        .transform(scale(1.1) rotate(10deg))
      }
      80% {
        .transform(scale(1.1) rotate(-10deg))
      }
      90% {
        .transform(scale(1.1) rotate(10deg))
      }
    }
  }
</style>
