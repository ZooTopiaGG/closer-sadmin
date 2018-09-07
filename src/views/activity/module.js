import {
  getAllActivity,
  updateActivity,
  updateActivityStatus,
  closerActivityList,
  getCityList,
  newActivity
} from './service'

export default {
  namespaced: true,
  state: {
    activityLists: {
      data: [],
      count: 0
    },
    closerActivityLists: {
      data: [],
      count: 0
    },
    searchregion: []
  },
  mutations: {
    activityLists(state, para) {
      state.activityLists = para
    },
    closerActivityLists(state, para) {
      state.closerActivityLists = para
    },
    waterList(state, para) {
      state.waterList = para
    },
    searchregion(state, para) {
      state.searchregion = para
    }
  },
  actions: {
    async getCityList({
      commit
    }, payload) {
      let {
        data
      } = await getCityList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('searchregion', data.result.data)
      } else {
        $message.error(data.result)
      }
    },
    async getAllActivity({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getAllActivity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.status = x.status ? "已停用" : "已启用";
          return x;
        });
        commit('activityLists', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async newActivity({
      commit
    }, payload) {
      let {
        data
      } = await newActivity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
        return true
      } else {
        $message.error(data.result)
      }
    },
    async updateActivity({
      commit,
      state
    }, payload) {
      let {
        data
      } = await updateActivity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
        return true
      } else {
        $message.error(data.result)
      }
    },
    async updateActivityStatus({
      commit,
      state
    }, payload) {
      let {
        data
      } = await updateActivityStatus(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
        return true
      } else {
        $message.error(data.result)
      }
    },
    async closerActivityList({
      commit,
      state
    }) {
      let {
        data
      } = await closerActivityList().catch(err => {
        $message.error('网络开小差了。。。')
      })
      console.log('data===', data)
      if (data.code === 0) {
        let arr = data.result.data.map(x => {
          x.createTime = x.createTime ?
            $async.createTime(x.createTime, "yy-mm-dd hh:MM") :
            "-";
          return x;
        });
        commit('closerActivityLists', data.result)
      } else {
        $message.error(data.result)
      }
    },
  },
};