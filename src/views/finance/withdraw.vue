<template>
  <div id="permission" class="flex flex-v">
    <div class="permission_title">
      <span style="margin-right: 30px;">提现申请</span>
      <el-radio-group v-model="radioRecord" @change="handleSelect">
        <el-radio label="/finance/withdraw/applying">申请中</el-radio>
        <el-radio label="/finance/withdraw/audited">已审核</el-radio>
      </el-radio-group>
    </div>
    <div class="permission_table flex-1">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
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
      if (to.path === "/finance/withdraw/applying") {
        this.radioRecord = "/finance/withdraw/applying";
      }
      // console.log("from====", from);
    }
  },
  methods: {
    handleSelect(item) {
      // console.log(item);
      switch (item) {
        case "/finance/withdraw/applying":
          this.$router.push({
            path: "/finance/withdraw/applying"
          });
          break;
        case "/finance/withdraw/audited":
          this.$router.push({
            path: "/finance/withdraw/audited"
          });
          break;
        default:
          this.$router.push({
            path: "/finance/withdraw/applying"
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
