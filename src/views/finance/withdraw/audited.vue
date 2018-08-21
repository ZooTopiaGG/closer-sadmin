<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-align-center flex-pack-justify">
        <!-- <el-select class='status-check' v-model="statusvalue" placeholder="请选择">
          <el-option v-for="item in status.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input class="label-phone" v-model="phonenum" maxlength="11" @keyup.enter.native="bindSearch" placeholder="请输入手机号">
          <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
        </el-input> -->
        <section class="flex flex-align-center">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
        </section>
        <!-- <section class="all-numbers">
          <span>提现用户数： 1000</span>
        </section>
        <section class="flex flex-align-center">
          <el-button type="primary" class="text-button">导出数据</el-button>
        </section> -->
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content">
        <el-table :data="withdrawList.data" style="width: 100%">
          <el-table-column fixed prop="userName" label="申请人昵称">
          </el-table-column>
          <el-table-column prop="userPhone" label="手机号">
          </el-table-column>
          <el-table-column prop="payeeAccount" label="支付宝ID">
          </el-table-column>
          <el-table-column prop="withdrawAmt" label="已提现金额">
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="auditStatus" label="状态">
          </el-table-column>
          <el-table-column prop="withdrawRemark" label="拒绝理由">
          </el-table-column>
          <el-table-column prop="auditUser" label="审核人员">
          </el-table-column>
        </el-table>
      </section>
    </section>
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
        auditStatus: "audited",
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
      dataValue: ""
    };
  },
  created() {
    this.withdrawAuthList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["withdrawAuthList"]),
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
</style>
