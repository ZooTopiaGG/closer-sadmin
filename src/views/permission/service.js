/**
 * getUserList 获取权限列表
 */
export async function getUserList(payload) {
  return await Axios.post(`${api.admin.list}`, payload)
}

/**
 * deleteUser 删除用户
 */
export async function delUserInfo(payload) {
  return await Axios.post(`${api.admin.delete}`, payload)
}

/**
 * getPermissionList 获取权限列表
 */
export async function getMenuList(payload) {
  return await Axios.post(`${api.admin.menulist}`)
}

/**
 * getRegionList 获取城市列表
 */
export async function getRegionList(payload) {
  return await Axios.post(`${api.region.regions}`, payload)
}

/**
 * searchUser 查找用户
 */
export async function searchUser(payload) {
  return await Axios.post(`${api.admin.searchuser}`, payload)
}

/**
 * updateUserInfo 修改用户信息
 */
export async function updateUserInfo(payload) {
  return await Axios.post(`${api.admin.update}`, payload)
}