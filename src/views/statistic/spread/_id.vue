<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">数据统计/推广数据/{{ $route.query.type }}</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center flex-1">
          <section class="flex flex-align-center">
            <span class="labelname">
              推广名称：
            </span>
            <el-input class="user_phone" v-model="searchname" placeholder="输入推广名称" @keyup.enter.native="getList">
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
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPlanActivity">新建推广活动</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="res.data" style="width: 100%">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="id" label="活动id">
          </el-table-column>
          <el-table-column prop="viewCounts" label="页面访问次数">
          </el-table-column>
          <el-table-column prop="clickCounts" label="点击数">
          </el-table-column>
          <el-table-column prop="clickRatio" label="点击率">
          </el-table-column>
          <el-table-column prop="clickCounts" label="设备激活数">
          </el-table-column>
          <el-table-column prop="deviceRatio" label="激活率">
          </el-table-column>
          <el-table-column prop="registCounts" label="注册数">
          </el-table-column>
          <el-table-column prop="ac_url" label="链接地址">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <section>
                <!-- <el-button type="text" size="small" @click="retain">
                  <span>留存</span>
                </el-button> -->
                <el-button type="text" size="small" @click="updateRow(scope.row, 'update')">
                  <span>修改</span>
                </el-button>
                <el-button type="text" size="small" @click="lookRow(scope.row, 'look')">
                  <span>查看</span>
                </el-button>
                <el-button type="text" size="small" @click="deleteRow(scope.row, 'delete')">
                  <span>删除</span>
                </el-button>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <!-- dialog 列表 -->
    <el-dialog :title="channelTitle" :visible.sync="outerVisible">
      <el-form :model="channelForm" label-width="120px" class="column-form" :disabled="channelDisabled">
          <el-form-item label="推广活动名称：" prop="channelname">
              <el-input v-model="channelForm.channelname" class="channelinput"></el-input>
            </el-form-item>
          <el-form-item label="投放URL：" prop="channelid">
            <el-input v-model="channelForm.channelid" class="channelinput" placeholder="输入链接地址"></el-input>
            <!-- <el-button type="primary">生成链接</el-button> -->
          </el-form-item>
      </el-form>
      <section slot="footer" class="dialog-footer">
        <section v-if="op === 'update'">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureUpdateRow">确 定</el-button>
        </section>
        <section v-else-if="op === 'look'">
          <el-button type="primary" @click="outerVisible = false">确 定</el-button>
        </section>
        <section v-else>
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureAddActivity">确 定</el-button>
        </section>
      </section>
    </el-dialog>
    <section class="block cloumn-block" v-if="res.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="res.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
export default {
  middleware: "auth",
  async asyncData({ app, error, params }) {
    try {
      let para = {
        planId: params.id,
        name: "",
        page: 1,
        count: 10,
        startTime: null,
        endTime: null
      };
      let data = await app.$axios.$post(`${api.promotion.activity_list}`, para);
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          // x.createTime = $async.createTime(x.createTime, "yy-mm-dd hh:MM");
          if (x.type === 1) {
            x.typename = "渠道";
            x.channelid = x.id;
            x.planid = "-";
          } else {
            x.typename = "推广计划";
            x.planid = x.id;
            x.channelid = "-";
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
  data() {
    return {
      res: {},
      searchname: "",
      // 分页
      pagenum: 1,
      pagesize: 10,
      checkedRecord: ["安卓", "IOS"],
      channelTitle: "",
      channelDisabled: false,
      op: "",
      updaterow: {},
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
      flitertypes: "",
      types: {
        options: [
          {
            value: "渠道",
            label: "渠道"
          },
          {
            value: "推广",
            label: "推广"
          }
        ]
      },
      outerVisible: false,
      channelForm: {
        channelname: "",
        channelid: ""
      }
    };
  },
  methods: {
    spread() {
      this.$router.push({
        path: `/statistic/spread?type=360手机助手`
      });
    },
    retain() {
      // channel渠道  plan推广  activity活动
      this.$router.push({
        path: `/statistic/retain/channel/8asd19ds`
      });
    },
    async getList() {
      let self = this;
      try {
        let para = {
          planId: self.$route.params.id,
          name: self.searchname,
          page: self.pagenum,
          count: self.pagesize,
          startTime: self.dataValue[0] || null,
          endTime: self.dataValue[1] || null
        };
        let data = await self.$axios.$post(
          `${api.promotion.activity_list}`,
          para
        );
        if (data.code === 0) {
          let arr = await data.result.data.map(x => {
            x.createTime = self.$com.createTime(x.createTime, "yy-mm-dd hh:MM");
            if (x.type === 1) {
              x.typename = "渠道";
              x.channelid = x.id;
              x.planid = "-";
            } else {
              x.typename = "推广计划";
              x.planid = x.id;
              x.channelid = "-";
            }
            return x;
          });
          self.res = {
            data: arr,
            count: data.result.count
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
    // 新建推广活动
    addPlanActivity() {
      let self = this;
      self.outerVisible = true;
      self.channelTitle = "新建推广活动";
      self.channelDisabled = false;
      self.channelForm = {
        channelname: "",
        channelid: ""
      };
    },
    async sureAddActivity() {
      let self = this;
      if (!self.channelForm.channelname) {
        self.$message.warning("活动名称不能为空！");
        return;
      }
      if (!self.channelForm.channelid) {
        self.$message.warning("投放URL地址不能为空！");
        return;
      }
      try {
        let para = {
          planId: self.$route.params.id,
          name: self.channelForm.channelname,
          baseUrl: self.channelForm.channelid
        };
        let data = await self.$axios.$post(
          `${api.promotion.activity_add}`,
          para
        );
        if (data.code === 0) {
          self.$message.success("新建成功！");
          self.outerVisible = false;
          await self.getList();
        }
      } catch (e) {
        self.$message.error(e);
      }
    },
    // 删除 activity_delete
    async sureDel(row) {
      let self = this;
      try {
        let data = await self.$axios.$post(
          `${api.promotion.activity_delete}?id=${row.id}`
        );
        if (data.code === 0) {
          self.$message.success("操作成功！");
          await self.getList();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deleteRow(row) {
      let self = this;
      self
        .$confirm(`此操作将删除‘${row.name}’, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.sureDel(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 更新 activity_update
    updateRow(row, op) {
      let self = this;
      self.op = op;
      self.updaterow = row;
      self.outerVisible = true;
      self.channelTitle = "修改推广活动";
      self.channelDisabled = false;
      self.channelForm = {
        channelname: row.name,
        channelid: row.ac_url
      };
    },
    async sureUpdateRow() {
      let self = this;
      if (!self.channelForm.channelname) {
        self.$message.warning("推广活动名称不能为空！");
        return;
      }
      if (!self.channelForm.channelid) {
        self.$message.warning("推广URL不能为空！");
        return;
      }
      try {
        let para = {
          id: self.updaterow.id,
          planId: self.updaterow.planId,
          name: self.channelForm.channelname,
          acUrl: self.channelForm.channelid
        };
        let data = await self.$axios.$post(
          `${api.promotion.activity_update}`,
          para
        );
        if (data.code === 0) {
          self.outerVisible = false;
          self.$message.success("更新成功！");
          await self.getList();
        }
      } catch (e) {
        self.$message.error(e);
      }
    },
    // 查看行
    lookRow(row, op) {
      let self = this;
      self.outerVisible = true;
      self.channelTitle = "查看推广活动";
      self.channelDisabled = true;
      self.channelForm = {
        channelname: row.name,
        channelid: row.ac_url
      };
    },
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getList();
    },
    handleSelectByTime() {
      // console.log(`当前时间: ${this.dataValue}`);
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
  margin-right: 10px;
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
