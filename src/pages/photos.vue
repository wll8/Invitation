<template>
  <div class="page_photos">
    <bgimg :bg="bgimgSrc"/>
    <div class="swpBox">
      <div class="swiper-container" id="swiper-big" style="max-width:640px; margin:0 auto; position:relative;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in coverList">
            <div class="img" :style="`background-image: url(${item.img}); background-position: ${item.pos || 'center'}`"></div>
            <div v-if="$cfg.photosTextShow" class="bg">{{word[$tool.randomFrom(0, (word.length - 1))]}}</div>
            <div v-else class="bg">&nbsp;</div>
          </div>
        </div>
        <div v-if="$cfg.photosSwitchShow" class="swiper-button-prev"></div>
        <div v-if="$cfg.photosSwitchShow" class="swiper-button-next"></div>
      </div>
      <div class="swiper-container" id="swiper-small">
        <div class="swiper-wrapper">
          <div :class="['swiper-slide', {'active-nav': index === 0}]" v-for="(item, index) in coverList">
            <div class="img" :style="`background-image: url(${item.img})`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_photos',
  data() {
    return {
      word: this.$tool.word,
      bgimgSrc: this.$cfg.pageBg.photos,
      coverList: this.$cfg.photos.map(item => typeof(item) === 'string' ? {img: item} : item)
    }
  },
  mounted() {
    var mySwiperBig = new Swiper('#swiper-big', {
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
      mousewheel: true,
      effect: 'coverflow',
      speed: 300,
      watchSlidesProgress: true,
      onSlideChangeStart: function() {
        updateNavPosition()
      }
    })

    var mySwiperSmall = new Swiper('#swiper-small', {
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slidesPerView: 5,
      onTap: function() {
        mySwiperBig.slideTo(mySwiperSmall.clickedIndex)
      }
    })

    function updateNavPosition() {
      $('#swiper-small .active-nav').removeClass('active-nav')
      var activeNav = $($('#swiper-small .swiper-slide').eq(mySwiperBig.activeIndex)).addClass('active-nav');
      if (!activeNav.hasClass('swiper-slide-visible')) {
        if (mySwiperBig.activeIndex > mySwiperSmall.activeIndex) {
          var thumbsPerNav = Math.floor(mySwiperSmall.width / activeNav.width()) - 1
          mySwiperSmall.slideTo(mySwiperBig.activeIndex - thumbsPerNav)
        } else {
          mySwiperSmall.slideTo(mySwiperBig.activeIndex)
        }
      }
    }
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="less">
@import "../assets/css/util.less";
.page_photos {
  height: 100%;

  .swpBox {
    // height: calc(100% - 40px);
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  #swiper-big {
    height: 90%;
    // padding-bottom: 1%;
  }
  #swiper-big .swiper-slide {
    box-shadow: 1px 2px 4px rgba(0,0,0,.5);
    // overflow: hidden;
    .mbg;
    // background-color: #fff;
    // background-position: 0 -300px;
    // padding: 5px;
    &::after {
      content: '';
      box-shadow:  100px 0 10px 20px rgba(0,0,0,.2);
      position: absolute;
      width: 20%;
      height: 40px;
      bottom: 20px;
      right: 90px;
      z-index: -1;
      transform: skew(-40deg);

    }
  }
  #swiper-big .swiper-slide .img {
    height: 100%;
    width: 100%;
    .mbg;
  }
  #swiper-big .swiper-slide .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    // background-color: rgba(0,0,0,.2);
    text-align: center;
  }

  #swiper-small {
    bottom: 1%;
    padding-top: 20px;
    height: 8%;
    position: absolute;
    width: 100%;
  }
  #swiper-small .swiper-slide {
    text-align: center;
    .img {
      // filter: blur(1px);
      bottom: 0;
      height: 100%;
      width: 45%;
      margin: auto;
      .mbg;
      box-shadow: 1px 2px 4px rgba(0,0,0,.5);

      transition: all .5s;

      &::after {
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.2);
      }
    }
  }

  #swiper-small .active-nav {
    .img {
      filter: blur(0);
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 4px;
      &::after {
        display: none;
      }
    }
  }
  // .my-swiper-container {
  //   // width: 12.5%;
  //   // height: 20px;
  //   // float: none;
  //   // overflow: hidden;
  //   .my-swiper-wrapper {
  //     .swiper-slide-a {
  //       text-align: center;
  //       color: #fff;
  //       background-color: rgba(0,0,0,.2);
  //       filter: blur(4px);
  //     }
  //   }
  // }
}
</style>
