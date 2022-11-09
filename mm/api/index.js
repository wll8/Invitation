const { wrapApiData } = require(`../util.js`)

/** @type {import('mockm/@types/config').Config} */
module.exports = util => {
  const {
    libObj: { mockjs },
  } = util
  return {
    api: {
      // 创建祝福
      'post /weddings/:weddingId/bless'(req, res, next) {
        const {name = '', userId} = req.body
        const {weddingId} = req.params
        const db = global.config._db
        const devCount =  db.get(`bless`).filter({userId, weddingId}).value().length
        const nameCount =  db.get(`bless`).filter({name, weddingId}).value().length
        // 限制名字及设备写入数量
        if (devCount > 3) {
          res.status(401).send(wrapApiData({
            code: 401,
            data: {
              msg: '每个设备只能发送 2 对条留言哟'
            },
          }))
          return false
        } else if (nameCount > 1) {
          res.status(401).send(wrapApiData({
            code: 401,
            data: {
              msg: '每个人只能发送 2 条留言哟'
            },
          }))
          return false
        } else {
          next()
        }
      },
    },
    db: util.libObj.mockjs.mock({
      weddings: [
        {
          id: `18212341234`,
          pw: `xwlove`,
          // 页面参数
          url: {
            default: 'boyTag', // 需要是下面值的其中之一
            boy: 'boyTag',
            girl: 'girlTag', // 在网址参数上添加 ?t=girl 可切换成女生版邀请
          },
          // 视频
          video: {
            pic: `@image`, // 封面图片
            url: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/video.b9f90f1.mp4`, // 视频文件
          },
          // 是否显示相册中相片下的随机文字
          photosTextShow: true,
          // 是否显示相册的翻页按钮
          photosSwitchShow: true,
          // 页面背景图片，为空时显示渐变背景色
          pageBg: {
            call: {src: `@image`, animate: true}, // 首页(来电页)
            talk: {src: `@image`, animate: true}, // 电话接听页
            desktop: {src: `@image`, animate: true}, // 桌面
            blessing: `@image`, // 祝福
            dialing: {color: '#fff'}, // 通话记录
            wechat: {color: '#fff'}, // 微信
            photos: `@image`, // 相册
            photograph: `@image`, // 拍照
            integrated: `@image`, // 集成
            invite: `@image`, // 邀请
            map: '', // 地图
          },
          pageMp3Base: { // 默认背景音乐
            audio: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/bgm_min.5106e88.mp3',
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
            call: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/calls.7b4ae1b.mp3', // 首页(来电页)
            talk: { // 来电语音
              boy: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/talk.9a9ece8.mp3',
              girl: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/talk-girl.7c3806f.mp3',
            }, // 电话接听页
            desktop: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/duang.a89dca4.mp3', // 桌面
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
              audio: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/wechat.37e0561.mp3', // 语音
              img: `@image('100x100')`, // 头像
            },
            girl: {
              audio: 'https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/wechat-girl.f81c3f3.mp3',
              img: `@image('100x100')`,
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
          },
        }
      ],
      users: [
        {
          id: `1`,
          ua: `chrome`,
        },
      ],
      bless: [
        // {
        //   "id": "@uuid",
        //   "name": "李莫愁", // 发送祝福的人姓名
        //   "content": "风雨同舟，任他沧海桑田", // 祝福内容
        //   "userId": "@uuid", // 发送人ID
        //   "weddingId": `xw`, // 对应的邀请函
        // },
      ],
      // 相册
      photos: [
        // {
        //   "id": String,
        //   "pos": String, // 偏移 top|right|bottom|left ， 如果图片焦点逼近右边时， 可以使用 right 值保证焦点可见
        //   "img": String, // 图片地址
        //   "weddingId": String, // 所属邀请函
        // },
      ],
    }),
  }
}
