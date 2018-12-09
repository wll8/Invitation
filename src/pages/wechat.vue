<template>
  <div class="page_wechat">
    <bgimg color="#fff" :animate="false"/>
    <div class="telBox">
      <a href="javascript:;" :class="['telItem']" v-for="item in itemList" @click="_playAudio(item.key)">
        <div class="after" :style="`background-image: url(${item.img});`"></div>
        <div :class="['member', item.class]">
          <div class="text name">{{item.name}}</div>
          <div class="text dev">语音消息</div>
        </div>
        <div class="time">
          <!-- 距离 call 页面的相对时间 -->
          <div class="timeText">刚刚</div>
        </div>
      </a>
    </div>
    <div class="footBar">
      <div class="icon cur">
        <div class="iconImg" :style="`background-image: url('${require('../assets/images/w_msg.png')}');`"></div>
        <div class="iconText">微信</div>
      </div>
      <div class="icon">
        <div class="iconImg" :style="`background-image: url('${require('../assets/images/w_mail_list.png')}')`"></div>
        <div class="iconText">通讯录</div>
      </div>
      <div class="icon">
        <div class="iconImg" :style="`background-image: url('${require('../assets/images/w_discovery.png')}');`"></div>
        <div class="iconText">发现</div>
      </div>
    </div>
    <!-- <Back /> -->
    <audio class="hidden" id="wechat-audio">
      <source :src="audioMp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>

export default {
  name: 'page_wechat',
  data() {
    return {
      itemList: [
        {
          key: 'boy',
          name: '新郎',
          audio: this.$cfg.wechat.boy.audio,
          class: 'animation1',
          img: this.$cfg.wechat.boy.img,
        },
        {
          key: 'girl',
          name: '新娘',
          audio: this.$cfg.wechat.girl.audio,
          class: 'animation2',
          img: this.$cfg.wechat.girl.img,
        },
      ],
      audioMp3: require('../assets/audio/dong.mp3'),
      returnImg: require('../assets/images/return.png'),
    }
  },
  computed: {},
  created() {},
  mounted() {
    setTimeout(()=> {
      this.$tool.play('wechat-audio')
    }, 100)
  },
  methods: {
    _playAudio(type) {
      this.$tool.play('wechat-audio', this.itemList.find(item => item.key === type).audio)
    },
  },
  components: {}
};
</script>

<style lang="less">
@import "../assets/css/util.less";

.page_wechat {
  background-color: #fff;
  .telBox {
    overflow: hidden;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .telItem {
      display: block;
      height: 56px;
      line-height: 58px;
      padding-left: 70px;
      padding-top: 4px;
      padding-bottom: 6px;
      // width: 90%;
      position: relative;
      .after {
        display: block;
        content: '';
        width: 50px;
        height: 50px;
        position: absolute;
        top: 8px;
        left: 10px;
        .mbg;
        background-image: url('../assets/images/phone.png');
      }

      &::before {
        width: 100%;
        left: 0;
        position: absolute;
        display: inline-block;
        content: '';
        height: 0;
        border-bottom: 1px solid #e5e5e5;
        bottom: 0;
      }

      .member {
        .transform(translateX(640px));
        &.animation1 {
          .animation(wechat-item-animate 0.6s 0.2s ease-out forwards);
        }
        &.animation2 {
          .animation(wechat-item-animate 0.6s 0.8s ease-out forwards);
        }

        float: left;
        color: #7f7f7f;
        font-family: FZKaTong;
        position: relative;
        .name {
          height: 30px;
          line-height: 30px;
          padding-top: 2px;
          font-size: 20px;
          font-family: FZKaTong;
        }
        .dev {
          height: 18px;
          line-height: 14px;
          font-size: 12px;
          text-indent: 2px;
        }
      }

      .time {
        float: right;
        padding-right: 23px;
        position: relative;
        .timeText {
          top: -14px;
          font-size: 14px;
          color: #b8b8b8;
          position: absolute;
          width: 40px;
          left: -21px;
        }
      }
    }
  }

  .footBar {
    border-top: 1px solid #c4c4c4;
    position: absolute;
    bottom: 0;
    width: 100%;
    // padding-right: 40%;
    padding-bottom: 4px;
    padding-top: 4px;
    background: #f9f9f9;

    .icon {
      width: 33%;
      float: left;
      text-align: center;
      .iconImg {
        width: 40px;
        height: 40px;
        // background-color: rgba(1,1,1,.1);
        display: inline-block;
        .mbg;
        background-size: contain;
      }
      .iconText {
        font-size: 12px;
        color: #929292;
      }
      &.cur {
        .iconText {
          color: #09ba08;
        }
      }
    }
  }


  .wechat-item {
    position: absolute;
    width: 100%;
    .transform(translateX(640px));

    .img {
      width: 100%;
    }
    p {
      position: absolute;
      font-size: 28px;
      font-family: FZKaTong;
      top: 15px;
      left: 48px;
      color: rgb(51, 51, 51);
    }
  }
  .wechat-item-1 {
    top: 81px;
    .animation(wechat-item-animate 0.6s 0.2s ease-out forwards);
  }

  .wechat-item-2 {
    top: 175px;
    .animation(wechat-item-animate 0.6s 0.8s ease-out forwards);
  }

  @keyframes wechat-item-animate {
    from {
      .transform(translateX(640px));
    }
    to {
      .transform(translateX(0px));
    }
  }
  .return {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
