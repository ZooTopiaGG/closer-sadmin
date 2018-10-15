<template>
  <section id="permission" class="flex flex-v">    
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="flex flex-align-center" style="margin-right: 15px;">
            <el-select class='list-filter-select' @change="handleSelectType" v-model="recharge_type" placeholder="全部操作">
              <el-option v-for="item in recharge_type_list" :key="item.region_name" :label="item.region_name" :value="item.region_id">
              </el-option>
            </el-select>
          </section>
          <section class="flex flex-align-center">
            <el-input v-model="columnid" placeholder="请输入栏目名称" @keyup.enter.native="handleSearch">
            </el-input>
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
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="rechargeList.data" style="width: 100%">
          <el-table-column fixed prop="communityName" label="申请贴近号">
          </el-table-column>
          <el-table-column prop="communityId" label="申请者ID">
          </el-table-column>
          <el-table-column prop="fromUserName" label="申请者昵称">
          </el-table-column>
          <el-table-column prop="applyTime" label="操作类型">
          </el-table-column>
          <el-table-column prop="communityId" label="原金额">
          </el-table-column>
          <el-table-column prop="fromUserName" label="申请修改金额">
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)" size="medium">查看详情</el-button>
              <el-button type="text" @click="handleClick(scope.row)" size="medium">同意</el-button>
              <el-button type="text" @click="handleClick(scope.row)" size="medium">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <!-- el-dialog -->
      <el-dialog title="栏目详情" class="column-dialog" :visible.sync="dialogTableVisible">
        <el-form class="userinfo" :model="ruleForm" :disabled="disabled">
          <p class="flex flex-align-center">
            <span class="label">栏目归属地：</span>
            <span>{{ ruleForm.communityRegionName }}</span>
          </p>
          <p class="flex flex-align-center">
            <span class="label">栏目名称：</span>
            <span>{{ ruleForm.communityName }}</span>
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
          <p class="flex flex-align-center" v-if="radioRecord === '充额度'">
            <span class="middle-label">新增一次性到账额度：</span>
            <el-input v-model="ruleForm.rechargeAmount"></el-input>
          </p>
          <p class="flex flex-align-center" v-if="radioRecord === '充额度'">
            <span class="label">新增缓释额度：</span>
            <el-input v-model="ruleForm.subsidy"></el-input>
          </p>
          <p class="flex flex-align-center" v-if="radioRecord === '改政策'">
            <span class="middle-label">每天发放额度：</span>
            <el-input v-model="ruleForm.give1"></el-input>
          </p>
          <p class="flex flex-align-center" v-if="radioRecord === '改政策'">
            <span class="long-label">每个贴子能够发放的额度上限：</span>
            <el-input v-model="ruleForm.givelimit1"></el-input>
          </p>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="thenSureOrRefuse('fail')">拒绝</el-button>
          <el-button type="primary" @click="thenSureOrRefuse('success')">同意</el-button>
        </span>
        <el-dialog
          width="260px"
          :title="stitle"
          :visible.sync="innerVisible"
          append-to-body>
          <el-input type="tel" class="inputCode" v-model="phonecode" maxlength="6" placeholder="请输入手机验证码"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="thenSureOrRefuse(isSuccess)">确定</el-button>
          </span>
        </el-dialog>
      </el-dialog>
    </section>
    <section class="block" v-if="rechargeList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="rechargeList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["rechargeList"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10
      },
      radioRecord: "充额度",
      columnid: "",
      pagenum: 1,
      pagesize: 10,
      dialogTableVisible: false,
      innerVisible: false,
      isSuccess: false,
      stitle: "",
      phonecode: "",
      timer: {},
      operationType: 0, //0 改政策 1 查看
      disabled: false,
      row: "",
      ruleForm: {
        communityName: "",
        communityRegionName: "",
        balance: "",
        allsubsidy: "",
        give: "",
        givelimit: "",
        rechargeAmount: "",
        subsidy: "",
        give1: "",
        givelimit1: ""
      },
      recharge_type: "",
      recharge_type_list: []
    };
  },
  created() {
    this.rechargeApplyList(this.financepara);
  },
  methods: {
    ...mapActions("finance", [
      "rechargeApplyList",
      "rechargeSettingsApplyList",
      "rechargeAudit",
      "auditRechargeSetting",
      "communityDetail"
    ]),
    handleSelectType() {},
    clearSearch() {},

    handleSearch() {
      this.pagenum = 1;
      if (this.radioRecord === "改政策") {
        this.getModifyColumnList();
      } else {
        this.getMoreColumnList();
      }
    },
    handleSelect(item) {
      this.pagenum = 1;
      if (item === "充额度") {
        this.getMoreColumnList();
      } else {
        this.getModifyColumnList();
      }
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      if (this.radioRecord === "充额度") {
        this.getMoreColumnList();
      } else {
        this.getModifyColumnList();
      }
    },
    // 获取改政策栏目列表
    async getModifyColumnList() {
      let self = this;
      await self.rechargeSettingsApplyList({
        page: self.pagenum,
        count: self.pagesize,
        toUid: self.columnid
      });
    },
    // 获取充额度栏目列表
    async getMoreColumnList() {
      let self = this;
      self.financepara["toUid"] = self.columnid;
      self.financepara["page"] = self.pagenum;
      await self.rechargeApplyList(self.financepara);
    },
    // 改政策查看 community_detail 改政策commit_apply 同意recharge_audit
    async lookAndModify() {
      let self = this;
      let res = await self.communityDetail({
        communityId: self.row.communityId
      });
      if (res) {
        self.ruleForm = {
          communityName: self.row.communityName,
          communityRegionName:
            self.row.regionName || self.row.communityRegionName,
          balance: res.UMSWallet.availableBalance / 100,
          allsubsidy: res.UMSWalletRechargeSummary.totalAllowancedAmt / 100,
          give: res.UMSWalletRechargeSummary.dailyAllowanceAmt / 100,
          givelimit: res.UMSWalletRechargeSummary.transMaxAmt / 100,
          rechargeAmount: self.row.rechargeAmt / 100,
          subsidy: self.row.totalAllowanceAmt / 100,
          give1: self.row.dailyAllowanceAmt / 100,
          givelimit1: self.row.transMaxAmt / 100
        };
      }
    },
    // table操作
    async handleClick(row) {
      let self = this;
      self.ruleForm = {
        communityName: "",
        communityRegionName: "",
        balance: "",
        allsubsidy: "",
        give: "",
        givelimit: "",
        rechargeAmount: "",
        subsidy: "",
        give1: "",
        givelimit1: ""
      };
      self.row = row;
      await self.lookAndModify();
      self.dialogTableVisible = true;
      self.operationType = 1;
      self.disabled = true;
    },
    // 同意拒绝审批 commit_apply recharge_audit
    async sureOrRefuse(type) {
      let self = this,
        res = false;
      if (self.radioRecord === "充额度") {
        res = await self.rechargeAudit({
          rechargeId: self.row.rechargeId,
          auditStatus: type
        });
      } else {
        res = await self.auditRechargeSetting({
          uid: self.row.uid,
          auditStatus: type
        });
      }
      if (res) {
        self.innerVisible = false;
        self.dialogTableVisible = false;
        if (self.radioRecord === "充额度") {
          await self.getMoreColumnList();
        } else {
          await self.getModifyColumnList();
        }
      }
    },
    // 同意或者拒绝
    async thenSureOrRefuse(type) {
      let self = this;
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
  },
  destroyed() {
    clearInterval(this.timer);
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
