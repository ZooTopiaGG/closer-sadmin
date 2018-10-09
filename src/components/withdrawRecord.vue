<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-v">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect1" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section class="flex flex-align-center flex-pack-justify">
          <section class="withdraw_desc flex flex-align-center flex-1">
            <p><span>用户昵称：</span><span>{{ row.userName }}</span></p>
            <p><span>ID：</span><span>{{ row.objectID }}</span></p>
            <p><span>支付宝账号：</span><span>{{ row.payeeAccount }}</span></p>
            <p><span>手机号：</span><span>{{ row.userPhone }}</span></p>
            <p><span>身份证号码：</span><span>{{ row.certNo }}</span></p>
          </section>
          <section class="flex flex-align-center">
            <section style="margin-left: 15px;">
              <el-button type="primary" @click="preDownCsv">导出数据</el-button>
            </section>
          </section>
        </section>
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="withdrawList.data" style="width: 100%">
          <el-table-column prop="withdrawApply" label="提现金额">
          </el-table-column>
          <el-table-column prop="createTime" label="包含税金">
          </el-table-column>
          <el-table-column prop="createTime" label="实际提现金额">
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="createTime" label="审批时间">
          </el-table-column>
          <el-table-column prop="auditStatus" label="审批结果">
          </el-table-column>
          <el-table-column prop="withdrawRemark" label="拒绝理由">
          </el-table-column>
          <el-table-column prop="auditUser" label="经办人">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="withdrawList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
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
        auditStatus: "",
        page: 1,
        count: 10,
        startTime: "",
        endTime: "",
        uid: null
      },
      dialogTableVisible: false,
      pagenum: 1,
      pagesize: 10,
      row: {},
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
      username: "",
      recharge_type: "",
      recharge_type_list: [],
      keys: [
        "提现金额",
        "包含税金",
        "实际提现金额",
        "申请时间",
        "审批时间",
        "审批结果",
        "拒绝理由",
        "经办人"
      ],
      values: [
        "withdrawApply",
        "withdrawTax",
        "withdrawAmt",
        "createTime",
        "auditTime",
        "auditStatus",
        "withdrawRemark",
        "auditUser"
      ]
    };
  },
  created() {
    this.row = JSON.parse(window.sessionStorage.getItem("closer_user_info"));
    this.financepara["uid"] = this.$route.query.id;
    this.withdrawAuthList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["withdrawAuthList"]),
    async preDownCsv() {
      let self = this;
      await self.withdrawAuthList2csv({
        auditStatus: "",
        startTime: self.dataValue[0] || "",
        endTime: self.dataValue[1] || "",
        uid: self.$route.query.id
      });
      await self.json2csv(
        self.withdrawList2csv.data,
        self.keys,
        self.values,
        `提现审核-提现记录-用户昵称：${self.row.userName}-手机号：${
          self.row.userPhone
        }-身份证号：${self.row.certNo}-支付宝号：${self.row.payeeAccount}`
      );
    },
    async handleSelect() {
      let self = this;
      self.financepara["uid"] = self.$route.query.id;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["transChannel"] = self.recharge_type || "";
      self.financepara["endTime"] = self.dataValue[1] || "";
      self.financepara["startTime"] = self.dataValue[0] || "";
      await self.withdrawAuthList(self.financepara);
    },
    async clearSearch() {
      let self = this;
      self.pagenum = 1;
      self.recharge_type = "";
      self.dataValue = "";
      await this.handleSelect();
    },
    async handleSelect1() {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async handleCurrentChange1(val) {
      this.pagenum = val;
      await this.handleSelect();
    }
  }
};
</script>
<style>
.column-dialog .el-dialog {
  margin-top: 5vh !important;
}

.block.eldialog-block {
  margin-bottom: 0;
}
</style>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 50px;
}
.withdraw_desc > p {
  margin-right: 10px;
}
</style>
