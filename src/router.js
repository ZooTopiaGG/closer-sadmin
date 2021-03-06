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
    path: '/content/cover',
    name: 'cover',
    component: () =>
      import ('./views/content/cover.vue')
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
      import ('./views/finance/manage/update.vue'),
  }, {
    path: '/finance/manage/review',
    name: 'manage_review',
    component: () =>
      import ('./views/finance/manage/review.vue'),
  }, {
    path: '/finance/records',
    name: 'records',
    component: () =>
      import ('./views/finance/records.vue'),
    children: [{
      path: '/finance/records/column',
      name: 'records_column',
      component: () =>
        import ('./views/finance/records/column.vue'),
    }, {
      path: '/finance/records/apply',
      name: 'records_apply',
      component: () =>
        import ('./views/finance/records/apply.vue'),
    }, {
      path: '/finance/records/user',
      name: 'records_user',
      component: () =>
        import ('./views/finance/records/user.vue'),
    }, ]
  }, {
    path: '/finance/withdraw',
    name: 'withdraw',
    component: () =>
      import ('./views/finance/withdraw/index.vue'),
    children: [{
      path: '/finance/withdraw/audited',
      name: 'withdraw_audited',
      component: () =>
        import ('./views/finance/withdraw/audited.vue'),
    }, {
      path: '/finance/withdraw/applying',
      name: 'withdraw_applying',
      component: () =>
        import ('./views/finance/withdraw/applying.vue'),
    }]
  }, {
    path: '/finance/withdraw/details',
    name: 'withdraw_details',
    component: () =>
      import ('./views/finance/withdraw/details.vue')
  }, {
    path: '/finance/serial',
    name: 'serial',
    component: () =>
      import ('./views/finance/serial.vue')
  }, {
    path: '/finance/closer',
    name: 'finance_closer',
    component: () =>
      import ('./views/finance/closer/index.vue')
  }, {
    path: '/closer/classify',
    name: 'closer_classify',
    component: () =>
      import ('./views/closer/classify.vue')
  }, {
    path: '/closer/menu',
    name: 'closer_menu',
    component: () =>
      import ('./views/closer/menu.vue'),
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
      import ('./views/activity/data/taijibing/index.vue'),
  }, {
    path: '/activity/data/question/config',
    name: 'activity_data_question_config',
    component: () =>
      import ('./views/activity/data/question/config.vue'),
  }, {
    path: '/activity/data/question',
    name: 'activity_data_question',
    component: () =>
      import ('./views/activity/data/question/index.vue'),
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
    path: '/push',
    name: 'push',
    component: () =>
      import ('./views/push/index.vue')
  }, {
    path: '/statistic',
    name: 'statistic',
    component: () =>
      import ('./views/statistic/index.vue')
  }, {
    path: '/config',
    name: 'config',
    component: () =>
      import ('./views/config/index.vue')
  }, {
    path: '/config/details',
    name: 'config_details',
    component: () =>
      import ('./views/config/details.vue'),
  }, {
    path: '/general',
    name: 'general',
    component: () =>
      import ('./views/general/index.vue')
  }, {
    path: '/product/group_message_remind',
    name: 'group_message_remind',
    component: () =>
      import ('./views/product/group_message_remind.vue')
  }, {
    path: '/permission',
    name: 'permission',
    component: Permission
  }]
})

router.beforeEach((to, from, next) => {
  console.log('now===', to.path)
  store.state.isLoginPage = to.path === '/login' || to.path === '/register';
  store.state.loadingMain = to.path != '/content';
  try {
    if (!(Cookies.get('_tcloser') && localStorage.getItem('_ucloser'))) {
      if (to.path != '/login') {
        next({
          path: '/login'
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
  switch (to.name) {
    case 'permission':
      store.state.activeIndex = '权限设置';
      break;
    case 'city':
      store.state.activeIndex = '城市管理';
      break;
    case 'content':
      store.state.activeIndex = '审核';
      break;
    case 'recover':
      store.state.activeIndex = '审核';
      break;
    case 'feed':
      store.state.activeIndex = '审核';
      break;
    case 'workload':
      store.state.activeIndex = '工作量查看';
      break;
    case 'read':
      store.state.activeIndex = '审核';
      break;
    case 'cover':
      store.state.activeIndex = '封面文章';
      break;
    case 'column':
      store.state.activeIndex = '栏目管理';
      break;
    case 'finance':
      store.state.activeIndex = '财务管理';
      break;
    case 'manage_update':
      store.state.activeIndex = '财务申请';
      break;
    case "manage_review":
      store.state.activeIndex = '财务审核';
      break;
    case "withdraw":
      store.state.activeIndex = '提现审核';
      break;
    case "withdraw_applying":
      store.state.activeIndex = '提现审核';
      break;
    case "withdraw_audited":
      store.state.activeIndex = '提现审核';
      break;
    case "withdraw_details":
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
    case "config":
      store.state.activeIndex = '配置管理';
      break;
    case "config_details":
      store.state.activeIndex = '配置管理';
      break;
    case "closer_classify":
      store.state.activeIndex = '贴近号分类';
      break;
    case "closer_menu":
      store.state.activeIndex = '菜单管理';
      break;
    case "log":
      store.state.activeIndex = '操作日志';
      break;
    case "activity_data":
      store.state.activeIndex = '活动数据';
      break;
    case "activity_management":
      store.state.activeIndex = '活动管理';
      break;
    case "activity_data_taijibing":
      store.state.activeIndex = '活动数据';
      break;
    case "activity_data_question":
      store.state.activeIndex = '活动数据';
      break;
    case "activity_data_question_config":
      store.state.activeIndex = '活动数据';
      break;
    case "setting":
      store.state.activeIndex = '活动落地页';
      break;
    case "statistic":
      store.state.activeIndex = '数据统计';
      break;
    case "notice":
      store.state.activeIndex = '通知管理';
      break;
    case 'serial':
      store.state.activeIndex = '提现审核';
      break;
    case 'group_message_remind':
      store.state.activeIndex = '群消息智能提示设置';
      break;
    case 'push':
      store.state.activeIndex = '推送管理';
      break;
    default:
      store.state.activeIndex = '/'
  }
  next()
})

export default router