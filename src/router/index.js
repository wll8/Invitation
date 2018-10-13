import Vue from 'vue'
import Router from 'vue-router'
import call from '@/pages/call.vue'
import t from '@/pages/t.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'call',
      component: call,
    },
    {
      path: '/t',
      name: 't',
      component: t,
    }
  ]
})
