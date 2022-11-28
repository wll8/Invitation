<template>
  <div class="page_invite">
    <bgimg :bg="$root.weddingConfig.pageBg.invite.src" />
    <div v-show="showClock" class="section page-when page page-cent">
      <section class="content">
        <div class="clock clock-countdown">
          <div
            class="site-config"
            :data-date="
              new Date($root.weddingConfig.date[$root.urlStatus.type])
            "
          ></div>
          <header class="header">
            <strong>婚礼倒计时</strong>
            <!-- <div>2019-10-31 23:00</div> -->
          </header>
          <div class="elem-left">
            <div class="digit hours">00</div>
            <div class="text">小时</div>
          </div>
          <div class="elem-center">
            <div class="digit days">000</div>
            <div class="text">天</div>
          </div>
          <div class="elem-right">
            <div class="digit minutes">00</div>
            <div class="text">分</div>
          </div>
          <!-- second knob here -->
          <div class="second">
            <input
              class="knob container"
              id="second-knob"
              data-width="400"
              data-height="400"
              data-displayInput="false"
              data-fgColor="rgba(255,255,255,.6)"
              data-bgColor="rgba(255,255,255,0)"
              data-thickness=".07"
              value="0"
              data-displayPrevious="true"
              data-max="6000"
            />
          </div>
        </div>
      </section>
    </div>
    <div class="text-box">
      <div class="text-title">
        <p class="english">Our invitation</p>
        <p>{{ $root.weddingConfig.inviteText.title }}</p>
      </div>
      <div
        :style="$root.weddingConfig.inviteText.contentStyle"
        class="text-content"
      >
        {{ $root.weddingConfig.inviteText[$root.urlStatus.type] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `page_invite`,
  data() {
    return {
      showClock: true,
    }
  },
  computed: {},
  mounted() {
    function gt_ios8() {
      // 判断是否 iPhone 或者 iPod
      if (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i)
      ) {
        // 判断系统版本号是否小于 8，下面条件成立就表示小于8否则>=8
        return Boolean(
          navigator.userAgent.match(/OS [3-7]_\d[_\d]* like Mac OS X/i)
        )
      } else {
        return false
      }
    }
    console.log(`gt_ios8()`, gt_ios8())
    if (gt_ios8()) {
      this.showClock = false
      return
    }
    try {
      // 未知 bug
      // 有时候下面代码报错导致倒计时出现问题， 所以在报错时干脆不显示倒计时
      var dateReadableText = `Upcoming date`
      if (
        $(`.site-config`).attr(`data-date-readable`) &&
        $(`.site-config`).attr(`data-date-readable`) != ``
      ) {
        $(`.timeout-day`).text(``)
        dateReadableText = $(`.site-config`).attr(`data-date-readable`)
        $(`.timeout-day`).text(dateReadableText)
      }
      $(`.clock-countdown`).downCount(
        {
          date: $(`.site-config`).attr(`data-date`),
          offset: +18,
        },
        function () {
          //callback here if finished
          //alert('YES, done!');
          var zerodayText = `An upcoming date`
          if (
            $(`.site-config`).attr(`data-zeroday-text`) &&
            $(`.site-config`).attr(`data-zeroday-text`) != ``
          ) {
            $(`.timeout-day`).text(``)
            zerodayText = $(`.site-config`).attr(`data-zeroday-text`)
          }
          $(`.timeout-day`).text(zerodayText)
        }
      )

      /* Second */
      $(function () {
        $(`#second-knob`).knob()
      })
    } catch (error) {
      console.log(`showClock error`, error)
      this.showClock = false
    }
  },
  created() {},
  methods: {},
  components: {},
}
</script>

<style lang="less">
@import '../assets/css/util.less';

.page_invite {
  .text-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    .text-title {
      width: 100%;
      color: rgb(247, 150, 70);
      font-size: 18px;
      font-family: '楷体', '楷体_GB2312';
      padding-left: 29px;
      padding-top: 10px;
      padding-bottom: 10px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.9);
      .english {
        font-family: FZShouJinShu;
      }
      p {
        margin: 0;
        padding: 0;
      }
    }
    .text-content {
      white-space: pre-wrap;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.45);
      color: black;
      font-size: 15px;
      font-family: '楷体', '楷体_GB2312';
      //text-shadow: rgb(0, 0, 0) 0px 0px 2px;
      box-sizing: border-box;
      padding: 20px 10px;
      padding-top: 10px;
      padding-bottom: 30px;
      line-height: 1.5;
      text-indent: 2em;
      p:first-child {
        text-indent: 0;
      }
      p {
        opacity: 0;
        .animation(inviteTextContent 1.5s 0.6s cubic-bezier(0.39, 0.66, 0.57, 1) 1 forwards);
      }
    }
    @keyframes inviteTextContent {
      0% {
        opacity: 0;
        .transform(translate3d(0, 100%, 0));
      }
      100% {
        opacity: 1;
        .transform(none);
      }
    }
  }

  .countdown_box {
  }

  /* 6.4 Page clock countdown */
  .page {
    .content {
      .clock {
        width: 430px;
        height: 430px;
        margin: 0 auto;
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.15);
        position: relative;
        &:before {
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          content: '';
          background: rgba(251, 194, 235, 0.1);
          border-radius: 100%;
          box-shadow: 0 0 2px rgba(251, 194, 235, 0.4),
            1px -1px 203px rgba(188, 156, 179, 0.4),
            2px -2px 124px rgba(255, 194, 238, 0.4),
            -2px -6px 15px rgba(253, 210, 241, 0.4),
            0px 2px 106px rgba(253, 221, 244, 0.4);
        }
        .header {
          color: rgba(255, 255, 255, 1);
          position: absolute;
          top: -100px;
          font-weight: normal;
          font-size: 40px;
          text-align: center;
          width: 100%;

          font-family: ZHSRXT;
          color: white;

          text-shadow: 0 0 2px rgba(251, 194, 235, 0.4),
            1px -1px 203px rgba(188, 156, 179, 0.4),
            2px -2px 124px rgba(255, 194, 238, 0.4),
            -2px -6px 15px rgba(253, 210, 241, 0.4),
            0px 2px 106px rgba(253, 221, 244, 0.4);
        }
      }
    }
    .clock {
      .text {
        position: relative;
        width: 100%;
        font-family: 'Asap';
        font-weight: normal;
        letter-spacing: 0;
        margin-top: 0.5em;
        display: block;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      .block {
        &:last-child {
          .digit {
            &:after {
              display: none;
            }
          }
        }
      }
      .elem-center {
        display: inline-block;
        position: relative;
        text-align: center;
        width: 100%;
        top: 0;
        margin-top: 50%;
        height: 50%;
        bottom: 0;
        .digit {
          position: relative;
          font-size: 120px;
          margin-top: -0.5em;
          letter-spacing: -0.03em;
          line-height: 1em;
          font-family: 'Asap';
          font-weight: bold;
          width: 100%;
          color: rgba(255, 255, 255, 1);
          display: block;
        }
        .text {
          position: absolute;
          bottom: 58%;
          font-size: 24px;
          margin-top: 0;
          &.top {
            bottom: 124%;
            img {
              height: 65px;
              margin-bottom: 20px;
            }
          }
        }
      }
      .elem-left {
        left: 50px;
      }
      .elem-right {
        right: 50px;
      }
      .second {
        position: absolute;
        left: 15px;
        top: 15px;
        bottom: 15px;
        right: 15px;
        border: 0px solid rgba(255, 255, 255, 1);
        border-radius: 100%;
        z-index: 2;
        box-shadow: inset 0px 0px 0px 2px rgba(255, 255, 255, 0.2);
      }
    }
  }
  /* Mask to disable click */
  .page .clock .elem-right,
  .page .clock .elem-left {
    position: absolute;
    width: 70px;
    top: 50%;
    bottom: 0;
    display: block;
  }
  .page .clock .elem-right .text,
  .page .clock .elem-left .text {
    position: absolute;
    bottom: 58%;
    font-size: 24px;
    margin-top: 0;
  }
  .page .clock .elem-right .digit,
  .page .clock .elem-left .digit {
    position: relative;
    text-align: center;
    font-size: 60px;
    letter-spacing: -0.03em;
    margin-top: -0.5em;
    line-height: 1em;
    font-family: 'Asap';
    font-weight: normal;
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    display: block;
  }

  .page {
    .content {
      .clock {
        zoom: 0.5;
        position: absolute;
        left: 0;
        right: 0;
        top: 14%;
        margin: auto;
      }
    }
  }
  .page-contact {
    .contact {
      img {
        height: 32px;
      }
    }
  }
}
</style>
