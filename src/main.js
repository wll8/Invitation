// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/common.less'
import tool from './tool/index.js'
Vue.prototype.g = require('./components/g.vue').default
Vue.prototype.tool = tool
Vue.prototype.userType = tool.getQueryString('t') || 'boy'

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
