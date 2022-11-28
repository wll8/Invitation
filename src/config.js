/**
 * 为了实现配置统一, vue.config.js 中的配置也从这里加载
 * 所以某些配置需要重启动 server 生效
 */

const configBase = {
  /**
   * API 前缀地址
   */
  baseApi: `http://localhost:9000`,
  /**
   * 上传文件所在地址, 例如邀约录音
   */
  upload: `http://127.0.0.1:9020/file/upload`,
  /**
   * 公用 cdn 资源所在地址
   * 一些与项目无关的第三方库
   */
  cdnPath: `/cdn/npm/`,
  /**
   * 业务静态资源所在地址
   * 便于把业务上的一些资源放到三方平台的存储空间上以增加访问速度, 例如各种 chunk 文件
   */
  staticPath: `/`,
  /**
   * index.html 文件部署的位置
   * 便于让访问的人从地址上看起来是自己的域名
   * 例如需要对入口进行动态分析和响应, 而第三方平台上的存储空间上通常没有此功能
   *
   * 另一个用例:
   * 在分享功能时, 微信中使用分享需要企业认证公众号
   * 如果没有, 只能其他方式解决, 例如三方API(不安全)
   * 或使用QQ之类的程序(自动提取html中的meta信息, 动态添加的无用),
   * 所以只能使用服务器动态渲染 index.html
   */
  indexPath: `/`,
}
const map = {
  dev: {},
  prod: {
    cdnPath: `//xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/mycdn/`,
    staticPath: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/love/`,
    indexPath: `/love/`,
  },
  test: {
    cdnPath: `//xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/mycdn/`,
    staticPath: `https://xw-cq-1255591119.cos.ap-chongqing.myqcloud.com/Invitation-hyy/love/`,
    indexPath: `/love/`,
  },
}
const configCur = {
  ...configBase,
  ...(map[process.env.VUE_APP_ENV] || map[`dev`]),
}

export default configCur
