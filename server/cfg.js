var fs = require('fs')
const assign = require('lodash/assign')
const baseCfg = {
  pro_env: process.env.pro_env || 'dev',
  dburl: require('./dburl').dburl, // 'mongodb://用户名:密码@地址:端口/数据库'
  httpType: 'http',
  port: 3001,
}
const cfg = {
  dev: { // 开发
  },
  test: { // 测试
  },
  pro: { // 发布
    sslkey: fs.readFileSync('./web.key', 'utf8'),
    sslcrt: fs.readFileSync('./web.crt', 'utf8'),
    httpType: 'https',
  },
}
module.exports = assign(baseCfg, cfg[baseCfg.pro_env])
