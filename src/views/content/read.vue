<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/content' }">内容审核</el-breadcrumb-item>
        <el-breadcrumb-item>已读栏目</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            贴子名称
          </span>
          <el-input v-model="searchbytitle" placeholder="请输入贴子名称" @keyup.enter.native="handleSearch">
            <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
          </el-input>
        </section>
        <section class="flex flex-align-center">
          <section class="block2">
            <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
              unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="readList2.data" style="width: 100%;">
          <el-table-column fixed prop="title" label="贴子名称">
          </el-table-column>
          <el-table-column prop="bool_tip" label="是否被举报">
          </el-table-column>
          <el-table-column prop="long_update_time" label="审核日期">
          </el-table-column>
          <el-table-column prop="drop_reason" label="下架理由">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="contentLook(scope.row)" size="medium">查看贴子</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block" v-if="readList2.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="readList2.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("content", ["readList2"])
  },
  data() {
    return {
      readlistpara: {
        userid: null,
        flag: 1,
        pagenum: 1,
        pagesize: 6,
        keywords: "",
        startTime: null,
        endTime: null
      },
      state4: "",
      searchbytitle: "",
      // 分页
      pagesize: 6,
      pagenum: 1,
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
    this.readlistpara["userid"] = this.$route.query.id;
    this.getReadList2(this.readlistpara);
  },
  methods: {
    ...mapActions("content", ["getReadList2"]),
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getReadList();
    },
    handleSelect() {
      console.log(`当前时间: ${this.dataValue}`);
      this.getReadList();
    },
    handleSearch() {
      this.pagenum = 1;
      this.getReadList();
    },
    // 获取已读列表
    async getReadList() {
      let self = this;
      self.readlistpara["userid"] = self.$route.query.id;
      self.readlistpara["pagenum"] = self.pagenum;
      self.readlistpara["keywords"] = self.searchbytitle;
      self.readlistpara["startTime"] = self.dataValue[0] || null;
      self.readlistpara["endTime"] = self.dataValue[1] || null;
      await self.getReadList2(self.readlistpara);
    },
    // table操作
    contentRecover(row) {
      this.$confirm("是否恢复该贴子？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.isRecover = !row.isRecover;
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    contentLook(row) {
      this.$router.push({
        path: `/content/feed/${row.subjectid}`
      });
    }
  }
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

.block2 .el-range-editor.el-input__inner {
  padding: 0 10px;
}
</style>
