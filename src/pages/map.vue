<template>
  <div class="page_map">
    <div id="container"></div>
  </div>
</template>

<script>

export default {
  name: 'page_map',
  data() {
    return {

    }
  },
  computed: {
    addrInfo() {
      return {
        boy: this.$root.weddingConfig.addr.boy,
        girl: this.$root.weddingConfig.addr.girl,
      }[this.$root.urlStatus.type]
    }
  },
  mounted(){
    let addrInfo = this.addrInfo
    var marker, map = new AMap.Map("container", {
        resizeEnable: true,
        center: addrInfo.position,
        zoom: 15
    });

    // 实例化点标记
    function addMarker() {
        marker = new AMap.Marker({
          offset: new AMap.Pixel(-37, -82) // 相对于基点的偏移位置
        });
        marker.setMap(map);
        // 自定义点标记内容
        var markerContent = document.createElement("div");
        // 点标记中的图标
        var markerImg = document.createElement("div");
        markerImg.className = "markerlnglat heart";
        // markerImg.src = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
        markerContent.appendChild(markerImg);
        // 点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.className = 'marker';
        markerSpan.innerHTML = "点击红色图标开始导航";
        markerContent.appendChild(markerSpan);
        marker.setContent(markerContent); //更新点标记内容
        marker.setPosition(addrInfo.position); //更新点标记位置

    }
    addMarker()
    marker.on('click',function(e){
        marker.markOnAMAP({
            name: addrInfo.name,
            // position:marker.getPosition()
            position: addrInfo.position
        })
    })

  },
  created() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
.page_map {
  #container {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }


  .amap-icon img,
  .amap-marker-content img{
      width: 25px;
      height: 34px;
  }

  .marker {
      position: absolute;
      color: #fff;
      padding: 4px 10px;
      box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
      white-space: nowrap;
      font-size: 12px;
      font-family: "";
      background-color: #696969;
      border-radius: 3px;
      top: 36px;
      right: -134px;

      &::after {
        position: absolute;
        content: '';
        display: block;
        font-size: 0;
        line-height: 0;
        border-width: 6px;
        border-color: #696969;
        border-left-width: 0;
        border-style: dashed;
        border-right-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
        left: -6px;
        top: 8px;
      }

  }

  .input-card{
      width: 32rem;
      z-index: 170;
  }

  .input-card .btn{
      margin-right: .8rem;
  }

  .input-card .btn:last-child{
      margin-right: 0;
  }

  @keyframes beatHeart {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    40% {
      transform: scale(1);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }


  .heart{
      width: 67.5px;
      height: 67.5px;
      position: relative;
      animation: .8s infinite beatHeart;

  }
  .heart::before,.heart::after{
      position: absolute;

      display: block;
      content:".";
      width: 33.75px;
      height: 56.25px;
      background-color: red;
      border-top-left-radius: 50% 16.875px;
      border-top-right-radius: 50% 16.875px;
      left: 9.225px;
      top: 0px;
      transform: rotate(-45deg);
  }
  .heart::after{
      transform: rotate(45deg);
      left: 25.199999999999996px;

  }
}

</style>
