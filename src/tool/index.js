import Fingerprint2 from 'fingerprintjs2'
export default {
  word: [
    '两情相悦', '百年好合', '成双成业', '缘定三生', '良缘夙缔',
    '缔结良缘', '花好月圆', '佳偶天成', '郎才女貌', '佳偶天成',
    '白头偕老', '才子佳人', '永结同心', '天生一对', '相敬如宾',
    '天作之合', '有情成眷', '新婚大喜', '珠联璧合', '天造地设',
    '开心', '快乐', '辛福', '健康', '儿孙满堂',
    '相亲相爱', '有情人终成眷属', '喜结良缘', '新婚大喜',
    '相约永久', '十年修得同船渡，百年修得共枕眠', '幸福美满，共谐连理', '恩恩爱爱',
    '甜甜蜜蜜', '白头到老', '长长久久', '祝相爱年年岁岁，相知岁岁年年',
    '相亲相爱，同德同心',
    '彼此宽容、互相照顾',
    '天作之合，鸾凤和鸣',
    '白首齐眉鸳鸯比翼，青阳启瑞桃李同心',
    '只羡鸳鸯不羡仙',
    '情投意合',
    '千禧年结千年缘，百年身伴百年眠。天生才子佳人配，只羡鸳鸯不羡仙',
    '意笃情深',
    '真爱永恒',
  ],
  randomFrom (lowerValue, upperValue) { // ab之前的随机数, 含ab
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue)
  },
  getWeek () {
    var weeks = ['日', '一', '二', '三', '四', '五', '六']
    var date = new Date()
    var weekNum = date.getDay()
    return '星期' + weeks[weekNum]
  },
  getFullDate () {
    var date = new Date()
    var day = date.getDate()
    if (day < 10) {
      return '0' + day
    }
    return day
  },
  autoPlay (eId) {
    window.wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: '',
      timestamp: 1,
      nonceStr: '',
      signature: '',
      jsApiList: []
    })
    window.wx.ready(() => {
      document.getElementById(eId).play()
    })
  },
  getQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = (window.location.href.match(/\?.*/) || [''])[0].substr(1).match(reg)
    return r !== null ? unescape(r[2]) : ''
  },
  storage: {
    fix: 'love_',
    // 存储
    set (key, value) {
      window.localStorage.setItem('love_' + key, JSON.stringify(value))
    },
    // 取出数据
    get (key) {
      let val = window.localStorage.getItem('love_' + key)
      try {
        return JSON.parse(val)
      } catch (error) {
        return val
      }
    },
    // 删除数据
    remove (key) {
      window.localStorage.removeItem('love_' + key)
    }
  },
}
