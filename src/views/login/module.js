import {
  getCode,
  toLogin,
  logout,
  toRegister
} from './service'
import store from '@/store'

export default {
  namespaced: true,
  state: {
    timer: {},
    disabled: false,
    text: '发送验证码',
  },
  mutations: {
    updateCountDown(state) {
      let time = 60;
      state.timer = setInterval(() => {
        time--;
        if (time < 1) {
          clearInterval(state.timer);
          state.text = "重新发送";
          state.disabled = false;
        } else {
          state.disabled = true;
          state.text = `已发送(${time}s)`;
        }
      }, 1000);
    }
  },
  actions: {
    async getCode({
      commit,
      state
    }, payload) {
      commit('updateCountDown')
      let {
        data
      } = await getCode(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("发送成功！");
      } else {
        clearInterval(state.timer)
        state.text = "重新发送";
        state.disabled = false;
        $message.success(data.result);
      }
    },
    async toLogin({
      commit,
      state
    }, payload) {
      let {
        data
      } = await toLogin(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("登录成功");
        // 存cookie
        let user = data.result.sysUser
        let base = {
          uid: user.id,
          username: user.username,
          type: user.type,
          columnCity: user.columnCity, // 城市权限 
          permissions: user.permissions, // 权限列表
          pushCity: user.pushManageCity,
          phone: user.phone,
        };
        store.state.authUser = base;
        store.state.token = data.result.token;
        localStorage.setItem('_ucloser', JSON.stringify(base))
        Cookies.set('_tcloser', data.result.token, {
          expires: 7
        })
        return true
      } else {
        $message.error(data.result)
      }
    },
    async toRegister({
      commit
    }, payload) {
      let {
        data
      } = await toRegister(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success('注册成功，前往登录...')
        return true
      } else {
        $message.error(data.result)
      }
    },
    async logout({
      commit,
      state
    }) {
      let {
        data
      } = await logout().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code != 0) {
        throw new Error(data.result)
      } else {
        localStorage.removeItem('_ucloser');
        Cookies.remove('_tcloser');
        store.state.token = '';
        store.state.authUser = {};
      }
    }
  },
};