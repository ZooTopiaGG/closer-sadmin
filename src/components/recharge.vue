<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect2" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-select class='list-filter-select' @change="handleSelect2" v-model="recharge_result" placeholder="全部结果">
              <el-option v-for="item in recharge_result_list" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
        <el-table :data="rechargeList.data" style="width: 100%">
          <el-table-column fixed prop="type" label="类型">
          </el-table-column>
          <el-table-column prop="rechargeAmt" label="一次性到账额度">
          </el-table-column>
          <el-table-column prop="totalAllowanceAmt" label="缓释额度">
          </el-table-column>
          <el-table-column prop="auditUid" label="审批人ID">
          </el-table-column>
          <el-table-column prop="auditUser" label="审批人昵称">
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="auditTime" label="审批时间">
          </el-table-column>
          <el-table-column label="操作结果">
            <template slot-scope="scope">
              <span v-if="scope.row.auditStatus === '通过'" style="color: green;">{{ scope.row.auditStatus }}</span>
              <span v-else-if="scope.row.auditStatus === '拒绝'" style="color: red;">{{ scope.row.auditStatus }}</span>
              <span v-else>{{ scope.row.auditStatus }}</span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="rechargeList.count > 0">
      <el-pagination @current-change="handleSelect1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="rechargeList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", [
      "communityRecordsList",
      "rechargeInfo",
      "newRechargeList",
      "rechargeList"
    ])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        auditStatus: "",
        startTime: null,
        endTime: null,
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
      recharge_result_list: [
        {
          label: "全部结果",
          value: ""
        },
        {
          label: "通过",
          value: "success"
        },
        {
          label: "审核中",
          value: "apply"
        },
        {
          label: "拒绝",
          value: "fail"
        }
      ],
      recharge_result: "",
      keys: [
        "类型",
        "一次性到账金额",
        "缓释金额",
        "审批人ID",
        "审批人昵称",
        "申请时间",
        "审批时间",
        "操作结果"
      ],
      values: [
        "type",
        "rechargeAmt",
        "totalAllowanceAmt",
        "auditUid",
        "auditUser",
        "applyTime",
        "auditTime",
        "auditStatus"
      ]
    };
  },
  created() {
    this.financepara["uid"] = this.$route.query.id;
    this.allRechargeList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["allRechargeList"]),
    async preDownCsv() {
      let self = this;
      let name = JSON.parse(window.sessionStorage.getItem("closer_cloumn_row"))
        .name;
      await self.allRechargeList2csv({
        auditStatus: "",
        startTime: self.dataValue[0] || null,
        endTime: self.dataValue[1] || null,
        uid: self.$route.query.id || null
      });
      await self.json2csv(
        self.rechargeList2Csv.data,
        self.keys,
        self.values,
        `${name}-充值记录`
      );
    },
    async handleSelect() {
      let self = this;
      self.financepara["startTime"] = self.dataValue[0] || null;
      self.financepara["endTime"] = self.dataValue[1] || null;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["auditStatus"] = self.recharge_result || "";
      await self.allRechargeList(self.financepara);
    },
    async handleSelect1(val) {
      this.pagenum = val;
      await this.handleSelect();
    },
    async handleSelect2(val) {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async clearSearch() {
      let self = this;
      self.dataValue = "";
      self.pagenum = 1;
      self.recharge_result = "";
      await this.handleSelect();
    },
    // 获取栏目列表
    async getColumnaList() {
      let self = this;
      await self.rechargeListNew(self.financepara);
    },
    // 查看栏目详情 community_detail 充值记录wallet_detail_list
    async handleLook(row) {
      let self = this;
      self.row = row;
      await self.get_community_detail();
      await self.wallet_detail_list();
      self.dialogTableVisible = true;
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
