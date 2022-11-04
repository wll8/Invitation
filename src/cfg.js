import tool from './tool/index.js'
const baseUrl = `http://127.0.0.1:9000`
const {simpleSvgPlaceholder, randomColor} = tool
const randomImg = function randomImg(cfg) {
  const img = simpleSvgPlaceholder({
    width: 750,
    height: 1334,
    bgColor: `#${randomColor()}`,
    textColor: `#${randomColor()}`,
    ...cfg,
  })
  return img
}


console.log(`randomColor()`, randomColor())

export default {
  // apiUrl: 'http://192.168.18.109:3001/',
  apiUrl: false, // 服务器接口地址, false 为演示模式, 有示例留言, 操作结果将保存在 localStorage 中
  pw: 'xwlove', // 调试页授权码
  url: { // 页面参数
    default: 'boy', // 需要是下面值的其中之一
    boy: 'boy',
    girl: 'girl', // 在网址参数上添加 ?t=girl 可切换成女生版邀请
  },
  video: {
    pic: require('./assets/images/play_640.jpg'), // 封面图片
    url: `${baseUrl}/video`, // 视频文件
  }, // 视频
  photos: [ // 相册， 建议尺寸 750×1334 px
    // img 图片地址
    // pos 偏移 top|right|bottom|left ， 如果图片焦点逼近右边时， 可以使用 right 值保证焦点可见
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    // {pos: 'top', img: randomImg()},
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    randomImg(),
    {pos: 'top', img: randomImg()},
    randomImg(),
    randomImg(),
    randomImg(),
    {pos: 'bottom', img: randomImg()},
    randomImg(),
  ],
  photosTextShow: true, // 是否显示相册中相片下的随机文字
  photosSwitchShow: true, // 是否显示相册的翻页按钮
  pageBg: {
    // 页面背景图片，为空时显示渐变背景色
    call: {src: randomImg(), animate: true}, // 首页(来电页)
    talk: {src: randomImg(), animate: true}, // 电话接听页
    desktop: {src: randomImg(), animate: true}, // 桌面
    blessing: randomImg(), // 祝福
    dialing: {color: '#fff'}, // 通话记录
    wechat: {color: '#fff'}, // 微信
    photos: require('./assets/images/photos-bg.jpg'), // 相册
    photograph: randomImg(), // 拍照
    integrated: randomImg(), // 集成
    invite: randomImg(), // 邀请
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
  date: { // 宴席日期, 格式: YYYY/MM/DD HH:mm:ss
    boy: `${(new Date).getFullYear()+1}/05/20 15:30:00`,
    girl: `${(new Date).getFullYear()+1}/05/20 12:30:00`,
  },
  inviteText: { // 邀约文本， 空格和换行原样显示
    title: '小龙女 & 杨过的邀约',
    contentStyle: `text-align: center;`,
    boy: `
举案齐眉心中想，白头偕老我所愿，执子之手永不变，誓言今朝终实现，百年好合盼祝愿，
今邀好友来捧场，一定赏光勿迟到，好酒好菜管到饱，
欢乐开心婚姻好。
    `,
    girl: `
红叶传情久，终觅佳期成佳偶;秋雁送书来，诚邀亲友话亲情;
佳人佳偶逢佳期，君至可添喜;亲友亲事话亲情，您来能增辉。
    `,
  },
  phone: { // 电话
    boy: 18212341234,
    girl: 18212341235,
  },
  wechat: { // 微信语音
    boy: {
      audio: require('./assets/audio/my/wechat.mp3'), // 语音
      img: randomImg({width: 100, height: 100}), // 头像
    },
    girl: {
      audio: require('./assets/audio/my/wechat-girl.mp3'),
      img: randomImg({width: 100, height: 100}),
    },
  },
  addr: { // 地图显示的地址
    boy: {
      // 显示名字
      name: '天安门',
      // 坐标
      // 使用此工具可查询经纬度
      // www.gpsspg.com/maps.htm
      // https://lbs.amap.com/console/show/picker 高德地图经纬查询
      position: [116.397477, 39.908692],
    },
    girl: {
      name: '东方明珠',
      position: [121.499809, 31.239666],
    },
  }
}
