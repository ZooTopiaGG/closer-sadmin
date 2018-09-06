import {
  activityWaterList
} from './service'

export default {
  namespaced: true,
  state: {
    waterList: {
      data: [],
      count: 0
    }
  },
  mutations: {
    waterList(state, para) {
      state.waterList = para
    }
  },
  actions: {
    async activityWaterList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await activityWaterList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      console.log('data===', data)
      if (data.code === 0) {
        data.result.data.map(x => {
          x.address = x.address ? x.address : "-";
          x.name = x.name ? x.name : "-";
          x.phone = x.phone ? x.phone : "-";
          x.nickname = x.nickname ? x.nickname : "-";
          return x;
        });
        commit('waterList', data.result)
      } else {
        $message.error(data.result)
      }
    },
  },
};