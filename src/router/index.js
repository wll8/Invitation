// import Vue from 'vue'
// import Router from 'vue-router'
// import t from '@/pages/t.vue'
import call from '@/pages/call.vue'
import talk from '@/pages/talk.vue'
import desktop from '@/pages/desktop.vue'
import invite from '@/pages/invite.vue'
import blessing from '@/pages/blessing.vue'
import dialing from '@/pages/dialing.vue'
import wechat from '@/pages/wechat.vue'
import photograph from '@/pages/photograph.vue'
// import integrated from '@/pages/integrated.vue'
import photos from '@/pages/photos.vue'
import map from '@/pages/map.vue'

// Vue.use(Router)

export default new window.VueRouter({
  routes: [
    {
      path: `/:weddingId/`,
      name: `call`,
      component: call,
      des: `来电`,
    },
    {
      path: `/:weddingId/talk`,
      name: `talk`,
      component: talk,
      des: `接听`,
    },
    {
      path: `/:weddingId/desktop`,
      name: `desktop`,
      component: desktop,
      // component: () => import('@/pages/desktop.vue'),
      des: `桌面`,
    },
    {
      path: `/:weddingId/invite`,
      name: `invite`,
      component: invite,
      des: `日期`,
    },
    {
      path: `/:weddingId/invite`,
      name: `invite`,
      component: invite,
      des: `邀请`,
    },
    {
      path: `/:weddingId/dialing`,
      name: `dialing`,
      component: dialing,
      des: `通话记录`,
    },
    {
      path: `/:weddingId/wechat`,
      name: `wechat`,
      component: wechat,
      des: `微信`,
    },
    {
      path: `/:weddingId/photograph`,
      name: `photograph`,
      component: photograph,
      des: `拍照`,
    },
    {
      path: `/:weddingId/integrated`,
      name: `integrated`,
      // component: integrated,
      component: () => import(`@/pages/integrated.vue`),
      des: `集成`,
    },
    {
      path: `/:weddingId/blessing`,
      name: `blessing`,
      component: blessing,
      des: `祝福`,
    },
    {
      path: `/:weddingId/photos`,
      name: `photos`,
      component: photos,
      des: `相册`,
    },
    {
      path: `/:weddingId/map`,
      name: `map`,
      component: map,
      des: `地图`,
    },
    {
      path: `/:weddingId/t`,
      name: `t`,
      // component: t,
      component: () => import(`@/pages/t.vue`),
      des: `调试`,
    },
  ],
})
