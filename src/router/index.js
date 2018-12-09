import Vue from 'vue'
import Router from 'vue-router'
import t from '@/pages/t.vue'
import call from '@/pages/call.vue'
import talk from '@/pages/talk.vue'
import desktop from '@/pages/desktop.vue'
import date from '@/pages/date.vue'
import blessing from '@/pages/blessing.vue'
import dialing from '@/pages/dialing.vue'
import wechat from '@/pages/wechat.vue'
import photograph from '@/pages/photograph.vue'
import integrated from '@/pages/integrated.vue'
import invite from '@/pages/invite.vue'
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
      path: '/date',
      name: 'date',
      component: date,
    },
    {
      path: '/invite',
      name: 'invite',
      component: invite,
    },
    {
      path: '/dialing',
      name: 'dialing',
      component: dialing,
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: wechat,
    },
    {
      path: '/photograph',
      name: 'photograph',
      component: photograph,
    },
    {
      path: '/integrated',
      name: 'integrated',
      component: integrated,
    },
    {
      path: '/blessing',
      name: 'blessing',
      component: blessing,
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
