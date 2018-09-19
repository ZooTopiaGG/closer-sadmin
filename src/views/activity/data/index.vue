<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">活动数据</section>
    <section class="permission_table">
      <!-- <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            活动名称
          </span>
          <el-input v-model="inputCity" placeholder="请输入活动名称" @keyup.enter.native="searchCityByKeywords">
            <el-button slot="append" icon="el-icon-search" @click="searchCityByKeywords"></el-button>
          </el-input>
        </section>
      </section> -->
      <section class="permission_table_content">
        <el-table :data="closerActivityLists.data" style="width: 100%">
          <el-table-column prop="createTime" label="活动开始日期">
          </el-table-column>
          <el-table-column prop="activityName" label="活动名称">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="280">
            <template slot-scope="scope">
             <el-button type="text" size="medium" v-if="scope.row.activityId !=1" @click="look(scope.row)">查看</el-button>
             <el-button type="text" size="medium" v-if="scope.row.activityDesc === 'question'" @click="goConfig(scope.row)">上传配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="closerActivityLists.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="closerActivityLists.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("activity", ["closerActivityLists"]),
    headers() {
      return {
        Authorization: `CloserSysAuth ${this.$store.state.token}`
      };
    },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      row: {},
      pagenum: 1,
      pagesize: 10
    };
  },
  created() {
    this.closerActivityList();
  },
  methods: {
    ...mapActions("activity", ["closerActivityList"]),
    handleCurrentChange() {},
    searchCityByKeywords() {},
    look(row) {
      let type = row.activityDesc ? row.activityDesc : 'else';
      switch(type) {
        case 'question': this.$router.push({
            path: `/activity/data/question?id=${row.activityId}&type=${type}`
          });
        break;
        case 'else': this.$router.push({
            path: `/activity/data/taijibing?id=${row.activityId}&type=${type}`
          });
        break;
        default: return;
      }
    },
    goConfig(row) {
      let type = row.activityDesc ? row.activityDesc : 'else';
      this.$router.push({
        path: `/activity/data/question/config?id=${row.activityId}&type=${type}`
      });
    }
  }
};
</script>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 60px;
}
.activity-cell .avatar-uploader .avatar-uploader-icon {
  width: 164px;
  height: 164px;
  line-height: 164px;
}
.activity-cell .avatar {
  width: 164px;
  height: 164px;
}
.permission_table .permission_table_content {
  margin-top: 0;
}
.dialog-label {
  max-width: 300px;
}
.prompt {
  font-size: 12px;
  color: #999;
  padding-bottom: 10px;
  margin-left: 20px;
}
.table_logo {
  max-height: 60px;
}
</style>
