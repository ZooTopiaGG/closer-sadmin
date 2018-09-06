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
      import ('./views/index/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/login',
    name: 'login',
    component: () =>
      import ('./views/login/index.vue'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/register',
    name: 'register',
    component: () =>
      import ('./views/register/index.vue'),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/city',
    name: 'city',
    component: () =>
      import ('./views/city/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/content',
    name: 'content',
    component: () =>
      import ('./views/content/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/content/recover',
    name: 'recover',
    component: () =>
      import ('./views/content/recover.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/content/workload',
    name: 'workload',
    component: () =>
      import ('./views/content/workload.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/content/read',
    name: 'read',
    component: () =>
      import ('./views/content/read.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/content/feed/:id',
    name: 'feed',
    component: () =>
      import ('./views/content/feed/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/column',
    name: 'column',
    component: () =>
      import ('./views/column/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/finance/manage/update',
    name: 'manage_update',
    component: () =>
      import ('./views/finance/manage/update.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/finance/manage/review',
    name: 'manage_review',
    component: () =>
      import ('./views/finance/manage/review.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/finance/records',
    name: 'records',
    component: () =>
      import ('./views/finance/records.vue'),
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/finance/records/column',
      name: 'records_column',
      component: () =>
        import ('./views/finance/records/column.vue'),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/finance/records/apply',
      name: 'records_apply',
      component: () =>
        import ('./views/finance/records/apply.vue'),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/finance/records/user',
      name: 'records_user',
      component: () =>
        import ('./views/finance/records/user.vue'),
      meta: {
        keepAlive: true
      }
    }, ]
  }, {
    path: '/finance/withdraw',
    name: 'withdraw',
    component: () =>
      import ('./views/finance/withdraw.vue'),
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/finance/withdraw/audited',
      name: 'withdraw_audited',
      component: () =>
        import ('./views/finance/withdraw/audited.vue'),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/finance/withdraw/applying',
      name: 'withdraw_applying',
      component: () =>
        import ('./views/finance/withdraw/applying.vue'),
      meta: {
        keepAlive: true
      }
    }]
  }, {
    path: '/finance/serial',
    name: 'serial',
    component: () =>
      import ('./views/finance/serial.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/finance/withdrawsetting',
    name: 'withdraw_setting',
    component: () =>
      import ('./views/finance/withdrawsetting/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/closer/classify',
    name: 'closer_classify',
    component: () =>
      import ('./views/closer/classify.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/closer/menu',
    name: 'closer_menu',
    component: () =>
      import ('./views/closer/menu.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/log',
    name: 'log',
    component: () =>
      import ('./views/log/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/activity/management',
    name: 'activity_management',
    component: () =>
      import ('./views/activity/management/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/activity/data',
    name: 'activity_data',
    component: () =>
      import ('./views/activity/data/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/activity/data/taijibing',
    name: 'activity_data_taijibing',
    component: () =>
      import ('./views/activity/data/taijibing/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/activity/data/tuzhu/config',
    name: 'activity_data_tuzhu_config',
    component: () =>
      import ('./views/activity/data/tuzhu/config.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/activity/data/tuzhu',
    name: 'activity_data_tuzhu',
    component: () =>
      import ('./views/activity/data/tuzhu/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/notice',
    name: 'notice',
    component: () =>
      import ('./views/notice/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/setting',
    name: 'setting',
    component: () =>
      import ('./views/setting/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/statistic',
    name: 'statistic',
    component: () =>
      import ('./views/statistic/index.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/general',
    name: 'general',
    component: () =>
      import ('./views/general/index.vue')
  }, {
    path: '/product/group_message_remind',
    name: 'group_message_remind',
    component: () =>
      import ('./views/product/group_message_remind.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/permission',
    name: 'permission',
    component: Permission,
    meta: {
      keepAlive: true
    }
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
    case 'recover':
      store.state.activeIndex = '/content';
      break;
    case 'workload':
      store.state.activeIndex = '/content/workload';
      break;
    case 'read':
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
    case "withdraw_setting":
      store.state.activeIndex = '提现设置';
      break;
    case "closer_classify":
      store.state.activeIndex = '贴近号分类';
      break;
    case "closer_menu":
      store.state.activeIndex = '菜单管理';
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
    case "activity_data_taijibing":
      store.state.activeIndex = '活动数据';
      break;
    case "activity_data_tuzhu":
      store.state.activeIndex = '活动数据';
      break;
    case "activity_data_tuzhu_config":
      store.state.activeIndex = '活动数据';
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
    case 'group_message_remind':
      store.state.activeIndex = '群消息智能提示设置';
      break;
    default:
      store.state.activeIndex = '/permission'
  }
  next()
})

export default router