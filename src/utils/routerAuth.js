import store from '@/store'
import router from '@/router'

// 路由鉴权
export default router.beforeEach((to, from, next) => {
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