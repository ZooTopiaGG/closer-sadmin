<template>
  <section id="permission" class="closer flex flex-v">
    <section class="permission_title">{{ row.name }} 贴近号</section>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="flex flex-v flex-1">
      <el-tab-pane label="贴近号信息" name="info">
        <closer-info></closer-info>
      </el-tab-pane>
      <el-tab-pane label="稿费记录" name="fee">
        <fee></fee>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="recharge">
        <recharge></recharge>
      </el-tab-pane>      
      <el-tab-pane label="改政策记录" name="apply">
        <apply></apply>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import closerInfo from "@/components/closerInfo.vue";
import Apply from "@/components/apply.vue";
import Fee from "@/components/fee.vue";
import Recharge from "@/components/recharge.vue";
export default {
  name: "info",
  components: {
    closerInfo,
    Fee,
    Apply,
    Recharge
  },
  data() {
    return {
      activeName: "info",
      row: {}
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {
    this.activeName = this.$route.query.type;
    try {
      this.row = JSON.parse(window.sessionStorage.getItem("closer_cloumn_row"));
    } catch (e) {
      console.log(e);
    }
  }
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


