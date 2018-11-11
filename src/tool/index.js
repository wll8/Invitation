export default {
  randomFrom (lowerValue, upperValue) {
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
    wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: '',
      timestamp: 1,
      nonceStr: '',
      signature: '',
      jsApiList: []
    })
    wx.ready(() => {
      document.getElementById(eId).play()
    })
  },
  getQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = (window.location.href.match(/\?.*/) || [''])[0].substr(1).match(reg)
    return r !== null ? unescape(r[2]) : ''
  },
  storage: {
    // 存储
    set (key, value) {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    // 取出数据
    get (key) {
      return JSON.parse(window.localStorage.getItem(key))
    },
    // 删除数据
    remove (key) {
      window.localStorage.removeItem(key)
    }
  }
}
