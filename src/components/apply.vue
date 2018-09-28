<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelectResult" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-select class='list-filter-select' @change="handleSelectResult" v-model="recharge_result" placeholder="全部结果">
              <el-option v-for="item in recharge_result_list" :key="item.region_name" :label="item.region_name" :value="item.region_id">
              </el-option>
            </el-select>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section class="flex flex-align-center">
          <section style="margin-left: 15px;">
            <el-button type="primary">导出数据</el-button>
          </section>
        </section>
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="rechargeList.data" style="width: 100%">
          <el-table-column fixed prop="name" label="原日缓释金额">
          </el-table-column>
          <el-table-column prop="objectID" label="申请缓释">
          </el-table-column>
          <el-table-column prop="transMaxAmt" label="原单一帖发放上限">
          </el-table-column>
          <el-table-column prop="objectID" label="申请上限">
          </el-table-column>
          <el-table-column prop="create_time" label="审批人ID">
          </el-table-column>
          <el-table-column prop="fromUserName" label="审批人昵称">
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="create_time" label="审批时间">
          </el-table-column>
          <el-table-column prop="create_time" label="操作结果">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="rechargeList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="rechargeList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["rechargeList"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        toUid: null,
        auditStatus: "all"
      },
      columnid: null,
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
      recharge_result_list: [],
      recharge_result: ""
    };
  },
  created() {
    this.rechargeSettingsApplyList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["rechargeSettingsApplyList"]),

    async handleSelect() {
      let self = this;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["auditStatus"] = self.recharge_result || "";
      self.financepara["endTime"] = self.dataValue[1] || "";
      self.financepara["startTime"] = self.dataValue[0] || "";
      await self.userWalletDetail(self.financepara);
    },
    async clearSearch() {
      let self = this;
      self.pagenum = 1;
      self.recharge_result = "";
      self.dataValue = "";
      await this.handleSelect();
    },
    async handleSelectResult() {
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
