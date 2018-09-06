<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">产品管理 / 群消息智能提示设置</section>
    <section class="permission_table flex-1">
      <section class="permission_table_content">
        <section class="flex flex-align-center" style="margin-bottom: 20px;">
          <span>提现审核额度不超过</span>
            <el-input v-model="inputNumber" class="label label-input" placeholder="请输入额度"></el-input>
          <span>元</span>
        </section>
      </section>
    </section>
    <section class="fixedBottom flex flex-align-center flex-pack-center">
      <el-button size="small" type="primary">保 存</el-button>
      <el-button size="small">返 回</el-button>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      inputNumber: ""
    };
  },
  computed: {
    ...mapState("city", {}),
    headers() {
      return {
        Authorization: `CloserSysAuth ${this.$store.state.token}`
      };
    },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  methods: {
    ...mapActions("city", []),
  }
};
</script>
<style>
.label {
  width: 160px;
  margin: 0 20px;
}
.fixedBottom {
  position: fixed;
  width: calc(100% - 226px);
  height: 80px;
  bottom: 0px;
  left: calc(50% + 130px);
  transform: translate(-50%, 0);
  background: #f2f2f2;
}

.fixedBottom button {
  width: 200px;
}
</style>
