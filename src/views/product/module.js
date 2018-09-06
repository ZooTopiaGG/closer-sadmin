import {
  getRegionsList,
  setBindAnnounceCommunity,
  getBindAnnounceCommunity,
  addRegion,
  showCommunity,
  updateRegion,
  showRegion
} from './service'

export default {
  namespaced: true,
  state: {
    regionsList: {},
    getBindColumn: {},
    getSearchColumn: {}
  },
  mutations: {
    regionsList(state, para) {
      state.regionsList = para
    },
    getBindColumn(state, para) {
      state.getBindColumn = para
    },
    getSearchColumn(state, para) {
      state.getSearchColumn = para
    }
  },
  actions: {
    async getRegionsList({
      commit
    }, payload) {
      let {
        data
      } = await getRegionsList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          x.long_update_time = x.long_update_time ?
            $async.createTime(x.long_update_time, "yy-mm-dd hh:MM") :
            "-";
          return x;
        });
        commit('regionsList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async addRegion({
      commit
    }, payload) {
      let {
        data
      } = await addRegion(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("保存成功！");
        return true
      } else {
        $message.error(data.result);
      }
    },
    async updateRegion({
      commit
    }, payload) {
      let {
        data
      } = await updateRegion(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("修改成功！");
        return true
      } else {
        $message.error(data.result);
      }
    },
    async showRegion({
      commit
    }, payload) {
      let {
        data
      } = await showRegion(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      console.log(data)
      if (data.code === 0) {
        return data
      } else {
        $message.error(data.result);
      }
    },
    async getBindAnnounceCommunity({
      commit
    }) {
      let {
        data
      } = await getBindAnnounceCommunity().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('getBindColumn', data.result)
        return true
      } else {
        $message.error(data.result);
      }
    },
    async setBindAnnounceCommunity({
      commit
    }, payload) {
      let {
        data
      } = await setBindAnnounceCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("设置成功！");
        return true
      } else {
        $message.error(data.result);
      }
    },
    async showCommunity({
      commit
    }, payload) {
      let {
        data
      } = await showCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        console.log(data.result)
        commit('getSearchColumn', data.result)
        return true
      } else {
        $message.error(data.result);
      }
    }
  },
};