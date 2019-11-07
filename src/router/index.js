import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import first from '@/views/home'
import wlCome from '@/views/welcome'
import noFind from '@/views/404'
import local from '@/utils/local'
import artiCle from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import comMent from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    // 首页
    path: '/',
    component: first,
    children: [{ // 欢迎页面
      path: '/',
      component: wlCome
    }, {
      path: '/article',
      component: artiCle
    },
    {
      path: '/image',
      component: Image
    },
    {
      path: '/publish',
      component: Publish
    },
    {
      path: '/comment',
      component: comMent
    },
    {
      path: '/setting',
      component: Setting
    },
    {
      path: '/fans',
      component: Fans
    }
    ]
  }, {
    // 登录页面
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: noFind
  }
  ]
})

// 添加路由的 导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // 每次跳转路由前触发
  // to 表示跳转到哪里
  //  from 从哪里跳转过来  路由对象
  // next 下一步方法  next()放行  next(‘/login’) 拦截
  const user = local.getUser()
  // 判断
  // 如果能找到user并且user.token有值  就下一步
  if (user && user.token) {
    next()
  } else {
    // 如果找不到，没有值，再进行判断，判断当前页面是否在登录页，若在登录页面，表示信息还未进行存储，放行
    if (to.path === '/login') {
      next()
    } else {
      // 若没有信息 则跳转到登录页面
      next('/login')
    }
  }
})

export default router
