const path = require(`path`)
const fs = require(`fs`)

const {
  minImage,
  wrapApiData,
  removeLeft,
  sweetNothing,
  randomFrom,
  simpleSvgPlaceholder,
} = require(`../util.js`)

/** @type {import('mockm/@types/config').Config} */
module.exports = (util) => {
  const {
    libObj: { mockjs },
  } = util

  // 随机背景色、前景色、文字图片
  const img = (size) => {
    return simpleSvgPlaceholder({
      width: String(size).split(`x`)[0],
      height: String(size).split(`x`)[1],
      bgColor: mockjs.mock(`@color`),
      textColor: mockjs.mock(`@color`),
      text: mockjs.mock(`@word`),
    })
  }

  // 随机获取一个甜言蜜语
  const sweet = () => {
    return sweetNothing[randomFrom(0, sweetNothing.length - 1)]
  }

  return {
    api: {
      'get /:id'(req, res, next) {
        const { id } = req.params
        const db = global.config._db
        const data = db.get(`weddings`).find({ id }).value()
        console.log(`data`, data)
        if (data) {
          res.sendFile(path.resolve(`../dist/index.html`))
        } else {
          next()
        }
      },
      'get /love/:id'(req, res, next) {
        const { id } = req.params
        const db = global.config._db
        const data = db.get(`weddings`).find({ id }).value()
        if (data) {
          res.sendFile(path.resolve(`../dist/index.html`))
        } else {
          next()
        }
      },
      async 'post /file/upload'(req, res) {
        const multiparty = await util.toolObj.generate.initPackge(`multiparty`)
        const uploadDir = `${__dirname}/../upload/`
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }
        const form = new multiparty.Form({
          uploadDir,
        })
        form.parse(req, async (err, fields = [], files) => {
          if (err) {
            res.sendStatus(500).json({ msg: String(err) })
          }
          const file = files.file[0]
          const isImg = (file.headers[`content-type`] || ``)
            .trim()
            .startsWith(`image/`)
          const parsePath = path.parse(file.path)
          const defaultExt = isImg ? `.jpg` : ``
          const filePath =
            // 如果没有后缀时, 默认为 jpg
            parsePath.ext === ``
              ? (fs.renameSync(file.path, `${file.path}${defaultExt}`),
                `${file.path}${defaultExt}`)
              : file.path
          isImg && minImage({ filePath })
          console.log(`file`, file)
          let url = path.parse(filePath).base
          res.json({ url })
        })
      },
      // 创建祝福
      'post /weddings/:weddingId/bless'(req, res, next) {
        const { name = ``, userId } = req.body
        const { weddingId } = req.params
        const db = global.config._db
        const devCount = db
          .get(`bless`)
          .filter({ userId, weddingId })
          .value().length
        const nameCount = db
          .get(`bless`)
          .filter({ name, weddingId })
          .value().length
        // 限制名字及设备写入数量
        if (devCount > 3) {
          res.status(401).send(
            wrapApiData({
              code: 401,
              data: {
                msg: `每个设备只能发送 2 对条留言哟`,
              },
            })
          )
          return false
        } else if (nameCount > 1) {
          res.status(401).send(
            wrapApiData({
              code: 401,
              data: {
                msg: `每个人只能发送 2 条留言哟`,
              },
            })
          )
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
            default: `boyTag`, // 需要是下面值的其中之一
            boy: `boyTag`,
            girl: `girlTag`, // 在网址参数上添加 ?t=girl 可切换成女生版邀请
          },
          // 视频
          video: {
            pic: img(`640x320`), // 封面图片
            url: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/video.b9f90f1.mp4`, // 视频文件
          },
          // 是否显示相册中相片下的随机文字
          photosTextShow: true,
          // 是否显示相册的翻页按钮
          photosSwitchShow: true,
          // 页面背景图片，为空时显示渐变背景色
          pageBg: {
            call: { src: img(`750x1334`), animate: true }, // 首页(来电页)
            talk: { src: img(`750x1334`), animate: true }, // 电话接听页
            desktop: { src: img(`750x1334`), animate: true }, // 桌面
            blessing: { src: img(`750x1334`) }, // 祝福
            dialing: { color: `#fff` }, // 通话记录
            wechat: { color: `#fff` }, // 微信
            photos: { src: img(`750x1334`) }, // 相册
            photograph: { src: img(`750x1334`) }, // 拍照
            integrated: { src: img(`750x1334`) }, // 集成
            invite: { src: img(`750x1334`) }, // 邀请
            map: {}, // 地图
          },
          pageMp3Base: {
            // 默认背景音乐
            audio: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/bgm_min.5106e88.mp3`,
            page: [
              // 播放背景音乐的页面
              `desktop`, // 桌面
              `date`, // 日期
              `photos`, // 相册
              `blessing`, // 祝福
              `dialing`, // 通话记录
              `wechat`, // 微信
              `integrated`, // 集成
              `invite`, // 邀请
              `map`, // 地图
            ],
          },
          pageMp3: {
            // 页面背景音乐， 为空时为默认音乐
            call: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/calls.7b4ae1b.mp3`, // 首页(来电页)
            talk: {
              // 来电语音
              boy: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/talk.9a9ece8.mp3`,
              girl: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/talk-girl.7c3806f.mp3`,
            }, // 电话接听页
            desktop: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/duang.a89dca4.mp3`, // 桌面
            integrated: ``, // 日期
            photos: ``, // 相册
            map: ``, // 地图
          },
          date: {
            // 宴席日期, 格式: YYYY/MM/DD HH:mm:ss
            boy: `${new Date().getFullYear() + 1}/05/20 15:30:00`,
            girl: `${new Date().getFullYear() + 1}/05/21 12:30:00`,
          },
          boyName: `杨过`,
          girlName: `小龙女`,
          inviteText: {
            boy: {
              title: ``,
              desc: ``,
            },
            girl: {
              title: ``,
              desc: ``,
            },
          },
          phone: {
            // 电话
            boy: 18212341234,
            girl: 18212341235,
          },
          wechat: {
            // 微信语音
            boy: {
              audio: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/wechat.37e0561.mp3`, // 语音
              img: img(`100x100`), // 头像
            },
            girl: {
              audio: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/static/media/wechat-girl.f81c3f3.mp3`,
              img: img(`100x100`),
            },
          },
          addr: {
            // 地图显示的地址
            boy: {
              // 显示名字
              name: `江西省临安牛家村本宅`,
              // 坐标
              // 使用此工具可查询经纬度
              // https://www.gpsspg.com/maps.htm
              // https://lbs.amap.com/console/show/picker 高德地图经纬查询
              position: [119.25457, 30.220399],
            },
            girl: {
              name: `陕西省户县祖庵镇本宅`,
              position: [108.494793, 34.1055],
            },
          },
        },
              position: [116.397477, 39.908692],
            },
            girl: {
              name: `东方明珠`,
              position: [121.499809, 31.239666],
            },
          },
        },
      ],
      users: [
        {
          id: `1`,
          ua: `chrome`,
        },
      ],
      bless: [
        ...[
          {
            name: `李莫愁`,
            content: `风雨同舟，任他沧海桑田`,
          },
          {
            name: `郭芙`,
            content: `缘定三生，白头厮守`,
          },
          {
            name: `郭襄`,
            content: `花瓣飞，彩蝶追，欢腾的喜庆在飘摇；蓝天蓝，白云白，千紫万红梦相随`,
          },
          {
            name: `裘千尺`,
            content: `白首齐眉鸳鸯比翼，青阳启瑞桃李同心。`,
          },
          {
            name: `陆无双`,
            content: `琴和瑟相伴，花好月也圆`,
          },
          {
            name: `金轮法王`,
            content: `姻缘一线牵，甜蜜两心间，佳偶天成心相印，百年好合乐无边`,
          },
          {
            name: `赵志敬`,
            content: `缘何相聚，还诺前世；聚何相爱，为惜今生`,
          },
        ].map((item) => ({
          id: `@uuid`,
          name: `@cname`, // 发送祝福的人姓名
          content: `@ctitle`, // 祝福内容
          ...item,
          userId: `@uuid`, // 发送人ID
          weddingId: `18212341234`, // 对应的邀请函
        })),
      ],
      // 相册
      photos: [
        ...[...new Array(18)].map(() => ({
          id: `@uuid`,
          pos: `@pick(top,right,bottom,left)`, // 偏移 top|right|bottom|left ， 如果图片焦点逼近右边时， 可以使用 right 值保证焦点可见
          img: img(`750x1334`), // 图片地址
          text: sweet(), // 图片的文字
          weddingId: `18212341234`, // 所属邀请函
        })),
      ],
    }),
  }
}
