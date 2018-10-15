<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">内容审核</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <el-select class='list-filter-select' @change="handleSelect" v-model="fliterVerify" placeholder="贴子状态">
          <el-option v-for="item in verify.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <section class="flex flex-align-center">
          <el-input v-model="seachbytitle" placeholder="请输入贴子标题全称" @keyup.enter.native="handleSelect">
            <el-button slot="append" @click="handleSelect" icon="el-icon-search"></el-button>
          </el-input>
        </section>
        </section>
        <section class="flex flex-align-center">
          <el-select class='list-filter-select' @change="handleSelect" v-model="fliterfeeds" placeholder="贴子状态">
            <el-option v-for="item in feeds.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <a class="yetread" v-if="authUser.type != 1" @click="read" href="javascript:;">已读条数：{{readCount}}</a>
          <el-button icon="el-icon-delete" v-if="fliterVerify === 0" @click="recover(0)">普通回收站</el-button>
          <el-button icon="el-icon-delete" v-else @click="recover(-1)">精华回收站</el-button>
        </section>
      </section>
      <!-- feed流 -->
      <ul v-if="readList2.data.length > 0" id="feed" ref="feedList" class="feed-list flex-1">
        <li class="feed-list-cell" @click="toFeeds(item.subjectid)" v-for="(item, index) in readList2.data" :key="index" :sub="item.subjectid" :status='fliterfeeds === 0'>
          <section class="feed-box">
            <section class="feed-cell-title flex flex-align-center flex-pack-justify">
              <p class="flex">
                <span>更新于：{{ item.long_update_time }}</span>
                &nbsp;&nbsp;&nbsp;
                <span class="isRead">已读</span>
              </p>
              <el-button @click.stop="dropoff(item.subjectid, index, -1)">删 除</el-button>
            </section>
            <section class="hasreport flex flex-align-start" v-if="item.report_list && item.report_list.length > 0">
              <span>投诉理由：</span>
              <section class="report-list flex flex-v">
                <span :key="reportIndex" v-for="(reportItem, reportIndex) in item.report_list">{{ reportItem. reportContents }}（{{ reportItem. reportCount }}）</span>
              </section>
            </section>
            <section class="feed-cell-content">
              <section class="columnname flex flex-align-center">
                <img :src="$com.makeFileUrl(item.blogo) || $com.makeFileUrl(item.user.avatar) || defaultImg">
                <span class="name text-ellipse flex-1">{{ item.communityName || item.user.fullname || ''}}</span>
                <span class="time">{{ item.long_create_time }}</span>
              </section>
              <!-- 贴子详情 -->
              <!-- 纯图片类型 int_type == 0-->
              <section class="feedmain" v-if="item.int_type === 0">
                <section v-if="item.content.text" class="feedtitle text-ellipse">
                  {{ item.content.text }}
                </section>
                <section v-if="item.content.images && item.content.images.length == 1" class="flex flex-pack-justify feedcontent">
                  <section class="feeder-img-list" v-for="(img, index) in item.content.images" style="width: auto;max-height: 400px" :key="index">
                    <img class="feed-cover-list" :src="$com.makeFileUrl(img.link) || defaultImg" :style="{ display:'block',position:'relative', width: '100%',height: 'auto'}">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </section>
                </section>
                <section v-if="item.content.images && item.content.images.length == 2" class="flex flex-pack-justify feedcontent">
                  <section class="feeder-img-list" v-for="(img, index) in item.content.images" :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundImage: 'url('+$com.makeFileUrl(img.link)+')', backgroundRepeat: 'no-repeat'}"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </section>
                </section>
                <section v-if="(item.content.images && item.content.images.length == 3) || (item.content.images && item.content.images.length > 4)"
                  class="flex feedcontent">
                  <section class="feeder-img-list" v-for="(img, index) in item.content.images" :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundImage: 'url('+$com.makeFileUrl(img.link)+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </section>
                </section>
                <section v-if="item.content.images && item.content.images.length === 4" class="flex flex-pack-justify feedcontent">
                  <section class="feeder-img-list" v-for="(img, index) in item.content.images" :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%', backgroundImage: 'url('+$com.makeFileUrl(img.link)+')',  backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                    :key="index">

                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </section>
                </section>
              </section>
              <!-- 视频贴 int_type == 1-->
              <section class="feedmain" v-else-if="item.int_type === 1">
                <section class="feedcontent">
                  <section class="feeds-video" 
                    v-if="item.content.videos[0].width > item.content.videos[0].height"
                    :style="{
                      width: '100%',
                      backgroundImage: 'url('+$com.makeFileUrl(item.content.videos[0].imageUrl)+')',
                      paddingBottom: item.content.videos[0].height * 100 / item.content.videos[0].width + '%',
                      height: 0
                    }">
                    <span class='icon-shipin-2'></span>
                    <section class="duration flex flex-align-center flex-pack-center">
                      <span>00:00/{{ $com.toCurrent(item.content.videos[0].duration) }}</span>
                    </section>
                  </section>
                  <section class="feeds-video feeds-video-vertical" 
                    v-else
                    :style="{
                      backgroundImage: 'url('+$com.makeFileUrl(item.content.videos[0].imageUrl)+')',
                      width: item.content.videos[0].width * 400 / item.content.videos[0].height + 'px',
                      height: '400px'
                    }">
                    <span class='icon-shipin-2'></span>
                    <section class="duration flex flex-align-center flex-pack-center">
                      <span>00:00/{{ $com.toCurrent(item.content.videos[0].duration) }}</span>
                    </section>
                  </section>
                </section>
                <section v-if="item.content.text" class="feedtitle text-ellipse">{{ item.content.text }}</section>
              </section>
              <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
              <section class="feedmain" v-else-if="item.int_type === 2">
                <section v-if="item.cover" class="feedcover flex">
                  <img :style="{ 
                    display:'block',
                    position:'relative'}" :src="$com.makeFileUrl(item.cover) || defaultImg">
                </section>
                <section class="feedtype">
                  <section v-if="item.title" class="feedtitle text-ellipse">
                    {{ item.title }}
                  </section>
                  <section v-if="item.content.summary" class="feedcontent feedcontent2">
                    {{ item.content.summary }}
                  </section>
                </section>
              </section>
              <section class="feeddata flex flex-pack-justify flex-align-center">
                <label class="flex flex-align-center">
                  <i class="icon iconfont icon-share"></i>
                  <span>{{ item.long_share }}</span>
                </label>
                <label class="flex flex-align-center">
                  <i class="icon iconfont icon-message"></i>
                  <span>{{ item.commentNumber }}</span>
                </label>
                <label class="flex flex-align-center">
                  <i class="icon iconfont icon-upvote"></i>
                  <span>{{ item.like }}</span>
                </label>
              </section>
            </section>
          </section>
        </li>
      </ul>
      <section v-else class="nocon">
        暂无贴子
      </section>
      <section class="loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" :autoFill="false" infinite-scroll-distance="10">
         <section v-if="current_read_list.data.length > 0">拼命加载中...</section>
      </section>
      <!-- dialog -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <section>
          <p>选择以下原因后删除：</p>
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
    <!-- <section class="loadingMain" style="display: none;width:0;height: 0;"></section> -->
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("content", [
      "readCount",
      "readList",
      "loading_text",
      "busy",
      "current_read_list"
    ]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      getreadlist: {
        flag: 0,
        pagenum: 1,
        pagesize: 10,
        keywords: "",
        startTime: null,
        endTime: null,
        intVerify: 1
      },
      seachbytitle: "",
      dialogVisible: false,
      // 贴子状态筛选
      fliterfeeds: 0, // 0未读 1 已读
      // 贴子id和状态（删除， 上墙）
      subjectid: "",
      flags: -1,
      spliceIndex: null, // 删除坐标
      pagenum: 1,
      pagesize: 10,
      checkList: ["垃圾营销"],
      feeds: {
        options: [
          {
            value: 0,
            label: "未读"
          },
          {
            value: 1,
            label: "已读"
          }
        ]
      },
      fliterVerify: 1,
      verify: {
        options: [
          {
            value: 1,
            label: "精华"
          },
          {
            value: 0,
            label: "普通"
          }
        ]
      },
      readList2: {
        data: []
      }
    };
  },
  methods: {
    ...mapActions("content", [
      "getReadList",
      "getReadList1",
      "getReadCount",
      "setUpdateVerify",
      "setUpdateRead",
      "loadMore"
    ]),
    // table操作
    recover(id) {
      window.open(`/content/recover?id=${id}`);
      // this.$router.push({
      //   path: `/content/recover?id=${id}`
      // });
    },
    read() {
      window.open(`/content/read?id=${this.fliterVerify}`);
      // this.$router.push({
      //   path: `/content/read?id=${this.fliterVerify}`
      // });
    },
    // 删除
    async dropoff(id, index, flag) {
      let self = this;
      self.dialogVisible = true;
      self.subjectid = id;
      self.flags = flag;
      self.spliceIndex = index;
    },
    // 更新上墙 删除状态
    async updateVerify() {
      let self = this;
      let res = await self.setUpdateVerify({
        subjectid: self.subjectid,
        flag: self.flags, // -1 删除 1 上墙
        drop_reason: self.checkList // 举报信息
      });
      if (res) {
        self.readList2.data.splice(self.spliceIndex, 1);
        self.dialogVisible = false;
        self.seachbytitle = "";
        // self.fliterfeeds = 0;
      }
    },
    // 下拉框
    handleSelect() {
      document.querySelectorAll("#feed>li").forEach(async (x, i) => {
        $("#feed>li .isRead")
          .eq(i)
          .hide();
      });
      let self = this;
      self.getreadlist["flag"] = self.fliterfeeds;
      self.getreadlist["keywords"] = self.seachbytitle;
      self.getreadlist["pagenum"] = 1;
      self.getreadlist["intVerify"] = self.fliterVerify;
      self.getReadList1(self.getreadlist);
      self.getReadCount({ intVerify: self.fliterVerify });
    },
    // 搜索按钮
    bindSearch() {
      let self = this;
      self.getreadlist["flag"] = self.fliterfeeds;
      self.getreadlist["keywords"] = self.seachbytitle;
      self.getreadlist["pagenum"] = 1;
      self.getreadlist["intVerify"] = self.fliterVerify;
      self.getReadList1(self.getreadlist);
    },
    // 获取未读已读列表
    async getFeedList() {
      let self = this;
      self.getreadlist["flag"] = self.fliterfeeds;
      self.getreadlist["keywords"] = self.seachbytitle;
      self.getreadlist["pagenum"] = self.pagenum;
      self.getreadlist["intVerify"] = self.fliterVerify;
      await self.getReadList(self.getreadlist);
    },
    // 查看贴子详情
    async toFeeds(id) {
      window.open(`/content/feed/${id}`);
      // this.$router.push({
      //   path: `/content/feed/${id}`
      // });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 更新已读
    async updateRead(id) {
      let self = this;
      await self.setUpdateRead({
        subjectid: id
      });
    },
    _func() {
      let self = this;
      document.querySelectorAll("#feed>li").forEach(async (x, i) => {
        if (
          Math.abs($("#feed").offset().top) &&
          Math.abs($("#feed").offset().top) + 168 > x.offsetTop + x.offsetHeight
        ) {
          if (
            $("#feed>li")
              .eq(i)
              .attr("status") == "true"
          ) {
            $("#feed>li")
              .eq(i)
              .attr("status", false);
            $("#feed>li .isRead")
              .eq(i)
              .show();
            await self.updateRead(
              $("#feed>li")
                .eq(i)
                .attr("sub")
            );
          }
        }
      });
    },
    _scroll(type) {
      let self = this;
      if (self.authUser.type != 1) {
        document
          .querySelector(".main .page_container .el-scrollbar__wrap")
          .addEventListener("scroll", self._func, false);
      }
    }
  },
  watch: {
    readList(val) {
      this.readList2 = val;
    }
  },
  created() {
    let self = this;
    self.getreadlist["intVerify"] = self.fliterVerify;
    self.getReadList(self.getreadlist);
    self.getReadCount({ intVerify: self.fliterVerify });
  },
  mounted() {
    this._scroll();
  }
};
</script>
<style scoped="scoped">
.permission_table {
  padding-bottom: 20px;
  background: #fff;
  position: relative;
}

.labelname {
  margin-right: 10px;
  min-width: 67px;
}

.yetread,
.list-filter-select {
  margin-right: 30px;
}

.permission_table_top {
  border-bottom: 1px solid #e9e9e9;
}

.feed-list-cell,
.loading {
  padding: 0 100px;
  /*border-bottom: 1px solid #e9e9e9;*/
}

.feed-box,
.loading {
  max-width: 625px;
}

.feed-cell-title {
  padding: 16px 0;
}

.hasreport {
  /*border-bottom: 1px solid #e9e9e9;*/
  background: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
}

.report-list {
  margin-left: 20px;
  color: #999;
}

.columnname {
  margin-bottom: 20px;
}

.columnname > img {
  height: 36px;
  border-radius: 3px;
  margin-right: 30px;
}

.name {
  font-size: 24px;
  color: #4b4945;
  -webkit-line-clamp: 1;
}

.time {
  color: #999;
  margin-left: 20px;
}

.feed-cell-content {
  padding-top: 20px;
}

.feedcover {
  margin-bottom: 20px;
}

.feedcover > img {
  width: 100%;
  height: 100%;
}

.feedtitle {
  font-size: 18px;
  margin-bottom: 12px;
  margin-top: 22px;
  text-align: justify;
}

.feedcontent {
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.feedcontent2 {
  text-align: justify;
  max-height: 60px;
  overflow: hidden;
  box-sizing: border-box;
}

.feeddata {
  border-bottom: 1px solid #e9e9e9;
}

.feeddata {
  height: 60px;
}

.feeddata > label {
  font-size: 18px;
}

.feeddata > label > i {
  font-size: 26px;
  margin-right: 5px;
}

.gif {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
}

.feeder-img-list {
  position: relative;
  overflow: hidden;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}

.dropreason {
  margin-top: 10px;
  flex-wrap: wrap;
}

.dropreason .el-checkbox {
  margin-left: 0;
  width: 50%;
}

.isRead {
  display: none;
  width: 40px;
  text-align: center;
  background: #fddb00;
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
}
.feeds-video {
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
.icon-shipin-2 {
  background: url("data:image/png;base64,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");
  background-size: cover;
  width: 45px;
  height: 45px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.duration {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 99;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  height: 25px;
  width: 80px;
  box-sizing: border-box;
  font-size: 12px;
}
.loading {
  height: 60px;
  line-height: 80px;
  text-align: center;
}
</style>
