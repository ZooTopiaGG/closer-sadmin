import axios from 'axios';
import server from './server';
import Store from '../store';
const axio = axios.create({ 
	// baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
	timeout: 15000, // 请求的超时时间
	withCredentials: true // 允许携带cookie
})
let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法
	loading = $loading({
		lock: true,
		text: '加载中……',
		target: document.getElementById('loadingMain')
	})
}

function endLoading() { //使用Element loading-close 方法
	loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading()
	}
	needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return
	needLoadingRequestCount--
	if (needLoadingRequestCount === 0) {
		endLoading()
	}
}
// http request 拦截器 
axio.interceptors.request.use(
	config => {
		if (Store.state.loadingMain) {
			showFullScreenLoading()
		}
		let reqUrl = server.serverDevUrl + config.url
		if (/s1-sandbox.tiejin/.test(window.location.href)) {
			reqUrl = 'https://api-sandbox.tiejin.cn/command/' + config.url;
		} else if (/sadmin-qa.tiejin/.test(window.location.href)) {
			reqUrl = server.serverDevUrl + config.url;
		} else if (/admin.tiejin/.test(window.location.href)) {
			reqUrl = server.serverUrl + config.url;
		} else if (/admin-test.tiejin/.test(window.location.href)) {
			reqUrl = server.serverUrl + config.url;
		}
		config.url = reqUrl;
		if (config.url.indexOf('/command/closer_sys.login') === -1 && config.url.indexOf('/command/closer_sys.register') === -1 && config.url.indexOf('/command/closer_sys.send_code') === -1) {
			try {
				let t = Cookies.get('_tcloser') || Store.state.token;
				config.headers.Authorization = "CloserSysAuth " + t;
			} catch (e) {
				console.log(e)
			}
		}
		return config;
	},
	err => {
		tryHideFullScreenLoading();
		return Promise.reject(err).catch(err);
	});
// http response 拦截器 
axio.interceptors.response.use(
	response => {
		tryHideFullScreenLoading();
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
			tryHideFullScreenLoading();
			err.message = '网络错误，请稍后再试！'
		}
		if (err && err.response && err.response.data && err.response.data.message) {
			console.warn(err.response.data.message)
		} else {
			console.warn(err.message)
		}
		tryHideFullScreenLoading();
		return Promise.reject(err).catch(err)
	});
export default axio