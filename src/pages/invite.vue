<template>
  <div class="page_invite">
    <bgimg :src="bgimgSrc"/>
    <div class="text-box">
      <div class="text-title">
        <p class="english">Our invitation</p>
        <p>{{$cfg.inviteText.title}}</p>
      </div>
      <div class="text-content">{{$cfg.inviteText[$userType]}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page_invite',
  data() {
    return {
      bgimgSrc: this.$cfg.pageImg.invite,
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
      white-space: pre-wrap;
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
