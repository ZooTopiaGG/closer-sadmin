/**
 * subjectPushAdd 建立推送
 */
export async function subjectPushAdd(payload) {
  return await Axios.post(`${api.push.subject_push_add}`, payload)
}

/**
 * subjectPushList 推送列表
 */
export async function subjectPushList(payload) {
  return await Axios.post(`${api.push.subject_push_list}`, payload)
}

/**
 * all_regions 所有城市列表
 */
export async function allRegions() {
  return await Axios.get(`${api.region.all_regions}`)
}

/**
 * log 获取权限列表
 */
export async function getLog(payload) {
  return await Axios.post(`${api.admin.log}`, payload)
}