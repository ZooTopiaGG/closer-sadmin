<template>
  <section id="permission">
    <section class="permission_title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/content' }">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>贴子详情</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="feed-details flex flex-pack-center" v-if="exist">
      <section class="feed-1">
        <section class="flex flex-align-center flex-pack-justify">
          <section>
            <section class="feeder-cover">
              <img class="access-not" v-lazy="$com.makeFileUrl(res.blogo)">
            </section>
            <!-- 发帖者信息 -->
            <section class="feeder-info">
              <span v-if="res.double_latitude != -999">{{ res.className }}</span>
              <span v-else>官方出品</span>
              <span>@{{ res.username }}出品</span>
              <span class="dp-text-color"> / </span>
              <span>{{ $com.getCommonTime(res.long_create_time, 'yy-mm-dd hh:MM') }}</span>
            </section>
          </section>
          <section>
            <el-button @click.stop="dropoff">删 除</el-button>
          </section>
        </section>
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <section class="feed-doc" v-if="res.int_type === 0">
          <section class="feeder-title feeder-title-2">{{ content.text }}</section>
          <!-- 图片排列  需判断GIF -->
          <section>
            <section class="feeder-img flex flex-pack-justify" v-if="content.images.length == 1">
              <section class="feeder-img-list" v-for="(img, index) in content.images" style="width: 100%;height:100%;" :key="index">
                <img class="feed-cover" v-lazy="$com.makeFileUrl(img.link)">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </section>
            </section>
            <section class="feeder-img flex flex-pack-justify" v-else-if="content.images.length == 2">
              <section class="feeder-img-list" v-lazy:backgroundImage="$com.makeFileUrl(img.link)" v-for="(img, index) in content.images" :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                :key="index">
                <img class="feeder-cover-list">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </section>
            </section>
            <section class="feeder-img flex" v-else-if="content.images.length == 3 || content.images.length > 4">
              <section class="feeder-img-list" v-lazy:backgroundImage="$com.makeFileUrl(img.link)" v-for="(img, index) in content.images" :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                :key="index">
                <img class="feeder-cover-list">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </section>
            </section>
            <section class="feeder-img flex flex-pack-justify" v-else-if="content.images.length == 4">
              <section class="feeder-img-list" v-lazy:backgroundImage="$com.makeFileUrl(img.link)" v-for="(img, index) in content.images" :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                :key="index">
                <img class="feeder-cover-list">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </section>
            </section>
          </section>
        </section>
        <!-- 视频 -->
        <section class="feed-doc" v-else-if="res.int_type === 1">
          <section class="feeder-title feeder-title-2">{{ content.text }}</section>
          <section :id="content.videos[0].vid" :vid="content.videos[0].vid" :cover="content.videos[0].imageUrl"></section>
        </section>
        <!-- res.int_type==2长图文。int_category=== 3 神议论 1是征稿 -->
        <section class="feed-doc" v-else-if="res.int_type === 2">
          <section class="feeder-img" style="position:relative;" v-if="res.cover">
            <img class="feed-cover" style="width: 100%; display:block;" v-lazy="$com.makeFileUrl(res.cover)">
          </section>
          <section class="feeder-content">
            <section class="feeder-title">{{ res.title }}</section>
            <section class="summary" id="tjimg" v-html="content.html"></section>
            <!-- 神议论列表 -->
            <ul class="feeder-comments" v-if="res.int_category === 3">
              <li class="feeder-comments-cell flex flex-v flex-align-start" v-for="(item, index) in _discuss" :key="index">
                <section class="flex flex-v">
                  <section style="margin-bottom: 10px" class="flex flex-pack-justify flex-align-center">
                    <section class="feeder-comment-info flex flex-align-center">
                      <i v-lazy:backgroundImage="$com.makeFileUrl(item.avatar)" :style="{ backgroundSize: 'cover' }"></i>

                      <span>{{ item.nickname }}</span>
                    </section>
                    <section class="feeder-comment-nickname flex flex-align-center">
                      <span>{{ $com.getCommonTime(item.createTime, 'yy/mm/dd') }}</span>
                    </section>
                  </section>
                  <!-- 纯文本 link text-->
                  <section v-if="item.type === 0" class="feeder-comment">
                    <span v-if="item.weblink" v-html="item.newText"></span>
                    <span v-else>{{ item.text }}</span>
                  </section>
                  <!-- 包含图片 -->
                  <section v-else-if="item.type === 1" class="feeder-comment">
                    <section style="position:relative;">
                      <img class="feeder-comment-img" v-lazy="$com.makeFileUrl(item.image.link)">
                      <span class="gif" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span>
                    </section>
                  </section>
                  <!-- 包含贴子 -->
                  <section v-else-if="item.type === 3" class="feeder-comment flex flex-align-center feeder-comment-3">
                    <section class="feeder-comment-3-cover flex">
                      <i v-if="item.feed.imageUrl" v-lazy:backgroundImage="$com.makeFileUrl(item.feed.imageUrl)" :style="{ backgroundSize: 'cover', backgroundPosition: 'center center' }"></i>
                    </section>
                    <section style="height: 100%" class="flex-1 flex flex-v flex-pack-start">
                      <section class="feeder-comment-3-title">{{ item.feed.title }}</section>
                      <section class="feeder-comment-3-summary flex-1">{{ item.feed.summary }}</section>
                    </section>
                  </section>
                </section>

              </li>
            </ul>
          </section>
        </section>
      </section>
    </section>
    <section class="not-exist" v-else>
      <span>贴子已经被删除</span>
    </section>
    <section class="message-board flex flex-pack-center" v-if="!(res.int_type === 2 && res.int_category === 1)">
      <section class="feed-1" v-if="res.commentNumber > 0">
        <section class="message-board-title">{{ res.commentNumber }} 条留言</section>
        <section class="message">
          <ul class="message-list">
            <li class="message-list-cell" v-for="(item, index) in messagelist.data" :key="index">
              <section class="message-list-cell-userinfo flex flex-align-center">
                <img v-lazy="$com.makeFileUrl(item.user.attributes.roster.avatar) || $com.makeFileUrl(item.user.avatar)" alt="图片" width="38"
                  height="38">
                <section class="userinfo flex flex-v">
                  <span class="userinfo-name">{{ item.user.attributes.roster.name || item.user.fullname }}</span>
                  <span class="userinfo-time">{{ $com.getCommonTime(item.long_create_time, 'yy-mm-dd hh:MM') }}</span>
                </section>
              </section>
              <section class="message-list-cell-message flex flex-align-start">
                <span>{{ item.content }}</span>
                <span class="del-parent flex" @click="sure_del_message(item.commentid, index, -1, 'parent')">
                  <span class="del"></span>
                </span>
              </section>
              <section class="message-list-cell-reply" v-if="item.sonList.length > 0">
                <section class="flex flex-align-start" v-for="(item1, index1) in item.sonList" :key="index1">
                  <span>{{ item1.user.fullname }}：</span>
                  <span>{{ item1.content }}</span>
                  <span class="del-parent flex" @click="sure_del_message(item1.commentid, index,index1, 'child')">
                    <span class="del"></span>
                  </span>
                </section>
              </section>
            </li>
          </ul>
        </section>
      </section>
    </section>
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <section>
        <p>选择以下原因后下架：</p>
        <el-checkbox-group v-model="checkList" class="dropreason flex">
          <el-checkbox label="垃圾营销"></el-checkbox>
          <el-checkbox label="不实信息"></el-checkbox>
          <el-checkbox label="有害信息"></el-checkbox>
          <el-checkbox label="违法信息"></el-checkbox>
          <el-checkbox label="淫秽色情"></el-checkbox>
          <el-checkbox label="人身攻击"></el-checkbox>
          <el-checkbox label="抄袭我的内容"></el-checkbox>
          <el-checkbox label="违规有奖活动"></el-checkbox>
        </el-checkbox-group>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateVerify">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import Vue from "vue/dist/vue.js";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("content", ["res", "content", "discuss", "messagelist"]),
    _discuss() {
      if (this.discuss) {
        let arr = this.discuss.map((x, index) => {
          if (x.text) {
            let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
            let res = x.text.match(reg);
            if (res) {
              this.$set(x, "weblink", true);
              res.map(y => {
                // 正则替换文本
                let tag = `<a href="${y}" target="_blank">${y}</a>`;
                let newtag = x.text.replace(reg, tag);
                this.$set(x, "newText", newtag);
              });
            } else {
              this.$set(x, "weblink", false);
            }
          }
          return x;
        });
        return arr;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      showpara: {
        subjectid: null
      },
      dialogVisible: false,
      checkList: [],
      exist: true
      // 投稿类型
    };
  },
  created() {
    this.showpara["subjectid"] = this.$route.params.id;
    this.feedShow(this.showpara);
  },
  methods: {
    ...mapActions("content", [
      "feedShow",
      "feedComments",
      "deleteComment",
      "createVideos",
      "setUpdateVerify"
    ]),
    // int_type
    // 0-图片,1-视频,2-长图文 （判断贴子类型）
    // 贴子类型：int_category（判断是否有留言功能）
    // 0 - 普通贴子(用户投到栏目的) 有
    // 1 - 征稿(栏目运营人员发出) 没有留言功能
    // 2 - 投稿到征稿(用户投的)
    // 3 - 神议论(班长合成的)
    // 5 - 官方普通(栏目运营人员发出的)
    // 删除留言
    async del_message(commentid, index, index1, type) {
      let self = this;
      await self.deleteComment({
        subjectid: self.$route.params.id,
        commentid: commentid,
        type,
        index,
        index1
      });
    },
    // 确认删除
    async sure_del_message(commentid, index, index1, type) {
      let self = this;
      let confirm =
        type === "parent"
          ? `删除主留言会一同删除回复留言，确定删除？`
          : `确定删除留言？`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.del_message(commentid, index, index1, type);
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async dropoff() {
      let self = this;
      self.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 更新上墙 下架状态
    async updateVerify() {
      let self = this;
      let res = await self.setUpdateVerify({
        subjectid: self.$route.params.id,
        flag: -1, // -1 下架 1 上墙
        drop_reason: self.checkList // 举报信息
      });
      if (res) {
        self.dialogVisible = false;
      }
    }
  },
  mounted() {
    let self = this;
    self.feedComments({
      subjectid: self.$route.params.id
    });
    setTimeout(async () => {
      // 在前端执行播放视频
      if (self.res.int_type === 1) {
        self.createVideos({
          vid: self.content.videos[0].vid,
          cover: self.content.videos[0].imageUrl
        });
      }
      // if (self.res.int_type === 2) {
      //   let v = document.querySelectorAll("video");
      //   if (v && v.length > 0) {
      //     Array.prototype.forEach.call(v, (x, i) => {
      //       self.createVideos({
      //         vid: x.getAttribute("vid"),
      //         cover: x.getAttribute("cover") || x.getAttribute("poster")
      //       });
      //     });
      //   }
      // }
    }, 1000);
  }
};
</script>
<style>
/*播放器 样式调整*/

p:empty {
  margin: 0;
  padding: 0;
}

.summary > section > p,
.summary > section > ol,
.summary > section > ul,
.summary > section > div,
.summary > section > section,
.summary > section > article,
.summary > section > aside {
  margin-bottom: 10px;
  word-break: break-all;
}

.summary {
  text-align: justify;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 1.8;
}

.summary img,
.summary video {
  max-width: 600px;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.prism-volume {
  margin-left: 10px;
}

.prism-player .prism-controlbar {
  height: 40px;
}

.prism-player .prism-big-play-btn {
  width: 48px;
  height: 48px;
}

.prism-player .prism-liveshift-progress,
.prism-player .prism-progress {
  height: 2px;
}

.prism-player .prism-progress:hover {
  height: 2px;
}

.prism-player .prism-liveshift-progress .prism-progress-cursor,
.prism-player .prism-progress .prism-progress-cursor {
  top: -4px;
  border: 6px solid #00c1de;
}

.prism-player .prism-controlbar .prism-controlbar-bg {
  height: 36px;
}

.prism-progress {
  bottom: 36px !important;
}

.prism-player .prism-play-btn {
  height: 24px;
  line-height: 24px;
}

.prism-player .prism-time-display {
  height: 32px;
  line-height: 32px;
}

.prism-player .prism-fullscreen-btn {
  height: 24px;
  width: 24px;
}

.prism-player .prism-volume .volume-control-icon,
.prism-player .prism-volume .volume-icon {
  height: 24px;
}

.prism-player .prism-volume .volume-control {
  bottom: 32px;
  left: -9px;
  width: 34px;
}

.prism-player .prism-volume .hover .volume-range {
  width: 2px;
}

.prism-player .prism-volume .hover .volume-cursor {
  left: -6px;
}

.prism-stream-selector,
.prism-speed-selector {
  font-size: 13px;
  line-height: 24px;
}

.learn-more.ivu-btn-text:focus {
  box-shadow: none;
}

.lg-preview-nav-arrow {
  border-top: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
}

.prism-stream-selector .current-stream-selector {
  width: 45px;
}

.feeder-comments .dp-border-show {
  border-left: 1px solid #fddb00;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
}

.video-player {
  margin: 20px 0;
}
</style>
<style scoped>
.videos-feed {
  width: 100%;
}
.dropreason {
  margin-top: 10px;
  flex-wrap: wrap;
}
.feed-details {
  background: #fff;
  padding-top: 30px;
}

.feed-1 {
  width: 625px;
  padding-bottom: 30px;
}

.feed-doc {
  padding-bottom: 30px;
}

.feeder-title {
  font-size: 20px;
  margin: 20px 0;
  font-weight: bold;
}

.feeder-title-2 {
  font-weight: 400;
}

.feeder-cover > img {
  height: 36px;
  border-radius: 5px;
}

.feeder-img {
  width: 100%;
  flex-wrap: wrap;
}

.hide-over {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  z-index: 9999;
}

.messager-info > img {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin-right: 10px;
}
.feed-1 img {
  box-shadow: 1px 0px 3px #eee;
}
.feeder-info {
  margin: 10px 0 20px;
}

.feed-messagebord {
  height: 8px;
  border-bottom: 1px solid #eee;
}

.feed-messagebord-type {
  height: 8px;
  color: #444;
  font-weight: bold;
}

.feed-messagebord-left {
  font-size: 15px;
  color: #444;
  font-weight: 600;
}

.messager-comment {
  color: #444;
  font-weight: 600;
}

.feed-messagebord-list-cell {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.messager-content {
  margin: 20px 0;
}

.messager-time {
  font-size: 12px;
  color: #999;
}

.feeder-img-list {
  position: relative;
  overflow: hidden;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}

.feed-cover-list {
  width: 100%;
  display: block;
}

.feeder-cover-list {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  display: block;
}

.gif {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
}

.feeder-comments {
  margin-top: 40px;
}

.feeder-comments-cell {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(243, 243, 243);
  margin-bottom: 20px;
  padding: 20px;
}

.feeder-comment-info {
  margin-right: 15px;
}

.feeder-comment-info > i {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
}

.feeder-comment-3 {
  height: 104px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d7d7d9;
  background: #f6f6f6;
}

.feeder-comment-3-cover > i {
  display: block;
  margin-right: 20px;
  width: 86px;
  height: 86px;
  border-radius: 6px;
}

.feeder-comment-3-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.feeder-comment-3-summary {
  font-size: 13px;
  color: rgba(148, 146, 142, 1);
}

.feeder-comment-nickname {
  font-size: 12px;
  color: rgba(148, 146, 142, 1);
  line-height: 1;
}

.feeder-comment-img {
  width: 100%;
  border-radius: 3px;
}

.messager-comments {
  padding: 10px 2px;
  background-color: #f4f4f4;
  margin-bottom: 2px;
}

.messager-comments-cell {
  box-sizing: border-box;
  padding: 5px 0;
}

.not-exist {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.message-board {
  background: #fff;
}

.message-board-title {
  margin-bottom: 20px;
}

.message-list-cell {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f4f4f4;
}

.message-list-cell-userinfo {
  margin-bottom: 10px;
}

.message-list-cell-userinfo img {
  border-radius: 100%;
  margin-right: 10px;
}

.message-list-cell-userinfo .userinfo-time {
  color: #808080;
  font-size: 12px;
}

.del-parent {
  margin-left: 20px;
  padding: 3px 10px 6px;
}

.del {
  width: 16px;
  height: 16px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACCklEQVRoQ+1YPU/bUBQ910iBAapOFTAy8RNAjKitnYGYH1DFQh1YWJhATCAETF2qblXriB9AzIBDUccK8Q+YOkLVBfEhoUSKb2WrSRAkfteKYyXwPOYdn/fOOffePJkw4A8N+PmhBTQSfF8obhtEG6JEGTu+58qwCsLUErBs5wrAa4kABq4rZVeEVfGlJmDgE1A51av11BLo1QFVvM9XQKKaVtnU7XrM1OqYQJKp0u35VO/HTa2OAgY+AZUr/bL+fJu4XxxWnUOUQLMfYqZBlpiHokQCzIJzT4QRMKq+5460cyVLTGIBlu1w4yW/7LYVnSVGC2hXQjqB/65IjNAlpEsIQDfTTJeQLiFdQq0aEN2FJLM5S4xuYt3Euol1Ez/tAj2F9HU65vtFluUh2evl/ZGZdvGWQKOhcqph4ujI/fM4MIlzKkw+74xzDpchN4PvKuXSWCoftqyCcwrCTETMWK947l4vBJgFZ40IuxE348z33GjPuEd0mTNtxyHge5OIeatuBF9+HOz/bfymcjfEdcK8W/zwZigwlkG02eALmJeOvVJrzw4qRALCyjHt4i8CzaocSWOdwaeVcmkuyiGNBEKOtwtLk0MU/CTCtIq0m3VmnNfZmD85/HYh4ZEmEHFZ1spwkLv5aBCtApiSbJAA8ztg/mTUXn31/c9V6XuJBEhJs8RpAVm63W6vf9lIGk+G0DVPAAAAAElFTkSuQmCC")
    no-repeat;
  background-size: cover;
}

.message-list-cell-reply {
  padding: 5px 10px;
  background: #f4f4f4;
  margin-top: 10px;
}
</style>