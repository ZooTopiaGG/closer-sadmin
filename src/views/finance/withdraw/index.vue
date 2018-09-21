<template>
  <section id="permission" class="closer flex flex-v">
    <section class="permission_title">财务管理 / 提现审核</section>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="flex flex-v flex-1">
      <el-tab-pane label="待审批" name="approval">
        <withdraw-approval></withdraw-approval>
      </el-tab-pane>
      <el-tab-pane label="审核记录" name="logo">
        <w-logo></w-logo>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import withdrawApproval from "@/components/withdrawApproval.vue";
import wLogo from "@/components/wlogo.vue";
export default {
  name: "info",
  components: {
    withdrawApproval,
    wLogo
  },
  data() {
    return {
      activeName: "approval"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
  // created() {
  //   this.activeName = this.$route.query.type;
  // }
};
</script>
<style>
.closer .el-tabs__header {
  margin-bottom: 0;
}
.closer .el-tabs__content {
  flex: 1;
  background: #fff;
  margin-bottom: 15px;
  border-radius: 0 0 3px 3px;
}
</style>


