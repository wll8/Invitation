<template>
  <div id="app">
    <music :path="$route.name"/>
    <div v-show="$route.path !== '/'" @click="$router.back()" class="com_back" />
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
import music from './components/music.vue';
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'slide-left',
    }
  },
  mounted(){
    const vm = this
    document.title = vm.$cfg.inviteText.title

    // 预加载留言
    ;(() => {
      vm.$fly.get('love').then(res => {
        console.log('barrageList', res)
        this.$g.barrageList = res
      })
    })()

    // 点击页面心形
    if(!+vm.$tool.storage.get('debug')) {
      // 如果不是调试模式才加心形效果
      // 这个效果加上 vconsole 会很卡
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
    }

    // 文字
    const textShow = (e, t, a) => {
      $(document).ready(function ($) {
        $("body").click(function (e) {
          var $i = $("<span/>").text(vm.$tool.word[vm.$tool.randomFrom(0, vm.$tool.word.length - 1)]);
          var x = e.pageX
            , y = e.pageY;
          $i.css({
            "z-index": 100000000,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651"
          });
          $("body").append($i);
          $i.animate({
            "top": y - 180,
            "opacity": 0
          }, 1500, function () {
            $i.remove();
          });
        });
      });
    }
    // textShow(window, document)

  },
  watch: {
    '$route' (to, from) {
      const arr = this.$router.options.routes.map(item => item.path)
      const compare = arr.indexOf(to.path) > arr.indexOf(from.path)
      this.transitionName = compare ? 'slide-right' : 'slide-left'
    }
  },
  components: {
    music
  }
}
</script>

<style lang="less">
@import "./assets/css/util.less";
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
    transition: all .2s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(10px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-10px, 0);
  }

}
</style>
