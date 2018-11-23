const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const router = express()
const app = express()
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/blessings'
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('connected', err => console.log(err || 'connected ok'))
const Schema = mongoose.Schema
const blessingSchema = new Schema({
  name: {
    type: String, // 名字
    unique: true, // mongo 创建唯一索引
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
const BlessingModel = db.model('blessing', blessingSchema)

// 跨域设置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', req.headers.origin)
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
    .get('/', (req, res) => {
      BlessingModel.find({}, (err, doc) => res.send(err || doc))
    })
    // 获取某人的
    .get('/:user_id', (req, res) => {
      const {user_id: userId} = req.params
      BlessingModel.find({user_id: userId}, (err, doc) => res.send(err || doc))
    })
    // 添加
    .post('/:user_id', jsonParser, (req, res) => {
      const myBlessingModel = new BlessingModel(req.body)
      myBlessingModel.save(req.body, (err, doc) => res.send(err || doc))
    })
)

app.get('/', (req, res) => {
  res.send('api')
})
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('server port ' + port)
})

module.exports = app
