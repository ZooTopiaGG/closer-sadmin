<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">财务申请</section>
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            栏目名称
          </span>
          <el-input v-model="columnid" placeholder="请输入栏目ID" @keyup.enter.native="bindSearch">
            <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
          </el-input>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content">
        <el-table :data="communityList.data" style="width: 100%">
          <el-table-column fixed prop="name" label="栏目名称">
          </el-table-column>
          <el-table-column prop="objectID" label="栏目ID">
          </el-table-column>
          <el-table-column prop="create_time" label="栏目入驻时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row, '改政策')" size="medium">改政策</el-button>
              <el-button type="text" @click="handleClick(scope.row, '充额度')" size="medium">充额度</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <!-- el-dialog -->
      <el-dialog title="栏目详情" class="column-dialog" :visible.sync="dialogTableVisible">
        <el-form class="userinfo" :model="ruleForm" :disabled="disabled">
          <p class="flex flex-align-center">
            <span class="label">栏目归属地：</span>
            <span>{{ ruleForm.regionName }}</span>
          </p>
          <p class="flex flex-align-center">
            <span class="label">栏目名称：</span>
            <span>{{ ruleForm.name }}</span>
          </p>
          <p class="hr"></p>
          <p class="flex flex-align-center">
            <span class="label label-bold">状态</span>
          </p>
          <p class="flex flex-align-center">
            <span class="label">栏目当前余额：</span>
            <span>{{ ruleForm.balance }}</span>
          </p>
          <p class="flex flex-align-center">
            <span class="label">累计补贴额度：</span>
            <span>{{ ruleForm.allsubsidy }}</span>
          </p>
          <p class="flex flex-align-center">
            <span class="label">每天发放额度：</span>
            <span>{{ ruleForm.give }}</span>
          </p>
          <p class="flex flex-align-center">
            <span class="middle-label-2">每个贴子能够发放的额度上限：</span>
            <span>{{ ruleForm.givelimit }}</span>
          </p>
          <p class="hr"></p>
          <p class="flex flex-align-center">
            <span class="label label-bold">栏目财务管理</span>
          </p>
          <p class="flex flex-align-center" v-if="type==='充额度'">
            <span class="middle-label">新增一次性到账额度：</span>
            <el-input v-model="ruleForm.rechargeAmount"></el-input>
          </p>
          <p class="flex flex-align-center" v-if="type==='充额度'">
            <span class="middle-label">新增缓释额度：</span>
            <el-input v-model="ruleForm.subsidy"></el-input>
          </p>
          <p class="flex flex-align-center" v-if="type==='改政策'">
            <span class="middle-label">每天发放额度：</span>
            <el-input v-model="ruleForm.give1"></el-input>
          </p>
          <p class="flex flex-align-center" v-if="type==='改政策'">
            <span class="long-label">每个贴子能够发放的额度上限：</span>
            <el-input v-model="ruleForm.givelimit1"></el-input>
          </p>
        </el-form>
        <span v-if="operationType === 0" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="f_commit_apply" :disabled="loading">
            <span v-if="loading">
              <span class="el-icon-loading"></span>
              <span>正在提交</span>
            </span>
            <span v-else>提交申请</span>
          </el-button>
        </span>
        <span v-else slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sureOrRefuse('fail')">拒绝</el-button>
          <el-button type="primary" @click="sureOrRefuse('success')">同意</el-button>
        </span>
      </el-dialog>
    </section>
    <section class="block" v-if="communityList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="communityList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["communityList"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        id: null
      },
      columnid: "",
      loading: false,
      pagenum: 1,
      pagesize: 10,
      dialogTableVisible: false,
      operationType: 0, //0 改政策 1 查看
      disabled: false,
      row: "",
      type: "", // 改政策， 充额度
      ruleForm: {
        regionName: "",
        region: "",
        balance: "",
        allsubsidy: "",
        give: "",
        givelimit: "",
        rechargeAmount: "",
        subsidy: "",
        give1: "",
        givelimit1: ""
      }
    };
  },
  created() {
    let self = this;
    self.getCommunityList(self.financepara);
  },
  methods: {
    ...mapActions("finance", [
      "getCommunityList",
      "communityDetail",
      "updateRechargeSetting",
      "commitApply"
    ]),
    bindSearch() {
      this.pagenum = 1;
      this.getMoreColumnList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getMoreColumnList();
    },
    // 获取栏目列表
    async getMoreColumnList() {
      let self = this;
      self.financepara["id"] = self.columnid;
      self.financepara["page"] = self.pagenum;
      await self.getCommunityList(self.financepara);
    },
    // 改政策查看 community_detail 改政策commit_apply 同意recharge_audit
    async lookAndModify() {
      let self = this;
      self.loading = false;
      let res = await self.communityDetail({
        communityId: self.row.objectID
      });
      if (res) {
        self.ruleForm = {
          name: self.row.name,
          regionName: self.row.regionName,
          balance: res.UMSWallet.availableBalance / 100,
          allsubsidy: res.UMSWalletRechargeSummary.totalAllowancedAmt / 100,
          give: res.UMSWalletRechargeSummary.dailyAllowanceAmt / 100,
          givelimit: res.UMSWalletRechargeSummary.transMaxAmt / 100,
          rechargeAmount: "",
          subsidy: "",
          give1: res.UMSWalletRechargeSummary.dailyAllowanceAmt / 100,
          givelimit1: res.UMSWalletRechargeSummary.transMaxAmt / 100
        };
      }
    },
    // table操作
    async handleClick(row, type) {
      console.log("row===", row);
      let self = this;
      self.row = row;
      self.type = type;
      await self.lookAndModify();
      self.dialogTableVisible = true;
      self.operationType = 0;
      self.disabled = false;
    },
    async update_recharge_setting() {
      // update_recharge_setting 改政策
      let self = this;
      if (
        !self.$com.isInteger(Number(self.ruleForm.give1)) ||
        Number(self.ruleForm.give1) <= 0
      ) {
        self.$message.warning("请输入大于零的正整数，如1，11，111...");
        self.loading = false;
        return false;
      }
      if (
        !self.$com.isInteger(Number(self.ruleForm.givelimit1)) ||
        Number(self.ruleForm.givelimit1) <= 0
      ) {
        self.$message.warning("请输入大于零的正整数，如1，11，111...");
        self.loading = false;
        return false;
      }
      let res = await self.updateRechargeSetting({
        toUid: self.row.objectID, //被改政策用户ID
        dailyAllowanceAmt: self.ruleForm.give1 * 100 || 0, //每天发放额度(单位分)
        transMaxAmt: self.ruleForm.givelimit1 * 100 || 0 //每个帖子能够发放的额度上线
      });
      if (res) {
        self.dialogTableVisible = false;
      } else {
        self.loading = false;
      }
    },

    async commit_apply() {
      // commit_apply 充额度
      let self = this;
      if (self.ruleForm.rechargeAmount == "" && self.ruleForm.subsidy == "") {
        self.$message.warning("所填额度不能为空或填入额度必须大于零");
        self.loading = false;
        return;
      }
      if (
        !self.$com.isInteger(Number(self.ruleForm.rechargeAmount)) ||
        Number(self.ruleForm.rechargeAmount) < 0
      ) {
        self.$message.warning("请输入大于零的正整数，如1，11，111...");
        self.loading = false;
        return false;
      }
      if (
        !self.$com.isInteger(Number(self.ruleForm.subsidy)) ||
        Number(self.ruleForm.subsidy) < 0
      ) {
        self.$message.warning("请输入大于零的正整数，如1，11，111...");
        self.loading = false;
        return false;
      }
      let res = await self.commitApply({
        toUid: self.row.objectID, //被充额度用户ID
        rechargeAmt: self.ruleForm.rechargeAmount * 100 || 0, //新增一次性到账额度(单位分)
        totalAllowanceAmt: self.ruleForm.subsidy * 100 || 0 //新增缓释额度(单位分)
      });
      if (res) {
        self.dialogTableVisible = false;
      } else {
        self.loading = false;
      }
    },
    // 提交申请 commit_apply recharge_audit
    async f_commit_apply() {
      let self = this;
      self.loading = true;
      if (self.type === "改政策") {
        await self.update_recharge_setting();
      } else {
        await self.commit_apply();
      }
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

.userinfo .middle-label {
  width: 170px;
}

.userinfo .middle-label-2 {
  width: 215px;
}

.userinfo .long-label {
  width: 380px;
}
.userinfo .middle-label {
  width: 200px;
}
.hr {
  background-color: #e6e6e6;
  height: 1px;
  margin-top: 20px;
}
</style>
