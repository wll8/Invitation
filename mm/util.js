/**
 * 一些婚礼相关正能量的句子
 */
const sweetNothing = [
  `两情相悦`,
  `百年好合`,
  `成双成业`,
  `缘定三生`,
  `良缘夙缔`,
  `缔结良缘`,
  `花好月圆`,
  `佳偶天成`,
  `郎才女貌`,
  `佳偶天成`,
  `白头偕老`,
  `才子佳人`,
  `永结同心`,
  `天生一对`,
  `相敬如宾`,
  `天作之合`,
  `有情成眷`,
  `新婚大喜`,
  `珠联璧合`,
  `天造地设`,
  `开心`,
  `快乐`,
  `幸福`,
  `健康`,
  `儿孙满堂`,
  `相亲相爱`,
  `有情人终成眷属`,
  `喜结良缘`,
  `新婚大喜`,
  `相约永久`,
  `十年修得同船渡，百年修得共枕眠`,
  `幸福美满，共谐连理`,
  `恩恩爱爱`,
  `甜甜蜜蜜`,
  `白头到老`,
  `长长久久`,
  `祝相爱年年岁岁，相知岁岁年年`,
  `相亲相爱，同德同心`,
  `彼此宽容、互相照顾`,
  `天作之合，鸾凤和鸣`,
  `白首齐眉鸳鸯比翼，青阳启瑞桃李同心`,
  `只羡鸳鸯不羡仙`,
  `情投意合`,
  `千禧年结千年缘，百年身伴百年眠。天生才子佳人配，只羡鸳鸯不羡仙`,
  `意笃情深`,
  `真爱永恒`,
]

/**
 * ab之间的随机数, 含ab
 */
function randomFrom(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue)
}

/**
 * 包裹 api 的返回值
 * @param {*} param0
 * @param {object} param0.data - 原始数据
 * @param {number|string} [param0.code=200] - http状态码
 * @returns
 */
function wrapApiData({ data, code = 200 }) {
  code = String(code)
  return {
    code,
    success: Boolean(code.match(/^[2]/)), // 如果状态码以2开头则为 true
    data,
  }
}

function removeLeft(str) {
  const lines = str.split(`\n`)
  // 获取应该删除的空白符数量
  const minSpaceNum = lines
    .filter((item) => item.trim())
    .map((item) => item.match(/(^\s+)?/)[0].length)
    .sort((a, b) => a - b)[0]
  // 删除空白符
  const newStr = lines.map((item) => item.slice(minSpaceNum)).join(`\n`)
  return newStr
}

/**
 * 随机返回指定的 svg 图片
 * @param {*} param0
 * @returns
 */
function simpleSvgPlaceholder({
  // https://cloudfour.com/thinks/simple-svg-placeholder/
  width = 300,
  height = 150,
  text = `${width}×${height}`,
  fontFamily = `sans-serif`,
  fontWeight = `bold`,
  fontSize = Math.floor(Math.min(width, height) * 0.2),
  dy = fontSize * 0.35,
  bgColor = `#ddd`,
  textColor = `rgba(0,0,0,0.5)`,
  dataUri = true,
  charset = `UTF-8`,
} = {}) {
  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${bgColor}" width="${width}" height="${height}"/>
    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
  </svg>`

  // Thanks to: filamentgroup/directory-encoder
  const cleaned = str
    .replace(/[\t\n\r]/gim, ``) // Strip newlines and tabs
    .replace(/\s\s+/g, ` `) // Condense multiple spaces
    .replace(/'/gim, `\\i`) // Normalize quotes

  if (dataUri) {
    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, `%28`) // Encode brackets
      .replace(/\)/g, `%29`)

    return `data:image/svg+xml;charset=${charset},${encoded}`
  }

  return cleaned
}

module.exports = {
  simpleSvgPlaceholder,
  sweetNothing,
  randomFrom,
  removeLeft,
  wrapApiData,
}
