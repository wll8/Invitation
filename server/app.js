const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const router = express()
const app = express()
const cfg = require('./cfg.js')
const mongoose = require('mongoose')
const DB_URL = cfg.dburl
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('connected', err => console.log(err || 'connected ok'))
const Schema = mongoose.Schema
const blessingSchema = new Schema({
  name: {
    type: String, // 名字
    required: true,
  },
  user_id: {
    type: String, // 用户id
    required: true,
  },
  blessing: {
    type: String, // 祝福
    required: true,
  },
})
const reqSchema = new Schema({
  ip: {
    type: String, // ip
  },
  ua: {
    type: Object, // user-agent
  },
})
const BlessingModel = db.model('blessings', blessingSchema)
const ReqModel = db.model('reqs', reqSchema)
// 跨域设置
app.all('*', function (req, res, next) {
  /**
   * @getClientIP
   * @desc 获取用户 ip 地址
   * @param {Object} req - 请求
   */
  // 获取客户端ip地址
  function getClientIp (req) {
    var ip = req.headers['x-forwarded-for'] ||
          req.ip ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress || ''
    if (ip.split(',').length > 0) {
      ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length)
    return ip
  };
  const clientInfo = {
    ip: getClientIp(req),
    ua: req.headers['user-agent'],
  }
  console.log('clientInfo', clientInfo)
  const myReqModel = new ReqModel(clientInfo)
  myReqModel.save(req)

  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'OPTIONS') {
    // 让 options 请求快速返回
    res.send(200)
  } else {
    next()
  }
})

app.use(
  '/love',
  router
    // 获取所有
    .get('/', async (req, res) => {
      res.send(await BlessingModel.find())
    })
    // 获取某人的
    .get('/:user_id', async (req, res) => {
      const {user_id} = req.params
      res.send(await BlessingModel.find({user_id}))
    })
    // 删除某条
    .delete('/:blessing_id', async (req, res) => {
      const {blessing_id} = req.params
      res.send(await BlessingModel.remove({_id: mongoose.Types.ObjectId(blessing_id)}))
    })
    // 添加
    .post('/:user_id', jsonParser, async (req, res) => {
      const {user_id} = req.params
      const {name = ''} = req.body
      const devCount = await BlessingModel.find({user_id}).count()
      const nameCount = await BlessingModel.find({name}).count()
      // 限制名字及设备写入数量
      if (devCount >= 4) {
        // msg 是写给前端开发人员看的， 不是写给用户看的
        res.status(403).send({ code: 'devCountOverflow', msg: '超出设备数量限制', more: {num: devCount} })
        return false
      } else if (nameCount >= 2) {
        res.status(403).send({ code: 'nameCountOverflow', msg: '超出姓名数量限制', more: {num: nameCount} })
        return false
      } else {
        const myBlessingModel = new BlessingModel(req.body) // 使用 model 验证 body
        myBlessingModel.save(req.body).then(saveRes => {
          res.send(saveRes)
        }).catch(err => {
          res.status(400).send({ code: 'badReq', msg: '无效的请求内容', more: err })
        })
      }
    })
)

app.get('/', (req, res) => {
  res.send('api')
})
const port = process.env.PORT || 3001

const server = {
  http: () => require('http').createServer(app),
  https: () => require('https').createServer({key: cfg.sslkey, cert: cfg.sslcrt}, app),
}[cfg.httpType]()

server.listen(port, () => {
  console.log('server port ' + port)
})

module.exports = app
