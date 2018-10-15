<template>
  <section id="permission" class="closer flex flex-v">
    <section class="permission_title">财务管理 / 财务审核</section>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="flex flex-v flex-1">
      <el-tab-pane label="待审批" name="approval">
        <approval-List></approval-List>
      </el-tab-pane>
      <el-tab-pane label="改政策记录" name="apply">
        <f-apply></f-apply>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="recharge">
        <f-recharge></f-recharge>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import approvalList from "@/components/approvalList.vue";
import fApply from "@/components/fApply.vue";
import fRecharge from "@/components/fRecharge.vue";
export default {
  mixins: ["myMixins"],
  name: "info",
  components: {
    approvalList,
    fRecharge,
    fApply
  },
  data() {
    return {
      activeName: "approval"
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


