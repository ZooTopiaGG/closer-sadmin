<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">封面文章</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex">
        <section class="flex flex-align-center">
          <el-select class='list-filter-select' @change="handleSelectRegion" v-model="fliterregion" placeholder="所属区域">
              <el-option v-for="item in searchregion" :key="item.region_name" :label="item.region_name" :value="item.region_id">
              </el-option>
            </el-select>
        </section>
        <section class="flex flex-align-center" style="margin-left: 30px;margin-right: 10px">
          <el-input v-model="cover_value" placeholder="请输入栏目名称" @keyup.enter.native="searchCover">
            <el-button slot="append" @click="searchCover" icon="el-icon-search"></el-button>
          </el-input>
        </section>
        <section class="flex flex-align-center">
          <el-button type="text" @click="clearSearch">清除搜索</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="coverList.data" style="width: 100%" id="cover">
          <el-table-column fixed label="缩略图" width="120">
            <template slot-scope="scope">
              <section>
                <img :src="$com.makeFileUrl(scope.row.cover)" alt="" class="table_logo">       
              </section>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="long_publish_time" label="发布时间">
          </el-table-column>
          <el-table-column prop="communityName" label="来源">
          </el-table-column>
          <el-table-column prop="username" label="投稿人">
          </el-table-column>
          <el-table-column prop="userid" label="投稿人ID">
          </el-table-column>
          <el-table-column label="封面贴">
            <template slot-scope="scope">
              <span v-if="scope.row.is_bigCover_card" style="color:#85c976">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column prop="out" label="站外阅读">
          </el-table-column>
          <el-table-column prop="in" label="站内阅读">
          </el-table-column>
          <el-table-column label="上封面">
            <template slot-scope="scope">
              <el-button type="info" v-if="scope.row.is_bigCover_card" disabled="disabled" size="medium">上封面</el-button>
              <el-button type="primary" v-else size="medium" @click="sureGotoCover(scope.row)">上封面</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="preview">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block">
      <el-pagination @current-change="handleCurrentChange" :current-page="coverpara.pagenum" :page-size="coverpara.pagesize" layout="total, prev, pager, next, jumper"
        :total="coverList.count">
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
  computed: {
    ...mapState("content", {
      coverList: state => state.coverList,
      searchregion: state => state.regionsList
    })
  },
  data() {
    return {
      pre_src:
        "https://h5.tiejin.cn/feed/wsuAwNP0S0pt?type=2&category=5&view=pre",
      dialogVisible: false,
      res: {
        data: [],
        count: 0
      },
      cover_value: "",
      fliterregion: "wfXYXEpsBEyN",
      // 分页
      pagenum: 1,
      pagesize: 10,
      coverpara: {
        communityName: "",
        region_id: "wfXYXEpsBEyN",
        pagesize: 10,
        pagenum: 1
      },
      cityregions: {
        keywords: "",
        pagenum: 1,
        pagesize: 100 // 城市列表
      }
    };
  },
  created() {
    this.adminSearch(this.coverpara);
    this.getRegionsList(this.cityregions);
  },
  methods: {
    ...mapActions("content", ["adminSearch", "coverSetting", "getRegionsList"]),
    preview() {
      this.dialogVisible = true;
    },
    async getCoverList() {
      let self = this;
      await self.adminSearch(self.coverpara);
    },
    // 分页
    handleCurrentChange(val) {
      this.coverpara["pagenum"] = val;
      this.getCoverList();
    },
    handleSelectRegion(val) {
      this.coverpara["pagenum"] = 1;
      this.coverpara["region_id"] = this.fliterregion;
      this.getCoverList();
    },
    searchCover() {
      this.coverpara["pagenum"] = 1;
      this.coverpara["communityName"] = this.cover_value;
      this.getCoverList();
    },
    clearSearch() {
      this.cover_value = "";
      this.fliterregion = "";
      this.coverpara["communityName"] = "";
      this.coverpara["region_id"] = "";
      this.coverpara["pagenum"] = 1;
      this.getCoverList();
    },
    async sureGotoCover(row) {
      let self = this;
      self
        .$confirm("此操作将设置该贴子为封面贴，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.gotoCover(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async gotoCover(row) {
      if (!row.subjectid) {
        self.$message.warning("上封面的贴子id， 不存在！");
        return;
      }
      let self = this;
      let res = await self.coverSetting({
        subjectid: row.subjectid,
        region_id: self.fliterregion || "0"
      });
      if (res) {
        // self.coverpara["pagenum"] = 1;
        await self.getCoverList();
      }
    }
  }
};
</script>
<style>
.preview .el-dialog {
  min-width: 375px !important;
  border-radius: 10px;
  box-shadow: 0px 0px 25px #333;
}
.preview .el-dialog__body {
  padding: 10px 0;
}
</style>

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
.table_logo {
  width: 100px;
  height: 55px;
}
</style>
