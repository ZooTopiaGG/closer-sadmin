<template>
  <section id="permission" class="flex flex-v">    
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
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
        <el-table :data="rechargeList2.data" style="width: 100%">
          <el-table-column fixed prop="communityName" label="申请贴近号">
          </el-table-column>
          <el-table-column prop="communityId" label="贴近号ID">
          </el-table-column>
          <el-table-column prop="fromUserName" label="申请者昵称">
          </el-table-column>
          <el-table-column prop="originalDailyAllowanceAmt" label="原日缓释金额">
          </el-table-column>
          <el-table-column prop="dailyAllowanceAmt" label="申请缓释">
          </el-table-column>
          <el-table-column prop="originalTransMaxAmt" label="原单一帖发放上限">
          </el-table-column>
          <el-table-column prop="transMaxAmt" label="申请上限">
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook(scope.row)" size="medium">查看号</el-button>
              <el-button type="text" @click="thenSureOrRefuse('success', scope.row)" size="medium">同意</el-button>
              <el-button type="text" @click="thenSureOrRefuse('fail', scope.row)" size="medium">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="rechargeList2.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="rechargeList2.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mixins: ["myMixins"],
  computed: {
    ...mapState("finance", ["rechargeList2"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        auditStatus: "apply",
        uid: null
      },
      columnid: "",
      columnName: "",
      pagenum: 1,
      pagesize: 10,
      dialogTableVisible: false,
      innerVisible: false,
      row: "",
      recharge_type: "",
      recharge_type_list: [],
      keys: [
        "申请贴近号",
        "贴近号ID",
        "申请者昵称",
        "原日缓释金额",
        "申请缓释",
        "原单一帖发放上限",
        "申请上限",
        "申请时间"
      ],
      values: [
        "communityName",
        "communityId",
        "fromUserName",
        "originalDailyAllowanceAmt",
        "dailyAllowanceAmt",
        "originalTransMaxAmt",
        "transMaxAmt",
        "applyTime"
      ]
    };
  },
  created() {
    this.rechargeSettingsApplyList(this.financepara);
  },
  methods: {
    ...mapActions("finance", [
      "rechargeSettingsApplyList",
      "auditRechargeSetting"
    ]),
    async preDownCsv() {
      let self = this;
      await self.rechargeSettingsApplyList2csv({
        auditStatus: "apply",
        uid: self.columnid || null
      });
      await self.json2csv(
        self.rechargeList2Csv.data,
        self.keys,
        self.values,
        `财务审核-待审批-改政策`
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
      self.financepara["uid"] = self.columnid || null;
      await self.rechargeSettingsApplyList(self.financepara);
    },
    async clearSearch() {
      this.pagenum = 1;
      this.columnName = "";
      this.columnid = null;
      await this.handleSelect();
    },
    async handleCurrentChange(val) {
      this.pagenum = val;
      await this.handleSelect();
    },
    handleLook(row) {
      row["name"] = row["communityName"];
      window.sessionStorage.setItem("closer_cloumn_row", JSON.stringify(row));
      window.open(`/finance/closer?type=info&id=${row.communityId}&from=audit`);
      // this.$router.push({
      //   path: `/finance/closer?type=info&id=${row.communityId}&from=audit`
      // });
    },
    // 同意拒绝审批 commit_apply recharge_audit
    async sureOrRefuse(type) {
      let self = this,
        res = false;
      res = await self.auditRechargeSetting({
        uid: self.row.uid,
        auditStatus: type
      });
      if (res) {
        self.innerVisible = false;
        self.dialogTableVisible = false;
        await self.handleSelect();
      }
    },
    // 同意或者拒绝
    async thenSureOrRefuse(type, row) {
      let self = this;
      self.row = row;
      let confirm;
      if (type === "fail") {
        confirm = `此操作将拒绝${self.row.communityName}的审批, 是否继续?`;
      } else {
        confirm = `此操作将同意${self.row.communityName}的审批, 是否继续?`;
      }
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.sureOrRefuse(type);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
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
