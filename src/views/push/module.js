import {
  getLog,
  subjectPushAdd,
  subjectPushList
} from './service'

export default {
  namespaced: true,
  state: {
    logList: {
      data: [],
      count: 0
    }
  },
  mutations: {
    logList(state, para) {
      state.logList = para
    }
  },
  actions: {
    async getLog({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getLog(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          return x;
        });
        commit('logList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async subjectPushList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await subjectPushList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        console.log(data)
      } else {
        $message.error(data.result)
      }
    }
  },
};