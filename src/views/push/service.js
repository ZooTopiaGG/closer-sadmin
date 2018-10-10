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
 * log 获取权限列表
 */
export async function getLog(payload) {
  return await Axios.post(`${api.admin.log}`, payload)
}