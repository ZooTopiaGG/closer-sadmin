/**
 * getUserList 获取权限列表
 */
export async function getUserList(payload) {
  return await Axios.post(`${api.admin.list}`, payload)
}

/**
 * deleteUser 删除用户
 */
export async function deleteUser(payload) {
  return await Axios.post(`${api.admin.delete}`, payload)
}

/**
 * getPermissionList 获取权限列表
 */
export async function getPermissionList(payload) {
  return await Axios.post(`${api.admin.menulist}`, payload)
}

/**
 * getRegionList 获取权限列表
 */
export async function getRegionList(payload) {
  return await Axios.post(`${api.region.regions}`, payload)
}

/**
 * modifyPermission 确认修改权限
 */
export async function modifyPermission(payload) {
  return await Axios.post(`${api.admin.update}`, payload)
}

/**
 * searchUser 查找用户
 */
export async function searchUser(payload) {
  return await Axios.post(`${api.admin.searchuser}`, payload)
}