<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">配置管理 / {{ rowData.dataSetDesc }}</section>
    <section class="permission_table flex-1">
      <section class="permission_table_content">
        <section class="flex flex-align-center" style="margin-bottom: 20px;" v-for="(item, index) in rowData.data" :key="index">
          <span>{{ item.desc }}</span>
          <el-input v-model="item.value" :ref="item.name" class="label label-input" :placeholder="item.value" :disabled="$route.query.type === 1"></el-input>
          <el-button v-if="$route.query.type != 1" @click="save(index, item)">保 存</el-button>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      inputNumber: "",
      rowData: {}
    };
  },
  computed: {
    headers() {
      return {
        Authorization: `CloserSysAuth ${this.$store.state.token}`
      };
    },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  created() {
    let s = JSON.parse;
    this.rowData = s(sessionStorage.getItem("row"));
  },
  methods: {
    ...mapActions("config", ["resetConfig"]),
    save(index, item) {
      let self = this;
      if (item.name === "withdrawAuditAmt") {
        if (
          !self.$com.isInteger(Number(item.value)) ||
          Number(item.value) < 100
        ) {
          self.$message.warning("提现审核金额只能是大于等于100的正整数!");
          return;
        }
        if (item.value.length > 7) {
          self.$message.warning("提现审核金额长度不能超过7位数字!");
          return;
        }
      }
      self
        .$confirm("此操作将更改此设置, 是否继续", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.sureSave({
            index,
            item
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async sureSave({ index, item }) {
      let self = this,
        s = JSON.stringify,
        para = {
          configSet: self.rowData.dataSetName,
          name: item.name,
          value: self.$refs[item.name][0].value
        };
      let res = await self.resetConfig(para);
      if (res) {
        sessionStorage.setItem("row", s(self.rowData));
      }
    }
  }
};
</script>
<style>
.label {
  width: 300px;
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
