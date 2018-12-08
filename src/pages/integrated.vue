<template>
  <div class="page_integrated">
    <bgimg :src="imgList[$tool.randomFrom(0, imgList.length - 1)]"/>
    <!-- Begin of timer page -->
    <div class="section page-when page page-cent" id="s-when">
      <section class="content">
        <div class="clock clock-countdown">
          <div class="site-config" data-date="01/01/2019 15:30:00" data-date-timezone="+0"></div>
          <header class="header">
            <strong>倒计时</strong>
            <!-- <div>2019-10-31 23:00</div> -->
          </header>
          <div class="elem-left">
            <div class="digit hours">00</div>
            <div class="text">小时</div>
          </div>
          <div class="elem-center">
            <!-- Optional text at top or image logo -->
            <!--<span class="text top">here in</span>-->
            <!-- Optional logo at top -->
            <!-- <span class="text top"><img class="img" alt="Logo" src="http://www.17sucai.com/preview/1076685/2018-02-27/bientot/img/logo_large.png"></span> -->
            <div class="digit days">000</div>
            <div class="text">天</div>
          </div>
          <div class=" elem-right">
            <div class="digit minutes">00</div>
            <div class="text">分</div>
          </div>

          <!-- second knob here -->
          <div class="second">
            <input class="knob container" id="second-knob" data-width="400" data-height="400" data-displayInput=false
              data-fgColor="#fff" data-bgColor="rgba(255,255,255,0)" data-thickness=".07" value="0" data-displayPrevious=true
              data-max="6000" />
          </div>
        </div>

      </section>
    </div>
    <!-- End of timer page -->
  </div>
</template>

<script>

export default {
  name: 'page_integrated',
  data() {
    return {
      imgList: [
        require('../assets/images/31194183824_097a5e5b93_b.jpg'),
        // require('../assets/images/00320.jpg'),
        require('../assets/images/Autumn-Romance-Maple-Leaf-iPhone-5s-Background.jpg'),
        require('../assets/images/photo-1514897275838-55c3ed3ee738.jpeg'),
      ],
    }
  },
  computed: {},
  mounted(){
    var dateReadableText = 'Upcoming date';
    if ($('.site-config').attr('data-date-readable') && ($('.site-config').attr('data-date-readable') != '')) {
      $('.timeout-day').text('');
      dateReadableText = $('.site-config').attr('data-date-readable');
      $('.timeout-day').text(dateReadableText);
    }
    $('.clock-countdown').downCount({
      date: $('.site-config').attr('data-date'),
      offset: +10
    }, function () {
      //callback here if finished
      //alert('YES, done!');
      var zerodayText = 'An upcoming date';
      if ($('.site-config').attr('data-zeroday-text') && ($('.site-config').attr('data-zeroday-text') != '')) {
        $('.timeout-day').text('');
        zerodayText = $('.site-config').attr('data-zeroday-text');
      }
      $('.timeout-day').text(zerodayText);
    });

    /* Second */
    $(function () {
      $("#second-knob").knob();
    });


  },
  created() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
/* 6.4 Page clock countdown */
.page-when {
  .content {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
.page {
  .content {
    .clock {
      width: 430px;
      height: 430px;
      margin: 0 auto;
      border-radius: 100%;
      background: rgba(255,255,255,0.15);
      position: relative;
      &:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        background: rgba(251, 194, 235, 0.1);
        border-radius: 100%;
        box-shadow: 0 0 2px #FBC2EB, 1px -1px 203px #BC9CB3, 2px -2px 124px #ffc2ee, -2px -6px 15px #FDD2F1, 0px 2px 106px #FDDDF4;
        ;
      }
      .header {
        color: #fff;
        position: absolute;
        top: -140px;
        font-weight: normal;
        font-size: 40px;
        text-align: center;
        width: 100%;

        font-family: ZHSRXT;
        color: white;
        text-shadow: 0 0 2px #FBC2EB, 1px -1px 203px #BC9CB3, 2px -2px 124px #ffe1f7, -2px -6px 15px #FDD2F1, 0px 2px 106px #FDDDF4;
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
      color: #fff;
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
        color: #fff;
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
      border: 0px solid #fff;
      border-radius: 100%;
      z-index: 2;
      box-shadow: inset 0px 0px 0px 2px #fff;
    }
  }
}
/* Mask to disable click */
.page .clock .elem-right, .page .clock .elem-left {
  position: absolute;
  width: 70px;
  top: 50%;
  bottom: 0;
  display: block;
}
.page .clock .elem-right .text, .page .clock .elem-left .text {
  position: absolute;
  bottom: 58%;
  font-size: 24px;
  margin-top: 0;
}
.page .clock .elem-right .digit, .page .clock .elem-left .digit {
  position: relative;
  text-align: center;
  font-size: 60px;
  letter-spacing: -0.03em;
  margin-top: -0.5em;
  line-height: 1em;
  font-family: 'Asap';
  font-weight: normal;
  width: 100%;
  color: #fff;
  display: block;
}

.page {
  .content {
    .clock {
      transform: scale(0.5) translateX(-100%) translateY(-100%);
      position: absolute;
      top: 50%;
      left: 50%;
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

</style>
