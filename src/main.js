import Vue from 'vue'
import Cookies from 'js-cookie'
import App from './App.vue'
import axios from '@/utils/axio'
import store from './store'
import router from './router'
import '@/utils/myMixins'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import Grid from 'vue-js-grid'
//单独的组件里面使用
import infiniteScroll from "vue-infinite-scroll";
// 有问题 还是影响
Vue.use(infiniteScroll);
import {
  Message,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'
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
Vue.use(Grid)
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
  loading: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
  attempt: 3,
  // listenEvents: ['scroll']
})
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
try {
  let t = Cookies.get('_tcloser'),
  u = localStorage.getItem('_ucloser');
  store.state.authUser = u ? JSON.parse(u) : '';
  store.state.token = t ? t : '';
} catch(e) {
  console.log(e)
}
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