<template>
  <section id="closerInfo" class="closer">
    <el-dialog :title="title" class="column-dialog" @close="handleClose" :visible.sync="dialogTableVisible">
      <el-form class="userinfo2" :model="ruleForm">
        <el-form-item label="当前额度" class="flex flex-align-center"  v-if="type === 0">
            <span>20000元</span>
        </el-form-item>
        <el-form-item label="当前上限" class="flex flex-align-center" v-if="type === 1">
            <span>20000元</span>
        </el-form-item>
        <el-form-item label="修改额度" class="flex flex-align-center" v-if="type === 0 || type === 1">
          <p class="flex flex-align-center">
            <el-input v-model="ruleForm.subsidy" placeholder="请输入具体金额"></el-input>
            <span>元</span>
          </p>
        </el-form-item>
        <section v-if="type === 2 || type === 3">
          <el-form-item label="可用余额" class="flex flex-align-center">
            <span>20000元</span>
          </el-form-item>
          <el-form-item label="缓释金余额" class="flex flex-align-center">
            <span>20000元</span>
          </el-form-item>
          <el-form-item label="充值" class="flex flex-align-center">
            <p class="flex flex-align-center">
              <el-input v-model="ruleForm.subsidy" placeholder="请输入具体金额"></el-input>
              <span>元</span>
            </p>
          </el-form-item>
          <el-form-item label="缓释额度" class="flex flex-align-center">
            <p class="flex flex-align-center">
              <el-input v-model="ruleForm.subsidy" placeholder="请输入具体金额"></el-input>
              <span>元</span>
            </p>
          </el-form-item>
        </section>
        <span class="prompt">
          请认真填写金额，确认后提交申请
        </span>
      </el-form>
      <section slot="footer" class="dialog-footer">
        <el-button type="text">取 消</el-button>
        <el-button type="primary">提交申请</el-button>
      </section>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: "recharge",
  props: {
    title: {
      type: String,
      default: "每日缓释额度"
    },
    type: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        subsidy: ""
      },
      dialogTableVisible: true
    };
  },
  methods: {
    handleClose() {
      this.$emit("visible", this.dialogTableVisible);
    }
  }
};
</script>
<style>
#closerInfo .el-dialog__body {
  padding: 10px 20px;
}
.userinfo2 .el-input .el-input__inner {
  width: 150px;
  margin-right: 5px;
}

#app .closer .el-dialog {
  min-width: 320px;
  width: 320px;
}
#app .closer .column-dialog .el-button--text {
  color: #999;
}
#app .closer .column-dialog .el-form-item {
  margin-bottom: 0;
}
#app .closer .column-dialog p {
  margin: 0;
}
#app .closer .column-dialog .el-form-item__label {
  min-width: 82px;
}
</style>
<style scoped>
.prompt {
  color: red;
  font-size: 12px;
  margin-left: 68px;
}
</style>


