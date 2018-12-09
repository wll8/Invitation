<template>
  <div class="page_invite">
    <bgimg :src="bgimgSrc"/>
    <div class="text-box">
      <div class="text-title">
        <p class="english">Our invitation</p>
        <p>金龙 & 蛋蛋的邀约</p>
      </div>
      <div class="text-content">
        <p>各位亲朋好友：</p>
        <p v-if="$userType === 'boy'">诚挚邀请您于2017年1月31日，星期二，08:00参加金龙和蛋蛋的结婚典礼。</p>
        <p v-else>诚挚邀请您于2017年2月4日，星期六，11:00参加金龙和蛋蛋的结婚典礼。</p>
        <p>您的到来是对我们最好的祝福，敬备喜宴，恭请光临。</p>
        <p>杭州的小伙伴，年后回杭另设宴席。</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page_invite',
  data() {
    return {
      bgimgSrc: require('../assets/images/myimg/6.jpg'),
    }
  },
  computed: {},
  created() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
@import "../assets/css/util.less";

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
      font-family: "楷体", "楷体_GB2312";
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
      width: 100%;
      background-color: rgba(255, 255, 255, 0.45);
      color: black;
      font-size: 15px;
      font-family: "楷体", "楷体_GB2312";
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
        .transform(none)
      }
    }
  }
}
</style>
