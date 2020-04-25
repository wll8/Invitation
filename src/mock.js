import tool from './tool/index.js'

const store = {
  data: [
    {
      "name": "李莫愁",
      "blessing": "风雨同舟，任他沧海桑田",
    },
    {
      "name": "郭芙",
      "blessing": "缘定三生，白头厮守",
    },
    {
      "name": "郭襄",
      "blessing": "花瓣飞，彩蝶追，欢腾的喜庆在飘摇；蓝天蓝，白云白，千紫万红梦相随",
    },
    {
      "name": "裘千尺",
      "blessing": "白首齐眉鸳鸯比翼，青阳启瑞桃李同心。",
    },
    {
      "name": "陆无双",
      "blessing": "琴和瑟相伴，花好月也圆",
    },
    {
      "name": "金轮法王",
      "blessing": "姻缘一线牵，甜蜜两心间，佳偶天成心相印，百年好合乐无边",
    },
    {
      "name": "赵志敬",
      "blessing": "缘何相聚，还诺前世；聚何相爱，为惜今生",
    },
  ],
  api: {
    "GET love": () => {
      const blessing = tool.storage.get('blessing')
      let newData = blessing || store.data.map((item, index) => ({
        id: String(index),
        user_id: String(index),
        ...item,
      }))
      tool.storage.set('blessing', newData)
      return newData
    },
    "POST love": (data) => {
      const list = store.api['GET love']()
      const res = list.push(data)
      tool.storage.set('blessing', list)
      return res
    },
    "DELETE love": id => {
      const list = store.api['GET love']()
      const res = list.splice(list.findIndex(item => item.id === id), 1)
      tool.storage.set('blessing', list)
      return res
    },
  },
  fly: {
    get: url => {
      return new Promise((resolve, reject) => {
        resolve(store.api[`GET love`]())
      })
    },
    post: (url, data) => {
      return new Promise((resolve, reject) => {
        console.log({url, data})
        resolve(store.api[`POST love`](data))
      })
    },
    delete: url => {
      return new Promise((resolve, reject) => {
        const id = url.replace(/.*\//, '')
        resolve(store.api[`DELETE love`](id))
      })
    },
  }
}

export default store
