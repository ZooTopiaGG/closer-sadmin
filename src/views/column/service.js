/**
 * getCommunitiesList 获取栏目列表
 */
export async function getCommunitiesList(payload) {
  return await Axios.post(`${api.community.get_community_list_by_region}`, payload)
}

/**
 * showCommunity 栏目信息
 */
export async function showCommunity(payload) {
  return await Axios.post(`${api.community.show}`, payload)
}

/**
 * setCoverRegionCommunity 设置封面栏目
 */
export async function setCoverRegionCommunity(payload) {
  return await Axios.post(`${api.community.set_cover_region_community}`, payload)
}

/**
 * getRegionList 获取城市列表
 */
export async function getRegionList(payload) {
  return await Axios.post(`${api.region.regions}`, payload)
}

/**
 * verifyUpdateCommunity 已上线待改
 */
export async function verifyUpdateCommunity(payload) {
  return await Axios.post(`${api.community.verify_update_community}`, payload)
}

/**
 * verifyCommunity 未上线代审
 */
export async function verifyCommunity(payload) {
  return await Axios.post(`${api.community.verify_community}`, payload)
}
/**
 * getApplyByCommunity 申请栏目对比
 */
export async function getApplyByCommunity(payload) {
  return await Axios.post(`${api.community.get_apply_by_community}`, payload)
}
/**
 * updateCommunity 修改栏目信息
 */
export async function updateCommunity(payload) {
  return await Axios.post(`${api.community.update_community}`, payload)
}
/**
 * inviteCode 邀请栏目
 */
export async function inviteCode(payload) {
  return await Axios.post(`${api.community.invite_code}`, payload)
}
/**
 * set_self_community 设置默认栏目
 */
export async function setSelfCommunity(payload) {
  return await Axios.post(`${api.community.set_self_community}`, payload)
}
/**
 * ban 禁言
 */
export async function ban(payload) {
  return await Axios.post(`${api.community.ban}`, payload)
}

/**
 * select_all 
 */
export async function selectAll(payload) {
  return await Axios.post(`${api.closer.select_all}`, payload)
}