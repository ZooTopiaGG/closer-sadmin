import {
  getConfigList,
  resetConfig
} from './service'

export default {
  namespaced: true,
  state: {
    configList: {
      data: [],
      count: 0
    }
  },
  mutations: {
    configList(state, para) {
      state.configList = para
    }
  },
  actions: {
    async getConfigList({
      commit
    }) {
      let {
        data
      } = await getConfigList().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('configList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async resetConfig({
      commit
    }, payload) {
      let {
        data
      } = await resetConfig(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('操作成功！')
        return true
      } else {
        $message.error(data.result)
      }
    }
  },
};