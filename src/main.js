// The Vue build version to load with the `import` command
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import config from '@/config.js'
import '../src/assets/css/common.less'
import tool from '@/util/index.js'
import bgimg from '@/components/bgimg.vue'
import toast from '@/components/toast.js'
import store from '@/store/index.js'
import fly from 'flyio'
import dayjs from 'dayjs'

Vue.use(toast)

Vue.prototype.$tool = tool
const $http = tool.http(fly, { baseURL: config.baseApi })
Vue.prototype.$http = $http
Vue.prototype.$dayjs = dayjs
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
  // 页面更改时, 加上用户类型参数, 以免参数丢失导致用户分享后是另一种用户类型的页面
  const { type, tag } = store.getters.urlStatus
  {
    // 数据预处理 data.inviteText
    const { inviteText, boyName, girlName, date, addr } = data
    inviteText.boy.title =
      inviteText.boy.title || `${boyName}❤️${girlName}の婚礼请柬`
    const dateStr = dayjs(date[type])
      .format(`YYYY年M月D日Ah点`)
      .replace(`AM`, `上午`)
      .replace(`PM`, `下午`)
    inviteText.boy.desc =
      inviteText.boy.desc ||
      `我们的幸福需要您的祝福与见证：感谢您一直以来的支持与关爱，诚意邀请您参加我和${girlName}的婚礼。${dateStr}，在${addr[type].name}，我们携手期待着您的到来！`
    inviteText.girl.title =
      inviteText.girl.title || `${girlName}❤️${boyName}の婚礼请柬`
    inviteText.girl.desc =
      inviteText.girl.desc ||
      `我们的幸福需要您的祝福与见证：感谢您一直以来的支持与关爱，诚意邀请您参加我和${boyName}的婚礼。${dateStr}，在${addr[type].name}，我们携手期待着您的到来！`
    data.inviteText = inviteText
  }
  console.log(`weddingId`, data)
  document.title = data.inviteText[type].title
  document
    .querySelector(`[name="description"]`)
    .setAttribute(`content`, data.inviteText[type].desc)
  // todo -- 实现分享图片自定义
  // document
  //   .querySelector(`[rel="icon"]`)
  //   .setAttribute(`href`, `https://hongqiye.com/favicon.ico`)
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
