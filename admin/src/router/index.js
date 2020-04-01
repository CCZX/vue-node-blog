import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/article',
      name: 'Article',
      meta: {
        requiresAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/views/Article'], resolve)
    },
    {
      path: '/add',
      name: 'AddArticle',
      meta: {
        requiresAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/views/AddArticle'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/Login'], resolve)
    },
    {
      path: '/tags',
      name: 'Tag',
      meta: {
        requiresAuth: true
      },
      component: resolve => require(['@/views/Tags'], resolve)
    },
    {
      path: '/setting',
      name: 'Set',
      meta: {
        requiresAuth: true
      },
      component: resolve => require(['@/views/Setting'], resolve)
    },
    {
      path: '/upimg',
      name: 'Upimg',
      meta: {
        requiresAuth: true
      },
      component: resolve => require(['@/views/UpImg'], resolve)
    },
    {
      path: '/modifyarticle/:id',
      name: 'ModifyArticle',
      meta: {
        requiresAuth: true,
        keepAlive: false
      },
      component: resolve => require(['@/views/ModifyArticle'], resolve)
    },
    {
      path: '/message',
      name: 'Message',
      meta: {
        requiresAuth: true,
        keepAlive: false
      },
      component: resolve => require(['@/views/Heros'], resolve)
    }
  ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  // let userName = store.state.userName;
  let userName = sessionStorage.getItem('userName')
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(userName){
      next();
    }else{
      alert('请先登录再进行此操作!')
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
      } 
  }else{
    next();
  }
});

export default router