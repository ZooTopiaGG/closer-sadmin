<template>
  <div id="permission" class="flex flex-v">
    <div class="permission_title">操作日志</div>
    <div class="permission_table flex-1">
      <div class="permission_table_top flex flex-pack-justify">
        <div class="flex flex-align-center">
          <span class="labelname">
            用户（员工）手机号
          </span>
          <el-input v-model="user_phone" placeholder="请输入手机号" @keyup.enter.native="searchLog">
            <el-button slot="append" @click="searchLog" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="flex flex-align-center">
          <div class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="permission_table_content">
        <el-table :data="logList.data" style="width: 100%">
          <el-table-column fixed prop="username" label="用户名">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="createTime" label="日志时间">
          </el-table-column>
          <el-table-column prop="description" label="日志描述">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block cloumn-block" v-if="logList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="logList.count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("log", ["logList"])
  },
  data() {
    return {
      logpara: {
        page: 1,
        count: 10,
        phone: "",
        startTime: null,
        endTime: null
      },
      user_phone: "",
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
    this.getLog(this.logpara);
  },
  methods: {
    ...mapActions("log", ["getLog"]),
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getLogList();
    },
    handleSelect() {
      this.getLogList();
    },
    searchLog() {
      this.pagenum = 1;
      this.getLogList();
    },
    async getLogList() {
      let self = this;
      self.logpara["page"] = self.pagenum;
      self.logpara["phone"] = self.user_phone || "";
      self.logpara["startTime"] = self.dataValue[0] || null;
      self.logpara["endTime"] = self.dataValue[1] || null;
      await self.getLog(self.logpara);
    }
  },
  mounted() {}
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
