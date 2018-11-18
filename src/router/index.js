import Vue from 'vue'
import Router from 'vue-router'
import t from '@/pages/t.vue'
import call from '@/pages/call.vue'
import talk from '@/pages/talk.vue'
import desktop from '@/pages/desktop.vue'
import integrated from '@/pages/integrated.vue'
import photos from '@/pages/photos.vue'
import map from '@/pages/map.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'call',
      component: call,
    },
    {
      path: '/talk',
      name: 'talk',
      component: talk,
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: desktop,
    },
    {
      path: '/integrated',
      name: 'integrated',
      component: integrated,
    },
    {
      path: '/photos',
      name: 'photos',
      component: photos,
    },
    {
      path: '/map',
      name: 'map',
      component: map,
    },
    {
      path: '/t',
      name: 't',
      component: t
    }
  ]
})
