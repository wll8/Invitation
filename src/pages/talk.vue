<template>
  <div class="page_talk full-screen oh">
    <bgimg :bg="bgimgSrc"/>
    <div class="mask full-screen">
      <div class="textInfo">
        <div class="count-down-title">婚礼倒计时</div>
        <div class="count-down-time">{{timestamp | _countDown(endTimestamp)}}</div>
        <img class="function" :src="functionImg"/>
        <img class="hung-up" :src="hungUpImg" @click="()=>this._redirectToDesktop()"/>
      </div>
      <audio class="hidden" id="talk-audio">
        <source :src="$userType === 'boy' ? boyMp3 : girlMp3" type="audio/mpeg"/>
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_talk',
  data() {
    return {
      interval: undefined,
      audioTimer: undefined,
      timestamp: Date.parse(new Date()),
      endTimestamp: Date.parse(this.$cfg.date[this.$userType]),
      boyMp3: this.$cfg.pageMp3.talk.boy,
      girlMp3: this.$cfg.pageMp3.talk.girl,
      bgimgSrc: this.$cfg.pageBg.talk,
      functionImg: require('../assets/images/function2.png'),
      hungUpImg: require('../assets/images/hung-up.png'),
    }
  },
  mounted() {
    this.interval = setInterval(()=> {
        this.timestamp = Date.parse(new Date())
    }, 1000)
    /* 音频延迟 0.1 秒播放 */
    this.audioTimer = setTimeout(()=> {
        this.$tool.play('talk-audio')

        const audio = document.getElementById('talk-audio');
        audio.addEventListener('ended', () => {
          this._redirectToDesktop()
        }, false);

    }, 100)
  },
  destroyed () {
    this.interval && clearInterval(this.interval)
    this.audioTimer && clearTimeout(this.audioTimer)
  },
  filters: {
    _countDown(timestamp, endTimestamp) {
      if (timestamp == 0 || timestamp >= endTimestamp) {
        return '(已超过时间)'
      }
      let date1 = new Date(timestamp);  // 开始时间
      let date2 = new Date(endTimestamp);    // 结束时间
      let date3 = date2.getTime() - new Date(date1).getTime();   // 时间差的毫秒数

      // 计算出相差天数
      let days = Math.floor(date3 / (24 * 3600 * 1000))

      // 计算出小时数

      let leave1 = date3 % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      let leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      let leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000)

      return `${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`

    }
  },
  methods: {
    _redirectToDesktop() {
      this.$router.push('/desktop')
    }
  },
  components: {
  }
};
</script>

<style lang="less">
@import "../assets/css/util.less";

.page_talk {
  text-align: center;

  .textInfo {
    .function {
      width: 70%;
      display: inline-block;
      margin-top: 20px;
      position: absolute;
      bottom: 30%;
      margin: auto;
      left: 0;
      right: 0;

    }
    .hung-up {
      width: 100px;
      margin-top: 20px;
      // margin-top: -60px;

      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 5%;
    }

    .count-down-time {
      width: 100%;
      text-align: center;
      padding-top: 10px;
      font-size: 1.5em;
      color: #fff;
    }

    .count-down-title {
      margin-top: 10%;
      width: 100%;
      text-align: center;
      height: 100%;
      line-height: 100%;
      color: #fff;
      font-size: 3em;
      font-family: FZKaTong;
    }
  }

}
</style>
