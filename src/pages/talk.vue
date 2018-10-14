<template>
  <div class="page_talk full-screen oh">
    <bgimg :src="bgimgSrc" animate/>
    <div class="mask full-screen">
      <div class="">
        <div class="count-down-title">婚礼倒计时</div>
        <div class="count-down-time">{{timestamp | _countDown}}</div>
        <img class="function" :src="functionImg"/>
        <img class="hung-up" :src="hungUpImg" @click="()=>this._redirectToDesktop()"/>
      </div>
      <audio class="hidden" id="talk-audio">
        <source :src="userType === 'boy' ? boyMp3 : girlMp3" type="audio/mpeg"/>
      </audio>
    </div>
  </div>
</template>

<script>
import bgimg from '@/components/bgimg.vue'

export default {
  name: 'page_talk',
  data() {
    return {
      userType: this.userType,
      userType: 'boy',
      timestamp: Date.parse(new Date()) / 1000,
      boyMp3: require('../assets/audio/talk.mp3'),
      girlMp3: require('../assets/audio/talk-girl.mp3'),
      bgimgSrc: require('../assets/images/photos/talk-bg.jpg'),
      functionImg: require('../assets/images/function.png'),
      hungUpImg: require('../assets/images/hung-up.png'),
    };
  },
  computed: {},
  created() {
    setInterval(()=> {
      this.timestamp = Date.parse(new Date()) / 1000
    }, 1000);
  },
  filters: {
    _countDown(timestamp) {
      var endTimestamp = 1577808000;
      if (timestamp == 0 || timestamp >= endTimestamp) {
        return '(已超过时间)';
      }
      var time = endTimestamp - timestamp;
      var day = Math.floor(time / 86400);
      var hour = Math.floor((time - day * 86400) / 1440);
      var minute = Math.floor((time - day * 86400 - hour * 1440) / 60);
      var second = Math.floor(time - day * 86400 - hour * 1440 - minute * 60);

      return `${day}天${hour}小时${minute}分${second}秒`;
    }
  },
  methods: {
    _redirectToDesktop() {
      this.$router.push('/desktop')
    }
  },
  components: {
    bgimg,
  }
};
</script>

<style lang="less" scoped>
  @import "../assets/css/util.less";

  .page_talk {
    text-align: center;
    .function {
      width: 90%;
      display: inline-block;
      margin-top: -110px;
    }
    .hung-up {
      width: 100px;
      margin-top: -60px;
    }

    .count-down-time {
      width: 100%;
      text-align: center;
      font-size: 31px;
      color: #fff;
    }

    .count-down-title {
      margin-top: 20px;
      width: 100%;
      text-align: center;
      height: 77px;
      line-height: 77px;
      color: #fff;
      font-size: 42px;
      font-family: FZKaTong;
    }

  }
</style>
