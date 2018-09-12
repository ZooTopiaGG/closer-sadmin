import {
  getCommunityList,
  communityDetail,
  updateRechargeSetting,
  commitApply,
  rechargeApplyList,
  rechargeSettingsApplyList,
  rechargeAudit,
  auditRechargeSetting,
  withdrawAuthList,
  authStatus,
  communityRecords,
  walletDetailList,
  closerUserList,
  userWithdrawList,
  closerUserBalance,
  walletLockType,
  lockWallet,
  allRechargeList,
  userWalletDetail
} from './service'

export default {
  namespaced: true,
  state: {
    communityList: {
      data: [],
      count: 0
    },
    withdrawList: {
      data: [],
      count: 0
    },
    communityRecordsList: {
      data: [],
      count: 0
    },
    rechargeInfo: {
      data: [],
      count: 0
    },
    userList: {
      data: [],
      count: 0
    },
    columnInfo: {
      data: [],
      count: 0
    },
    rechargeList: {
      data: [],
      count: 0
    },
    serialList: {
      data: [],
      count: 0
    },
  },
  mutations: {
    communityList(state, para) {
      state.communityList = para
    },
    withdrawList(state, para) {
      state.withdrawList = para
    },
    communityRecordsList(state, para) {
      state.communityRecordsList = para
    },
    rechargeInfo(state, para) {
      state.rechargeInfo = para
    },
    userList(state, para) {
      state.userList = para
    },
    columnInfo(state, para) {
      state.columnInfo = para
    },
    rechargeList(state, para) {
      state.rechargeList = para
    },
    serialList(state, para) {
      state.serialList = para
    }
  },
  actions: {
    /* 财务申请 */
    async getCommunityList({
      commit
    }, payload) {
      let {
        data
      } = await getCommunityList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.create_time = x.long_create_time ?
            $async.createTime(x.long_create_time, "yy-mm-dd hh:MM") :
            $async.createTime(x.create_time, "yy-mm-dd hh:MM");
          return x;
        });
        commit('communityList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async communityDetail({
      commit
    }, payload) {
      let {
        data
      } = await communityDetail(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return data.result
      } else {
        $message.error(data.result)
      }
    },
    async updateRechargeSetting({
      commit
    }, payload) {
      let {
        data
      } = await updateRechargeSetting(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("提交成功，等待审批...")
        return true
      } else {
        $message.error(data.result)
      }
    },
    async commitApply({
      commit
    }, payload) {
      let {
        data
      } = await commitApply(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("提交成功，等待审批...")
        return true
      } else {
        $message.error(data.result)
      }
    },
    /* 财务审核 */
    async rechargeApplyList({
      commit
    }, payload) {
      let {
        data
      } = await rechargeApplyList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.applyTime = $async.createTime(x.applyTime, "yy-mm-dd hh:MM");
          return x;
        });
        commit('rechargeList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async rechargeAudit({
      commit
    }, payload) {
      let {
        data
      } = await rechargeAudit(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message({
          type: "success",
          message: "操作成功!"
        })
        return true
      } else {
        $message.error(data.result)
      }
    },
    async auditRechargeSetting({
      commit
    }, payload) {
      let {
        data
      } = await auditRechargeSetting(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message({
          type: "success",
          message: "操作成功!"
        })
        return true
      } else {
        $message.error(data.result)
      }
    },
    async withdrawAuthList({
      commit
    }, payload) {
      let {
        data
      } = await withdrawAuthList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.userName = x.user && x.user.fullname ? x.user.fullname : "-";
          x.userPhone = x.user && x.user.phones ? x.user.phones : "-";
          x.createTime =
            x.withdraw && x.withdraw.createTime ?
            $async.createTime(x.withdraw.createTime, "yy-mm-dd hh:MM") :
            "-";
          x.withdrawAmt =
            x.withdraw && x.withdraw.withdrawAmt ?
            x.withdraw.withdrawAmt / 100 :
            0;
          x.payeeAccount =
            x.withdraw && x.withdraw.payeeAccount ?
            x.withdraw.payeeAccount :
            "-";
          x.withdrawRemark =
            x.withdraw && x.withdraw.withdrawRemark ?
            x.withdraw.withdrawRemark :
            "-";
          x.withdrawApply =
            x.withdraw && x.withdraw.withdrawApply ?
            x.withdraw.withdrawApply / 100 :
            0;
          x.withdrawTax =
            x.withdraw && x.withdraw.withdrawTax ?
            x.withdraw.withdrawTax / 100 :
            0;
          x.auditUser =
            x.withdraw && x.withdraw.auditUser ? x.withdraw.auditUser : "-";
          if (x.withdraw.auditStatus === "success") {
            x.auditStatus = "已通过";
          } else if (x.withdraw.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "已拒绝";
          }
          return x;
        });
        commit('withdrawList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async authStatus({
      commit
    }, payload) {
      let {
        data
      } = await authStatus(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("操作成功！");
        return true
      } else {
        $message.error(data.result)
      }
    },
    async communityRecords({
      commit
    }, payload) {
      let {
        data
      } = await communityRecords(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.create_time = x.long_create_time ?
            $async.createTime(x.long_create_time, "yy-mm-dd hh:MM") :
            $async.createTime(x.create_time, "yy-mm-dd hh:MM");
          return x;
        });
        commit('communityRecordsList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async walletDetailList({
      commit
    }, payload) {
      let {
        data
      } = await walletDetailList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          switch (x.transChannel) {
            case "recharge":
              x.transChannel = "财务充值";
              break;
            case "payment":
              x.transChannel = "栏目转账稿费";
              break;
            case "refund":
              x.transChannel = "稿费退还";
              break;
            case "withdraw":
              x.transChannel = "提现";
              break;
            case "allowance":
              x.transChannel = "补贴";
              break;
            case "redpackage":
              x.transChannel = "红包";
              break;
            default:
              x.transChannel = "其他";
          }
          x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          x.transAmt = x.transAmt / 100;
        });
        commit('rechargeInfo', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async closerUserList({
      commit
    }, payload) {
      let {
        data
      } = await closerUserList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          return x;
        });
        commit('userList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async userWithdrawList({
      commit
    }, payload) {
      let {
        data
      } = await userWithdrawList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          x.withdrawAmt = x.withdrawAmt / 100;
          return x;
        });
        commit('columnInfo', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async closerUserBalance({
      commit,
      state
    }, payload) {
      let {
        data
      } = await closerUserBalance(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        state.columnInfo['data'] = data.result;
      } else {
        $message.error(data.result)
      }
    },
    async walletLockType({
      commit
    }, payload) {
      let {
        data
      } = await walletLockType(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        return data.result
      } else {
        $message.error(data.result)
      }
    },
    async lockWallet({
      commit
    }, payload) {
      let {
        data
      } = await lockWallet(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message({
          type: "success",
          message: "操作成功"
        });
        return true
      } else {
        $message.error(data.result)
      }
    },
    async allRechargeList({
      commit
    }, payload) {
      let {
        data
      } = await allRechargeList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.applyTime = $async.createTime(x.applyTime, "yy-mm-dd hh:MM");
          if (x.auditStatus === "success") {
            x.auditStatus = "审核通过";
          } else if (x.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "审核失败";
          }
          return x;
        });
        commit('rechargeList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async rechargeSettingsApplyList({
      commit
    }, payload) {
      let {
        data
      } = await rechargeSettingsApplyList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.applyTime = $async.createTime(x.applyTime, "yy-mm-dd hh:MM");
          if (x.auditStatus === "success") {
            x.auditStatus = "审核通过";
          } else if (x.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "审核失败";
          }
          return x;
        });
        commit('rechargeList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async userWalletDetail({
      commit
    }, payload) {
      let {
        data
      } = await userWalletDetail(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          x.transAmt = x.transAmt / 100;
          switch (x.transChannel) {
            case "recharge":
              x.transChannel = "财务充值";
              break;
            case "payment":
              x.transChannel = "稿费";
              break;
            case "refund":
              x.transChannel = "稿费退款";
              break;
            case "withdraw":
              x.transChannel = "提现";
              break;
            case "redpackage":
              x.transChannel = "红包";
              break;
            case "allowance":
              x.transChannel = "补贴";
              break;
            case "award":
              x.transChannel = "奖励金";
              break;
            default:
              x.transChannel = "其他";
          }
          return x;
        });
        commit('serialList', data.result)
      } else {
        $message.error(data.result)
      }
    },
  },
};