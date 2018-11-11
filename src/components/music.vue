<template>
  <div class="com_music" :class="play ? 'music music-play' : ' music'" @click="_toggle()">
      <i class="music-icon"></i>
      <i class="circle circle-1"></i>
      <i class="circle circle-2"></i>
      <i class="circle circle-3"></i>

      <audio class="hidden" loop id="bgm">
          <source :src="bgm" type="audio/mpeg"/>
      </audio>
  </div>
</template>

<script>
const bgm = require('../assets/audio/bgm.mp3');
const playMusicArr = [
    'photos',
    'integrated',
    'invite',
    'snapshot',
    'dialing',
    'map',
];
export default {
  name: 'com_music',
  data () {
    return {
      bgm,
      play: false
    }
  },
  watch: {
    path(newVal, oldVal) {
      playMusicArr.includes(this.path) ? this._play() : this._pause()
    },
  },
  mounted() {},
  methods: {
    _play() {
        this.play = true
        const bgm = document.getElementById('bgm');
        bgm.play();
    },

    _pause() {
        this.play = false
        const bgm = document.getElementById('bgm');
        bgm.pause();
    },

    _toggle() {
        if (this.play) {
            this._pause();
        } else {
            this._play();
        }
    },
  },
  props: {
    path: String,
  },

}
</script>

<style lang="less" scoped>
@import "../assets/css/util.less";
.com_music {
  background-color: rgba(130, 109, 109, 0.2);
  border-radius: 50%;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);

  &.music {
    width: 38px;
    height: 38px;
    position: absolute;
    right: 6px;
    top: 14px;
    z-index: 999;

    i {
      width: 38px;
      height: 38px;
      display: block;
      position: absolute;
    }
    .music-icon {
      background: url(../assets/images/music.png) no-repeat;
      background-size: cover;
    }
    .circle-1 {
      background: url(../assets/images/circle-1.png) no-repeat;
      background-size: cover;
    }
    .circle-2 {
      background: url(../assets/images/circle-2.png) no-repeat;
      background-size: cover;
    }
    .circle-3 {
      background: url(../assets/images/circle-3.png) no-repeat;
      background-size: cover;
    }
  }

  &.music-play {
    .music-icon {
      .animation(musicIcon 1.5s ease infinite)
    }
    .circle-1 {
      .animation(musicIcon 0.5s 0.3s ease infinite)
    }
    .circle-2 {
      .animation(musicIcon 0.5s 0.4s ease infinite)
    }
    .circle-3 {
      .animation(musicIcon 0.5s 0.5s ease infinite)
    }
    @keyframes musicCircle {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes musicIcon {
      0% {
        .transform(translateY(0));
      }
      50% {
        .transform(translateY(-5px));
      }
      100% {
        .transform(translateY(0));
      }
    }
  }
}
</style>
