<template>
  <div class="page_photos">
    <bgimg :src="bgimgSrc"/>
    <div class="swpBox">
      <div class="swiper-container" id="swiper-container3" style="max-width:640px; margin:0 auto; position:relative;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in coverList">
            <div class="img" :style="`background-image: url(${`${item.img}`})`"></div>
            <div class="bg">&nbsp;</div>
            <!-- <div class="bg">{{word[tool.randomFrom(0, (word.length - 1))]}}</div> -->
          </div>
        </div>
        <!-- <div class="swiper-button-prev"></div> -->
        <!-- <div class="swiper-button-next"></div> -->
      </div>
      <div class="swiper-container" id="swiper-container2">
        <div class="swiper-wrapper">
          <div :class="['swiper-slide', {'active-nav': index === 0}]" v-for="(item, index) in coverList">
            <div class="img" :style="`background-image: url(${`${item.img}`})`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import coverflow from 'vue-coverflow'
export default {
  name: 'page_photos',
  data() {
    return {
      word: [
        '两情相悦', '百年好合', '成双成业', '缘定三生', '良缘夙缔',
        '缔结良缘', '花好月圆', '佳偶天成', '郎才女貌', '佳偶天成',
        '白头偕老', '才子佳人', '永结同心', '天生一对', '相敬如宾',
        '天作之合', '有情成眷', '新婚大喜', '珠联璧合', '天造地设',
        '开心', '快乐', '辛福', '健康', '儿孙满堂',
        '相亲相爱', '有情人终成眷属', '喜结良缘', '新婚大喜',
        '相约永久', '十年修得同船渡，百年修得共枕眠', '幸福美满，共谐连理', '恩恩爱爱',
        '甜甜蜜蜜', '白头到老', '长长久久', '祝相爱年年岁岁，相知岁岁年年',
        '相亲相爱，同德同心',
        '彼此宽容、互相照顾',
        '天作之合，鸾凤和鸣',
        '白首齐眉鸳鸯比翼，青阳启瑞桃李同心',
        '只羡鸳鸯不羡仙',
        '情投意合',
        '千禧年结千年缘，百年身伴百年眠。天生才子佳人配，只羡鸳鸯不羡仙',
        '意笃情深',
        '真爱永恒',
      ],
      bgimgSrc: require('../assets/images/photos-bg.jpg'),
      coverList: [
        {img: require('../assets/images/myimg/13.jpg')},
        {img: require('../assets/images/myimg/18.jpg')},
        {img: require('../assets/images/myimg/10.jpg')},
        {img: require('../assets/images/myimg/11.jpg')},
        {img: require('../assets/images/myimg/9.jpg')},
        {img: require('../assets/images/myimg/5.jpg')},
        {img: require('../assets/images/myimg/6.jpg')},
        {img: require('../assets/images/myimg/14.jpg')},
        {img: require('../assets/images/myimg/15.jpg')},
        {img: require('../assets/images/myimg/16.jpg')},
        {img: require('../assets/images/myimg/21.jpg')},
        {img: require('../assets/images/myimg/25.jpg')},
        {img: require('../assets/images/myimg/4.jpg')},
        {img: require('../assets/images/myimg/1.jpg')},
        {img: require('../assets/images/myimg/7.jpg')},
        {img: require('../assets/images/myimg/2.jpg')},
        {img: require('../assets/images/myimg/8.jpg')},
        {img: require('../assets/images/myimg/9.jpg')},
        {img: require('../assets/images/myimg/3.jpg')},
        {img: require('../assets/images/myimg/17.jpg')},
        {img: require('../assets/images/myimg/19.jpg')},
        {img: require('../assets/images/myimg/20.jpg')},
        {img: require('../assets/images/myimg/23.jpg')},
        {img: require('../assets/images/myimg/24.jpg')},
      ]
    }
  },
  mounted() {
    var mySwiper2 = new Swiper('#swiper-container2',{
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slidesPerView: 5,
      onTap: function() {
        mySwiper3.slideTo(mySwiper2.clickedIndex)
      }
    })
    var mySwiper3 = new Swiper('#swiper-container3',{
      // loop: true,
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

    function updateNavPosition() {
      $('#swiper-container2 .active-nav').removeClass('active-nav')
      var activeNav = $($('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex)).addClass('active-nav');
      if (!activeNav.hasClass('swiper-slide-visible')) {
        if (mySwiper3.activeIndex > mySwiper2.activeIndex) {
          var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
          mySwiper2.slideTo(mySwiper3.activeIndex - thumbsPerNav)
        } else {
          mySwiper2.slideTo(mySwiper3.activeIndex)
        }
      }
    }
  },
  computed: {},
  created() {},
  methods: {},
  components: {coverflow}
};
</script>

<style lang="less">
  .swpBox {
    // height: calc(100% - 40px);
    height: 100%;
  }
  #swiper-container3 {
    height: 90%;
    // padding-bottom: 1%;
  }
  #swiper-container3 .swiper-slide {
    box-shadow: 1px 2px 4px rgba(0,0,0,.5);
    // overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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
  #swiper-container3 .swiper-slide .img {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  #swiper-container3 .swiper-slide .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    // background-color: rgba(0,0,0,.2);
    text-align: center;
  }

  #swiper-container2 {
    bottom: 1%;
    height: 8%;
    position: absolute;
    overflow: inherit;
    width: 100%;
  }
  #swiper-container2 .swiper-slide {
    text-align: center;
    .img {
      // filter: blur(1px);
      bottom: 0;
      height: 100%;
      width: 45%;
      margin: auto;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
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

  #swiper-container2 .active-nav {
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
  .page_photos {
    height: 100%;
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
