import Vue from 'vue'
import Vuex from 'vuex'

import permission from '@/views/permission/module'
import login from '@/views/login/module'
import city from '@/views/city/module'
import content from '@/views/content/module'
import column from '@/views/column/module'
import finance from '@/views/finance/module'
import log from '@/views/log/module'
import activity from '@/views/activity/module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IS_DEV: false,
    authUser: {},
    token: '',
    isLoginPage: false,
    activeIndex: '/permission'
  },
  modules: {
    permission,
    login,
    city,
    content,
    column,
    finance,
    log,
    activity
  }
})