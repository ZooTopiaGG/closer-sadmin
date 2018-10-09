<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-v">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="flex flex-align-center" style="margin-right: 15px;">
            <el-select class='list-filter-select' @change="handleSelectType" v-model="recharge_type" placeholder="全部类型">
              <el-option v-for="item in recharge_type_list" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </section>
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelectType" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section class="flex flex-align-center flex-pack-justify">
          <section class="withdraw_desc flex flex-align-center flex-1">
            <p><span>用户昵称：</span><span>{{ row.userName }}</span></p>
            <p><span>ID：</span><span>{{ row.objectID }}</span></p>
            <p><span>支付宝账号：</span><span>{{ row.payeeAccount }}</span></p>
            <p><span>手机号：</span><span>{{ row.userPhone }}</span></p>
            <p><span>身份证号码：</span><span>{{ row.certNo }}</span></p>
          </section>
          <section class="flex flex-align-center">
            <section style="margin-left: 15px;">
              <el-button type="primary" @click="preDownCsv">导出数据</el-button>
            </section>
          </section>
        </section>
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="serialList.data" style="width: 100%">
          <el-table-column fixed prop="transChannel" label="类型">
          </el-table-column>
          <el-table-column prop="transAmt" label="金额">
          </el-table-column>
          <el-table-column prop="createTime" label="到账时间">
          </el-table-column>
          <el-table-column label="说明">
            <template slot-scope="scope">
              <section class="flex flex-align-center">
                <span>{{ scope.row.transRemark }}</span>
                <el-button type="text" v-if="scope.row.transChannel==='稿费'" @click="toPreview(scope.row)">查看贴子</el-button>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="serialList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="serialList.count">
      </el-pagination>
    </section>
    <el-dialog title="手机预览" class="preview" :visible.sync="dialogVisible" width="375px">
       <iframe :src="pre_src" frameborder="0" width="375px" height="667px"></iframe>
    </el-dialog>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mixins: ["myMixins"],
  computed: {
    ...mapState("finance", ["serialList"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        uid: null,
        endTime: "",
        startTime: "",
        transChannel: "",
        transType: "in"
      },
      dialogTableVisible: false,
      pagenum: 1,
      pagesize: 10,
      row: {},
      pre_src: "",
      dialogVisible: false,
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
      username: "",
      recharge_type: "",
      recharge_type_list: [
        {
          label: "全部交易类型",
          value: ""
        },
        {
          label: "活动",
          value: "activity"
        },
        {
          label: "补贴",
          value: "allowance"
        },
        {
          label: "奖励金解冻",
          value: "award"
        },
        {
          label: "其他",
          value: "other"
        },
        {
          label: "稿费",
          value: "payment"
        },
        {
          label: "充值",
          value: "recharge"
        },
        {
          label: "注册",
          value: "register"
        }
      ],
      keys: ["类型", "金额", "到账时间", "说明"],
      values: ["transChannel", "transAmt", "createTime", "transRemark"]
    };
  },
  created() {
    this.row = JSON.parse(window.sessionStorage.getItem("closer_user_info"));
    this.financepara["uid"] = this.$route.query.id;
    this.userWalletDetail(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["userWalletDetail", "userWalletDetail2csv"]),
    async preDownCsv() {
      let self = this;
      await self.userWalletDetail2csv({
        uid: self.$route.query.id,
        endTime: self.dataValue[1] || "",
        startTime: self.dataValue[0] || "",
        transChannel: self.recharge_type || "",
        transType: "in"
      });
      await self.json2csv(
        self.rechargeList2Csv.data,
        self.keys,
        self.values,
        `提现审核-入账记录-用户昵称：${self.row.userName}-手机号：${
          self.row.userPhone
        }-身份证号：${self.row.certNo}-支付宝号：${self.row.payeeAccount}`
      );
    },
    async handleSelect() {
      let self = this;
      self.financepara["uid"] = self.$route.query.id;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["transChannel"] = self.recharge_type || "";
      self.financepara["transType"] = "in";
      self.financepara["endTime"] = self.dataValue[1] || "";
      self.financepara["startTime"] = self.dataValue[0] || "";
      await self.userWalletDetail(self.financepara);
    },
    async clearSearch() {
      this.pagenum = 1;
      this.dataValue = "";
      this.recharge_type = "";
      await this.handleSelect();
    },
    async handleSelectType() {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async handleCurrentChange1(val) {
      this.pagenum = val;
      await this.handleSelect();
    },
    toPreview(row) {
      let host = window.location.host,
        url;
      if (/sandbox.tiejin/.test(host) || /qa.tiejin/.test(host)) {
        url = "https://h5-sandbox.tiejin.cn";
      } else if (/tiejin/.test(host)) {
        url = "https://h5.tiejin.cn";
      }
      this.pre_src = `${url}/feed/${row.subjectId}?view=pre`;
      this.dialogVisible = true;
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
.withdraw_desc > p {
  margin-right: 10px;
}
</style>
