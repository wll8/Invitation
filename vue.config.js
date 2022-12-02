const esm = require(`esm`)(module)
const configSrc = esm(`./src/config.js`).default
const path = require(`path`)
console.log(`config`, configSrc)

module.exports = {
  chainWebpack: (config) => {
    config.plugin(`html`).tap((args) => {
      args[0].templateParameters = {
        obj: {
          cdnPath: configSrc.cdnPath,
          staticPath: configSrc.staticPath,
        },
      }
      return args
    })
  },
  publicPath: configSrc.staticPath, // 基本路径, 建议以绝对路径跟随访问目录
  outputDir: `./dist`, // 输出文件目录
  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: `less`,
      patterns: [path.resolve(__dirname, `./src/assets/css/base.less`)], // less所在文件路径
    },
  },
  css: {
    sourceMap: true,
  },
}
