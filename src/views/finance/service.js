/**
 * 财务申请
 */
/**
 * api.finance.get_community_list 获取财务申请栏目列表
 */
export async function getCommunityList(payload) {
  return await Axios.post(`${api.finance.get_community_list}`, payload)
}

/**
 * api.finance.community_detail 栏目详情
 */
export async function communityDetail(payload) {
  return await Axios.post(`${api.finance.community_detail}`, payload)
}

/**
 * updateRechargeSetting 改政策
 */
export async function updateRechargeSetting(payload) {
  return await Axios.post(`${api.finance.update_recharge_setting}`, payload)
}

/**
 * commit_apply 充额度
 */
export async function commitApply(payload) {
  return await Axios.post(`${api.finance.commit_apply}`, payload)
}

/**
 * 财务审核
 */
/**
 * api.finance.recharge_apply_list 获取财务审核列表
 */
export async function rechargeApplyList(payload) {
  return await Axios.post(`${api.finance.recharge_apply_list}`, payload)
}

/**
 * api.finance.recharge_settings_apply_list 获取改政策列表
 */
export async function rechargeSettingsApplyList(payload) {
  return await Axios.post(`${api.finance.recharge_settings_apply_list}`, payload)
}

/**
 * rechargeAudit 同意充额度
 */
export async function rechargeAudit(payload) {
  return await Axios.post(`${api.finance.recharge_audit}`, payload)
}

/**
 * audit_recharge_setting 同意改政策
 */
export async function auditRechargeSetting(payload) {
  return await Axios.post(`${api.finance.audit_recharge_setting}`, payload)
}

/**
 * 提现审核
 */
/**
 * api.finance.withdraw_auth_list 获取提现审核列表
 */
export async function withdrawAuthList(payload) {
  return await Axios.post(`${api.finance.withdraw_auth_list}`, payload)
}

/**
 * api.finance.auth_status 提现审核操作
 */
export async function authStatus(payload) {
  return await Axios.post(`${api.finance.auth_status}`, payload)
}

/**
 * 财务记录
 */
/**
 * api.finance.community_list 栏目记录
 */
export async function communityRecords(payload) {
  return await Axios.post(`${api.finance.community_list}`, payload)
}

/**
 * api.finance.community_list 获取提现审核列表
 */
export async function walletDetailList(payload) {
  return await Axios.post(`${api.finance.wallet_detail_list}`, payload)
}

/**
 * api.finance.closer_user_list 用户记录列表
 */
export async function closerUserList(payload) {
  return await Axios.post(`${api.finance.closer_user_list}`, payload)
}

/**
 * api.finance.withdraw_list 资金记录
 */
export async function userWithdrawList(payload) {
  return await Axios.post(`${api.finance.withdraw_list}`, payload)
}
/**
 * api.finance.closer_user_balance 用户信息
 */
export async function closerUserBalance(payload) {
  return await Axios.post(`${api.finance.closer_user_balance}`, payload)
}

/**
 * api.finance.wallet_lock_type 提现状态
 */
export async function walletLockType(payload) {
  return await Axios.post(`${api.finance.wallet_lock_type}`, payload)
}
/**
 * api.finance.lock_wallet 设置提现状态
 */
export async function lockWallet(payload) {
  return await Axios.post(`${api.finance.lock_wallet}`, payload)
}
/**
 * api.finance.all_recharge_list 获取审核列表
 */
export async function allRechargeList(payload) {
  return await Axios.post(`${api.finance.all_recharge_list}`, payload)
}
/**
 * api.finance.user_wallet_detail 近期流水列表
 */
export async function userWalletDetail(payload) {
  return await Axios.post(`${api.finance.user_wallet_detail}`, payload)
}
/**
 * api.finance.clear_wallet 清空余额
 */
export async function clearWallet(payload) {
  return await Axios.post(`${api.finance.clear_wallet}`, payload)
}
/**
 * api.finance.subject_fee_list 清空余额
 */
export async function subjectFeeList(payload) {
  return await Axios.post(`${api.finance.subject_fee_list}`, payload)
}
/**
 * api.finance.subject_fee_total 稿费记录
 */
export async function subjectFeeTotal(payload) {
  return await Axios.post(`${api.finance.subject_fee_total}`, payload)
}
/**
 * api.finance.recharge_list_new 充值记录
 */
export async function rechargeListNew(payload) {
  return await Axios.post(`${api.finance.recharge_list_new}`, payload)
}
/**
 * api.finance.search_user 查讯提现列表
 */
export async function searchUser(payload) {
  return await Axios.post(`${api.finance.search_user}`, payload)
}