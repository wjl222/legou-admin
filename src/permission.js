import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 加载的进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import { getToken, getUserInfo } from '@/utils/auth' // 获取token值方法
import getPageTitle from '@/utils/get-page-title'  // 

NProgress.configure({ showSpinner: false }) // 进度条插件配置

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 设置页面title
  // 通过路由携带meta信息更改
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登陆
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登陆了，但是用户跳转的页面是登陆页面，我们就重定向到home页面
      next({ path: '/' })
      // 进度条关闭
      NProgress.done()
    } else {
          next()
          NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
