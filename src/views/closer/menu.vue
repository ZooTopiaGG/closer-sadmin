<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">贴近号管理 / 菜单管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            分类名称
          </span>
          <el-input v-model="user_phone" placeholder="请输入分类名称" @keyup.enter.native="searchLog">
            <el-button slot="append" @click="searchLog" icon="el-icon-search"></el-button>
          </el-input>
        </section>
        <section class="flex flex-align-center">
          <el-button type="primary" icon="el-icon-circle-plus-outline">新增分类</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="logList.data" style="width: 100%">
          <el-table-column fixed prop="username" label="序号">
          </el-table-column>
          <el-table-column prop="phone" label="分类名称">
          </el-table-column>
          <el-table-column prop="createTime" label="栏目数量">
          </el-table-column>
          <el-table-column prop="description" label="更新时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block" v-if="logList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="logList.count">
      </el-pagination>
    </section>
  </section>
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
  min-width: 60px;
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
