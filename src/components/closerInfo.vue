<template>
  <section id="closerInfo" class="flex flex-v flex-align-center">
    <section class="cm flex">
      <aside>栏目基本信息</aside>      
      <el-form label-position="right" label-width="120px" class="flex">
        <section>
          <el-form-item label="贴近号名称：">
            <span>{{ communityInfo.community.name }}</span>
          </el-form-item>
          <el-form-item label="贴近号归属：">
            <span>{{ communityInfo.region.region_name }}</span>
          </el-form-item>
          <el-form-item label="创建时间：">
            <span>{{ $com.createTime(communityInfo.community.long_create_time, 'yy-mm-dd hh:MM') }}</span>
          </el-form-item>
        </section>
        <section>
          <el-form-item label="注册手机：">
            <span>{{ communityInfo.community.phone }}</span>
          </el-form-item>
          <el-form-item label="企业/个人名称：">
            <span>{{ communityInfo.community.companyname || communityInfo.community.person_name }}</span>
          </el-form-item>
          <el-form-item label="社会信用代码：">
            <span>{{ communityInfo.community.business_license || noValue }}</span>
          </el-form-item>
        </section>
      </el-form>
    </section>
    <section class="split_line"></section>
    <section class="cm flex">
      <aside>改政策</aside>
      <section>
        <section>
          <p class="flex flex-align-center">
            <span>单一帖发放上限：</span>
            <span>{{ communityInfo.summary.transMaxAmt / 100 }}</span>
          </p>
        </section>
        <section>
          <p class="flex flex-align-center">
            <span>日缓释额度：</span>
            <span>{{ communityInfo.summary.dailyAllowanceAmt / 100 }}</span>
          </p>
        </section>
        <section  v-if="$route.query.from != 'audit'">
          <el-button type="primary" @click="showRechargePopup(1)">申请修改</el-button>
        </section>
      </section>
    </section>
    <section class="cm flex">
      <aside>充额度</aside>
      <section>
        <section>
          <p><span>可用余额：</span><span>{{ communityInfo.wallet.availableBalance / 100 }}</span></p>
        </section>
        <section>
          <p><span>未解冻余额：</span><span>{{ (communityInfo.summary.totalAllowanceAmt -  communityInfo.summary.totalAllowancedAmt) / 100 }}</span></p>
        </section>
      </section>
    </section>
    <section class="cm cm-group-button flex" v-if="$route.query.from != 'audit'">
      <el-button type="primary" @click="showRechargePopup(2)">申请充值</el-button>
      <el-button type="primary" @click="showClearPopup">清空余额</el-button>
    </section>
    <section>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%">
        <span style="color: red;">是否清空当前贴近号下所有余额，包含未解冻金额</span>
        <section class="flex flex-v flex-align-center">
          <span>可用余额： {{ communityInfo.wallet.availableBalance / 100 }}元</span>
          <span>未解冻余额： {{ (communityInfo.summary.totalAllowanceAmt -  communityInfo.summary.totalAllowancedAmt) / 100 }}元</span>
        </section>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" style="color: #999;" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="promptClearWallet">确认清空</el-button>
        </span>
      </el-dialog>
    </section>
    <section v-if="dialogTableVisible">
      <recharge-popup :title="title" :type="type" @visible="visible" :row="communityInfo"></recharge-popup> 
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import rechargePopup from "@/components/rechargePopup.vue";
export default {
  name: "closer",
  components: {
    rechargePopup
  },
  computed: {
    ...mapState("finance", ["communityInfo"])
  },
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      ruleForm: {
        subsidy: ""
      },
      title: "改政策",
      type: 0,
      row: {},
      noValue: "空"
    };
  },
  created() {
    try {
      this.row = JSON.parse(window.sessionStorage.getItem("closer_cloumn_row"));
    } catch (e) {
      console.log(e);
    }
    this.getCommunityDetail({
      communityid: this.$route.query.id
    });
  },
  methods: {
    ...mapActions("finance", ["clearWallet", "getCommunityDetail"]),
    showRechargePopup(type) {
      let self = this;
      self.type = type;
      if (type === 1) {
        self.title = "改政策";
      } else if (type === 2 || type === 3) {
        self.title = "充额度";
      } else {
        self.title = "改政策";
      }
      self.dialogTableVisible = true;
    },
    showClearPopup() {
      this.dialogVisible = true;
    },
    async promptClearWallet() {
      let res = await this.clearWallet({
        uid: this.row.objectID
      });
      if (res) {
        this.dialogVisible = false;
      }
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
  min-width: 680px;
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
.label {
  width: 120px;
  text-align: right;
}
span.label～span {
  width: 120px;
}
</style>
