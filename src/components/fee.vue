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
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section class="flex flex-align-center">
          <section>稿件数量：<span>{{ feeTotal.totalSubjectSize }}</span></section>
          <section>发放稿费数量：<span>{{ feeTotal.totalSendFeeNum }}</span></section>
          <section>稿费数额：<span>{{ feeTotal.totalFee / 100 }}</span></section>
          <section>发放稿费人次：<span>{{ feeTotal.totalSendManTimes }}</span></section>
          <section style="margin-left: 15px;">
            <el-button type="primary">导出数据</el-button>
          </section>
        </section>
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="feeList.data" style="width: 100%">
          <el-table-column fixed label="缩略图">
            <template slot-scope="scope">
              <img v-lazy="scope.row.subject.blogo" alt="logo" width='93.75' height="36.5">
            </template>
          </el-table-column>
          <el-table-column label="来源">
            <template slot-scope="scope">
              <span>{{ scope.row.subject.int_release_type }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="标题">
            <template slot-scope="scope">
              <span>{{ scope.row.subject.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布时间">
            <template slot-scope="scope">
              <span>{{ scope.row.subject.long_publish_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总阅读量">
            <template slot-scope="scope">
              <span>{{ scope.row.subject.long_view }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transStatus" label="稿费发放">
          </el-table-column>
          <el-table-column prop="sendPeopleNum" label="发放人数">
          </el-table-column>
          <el-table-column prop="totalFee" label="发放总量">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="feeList.count > 0">
      <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
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
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        endTime: null
      },
      dialogTableVisible: false,
      pagenum: 1,
      pagesize: 10,
      row: {},
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
      dataValue: ""
    };
  },
  created() {
    this.subjectFeeList(this.financepara);
    this.subjectFeeTotal({
      startTime: null,
      endTime: null
    });
  },
  methods: {
    ...mapActions("finance", ["subjectFeeList", "subjectFeeTotal"]),
    handleSelect() {
      let self = this;
      self.financepara["startTime"] = self.dataValue[0] || null;
      self.financepara["endTime"] = self.dataValue[1] || null;
      self.getColumnaList();
      self.subjectFeeTotal({
        startTime: self.dataValue[0] || null,
        endTime: self.dataValue[1] || null
      });
    },
    clearSearch() {
      let self = this;
      self.dataValue = "";
      self.pagenum = 1;
      self.financepara["startTime"] = null;
      self.financepara["endTime"] = null;
      self.financepara["pageNum"] = 1;
      self.getColumnaList();
      self.subjectFeeTotal({
        startTime: null,
        endTime: null
      });
    },
    handleCurrentChange1(val) {
      let self = this;
      self.pagenum = val;
      self.financepara["pageNum"] = self.pagenum;
      self.getColumnaList();
    },
    // 获取栏目列表
    async getColumnaList() {
      let self = this;
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
