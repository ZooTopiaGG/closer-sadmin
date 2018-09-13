/**
 * getReadList 贴子列表
 */
export async function getReadList(payload) {
  return await Axios.post(`${api.subject.read_list}`, payload)
}

/**
 * readCount 已读条数
 */
export async function getReadCount() {
  return await Axios.get(`${api.subject.read_count}`)
}

/**
 * update_verify 下架操作
 */
export async function setUpdateVerify(payload) {
  return await Axios.post(`${api.subject.update_verify}`, payload)
}

/**
 * update_read 已读操作
 */
export async function setUpdateRead(payload) {
  return await Axios.post(`${api.subject.update_read}`, payload)
}

/**
 * recycle_bin 回收站列表
 */
export async function recycleBin(payload) {
  return await Axios.post(`${api.subject.recycle_bin}`, payload)
}

/**
 * read_count_list 工作量查看列表
 */
export async function workLoad(payload) {
  return await Axios.post(`${api.subject.read_count_list}`, payload)
}

/**
 * feedShow 贴子详情
 */
export async function feedShow(payload) {
  return await Axios.post(`${api.subject.show}`, payload)
}
/**
 * feedComments 评论列表
 */
export async function feedComments(payload) {
  return await Axios.post(`${api.subject.comments}`, payload)
}
/**
 * deleteComment 删除评论
 */
export async function deleteComment(payload) {
  return await Axios.post(`${api.subject.delete_comment}`, payload)
}
/**
 * createVideos 创建播放器
 */
export async function createVideos(payload) {
  return await Axios.get(`${api.subject.videos}`, payload)
}

/**
 * adminSearch 查询封面栏目列表
 */
export async function adminSearch(payload) {
  return await Axios.post(`${api.subject.adminSearch}`, payload)
}
/**
 * coverSetting 设置封面
 */
export async function coverSetting(payload) {
  return await Axios.post(`${api.subject.coverSetting}`, payload)
}

/**
 * getRegionsList 获取城市列表
 */
export async function getRegionsList(payload) {
  return await Axios.post(`${api.region.regions}`, payload)
}