<template>
  <section id="permission" class="flex flex-v">    
    <section>
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="flex flex-align-center">
            <el-input v-model="user_phone" placeholder="请输入手机号" @keyup.enter.native="handleSearch">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
         <section class="flex flex-align-center">
          <section style="margin-left: 15px;">
            <el-button type="primary" @click="preDownCsv">导出数据</el-button>
          </section>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="withdrawList.data" style="width: 100%">
          <el-table-column fixed prop="objectID" label="ID">
          </el-table-column>
          <el-table-column prop="userName" label="申请者昵称">
          </el-table-column>
          <el-table-column prop="userPhone" label="手机号">
          </el-table-column>
          <el-table-column prop="certNo" label="身份证号">
          </el-table-column>
          <el-table-column prop="withdrawApply" label="申请金额">
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook(scope.row)" size="medium">查看详情</el-button>
              <el-button type="text" @click="showDialog('通过', scope.row)" size="medium">通过</el-button>
              <el-button type="text" @click="showDialog('拒绝', scope.row)" size="medium">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p style="margin-bottom: 20px;">选择以下原因后拒绝：</p>
      <el-radio-group v-model="refuseLabel">
        <el-radio label="由于您的账户存在安全风险，已暂时冻结">由于您的账户存在安全风险，已暂时冻结</el-radio>
        <el-input
          type="textarea"
          autosize
          style="margin-top: 15px"
          placeholder="输入理由"
          v-model="reasonLabel">
        </el-input>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureRefuse">确 定</el-button>
      </span>
    </el-dialog>
    <section class="block" v-if="withdrawList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="withdrawList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mixins: ["myMixins"],
  computed: {
    ...mapState("finance", ["withdrawList"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      financepara: {
        auditStatus: "apply",
        page: 1,
        count: 10,
        startTime: "",
        endTime: "",
        userName: ""
      },
      user_phone: "",
      pagenum: 1,
      pagesize: 10,
      row: "",
      dialogVisible: false,
      refuseLabel: "由于您的账户存在安全风险，已暂时冻结",
      reasonLabel: "",
      keys: ["ID", "申请者昵称", "手机号", "身份证号", "申请金额", "申请时间"],
      values: [
        "objectID",
        "userName",
        "userPhone",
        "certNo",
        "withdrawApply",
        "createTime"
      ]
    };
  },
  created() {
    this.withdrawAuthList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["withdrawAuthList", "authStatus"]),
    async preDownCsv() {
      let self = this;
      await self.withdrawAuthList2csv({
        auditStatus: "apply",
        userName: self.user_phone || ""
      });
      await self.json2csv(
        self.withdrawList2csv.data,
        self.keys,
        self.values,
        `提现审核-待审批`
      );
    },
    async clearSearch() {
      this.pagenum = 1;
      this.user_phone = "";
      await this.handleSelect();
    },
    async handleSearch() {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async handleSelect() {
      let self = this;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["userName"] = self.user_phone || "";
      await self.withdrawAuthList(self.financepara);
    },
    async handleCurrentChange(val) {
      this.pagenum = val;
      await this.handleSelect();
    },
    // 改版
    handleLook(row) {
      window.sessionStorage.setItem("closer_user_info", JSON.stringify(row));
      this.$router.push({
        path: `/finance/withdraw/details?id=${row.objectID}`
      });
    },
    async showDialog(type, row) {
      let self = this;
      self.listRow = row;
      self.listType = type;
      if (type === "通过") {
        if (row.isLock != "unlock") {
          self.$message.warning("该用户已被设置为不可提现，无法通过审核!");
          return;
        }
        let confirm = `此操作将通过 ${row.userName} 提现审核, 是否继续?`;
        self
          .$confirm(confirm, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            self.audit();
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        self.dialogVisible = true;
      }
    },
    // 确认拒绝
    sureRefuse() {
      let self = this;
      if (!this.refuseLabel) {
        self.$message.warning("请选择拒绝理由！");
        return;
      }
      let confirm = `此操作将拒绝过 ${
        self.listRow.userName
      } 提现审核, 是否继续?`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.audit();
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 审核操作
    async audit() {
      let self = this;
      let para;
      if (self.listType === "通过") {
        para = {
          withdrawId: self.listRow.withdraw.withdrawId,
          auditStatus: "success"
        };
      } else {
        para = {
          withdrawId: self.listRow.withdraw.withdrawId,
          auditStatus: "fail",
          rejectReason: self.reasonLabel || self.refuseLabel
        };
      }
      let res = await self.authStatus(para);
      if (res) {
        self.clearSearch();
        self.dialogVisible = false;
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style type="text/css">
.userinfo .el-input .el-input__inner {
  width: 150px;
}
</style>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 65px;
}
.inputCode {
  width: 200px;
}
.userinfo .middle-label {
  width: 200px;
}
.userinfo .middle-label-2 {
  width: 215px;
}
.userinfo .long-label {
  width: 380px;
}

.hr {
  background-color: #e6e6e6;
  height: 1px;
  margin-top: 20px;
}
</style>
