import Vue from 'vue'
import VueRouter from 'vue-router'
import call from '@/pages/call.vue'

/**
 * @see https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject)
    return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e) => {})
}
Vue.use(VueRouter)

export default new VueRouter({
  mode: `hash`,
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/`,
      redirect: `/call`,
    },
    {
      path: `/call`,
      name: `call`,
      component: call,
      des: `来电`,
    },
    {
      path: `/talk`,
      name: `talk`,
      // component: talk,
      component: () =>
        import(
          /* webpackChunkName: "talk" */ /* webpackPrefetch: true */ `@/pages/talk.vue`
        ),
      des: `接听`,
    },
    {
      path: `/desktop`,
      name: `desktop`,
      // component: desktop,
      component: () =>
        import(
          /* webpackChunkName: "desktop" */ /* webpackPrefetch: true */ `@/pages/desktop.vue`
        ),
      des: `桌面`,
    },
    {
      path: `/invite`,
      name: `invite`,
      // component: invite,
      component: () =>
        import(
          /* webpackChunkName: "invite" */ /* webpackPrefetch: true */ `@/pages/invite.vue`
        ),
      des: `邀请`,
    },
    {
      path: `/dialing`,
      name: `dialing`,
      // component: dialing,
      component: () =>
        import(
          /* webpackChunkName: "dialing" */ /* webpackPrefetch: true */ `@/pages/dialing.vue`
        ),
      des: `通话记录`,
    },
    {
      path: `/wechat`,
      name: `wechat`,
      // component: wechat,
      component: () =>
        import(
          /* webpackChunkName: "wechat" */ /* webpackPrefetch: true */ `@/pages/wechat.vue`
        ),
      des: `微信`,
    },
    {
      path: `/photograph`,
      name: `photograph`,
      // component: photograph,
      component: () =>
        import(
          /* webpackChunkName: "photograph" */ /* webpackPrefetch: true */ `@/pages/photograph.vue`
        ),
      des: `拍照`,
    },
    {
      path: `/integrated`,
      name: `integrated`,
      // component: integrated,
      component: () =>
        import(
          /* webpackChunkName: "integrated" */ /* webpackPrefetch: true */ `@/pages/integrated.vue`
        ),
      des: `集成`,
    },
    {
      path: `/blessing`,
      name: `blessing`,
      component: () =>
        import(
          /* webpackChunkName: "blessing" */ /* webpackPrefetch: true */ `@/pages/blessing.vue`
        ),
      des: `祝福`,
    },
    {
      path: `/photos`,
      name: `photos`,
      // component: photos,
      component: () =>
        import(
          /* webpackChunkName: "photos" */ /* webpackPrefetch: true */ `@/pages/photos.vue`
        ),
      des: `相册`,
    },
    {
      path: `/map`,
      name: `map`,
      // component: map,
      component: () =>
        import(
          /* webpackChunkName: "map" */ /* webpackPrefetch: true */ `@/pages/map.vue`
        ),
      des: `地图`,
    },
    {
      path: `/t`,
      name: `t`,
      // component: t,
      component: () => import(`@/pages/t.vue`),
      des: `调试`,
    },
  ],
})
