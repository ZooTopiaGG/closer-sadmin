import axios from 'axios';
import api from './api';
import Store from '../store';
const axio = axios.create({ 
	// baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
	timeout: 15000, // 请求的超时时间
	withCredentials: true // 允许携带cookie
})
console.log('axio--', axio)
// http request 拦截器 
axio.interceptors.request.use(
	config => {
		console.log(config.url)
		let reqUrl = api.serverDevUrl + config.url
		if (/sandbox.tiejin/.test(window.location.href)) {
			reqUrl = api.serverDevUrl + config.url;
		} else if (/admin.tiejin/.test(window.location.href)) {
			reqUrl = api.serverUrl + config.url;
		}
		config.url = reqUrl;
		console.log('config.url===', config.url)
		if (config.url.indexOf('/command/closer_sys.login') === -1 && config.url.indexOf('/command/closer_sys.register') === -1) {
			config.headers.Authorization = "CloserSysAuth " + Store.state.authUser.token;
		}
		return config;
	},
	err => {
		return Promise.reject(err).catch(err);
	});
// http response 拦截器 
axio.interceptors.response.use(
	response => {
		return response;
	},
	(err) => {
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					err.message = '请求错误'
					break

				case 401:
					err.message = '未授权，请登录'
					router.push({
						name: 'worldcupIndex'
					})
					break

				case 403:
					err.message = '拒绝访问'
					router.push({
						name: 'worldcupIndex'
					})
					break

				case 404:
					err.message = `请求地址出错: ${err.response.config.url}`
					break

				case 408:
					err.message = '请求超时'
					break

				case 500:
					err.message = '服务器内部错误'
					break

				case 501:
					err.message = '服务未实现'
					break

				case 502:
					err.message = '网关错误'
					break

				case 503:
					err.message = '服务不可用'
					break

				case 504:
					err.message = '网关超时'
					break

				case 505:
					err.message = 'HTTP版本不受支持'
					break

				default:
			}
		} else {
			err.message = '网络错误，请稍后再试！'
		}
		if (err && err.response && err.response.data && err.response.data.message) {
			console.warn(err.response.data.message)
		} else {
			console.warn(err.message)
		}
		return Promise.reject(err).catch(err)
	});
export default axio