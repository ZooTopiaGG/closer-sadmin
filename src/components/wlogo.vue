<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px;">
            <el-input v-model="user_phone" placeholder="请输入手机号" @keyup.enter.native="handleSearch">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section class="flex flex-align-center">
          <section style="margin-left: 15px;">
            <el-button type="primary" @click="preDownCsv">导出数据</el-button>
          </section>
        </section>
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="withdrawList2.data" style="width: 100%">
          <el-table-column fixed prop="objectID" label="ID">
          </el-table-column>
          <el-table-column prop="userName" label="申请者昵称">
          </el-table-column>
          <el-table-column prop="userPhone" label="手机号">
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号">
          </el-table-column>
          <el-table-column prop="withdrawApply" label="提现金额">
          </el-table-column>
          <el-table-column prop="withdrawTax" label="包含税金">
          </el-table-column>
          <el-table-column prop="withdrawAmt" label="实际提现金额">
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="auditTime" label="审批时间">
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
    <section class="block" v-if="withdrawList2.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="withdrawList2.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["withdrawList2"])
  },
  data() {
    return {
      financepara: {
        auditStatus: "audited",
        userName: "",
        page: 1,
        count: 10,
        startTime: "",
        endTime: ""
      },
      dialogTableVisible: false,
      user_phone: "",
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
      keys: [
        "ID",
        "申请者昵称",
        "手机号",
        "身份证号",
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
        "objectID",
        "userName",
        "userPhone",
        "certNo",
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
    this.withdrawAuthList2(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["withdrawAuthList2"]),
    async preDownCsv() {
      let self = this;
      await self.withdrawAuthList2csv({
        auditStatus: "audited",
        userName: self.user_phone || "",
        startTime: self.dataValue[0] || "",
        endTime: self.dataValue[1] || ""
      });
      await self.json2csv(
        self.withdrawList2csv.data,
        self.keys,
        self.values,
        `提现审核-审核记录`
      );
    },
    async handleSelect() {
      let self = this;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["userName"] = self.user_phone || "";
      self.financepara["startTime"] = self.dataValue[0] || "";
      self.financepara["endTime"] = self.dataValue[1] || "";
      await self.withdrawAuthList2(self.financepara);
    },
    async clearSearch() {
      this.dataValue = "";
      this.pagenum = 1;
      this.user_phone = "";
      await this.handleSelect();
    },
    async handleSearch() {
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
</style>
