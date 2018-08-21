<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/content' }">内容审核</el-breadcrumb-item>
        <el-breadcrumb-item>回收站</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            贴子名称
          </span>
          <el-input v-model="searchbyname" placeholder="请输入贴子名称或者栏目名" @keyup.enter.native="searchFeed">
            <el-button slot="append" @click="searchFeed" icon="el-icon-search"></el-button>
          </el-input>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="recycleList.data" type='index' style="width: 100%">
          <el-table-column fixed prop="communityName" label="栏目名称">
          </el-table-column>
          <el-table-column prop="title" label="标题名称">
          </el-table-column>
          <el-table-column prop="long_update_time" label="删除时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="contentRecover(scope)" type="text" size="medium">恢复</el-button>
              <el-button type="text" @click="contentLook(scope.row)" size="medium">查看贴子</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block" v-if="recycleList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="recycleList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("content", ["recycleList"])
  },
  data() {
    return {
      searchbyname: "",
      // 分页
      pagenum: 1,
      pagesize: 10,
      recycleBinPara: {
        keywords: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  created() {
    this.recycleBin(this.recycleBinPara);
  },
  methods: {
    ...mapActions("content", ["recycleBin", "setUpdateVerify"]),
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.recoverFeedList();
    },
    // 搜索贴子
    searchFeed() {
      this.pagenum = 1;
      this.recoverFeedList();
    },
    async recoverFeedList() {
      let self = this;
      self.recycleBinPara["keywords"] = self.searchbyname;
      self.recycleBinPara["pagenum"] = self.pagenum;
      await self.recycleBin(self.recycleBinPara);
    },
    // 恢复 上墙
    async updateVerify(scope) {
      let self = this;
      let res = await self.setUpdateVerify({
        subjectid: scope.row.subjectid,
        flag: 1, // -1 下架 1 上墙
        drop_reason: "" // 举报信息
      });
      if (res) {
        self.$message.success("上墙成功");
        // console.log('index====', self.spliceIndex)
        self.res.data.splice(scope.row.$index, 1);
      }
    },
    // table操作
    contentRecover(scope) {
      // console.log(scope);
      this.$confirm("是否恢复并上墙该贴子？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateVerify(scope);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    contentLook(row) {
      console.log(row);
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
</style>
