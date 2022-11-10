/**
 * http 请求通用处理方法
 */
function http(lib, {baseURL} = {}) {
  lib.config.baseURL = baseURL
  // 添加响应拦截器，响应拦截器会在then/catch处理之前执行
  lib.interceptors.request.use((request)=>{
    return request
  })
  lib.interceptors.response.use(
    response => {
      // 只将请求结果的data字段返回
      return response.data.data
    },
    err => {
      // 发生网络错误后会走到这里
      // 不使用 new Error() catch 不到， 使用 new Error 后需要使用 JSON.stringify
      // return Promise.reject(new Error(JSON.stringify(err.response.data)))
      return Promise.reject(err.response.data)
    }
  )
  return lib
}

/**
 * 缓存函数
 * @param {*} func 
 * @param {*} content 
 * @returns 
 */
function cacheFn(func, content) {
  let cache = Object.create(null)
  content = content || this
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key)
    }
    return cache[key]
  }
}

/**
 * 计算浏览器 ID
 * @returns 
 */
function getDeviceCode() {
  return new Promise((resolve, reject) => {
    function getCode () {
      const Fingerprint2 = window.Fingerprint2
      Fingerprint2.get(com => {
        let values = com.map(item => { return item.value })
        let murmur = Fingerprint2.x64hash128(values.join(''), 31)
        resolve(murmur)
      })
    }
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => { getCode() })
    } else {
      setTimeout(() => { getCode() }, 500)
    }
  })
}

/**
 * 操作 localStorage
 * @param {*} param0 
 * @returns 
 */
function storage({ prefix = `love_`} = {}) {
  return {
    // 存储
    set (key, value) {
      window.localStorage.setItem(prefix + key, JSON.stringify(value))
    },
    // 取出数据
    get (key) {
      let val = window.localStorage.getItem(prefix + key)
      try {
        return JSON.parse(val)
      } catch (error) {
        return val
      }
    },
    // 删除数据
    remove (key) {
      window.localStorage.removeItem(prefix + key)
    }
  }
}


/**
 * 随机颜色
 * @returns 
 */
function randomColor () {
  return ( Math.random() * 0xffffff<<0 ).toString(16);
}


/**
 * 随机返回指定的 svg 图片
 * @param {*} param0 
 * @returns 
 */
function simpleSvgPlaceholder ({ // https://cloudfour.com/thinks/simple-svg-placeholder/
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
}


/**
 * 小写数字转大小数字
 * @param {*} num 
 * @returns 
 */
function cnNum (num) {
  let cn = '一二三四五六七八九十'
  return num > 9 ? '十' + cn[('' + num)[1]] : cn[num]
}


/**
 * 时间格式化
 * @param {*} fmt 
 * @param {*} date 
 * @returns 
 */
function dateFtt (fmt, date) { // author: meizz
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
}


/**
 * 获取浏览器名称
 * @returns 
 */
function browser () {
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
}


/**
 * 判断是否在微信中
 * @returns 
 */
function iswx () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger' || ua.match(/_SQ_/i) === '_sq_') {
    return true
  } else {
    return false
  }
}


/**
 * 时间转农历时间
 * @param {*} inputTime 
 * @returns 
 */
function ctime (inputTime = '20:20') {
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
}

/**
 * ab之间的随机数, 含ab
 */
function randomFrom (lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue)
}

/**
 * 获取今天是星期几
 * @returns 
 */
function getWeek () {
  var weeks = ['日', '一', '二', '三', '四', '五', '六']
  var date = new Date()
  var weekNum = date.getDay()
  return '星期' + weeks[weekNum]
}

/**
 * 获取今天是当月的第几天
 * @returns 
 */
function getFullDate () {
  var date = new Date()
  var day = date.getDate()
  if (day < 10) {
    return '0' + day
  }
  return day
}

/**
 * 播放声音
 * @returns 
 */
function play (eId, audio) {
  if (audio) {
    const audioElement = document.getElementById(eId)
    audioElement.src = audio
    audioElement.play()
  } else {
    document.getElementById(eId).play()
  }
}

/**
 * 暂停声音
 * @returns 
 */
function pause (eId, audio) {
  if (audio) {
    const audioElement = document.getElementById(eId)
    audioElement.src = audio
    audioElement.pause()
  } else {
    document.getElementById(eId).pause()
  }
}

/**
 * js正则获取url参数，包含hash[#]和search[?]两种通用
 * @returns 
 */
function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
  return r != null ? decodeURIComponent(r[2]) : ''
}


export default {
  http,
  cacheFn,
  getDeviceCode: cacheFn(getDeviceCode),
  randomColor,
  simpleSvgPlaceholder,
  cnNum,
  dateFtt,
  browser,
  iswx,
  ctime,
  randomFrom,
  getWeek,
  getFullDate,
  play,
  pause,
  getQueryString,
  storage: storage(),
}
