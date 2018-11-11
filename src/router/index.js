import Vue from 'vue'
import Router from 'vue-router'
import t from '@/pages/t.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'call',
      // component: r => require.ensure([], () => r(require('../pages/call.vue')), 'call.vue'),
      component: require('../pages/call.vue').default,
    },
    {
      path: '/talk',
      name: 'talk',
      component: require('../pages/talk.vue').default,
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: require('../pages/desktop.vue').default,
    },
    {
      path: '/integrated',
      name: 'integrated',
      component: require('../pages/integrated.vue').default,
    },
    {
      path: '/photos',
      name: 'photos',
      component: require('../pages/photos.vue').default,
    },
    {
      path: '/photos',
      name: 'photos',
      component: require('../pages/photos.vue').default,
    },
    {
      path: '/t',
      name: 't',
      component: t
    }
  ]
})
