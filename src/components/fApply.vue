<template>
  <section id="permission" class="flex flex-v">    
    <section>
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="flex flex-align-center" style="margin-right: 15px;">
            <el-select class='list-filter-select' @change="handleSelectResult" v-model="recharge_result" placeholder="全部结果">
              <el-option v-for="item in recharge_result_list" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </section>
          <section class="flex flex-align-center">
            <el-autocomplete
            v-model="columnName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入栏目名称"
            @select="handleSearch"
          >
          </el-autocomplete>
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
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="auditList.data" style="width: 100%">
          <el-table-column fixed prop="communityName" label="申请贴近号">
          </el-table-column>
          <el-table-column prop="communityId" label="贴近号ID">
          </el-table-column>
          <el-table-column prop="fromUserName" label="申请者昵称">
          </el-table-column>
          <el-table-column prop="dailyAllowanceAmtOld" label="原日缓释金额">
          </el-table-column>
          <el-table-column prop="dailyAllowanceAmt" label="申请缓释">
          </el-table-column>
          <el-table-column prop="transMaxAmtOld" label="原单一帖发放上限">
          </el-table-column>
          <el-table-column prop="transMaxAmt" label="申请上限">
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="auditTime" label="审批时间">
          </el-table-column>
          <el-table-column prop="auditStatus" label="操作结果">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="auditList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="auditList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mixins: ["myMixins"],
  computed: {
    ...mapState("finance", ["auditList"]),
    authUser() {
      return this.$store.state.authUser;
    }
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
      columnid: "",
      columnName: "",
      pagenum: 1,
      pagesize: 10,
      recharge_result: "",
      recharge_result_list: [
        {
          label: "全部结果",
          value: ""
        },
        {
          label: "拒绝",
          value: "fail"
        },
        {
          label: "通过",
          value: "success"
        }
      ],
      keys: [
        "申请贴近号",
        "贴近号ID",
        "申请者昵称",
        "原日缓释金额",
        "申请缓释",
        "原单一帖发放上限",
        "申请上限",
        "申请时间",
        "审批时间",
        "操作结果"
      ],
      values: [
        "communityName",
        "communityId",
        "fromUserName",
        "dailyAllowanceAmtOld",
        "dailyAllowanceAmt",
        "transMaxAmtOld",
        "transMaxAmt",
        "applyTime",
        "auditTime",
        "auditStatus"
      ]
    };
  },
  created() {
    this.settingAuditList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["settingAuditList"]),
    async preDownCsv() {
      let self = this;
      await self.settingAuditList2csv({
        auditStatus: self.recharge_result || "",
        uid: self.columnid || null
      });
      await self.json2csv(
        self.rechargeList2Csv.data,
        self.keys,
        self.values,
        `财务审核-改政策记录`
      );
    },
    async handleSearch(item) {
      this.pagenum = 1;
      if (item.objectID) {
        this.columnid = item.objectID;
      }
      await this.handleSelect();
    },
    async handleSelect() {
      let self = this;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["auditStatus"] = self.recharge_result || "";
      self.financepara["uid"] = self.columnid || null;
      await self.settingAuditList(self.financepara);
    },
    async clearSearch() {
      let self = this;
      self.pagenum = 1;
      self.recharge_result = "";
      self.columnName = "";
      self.columnid = null;
      await this.handleSelect();
    },
    async handleSelectResult() {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async handleCurrentChange(val) {
      this.pagenum = val;
      await this.handleSelect();
    }
  }
};
</script>
<style type="text/css">
.userinfo .el-input .el-input__inner {
  width: 150px;
}
</style>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 65px;
}
.inputCode {
  width: 200px;
}
.userinfo .middle-label {
  width: 200px;
}
.userinfo .middle-label-2 {
  width: 215px;
}
.userinfo .long-label {
  width: 380px;
}

.hr {
  background-color: #e6e6e6;
  height: 1px;
  margin-top: 20px;
}
</style>
