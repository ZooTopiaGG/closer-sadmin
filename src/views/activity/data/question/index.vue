<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">活动统计</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="statisticList.data" style="width: 100%">
          <el-table-column prop="pv" label="页面pv">
          </el-table-column>
          <el-table-column prop="uv" label="页面uv">
          </el-table-column>
          <el-table-column prop="joinUniqueNumber" label="参与游戏的人数（去重）">
          </el-table-column>
          <el-table-column prop="joinNumber" label="参与游戏的人次（不去重）">
          </el-table-column>
          <el-table-column prop="levelA" label="100分人数（去重）">
          </el-table-column>
          <el-table-column prop="levelB" label="60-99分人数（去重）">
          </el-table-column>
          <el-table-column prop="levelC" label="0-59分人数（去重）">
          </el-table-column>
          <el-table-column prop="completeUniqueTest" label="完成答题总人数">
          </el-table-column>
          <el-table-column prop="completeTest" label="完成答题总人次">
          </el-table-column>
          <el-table-column prop="shareNumber" label="点击分享次数">
          </el-table-column>
          <el-table-column prop="registerNumber" label="注册数">
          </el-table-column>
          <el-table-column prop="activateNumber" label="激活量">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block" v-if="statisticList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="statisticList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("activity_question", {
      statisticList: state => state.statisticList
    })
  },
  data() {
    return {
      // 分页
      pagenum: 1,
      pagesize: 10,
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
    let self = this,
      para = {
        startTime: self.dataValue[0] || null,
        endTime: self.dataValue[1] || null,
        activityId: self.$route.query.id
      };
    self.getTuzhuStatisticsList(para);
  },
  methods: {
    ...mapActions("activity_question", ["getTuzhuStatisticsList"]),
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.get_tuzhu_statistics();
    },
    handleSelect() {
      this.get_tuzhu_statistics();
    },
    // getTuzhuStatistic
    async get_tuzhu_statistics() {
      let self = this;
      await self.getTuzhuStatisticsList({
        startTime: self.dataValue[0] || null,
        endTime: self.dataValue[1] || null,
        activityId: self.$route.query.id
      });
    }
  }
};
</script>
<style scoped="scoped">
.labelname {
  margin-right: 10px;
  min-width: 130px;
}

.dialog-label {
  width: 120px;
}

.dialog-sure {
  margin-left: 20px;
}

.searchtrue {
  height: 40px;
  border-bottom: 1px solid #f4f4f4;
}

.searchname {
  margin: 0 40px;
}

.searcherror {
  color: red;
}
</style>
