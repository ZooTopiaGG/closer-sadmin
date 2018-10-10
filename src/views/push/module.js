import {
  getLog,
  subjectPushAdd,
  subjectPushList,
  allRegions
} from './service'
import Store from '../../store.js'

export default {
  namespaced: true,
  state: {
    logList: {
      data: [],
      count: 0
    },
    regionList: [],
    pushList: {
      data: [],
      count: 0
    }
  },
  mutations: {
    logList(state, para) {
      state.logList = para
    },
    regionList(state, para) {
      state.regionList = para
    },
    pushList(state, para) {
      state.pushList = para
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
        commit('pushList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async subjectPushAdd({
      commit,
      state
    }, payload) {
      let {
        data
      } = await subjectPushAdd(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        console.log(data)
      } else {
        $message.error(data.result)
      }
    },
    async allRegions({
      commit,
      state
    }) {
      let {
        data
      } = await allRegions().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let p = JSON.parse,
          ps = Store.state.authUser.pushCity,
          narr = [];
        if (ps && p(ps).length > 0) {
          await p(ps).map(async x => {
            await data.result.data.map(y => {
              if (y.region_id === x) {
                narr.push(y)
              }
            })
          })
          console.log(narr)
          commit('regionList', narr)
        }
      } else {
        $message.error(data.result)
      }
    }
  },
};