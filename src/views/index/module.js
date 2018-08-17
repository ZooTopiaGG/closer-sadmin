import {
  getUserList,
  deleteUser,
  getPermissionList,
  getRegionList,
  modifyPermission,
  searchUser
} from './service'

export default {
  namespaced: true,
  state: {
    userList: {},
    deleteUser: false,
    getPermissionList: {},
    getRegionList: {},
    modifyPermission: {},
    searchUser: {}
  },
  mutations: {
    userList(state, para) {
      state.userList = para
    }
  },
  actions: {
    async getUserList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getUserList(payload).catch(err => {
        this.$message.error('网络开小差了。。。')
      })
      let arr = await data.result.data.map(x => {
        x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
        x.newUser = x.newUser === 1 ? "新员工" : "-";
        return x;
      });
      // console.log(arr)
      commit('userList', data.result)
    }
  },
};