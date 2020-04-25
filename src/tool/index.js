export default {
  randomColor (){
    return ( Math.random() * 0xffffff<<0 ).toString(16);
  },
  simpleSvgPlaceholder ({ // https://cloudfour.com/thinks/simple-svg-placeholder/
    width = 300,
    height = 150,
    text = `${width}×${height}`,
    fontFamily = 'sans-serif',
    fontWeight = 'bold',
    fontSize = Math.floor(Math.min(width, height) * 0.2),
    dy = fontSize * 0.35,
    bgColor = '#ddd',
    textColor = 'rgba(0,0,0,0.5)',
    dataUri = true,
    charset = 'UTF-8'
  } = {}) {
    const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect fill="${bgColor}" width="${width}" height="${height}"/>
      <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
    </svg>`;

    // Thanks to: filamentgroup/directory-encoder
    const cleaned = str
      .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
      .replace(/\s\s+/g, ' ') // Condense multiple spaces
      .replace(/'/gim, '\\i'); // Normalize quotes

    if (dataUri) {
      const encoded = encodeURIComponent(cleaned)
        .replace(/\(/g, '%28') // Encode brackets
        .replace(/\)/g, '%29');

      return `data:image/svg+xml;charset=${charset},${encoded}`;
    }

    return cleaned;
  },
  cnNum (num) {
    let cn = '一二三四五六七八九十'
    return num > 9 ? '十' + cn[('' + num)[1]] : cn[num]
  },
  dateFtt (fmt, date) { // author: meizz
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  },
  browser () {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent
        return { // 移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, // IE内核
          presto: u.indexOf('Presto') > -1, // Opera内核
          webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
          mobile: (!!u.match(/AppleWebKit.*Mobile.*/)) || (!!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0), // 是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // iOS终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // Android 终端或者 UC 浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为 iPhone 或者 QQHD 浏览器
          iPad: u.indexOf('iPad') > -1, // 是否 iPad
          webApp: u.indexOf('Safari') === -1, // 是否WEB应该程序，没有头部与底部。
          ua: u
        }
      }()),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return browser
  },
  iswx () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger' || ua.match(/_SQ_/i) === '_sq_') {
      return true
    } else {
      return false
    }
  },
  ctime (inputTime = '20:20') {
    let arr = '子丑寅卯辰巳午未申酉戌亥'.split('').map((item, index, curArr) => {
      // 唐前和唐后转换方式不同， 唐前 0:00-2:00 唐后 23:00-1:00 ， 本程序按唐后
      let date1 = index === 0 ? '23' : index * 2 - 1
      date1 = date1 < 10 ? '0' + date1 : date1
      let date2 = index * 2
      date2 = date2 < 10 ? '0' + date2 : date2
      return {cn: item, date: `${date1}:00:00-${date2}:59:59`}
    })
    let date = '00:01'
    let temp = '1999/09/09'
    date = +new Date(`${temp} ${date}`) // 时间字符串横 - mac 不兼容
    let cdate = arr.find(item => {
      let date0 = +new Date(`${temp} ${item.date.split('-')[0]}`)
      let date1 = +new Date(`${temp} ${item.date.split('-')[1]}`)
      return (date => date0) && (date <= date1)
    }) || arr[0]
    return cdate.cn
  },
  word: [
    '两情相悦', '百年好合', '成双成业', '缘定三生', '良缘夙缔',
    '缔结良缘', '花好月圆', '佳偶天成', '郎才女貌', '佳偶天成',
    '白头偕老', '才子佳人', '永结同心', '天生一对', '相敬如宾',
    '天作之合', '有情成眷', '新婚大喜', '珠联璧合', '天造地设',
    '开心', '快乐', '幸福', '健康', '儿孙满堂',
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
  play (eId, audio) {
    if (audio) {
      const audioElement = document.getElementById(eId)
      audioElement.src = audio
      audioElement.play()
    } else {
      document.getElementById(eId).play()
    }
  },
  pause (eId, audio) {
    if (audio) {
      const audioElement = document.getElementById(eId)
      audioElement.src = audio
      audioElement.pause()
    } else {
      document.getElementById(eId).pause()
    }
  },
  getQueryString (name) { // js正则获取url参数，包含hash[#]和search[?]两种通用
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
    return r != null ? decodeURIComponent(r[2]) : ''
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
