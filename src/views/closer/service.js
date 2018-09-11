/**
 * select_all 
 */
export async function selectAll(payload) {
  return await Axios.post(`${api.closer.select_all}`, payload)
}
/**
 * update_classref 
 */
export async function updateClassref(payload) {
  return await Axios.post(`${api.closer.update_classref}`, payload)
}
/**
 * getclass_by_communityId 
 */
export async function getclassByCommunityId(payload) {
  return await Axios.post(`${api.closer.getclass_by_communityId}`, payload)
}
/**
 * insert_class 
 */
export async function insertClass(payload) {
  return await Axios.post(`${api.closer.insert_class}`, payload)
}
/**
 * delete_class 
 */
export async function deleteClass(payload) {
  return await Axios.post(`${api.closer.delete_class}`, payload)
}
/**
 * update_class 
 */
export async function updateClass(payload) {
  return await Axios.post(`${api.closer.update_class}`, payload)
}
/**
 * select_class 
 */
export async function selectClass(payload) {
  return await Axios.post(`${api.closer.select_class}`, payload)
}

/**
 * select_class_like 
 */
export async function selectClassLike(payload) {
  return await Axios.post(`${api.closer.select_class_like}`, payload)
}
/**
 * update_class_status 
 */
export async function updateClassStatus(payload) {
  return await Axios.post(`${api.closer.update_class_status}`, payload)
}