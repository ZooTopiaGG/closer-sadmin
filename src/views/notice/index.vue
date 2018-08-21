<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">通知管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex-1"></section>
        <section class="flex flex-align-center">
          <el-button type="primary" class="text-button" @click="setNotice">预警通知配置</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNoticer">添加通知人</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="res.data" style="width: 100%">
          <el-table-column prop="number" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="name" label="姓名" >
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="email" label="邮件">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="modify(scope.row)">修改</el-button>
              <el-button @click="look(scope.row)" type="text" size="medium">查看</el-button>
              <el-button @click="del(scope.row)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <el-dialog title="添加通知人" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="80px" class="forms">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮件">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </section>
      </el-dialog>
      <el-dialog title="预警设置" class="notice_set" :visible.sync="dialogSetVisible">
        <el-checkbox v-model="send_email" @change="sendEmail">发送邮件</el-checkbox>
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
          <section  v-show="dialogEmailVisible">
            邮件提醒：
            用户昵称/手机号&nbsp;&nbsp;
            <span>提现 {{amount}} 元</span>
            达到预警界限
          </section>
          <section v-show="dialogMsgVisible">
            短信提醒：
            用户昵称+手机号&nbsp;&nbsp;
            <span>提现 {{amount}} 元</span>
            达到预警界限
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
          <section  v-show="dialogEmailVisible">
            邮件提醒：
            用户昵称/手机号&nbsp;&nbsp;
            <span>提现 {{number}} 次</span>
            达到预警界限
          </section>
          <section v-show="dialogMsgVisible">
            短信提醒：
            用户昵称+手机号&nbsp;&nbsp;
            <span>提现 {{number}} 次</span>
            达到预警界限
          </section>
        </section>
        <section slot="footer" class="dialog-footer">
          <el-button @click="dialogSetVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogSetVisible = false">确 定</el-button>
        </section>
      </el-dialog>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogSetVisible: false,
      dialogMsgVisible: true,
      dialogEmailVisible: true,
      send_email: true,
      send_msg: true,
      amount: 500,
      email_text: "",
      phone_text: "",
      email_text2: "",
      phone_text2: "",
      number: 4,
      form: {
        name: "",
        phone: "",
        email: ""
      },
      res: {
        data: [
          {
            number: 1,
            name: "某某",
            phone: "12233444334",
            email: "1232434@qq.com",
            create_time: "2018-03-22 33:33"
          }
        ]
      }
    };
  },
  methods: {
    sendEmail(val) {
      this.dialogEmailVisible = val;
    },
    sendMsg(val) {
      this.dialogMsgVisible = val;
    },
    setNotice() {
      this.dialogSetVisible = true;
    },
    addNoticer() {
      this.dialogFormVisible = true;
    },
    modify() {},
    look() {},
    del() {}
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

