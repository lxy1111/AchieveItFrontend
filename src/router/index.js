import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/components/login.vue'),
      meta: { title: '登录页' }
    },
    {
      path: '/home',
      component: () => import('@/components/homepage/homepage.vue'),
      meta: {
        title: '母版页'
      },
      children: [
        {
          path: '/index',
          name: '系统首页',
          component: () => import('@/components/test/HelloWorld'),
          meta: {
            title: '系统首页',
            hideclose: true,
            role: ['管理员岗', '白银岗','黄金岗']
          }
        },
        {
          path: '/tablepage',
          name: 'tablepage',
          component: () => import('@/components/tablepage/tablepage'),
          meta: {
            title: '项目管理',
            role: ['项目上级', '项目经理','黄金岗']
          }
        },
        {
          path: '/projectDetail',
          name: 'projectDetail',
          component: () => import('@/components/tablepage/projectDetail'),
          meta: {
            title: '查看项目详情',
            role: ['项目上级', '项目经理','黄金岗']
          }
        },
        {
          path: '/riskIdentification',
          name: 'riskIdentification',
          component: () => import('@/components/tablepage/riskIdentification'),
          meta: {
            title: '风险管理',
            role: ['项目上级', '项目经理','黄金岗']
          }
        },
        {
          path: '/deviceManagement',
          name: 'deviceManagement',
          component: () => import('@/components/tablepage/deviceManagement'),
          meta: {
            title: '设备管理',
            role: ['项目上级', '项目经理','黄金岗']
          }
        },
        {
          path: '/riskTracking',
          name: 'riskTracking',
          component: () => import('@/components/tablepage/riskTracking'),
          meta: {
            title: '风险跟踪',
            role: ['项目上级', '项目经理','黄金岗']
          }
        }
      ]
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/components/homepage/404.vue'),
      meta: { title: '路由不存在' }
    },
    {
      name: '403',
      path: '/403',
      component: () => import('@/components/homepage/403.vue'),
      meta: { title: '资源不可访问' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
})
/**
 * 全局路由守卫
 */
const rightPathList = ['/login', '/404', '/403'];//直接可以进入的页面
router.beforeEach((to, from, next) => {
  // debugger
  console.log('跳转到:', to.fullPath);
  var token = sessionStorage.getItem('token');
  if (!token && to.path != '/login') {//登陆认证校验,没登录则跳转/login
    next({ path: '/login' })
  }
  else {//权限认证
    // if (rightPathList.includes(to.path)) {
    //   next();
    // }
    // else if (hasPermit(to)) {
    //   next();
    // }
    // else {
    //   next('403');
    // }
    next()
  }
})
/**
 * 请求拦截器,添加请求头token
 */
axios.interceptors.request.use(
  config => {
    console.log('>>>请求url:',config.url);
    var headers = config.headers;
    if (sessionStorage.getItem("token")) {
      headers.token = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    console.log('>>>请求异常:',error.message);
    return Promise.reject(error);
  });
//接口请求超时设置
axios.defaults.timeout=5000;//毫秒
/**
 * 应答拦截器,添加请求头token
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('<<<请求成功');
  return response;
}, error=> {
  // Do something with response error
  console.log('<<<异常信息:',error.message);
  return Promise.reject(error);
});


//获取当前路由是否有权限访问
// function hasPermit(to) {
//   var hasPermit = false;
//   if (to.meta && to.meta.role) {
//     var ruleList = getRuleList();
//     hasPermit = ruleList.some(rule => {
//       return to.meta.role.includes(rule);
//     });
//   }
//   return hasPermit;
//
// }
// //获取登陆的角色集合
// function getRuleList() {
//   var ruleList = []; //角色数组
//   var strRule = sessionStorage.getItem("position");
//   if (strRule.indexOf("|") != -1) {
//     ruleList = strRule.split("|");
//   } else {
//     ruleList.push(strRule);
//   }
//   return ruleList;
// }

export default router
