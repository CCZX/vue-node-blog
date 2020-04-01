import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  // model: history,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: resolve => require(['@/views/About'], resolve)
    },
    {
      path: '/works',
      name: 'Works',
      component: resolve => require(['@/views/Works'], resolve)
    },
    {
      path: '/archives',
      name: 'Archives',
      component: resolve => require(['@/views/Archives'], resolve)
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: resolve => require(['@/views/Article'], resolve)
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: resolve => require(['@/views/Page404'], resolve)
    },
    {
      path: '/guestbook',
      name: 'Guestbook',
      component: resolve => require(['@/views/Guestbook'], resolve)
    }
  ]
})
