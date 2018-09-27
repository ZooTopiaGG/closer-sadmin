<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">
      <span style="margin-right: 30px;">提现申请/近期流水</span>
    </section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify flex-align-center">
        <!-- <section class="flex flex-align-center">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
        </section> -->
        <section>
        </section>
        <section class="flex flex-align-center">
          <section v-if="listRow" style="margin-right: 20px;">
            <span>本次提现总额：</span>
            <span style="color: #a71616; font-weight: bold;font-size: 24px">{{ listRow.withdrawAmt }}</span><span> 元</span>
          </section>
          <el-button type="primary" class="text-button" @click="showDialog('通过')">通过</el-button>
          <el-button type="primary" class="text-button" @click="showDialog('拒绝')">拒绝</el-button>
          <el-button type="primary" class="text-button" @click="json2csv">导出数据</el-button>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content">
        <el-table :data="serialList.data" style="width: 100%">
          <el-table-column fixed prop="transChannel" label="类型">
          </el-table-column>
          <el-table-column prop="transAmt" label="金额">
          </el-table-column>
          <!-- <el-table-column prop="transAmt" label="当前账户余额">
          </el-table-column>
          <el-table-column prop="transAmt" label="非解冻金额">
          </el-table-column> -->
          <el-table-column prop="createTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="transRemark" label="说明">
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
    <section class="block" v-if="serialList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="serialList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["serialList"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        uid: null
      },
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
      dialogVisible: false,
      refuseLabel: "由于您的账户存在安全风险，已暂时冻结",
      listRow: ""
    };
  },
  created() {
    this.financepara["uid"] = this.$route.query.id;
    this.userWalletDetail(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["userWalletDetail", "authStatus"]),
    handleSelect() {
      this.serial_list();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.serial_list();
    },
    async serial_list() {
      let self = this;
      self.financepara["uid"] = self.$route.query.id;
      self.financepara["page"] = self.pagenum;
      await self.userWalletDetail(self.financepara);
    },
    async showDialog(type) {
      let self = this;
      self.listType = type;
      if (type === "通过") {
        if (self.listRow.isLock != "unlock") {
          self.$message.warning("该用户已被设置为不可提现，无法通过审核!");
          return;
        }
        let confirm = `此操作将通过 ${
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
      let self = this,
        para;
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
      let res = await self.authStatus({
        withdrawId: self.listRow.withdraw.withdrawId,
        auditStatus: "fail",
        rejectReason: self.refuseLabel
      });
      if (res) {
        self.dialogVisible = false;
      }
    },
    async exportData() {
      let self = this,
        newData = new Array(),
        sd = self.serialList["data"];
      newData = newData.concat(sd, sd);
      return newData;
    },
    async json2csv() {
      let self = this;
      let newData = await self.exportData();
      if (newData.length > 0) {
        JSonToCSV.setDataConver({
          data: newData,
          fileName: "testjson2csv",
          columns: {
            title: ["类型", "金额", "申请时间", "说明"],
            key: ["transChannel", "transAmt", "createTime", "transRemark"]
            // formatter: function(n, v) {
            //   if (n === "transAmt" && !isNaN(Number(v))) {
            //     v = v + "";
            //     v = v.split(".");
            //     v[0] = v[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 千分位的设置
            //     return v.join(".");
            //   }
            //   if (n === "proportion") return v + "%";
            // }
          }
        });
      }
    }
  },
  mounted() {
    let self = this;
    self.listRow = JSON.parse(window.sessionStorage.getItem("row"));
  }
};
</script>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 65px;
}
.list-filter-select {
  margin-left: 20px;
}
</style>
