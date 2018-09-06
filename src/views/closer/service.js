/**
 * log 获取权限列表
 */
export async function getLog(payload) {
  return await Axios.post(`${api.admin.log}`, payload)
}