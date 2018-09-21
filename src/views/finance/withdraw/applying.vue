<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-align-center flex-pack-justify">
        <!-- <el-input class="label-phone" v-model="phonenum" maxlength="11" @keyup.enter.native="bindSearch" placeholder="请输入手机号">
          <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
        </el-input> -->
        <section class="flex flex-align-center">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
        </section>
        <section v-if="!(currentSize === 0 || currentPage === 0)">
          <span style="color: #a71616">最后操作位置：</span>
          <span>第 {{currentPage}} 页 / 第 {{currentSize}} 条</span>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content">
        <el-table :data="withdrawList.data" style="width: 100%">
          <el-table-column fixed width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.isLock != 'unlock'" class="covers">不可提现</span>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="userName" label="申请人昵称">
          </el-table-column>
          <el-table-column prop="userPhone" label="手机号">
          </el-table-column>
          <el-table-column prop="payeeAccount" label="支付宝ID">
          </el-table-column>
          <el-table-column prop="withdrawApply" label="申请金额">
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="toserial(scope ,scope.row)" size="medium">近期流水</el-button>
              <el-button type="text" @click="showDialog('通过', scope.row)" size="medium">通过</el-button>
              <el-button type="text" @click="showDialog('拒绝', scope.row)" size="medium">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p style="margin-bottom: 20px;">选择以下原因后拒绝：</p>
      <el-radio-group v-model="refuseLabel">
        <el-radio label="由于您的账户存在安全风险，已暂时冻结">由于您的账户存在安全风险，已暂时冻结</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureRefuse">确 定</el-button>
      </span>
    </el-dialog>
    <section class="block" v-if="withdrawList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="withdrawList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["withdrawList"])
  },
  data() {
    return {
      financepara: {
        auditStatus: "apply",
        page: 1,
        count: 10,
        startTime: "",
        endTime: ""
      },
      statusvalue: "",
      status: {
        options: [
          {
            value: "已通过",
            label: "已通过"
          },
          {
            value: "已拒绝",
            label: "已拒绝"
          }
        ]
      },
      phonenum: "",
      dialogVisible: false,
      refuseLabel: "由于您的账户存在安全风险，已暂时冻结",
      listRow: {},
      listType: "",
      pagenum: 1,
      pagesize: 10,
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
      dataValue: "",
      currentSize: 0,
      currentPage: 0
    };
  },
  created() {
    this.withdrawAuthList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["withdrawAuthList", "authStatus"]),
    bindSearch() {},
    handleSelect() {
      this.pagenum = 1;
      this.withdraw_list();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.withdraw_list();
    },
    async withdraw_list() {
      let self = this;
      self.financepara["page"] = self.pagenum;
      self.financepara["startTime"] = self.dataValue[0] || "";
      self.financepara["endTime"] = self.dataValue[1] || "";
      await self.withdrawAuthList(self.financepara);
    },
    // 近期流水
    toserial(s, row) {
      let p = {
        currentSize: s.$index + 1,
        currentPage: this.pagenum
      };
      this.currentSize = s.$index + 1;
      this.currentPage = this.pagenum;
      window.sessionStorage.setItem("p", JSON.stringify(p));
      window.sessionStorage.setItem("row", JSON.stringify(row));
      window.open(`/finance/serial?id=${row.withdraw.uid}`);
      // this.$router.push({
      //   path: `/finance/serial?id=${row.withdraw.uid}`
      // });
    },
    async showDialog(type, row) {
      let self = this;
      self.listRow = row;
      self.listType = type;
      if (type === "通过") {
        if (row.isLock != "unlock") {
          self.$message.warning("该用户已被设置为不可提现，无法通过审核!");
          return;
        }
        let confirm = `此操作将通过 ${row.userName} 提现审核, 是否继续?`;
        self
          .$confirm(confirm, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            self.audit();
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        self.dialogVisible = true;
      }
    },
    // 确认拒绝
    sureRefuse() {
      let self = this;
      if (!this.refuseLabel) {
        self.$message.warning("请选择拒绝理由！");
        return;
      }
      let confirm = `此操作将拒绝过 ${
        self.listRow.userName
      } 提现审核, 是否继续?`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.audit();
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 审核操作
    async audit() {
      let self = this;
      let para;
      if (self.listType === "通过") {
        para = {
          withdrawId: self.listRow.withdraw.withdrawId,
          auditStatus: "success"
        };
      } else {
        para = {
          withdrawId: self.listRow.withdraw.withdrawId,
          auditStatus: "fail",
          rejectReason: self.refuseLabel
        };
      }
      let res = await self.authStatus(para);
      if (res) {
        self.withdraw_list();
        self.dialogVisible = false;
      }
    }
  }
};
</script>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 65px;
}
.label-phone {
  width: 200px;
}
.status-check {
  width: 100px;
}
.list-filter-select {
  margin-left: 20px;
}

.covers {
  padding: 10px;
  background: #a71616;
  color: #fff;
}
</style>
