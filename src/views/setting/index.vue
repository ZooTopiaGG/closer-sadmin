<template>
  <!-- <section id="permission" class="flex flex-v">
    <section class="permission_title">线上推广落地页</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center flex-1">
          <section class="flex flex-align-center">
            <span class="labelname">
              推广活动搜索：
            </span>
            <el-input class="user_phone" v-model="searchname" @keyup.enter.native="getList">
              <el-button slot="append" @click="getList" icon="el-icon-search"></el-button>
            </el-input>
          </section>
          <section class="flex flex-align-center">
            <section class="block2">
              <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelectByTime" align="right"
                unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </section>
          </section>
        </section>
        <section>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addSetting">新建配置</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="res.data" style="width: 100%">
          <el-table-column fixed="left" type="index" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="推广活动名称">
          </el-table-column>
          <el-table-column prop="activityId" label="推广活动ID">
          </el-table-column>
          <el-table-column prop="newImageUrl" label="配置文件名">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <section>
                <el-button type="text" size="small" @click="updateSetting(scope.row)">
                  <span>修改</span>
                </el-button>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <el-dialog :title="planTitle" :visible.sync="outerVisible">
      <el-form :model="planForm" label-width="120px" class="column-form" :disabled="planDisabled">
        <el-form-item label="活动ID：" prop="planname">
          <el-input v-model="planForm.activityid" class="channelinput"></el-input>
        </el-form-item>
        <el-form-item label="上传页面图片：" v-loading.body="loadingAvatarUpload">
          <el-upload
          :action="uploadUrl"
          :headers="headers"
          :on-success="handleFileSuccess"
          :before-upload="beforeFileUpload" 
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <section slot="tip" class="el-upload__tip">尺寸：1125 * 2001；只能上传图片，且不超过800kb</section>
        </el-upload>
        </el-form-item>
      </el-form>
      <section slot="footer" class="dialog-footer">
        <section>
          <el-button @click="outerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="sureAddSetting">确 定</el-button>
        </section>
      </section>
    </el-dialog>
    <section class="block cloumn-block" v-if="res.count>0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="res.count">
      </el-pagination>
    </section>
  </section> -->
  <section class="wait">功能暂未开发，敬请期待！</section>  
</template>
<script>
export default {
  middleware: "auth",
  async asyncData({ app, error }) {
    try {
      let para = {
        name: "",
        page: 1,
        count: 10,
        startTime: null,
        endTime: null
      };
      let data = await app.$axios.$post(
        `${api.promotion.activity_config_list}`,
        para
      );
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          // x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          if (!x.imageUrl) {
            x.newImageUrl = "-";
          } else {
            x.newImageUrl = x.imageUrl;
          }
          return x;
        });
        return {
          res: {
            data: arr,
            count: data.result.count
          }
        };
      } else {
        error({
          message: `错误代码:${data.code}, ${data.result}`
        });
      }
    } catch (err) {
      error({
        message: `${err}`
      });
    }
  },
  computed: {
    headers() {
      // console.log(this.$store.state.token)
      if (this.$store.state.token) {
        return {
          Authorization: `CloserSysAuth ${this.$store.state.token}`
        };
      } else {
        return false;
      }
    },
    authUser() {
      return this.$store.state.authUser
        ? JSON.parse(this.$store.state.authUser)
        : false;
    }
  },
  data() {
    return {
      res: {
        data: [],
        count: ""
      },
      searchname: "",
      // 分页
      pagenum: 1,
      pagesize: 10,
      planTitle: "新建推广计划",
      op: "", // 操作类型
      // 加载
      uploadUrl: `${server.filePath}${server.file}`,
      // 日期选择
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 绑定选择到的日期 数组
      dataValue: "",
      outerVisible: false,
      planForm: {
        activityid: "",
        fileOnlineUrl: ""
      },
      // 搜索字段
      stype: "", //
      fileList: [],
      loadingAvatarUpload: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传 文件 变化
    handleFileSuccess(res, file, fileList) {
      let self = this;
      try {
        if (res.code === 0) {
          self.fileList = fileList.slice(-1);
          self.planForm.fileOnlineUrl = `${server.filePath}${res.result.url}`;
        } else {
          self.$message.error(res.result);
        }
      } catch (err) {
        self.$message.error(err);
      }
    },
    beforeFileUpload(file) {
      let self = this;
      const isImage = file.type.indexOf("image") > -1;
      const isLt800KB = file.size / 1024 / 1024 < 0.8;
      if (!isImage) {
        self.$message.error("上传文件只能是 JSON 文件!");
        self.loadingAvatarUpload = false;
      }
      if (!isLt800KB) {
        self.loadingAvatarUpload = false;
        self.$message.error("上传文件大小不能超过 800kb!");
      }
      return isImage && isLt800KB;
    },
    // 添加配置
    addSetting() {
      let self = this;
      self.outerVisible = true;
      self.planTitle = "新建配置";
      self.planForm = {
        activityid: "",
        fileOnlineUrl: ""
      };
    },
    updateSetting(row) {
      let self = this;
      self.outerVisible = true;
      self.planTitle = "修改配置";
      self.planForm = {
        activityid: row.activityId,
        fileOnlineUrl: row.imageUrl
      };
      if (row.imageUrl) {
        let _fileList = [
          {
            name: row.imageUrl,
            url: row.imageUrl
          }
        ];
        self.fileList = _fileList.slice(-1);
      } else {
        self.fileList = [];
      }
    },
    async sureAddSetting() {
      let self = this;
      if (!self.planForm.activityid) {
        self.$message.warning("活动id不能为空！");
        return;
      }
      if (!self.planForm.fileOnlineUrl) {
        self.$message.warning("配置图片不能为空！");
        return;
      }
      try {
        let para = {
          activityId: self.planForm.activityid,
          imageUrl: self.planForm.fileOnlineUrl
        };
        let data = await self.$axios.$post(
          `${api.promotion.activity_config_add}`,
          para
        );
        if (data.code === 0) {
          self.$message.success("操作成功！");
          await self.getList();
          self.outerVisible = false;
        } else {
          self.$message.error(data.result);
        }
      } catch (e) {
        self.$message.error(e);
      }
    },
    spread(row) {
      window.open(`/statistic/spread/${row.planid}?type=${row.name}`);

      // this.$router.push({
      //   path: `/statistic/spread/${row.planid}?type=${row.name}`
      // });
    },
    retain() {
      window.open(`/statistic/retain/channel/8asd19ds`);
      // channel渠道  plan推广  activity活动
      // this.$router.push({
      //   path: `/statistic/retain/channel/8asd19ds`
      // });
    },
    // 获取渠道或者推广计划列表 包括搜索
    async getList() {
      // 0:推广计划，1:渠道
      let self = this;
      try {
        let para = {
          name: self.searchname,
          page: self.pagenum,
          count: self.pagesize,
          startTime: self.dataValue[0] || null,
          endTime: self.dataValue[1] || null
        };
        let data = await self.$axios.$post(
          `${api.promotion.activity_config_list}`,
          para
        );
        if (data.code === 0) {
          let arr = await data.result.data.map(x => {
            x.createTime = self.$com.createTime(x.createTime, "yy-mm-dd hh:MM");
            if (!x.imageUrl) {
              x.imageUrl = "-";
            }
            return x;
          });
          self.res = {
            data: arr,
            count: data.result.count
          };
        } else {
          self.$message.error(data.result);
        }
      } catch (err) {
        self.$message.error(err);
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getList();
    },
    handleSelect(item) {
      let self = this;
      self.getList();
    },
    handleSelectByTime(item) {
      this.getList();
    }
  },
  beforeMount() {
    let self = this;
    self.res.data.map(x => {
      x.createTime = this.$com.createTime(x.createTime, "yy-mm-dd hh:MM");
      return self.res.data;
    });
  },
  mounted() {}
};
</script>
<style scoped="scoped">
.labelname {
  margin-right: 10px;
  min-width: 60px;
}
.channelinput {
  width: 240px;
}
.list-filter-select {
  max-width: 100px;
  margin-right: 20px;
}

.user_phone {
  margin-right: 20px;
  max-width: 200px;
}

.permission_table_middle {
  height: 30px;
  background: #fff;
  padding: 0 20px;
}

.dialog-label {
  width: 120px;
}

.dialog-sure {
  margin-left: 20px;
}

.searchtrue {
  height: 40px;
  border-bottom: 1px solid #f4f4f4;
}

.searchname {
  margin: 0 40px;
}

.searcherror {
  color: red;
}
</style>
