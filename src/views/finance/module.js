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
  userWalletDetail,
  clearWallet,
  subjectFeeList,
  subjectFeeTotal,
  rechargeListNew,
  searchUser,
  settingAuditList,
  getCommunityDetail,
  searchCommunity
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
    withdrawList2: {
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
    rechargeList2: {
      data: [],
      count: 0
    },
    serialList: {
      data: [],
      count: 0
    },
    feeList: {
      data: [],
      count: 0
    },
    feeTotal: {},
    newRechargeList: {
      data: [],
      count: 0
    },
    auditList: {
      data: [],
      count: 0
    },
    communityInfo: {
      community: {
        name: '',
        phone: '',
        regionName: '',
        person_name: '',
        long_create_time: '',
        business_license: '',
      },
      summary: {
        transMaxAmt: '',
        dailyAllowanceAmt: '',
        totalAllowanceAmt: '',
        totalAllowancedAmt: '',
      },
      wallet: {
        availableBalance: ''
      }
    }
  },
  mutations: {
    communityList(state, para) {
      state.communityList = para
    },
    withdrawList(state, para) {
      state.withdrawList = para
    },
    withdrawList2(state, para) {
      state.withdrawList2 = para
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
    rechargeList2(state, para) {
      state.rechargeList2 = para
    },
    serialList(state, para) {
      state.serialList = para
    },
    feeList(state, para) {
      state.feeList = para
    },
    feeTotal(state, para) {
      state.feeTotal = para
    },
    newRechargeList(state, para) {
      state.newRechargeList = para
    },
    auditList(state, para) {
      state.auditList = para
    },
    communityInfo(state, para) {
      state.communityInfo = para
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
          x.rechargeAmt = x.rechargeAmt ? x.rechargeAmt / 100 : 0;
          x.totalAllowanceAmt = x.totalAllowanceAmt ? x.totalAllowanceAmt / 100 : 0;
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
          x.objectID = x.user && x.user.objectID ? x.user.objectID : "-";
          x.certNo = x.identity && x.identity.certNo ? x.identity.certNo : "-";
          x.createTime =
            x.withdraw && x.withdraw.createTime ?
            $async.createTime(x.withdraw.createTime, "yy-mm-dd hh:MM") :
            "-";
          x.auditTime =
            x.withdraw && x.withdraw.auditTime ?
            $async.createTime(x.withdraw.auditTime, "yy-mm-dd hh:MM") :
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
            x.auditStatus = "通过";
          } else if (x.withdraw.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "拒绝";
          }
          return x;
        });
        commit('withdrawList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async withdrawAuthList2({
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
          x.objectID = x.user && x.user.objectID ? x.user.objectID : "-";
          x.certNo = x.identity && x.identity.certNo ? x.identity.certNo : "-";
          x.createTime =
            x.withdraw && x.withdraw.createTime ?
            $async.createTime(x.withdraw.createTime, "yy-mm-dd hh:MM") :
            "-";
          x.auditTime =
            x.withdraw && x.withdraw.auditTime ?
            $async.createTime(x.withdraw.auditTime, "yy-mm-dd hh:MM") :
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
            x.auditStatus = "通过";
          } else if (x.withdraw.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "拒绝";
          }
          return x;
        });
        commit('withdrawList2', data.result)
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
          x.applyTime = x.applyTime ? $async.createTime(x.applyTime, "yy-mm-dd hh:MM") : '-';
          x.auditTime = x.auditTime ? $async.createTime(x.auditTime, "yy-mm-dd hh:MM") : '-';
          if (x.auditStatus === "success") {
            x.auditStatus = "审核通过";
          } else if (x.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "审核失败";
          }
          x.type = '充值';
          x.rechargeAmt = x.rechargeAmt ? x.rechargeAmt / 100 : 0;
          x.totalAllowanceAmt = x.totalAllowanceAmt ? x.totalAllowanceAmt / 100 : 0;
          x.auditUid = x.auditUid ? x.auditUid : '-';
          x.auditUser = x.auditUser ? x.auditUser : '-';
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
          x.applyTime = $async.createTime(x.create_time, "yy-mm-dd hh:MM");
          if (x.auditStatus === "success") {
            x.auditStatus = "审核通过";
          } else if (x.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "审核失败";
          }
          x.dailyAllowanceAmt = x.dailyAllowanceAmt ? x.dailyAllowanceAmt / 100 : 0;
          x.originalTransMaxAmt = x.originalTransMaxAmt ? x.originalTransMaxAmt / 100 : 0;
          x.originalDailyAllowanceAmt = x.originalDailyAllowanceAmt ? x.originalDailyAllowanceAmt / 100 : 0;
          x.transMaxAmt = x.transMaxAmt ? x.transMaxAmt / 100 : 0;
          return x;
        });
        commit('rechargeList2', data.result)
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
    async clearWallet({
      commit
    }, payload) {
      let {
        data
      } = await clearWallet(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("提交成功，等待审批...")
        return true
      } else {
        $message.error(data.result)
      }
    },
    async subjectFeeList({
      commit
    }, payload) {
      let {
        data
      } = await subjectFeeList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          switch (x.subject.int_release_type) {
            case 0:
              x.subject.int_release_type = '自媒体'
              break;
            case 1:
              x.subject.int_release_type = '班级'
              break;
            default:
              x.subject.int_release_type = '自媒体'
          }
          try {
            x.subject.title = x.subject.title ? x.subject.title : JSON.parse(x.subject.content).text.substr(0, 10)
          } catch (e) {}
          x.subject.long_publish_time = $async.createTime(x.subject.long_publish_time, "yy-mm-dd hh:MM");
          x.transStatus = x.transStatus === 'success' ? '是' : '否';
          x.totalFee = x.totalFee / 100;
          return x;
        });
        commit('feeList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async subjectFeeTotal({
      commit
    }, payload) {
      let {
        data
      } = await subjectFeeTotal(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('feeTotal', data.result)
        return true
      } else {
        $message.error(data.result)
      }
    },
    async rechargeListNew({
      commit
    }, payload) {
      let {
        data
      } = await rechargeListNew(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          switch (x.auditStatus) {
            case 'apply':
              x.auditStatus = '审核中';
              break;
            case 'success':
              x.auditStatus = '通过';
              break;
            case 'fail':
              x.auditStatus = '审核中';
              break;
            default:
              x.auditStatus = '拒绝';
          }
          x.type = '充值';
          x.totalAllowanceAmt = x.totalAllowanceAmt ? x.totalAllowanceAmt / 100 : 0;
          x.rechargeAmt = x.rechargeAmt ? x.rechargeAmt / 100 : 0;
          x.auditUid = x.auditUid ? x.auditUid : '-';
          x.auditUser = x.auditUser ? x.auditUser : '-';
          x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          x.updateTime = $async.createTime(x.updateTime, "yy-mm-dd hh:MM");
        })
        commit('newRechargeList', data.result)
        return true
      } else {
        $message.error(data.result)
      }
    },
    // 改政策记录列表
    async settingAuditList({
      commit
    }, payload) {
      let {
        data
      } = await settingAuditList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        await data.result.data.map(x => {
          x.applyTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          x.auditTime = $async.createTime(x.auditTime, "yy-mm-dd hh:MM");
          if (x.auditStatus === "success") {
            x.auditStatus = "审核通过";
          } else if (x.auditStatus === "apply") {
            x.auditStatus = "审核中";
          } else {
            x.auditStatus = "审核失败";
          }
          x.dailyAllowanceAmt = x.dailyAllowanceAmt ? x.dailyAllowanceAmt / 100 : 0;
          x.dailyAllowanceAmtOld = x.dailyAllowanceAmtOld ? x.dailyAllowanceAmtOld / 100 : 0;
          x.transMaxAmt = x.transMaxAmt ? x.transMaxAmt / 100 : 0;
          x.transMaxAmtOld = x.transMaxAmtOld ? x.transMaxAmtOld / 100 : 0;
          return x;
        });
        commit('auditList', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async getCommunityDetail({
      commit
    }, payload) {
      let {
        data
      } = await getCommunityDetail(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        // await data.result.data.map(x => {
        //   x.applyTime = $async.createTime(x.applyTime, "yy-mm-dd hh:MM");
        //   x.rechargeAmt = x.rechargeAmt ? x.rechargeAmt / 100 : 0;
        //   x.totalAllowanceAmt = x.totalAllowanceAmt ? x.totalAllowanceAmt / 100 : 0;
        //   return x;
        // });
        console.log(data.result)
        commit('communityInfo', data.result)
      } else {
        $message.error(data.result)
      }
    },
    async searchCommunity({
      commit
    }, payload) {
      let {
        data
      } = await searchCommunity(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        console.log(data.result)
        // commit('communityInfo', data.result)
        return data.result.data
      } else {
        $message.error(data.result)
      }
    }
  },
};