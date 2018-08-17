/**
 * getCode 获取短信验证码
 */
export async function getCode(payload) {
  return await Axios.post(`${api.admin.send_code}`, payload)
}

/**
 * toLogin 去登录
 */
export async function toLogin(payload) {
  return await Axios.post(`${api.admin.login}`, payload)
}

/**
 * toRegister 去注册
 */
export async function toRegister(payload) {
  return await Axios.post(`${api.admin.register}`, payload)
}

/**
 * logout 退出登录
 */
export async function logout() {
  return await Axios.post(`${api.admin.logout}`)
}