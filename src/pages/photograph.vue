<template>
  <div class="page_photograph">
    <div :class="_getAnimagetClass">
      <!-- <img :src="bgImg" class="photo"> -->
      <div class="photo" :style="`background-image: url(${bgImg})`" />
      <img :src="blackWhiteImg" class="black-white">
      <img :src="borderImg" class="photo-border">
      <div class="photograph-focus"></div>
      <img :src="blackImg" class="black-bg">
      <img :src="weddingImg" class="wedding">
      <div class="wedding-result" @click="doTimerSecond">
        <img :src="loveImg" class="love-start">
        <div class="start-button" @click="$router.push('/integrated')">开启</div>
      </div>
    </div>
    <audio class="hidden" id="photograph-audio">
      <source src type="audio/mpeg">
    </audio>
  </div>
</template>

<script>

export default {
  name: "page_photograph",
  data() {
    return {
      animateStep: 0,
      bgImg: this.$cfg.pageImg.photograph,
      borderImg: require('../assets/images/photo-border.png'),
      blackWhiteImg: require('../assets/images/black-white.png'),
      blackImg: require('../assets/images/black.jpg'),
      weddingImg: require('../assets/images/wedding.png'),
      loveImg: require('../assets/images/love-start.png'),
      DidiMp3: require('../assets/audio/dididi.mp3'),
      KachaMp3: require('../assets/audio/kacha.mp3'),
    };
  },
  computed: {
    _getAnimagetClass() {
      switch (this.animateStep) {
        case 0:
          return "animate";
        case 1:
          return "animate animate-first";
        case 2:
          return "animate animate-second";
        case 3:
          return "animate animate-third";
      }
    }
  },
  created() {},
  mounted() {
    /*0.5秒后启动第一段动画(四次大黑圈-隐藏出现隐藏出现)*/
    this.timerFirst = setTimeout(this.timerFirstFn, 500)
    /*1s后播放第一段音频*/
    this.timerFirstAudio = setTimeout(this.timerFirstAudioFn, 1000)
    /*8.5秒后启动第二段动画（包含咔嚓时候的动画，和咔嚓完出现的love）*/
    this.timerSecond = setTimeout(this.timerSecondFn, 8500)
    /*9s后播放第二段音頻*/
    this.timerSecondAudio = setTimeout(this.timerSecondAudioFn, 9000)
    /*11.5秒后启动第三段动画（结果页出现）*/
    this.timerThird = setTimeout(this.timerThirdFn, 11500)
  },
  beforeDestroy() {
    this.clearTimeout('timerFirst')
    this.clearTimeout('timerFirstAudio')

    this.clearTimeout('timerSecond')
    this.clearTimeout('timerSecondAudio')

    this.clearTimeout('timerThird')
  },
  methods: {
    clearTimeout(name){
      this[name] && clearTimeout(this[name])
    },
    timerFirstFn(){
      this.animateStep = 1
      this.clearTimeout('timerFirst')
    },
    timerFirstAudioFn(){
      this.$tool.play('photograph-audio', this.DidiMp3)
      this.clearTimeout('timerFirstAudio')
    },
    timerSecondFn(){
      this.animateStep = 2
      this.clearTimeout('timerSecond')
    },
    timerSecondAudioFn(){
      this.$tool.play('photograph-audio', this.KachaMp3)
      this.clearTimeout('timerSecondAudio')
    },
    timerThirdFn(){
      this.animateStep = 3
      this.clearTimeout('timerThird')
    },
    doTimerSecond() {
      // 用户手动点击拍照， 将取消之前设定的所有定时任务
      if(this.animateStep < 2) {
        this.animateStep = 2
        this.clearTimeout('timerFirst')
        this.clearTimeout('timerFirstAudio')
        this.clearTimeout('timerSecond')
        this.clearTimeout('timerSecondAudio')
        this.clearTimeout('timerThird')
        this.timerSecondFn()
        this.timerSecondAudio = setTimeout(this.timerSecondAudioFn, 500)
        this.timerThird = setTimeout(this.timerThirdFn, 2500)
      }
    },

  },
  components: {}
};
</script>

<style lang="less">
@import "../assets/css/util.less";

.page_photograph {
  .photo {
    .mbg;
  }
  .animate {
    .photo {
      .full-screen;
      z-index: -1;
      .transform(scale(1.3));
    }
    .photo-border {
      .full-screen;
    }
    .black-white {
      .full-screen;
      opacity: 0;
    }
    .photograph-focus {
      width: 50px;
      height: 50px;
      background: url(../assets/images/red-focus.png) 50px 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -25px;
      margin-left: -25px;
      opacity: 1;
    }
    .black-bg {
      .full-screen;
      opacity: 0;
    }
    .wedding {
      position: absolute;
      width: 300px;
      bottom: 20%;
      right: 0;
      left: 0;
      margin: auto;
      .transform(scale(1.5));
      opacity: 0;
    }
    .wedding-result {
      .full-screen;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.6);
      .love-start {
        position: absolute;
        width: 243px;
        bottom: 30%;
        right: 0;
        left: 0;
        margin: auto;
      }
      .start-button {
        width: 323px;
        height: 50px;
        line-height: 50px;
        border: 1px solid white;
        color: white;
        border-radius: 2px;
        position: absolute;

        position: absolute;
        width: 243px;
        bottom: 20%;
        right: 0;
        left: 0;
        margin: auto;

        text-align: center;
        font-size: 20px;
        font-family: FZKaTong;
      }
    }
  }
  /*第一次动画包含了四次blackWhite转换*/
  .animate-first {
    /*黑框动画*/
    .black-white {
      .animation(blackWhite 2s 4 ease-out);
    }
    /*照片动画*/
    .photo {
      .transform(scale(1.3));
      .animation(photo 8s forwards);
    }
    /*焦点动画*/
    .photograph-focus {
      background: url(../assets/images/red-focus.png) 50px 50px;
      /*2个时间  动画播放时间  动画延时播放 播放次数 播放速度曲线 停留在最后一个动画*/
      .animation(photographFocus 0.15s 2s 10 ease-in-out forwards);
    }
  }
  /*第二次动画包含了拍照咔喳*/
  .animate-second {
    .photo {
      .transform(scale(1));
    }
    .black-white {
      .animation(blackWhiteSecond 0.5s ease-in);
    }
    .black-bg {
      .animation(blackBgSecond 0.1s 0.4s ease-out);
    }
    .photograph-focus {
      background: url(../assets/images/blue-focus.png) 50px 50px;
      opacity: 0;
      /*0.1s后隐藏*/
      .transition(opacity 0s 0.35s);
    }
    .wedding {
      .animation(weddingSecond 1s 1.5s ease-out forwards);
    }
  }
  /*第三次动画包含了结果页*/
  .animate-third {
    .photo {
      .transform(scale(1));
    }
    .photograph-focus {
      opacity: 0;
    }
    .photo-border {
      opacity: 0;
    }
    .wedding-result {
      opacity: 1;
      .transition(opacity 1s);
    }
  }
  @keyframes weddingSecond {
    0% {
      .transform(scale(1.5));
      opacity: 1;
    }
    100% {
      .transform(scale(1));
      opacity: 1;
    }
  }
  @keyframes blackBgSecond {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      optity: 0;
    }
  }
  @keyframes blackWhiteSecond {
    0% {
      opacity: 0;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      optity: 0;
    }
  }
  @keyframes photographFocus {
    0% {
      background: url(../assets/images/blue-focus.png) 50px 50px;
    }
    50% {
      background: url(../assets/images/red-focus.png) 50px 50px;
    }
    100% {
      background: url(../assets/images/blue-focus.png) 50px 50px;
    }
  }
  /*照片动画*/
  @keyframes photo {
    0% {
      .transform(scale(1.3) translate(-5px, 5px) rotate(0deg));
    }
    4% {
      .transform(scale(1.3) translate(5px, -4px) rotate(3deg));
    }
    7% {
      .transform(scale(1.3) translate(-10px, 20px));
    }
    10% {
      .transform(scale(1.3) translate(0px, 9px) rotate(0deg));
    }
    13% {
      .transform(scale(1.3) translate(15px, 20px) rotate(2deg));
    }
    17% {
      .transform(scale(1.3) translate(-10px, -10px));
    }
    20% {
      .transform(scale(1.3) translate(0px, 0px) rotate(0deg));
    }

    23% {
      .transform(scale(1.3) translate(-9px, 9px) rotate(0deg));
    }

    26% {
      .transform(scale(1.3) translate(9px, 9px) rotate(1deg));
    }
    30% {
      .transform(scale(1.1) translate(9px, -9px) rotate(3deg));
    }
    32% {
      .transform(scale(1.2) translate(0px, 0px) rotate(2deg));
    }
    35% {
      .transform(scale(1.2) translate(0px, 0px) rotate(1deg));
    }
    40% {
      .transform(scale(1.3) translate(0px, 0px) rotate(0deg));
    }
    68% {
      .transform(scale(1.3) translate(0px, 0px) rotate(0deg));
    }
    72% {
      .transform(scale(1) translate(0px, 0px) rotate(0deg));
    }
    100% {
      .transform(scale(1) translate(0px, 0px) rotate(0deg));
    }
  }
  //@keyframes photo {
  //  0% {
  //    .transform(scale(1.3) translate(-5px, 5px) rotate(0deg));
  //  }
  //  4% {
  //    .transform(scale(1.3) translate(5px, -4px) rotate(3deg));
  //  }
  //  9.33% {
  //    .transform(scale(1.3) translate(-10px, 20px));
  //  }
  //  13.33% {
  //    .transform(scale(1.3) translate(0px, 9px) rotate(0deg));
  //  }
  //  17.33% {
  //    .transform(scale(1.3) translate(15px, 20px) rotate(2deg));
  //  }
  //  23% {
  //    .transform(scale(1.3) translate(-10px, -10px));
  //  }
  //  26.7% {
  //    .transform(scale(1.3) translate(0px, 0px) rotate(0deg));
  //  }
  //
  //  26.7% {
  //    .transform(scale(1.3) translate(-9px, 9px) rotate(0deg));
  //  }
  //
  //  30.59% {
  //    .transform(scale(1.3) translate(9px, 9px) rotate(1deg));
  //  }
  //  34.67% {
  //    .transform(scale(1.1) translate(9px, -9px) rotate(3deg));
  //  }
  //  42.56% {
  //    .transform(scale(1.2) translate(0px, 0px) rotate(2deg));
  //  }
  //  46.55% {
  //    .transform(scale(1.2) translate(0px, 0px) rotate(1deg));
  //  }
  //  53.2% {
  //    .transform(scale(1.3) translate(0px, 0px) rotate(0deg));
  //  }
  //  90.4% {
  //    .transform(scale(1.3) translate(0px, 0px) rotate(0deg));
  //  }
  //  95.79% {
  //    .transform(scale(1) translate(0px, 0px) rotate(0deg));
  //  }
  //  100% {
  //    .transform(scale(1) translate(0px, 0px) rotate(0deg));
  //  }
  //}
  @keyframes blackWhite {
    0% {
      opacity: 0.3;
    }
    60% {
      opacity: 0.8;
    }
    80% {
      opcity: 0.3;
    }
    100% {
      optity: 0;
    }
  }

}
</style>
