/**
 * getRegionsList 获取城市列表
 */
export async function getRegionsList(payload) {
  return await Axios.post(`${api.region.regions}`, payload)
}

/**
 * setBindAC 设置发公共栏目
 */
export async function setBindAnnounceCommunity(payload) {
  return await Axios.post(`${api.community.set_bind_announce_community}`, payload)
}

/**
 * setBindAC 设置发公共栏目
 */
export async function getBindAnnounceCommunity() {
  return await Axios.get(`${api.community.get_bind_announce_community}`)
}

/**
 * addRegion 添加城市
 */
export async function addRegion(payload) {
  return await Axios.post(`${api.region.add}`, payload)
}

/**
 * showCommunity 查找栏目信息
 */
export async function showCommunity(payload) {
  return await Axios.post(`${api.community.show}`, payload)
}

/**
 * updateRegion 更新城市
 */
export async function updateRegion(payload) {
  return await Axios.post(`${api.region.update}`, payload)
}

/**
 * showRegion 城市信息
 */
export async function showRegion(payload) {
  return await Axios.post(`${api.region.show}`, payload)
}