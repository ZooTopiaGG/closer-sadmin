/**
 * activity_water_list 太极兵活动数据
 */
export async function activityWaterList(payload) {
  return await Axios.post(`${api.activity.activity_water_list}`, payload)
}