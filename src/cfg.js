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
  apiUrl: 'http://127.0.0.1:9000/',
}
