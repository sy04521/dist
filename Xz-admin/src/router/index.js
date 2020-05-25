
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: routes
})



router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
})

// const HAS_LOGINED = false

// router.beforeEach((to, from, next) => {
// if (to.name !== 'login') {
//     if (HAS_LOGINED) {
//         next()
//     } else {
//         next({ name: 'login' })
//     }
// } else {
//     if (HAS_LOGINED) {
//         next({
//             name: 'home'
//         })
//     } else {
//         next()
//     }
// }

// const token = getToken()

// if (token) {
//     store.dispatch('authorization', token).then(res => {
//         if (to.name === 'login') {
//             next({ name: 'home' })
//         } else {
//             next()
//         }
//     }).catch(() => {
//         setToken('')
//         next({ name: 'login' })
//     })
// } else {
//     if (to.name === 'login') {
//         next()
//     } else {
//         next({ name: 'login' })
//     }
// }
// })
router.afterEach((to, from) => {

})

export default router


