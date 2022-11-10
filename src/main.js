// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/common.less'
import tool from './tool/index.js'
import bgimg from '@/components/bgimg.vue'
import toast from '@/components/toast.js'
import store from './store.js'
import fly from 'flyio'

// import vueBaberrage from 'vue-baberrage'
// import Fingerprint2 from 'fingerprintjs2'

const {Vue} = window

// Vue.use(vueBaberrage)
Vue.use(toast)

Vue.prototype.$tool = tool
const $http = tool.http(fly, {baseURL: `http://127.0.0.1:9020/`})
Vue.prototype.$http = $http
Vue.component('bgimg', bgimg) // 全局注册组件

router.beforeEach(async (to, from, next) => {
  store.state.userId = store.state.userId || await tool.getDeviceCode()
  const weddingId = to.params.weddingId
  store.state.weddingId = weddingId
  const data = store.state.weddingConfig.id === weddingId 
    ? store.state.weddingConfig
    : await $http.get(`/weddings/${store.state.weddingId}`)
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
    ...window.Vuex.mapState([
      `weddingId`,
      `weddingConfig`,
      `userId`,
    ]),
    ...window.Vuex.mapGetters([
      `urlStatus`,
    ]),
  },
  store,
  router,
  components: {
    App,
  },
  template: '<App/>'
})
