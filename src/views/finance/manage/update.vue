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
        <el-table :data="communityRecordsList.data" style="width: 100%">
          <el-table-column fixed label="贴近号名称">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.community_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业（个人）名称">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.community_person_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="未解冻余额">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.total_lock_balance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可用余额">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.total_available_Balance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="累计充值">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.total_recharge }}</span>
            </template>
          </el-table-column>
          <el-table-column label="累计补贴">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.total_allowance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日缓释额度">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.daily_allowance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单一贴发放上限">
            <template slot-scope="scope">
              <span>{{ scope.row.extend.transMaxAmt }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="update_recharge(1, scope.row)" size="medium">改政策</el-button>
              <el-button type="text" @click="update_recharge(2, scope.row)" size="medium">充额度</el-button>
              <el-button type="text" @click="handleLook(scope.row)" size="medium">查看号</el-button>
              <el-button type="text" @click="handleRecords" size="medium">其他记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section v-if="dialogTableVisible">
        <recharge-popup :title="title" :type="type" @visible="visible" :row="row"></recharge-popup> 
      </section>
    </section>
    <section class="block" v-if="communityRecordsList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="communityRecordsList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rechargePopup from "@/components/rechargePopup";
export default {
  computed: {
    ...mapState("finance", ["communityRecordsList"]),
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
      title: "改政策"
    };
  },
  created() {
    let self = this;
    // self.getCommunityList(self.financepara);
    self.communityRecords(self.financepara);
  },
  methods: {
    ...mapActions("finance", [
      "getCommunityList",
      "communityRecords",
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
      await self.communityRecords(self.financepara);
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

    // 改版方法
    update_recharge(type, row) {
      let self = this;
      self.row = row;
      self.dialogTableVisible = true;
      self.type = type;
      if (type === 1) {
        self.title = "改政策";
      } else if (type === 2 || type === 3) {
        self.title = "充额度";
      } else {
        self.title = "改政策";
      }
    },
    handleLook(row) {
      window.sessionStorage.setItem("closer_cloumn_row", JSON.stringify(row));
      this.$router.push({
        path: `/finance/closer?type=info&id=${row.objectID}`
      });
    },
    handleRecords() {
      this.$router.push({
        path: `/finance/closer?type=recharge`
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
