<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
          <section class="flex flex-align-center" style="margin: 0 15px;">
            <el-select class='list-filter-select' @change="handleSelectType" v-model="recharge_type" placeholder="全部类型">
              <el-option v-for="item in recharge_type_list" :key="item.region_name" :label="item.region_name" :value="item.region_id">
              </el-option>
            </el-select>
          </section>
          <section class="flex flex-align-center">
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
        <el-table :data="communityRecordsList.data" style="width: 100%">
          <el-table-column fixed prop="name" label="缩略图">
          </el-table-column>
          <el-table-column prop="objectID" label="来源">
          </el-table-column>
          <el-table-column prop="create_time" label="标题">
          </el-table-column>
          <el-table-column prop="objectID" label="发布时间">
          </el-table-column>
          <el-table-column prop="create_time" label="总阅读量">
          </el-table-column>
          <el-table-column prop="objectID" label="站内阅读量">
          </el-table-column>
          <el-table-column prop="create_time" label="稿费发放">
          </el-table-column>
          <el-table-column prop="objectID" label="发放人数">
          </el-table-column>
          <el-table-column prop="create_time" label="发放总量">
          </el-table-column>
        </el-table>
      </section>
      <!-- dialog  -->
      <el-dialog title="栏目详情" class="column-dialog" :visible.sync="dialogTableVisible">
        <section class="userinfo" v-if="columnInfo">
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
        </section>
        <el-table :data="rechargeInfo.data">
          <el-table-column property="transChannel" label="类型"></el-table-column>
          <el-table-column property="createTime" label="时间"></el-table-column>
          <el-table-column property="transAmt" label="额度"></el-table-column>
          <el-table-column property="transRemark" label="备注"></el-table-column>
        </el-table>
        <section class="block eldialog-block" v-if="rechargeInfo.count > 0">
          <el-pagination @current-change="handleCurrentChange2" :current-page="pagenum2" :page-size="pagesize2" layout="total, prev, pager, next, jumper"
            :total="rechargeInfo.count">
          </el-pagination>
        </section>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false">返回</el-button>
        </span>
      </el-dialog>
    </section>
    <section class="block" v-if="communityRecordsList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="communityRecordsList.count">
      </el-pagination>
    </section>
  </section>
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
      },
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
      recharge_type_list: [],
      recharge_result: "",
      recharge_type: ""
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

    handleSelect() {},
    clearSearch() {},
    handleSelectType() {},
    handleSelectResult() {},

    bindSearch() {
      this.pagenum = 1;
      this.getColumnaList();
    },
    handleCurrentChange2(val) {
      this.pagenum2 = val;
      this.wallet_detail_list();
    },
    handleCurrentChange1(val) {
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
