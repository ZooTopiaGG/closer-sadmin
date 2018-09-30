<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/content' }">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>工作量查看</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-left: 15px;">
            <el-input maxlength="11" v-model="phonenum" placeholder="请输入手机号" @keyup.enter.native="handleSelect">
              <el-button slot="append" @click="handleSelect" icon="el-icon-search"></el-button>
            </el-input>
          </section>
        <section class="flex flex-align-center">
          <section class="block2">
            <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels :default-time="['00:00:00', '23:59:59']" @change="handleSelect"
              value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </section>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="readCountList.data" style="width: 100%">
          <el-table-column fixed prop="verify_user.username" label="用户名">
          </el-table-column>
          <el-table-column prop="verify_user.phone" label="手机号">
          </el-table-column>
          <el-table-column prop="count" label="审核条数">
            <!-- <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="medium">{{scope.row.count }}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(1)" type="text" size="medium">精华贴</el-button>
              <el-button @click="handleClick(0)" type="text" size="medium">普通贴</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block" v-if="readCountList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="readCountList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("content", ["readCountList"])
  },
  data() {
    return {
      readcountlist: {
        phonenum: "",
        startTime: null,
        endTime: null,
        pagenum: 1,
        pagesize: 10
      },
      fliterStatus: 2,
      status: [
        {
          label: "全部",
          value: 2
        },
        {
          label: "普通",
          value: 0
        },
        {
          label: "精华",
          value: 1
        }
      ],
      phonenum: "",
      pagesize: 10,
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
      value7: ""
    };
  },
  created() {
    this.workLoad(this.readcountlist);
  },
  methods: {
    ...mapActions("content", ["workLoad"]),
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getReadCountList();
    },
    // table操作
    handleClick(id) {
      this.$router.push({
        path: "/content/read?id=" + id
      });
    },
    // 日期查询
    handleSelect() {
      this.pagenum = 1;
      this.getReadCountList();
    },
    // 列表
    async getReadCountList() {
      let self = this;
      self.readcountlist["phonenum"] = self.phonenum;
      self.readcountlist["startTime"] = self.value7[0] || null;
      self.readcountlist["endTime"] = self.value7[1] || null;
      self.readcountlist["pagenum"] = self.pagenum;
      await self.workLoad(self.readcountlist);
    }
  },
  mounted() {}
};
</script>
<style scoped="scoped">
.labelname {
  margin-right: 10px;
  min-width: 150px;
}
</style>
