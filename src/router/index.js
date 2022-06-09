import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/HomeView";
import AdminView from "@/views/AdminView";
import LoginView from "@/views/LoginView";
import NavHome from "@/components/NavHome";
import UserView from "@/views/UserView";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: NavHome,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/admin',
        name: 'admin',
        component: AdminView
      },
      {
        path: '/user',
        name: 'user',
        component: UserView
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const adminNext = "admin"
  const userNext = "user"
  let isLogin = false
  let authority = 0

  let token = localStorage.getItem("token")
  token = JSON.parse(token)
  if (token != null) {
    isLogin = true
    authority = token.authority

  }

  if (adminNext === to.name) {
    if (isLogin === false || authority !== 1) {
      alert("没有权限，请先登录！")
      router.push('/login')
      location.reload()
    }
    if (to.name === 'login') {
      if (isLogin === true) {
        router.push('/admin')
        location.reload()
      }
    }
  } else if (userNext === to.name) {
    if (isLogin === false || authority !== 2 && authority !== 1) {
      alert("没有权限，请先登录！")
      router.push('/login')
      location.reload()
    }
    if (to.name === 'login') {
      if (isLogin === true) {
        router.push('/user')
        location.reload()
      }
    }
  }
  if (to.name === 'login') {
    if (isLogin === true) {
      router.push('/')
      location.reload()
    }
  }
  next();
})

export default router
