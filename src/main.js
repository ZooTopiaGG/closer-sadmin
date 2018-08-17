import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import {
  Message,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import '@/assets/css/element-variables.scss'
import '@/assets/css/common.css'
import '@/assets/css/reset.css'
import '@/assets/css/style.css'
import '@/assets/font/iconfont.css'
import Cookies from 'js-cookie'
import axios from '@/utils/axios'
import '@/utils/opreation'
import async from '@/utils/async'
import api from '@/utils/api'
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(ElementUI)
Vue.use(infiniteScroll)
window.$message = Message
window.$msgbox = MessageBox
window.$confirm = MessageBox.confirm
window.$alert = MessageBox.alert
window.$notify = Notification
window.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service
Vue.prototype.$com = async;
window.Axios = axios;
window.Cookies = Cookies;
window.$async = async;
window.api = api;
store.state.authUser = Cookies.get('token') ? JSON.parse(decodeURIComponent(decodeURIComponent(Cookies.get('user')))) : '';
if (/sandbox.tiejin/.test(window.location.href) || /localhost/.test(window.location.href) || /10.3.0.27/.test(window.location.href)) {
  store.state.IS_DEV = true
  api['filePath'] = 'http://file-sandbox.tiejin.cn';
  api['invitepath'] = 'http://admin-sandbox.tiejin.cn/register/';
  Cookies.set("IS_DEV", true, {
    expires: 1
  });
} else {
  api['filePath'] = 'http://file.tiejin.cn';
  api['invitepath'] = 'http://open.tiejin.cn/register/';
}
Vue.config.productionTip = false

// 路由鉴权
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
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')