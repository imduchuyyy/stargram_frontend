export const routes = [
  {
    label: 'home',
    exact: true,
    path: '/',
    component: 'home',
  },
  {
    label: 'profile',
    path: '/profile',
    exact: true,
    component: 'profile'
  },
  {
    label: 'message',
    path: '/message',
    exact: true,
    component: 'message'
  },
  {
    label: 'notification',
    path: '/notification',
    exact: true,
    component: 'notification'
  },
  {
    label: 'friend',
    path: '/friend',
    exact: true,
    component: 'friend'
  },
  {
    label: 'setting',
    path: '/setting',
    exact: true,
    component: 'setting'
  },
  {
    label: 'login',
    path: '/',
    exact: true,
    component: 'login'
  },
  {
    label: 'register',
    path: '/register',
    exact: true,
    component: 'register'
  },
]