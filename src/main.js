// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import {
  Alert,
  Message,
  Icon,
  Button,
  Form,
  FormItem,
  Row,
  Col,
  Table,
  Input
} from 'iview'

Message.config({
  duration: 2.5
})
Vue.prototype.$http = axios
Vue.prototype.$msg = Message
Vue.config.productionTip = false
Vue.use(VueJsonp)
Vue.component('Alert', Alert)
Vue.component('Icon', Icon)
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Table', Table)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
