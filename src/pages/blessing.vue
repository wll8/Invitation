<template>
  <div class="page_blessing">
    <bgimg :src="bgimgSrc"/>
    <vue-baberrage
      :isShow="barrageIsShow"
      :barrageList ="barrageList"
      :loop ="barrageLoop"
      class="xw2233"
    >
    </vue-baberrage>
    <div class="formBox">
      <div class="form">
        <div class="form-group">
          <label for="iptName">您的名字</label>
          <input v-model="blessing.name" autofocus="autofocus" class="form-control w100-15" id="iptName" placeholder="点击输入">
        </div>
        <div class="form-group">
          <label for="iptBlessing">您的祝福</label>
          <textarea v-model="blessing.blessing" class="form-control w100-15"  id="iptBlessing" rows="3" placeholder="点击输入"></textarea>
        </div>
      </div>
      <button class="w100-15 sendBtn btn btn-default btn-lg btn-block" @click="addToList">
        <i :class="['icon', {breathing: blessing.name && blessing.blessing}]" :style="`background-image:url(${sendIcon})`"/>
        <span class="text">发送</span>
      </button>
      <div class="end">end</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page_blessing',
  data() {
    return {
      blessing: {
        name: '',
        user_id: '',
        blessing: '',
      },
      sendIcon: require('../assets/images/send.png'),
      bgimgSrc: require('../assets/images/myimg/1.jpg'),
      msg: 'Hello vue-baberrage',
      breathing: false,
      barrageIsShow: true,
      currentId : 0,
      barrageLoop: true,
      barrageList: [
        {
          id: 'idtest',
          avatar: "//baidu.com/favicon.ico",
          msg: 'this.msg',
          // barrageStyle: "normal",
          time: 5,
          type: 0,
          position: 'bottom'
        }
      ],

    }
  },
  computed: {},
  mounted(){
    // 当前有一个 bug ， 需要触发两次这个方法才能正常出现效果。
    // 所以用此方法先执行一次
    this.fn({})
  },
  created() {},
  methods: {
    fn(event){
      var offset = $(".end").offset();
      var sendBtn = $(this);
      // var img = sendBtn.parent().find('img').attr('src');
      var img = this.sendIcon
      var flyer = $('<img class="u-flyer" src="'+img+'">');
      console.log('offset', offset)
      flyer.fly({
        start: {
            left: event.pageX - 50, //开始位置（必填）#fly元素会被设置成position: fixed
            top: event.pageY - 50 //开始位置（必填）
        },
        end: {
            left: offset.left + offset.width/2, //结束位置（必填）
            top: offset.top + offset.width/2, //结束位置（必填）
            width: 0, //结束时宽度
            height: 0 //结束时高度
        },
        onEnd: function(){ //结束回调
            // sendBtn.css("cursor","default").removeClass('orange').unbind('click');
            // this.destory(); //移除dom
        }
      });
    },
    addToList (ev){
      this.fn(ev)
      return
      this.barrageList.push({
        id: +new Date() + Math.random(),
        avatar: "./static/avatar.jpg",
        msg: this.msg,
        // barrageStyle: "normal",
        time: 5,
        type: 0,
        position: 'bottom'
      })
    },
  },
  components: {}
};
</script>

<style lang="less">
.page_blessing {

  .breathing {
    box-shadow: 0 0 60px #FFFFFF;
    animation: breath 2s;
    animation-iteration-count:infinite;
  }

  @-webkit-keyframes breath {
    0%    {opacity: 0.5;}
    60%   {opacity:   1;}
    100%  {opacity: 0.5;}
  }
  @-o-keyframes breath {
    0%    {opacity: 0.5;}
    60%   {opacity:   1;}
    100%  {opacity: 0.5;}
  }
  @-moz-keyframes breath {
    0%    {opacity: 0.5;}
    60%   {opacity:   1;}
    100%  {opacity: 0.5;}
  }
  @keyframes breath {
    0%    {opacity: 0.5;}
    60%   {opacity:   1;}
    100%  {opacity: 0.5;}
  }


  .end {
    width: 60px;
    height: 60px;
    background: #fff;
    position: absolute;
    bottom: 40px;
    right: 20px;
  }

  .w100-15 {
    width: calc(100% - 27px);
  }

  .formBox {
    max-width: 640px;;
    overflow: hidden;

    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(255,255,255, .2);
    .form {
      position: relative;
      padding: 15px 15px 15px;
      margin: 0 -15px 15px;
      border-color: #e5e5e5 #eee #eee;
      border-style: solid;
      border-width: 1px 0;
      -webkit-box-shadow: inset 0 3px 6px rgba(0,0,0,.05);
      box-shadow: inset 0 3px 6px rgba(0,0,0,.05);

      margin-right: 0;
      margin-left: 0;
      border-color: #fbc2eb;
      border-width: 0;
      border-radius: 4px 4px 0 0;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .form-control {
    display: block;
    width: 100%;
    .w100-15;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    // background-color: transparent;
    background-color: rgba(255,255,255, .2);
    background-image: none;
    border: 1px solid #fbc2eb;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    border-color: #fff;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 0, 0, 0.6);
  }
  textarea.form-control {
    height: auto;
  }

  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .btn-default {
    color: #333;
    background-color: transparent;
    border-color: #ccc;
  }

  .btn-default:active:focus {
    color: #333;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
  }

  .btn:active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
    box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
  }

  .btn-block {
    display: block;
    width: 100%;
  }

  .btn, .btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }
  .sendBtn {
    margin-left: 15px;
    width: calc(100% - 30px);
    padding-top: 0;
    padding-bottom: 0;
    background-color: rgba(255, 255, 255, 0.83);
    border-radius: 60px;
    color: #000000;
    &:focus {
      outline: none;
      border-color: #fbc2eb;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(251, 194, 235, 0.6);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(251, 194, 235, 0.6);
    }
    .text {
      display: inline-block;
      vertical-align: middle;
    }
    .icon {
      vertical-align: middle;
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-bottom: 4px;
      margin-top: 4px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

  }
}
</style>
