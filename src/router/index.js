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
//name必须与import的component的名字一致，否则将不能缓存
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // meta: { title: '主页', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' },
    }]
  },

  {
    path: '/stu',
    component: Layout,
    redirect: '/stu/general',
    name: 'Example',
    meta: { title: '学生信息', icon: 'table' },
    children: [
      {
        path: 'general',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '学生概况' }
      },
      {
        path: 'grades',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '成绩信息'}
      }
    ]
  },



  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  {
    path:'/alert',
    component: Layout,
    // meta: { roles: ['admin','editor'] },
    redirect: '/alert/bayes',
    meta:{title:'学业预警',icon:'eye-open'},
    children:[{
      path:'bayes',
      component:()=>import('@/views/general/dataShow'),
      name:'贝叶斯预警',
      meta:{title:"贝叶斯预警"}
    },
    {path:'manual',
      component:()=>import('@/views/general/dataShow'),
      name:'手动筛选预警',
      meta:{title:"手动筛选预警"}}

    ]
  },
  {
    path:'/charts',
    component: Layout,
    // meta: { roles: ['admin','editor'] },
    redirect: '/charts/general',
    children:[{
      path:'general',
      component:()=>import('@/views/general/dataShow'),
      name:'图表分析',
      meta:{title:"图表分析",icon:'el-icon-s-marketing'}

    }

    ]
  },

  {
    path: '/edu',
    component: Layout,
    redirect: '/edu/homework',
    meta: { title: '教学辅助', icon: 'form' },
    children: [
      {
        path: 'homework',
        name: '作业管理',
        component: () => import('@/views/form/index'),
        meta: { title: '作业管理' }
      },
      {
        path: 'absence',
        name: '出勤管理',
        component: () => import('@/views/form/index'),
        meta: { title: '出勤管理' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/alert',
    meta: { title: '消息管理', icon: 'el-icon-message' },
    children: [
      {
        path: 'alert',
        name: '预警消息',
        component: () => import('@/views/form/index'),
        meta: { title: '预警消息' }
      },
      {
        path: 'notice',
        name: '通知消息',
        component: () => import('@/views/form/index'),
        meta: { title: '通知消息' }
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
