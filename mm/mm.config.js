const api = require(`./api/index.js`)
const { wrapApiData } = require(`./util.js`)

/**
 * 配置说明请参考文档: 
 * https://hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = util => {
  return {
    guard: false,
    dbCover: false,
    port: 9000,
    testPort: 9005,
    replayPort: 9001,
    watch: [`./api/`],
    apiWeb: `./apiWeb.json`,
    proxy: {
      '/': `https://hongqiye.com:3001/`, // 后端接口主域
      '/video': `https://www.w3school.com.cn/i/movie.mp4`,
    },
    api: {
      // 在其他文件里的 api
      ...api(util).api,
    },
    db: {
      ...api(util).db,
    },
    static: [],
    resHandleReplay: ({req, res}) => wrapApiData({code: 200, data: {}}),
    resHandleJsonApi: ({req, res: {statusCode: code}, data}) => wrapApiData({code, data}),
  }
}
