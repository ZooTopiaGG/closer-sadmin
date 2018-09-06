/**
 * getQuestionList 获取活动题目列表
 */
export async function getQuestionList(payload) {
  return await Axios.post(`${api.activity.tuzhu.get_question_list}`, payload)
}
/**
 * uploadQuestions 保存上传题目配置
 */
export async function uploadQuestions(payload) {
  return await Axios.post(`${api.activity.tuzhu.upload_questions}`, payload)
}
/**
 * get_tuzhu_statistics 土著活动统计
 */
export async function getTuzhuStatisticsList(payload) {
  return await Axios.post(`${api.activity.tuzhu.get_tuzhu_statistics}`, payload)
}

export async function localQuestionList(payload) {
  return payload
}