import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Permission from './views/permission/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: () =>
      import ('./views/index/index.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () =>
      import ('./views/login/index.vue')
  }, {
    path: '/register',
    name: 'register',
    component: () =>
      import ('./views/register/index.vue')
  }, {
    path: '/city',
    name: 'city',
    component: () =>
      import ('./views/city/index.vue')
  }, {
    path: '/content',
    name: 'content',
    component: () =>
      import ('./views/content/index.vue')
  }, {
    path: '/content/recover',
    name: 'recover',
    component: () =>
      import ('./views/content/recover.vue')
  }, {
    path: '/content/workload',
    name: 'workload',
    component: () =>
      import ('./views/content/workload.vue')
  }, {
    path: '/content/read',
    name: 'read',
    component: () =>
      import ('./views/content/read.vue')
  }, {
    path: '/content/feed/:id',
    name: 'feed',
    component: () =>
      import ('./views/content/feed/index.vue')
  }, {
    path: '/column',
    name: 'column',
    component: () =>
      import ('./views/column/index.vue')
  }, {
    path: '/finance/manage/update',
    name: 'manage_update',
    component: () =>
      import ('./views/finance/manage/update.vue')
  }, {
    path: '/finance/manage/review',
    name: 'manage_review',
    component: () =>
      import ('./views/finance/manage/review.vue')
  }, {
    path: '/finance/records',
    name: 'records',
    component: () =>
      import ('./views/finance/records.vue'),
    children: [{
      path: '/finance/records/column',
      name: 'records_column',
      component: () =>
        import ('./views/finance/records/column.vue')
    }, {
      path: '/finance/records/apply',
      name: 'records_apply',
      component: () =>
        import ('./views/finance/records/apply.vue')
    }, {
      path: '/finance/records/user',
      name: 'records_user',
      component: () =>
        import ('./views/finance/records/user.vue')
    }, ]
  }, {
    path: '/finance/withdraw',
    name: 'withdraw',
    component: () =>
      import ('./views/finance/withdraw.vue'),
    children: [{
      path: '/finance/withdraw/audited',
      name: 'withdraw_audited',
      component: () =>
        import ('./views/finance/withdraw/audited.vue')
    }, {
      path: '/finance/withdraw/applying',
      name: 'withdraw_applying',
      component: () =>
        import ('./views/finance/withdraw/applying.vue')
    }]
  }, {
    path: '/finance/serial',
    name: 'serial',
    component: () =>
      import ('./views/finance/serial.vue')
  }, {
    path: '/log',
    name: 'log',
    component: () =>
      import ('./views/log/index.vue')
  }, {
    path: '/activity/management',
    name: 'activity_management',
    component: () =>
      import ('./views/activity/management/index.vue')
  }, {
    path: '/activity/data',
    name: 'activity_data',
    component: () =>
      import ('./views/activity/data/index.vue')
  }, {
    path: '/activity/data/taijibing',
    name: 'activity_data_taijibing',
    component: () =>
      import ('./views/activity/data/taijibing/index.vue')
  }, {
    path: '/notice',
    name: 'notice',
    component: () =>
      import ('./views/notice/index.vue')
  }, {
    path: '/setting',
    name: 'setting',
    component: () =>
      import ('./views/setting/index.vue')
  }, {
    path: '/statistic',
    name: 'statistic',
    component: () =>
      import ('./views/statistic/index.vue')
  }, {
    path: '/general',
    name: 'general',
    component: () =>
      import ('./views/general/index.vue')
  }, {
    path: '/permission',
    name: 'permission',
    component: Permission
  }]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  store.state.isLoginPage = to.path === '/login' || to.path === '/register';
  if (!Cookies.get('token')) {
    if (to.path != '/login') {
      next({
        path: '/login'
      })
    }
  }
  switch (to.name) {
    case 'permission':
      store.state.activeIndex = '/permission';
      break;
    case 'city':
      store.state.activeIndex = '/city';
      break;
    case 'content':
      store.state.activeIndex = '/content';
      break;
    case 'workload':
      store.state.activeIndex = '/content/workload';
      break;
    case 'column':
      store.state.activeIndex = '/column';
      break;
    case 'finance':
      store.state.activeIndex = '/finance';
      break;
    case 'manage_update':
      store.state.activeIndex = '财务申请';
      break;
    case "manage_review":
      store.state.activeIndex = '财务审核';
      break;
    case "withdraw_applying":
      store.state.activeIndex = '提现审核';
      break;
    case "withdraw_audited":
      store.state.activeIndex = '提现审核';
      break;
    case "records_column":
      store.state.activeIndex = '财务记录';
      break;
    case "records_user":
      store.state.activeIndex = '财务记录';
      break;
    case "records_apply":
      store.state.activeIndex = '财务记录';
      break;
    case "log":
      store.state.activeIndex = '/log';
      break;
    case "activity_data":
      store.state.activeIndex = '活动数据';
      break;
    case "activity_management":
      store.state.activeIndex = '活动管理';
      break;
    case "setting":
      store.state.activeIndex = '/setting';
      break;
    case "statistic":
      store.state.activeIndex = '/statistic';
      break;
    case "notice":
      store.state.activeIndex = '通知管理';
      break;
    case 'feed':
      store.state.activeIndex = '/content';
      break;
    case 'serial':
      store.state.activeIndex = '提现审核';
      break;
    default:
      store.state.activeIndex = '/permission'
  }
  next()
})

export default router