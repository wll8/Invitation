<template>
  <div id="app" v-if="$root.weddingConfig.id">
    <music :path="$route.name" />
    <div
      v-show="$route.path !== '/'"
      @click="$router.back()"
      class="com_back"
    />
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>
  </div>
</template>

<script>
import music from './components/music.vue'
export default {
  name: `App`,
  data() {
    return {
      transitionName: `slide-left`,
    }
  },
  created() {
    this.initWxSdk()
  },
  mounted() {
    const vm = this

    // 预加载留言
    ;(() => {
      // vm.$fly.get('love').then(res => {
      //   console.log('barrageList', res)
      //   this.$g.barrageList = res
      // })
    })()

    // 点击页面心形
    if (!+vm.$tool.storage.get(`debug`)) {
      // 如果不是调试模式才加心形效果
      // 这个效果加上 vconsole 会很卡
      /* eslint-disable */
      ;((e, t, a) => {
        var heartClassName = '_click_heart_'
        function r() {
          for (var e = 0; e < s.length; e++) {s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = 'left:' + s[e].x + 'px;top:' + s[e].y + 'px;opacity:' + s[e].alpha + ';transform:scale(' + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");}
          requestAnimationFrame(r)
        }

        function n() {
          var t = 'function' == typeof e.onclick && e.onclick;
          e.onclick = function(e) {
            t && t(), o(e)
          }
        }

        function o(e) {
          var a = t.createElement('div');
          a.className = heartClassName, s.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: c()
          }), t.body.appendChild(a)
        }

        function i(e) {
          var a = t.createElement('style');
          a.type = 'text/css';
          try {
            a.appendChild(t.createTextNode(e))
          } catch (t) {
            a.styleSheet.cssText = e
          }
          t.getElementsByTagName('head')[0].appendChild(a)
        }

        function c() {
          return "rgb(" + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + ")"
        }
        var s = [];
        e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
        function(e) {
          setTimeout(e, 1e3 / 60)
        }, i(`
          .${heartClassName} {
            position: fixed;
            width: 10px;
            height: 10px;
            background: #f00;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            transform: rotate(45deg);
          }

          .${heartClassName}:after,.${heartClassName}:before {
            position: fixed;
            width: inherit;
            height: inherit;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            background: inherit;
            content: '';
          }

          .${heartClassName}:after {
            top: -5px;
          }

          .${heartClassName}:before {
            left: -5px;
          }
        `), n(), r()

      })(window, document)
      /* eslint-enable */
    }
  },
  watch: {
    $route(to, from) {
      const arr = this.$router.options.routes.map((item) => item.path)
      const compare = arr.indexOf(to.path) > arr.indexOf(from.path)
      this.transitionName = compare ? `slide-right` : `slide-left`
    },
  },
  components: {
    music,
  },
  methods: {
    initWxSdk() {
      window.loadScript(
        `https://res.wx.qq.com/open/js/jweixin-1.4.0.js`,
        async () => {
          const wx = window.wx
          const url = encodeURI(window.location.href.split(`#`)[0])
          const config = (
            await this.$http.get(
              `https://hongqiye.com/wx/getSignature?url=${url}`
            )
          ).data
          console.log(`configconfig`, config)

          wx.config({
            debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
            appId: config.appId, // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature, // 必填，签名
            jsApiList: [
              // 必填，需要使用的 JS 接口列表
              `updateAppMessageShareData`, // 分享到朋友 | 分享到QQ
              `updateTimelineShareData`, // 分享到朋友圈 | 分享到QQ空间
            ],
          })

          wx.ready(() => {
            //需在用户可能点分享按钮前就先调用
            const { inviteText } = this.$root.weddingConfig

            const data = {
              title: inviteText[this.$root.urlStatus.type].title,
              desc: inviteText[this.$root.urlStatus.type].desc,
              link: window.location.href.replace(/#\/.+?\?/, `#/?`), // 变更为主页 url
              imgUrl: document.querySelector(`[rel="icon"]`).href,
              success() {
                console.log(`更新分享数据成功`)
              },
            }
            console.log(`data`, url, data)
            wx.updateAppMessageShareData(data)
            wx.updateTimelineShareData(data)
            wx.error((err) => {
              console.error(`config fail:`, err)
            })
          })
        }
      )
    },
  },
}
</script>

<style lang="less">
@import './assets/css/util.less';
#app {
  touch-action: none; // 禁止浏览器自带的页面左右滑动， 否则会产生一些 swiper 相关的 bug
  height: 100%;

  .com_back {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 44px;
    height: 44px;
    .mbg;
    background-image: url(./assets/images/back.png);
    z-index: 999;
    // opacity: .7;

    background-color: rgba(130, 109, 109, 0.2);
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    // &::after {
    //   content: '';
    //   display: block;
    //   width: 100%;
    //   height: 100%;
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   background-color: rgba(0,0,0, .5);
    //   border-radius: 50%;
    //   z-index: -1;
    // }
  }

  .child-view {
    width: 100%;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(20px, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-20px, 0);
  }
}
</style>
