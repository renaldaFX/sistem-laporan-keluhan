import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ManageView from '../views/ManageView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: "/",
    name: 'home',
    component: HomeView
  },
  {
    path: "/register",
    name: 'register',
    component: RegisterView
  },
  {
    path: "/login",
    name: 'login',
    component: LoginView
  },
  {
    path: "/manage",
    name: 'manage',
    component: ManageView
  },
  {
    path: "/admin",
    name: 'admin',
    component: DashboardView
  },
  {
    path: "/:catchAll(.*)*",
    redirect: {name: 'home'}
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('Global Guard')
  console.log(to, from)
  next()
})

export default router
