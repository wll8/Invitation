// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/common.less'
import tool from './tool/index.js'
import mock from './mock.js'
import cfg from './cfg.js'
import bgimg from '@/components/bgimg.vue'
import toast from '@/components/toast.js'
import store from './store.js'

// import vueBaberrage from 'vue-baberrage'
// import Fingerprint2 from 'fingerprintjs2'
const fly = require('flyio')
fly.config.baseURL = cfg.apiUrl
// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.request.use((request)=>{
  return request
})
fly.interceptors.response.use(
  response => {
    // 只将请求结果的data字段返回
    return response.data.data
  },
  err => {
    // 发生网络错误后会走到这里
    // 不使用 new Error() catch 不到， 使用 new Error 后需要使用 JSON.stringify
    // return Promise.reject(new Error(JSON.stringify(err.response.data)))
    return Promise.reject(err.response.data)
  }
)
const {Vue, Fingerprint2 = {}} = window

const deviceCode = () => {
  return new Promise((resolve, reject) => {
    const localCode = tool.storage.get('deviceCode')
    localCode ? resolve(localCode) : (() => {
      function getDeviceCode () {
        Fingerprint2.get(com => {
          let values = com.map(item => { return item.value })
          let murmur = Fingerprint2.x64hash128(values.join(''), 31)
          tool.storage.set('device', com)
          tool.storage.set('deviceCode', murmur)
          resolve(murmur)
        })
      }
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => { getDeviceCode() })
      } else {
        setTimeout(() => { getDeviceCode() }, 500)
      }
    })()

    // const localCode = tool.storage.get('deviceCode')
    // localCode ? resolve(localCode) : Fingerprint2.get(res => {
    //   tool.storage.set('deviceCode', res)
    //   resolve(res)
    // })
  })
}

// Vue.use(vueBaberrage)
Vue.use(toast)

Vue.prototype.$tool = tool
Vue.prototype.$fly = cfg.apiUrl === false ? mock.fly : fly
Vue.component('bgimg', bgimg) // 全局注册组件

router.beforeEach(async (to, from, next) => {
  store.state.userId = store.state.userId || await deviceCode()
  const weddingId = to.params.weddingId
  store.state.weddingId = weddingId
  const data = store.state.weddingConfig.id === weddingId 
    ? store.state.weddingConfig
    : await fly.get(`/weddings/${store.state.weddingId}`)
  store.state.weddingConfig = data
  document.title = data.inviteText.title
  // 页面更改时, 加上用户类型参数, 以免参数丢失导致用户分享后是另一种用户类型的页面
  const {type, tag} = store.getters.urlStatus
  if(!to.query.t) {
    next({
      path: to.path,
      query: {t: tag},
      // replace: true,
    })
  } else {
    next()
  }
  next()
})
window.vm = new Vue({
  el: '#app',
  computed: {
    weddingId() {
      return this.$store.state.weddingId
    },
    weddingConfig() {
      return this.$store.state.weddingConfig
    },
    urlStatus() {
      return this.$store.getters.urlStatus
    },
    userId() {
      return this.$store.state.userId
    },
  },
  store,
  router,
  components: {
    App,
  },
  template: '<App/>'
})
