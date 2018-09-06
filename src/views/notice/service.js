/**
 * getAllUser 获取用户列表
 */
export async function getAllUser() {
  return await Axios.get(`${api.notify.all_user}`)
}
/**
 * get_notify_rules 获取预警配置
 */
export async function getNotifyRules(payload) {
  return await Axios.post(`${api.notify.get_notify_rules}`, payload)
}
/**
 * update_rules 修改预警配置
 */
export async function updateRules() {
  return await Axios.get(`${api.notify.update_rules}`)
}
/**
 * add_user
 */
export async function addUser(payload) {
  return await Axios.post(`${api.notify.add_user}`, payload)
}
/**
 * update_user
 */
export async function updateUser(payload) {
  return await Axios.post(`${api.notify.update_user}`, payload)
}
/**
 * delete_user 
 */
export async function deleteUser(payload) {
  return await Axios.post(`${api.notify.delete_user}`, payload)
}
/**
 * user_byphone
 */
export async function userByPhone(payload) {
  return await Axios.post(`${api.notify.user_byphone}`, payload)
}
/**
 * user_bymail t
 */
export async function userByMail(payload) {
  return await Axios.post(`${api.notify.user_bymail}`, payload)
}