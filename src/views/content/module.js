import {
  getReadList,
  getReadCount,
  setUpdateVerify,
  setUpdateRead,
  recycleBin,
  workLoad,
  feedShow,
  feedComments,
  deleteComment,
  createVideos,
  adminSearch,
  coverSetting,
  getRegionsList
} from './service'

export default {
  namespaced: true,
  state: {
    readList: {
      data: [],
      count: 0
    },
    readList2: {
      data: [],
      count: 0
    },
    readCount: 0,
    busy: false,
    loading_text: '正在加载',
    current_payload: {
      flag: 0,
      pagenum: 1,
      pagesize: 10,
      keywords: "",
      startTime: null,
      endTime: null
    },
    recycleList: {},
    readCountList: {},
    // 长图文内容 
    res: {},
    content: {},
    discuss: {},
    messagelist: {
      data: [],
      count: 0
    },
    videosInfo: {},
    coverList: {
      data: [],
      count: 0
    },
    regionsList: [],
    defaultRegion: ''
  },
  mutations: {
    readList(state, para) {
      state.readList = para;
    },
    readList2(state, para) {
      state.readList2 = para;
    },
    readCount(state, para) {
      state.readCount = para
    },
    recycleList(state, para) {
      state.recycleList = para
    },
    readCountList(state, para) {
      state.readCountList = para
    },
    res(state, para) {
      state.res = para
    },
    content(state, para) {
      state.content = para
    },
    discuss(state, para) {
      state.discuss = para
    },
    messagelist(state, para) {
      state.messagelist = para
    },
    coverList(state, para) {
      state.coverList = para
    },
    regionsList(state, para) {
      state.regionsList = para
    },
    defaultRegion(state, para) {
      state.defaultRegion = para
    }
  },
  actions: {
    // falg=(0-未读 1-已读)&pagenum=&pagesize=&keywords=(可选)&startTime=(已读可选)&endTime=(已读可选)    
    async getReadList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getReadList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          // let arr = await data.result.result1.data.map(x => {
          x.content = JSON.parse(x.content);
          x.long_create_time = $async.getCommonTime(
            x.long_create_time,
            "yy-mm-dd hh:MM"
          );
          x.long_update_time = $async.createTime(
            x.long_update_time,
            "yy-mm-dd hh:MM"
          );
          return x;
        });
        // data.result.result1.data = state.readList.data.concat(arr)
        data.result.data = state.readList.data.concat(arr)
        state.current_payload = payload;
        // commit('readList', data.result.result1)
        commit('readList', data.result)
      } else {
        $message.error(data.result);
      }
    },
    async getReadList2({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getReadList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        // 待发布
        await data.result.data.map(x => {
          // await data.result.result1.data.map(x => {
          x.content = JSON.parse(x.content);
          // 判断是否有title 没有用text替换
          if (x.int_type === 2) {
            x.title = x.title;
          } else {
            x.title = x.content.text;
          }
          if (!x.bool_tip) {
            x.bool_tip = "-";
          }
          if (!x.drop_reason) {
            x.drop_reason = "-";
          }
          x.long_update_time = $async.createTime(
            x.long_update_time,
            "yy-mm-dd hh:MM"
          );
          return x;
        });
        // commit('readList2', data.result.result1)
        commit('readList2', data.result)
      } else {
        $message.error(data.result);
      }
    },
    loadMore({
      commit,
      dispatch,
      state
    }) {
      if (state.readList.data.length === state.readList.count && state.readList.data.length != 0) {
        state.busy = true;
        return
      }
      setTimeout(() => {
        state.current_payload['pagenum'] += 1
        dispatch('getReadList', state.current_payload)
        state.busy = false
      }, 500)
    },
    async getReadCount({
      commit
    }) {
      let {
        data
      } = await getReadCount().catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('readCount', data.result)
      }
    },
    async setUpdateVerify({
      commit
    }, payload) {
      let {
        data
      } = await setUpdateVerify(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        if (payload['flag'] === 1) {
          $message.success("上墙成功");
        } else {
          $message.success("下架成功");
        }
        return true
      } else {
        $message.error(data.result);
      }
    },
    async setUpdateRead({
      commit,
      state
    }, payload) {
      let {
        data
      } = await setUpdateRead(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        state.readCount += 1
        return true
      } else {
        $message.error(data.result);
      }
    },
    async recycleBin({
      commit,
      state
    }, payload) {
      let {
        data
      } = await recycleBin(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = data.result.data.map(x => {
          x.long_update_time = $async.createTime(
            x.long_update_time,
            "yy-mm-dd hh:MM"
          );
          // 判断是否有title 没有用text替换
          if (x.int_type === 2) {
            x.title = x.title;
          } else {
            x.title = x.content.text;
          }
          return x;
        });
        commit('recycleList', data.result)
      } else {
        $message.error(data.result);
      }
    },
    async workLoad({
      commit,
      state
    }, payload) {
      let {
        data
      } = await workLoad(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('readCountList', data.result)
      } else {
        $message.error(data.result);
      }
    },
    async feedShow({
      commit,
      state
    }, payload) {
      let {
        data
      } = await feedShow(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        if (data.result.content) {
          var content = JSON.parse(data.result.content);
          if (content.discuss) {
            var discuss = content.discuss;
          }
        }
        // 返回在渲染页面之前得结果
        commit('res', data.result);
        commit('content', content);
        commit('discuss', discuss);
      } else {
        $message.error(data.result);
      }
    },
    async feedComments({
      commit,
    }, payload) {
      let {
        data
      } = await feedComments(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('messagelist', data.result);
      } else {
        $message.error(data.result);
      }
    },
    async deleteComment({
      commit,
      state
    }, payload) {
      let {
        data
      } = await deleteComment(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        if (payload['type'] === "parent") {
          state.messagelist.data.splice(payload['index'], 1);
        } else {
          state.messagelist.data[payload['index']].sonList.splice(payload['index1'], 1);
        }
      }
    },
    async createVideos({
      commit,
      state
    }, payload) {
      let {
        data
      } = await createVideos(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let r = data.result;
        let player = new Aliplayer({
            id: payload.vid,
            width: "100%",
            autoplay: false,
            prismType: 2,
            vid: payload.vid, //self.content.videos[0].vid
            playauth: "",
            playsinline: true, //app内播放设置
            qualitySort: "desc", //清晰度切换
            cover: payload.cover, //self.content.videos[0].imageUrl
            accessKeyId: r.accessKeyId,
            securityToken: r.securityToken,
            accessKeySecret: r.accessKeySecret
          },
          function (player) {
            console.log("播放器创建好了。");
          }
        )
      }
    },
    async getRegionsList({
      commit
    }, payload) {
      let {
        data
      } = await getRegionsList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        commit('regionsList', data.result.data);
        if (data.result.data.length > 0) {
          let defaultRegion;
          let arr = await data.result.data.map(x => {
            return x.region_id;
          });
          if (arr.includes("wfXYXEpsBEyN")) {
            defaultRegion = "wfXYXEpsBEyN";
          } else if (arr.includes("0")) {
            defaultRegion = "0";
          } else if (arr.includes("wsJK3jZqhgxR")) {
            defaultRegion = "wsJK3jZqhgxR";
          } else if (arr.includes("wghHCWxHxgYV")) {
            defaultRegion = "wghHCWxHxgYV";
          } else if (arr.includes("wg2JligjGo3a")) {
            defaultRegion = "wg2JligjGo3a";
          } else {
            defaultRegion = arr[0].region_id;
          }
          commit('defaultRegion', defaultRegion)
          return defaultRegion
        } else {
          return false
        }

      } else {
        $message.error(data.result)
      }
    },
    async adminSearch({
      commit
    }, payload) {
      let {
        data
      } = await adminSearch(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          x.long_publish_time = $async.createTime(
            x.long_publish_time,
            "yy-mm-dd hh:MM"
          );
          return x;
        });
        let res = {
          data: arr,
          count: data.result.count
        };
        commit('coverList', res)
      }
    },
    async coverSetting({
      commit
    }, payload) {
      let {
        data
      } = await coverSetting(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        if (data.result) {
          $message.success("操作成功！");
          return true
        } else {
          $message.error("操作失败！贴子不存在或者已经通过其他方式下线了。")
          return false
        }
      }
    },
  }
};