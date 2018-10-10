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
import activity_taijibing from '@/views/activity/data/taijibing/module'
import activity_question from '@/views/activity/data/question/module'
import notice from '@/views/notice/module'
import config from '@/views/config/module'
import closer from '@/views/closer/module'
import push from '@/views/push/module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IS_DEV: false,
    authUser: {},
    token: '',
    isLoginPage: false,
    activeIndex: '/permission',
    loadingMain: false
  },
  modules: {
    permission,
    login,
    city,
    content,
    column,
    finance,
    log,
    activity,
    activity_taijibing,
    activity_question,
    notice,
    config,
    closer,
    push
  }
})