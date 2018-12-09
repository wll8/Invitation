<template>
  <div class="page_call full-screen oh">
    <bgimg :src="bgimgSrc" animate/>
    <div class="mask full-screen">
      <div class="btnBox">
        <img class="tip" src="../assets/images/tip.png"/>
        <img class="message" src="../assets/images/message.png"/>
        <img class="refuse" src="../assets/images/refuse.png"/>
        <img class="answer" src="../assets/images/answer.png" @click="()=>this._redirectToTalk()"/>
      </div>
    </div>
    <audio class="hidden" autoPlay id="call-audio" autoPlay loop>
      <source src="../assets/audio/calls.mp3" type="audio/ogg"/>
      <source src="../assets/audio/calls.ogg" type="audio/ogg"/>
    </audio>
  </div>
</template>

<script>
export default {
  name: 'page_call',
  data() {
    return {
      bgimgSrc: require('../assets/images/myimg/14.jpg'),
    };
  },
  mounted() {},
  computed: {},
  created() {},
  methods: {
    _redirectToTalk() {
      this.$router.push('/talk')
    }
  },
  components: {
  }
};
</script>

<style lang="less" scoped>
  @import "../assets/css/util.less";

  .page_call {
    .btnBox {
      width: 300px;
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
