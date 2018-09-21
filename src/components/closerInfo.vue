<template>
  <section id="closerInfo" class="flex flex-v flex-align-center">
    <section class="cm flex">
      <aside>栏目基本信息</aside>
      <section class="flex-1">
        <section class="flex flex-pack-justify">
          <p><span>贴近号名称：</span><span>直升机</span></p>
          <p><span>注册手机：</span><span>124567888</span></p>
        </section>
        <section class="flex flex-pack-justify">
          <p><span>贴近号归属：</span><span>上海</span></p>
          <p><span>企业名称：</span><span>上海切近信息技术有限公司</span></p>
        </section>
        <section class="flex flex-pack-justify">
          <p><span>创建时间：</span><span>2018-08-09 33333</span></p>
          <p><span>社会信用代码：</span><span>12456788点点滴滴8</span></p>
        </section>
      </section>
    </section>
    <section class="split_line"></section>
    <section class="cm flex">
      <aside>修改额度</aside>
      <section>
        <section>
          <p class="flex flex-align-center">
            <span>一次性到账额度：</span>
            <span>1223435</span>
            <i class="write" @click="showRechargePopup(1)"></i>
          </p>
        </section>
        <section>
          <p class="flex flex-align-center">
            <span>每日缓释额度：</span>
            <span>999</span>
            <i class="write" @click="showRechargePopup(0)"></i>
          </p>
        </section>
      </section>
    </section>
    <section class="cm flex">
      <aside>充值</aside>
      <section>
        <section>
          <p><span>当前余额：</span><span>12345</span></p>
        </section>
        <section>
          <p><span>缓释金额：</span><span>999</span></p>
        </section>
      </section>
    </section>
    <section class="cm cm-group-button flex">
      <el-button type="primary" @click="showRechargePopup(2)">申请充值</el-button>
      <el-button type="primary">清空余额</el-button>
    </section>
    <section v-if="dialogTableVisible">
      <recharge-popup :title="title" :type="type" @visible="visible"></recharge-popup> 
    </section>
  </section>
</template>
<script>
import rechargePopup from "@/components/rechargePopup.vue";
export default {
  name: "closer",
  components: {
    rechargePopup
  },
  data() {
    return {
      dialogTableVisible: false,
      ruleForm: {
        subsidy: ""
      },
      title: "每日缓释额度",
      type: 0
    };
  },
  methods: {
    showRechargePopup(type) {
      let self = this;
      self.type = type;
      if (type === 1) {
        self.title = "单一贴发放上限";
      } else if (type === 2 || type === 3) {
        self.title = "充值";
      } else {
        self.title = "每日缓释金额";
      }
      self.dialogTableVisible = true;
    },
    visible(val) {
      this.dialogTableVisible = val;
    }
  }
};
</script>
<style scoped="scoped">
#closerInfo {
  padding-top: 15vh;
}
.split_line {
  width: 100%;
  height: 1px;
  background: #eee;
  margin-bottom: 30px;
}
.cm {
  margin-bottom: 30px;
  width: 600px;
}
.cm aside {
  margin-right: 30px;
  min-width: 100px;
  text-align: right;
  font-weight: bold;
}
.cm > section {
  margin-top: 10px;
}
.cm-group-button {
  margin-left: 130px;
}
.prompt {
  color: red;
  font-size: 12px;
  margin-left: 68px;
}
.write {
  width: 18px;
  min-width: 18px;
  height: 18px;
  background: url("../assets/images/write.png") no-repeat;
  margin-left: 5px;
  background-size: cover;
}
</style>
