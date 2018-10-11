<template>
  <section id="closerInfo" class="closer">
    <el-dialog :title="title" class="column-dialog" @close="handleClose" :visible.sync="dialogTableVisible">
      <el-form class="userinfo2" :model="ruleForm">
        <section v-if="type === 0 || type === 1">
          <el-form-item label="当前日缓释金额" class="flex flex-align-center" >
              <span>{{row.summary.dailyAllowanceAmt / 100 }}元</span>
          </el-form-item>
          <el-form-item label="修改额度" class="flex flex-align-center">
            <p class="flex flex-align-center">
              <el-input v-model="ruleForm.give1" placeholder="请输入具体金额"></el-input>
              <span>元</span>
            </p>
          </el-form-item>
          <el-form-item label="当前单一帖发放上限" class="flex flex-align-center" >
              <span>{{ row.summary.transMaxAmt / 100 }}元</span>
          </el-form-item>
          <el-form-item label="修改额度" class="flex flex-align-center">
            <p class="flex flex-align-center">
              <el-input v-model="ruleForm.givelimit1" placeholder="请输入具体金额"></el-input>
              <span>元</span>
            </p>
          </el-form-item>
        </section>
        <section v-if="type === 2 || type === 3">
          <el-form-item label="可用余额" class="flex flex-align-center">
            <span>{{ row.wallet.availableBalance / 100 }}元</span>
          </el-form-item>
          <el-form-item label="未解冻余额" class="flex flex-align-center">
            <span>{{ (row.summary.total_allowance_remain) / 100 }}元</span>
          </el-form-item>
          <el-form-item label="充值" class="flex flex-align-center">
            <p class="flex flex-align-center">
              <el-input v-model="ruleForm.rechargeAmount" placeholder="请输入具体金额"></el-input>
              <span>元</span>
            </p>
          </el-form-item>
          <el-form-item label="缓释额度" class="flex flex-align-center">
            <p class="flex flex-align-center">
              <el-input v-model="ruleForm.subsidy" placeholder="请输入具体金额"></el-input>
              <span>元</span>
            </p>
          </el-form-item>
        </section>
        <span class="prompt">
          请认真填写金额，确认后提交申请
        </span>
      </el-form>
      <section slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="f_commit_apply" :disabled="loading">
          <span v-if="loading">
              <span class="el-icon-loading"></span>
              <span>正在提交</span>
            </span>
            <span v-else>提交申请</span>
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "recharge",
  props: {
    title: {
      type: String,
      default: "改政策"
    },
    type: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
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
      dialogTableVisible: true,
      loading: false
    };
  },
  methods: {
    ...mapActions("finance", [
      "getCommunityList",
      "communityRecords",
      "communityDetail",
      "updateRechargeSetting",
      "commitApply"
    ]),
    handleClose() {
      this.$emit("visible", this.dialogTableVisible);
    },
    // 改政策
    async update_recharge_setting() {
      // update_recharge_setting 改政策
      let self = this;
      if (self.ruleForm.give1 == "" && self.ruleForm.givelimit1 == "") {
        self.$message.warning("所填额度不能为空或填入额度必须大于零");
        self.loading = false;
        return;
      }
      if (!self.$com.isInteger(self.ruleForm.give1)) {
        self.$message.warning(
          "请输入大于零且最多保留两位小数的正实数，如1.01，1.1，111..."
        );
        self.loading = false;
        return false;
      }
      if (!self.$com.isInteger(self.ruleForm.givelimit1)) {
        self.$message.warning(
          "请输入大于零且最多保留两位小数的正实数，如1.01，1.1，111..."
        );
        self.loading = false;
        return false;
      }
      let res = await self.updateRechargeSetting({
        toUid: self.row.summary.uid, //被改政策用户ID
        dailyAllowanceAmt:
          self.ruleForm.give1 * 100 || self.row.summary.dailyAllowanceAmt / 100, //每天发放额度(单位分)
        transMaxAmt:
          self.ruleForm.givelimit1 * 100 || self.row.summary.transMaxAmt / 100 //每个帖子能够发放的额度上线
      });
      if (res) {
        self.dialogTableVisible = false;
      } else {
        self.loading = false;
      }
    },
    // 充额度
    async commit_apply() {
      // commit_apply 充额度
      let self = this;
      if (self.ruleForm.rechargeAmount == "" && self.ruleForm.subsidy == "") {
        self.$message.warning("所填额度不能为空或填入额度必须大于零");
        self.loading = false;
        return;
      }
      if (!self.$com.isInteger(self.ruleForm.rechargeAmount)) {
        self.$message.warning(
          "请输入大于零且最多保留两位小数的正实数，如1.01，1.1，111..."
        );
        self.loading = false;
        return false;
      }
      if (!self.$com.isInteger(self.ruleForm.subsidy)) {
        self.$message.warning(
          "请输入大于零且最多保留两位小数的正实数，如1.01，1.1，111..."
        );
        self.loading = false;
        return false;
      }
      let res = await self.commitApply({
        toUid: self.row.summary.uid, //被充额度用户ID
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
      if (self.type === 0 || self.type === 1) {
        // 改政策
        await self.update_recharge_setting();
      } else {
        await self.commit_apply();
      }
    }
  },
  mounted() {
    console.log(";row===", this.row);
  }
};
</script>
<style>
#closerInfo .el-dialog__body {
  padding: 10px 20px;
}
.userinfo2 .el-input .el-input__inner {
  width: 150px;
  margin-right: 5px;
}

#app .closer .el-dialog {
  min-width: 320px;
  width: 320px;
  margin-top: 15vh !important;
}
#app .closer .column-dialog .el-button--text {
  color: #999;
}
#app .closer .column-dialog .el-form-item {
  margin-bottom: 0;
}
#app .closer .column-dialog p {
  margin: 0;
}
#app .closer .column-dialog .el-form-item__label {
  min-width: 82px;
}
</style>
<style scoped>
.prompt {
  color: red;
  font-size: 12px;
  margin-left: 68px;
}
</style>


