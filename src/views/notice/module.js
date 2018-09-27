import {
  getAllUser,
  getNotifyRules,
  updateRules,
  addUser,
  updateUser,
  deleteUser,
  userByPhone,
  userByMail
} from './service'

export default {
  namespaced: true,
  state: {
    userList: {}
  },
  mutations: {
    userList(state, para) {
      state.userList = para
    }
  },
  actions: {
    async getAllUser({
      commit
    }) {
      let {
        data
      } = await getAllUser().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.list.map(x => {
          x.create_time = x.create_time ?
            $async.createTime(x.create_time, "yy-mm-dd hh:MM") :
            "-";
          return x;
        });
        commit('userList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async getNotifyRules({
      commit
    }) {
      let {
        data
      } = await getNotifyRules().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return data.result
      } else {
        $message.error(data.result)
      }
    },
    async updateRules({
      commit
    }, payload) {
      let {
        data
      } = await updateRules(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
      } else {
        $message.error(data.result)
      }
    },
    async deleteUser({
      commit
    }, payload) {
      let {
        data
      } = await deleteUser(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
      } else {
        $message.error(data.result)
      }
    },
    async addUser({
      commit
    }, payload) {
      let {
        data
      } = await addUser(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
      } else {
        $message.error(data.result)
      }
    },
    async updateUser({
      commit
    }, payload) {
      let {
        data
      } = await updateUser(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
      } else {
        $message.error(data.result)
      }
    },
    async userByPhone({
      commit
    }, payload) {
      let {
        data
      } = await userByPhone(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return data.result
      } else {
        $message.error(data.result)
      }
    },
    async userByMail({
      commit
    }, payload) {
      let {
        data
      } = await userByMail(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return data.result
      } else {
        $message.error(data.result)
      }
    },
  },
};