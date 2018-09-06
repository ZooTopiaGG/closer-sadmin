<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">产品管理 / 群消息智能提示设置</section>
    <section class="permission_table flex-1">
      <section class="permission_table_content">
        <section class="flex flex-align-center" style="margin-bottom: 20px;">
          <span>用户开启智能提醒模式，当用户发言后，在</span>
            <el-input v-model="inputNumber" class="label label-input" placeholder="请输入条数"></el-input>
          <span>条消息内，会将消息推送给用户</span>
        </section>
        <section class="flex flex-align-center">
          <span>用户开启智能提醒模式，当用户发言后，在</span>
            <el-select
              v-model="bindTime"
              class="label label-select"
              placeholder="选择时间">
              <el-option
                v-for="item in 72"
                :key="item"
                :label="item"
                :value="item">
                <span>{{ item }}</span>
              </el-option>
            </el-select>
          <span>小时内将消息推送给用户</span>
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
      inputNumber: "",
      bindTime: '',
    };
  },
  computed: {
    ...mapState("city", {
      regionsList: state => state.regionsList,
      getBindColumn: state => state.getBindColumn,
      getSearchColumn: state => state.getSearchColumn
    }),
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
    ...mapActions("city", [
      "getRegionsList",
      "setBindAnnounceCommunity",
      "getBindAnnounceCommunity",
      "addRegion",
      "showCommunity",
      "updateRegion",
      "showRegion"
    ]),
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
