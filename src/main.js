// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/common.less'
import tool from './tool/index.js'
import cfg from './cfg.js'
import bgimg from '@/components/bgimg.vue'
import toast from '@/components/toast.js'
import vueBaberrage from 'vue-baberrage'
import Fingerprint2 from 'fingerprintjs2'
const fly = require('flyio')
fly.config.baseURL = cfg.apiUrl
// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    // 只将请求结果的data字段返回
    return response.data
  },
  err => {
    // 发生网络错误后会走到这里
    // 不使用 new Error() catch 不到， 使用 new Error 后需要使用 JSON.stringify
    // return Promise.reject(new Error(JSON.stringify(err.response.data)))
    return Promise.reject(err.response.data)
  }
)

const deviceCode = () => {
  return new Promise((resolve, reject) => {
    const localCode = tool.storage.get('deviceCode')
    localCode ? resolve(localCode) : new Fingerprint2().get(res => {
      tool.storage.set('deviceCode', res)
      resolve(res)
    })
  })
}

Vue.use(vueBaberrage)
Vue.use(toast)

Vue.prototype.$deviceCode = deviceCode
Vue.prototype.$g = require('./components/g.vue').default
Vue.prototype.$tool = tool
Vue.prototype.$fly = fly
Vue.prototype.$cfg = cfg
Vue.prototype.userType = tool.getQueryString('t') || 'boy' // 添加全局变量值
Vue.component('bgimg', bgimg) // 全局注册组件

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: {
    App,
    bgimg,
  },
  template: '<App/>'
})
