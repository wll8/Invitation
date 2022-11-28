import tool from '@/util/index.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userId: ``, // 根据设备特征计算出的结果
    weddingId: ``, // 邀请函ID, 作为路径参数
    weddingConfig: {}, // 根据邀请函ID获取到的邀请函配置
  },
  getters: {
    // 当前 url 状态
    urlStatus(state) {
      const url = state.weddingConfig.url
      if (!url) {
        return {}
      }
      let type = ``
      let urlType = tool.getQueryString(`t`)
      if (urlType === url.girl) {
        type = `girl`
      } else if (urlType === url.boy) {
        type = `boy`
      } else {
        type =
          tool.storage.get(`userType`) ||
          (url.default === url.girl ? `girl` : `boy`)
      }
      tool.storage.set(`userType`, type)
      const tag = url ? url[type] : type
      return {
        type,
        tag,
      }
    },
  },
})

export default store
