<template>
  <div id="record" class="flex flex-v">
    <div class="flex-1">
      <div class="permission_table_top flex flex-pack-justify">
        <div class="flex flex-align-center">
          <span class="labelname">
            栏目ID
          </span>
          <el-input v-model="columnid" maxlength="11" @keyup.enter.native="bindSearch" placeholder="栏目ID">
            <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
          </el-input>
        </div>
      </div>
      <!-- table 修改查看操作 -->
      <div class="permission_table_content">
        <el-table :data="communityRecordsList.data" style="width: 100%">
          <el-table-column fixed prop="name" label="栏目名称">
          </el-table-column>
          <el-table-column prop="objectID" label="栏目ID">
          </el-table-column>
          <el-table-column prop="create_time" label="栏目入驻时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook(scope.row)" size="medium">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- dialog  -->
      <el-dialog title="栏目详情" class="column-dialog" :visible.sync="dialogTableVisible">
        <div class="userinfo" v-if="columnInfo">
          <p class="flex">
            <span class="label">栏目类型：</span>
            <span v-if="row.type === 0">个人</span>
            <span v-else>企业</span>
          </p>
          <p class="flex">
            <span class="label">栏目归属地：</span>
            <span>{{ row.regionName }}</span>
          </p>
          <p class="flex">
            <span class="label">栏目名称：</span>
            <span>{{ row.name }}</span>
          </p>
          <p class="flex">
            <span class="label label-bold">状态</span>
          </p>
          <p class="flex">
            <span class="label">栏目当前余额：</span>
            <span>{{ columnInfo.UMSWallet.availableBalance / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">累计补贴额度：</span>
            <span>{{ columnInfo.UMSWalletRechargeSummary.totalAllowancedAmt / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">每天发放额度：</span>
            <span>{{ columnInfo.UMSWalletRechargeSummary.dailyAllowanceAmt / 100}}</span>
          </p>
          <p class="flex">
            <span class="">每个贴子能够发放的额度上限：</span>
            <span>{{ columnInfo.UMSWalletRechargeSummary.transMaxAmt / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">栏目充值总额：</span>
            <span>{{ columnInfo.UMSWalletRechargeSummary.totalRechargeAmt / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">当前已解冻额度：</span>
            <span>{{ columnInfo.UMSWalletRechargeSummary.totalAllowancedAmt / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">当前未解冻额度：</span>
            <span>{{ (columnInfo.UMSWalletRechargeSummary.totalAllowanceAmt - columnInfo.UMSWalletRechargeSummary.totalAllowancedAmt) / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">稿费发放总额度：</span>
            <span>{{ columnInfo.totalPaymentAmt / 100 }}</span>
          </p>
        </div>
        <el-table :data="rechargeInfo.data">
          <el-table-column property="transChannel" label="类型"></el-table-column>
          <el-table-column property="createTime" label="时间"></el-table-column>
          <el-table-column property="transAmt" label="额度"></el-table-column>
          <el-table-column property="transRemark" label="备注"></el-table-column>
        </el-table>
        <div class="block eldialog-block" v-if="rechargeInfo.count > 0">
          <el-pagination @current-change="handleCurrentChange2" :current-page="pagenum2" :page-size="pagesize2" layout="total, prev, pager, next, jumper"
            :total="rechargeInfo.count">
          </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false">返回</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="block" v-if="communityRecordsList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="communityRecordsList.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["communityRecordsList", "rechargeInfo"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        id: null
      },
      columnid: null,
      dialogTableVisible: false,
      pagenum: 1,
      pagesize: 10,
      pagenum2: 1,
      pagesize2: 4,
      row: {},
      columnInfo: {
        totalPaymentAmt: 0,
        UMSWallet: {
          availableBalance: 0,
          createTime: 0,
          isLock: "unlock",
          status: false,
          uid: "",
          updateTime: 0,
          userType: "",
          walletBalance: 0,
          walletLockBalance: 0
        },
        UMSWalletRechargeSummary: {
          createTime: 0,
          dailyAllowanceAmt: 0,
          status: false,
          totalAllowanceAmt: 0,
          totalAllowancedAmt: 0,
          totalAwardAmt: 0,
          totalAwardedAmt: 0,
          totalLockAmt: 0,
          totalRechargeAmt: 0,
          totalUnlockAmt: 0,
          transMaxAmt: 0,
          uid: "",
          updateTime: 0
        }
      }
    };
  },
  created() {
    this.communityRecords(this.financepara);
  },
  methods: {
    ...mapActions("finance", [
      "communityRecords",
      "walletDetailList",
      "communityDetail"
    ]),
    bindSearch() {
      this.pagenum = 1;
      this.getColumnaList();
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.pagenum2 = val;
      this.wallet_detail_list();
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getColumnaList();
    },
    // 获取栏目列表
    async getColumnaList() {
      let self = this;
      self.financepara["page"] = self.pagenum;
      self.financepara["id"] = self.columnid;
      await self.communityRecords(self.financepara);
    },
    // get   community_detail详情
    async get_community_detail() {
      let self = this;
      let res = await self.communityDetail({
        communityId: self.row.objectID
      });
      if (res) {
        self.columnInfo = res;
      }
    },
    // get wallet_detail_list
    async wallet_detail_list() {
      let self = this;
      await self.walletDetailList({
        page: self.pagenum2,
        count: self.pagesize2,
        toUid: self.row.objectID
      });
    },
    // 查看栏目详情 community_detail 充值记录wallet_detail_list
    async handleLook(row) {
      console.log("row====", row);
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
