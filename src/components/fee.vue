<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
           <div class="block2">
            <el-date-picker
              v-model="months"
              @change="handleSelect"
              type="month"
              value-format="yyyy_MM"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <!-- <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section> -->
        </section>
        <section class="flex flex-align-center">
          <section>稿件数量：<span>{{ feeTotal.totalSubjectSize }}</span></section>
          <!-- <section>发放稿费数量：<span>{{ feeTotal.totalSendFeeNum }}</span></section> -->
          <section style="margin:0 15px;">稿费数额：<span>{{ feeTotal.totalFee / 100 }}</span></section>
          <section>发放稿费人次：<span>{{ feeTotal.totalSendManTimes }}</span></section>
          <section style="margin-left: 15px;">
            <el-button type="primary" @click="preDownCsv">导出数据</el-button>
          </section>
        </section>
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="feeList.data" style="width: 100%">
          <el-table-column fixed label="缩略图">
            <template slot-scope="scope">
              <img v-lazy="scope.row.blogo" alt="logo" width='93.75' height="36.5">
            </template>
          </el-table-column>
          <el-table-column label="来源">
            <template slot-scope="scope">
              <span>{{ scope.row.isOffical }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="标题">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布时间">
            <template slot-scope="scope">
              <span>{{ scope.row.long_publish_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总阅读量">
            <template slot-scope="scope">
              <span>{{ scope.row.long_view }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sendPeopleNames" label="稿费发放人员">
          </el-table-column>
          <el-table-column prop="sendPeopleNum" label="发放人数">
          </el-table-column>
          <el-table-column prop="totalFee" label="发放总量">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="feeList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="page" :page-size="count" layout="total, prev, pager, next, jumper"
        :total="feeList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["feeList", "feeTotal"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        month: null,
        communityid: null
      },
      dialogTableVisible: false,
      page: 1,
      count: 10,
      row: {},
      months: $async.createTime(Date.now(), "yy_mm"),
      keys: [
        "来源",
        "标题",
        "发布时间",
        "总阅读量",
        "稿费发放人员",
        "发放人数",
        "发放总量"
      ],
      values: [
        "isOffical",
        "title",
        "long_publish_time",
        "long_view",
        "sendPeopleNames",
        "sendPeopleNum",
        "totalFee"
      ]
    };
  },
  created() {
    this.financepara["communityid"] = this.$route.query.id;
    this.financepara["month"] = this.months;
    this.subjectFeeList(this.financepara);
    this.subjectFeeTotal({
      month: this.months || null,
      communityid: this.$route.query.id
    });
  },
  methods: {
    ...mapActions("finance", ["subjectFeeList", "subjectFeeTotal"]),
    async preDownCsv() {
      let self = this;
      let name = JSON.parse(window.sessionStorage.getItem("closer_cloumn_row"))
        .name;
      await self.subjectFeeList2csv({
        month: self.months,
        communityid: self.$route.query.id
      });
      await self.json2csv(
        self.rechargeList2Csv.data,
        self.keys,
        self.values,
        `${name}贴近号-${self.months}稿费记录`
      );
    },
    async handleSelect() {
      let self = this;
      self.page = 1;
      await self.getColumnaList();
      await self.subjectFeeTotal({
        month: self.months || null,
        communityid: self.$route.query.id
      });
    },
    async clearSearch() {
      let self = this;
      self.dataValue = "";
      self.page = 1;
      self.financepara["month"] = self.months || null;
      self.months;
      await self.getColumnaList();
      await self.subjectFeeTotal({
        month: self.months || null,
        communityid: self.$route.query.id
      });
    },
    async handleCurrentChange1(val) {
      let self = this;
      self.page = val;
      await self.getColumnaList();
    },
    // 获取栏目列表
    async getColumnaList() {
      let self = this;
      self.financepara["page"] = self.page || 1;
      self.financepara["month"] = self.months || null;
      await self.subjectFeeList(self.financepara);
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
