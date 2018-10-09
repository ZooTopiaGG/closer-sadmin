<template>
  <section id="permission" class="closer flex flex-v">
    <section class="permission_title">财务管理 / 提现审核 / 个人详情</section>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="flex flex-v flex-1">
      <el-tab-pane label="入账记录" name="account_entry">
        <account-entry></account-entry>
      </el-tab-pane>
      <el-tab-pane label="提现记录" name="withdraw_record">
        <withdraw-record></withdraw-record>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import accountEntry from "@/components/accountEntry.vue";
import withdrawRecord from "@/components/withdrawRecord.vue";
export default {
  name: "info",
  components: {
    accountEntry,
    withdrawRecord
  },
  data() {
    return {
      activeName: "account_entry"
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


