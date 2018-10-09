<template>
  <section id="permission" class="closer flex flex-v">
    
    <el-tabs v-model="activeName" @tab-click="handleClick" class="flex flex-v flex-1">
      <el-tab-pane label="充值" name="approval_recharge">
        <approval-recharge></approval-recharge>
      </el-tab-pane>
      <el-tab-pane label="改政策" name="approval_apply">
        <approval-apply></approval-apply>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import approvalRecharge from "@/components/approvalRecharge.vue";
import approvalApply from "@/components/approvalApply.vue";
export default {
  name: "info",
  components: {
    approvalApply,
    approvalRecharge
  },
  data() {
    return {
      activeName: "approval_recharge"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
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


