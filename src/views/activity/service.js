/**
 * getAllActivity 获取所有活动列表
 */
export async function getAllActivity(payload) {
  return await Axios.post(`${api.activity.getAllActivity}`, payload)
}
/**
 * citylist 获取城市列表
 */
export async function getCityList(payload) {
  return await Axios.post(`${api.region.regions}`, payload)
}

/**
 * newActivity 新建活动
 */
export async function newActivity(payload) {
  return await Axios.post(`${api.activity.newActivity}`, payload)
}

/**
 * updateActivity 编辑活动
 */
export async function updateActivity(payload) {
  return await Axios.post(`${api.activity.updateActivity}`, payload)
}

/**
 * updateActivityStatus 更新活动状态
 */
export async function updateActivityStatus(payload) {
  return await Axios.post(`${api.activity.updateActivityStatus}`, payload)
}

/**
 * closer_activity_list 活动数据
 */
export async function closerActivityList() {
  return await Axios.get(`${api.activity.closer_activity_list}`)
}