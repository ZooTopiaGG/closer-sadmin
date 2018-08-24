import Vue from 'vue'
import Cookies from 'js-cookie'
import App from './App.vue'
import axios from '@/utils/axio'
import store from './store'
import router from './router'
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
import '@/utils/opreation'
import async from '@/utils/async'
import api from '@/utils/api'
import '@/utils/json2csv'
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
let t = Cookies.get('token');
store.state.authUser = t ? JSON.parse(Cookies.get('user')) : '';
store.state.token = t ? t : '';
if (/sandbox.tiejin/.test(window.location.href) || /localhost/.test(window.location.href) || /10.3.0.27/.test(window.location.href)) {
  store.state.IS_DEV = true
  api['filePath'] = 'https://file-sandbox.tiejin.cn';
  api['invitepath'] = 'https://admin-sandbox.tiejin.cn/register/';
  Cookies.set("IS_DEV", true, {
    expires: 1
  });
} else {
  api['filePath'] = 'https://file.tiejin.cn';
  api['invitepath'] = 'https://open.tiejin.cn/register/';
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')