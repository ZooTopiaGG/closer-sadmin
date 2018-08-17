<template>
  <div id="record" class="flex flex-v">
    <div class="flex-1">
      <div class="permission_table_top flex flex-pack-justify">
        <div class="flex flex-align-center">
          <span class="labelname">
            客户ID
          </span>
          <el-input v-model="userid" maxlength="11" @keyup.enter.native="bindSearch" placeholder="客户ID">
            <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
          </el-input>
        </div>
      </div>
      <!-- table 修改查看操作 -->
      <div class="permission_table_content">
        <el-table :data="userList.data" style="width: 100%">
          <el-table-column fixed prop="fullname" label="客户名">
          </el-table-column>
          <el-table-column prop="objectID" label="客户ID">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook(scope.row)" size="medium">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- dialog  -->
      <el-dialog title="用户详情" :visible.sync="dialogTableVisible">
        <div class="userinfo">
          <p class="flex">
            <span class="label">用户名：</span>
            <span>{{ userInfo.fullname }}</span>
          </p>
          <p class="flex">
            <span class="label">用户ID：</span>
            <span>{{ userInfo.objectID }}</span>
          </p>
          <p class="flex">
            <span class="label">当前余额：</span>
            <span v-if="columnInfo.data1">{{ columnInfo.data1.availableBalance / 100 }}</span>
          </p>
          <p class="flex">
            <span class="label">提现记录：</span>
          </p>
        </div>
        <el-table :data="columnInfo.data2">
          <el-table-column property="createTime" label="时间"></el-table-column>
          <el-table-column property="withdrawAmt" label="额度"></el-table-column>
        </el-table>
        <div class="block eldialog-block" v-if="columnInfo.count>0">
          <el-pagination @current-change="handleCurrentChange1" :current-page="pagenum2" :page-size="pagesize2" layout="total, prev, pager, next, jumper"
            :total="columnInfo.count">
          </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sure_lock_wallet">{{ buttonname }}</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="block" v-if="userList.count>0">
      <el-pagination @current-change="handleCurrentChange2" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="userList.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["userList", "columnInfo"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 7,
        userId: null
      },
      userid: null,
      dialogTableVisible: false,
      pagenum: 1,
      pagesize: 7,
      pagenum2: 1,
      pagesize2: 5,
      userInfo: {},
      buttonname: "是否允许用户提现",
      locktype: ""
    };
  },
  created() {
    this.closerUserList(this.financepara);
  },
  methods: {
    ...mapActions("finance", [
      "closerUserList",
      "userWithdrawList",
      "closerUserBalance",
      "walletLockType",
      "lockWallet"
    ]),
    bindSearch() {
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange1(val) {
      this.pagenum2 = val;
      this.withdraw_list();
    },
    handleCurrentChange2(val) {
      this.pagenum = val;
      this.getUserList();
    },
    // 获取用户信息
    async getUserList() {
      let self = this;
      self.financepara["page"] = self.pagenum;
      self.financepara["userId"] = self.userid;
      await self.closerUserList(self.financepara);
    },
    // 资金记录
    async withdraw_list() {
      let self = this;
      await self.userWithdrawList({
        page: self.pagenum2,
        count: self.pagesize2,
        uid: self.userInfo.objectID
      });
    },
    // 用户信息
    async closer_user_balance() {
      let self = this;
      await self.closerUserBalance({
        userId: self.userInfo.objectID
      });
    },
    // 提现状态 wallet_lock_type
    async wallet_lock_type() {
      let self = this;
      let res = await self.walletLockType({
        uid: self.userInfo.objectID
      });
      if (res) {
        self.locktype = res;
        if (res === "unlock") {
          self.buttonname = "是否禁止提现";
        } else {
          self.buttonname = "是否允许提现";
        }
      }
    },
    // 设置提现confirm提示
    async sure_lock_wallet() {
      let self = this;
      let confirm =
        self.locktype === "unlock"
          ? `此操作将禁止 “${self.userInfo.fullname}” 提现, 是否继续?`
          : `此操作将允许 “${self.userInfo.fullname}” 提现, 是否继续?`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.lock_wallet();
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 点击设置提现状态 lock_wallet
    async lock_wallet() {
      let self = this;
      let res = await self.lockWallet({
        uid: self.userInfo.objectID,
        lockType: self.locktype === "unlock" ? "lock" : "unlock"
      });
      if (res) {
        self.dialogTableVisible = false;
      }
    },
    // 查看用户信息
    async handleLook(row) {
      let self = this;
      self.userInfo = row;
      await self.wallet_lock_type();
      await self.closer_user_balance();
      await self.withdraw_list();
      self.dialogTableVisible = true;
    }
  }
};
</script>
<style>
.block.eldialog-block {
  margin-bottom: 0;
}
</style>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 50px;
}

.userinfo .label {
  width: 80px;
}
</style>
