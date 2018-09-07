<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">配置管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_content">
        <el-table :data="configList.data" style="width: 100%">
          <el-table-column fixed type="index" label="序号">
          </el-table-column>
          <el-table-column prop="dataSetDesc" label="配置名称">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="400">
            <template slot-scope="scope">
              <el-button v-for="(item, index) in authUser.permissions.config" type="text" :key="index" size="medium" @click="gotonext(item.name, scope.row)">{{ item.name }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <!-- <section class="block cloumn-block" v-if="logList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="logList.count">
      </el-pagination>
    </section> -->
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("config", ["configList"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {};
  },
  created() {
    this.getConfigList();
  },
  methods: {
    ...mapActions("config", ["getConfigList"]),
    gotonext(type, row) {
      let self = this,
        s = JSON.stringify;
      sessionStorage.setItem("row", s(row));
      let t = type === "配置查看" ? 1 : 2;
      self.$router.push({ name: "config_details", query: { type: t } });
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
