<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">通知管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex-1"></section>
        <section class="flex flex-align-center">
          <el-button type="primary" class="text-button" @click="setNotice">预警通知配置</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNoticerModal('add')">添加通知人</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="userList.list" style="width: 100%">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="name" label="姓名" >
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="mail" label="邮件">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="updateModal('update',scope.row)">修改</el-button>
              <el-button type="text" size="medium" @click="lookModal('look', scope.row)">查看</el-button>
              <el-button @click="delModal('del', scope.row)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <el-dialog :title="notifyTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="80px" class="forms" :disabled="disabled">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮件">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureModal">确 定</el-button>
        </section>
      </el-dialog>
      <el-dialog title="预警设置" class="notice_set" :visible.sync="dialogSetVisible">
        <section>
          <el-checkbox v-model="send_mail" @change="sendmail">发送邮件</el-checkbox>
        <el-checkbox v-model="send_msg" @change="sendMsg">发送短信</el-checkbox>
        <section class="hr"></section>
        <section class="module">
          <section class="amount">
            每天提现总额度：
            <el-input
              placeholder="请输入总额度"
              v-model="amount">
            </el-input>
            元
          </section>
          <section>
            提醒：
            用户昵称+手机号&nbsp;&nbsp;提现{#元}达到设置的预警界限
          </section>
        </section>
        <section class="hr"></section>
        <section class="module">
          <section class="amount">
            每天提现总次数：
            <el-input
              placeholder="请输入总次数"
              v-model="number">
            </el-input>
            次
          </section>
          <section>
            提醒：
            用户昵称+手机号&nbsp;&nbsp;提现{#次}达到设置的预警界限
          </section>
        </section>
        </section>
        <section slot="footer" class="dialog-footer">
          <el-button @click="dialogSetVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureSetNotice">确 定</el-button>
        </section>
      </el-dialog>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("notice", ["userList"])
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogSetVisible: false,
      dialogMsgVisible: true,
      dialogmailVisible: true,
      send_mail: true,
      send_msg: true,
      amount: 500,
      mail_text: "",
      phone_text: "",
      mail_text2: "",
      phone_text2: "",
      number: 4,
      form: {
        name: "",
        phone: "",
        mail: ""
      },
      operationType: "",
      res: {
        list: []
      },
      row: {},
      disabled: false,
      notifyTitle: "添加通知人"
    };
  },
  created() {
    this.getAllUser();
  },
  methods: {
    ...mapActions("notice", [
      "getAllUser",
      "getNotifyRules",
      "updateRules",
      "addUser",
      "updateUser",
      "deleteUser",
      "userByPhone",
      "userByMail"
    ]),
    sendmail(val) {
      this.dialogmailVisible = val;
    },
    sendMsg(val) {
      this.dialogMsgVisible = val;
    },
    async setNotice() {
      await this._getNotifyRules();
      this.dialogSetVisible = true;
    },
    async _getNotifyRules() {
      let self = this;
      let res = await self.getNotifyRules();
      if (res) {
        let ret = res.rules[0];
        self.send_mail = ret.by_mail === 1;
        self.send_msg = ret.by_message === 1;
        self.amount = ret.money / 100 || 500;
        self.number = ret.frequency || 4;
      }
    },
    async _updateRules() {
      let self = this;
      await self.updateRules({
        money: self.amount * 100 || 0,
        frequency: Number(self.number) || 0,
        by_mail: self.send_mail ? 1 : 0,
        by_message: self.send_mail ? 1 : 0,
        money_msg: "提现金额达到你设置的预警界限",
        frequency_msg: "提现金额达到你设置的预警界限"
      });
      self.dialogSetVisible = false;
    },
    async sureSetNotice() {
      let self = this;
      self
        .$confirm("此操作将更改预警设置, 是否继续", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self._updateRules();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async sureModal() {
      let self = this;
      if (self.operationType != "look") {
        if (!self.form.name) {
          self.$message.warning("姓名不能为空！");
          return;
        }
        if (!self.form.phone) {
          self.$message.warning("手机号不能为空！");
          return;
        }
        if (!self.form.mail) {
          self.$message.warning("邮箱不能为空！");
          return;
        }
        if (await self.checkPhone()) {
          self.$message.warning("手机号被占用！");
          return;
        }
        if (await self.checkMail()) {
          self.$message.warning("邮箱被占用！");
          return;
        }
      }
      switch (self.operationType) {
        case "add":
          await self.addNotifyUser();
          break;
        case "update":
          await self.updateNotifyUser();
          break;
        case "look":
          await self.lookNotifyUser();
        default:
          return;
      }
    },
    addNoticerModal(type) {
      this.form = {
        name: "",
        phone: "",
        email: ""
      };
      this.notifyTitle = "添加通知人";
      this.disabled = false;
      this.dialogFormVisible = true;
      this.operationType = type;
    },
    async addNotifyUser() {
      let self = this;
      await self.addUser(self.form);
      await self.getAllNotifyUser();
      self.dialogFormVisible = false;
    },
    updateModal(type, row) {
      this.dialogFormVisible = true;
      this.notifyTitle = "修改通知人";
      this.operationType = type;
      this.disabled = false;
      this.row = row;
      this.form = {
        phone: row.phone,
        mail: row.mail,
        name: row.name
      };
    },
    async updateNotifyUser() {
      let self = this;
      self.form["id"] = self.row.id;
      await self.updateUser(self.form);
      await self.getAllNotifyUser();
      self.dialogFormVisible = false;
    },
    lookModal(type, row) {
      this.dialogFormVisible = true;
      this.operationType = type;
      this.notifyTitle = "查看通知人";
      this.disabled = true;
      this.row = row;
      this.form = {
        phone: row.phone,
        mail: row.mail,
        name: row.name
      };
    },
    async lookNotifyUser() {
      this.dialogFormVisible = false;
    },
    delModal(type, row) {
      let self = this;
      let confirm = `此操作将删除被通知人“${row.name}”, 是否继续?`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.delNotifyUser(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async delNotifyUser(row) {
      await this.deleteUser({
        id: row.id
      });
      await this.getAllNotifyUser();
    },
    async checkPhone() {
      let res = await this.userByPhone({
        phone: this.form["phone"]
      });
      if (res) {
        return res.list.length > 0;
      }
    },
    async checkMail() {
      let res = await this.userByMail({
        mail: this.form["mail"]
      });
      if (res) {
        return res.list.length > 0;
      }
    }
  }
};
</script>
<style scoped>
.forms {
  width: 320px;
}
.notice_set .module > section {
  margin-top: 20px;
}
.module .el-input {
  width: 300px;
}
.module .amount .el-input {
  width: 100px;
}
.hr {
  margin-top: 20px;
  background-color: #eee;
  height: 1px;
  width: 100%;
}
</style>

