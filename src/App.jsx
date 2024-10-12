
import { createRouter, createWebHistory } from 'vue-router'
import supabase from '@/supabase.js'
import './style.css'

const app = createApp({
  setup () {
    return () => {
      return <RouterView/>
    }
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'Auth',
    path: '/auth',
    component: () => import('./views/Auth.jsx')
  }, {
    name: 'Dashboard',
    path: '/',
    component: () => import('./views/Dashboard.jsx'),
    redirect: {
      name: 'Home'
    },
    meta: {
      prefetchChildren: true
    },
    children: [{
      name: 'Home',
      path: '/home',
      component: () => import('./views/Home.jsx')
    }, {
      name: 'Profile',
      path: '/profile',
      component: () => import('./views/Profile.jsx')
    }, {
      name: 'Share',
      path: '/share',
      component: () => import('./views/Share.jsx')
    }, {
      name: 'User',
      path: '/:user',
      component: () => import('./views/User.jsx')
    }]
  }, {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('./views/NotFound.jsx')
  }]
})

router.beforeEach(async to => {
  const { data, error } = await supabase.auth.getSession()

  if (to.name !== 'Auth') {
    console.log(data, error)

    if (data.session == null) {
      return { name: 'Auth' }
    }
  }
})

router.beforeResolve(async to => {
  const src = to.redirectedFrom ?? to

  if (src.meta.prefetchChildren) {
    const current = src.matched.find(route => route.name === src.name)
    current.children.map(async route => await route.component())
  }
})

app.use(createPinia())
app.use(router)
app.mount('#app')
