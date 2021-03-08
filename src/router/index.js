import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/article'
  },

{
    path: '/article',
    // redirect: 'noRedirect',
    component: Layout,
    redirect: '/article/articleList',
    name: 'article',
    meta: { title: '内容管理', icon: 'el-icon-folder' },
    children: [
      {
        path: 'articleList',
        name: 'MrticleList',
        // 懒加载
        component: () => import('@/views/article/articleList/index'),
        // 路由元信息
        meta: { title: '文章列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'materialList',
        name: 'MaterialList',
        component: () => import('@/views/article/materialList/index'),
        meta: { title: '素材列表', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'editArticle/:id',
        name: 'EditArticle',
        component: () => import('@/views/article/editArticle/index'),
        meta: { title: '编辑文章'},
        hidden: true
      },
      {
        path: 'addArticle',
        name: 'AddArticle',
        component: () => import('@/views/article/addArticle/index'),
        meta: { title: '新增文章'},
        hidden: true
      },

    ]
  },
{
    path: '/marketManage',
    // redirect: 'noRedirect',
    component: Layout,
    redirect: '/marketManage/limitAct',
    name: 'marketManage',
    meta: { title: '营销管理', icon: 'el-icon-folder' },
    children: [
      {
        path: 'limitAct',
        name: 'LimitAct',
        // 懒加载
        component: () => import('@/views/marketManage/limitAct/index'),
        // 路由元信息
        meta: { title: '限时活动', icon: 'el-icon-tickets' }
      },
      {
        path: 'advList',
        name: 'AdvList',
        component: () => import('@/views/marketManage/advList/index'),
        meta: { title: '广告列表', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
