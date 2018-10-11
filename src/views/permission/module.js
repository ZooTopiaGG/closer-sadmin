import {
  getUserList,
  getMenuList,
  getRegionList,
  searchUser,
  delUserInfo,
  updateUserInfo
} from './service'

export default {
  namespaced: true,
  state: {
    userList: {},
    getRegionList: {},
    searchuserinfo: {},
    permissionlist: {},
    regionlist: {}
  },
  mutations: {
    userList(state, para) {
      state.userList = para
    },
    searchuserinfo(state, para) {
      state.searchuserinfo = para
    },
    permissionlist(state, para) {
      state.permissionlist = para
    },
    regionlist(state, para) {
      state.regionlist = para
    }
  },
  actions: {
    // 获取用户信息
    async getUserList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getUserList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      let arr = await data.result.data.map(x => {
        x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
        x.newUser = x.newUser === 1 ? "新员工" : "-";
        return x;
      });
      commit('userList', data.result)
    },
    // 更新用户信息
    async updateUserInfo({
      commit,
      state
    }, payload) {
      let {
        data
      } = await updateUserInfo(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("用户信息或权限修改成功！");
        return true
      } else {
        $message.error(data.result);
      }
    },
    // 删除用户
    async delUserInfo({
      commit,
    }, payload) {
      let {
        data
      } = await delUserInfo(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("删除成功！");
        return true
      } else {
        $message.error(data.result);
      }
    },
    // 查找用户
    async searchUser({
      commit
    }, payload) {
      let {
        data
      } = await searchUser(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('searchuserinfo', data.result)
        $message.success("操作成功！");
        return true
      } else {
        $message.error(data.result);
      }
    },
    // 获取权限列表
    async getMenuList({
      commit,
      dispatch,
      state
    }, payload) {
      let {
        data
      } = await getMenuList().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        dispatch('getRegionList', payload)
        console.log('data.result===', data.result)
        commit('permissionlist', data.result)
      } else {
        $message.error(data.result);
      }
    },
    // 获取城市列表
    async getRegionList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getRegionList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('regionlist', data.result.data)
        return true
      }
    }
  },
};