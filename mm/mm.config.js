const api = require(`./api/index.js`)
const { wrapApiData } = require(`./util.js`)

/**
 * 配置说明请参考文档:
 * https://hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = (util) => {
  return {
    guard: false,
    dbCover: true,
    port: 9020,
    testPort: 9025,
    replayPort: 9021,
    watch: [`./api/`],
    apiWeb: `./apiWeb.json`,
    api: {
      // 在其他文件里的 api
      ...api(util).api,
    },
    db: {
      ...api(util).db,
    },
    static: [
      {
        path: `/file/upload`,
        fileDir: `./upload/`,
      },
    ],
    resHandleReplay: ({ req, res }) => wrapApiData({ code: 200, data: {} }),
    resHandleJsonApi: ({ req, res: { statusCode: code }, data }) =>
      wrapApiData({ code, data }),
  }
}
