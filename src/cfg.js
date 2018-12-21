export default {
  apiUrl: 'http://192.168.18.109:3001/', // 服务器接口地址
  pw: 'xwlove', // 调试页授权码
  url: { // 页面参数
    default: 'boy', // 需要是下面值的其中之一
    boy: 'boy',
    girl: 'girl', // 在网址参数上添加 ?t=girl 可切换成女生版邀请
  },
  video: {
    pic: require('./assets/images/play_640.jpg'), // 封面图片
    url: require('./assets/video/video.mp4'), // 视频文件
  }, // 视频
  photos: [ // 相册， 建议尺寸 750×1334 px
    // img 图片地址
    // pos 偏移 top|right|bottom|left ， 如果图片焦点逼近右边时， 可以使用 right 值保证焦点可见
    require('./assets/images/my/13.jpg'),
    require('./assets/images/my/18.jpg'),
    require('./assets/images/my/10.jpg'),
    require('./assets/images/my/11.jpg'),
    require('./assets/images/my/9.jpg'),
    require('./assets/images/my/5.jpg'),
    require('./assets/images/my/6.jpg'),
    require('./assets/images/my/14.jpg'),
    // {pos: 'top', img: require('./assets/images/my/15.jpg')},
    require('./assets/images/my/16.jpg'),
    require('./assets/images/my/21.jpg'),
    require('./assets/images/my/25.jpg'),
    require('./assets/images/my/4.jpg'),
    require('./assets/images/my/1.jpg'),
    require('./assets/images/my/7.jpg'),
    require('./assets/images/my/2.jpg'),
    require('./assets/images/my/8.jpg'),
    {pos: 'top', img: require('./assets/images/my/3.jpg')},
    require('./assets/images/my/17.jpg'),
    require('./assets/images/my/19.jpg'),
    require('./assets/images/my/20.jpg'),
    {pos: 'bottom', img: require('./assets/images/my/23.jpg')},
    require('./assets/images/my/24.jpg'),
  ],
  pageBg: {
    // 页面背景图片，为空时显示渐变背景色
    call: {src: require('./assets/images/my/14.jpg'), animate: true}, // 首页(来电页)
    talk: {src: require('./assets/images/my/18.jpg'), animate: true}, // 电话接听页
    desktop: {src: require('./assets/images/my/6.jpg'), animate: true}, // 桌面
    blessing: require('./assets/images/my/1.jpg'), // 祝福
    dialing: {color: '#fff'}, // 通话记录
    wechat: {color: '#fff'}, // 微信
    photos: require('./assets/images/photos-bg.jpg'), // 相册
    photograph: require('./assets/images/my/9.jpg'), // 拍照
    integrated: require('./assets/images/my/5.jpg'), // 集成
    invite: require('./assets/images/my/15.jpg'), // 邀请
    map: '', // 地图
  },
  pageMp3Base: { // 默认背景音乐
    audio: require('./assets/audio/bgm_min.mp3'),
    page: [ // 播放背景音乐的页面
      // 'desktop', // 桌面
      'date', // 日期
      'photos', // 相册
      'blessing', // 祝福
      // 'dialing', // 通话记录
      // 'wechat', // 微信
      'integrated', // 集成
      'invite', // 邀请
      'map', // 地图
    ],
  },
  pageMp3: {
    // 页面背景音乐， 为空时为默认音乐
    call: require('./assets/audio/calls.mp3'), // 首页(来电页)
    talk: { // 来电语音
      boy: require('./assets/audio/my/talk.mp3'),
      girl: require('./assets/audio/my/talk-girl.mp3'),
    }, // 电话接听页
    desktop: require('./assets/audio/duang.mp3'), // 桌面
    integrated: '', // 日期
    photos: '', // 相册
    map: '', // 地图
  },
  date: { // 宴席日期
    boy: '01/01/2019 15:30:00',
    girl: '01/01/2019 15:30:00',
  },
  inviteText: { // 邀约文本， 空格和换行原样显示
    title: '金龙 & 蛋蛋的邀约',
    boy: `
各位亲朋好友：

　　诚挚邀请您于2017年1月31日，星期二，08:00参加金龙和蛋蛋的结婚典礼。

　　您的到来是对我们最好的祝福，敬备喜宴，恭请光临。

　　杭州的小伙伴，年后回杭另设宴席。
    `,
    girl: `
各位亲朋好友：

　　诚挚邀请您于2017年1月31日，星期二，08:00参加金龙和蛋蛋的结婚典礼。

　　诚挚邀请您于2017年2月4日，星期六，11:00参加金龙和蛋蛋的结婚典礼。

　　杭州的小伙伴，年后回杭另设宴席。
    `,
  },
  wxVoice: { // 微信语音
    boy: '',
    girl: '',
  },
  phone: { // 电话
    boy: 18868875314,
    girl: 18868875314,
  },
  wechat: { // 微信语音
    boy: {
      audio: require('./assets/audio/my/wechat-boy.mp3'), // 语音
      img: require('./assets/images/my/head1.jpg'), // 头像
    },
    girl: {
      audio: require('./assets/audio/my/wechat-girl.mp3'),
      img: require('./assets/images/my/head2.jpg'),
    },
  },
  addr: { // 地图显示的地址
    boy: {
      // 显示名字
      name: '天安门',
      // 坐标
      // 使用此工具可查询经纬度
      // www.gpsspg.com/maps.htm
      position: [116.397477, 39.908692],
    },
    girl: {
      name: '东方明珠',
      position: [121.499809, 31.239666],
    },
  }
}
