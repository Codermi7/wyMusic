import Vue from 'vue'
import VueRouter from 'vue-router'
//安装插件 npm install vue-router --save
Vue.use(VueRouter)
//创建对象
const routes = [
  {
    path:'',
    //redirect重定向 默认路径
    redirect:'/home'
  },
  {
    path: '/home',
    component: ()=>import('../views/Home'),
    meta: {
      title:'首页'
    },
  },
  {
    path:'/play',
    component:()=>import('../views/PlayMusic')
  }
]
const router = new VueRouter({
  routes,
  mode:'history'

})

export default router
