// The Vue build version to load with the `import` command
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import '../src/assets/css/common.less'
import tool from '@/util/index.js'
import bgimg from '@/components/bgimg.vue'
import toast from '@/components/toast.js'
import store from '@/store/index.js'
import fly from 'flyio'

// import Fingerprint2 from 'fingerprintjs2'

Vue.use(toast)

Vue.prototype.$tool = tool
const $http = tool.http(fly, { baseURL: `http://127.0.0.1:9020/` })
Vue.prototype.$http = $http
Vue.component(`bgimg`, bgimg) // 全局注册组件

typeof (async () => {
  store.state.userId = store.state.userId || (await tool.getDeviceCode())
  const weddingId = tool.getEndDir(location.href) || `18212341234`
  store.state.weddingId = weddingId
  const data =
    store.state.weddingConfig.id === weddingId
      ? store.state.weddingConfig
      : await $http.get(`/weddings/${store.state.weddingId}`)
  store.state.weddingConfig = data
  document.title = data.inviteText.title
  // 页面更改时, 加上用户类型参数, 以免参数丢失导致用户分享后是另一种用户类型的页面
  const { type, tag } = store.getters.urlStatus
  router.beforeEach(async (to, from, next) => {
    if (!to.query.t) {
      router.push({
        path: to.path,
        query: { t: tag },
        // replace: true,
      })
    } else {
      next()
    }
    next()
  })
  window.vm = new Vue({
    el: `#app`,
    computed: {
      ...Vuex.mapState([`weddingId`, `weddingConfig`, `userId`]),
      ...Vuex.mapGetters([`urlStatus`]),
    },
    methods: {
      fileTo: tool.fileTo,
    },
    store,
    router,
    components: {
      App,
    },
    /**
     * https://v2.vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
     * 如果使用 template: `<App/>` 则需要编译运行时
     */
    render: (h) => h(App),
  })
})()
