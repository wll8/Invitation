<template>
  <div class="page_dialing">
    <bgimg :bg="$root.weddingConfig.pageBg.dialing" />
    <div class="topBar">
      <div class="tabBox">
        <div class="tab cur">所有通话</div>
        <div class="tab">未接来电</div>
      </div>
    </div>
    <div class="telBox">
      <a
        :href="`tel:${item.tel}`"
        :class="['telItem', item.class]"
        v-for="item in itemList"
        :key="item.tel"
      >
        <div class="member">
          <div class="text name">{{ item.name }}</div>
          <div class="text dev">手机</div>
        </div>
        <div class="time">
          <!-- 距离 call 页面的相对时间 -->
          <div class="timeText">刚刚</div>
          <div class="icon info"></div>
        </div>
      </a>
    </div>
    <div class="footBar">
      <div class="icon">
        <div
          class="iconImg"
          :style="`background-image: url('${require('../assets/images/star.png')}');`"
        ></div>
        <div class="iconText">个人收藏</div>
      </div>
      <div class="icon cur">
        <div
          class="iconImg"
          :style="`background-image: url('${require('../assets/images/time.png')}')`"
        ></div>
        <div class="iconText">最近通话</div>
      </div>
      <div class="icon">
        <div
          class="iconImg"
          :style="`background-image: url('${require('../assets/images/man.png')}');`"
        ></div>
        <div class="iconText">通讯录</div>
      </div>
    </div>
    <!-- <Back /> -->
    <audio class="hidden" id="dialing-audio">
      <source :src="audioMp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
  name: `page_dialing`,
  data() {
    return {
      itemList: [
        {
          name: `新郎`,
          tel: this.$root.weddingConfig.phone.boy,
          class: `animation1`,
        },
        {
          name: `新娘`,
          tel: this.$root.weddingConfig.phone.girl,
          class: `animation2`,
        },
      ],
      audioMp3: require(`../assets/audio/dong.mp3`),
      returnImg: require(`../assets/images/return.png`),
    }
  },
  computed: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.$tool.play(`dialing-audio`)
    }, 100)
  },
  methods: {},
  components: {},
}
</script>

<style lang="less">
@import '../assets/css/util.less';

.page_dialing {
  background-color: #fff;
  .topBar {
    height: 50px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid #c4c4c4;
    background-color: #f9f9f9;
    .tabBox {
      // width: 100px;
      text-align: center;
      padding-top: 10px;
      .tab {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        color: #007aff;
        border: 1px solid #007aff;
        padding: 0 10px;
        &.cur {
          background-color: #007aff;
          color: #fff;
        }
        &:first-child {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        &:last-child {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
  }

  .telBox {
    overflow: hidden;
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 99;
    .telItem {
      .transform(translateX(100%));
      &.animation1 {
        .animation(dialing-item-animate 0.6s 0.2s ease-out forwards);
      }
      &.animation2 {
        .animation(dialing-item-animate 0.6s 0.8s ease-out forwards);
      }
      display: block;
      height: 48px;
      line-height: 50px;
      padding-left: 10%;
      padding-top: 4px;
      padding-bottom: 6px;
      width: 90%;
      &::after {
        display: block;
        content: '';
        width: 10%;
        height: 22px;
        position: absolute;
        top: 20px;
        left: 0;
        .mbg;
        background-size: auto;
        background-image: url('../assets/images/phone.png');
      }

      &::before {
        width: 90%;
        left: 10%;
        position: absolute;
        display: inline-block;
        content: '';
        height: 0;
        border-bottom: 1px solid #e5e5e5;
        bottom: 0;
      }

      .member {
        float: left;
        color: #333333;
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
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: 14px;
          color: #8a8a8a;
        }
        .icon.info {
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          height: 24px;
          .mbg;
          background-image: url('../assets/images/info.png');
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
      }
      .iconText {
        font-size: 12px;
        color: #929292;
      }
      &.cur {
        .iconText {
          color: #007aff;
        }
      }
    }
  }

  .dialing-item {
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
  .dialing-item-1 {
    top: 81px;
    .animation(dialing-item-animate 0.6s 0.2s ease-out forwards);
  }

  .dialing-item-2 {
    top: 175px;
    .animation(dialing-item-animate 0.6s 0.8s ease-out forwards);
  }

  @keyframes dialing-item-animate {
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
