/**
 * configlist 配置列表
 */
export async function getConfigList() {
  return await Axios.get(`${api.config.config_list}`)
}

/**
 * resetConfig 修改配置
 */
export async function resetConfig(payload) {
  return await Axios.post(`${api.config.reset_config}`, payload)
}