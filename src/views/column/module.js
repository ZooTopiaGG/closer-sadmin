import {
  getCommunitiesList,
  showCommunity,
  setCoverRegionCommunity,
  getRegionList,
  verifyUpdateCommunity,
  verifyCommunity,
  getApplyByCommunity,
  updateCommunity,
  inviteCode,
  setSelfCommunity,
  ban,
  selectAll
} from './service'
import store from '@/store'

export default {
  namespaced: true,
  state: {
    res: {},
    allregion: [],
    searchregion: [],
    _fliterregion: "",
    closerList: {
      data: [],
      count: 0
    },
    zeroList: []
  },
  mutations: {
    res(state, para) {
      state.res = para
    },
    allregion(state, para) {
      state.allregion = para
    },
    searchregion(state, para) {
      state.searchregion = para
    },
    _fliterregion(state, para) {
      state._fliterregion = para
    },
    closerList(state, para) {
      state.closerList = para
    },
    zeroList(state, para) {
      state.zeroList = para
    },
  },
  actions: {
    async getCommunitiesList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getCommunitiesList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          // 创建时间
          if (x.long_create_time === 0) {
            x.long_create_time = "-";
          } else {
            x.long_create_time = $async.createTime(
              x.long_create_time,
              "yy-mm-dd hh:MM"
            );
          }
          if (
            $async
            .createTime(x.long_apply_time, "yy-mm-dd hh:MM")
            .indexOf("1970") > -1
          ) {
            x.long_apply_time = "-";
          } else {
            x.long_apply_time = $async.createTime(
              x.long_apply_time,
              "yy-mm-dd hh:MM"
            );
          }
          if (
            $async
            .createTime(x.long_verify_time, "yy-mm-dd hh:MM")
            .indexOf("1970") > -1
          ) {
            x.long_verify_time = "-";
          } else {
            x.long_verify_time = $async.createTime(
              x.long_verify_time,
              "yy-mm-dd hh:MM"
            );
          }
          // 激活状态
          if (x.active === 0) {
            x.active = "未激活";
          } else {
            x.active = "已激活";
          }
          // 邀请码
          if (x.invite_code === "0") {
            x.invite_code = "-";
            x.invite_type = "非邀请";
          } else {
            x.invite_type = "邀请";
          }
          // shifou默认栏目
          if (x.int_self === 0) {
            x.int_self_2 = "否";
          } else {
            x.int_self_2 = "是";
          }
          // 申请类别
          if (x.int_apply_type === 0) {
            x.int_apply_type = "创建栏目";
          } else if (x.int_apply_type === 1) {
            x.int_apply_type = "修改";
          } else {
            x.int_apply_type = "默认";
          }
          return x;
        });

        let result = {
          data: arr,
          // 判断是否需要绑定封面栏目
          needBindCover: data.result.needBindCover,
          count: data.result.count
        }
        commit('res', result)
      } else {
        $message.error(data.result)
      }
    },
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
        let arr1 = await data.result.data.map(x => {
          return {
            value: x.region_id,
            label: x.region_name
          };
        });
        let arr2 = []
        if (store.state.authUser.type === 1) {
          arr2 = arr1;
        } else {
          payload['columnCity'].forEach((x, i) => {
            arr1.forEach((y, j) => {
              if (y.value === payload['columnCity'][i]) {
                arr2.push({
                  value: y.value,
                  label: y.label
                });
              }
            });
          });
        }
        commit('allregion', arr1);
        commit('searchregion', arr2);
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
        return data.result
      } else {
        $message.error(data.result);
      }
    },
    async updateCommunity({
      commit
    }, payload) {
      let {
        data
      } = await updateCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('操作成功！');
        return true
      } else {
        $message.error(data.result);
      }
    },
    async ban({
      commit
    }, payload) {
      let {
        data
      } = await ban(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return true
      } else {
        $message.error(data.result);
      }
    },
    async setCoverRegionCommunity({
      commit
    }, payload) {
      let {
        data
      } = await setCoverRegionCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message({
          type: "success",
          message: "操作成功"
        })
        return true
      } else {
        $message.error(data.result);
      }
    },
    async fnVerifyCommunity({
      commit,
      dispatch
    }, payload) {
      if (payload.flag === 0) {
        if (payload.text === "") {
          $message.warning("请输入拒绝理由");
          return false;
        }
      } else {
        payload.text === "";
      }
      if (payload.filtercondition_type == "未上线待审") {
        delete payload['filtercondition_type']
        dispatch('verifyCommunity', payload)
      } else if (payload.filtercondition_type == "已上线待改") {
        delete payload['filtercondition_type']
        dispatch('verifyUpdateCommunity', payload)
      } else {
        return false;
      }
    },
    async verifyUpdateCommunity({
      commit
    }, payload) {
      let {
        data
      } = await verifyUpdateCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message({
          type: "success",
          message: "操作成功!"
        })
        return true
      } else {
        $message.error(data.result);
      }
    },
    async verifyCommunity({
      commit
    }, payload) {
      let {
        data
      } = await verifyCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message({
          type: "success",
          message: "操作成功!"
        })
        return true
      } else {
        $message.error(data.result);
      }
    },
    async getApplyByCommunity({
      commit
    }, payload) {
      let {
        data
      } = await getApplyByCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return data.result
      } else {
        $message.error(data.result);
      }
    },
    async inviteCode({
      commit
    }, payload) {
      let {
        data
      } = await inviteCode(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功!");
        return data.result
      } else {
        $message.error(data.result);
      }
    },
    async setSelfCommunity({
      commit
    }, payload) {
      let {
        data
      } = await setSelfCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return true
      } else {
        $message.error(data.result);
      }
    },
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
        console.log(data)
        commit('closerList', data.result)
      } else {
        $message.error(data.result)
      }
    },
  },
};