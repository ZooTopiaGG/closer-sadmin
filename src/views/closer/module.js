import {
  selectAll,
  updateClassref,
  getclassByCommunityId,
  insertClass,
  deleteClass,
  updateClass,
  selectClass,
  selectClassLike,
  updateClassStatus,
  selectByPage
} from './service'

export default {
  namespaced: true,
  state: {
    closerList: {
      data: [],
      count: 0
    },
    searchCloserList: {
      data: [],
      count: 0
    },
    zeroList: []
  },
  mutations: {
    closerList(state, para) {
      state.closerList = para
    },
    searchCloserList(state, para) {
      state.searchCloserList = para
    },
    zeroList(state, para) {
      state.zeroList = para
    }
  },
  actions: {
    async selectAll({
      commit,
      state
    }, payload) {
      let {
        data
      } = await selectAll(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let na = []
        await data.result.data.map(x => {
          x.update_time = $async.createTime(x.update_time, "yy-mm-dd hh:MM");
          if (x.status == 0) {
            na.push(x.class_name)
          }
          return x;
        });
        commit('zeroList', na)
        let res = {
          data: data.result.data,
          count: data.result.count
        }
        commit('closerList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async selectByPage({
      commit,
      state
    }, payload) {
      let {
        data
      } = await selectByPage(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.update_time = $async.createTime(x.update_time, "yy-mm-dd hh:MM");
          return x;
        });
        commit('closerList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async updateClassref({
      commit,
      state
    }, payload) {
      let {
        data
      } = await updateClassref(payload).catch(err => {
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
    async getclassByCommunityId({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getclassByCommunityId(payload).catch(err => {
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
    async insertClass({
      commit,
      state
    }, payload) {
      let {
        data
      } = await insertClass(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('操作成功！')
        return true
      } else {
        $message.error(data.result)
      }
    },
    async deleteClass({
      commit,
      state
    }, payload) {
      let {
        data
      } = await deleteClass(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('操作成功！')
        return true
      } else {
        $message.error(data.result)
      }
    },
    async updateClass({
      commit,
      state
    }, payload) {
      let {
        data
      } = await updateClass(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('操作成功！')
        return true
      } else {
        $message.error(data.result)
      }
    },
    async selectClass({
      commit,
      state
    }, payload) {
      let {
        data
      } = await selectClass(payload).catch(err => {
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
    async selectClassLike({
      commit,
      state
    }, payload) {
      let {
        data
      } = await selectClassLike(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let na = []
        await data.result.data.map(x => {
          x.update_time = $async.createTime(x.update_time, "yy-mm-dd hh:MM");
          if (x.status == 0) {
            na.push(x.class_name)
          }
          return x;
        });
        commit('zeroList', na)
        commit('closerList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async selectClassLike2({
      commit,
      state
    }, payload) {
      let {
        data
      } = await selectClassLike(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = []
        await data.result.data.map(x => {
          if (x.status === 0) {
            arr.push(x.class_name)
          }
        })
        commit('searchCloserList', data.result)
        return arr
      } else {
        $message.error(data.result)
      }
    },
    async updateClassStatus({
      commit,
      state
    }, payload) {
      let {
        data
      } = await updateClassStatus(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('发布成功！')
      } else {
        $message.error(data.result)
      }
    },
  },
};