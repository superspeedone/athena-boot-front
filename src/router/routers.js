import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

// 不作为Main组件的子页面展示的页面单独写，如下
// 登陆页面
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
}

// 没有权限页面
export const page401 = {
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/401.vue')
}

// 系统错误页面
export const page500 = {
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/500.vue')
}

// 找不到页面
export const page404 = {
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/404.vue')
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true
      },
      component: () => import('@/view/home')
    },
    {
      path: '/change_pass',
      name: 'change_pass',
      meta: {
        hideInMenu: true,
        title: '修改密码',
        notCache: true
      },
      component: () => import('@/view/change-pass/change-pass.vue')
    }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/sys',
    name: 'sys',
    meta: {
      icon: 'ios-settings',
      title: '系统管理',
      access: ['sys']
    },
    component: Main,
    children: [
      {
        path: 'user-manage',
        name: 'user-manage',
        meta: {
          icon: 'md-person',
          title: '用户管理',
          access: ['user-manage']
        },
        component: () => import('@/view/sys/user-manage/userManage.vue')
      },
      {
        path: 'role-manage',
        name: 'role-manage',
        meta: {
          icon: 'md-contacts',
          title: '角色管理',
          access: ['role-manage']
        },
        component: () => import('@/view/sys/role-manage/roleManage.vue')
      },
      {
        path: 'menu-manage',
        name: 'menu-manage',
        meta: {
          icon: 'md-menu',
          title: '菜单权限管理',
          access: ['menu-manage']
        },
        component: () => import('@/view/sys/menu-manage/menuManage.vue')
      },
      {
        path: 'department-manage',
        name: 'department-manage',
        meta: {
          icon: 'md-git-branch',
          title: '部门管理',
          access: ['department-manage']
        },
        component: () => import('@/view/sys/department-manage/departmentManage.vue')
      }
    ]
  },
  {
    path: '/monitor',
    name: 'monitor',
    meta: {
      icon: 'ios-settings',
      title: '系统监控',
      access: ['monitor']
    },
    component: Main,
    children: [
      {
        path: 'quartz-job',
        name: 'quartz-job',
        meta: {
          icon: 'md-time',
          title: '定时任务',
          access: ['quartz-job']
        },
        component: () => import('@/view/sys/quartz-manage/quartzManage.vue')
      },
      {
        path: 'log-manage',
        name: 'log-manage',
        meta: {
          icon: 'md-time',
          title: '日志管理',
          access: ['log-manage']
        },
        component: () => import('@/view/sys/log-manage/logManage.vue')
      },
      {
        path: 'druid',
        name: 'druid',
        meta: {
          icon: 'md-analytics',
          title: 'SQL监控',
          access: ['druid'],
          url: 'http://localhost:8888/druid/login.html' // 传递给页面使用frame打开,实现页面重用
        },
        component: () => import('@/view/sys/monitor/monitor.vue')
      },
      {
        path: 'swagger',
        name: 'swagger',
        meta: {
          icon: 'md-document',
          title: '接口文档',
          access: ['swagger'],
          url: 'http://127.0.0.1:8888/swagger-ui.html' // 传递给页面使用
        },
        component: () => import('@/view/sys/monitor/monitor.vue')
      },
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件使用例子'
    },
    component: Main,
    children: [
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '动态路由'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: '动态路由',
          notCache: true
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: '带参路由',
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  }
];

// 挂载菜单组件, 所有上面定义的路由都要写在下面的routers里
export default [
  loginRouter,
  otherRouter,
  ...appRouter,
  page401,
  page500,
  page404
]
