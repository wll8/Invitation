<template>
  <div class="page_desktop full-screen oh">
    <div class="full-page desktop-page">
        <!-- 背景照片 -->
        <bgimg :bg="bgimgSrc"/>
        <div class="bg">

          <div class="videoBox" v-if="videoShow" @click="_closeVideo">
            <d-player ref="dplayer" @click.stop="_openVideo" class="videoEr" :options="options"></d-player>
          </div>

          <div class="top iconBox">
            <hotspot :click="() => $router.push('/invite')" icon="icon2" :head="$tool.cnNum(new Date($cfg.date[$userType]).getMonth()) + '月'" :body="new Date($cfg.date[$userType]).getDate() + ''" foot="邀约"/>
            <hotspot :click="_openVideo" icon="icon3" foot="视频"/>
            <hotspot :click="() => $router.push('/photos')" icon="icon4" foot="相册"/>
            <hotspot :click="() => $router.push('/blessing')" icon="icon5" foot="祝福"/>
          </div>

          <div class="buttom iconBox">
            <hotspot :click="() => $router.push('/dialing')" num="2" icon="icon6"/>
            <hotspot :click="() => $router.push('/wechat')" num="1" icon="icon7"/>
            <hotspot :click="() => $router.push('/photograph')" num="3" icon="icon8"/>
            <hotspot :click="() => $router.push('/map')" num="1" icon="icon9"/>
          </div>

        </div>
        <audio class="hidden" autoPlay id="desktop-audio">
          <source :src="audioMp3" type="audio/mpeg"/>
        </audio>

    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueDPlayer from 'vue-dplayer'

export default {
  name: 'page_desktop',
  data() {
    return {
      options: {
        screenshot: true,
        video: {
          url: this.$cfg.video.url,
          pic: this.$cfg.video.pic,
        },
        autoplay: false,
      },
      bgimgSrc: this.$cfg.pageBg.desktop,
      videoShow: false,
      audioMp3: this.$cfg.pageMp3.desktop,
      closeImg: '',
      iconImg: require('../assets/images/icon.png'),
    }
  },
  computed: {},
  mounted () {
    this.$tool.play('desktop-audio')
  },
  methods: {
    _openVideo(ev) {
      console.log('_openVideo', ev)
      this.videoShow = true
      this.$nextTick(() => {
        this.$refs.dplayer.dp.on('ended', () => {
          this.videoShow = false
          // 播放完毕直接销毁， 以避免微信嵌入广告
          // 如果不想关闭， 也可在此写回调重新打开
          // 另一个不显示广告的方法是使用 video 标签并添加 x5-video-player-type="h5" 属性
        });
      })

    },

    _closeVideo(ev) {
      let className = ev.target.className || ''
      if(typeof className === 'string') {
        if(className.includes('videoBox')) {
          this.videoShow = false
        }
        if(className.includes('dplayer-video')) {
          this.$refs.dplayer.dp.play()
        }
      }
    },
  },
  components: {
    // 'd-player': VueDPlayer,
    hotspot: Vue.component('hotspot', {
      template: `
        <div :class="['icon', icon]" @click="click">
          <div v-if="num" :class="['num', 'red-point-animate-' + num]">{{num}}</div>
          <div class="head">{{head}}</div>
          <div class="body">{{body}}</div>
          <div class="foot">{{foot}}</div>
        </div>
      `,
      props: {
        click: {
          type: Function,
          default: () => {},
        },
        num: String, // 角标
        icon: String, // icon 图标
        head: String, // 头部文字
        body: String, // 中间文字
        foot: String, // 下部文字
      },
    }),
  }
};
</script>

<style lang="less">
@import "../assets/css/util.less";
.page_desktop {
  .bg {
    position: absolute;
    z-index: 1;
    margin: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    .iconBox {
      width: 100%;

      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      align-content: flex-start;
      &.top {
        @media screen and (max-width: 320px) {
          margin-top: 10px;
        }
      }
      &.buttom {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: hsla(0,0%,100%,.5);
        .icon {
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .foot {
          display: none;
        }
      }
    }
  }

  .videoBox {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 9;
    .videoEr {
      height: 40%;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
    }
  }

  .icon(@icon) {
    background-image: url('../assets/images/icon@{icon}.png');
    .mbg;
  }
  .icon {
    @media screen and (max-width: 320px) {
      margin: 0;
    }
    width: 70px;
    height: 70px;
    margin: 10px;
    margin-bottom: 40px;
    text-align: center;
    position: relative;
    .num {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #f00;
      color: #fff;
      line-height: 20px;
      text-align: center;
        font-family: SimHei;
      border-radius: 50%;
      right: -2px;
      top: -2px;
    }
    .head {
      line-height: 26px;
      height: 26px;
    }
    .body {
      line-height: 44px;
      height: 44px;
    }
    .foot {
      line-height: 26px;
      height: 26px;
      font-size: 16px;
      font-weight: 200;
      // font-family: ZHSRXT;
    }

    &.icon2 {
      .head {
        color: #fff;
        font-size: 16px;
        font-family: FZKaTong;
      }
      .body {
        font-size: 34px;
        font-family: SimHei;
        font-weight: bold;
      }
      .icon(2)
    }
    &.icon3 { .icon(3) }
    &.icon4 { .icon(4) }
    &.icon5 { .icon(5) }
    &.icon6 { .icon(6) }
    &.icon7 { .icon(7) }
    &.icon8 { .icon(8) }
    &.icon9 { .icon(9) }
  }

  /* 红点动画 1 */
  .red-point-animate-1 {
    opacity: 0;
    /* 2个时间  动画播放时间  动画延时播放 播放次数 播放速度曲线 停留在最后一个动画 */
    .animation(red-point-animate-1 0.5s 1.5s 2 ease-in-out forwards);
  }
  @keyframes red-point-animate-1 {
    0% {
      .transform(scale(1));
      opacity: 1;
    }
    50% {
      .transform(scale(1.2));
      opacity: 1;
    }
    100% {
      .transform(scale(1));
      opacity: 1;
    }
  }
  /* 红点动画 2 */
  .red-point-animate-2 {
    /* 2个时间  动画播放时间  动画延时播放 播放次数 */
    .animation(red-point-animate-2 0.3s 0.4s 3);
  }
  @keyframes red-point-animate-2 {
    0% {
      .transform(rotate(0deg) scale(1.1))
    }
    25% {
      .transform(rotate(-20deg) scale(1.1))
    }
    50% {
      .transform(rotate(0deg) scale(1.1))
    }
    75% {
      .transform(rotate(20deg) scale(1.1))
    }
    100% {
      .transform(rotate(0deg) scale(1.1))
    }
  }
}
</style>
