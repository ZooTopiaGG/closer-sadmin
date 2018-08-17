<template>
  <div id="permission" class="flex flex-v">
    <div class="permission_title">
      <span style="margin-right: 30px;">财务记录</span>
      <el-radio-group v-model="radioRecord" @change="handleSelect">
        <el-radio label="/finance/records/column">栏目记录</el-radio>
        <el-radio label="/finance/records/user">用户记录</el-radio>
        <el-radio label="/finance/records/apply">审批记录</el-radio>
      </el-radio-group>
    </div>
    <div class="permission_table flex-1">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      // 财务记录分类
      radioRecord: ""
      // 为什么
    };
  },
  watch: {
    $route(to, from) {
      // console.log("to====", to);
      if (to.path === "/finance/records/column") {
        this.radioRecord = "/finance/records/column";
      }
      // console.log("from====", from);
    }
  },
  methods: {
    handleSelect(item) {
      // console.log(item);
      switch (item) {
        case "/finance/records/column":
          this.$router.push({
            path: "/finance/records/column"
          });
          break;
        case "/finance/records/user":
          this.$router.push({
            path: "/finance/records/user"
          });
          break;
        case "/finance/records/apply":
          this.$router.push({
            path: "/finance/records/apply"
          });
          break;
        default:
          this.$router.push({
            path: "/finance/records/column"
          });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.radioRecord = this.$route.path;
    });
  }
};
</script>
<style>
.persmission-dialog .el-input {
  width: 200px;
  margin-right: 20px;
}
</style>
<style scoped>
</style>
