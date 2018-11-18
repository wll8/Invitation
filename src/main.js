// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/common.less'
import tool from './tool/index.js'
import cfg from './cfg.js'
import bgimg from '@/components/bgimg.vue'

Vue.prototype.g = require('./components/g.vue').default
Vue.prototype.tool = tool
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
