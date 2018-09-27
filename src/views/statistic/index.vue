<template>
  <!-- <section id="permission" class="flex flex-v">
    <section class="permission_title">数据统计/推广数据</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center flex-1">
          <section class="flex flex-align-center">
            <el-select class='list-filter-select' @change="handleSelect" v-model="flitertypes" placeholder="全部">
              <el-option v-for="item in types.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </section>
          <section class="flex flex-align-center">
            <span class="labelname">
              输入名称：
            </span>
            <el-input class="user_phone" v-model="searchname" placeholder="输入名称" @keyup.enter.native="getList">
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
        <section v-if="authUser.type === 1 || (authUser.permissions && authUser.permissions.data[0].permissions === 'data_update')">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addChannel">新建渠道</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPlan">新建推广计划</el-button>
        </section>
        <section v-else-if="opControlStatus">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addChannel">新建渠道</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPlan">新建推广计划</el-button>
        </section>
      </section>
      <section class="permission_table_middle">
        <el-checkbox-group v-model="checkedRecord" @change="handleSelectPlates">
          <el-checkbox v-for="plate in plates.options" :label="plate.label" :key="plate.value">{{ plate.label }}</el-checkbox>
        </el-checkbox-group>
      </section>
      <section class="permission_table_content">
        <el-table :data="res.data" style="width: 100%">
          <el-table-column fixed="left" label="名称">
            <template slot-scope="scope">
              <section>
                <el-button type="text" size="small" v-if="scope.row.type === 0" @click="spread(scope.row)">
                  <span>{{ scope.row.name }}</span>
                </el-button>
                <span v-else>{{ scope.row.name }}</span>
              </section>
            </template>
          </el-table-column>
          <el-table-column prop="typename" label="类型">
          </el-table-column>
          <el-table-column prop="channelid" label="渠道ID">
          </el-table-column>
          <el-table-column prop="planid" label="推广计划ID">
          </el-table-column>
          <el-table-column prop="viewCounts" label="页面访问次数">
          </el-table-column>
          <el-table-column prop="clickCounts" label="点击数">
          </el-table-column>
          <el-table-column prop="clickRatio" label="点击率">
          </el-table-column>
          <el-table-column prop="deviceCounts" label="设备激活数">
          </el-table-column>
          <el-table-column prop="deviceRatio" label="激活率">
          </el-table-column>
          <el-table-column prop="registCounts" label="注册数">
          </el-table-column>
          <el-table-column prop="plateform" label="平台">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <section>
                <el-button type="text" size="small" @click="retain">
                  <span>留存</span>
                </el-button>
                <el-button type="text" v-if="authUser.type === 1 || (authUser.permissions && authUser.permissions.data[0].permissions === 'data_update')" size="small" @click="updateRow(scope.row, 'update')">
                  <span>修改</span>
                </el-button>
                <el-button type="text" v-if="authUser.type === 1 || (authUser.permissions && authUser.permissions.data[0].permissions === 'data_view')" size="small" @click="lookRow(scope.row, 'look')">
                  <span>查看</span>
                </el-button>
                <el-button type="text" v-if="authUser.type === 1 || (authUser.permissions && authUser.permissions.data[0].permissions === 'data_update')" size="small" @click="deleteRow(scope.row, 'delete')">
                  <span>删除</span>
                </el-button>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <el-dialog :title="channelTitle" :visible.sync="outerVisible">
      <el-form :model="channelForm" label-width="120px" class="column-form" :disabled="channelDisabled">
        <el-form-item label="选择平台：" prop="plateform">
                <el-radio-group v-model="channelForm.plateform" @change="handleSelect2">
                  <el-radio label="IOS"></el-radio>
                  <el-radio label="安卓"></el-radio>
                </el-radio-group>
              </el-form-item>
            <el-form-item label="渠道名称：" prop="channelname">
                <el-input v-model="channelForm.channelname" class="channelinput"></el-input>
              </el-form-item>
            <el-form-item label="渠道ID：" prop="channelid">
                <el-input v-model="channelForm.channelid" class="channelinput" :disabled="channelForm.plateform === 'IOS'"></el-input>
              </el-form-item>
        
      </el-form>
      <section slot="footer" class="dialog-footer">
        <section v-if="op === 'update'">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureUpdated">确 定</el-button>
        </section>
        <section v-else-if="op === 'look'">
          <el-button type="primary" @click="outerVisible = false">确 定</el-button>
        </section>
        <section v-else>
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureAddChannel">确 定</el-button>
        </section>
      </section>
    </el-dialog>
    <el-dialog :title="planTitle" :visible.sync="outerVisible1">
      <el-form :model="planForm" label-width="120px" class="column-form" :disabled="planDisabled">
        <el-form-item label="推广计划名称：" prop="planname">
          <el-input v-model="planForm.planname" class="channelinput"></el-input>
        </el-form-item>
        <el-form-item label="选择平台：" prop="plateform">
          <el-radio-group v-model="planForm.plateform">
            <el-radio label="IOS"></el-radio>
            <el-radio label="安卓"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推广计划ID：" prop="planid">
          <el-input v-model="planForm.planid" class="channelinput"></el-input>
        </el-form-item>
      </el-form>
      <section slot="footer" class="dialog-footer">
        <section v-if="op === 'update'">
          <el-button @click="outerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="sureUpdated">确 定</el-button>
        </section>
        <section v-else-if="op === 'look'">
          <el-button type="primary" @click="outerVisible1 = false">确 定</el-button>
        </section>
        <section v-else>
          <el-button @click="outerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="sureAddPlan">确 定</el-button>
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
const plates = {
  options: [
    {
      label: "IOS",
      value: "0"
    },
    {
      label: "安卓",
      value: "1"
    },
    {
      label: "其他",
      value: "2"
    }
  ]
};
export default {
  middleware: "auth",
  async asyncData({ app, error }) {
    try {
      let para = {
        type: null,
        withDeleted: false,
        name: "",
        plateform: null,
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        endTime: null
      };
      let data = await app.$axios.$post(`${api.promotion.plan_list}`, para);
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
  computed: {
    authUser() {
      return this.$store.state.authUser
        ? JSON.parse(this.$store.state.authUser)
        : false;
    }
    // opControlStatus() {
    //   let auth = this.$store.state.authUser,
    //     st;
    //   if (auth && auth.permissions && auth.permissions.data) {
    //     auth.permissions.data.forEach(x => {
    //       if (x.permissions === "data_update") {
    //         st = true;
    //         return st;
    //       } else {
    //         st = false;
    //       }
    //     });
    //     return st;
    //   }
    // }
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
      checkedRecord: [],
      planTitle: "新建推广计划",
      channelTitle: "新建渠道",
      planDisabled: false,
      channelDisabled: false,
      updaterow: {},
      plates: plates,
      op: "", // 操作类型
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
          },
          {
            value: "全部",
            label: "全部"
          }
        ]
      },
      // 渠道
      outerVisible: false,
      channelForm: {
        plateform: "安卓",
        channelname: "",
        channelid: ""
      },
      // 推广计划
      outerVisible1: false,
      planForm: {
        plateform: "安卓",
        planname: "",
        planid: ""
      },
      // 搜索字段
      stype: "" //
    };
  },
  methods: {
    handleSelect2() {
      if (this.channelForm.plateform === "IOS") {
        this.channelForm.channelid = "IOS";
      } else {
        if (this.op != "update") {
          this.channelForm.channelid = "";
        } else {
          this.channelForm.channelid = this.updaterow.channelid;
          return;
        }
      }
    },
    spread(row) {
      this.$router.push({
        path: `/statistic/spread/${row.planid}?type=${row.name}`
      });
    },
    retain() {
      // channel渠道  plan推广  activity活动
      this.$router.push({
        path: `/statistic/retain/channel/8asd19ds`
      });
    },
    // 获取渠道或者推广计划列表 包括搜索
    async getList() {
      // 0:推广计划，1:渠道
      let self = this,
        tp,
        plate;
      switch (self.flitertypes) {
        case "渠道":
          tp = 1;
          break;
        case "推广":
          tp = 0;
          break;
        case "全部":
          tp = null;
          break;
        default:
          tp = null;
      }
      let newType = await self.checkedRecord.map(x => {
        if (x === "IOS") {
          x = "0";
        } else if (x === "安卓") {
          x = "1";
        } else {
          x = "2";
        }
        return x;
      });
      if (newType.length > 0) {
        plate = newType.join(",");
      } else {
        plate = null;
      }
      try {
        let para = {
          type: tp,
          withDeleted: false,
          name: self.searchname,
          plateform: plate,
          pageNum: self.pagenum,
          pageSize: self.pagesize,
          startTime: self.dataValue[0] || null,
          endTime: self.dataValue[1] || null
        };
        let data = await self.$axios.$post(`${api.promotion.plan_list}`, para);
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
          self.$messgae.error(data.result);
        }
      } catch (err) {
        self.$messgae.error(err);
      }
    },
    // plan_add 增加渠道
    addChannel() {
      let self = this;
      self.outerVisible = true;
      self.channelTitle = "新建渠道";
      self.op = "add";
      self.channelDisabled = false;
      self.channelForm = {
        plateform: "安卓",
        channelname: "",
        channelid: ""
      };
    },
    async sureAddChannel() {
      let self = this,
        plate;
      switch (self.channelForm.plateform) {
        case "IOS":
          plate = 0;
          break;
        case "安卓":
          plate = 1;
          break;
        case "其他":
          plate = 2;
          break;
        default:
          plate = 2;
      }
      if (!self.$com.isEn(self.channelForm.channelid)) {
        self.$message.error("请输入纯英文的ID");
        return;
      }
      try {
        let para = {
          type: 1,
          name: self.channelForm.channelname,
          plateform: plate,
          id: self.channelForm.channelid
          // customId: self.channelForm.channelid // 自定义id
        };
        let data = await self.$axios.$post(`${api.promotion.plan_add}`, para);
        if (data.code === 0) {
          self.$message.success("新建成功！");
          await self.getList();
          self.outerVisible = false;
        } else {
          self.$message.error(data.result);
        }
      } catch (e) {
        self.$message.error(e);
      }
    },
    // plan_add 增加推广计划
    addPlan() {
      let self = this;
      self.outerVisible1 = true;
      self.planTitle = "新建推广计划";
      self.planDisabled = false;
      self.op = "add";
      self.planForm = {
        plateform: "安卓",
        planname: "",
        planid: ""
      };
    },
    async sureAddPlan() {
      let self = this,
        plate;
      switch (self.channelForm.plateform) {
        case "IOS":
          plate = 0;
          break;
        case "安卓":
          plate = 1;
          break;
        case "其他":
          plate = 2;
          break;
        default:
          plate = 2;
      }
      if (!self.$com.isEn(self.planForm.planid)) {
        self.$message.error("请输入纯英文的ID");
        return;
      }
      try {
        let para = {
          type: 0,
          name: self.planForm.planname,
          plateform: plate,
          id: self.planForm.planid
          // customId: "" // 自定义id
        };
        let data = await self.$axios.$post(`${api.promotion.plan_add}`, para);
        if (data.code === 0) {
          self.$message.success("新建成功！");
          await self.getList();
          self.outerVisible1 = false;
        } else {
          self.$message.error(data.result);
        }
      } catch (e) {
        self.$message.error(e);
      }
    },
    // 确认更新
    async sureUpdated() {
      let self = this,
        plate,
        para;
      try {
        // 渠道
        if (self.updaterow.type === 1) {
          switch (self.channelForm.plateform) {
            case "IOS":
              plate = 0;
              break;
            case "安卓":
              plate = 1;
              break;
            case "其他":
              plate = 2;
              break;
            default:
              plate = 2;
          }
          para = {
            id: self.updaterow.id,
            name: self.channelForm.channelname,
            plateform: plate,
            type: 1
            // customId: self.channelForm.channelid // 自定义id
          };
        } else {
          // 计划
          switch (self.planForm.plateform) {
            case "IOS":
              plate = 0;
              break;
            case "安卓":
              plate = 1;
              break;
            case "其他":
              plate = 2;
              break;
            default:
              plate = 2;
          }
          para = {
            id: self.updaterow.id,
            name: self.planForm.planname,
            plateform: plate,
            type: 0
            // customId: "" // 自定义id
          };
        }
        let data = await self.$axios.$post(
          `${api.promotion.plan_update}`,
          para
        );
        if (data.code === 0) {
          self.$message.success("更新成功！");
          await self.getList();
          self.outerVisible1 = false;
          self.outerVisible = false;
        } else {
          self.$message.error(data.result);
        }
      } catch (e) {
        self.$message.error(e);
      }
    },
    // 更新 plan_update
    async updateRow(row, op) {
      let self = this,
        plate;
      self.op = op;
      self.updaterow = row;
      switch (row.plateform) {
        case 0:
          plate = "IOS";
          break;
        case 1:
          plate = "安卓";
          break;
        case 2:
          plate = "其他";
          break;
        default:
          plate = "其他";
      }
      if (row.type === 1) {
        self.outerVisible = true;
        self.channelTitle = "修改渠道";
        self.channelDisabled = false;

        self.channelForm = {
          plateform: plate,
          channelname: row.name,
          channelid: row.channelid
        };
      } else {
        self.outerVisible1 = true;
        self.planTitle = "修改推广计划";
        self.planDisabled = false;
        self.planForm = {
          plateform: plate,
          planname: row.name,
          planid: row.id
        };
      }
    },
    // 查看
    lookRow(row, op) {
      let self = this,
        plate;
      self.op = op;
      switch (row.plateform) {
        case 0:
          plate = "IOS";
          break;
        case 1:
          plate = "安卓";
          break;
        case 2:
          plate = "其他";
          break;
        default:
          plate = "其他";
      }
      if (row.type === 1) {
        self.outerVisible = true;
        self.channelTitle = "查看渠道";
        self.channelDisabled = true;

        self.channelForm = {
          plateform: plate,
          channelname: row.name,
          channelid: row.channelid
        };
      } else {
        self.outerVisible1 = true;
        self.planTitle = "查看推广计划";
        self.planDisabled = true;
        self.planForm = {
          plateform: plate,
          planname: row.name,
          planid: row.id
        };
      }
    },
    // 删除 plan_delete
    async sureDel(row) {
      let self = this;
      try {
        let data = await self.$axios.$post(
          `${api.promotion.plan_delete}?id=${row.id}`
        );
        if (data.code === 0) {
          await self.getList();
          self.$message.success("操作成功！");
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
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getList();
    },
    handleSelect(item) {
      let self = this;
      if (item === "渠道") {
        self.plates = ["IOS", "安卓"];
      } else {
        self.plates = ["IOS", "安卓", "其他"];
      }
      self.getList();
    },
    handleSelectPlates(item) {
      this.getList();
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
