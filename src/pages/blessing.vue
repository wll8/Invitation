<template>
  <div class="page_blessing">
    <bgimg :bg="bgimgSrc"/>
    <vue-baberrage
      :isShow="barrageIsShow"
      :barrageList ="barrageList"
      :loop ="barrageLoop"
    >
    </vue-baberrage>
    <div class="formBox" v-show="showForm">
      <div class="form">
        <div class="form-group">
          <label for="iptName">您的名字</label>
          <input v-model="blessing.name" autofocus="autofocus" class="form-control w100-15" id="iptName" placeholder="点击输入您的名字">
        </div>
        <div class="form-group">
          <label for="iptBlessing">您的祝福</label>
          <textarea v-model="blessing.content" class="form-control w100-15"  id="iptBlessing" rows="2" placeholder="点击输入您的祝福"></textarea>
        </div>
      </div>
      <button class="w100-15 sendBtn btn btn-default btn-lg btn-block" @click="add">
        <i :class="['icon', {breathing: blessing.name && blessing.content}]" :style="`background-image:url(${sendIcon})`"/>
        <span class="text">发送祝福</span>
      </button>
    </div>
    <div :style="`visibility: ${showForm ? `hidden` : `visible`}`" :class="['showFormBtn', {show: sendEd}]" @click="showForm = !showForm">祝 福</div>
  </div>
</template>

<script>
export default {
  name: 'page_blessing',
  data(){
    return {
      showForm: false,
      sendEd: false, // 已祝福
      blessing: {
        name: '',
        user_id: '',
        blessing: '',
      },
      sendIcon: require('../assets/images/send.png'),
      bgimgSrc: this.$root.weddingConfig.pageBg.blessing,
      breathing: false,
      barrageIsShow: true,
      currentId : 0,
      barrageLoop: true,
      barrageList: [],
    }
  },
  computed: {},
  mounted(){
    // 当前有一个 bug ， 需要触发两次这个方法才能正常出现效果。
    // 所以用此方法先执行一次
    this.fn({})

    // ;(() => {
    //   // 预加载留言
    //   const vm = this
    //   vm.barrageList = vm.barrageList.map(item => ({
    //     id: +new Date() + '' + Math.random(), // 创建唯一 id
    //     avatar: '',
    //     msg: item.name + ': ' + item.blessing,
    //     time: vm.$tool.randomFrom(4, 8),
    //     type: 0,
    //     position: 'bottom',
    //   }))
    // })()

    this.getList()
    // setTimeout(() => this.getList(), 500) // 延迟加载， 希望获取到的指纹信息一致
  },
  created(){},
  methods: {
    async getList(){
      const vm = this
      vm.$fly.get(`/weddings/${this.$root.weddingId}/bless`).then( async (res = []) => {
        const userId = vm.$root.userId
        console.log('userId', userId)
        vm.sendEd = res.some(item => item.userId === userId) // 如果已经祝福过， 不再引导祝福
        vm.barrageList = res.map(item => ({
          id: +new Date() + '' + Math.random() + '' + item.userId, // 创建唯一 id
          // avatar: '//www.baidu.com/favicon.ico',
          avatar: '',
          msg: item.name + ': ' + item.content,
          barrageStyle: `normal ${item.userId === userId ? 'myDanMu' : ''}`,
          time: vm.$tool.randomFrom(4, 8),
          type: 0,
          position: 'bottom',
        }))
      })
    },
    // 元素飞入动画
    fn(event){
      var offset = $('.showFormBtn').offset()
      var img = this.sendIcon
      var flyer = $(`<img class="u-flyer" src="${img}"/>`)
      flyer.fly({
        start: {
          left: event.pageX - 50, // 开始位置（必填）#fly元素会被设置成position: fixed
          top: event.pageY - 50 // 开始位置（必填）
        },
        end: {
          left: offset.left + offset.width/2, // 结束位置（必填）
          top: offset.top + offset.width/2, // 结束位置（必填）
          width: 0, // 结束时宽度
          height: 0 // 结束时高度
        },
        onEnd: function(){ //结束回调
          $('img.u-flyer').remove() // 移除dom
        }
      })
    },
    async add (ev){
      const vm = this
      let {name = '', content = ''} = vm.blessing
      vm.fn(ev)
      vm.showForm = false
      if(name.trim() && content.trim()){
        const userId = vm.$root.userId
        vm.$fly.post(`/weddings/${this.$root.weddingId}/bless`, {
          userId,
          name,
          content,
        })
        .then(res => {
          vm.barrageList.push({
            id: +new Date() + '' + Math.random() + '' + userId,
            avatar: '',
            msg: vm.blessing.name + ': ' + vm.blessing.content,
            barrageStyle: 'normal myDanMu',
            time: vm.$tool.randomFrom(4, 8),
            type: 0,
            position: 'bottom'
          })
          vm.sendEd = true
          vm.blessing = {}
        })
        .catch(err => {
          vm.$msg(err.data.msg)
        })
      } else {
        vm.$msg('请先填写名字和内容哟')
      }
    },
  },
  components: {}
};
</script>

<style lang="less">
@import "../assets/css/util.less";
.page_blessing {
  .myDanMu {
    // animation: breath 1.5s;
    // animation-iteration-count:infinite;
    background: rgba(251, 194, 235, .7) !important;
  }

  .baberrage-item { // 取消头像占用的位置
    padding-left: 0;
    display: none; // 在没有 transform 属性之前不显示, 以避免刚加载时弹幕会显示在中间
    &[style*="transform"] {
      display: block;
    }
  }
  .baberrage-avatar { // 隐藏头像
    // display: none;
    width: auto !important;
    img[src=''] {
      display: none;
    }
  }
  .breathing {
    box-shadow: 0 0 60px #FFFFFF;
    animation: breath 1.5s;
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


  .showFormBtn {
    border-radius: 50%;
    animation: breath 1.5s;
    animation-iteration-count:infinite;
    text-align: center;
    line-height: 60px;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, .96);
    // background: rgb(251, 194, 235, .96);
    position: absolute;
    bottom: 40px;
    right: 20px;
    &.show {
      animation: none;
    }
  }

  .w100-15 {
    width: calc(100% - 27px);
  }

  .formBox {
    // background-color: rgba(0,0,0,.2);
    max-width: 640px;;
    overflow: hidden;

    width: 100%;
    height: 100%;
    position: absolute;
    // background-color: rgba(255,255,255, .2);
    .form {
      position: relative;
      padding: 50px 15px 0 15px;
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
    margin-bottom: 6px;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .form-control {
    resize: vertical;
    display: block;
    width: 100%;
    .w100-15;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    font-weight: bold;
    // background-color: transparent;
    background-color: rgba(255,255,255, .8);
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
    background-color: #fff;
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
      width: 40px;
      height: 40px;
      margin-bottom: 4px;
      margin-top: 4px;
      .mbg(contain);
    }

  }
}
</style>
