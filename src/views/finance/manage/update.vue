<template>
  <section id="permission" class="apply flex flex-v">
    <section class="permission_title">财务申请</section>
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center userinfo">
          <el-input v-model="columnid" class="inp" placeholder="请输入贴近号名称、企业、个人名称进行搜索" @keyup.enter.native="bindSearch">
            <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
          </el-input>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content">
        <el-table :data="communityList.data" style="width: 100%">
          <el-table-column fixed prop="name" label="贴近号名称">
          </el-table-column>
          <el-table-column prop="objectID" label="企业（个人）名称">
          </el-table-column>
          <el-table-column prop="create_time" label="未解冻余额">
          </el-table-column>
          <el-table-column prop="objectID" label="可用余额">
          </el-table-column>
          <el-table-column prop="create_time" label="累计充值">
          </el-table-column>
          <el-table-column prop="objectID" label="累计补贴">
          </el-table-column>
          <el-table-column label="日缓释金额">
            <template slot-scope="scope">
              <section class="flex flex-align-center">
                <span>{{ scope.row.create_time }}</span>
                <i class="write" @click="update_recharge(0)"></i>
              </section>
            </template>
          </el-table-column>
          <el-table-column label="单一贴发放上线">
            <template slot-scope="scope">
              <section class="flex flex-align-center">
                <span>{{ scope.row.objectID }}</span>
                <i class="write" @click="update_recharge(1)"></i>
              </section>
            </template>
          </el-table-column>
          <el-table-column label="充值（一次性到账）">
            <template slot-scope="scope">
              <section class="flex flex-align-center">
                <span>{{ scope.row.create_time }}</span>
                <i class="write" @click="update_recharge(2)"></i>
              </section>
            </template>
          </el-table-column>
          <el-table-column label="充值（缓释额度）">
            <template slot-scope="scope">
              <section class="flex flex-align-center">
                <span>{{ scope.row.objectID }}</span>
                <i class="write" @click="update_recharge(3)"></i>
              </section>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook" size="medium">查看详情</el-button>
              <el-button type="text" @click="handleRecords" size="medium">其他记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section v-if="dialogTableVisible">
        <recharge-popup :title="title" :type="type" @visible="visible"></recharge-popup> 
      </section>
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
import rechargePopup from "@/components/rechargePopup";
export default {
  computed: {
    ...mapState("finance", ["communityList"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  components: {
    rechargePopup
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
      },
      // 改版data
      title: "每日缓释额度"
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
    visible(val) {
      this.dialogTableVisible = val;
    },
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
    },

    // 改版方法
    update_recharge(type) {
      let self = this;
      self.dialogTableVisible = true;
      self.type = type;
      if (type === 1) {
        self.title = "单一贴发放上限";
      } else if (type === 2 || type === 3) {
        self.title = "充值";
      } else {
        self.title = "每日缓释金额";
      }
    },
    handleLook() {
      this.$router.push({
        path: "/finance/closer?type=info"
      });
    },
    handleRecords() {
      this.$router.push({
        path: "/finance/closer?type=fee"
      });
    }
  }
};
</script>
<style type="text/css">
.userinfo .inp.el-input .el-input__inner {
  width: 350px;
}
.userinfo2 .el-input .el-input__inner {
  width: 150px;
  margin-right: 5px;
}
#app .apply .el-dialog__body {
  padding: 10px 20px;
}
#app .apply .el-dialog {
  min-width: 320px;
  width: 320px;
}
#app .apply .column-dialog .el-button--text {
  color: #999;
}
#app .apply .column-dialog .el-form-item {
  margin-bottom: 0;
}
#app .apply .column-dialog p {
  margin: 0;
}
#app .apply .column-dialog .el-form-item__label {
  min-width: 82px;
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
.write {
  width: 18px;
  min-width: 18px;
  height: 18px;
  background: url("../../../assets/images/write.png") no-repeat;
  margin-left: 5px;
  background-size: cover;
}
.prompt {
  color: red;
  font-size: 12px;
  margin-left: 68px;
}
</style>
