
import Home from '@/views/Home.vue'
export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        component: resolve => require(['@/views/Dashboard.vue'], resolve),
        meta: { title: '系统首页' }
      },
      {
        path: '/table',
        component: resolve => require(['@/views/BaseTable.vue'], resolve),
        meta: { title: '基础表格' }
      },
      {
        path: '/test',
        component: resolve => require(['@/views/Test.vue'], resolve),
        meta: { title: '测试' }
      },
      {
        path: '/record',
        component: resolve => require(['@/views/Record.vue'], resolve),
        meta: { title: '记录' }
      },
      // {
      //   path: '/sys',

      //   meta: { title: '系统管理' },
      //   children: [
      {
        path: '/user',
        component: resolve => require(['@/views/system/user.vue'], resolve),
        meta: { title: '用户管理' }
      },
      {
        path: '/power',
        component: resolve => require(['@/views/system/user.vue'], resolve),
        meta: { title: '权限管理' }
      },
      //   ]
      // },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]
