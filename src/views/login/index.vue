<template>
  <section class="container">
    <el-scrollbar class="page_container">
      <section class="form flex flex-pack-center">
        <section class="logo flex flex-v flex-align-center">
          <img src="@/assets/images/logo-super.png">
          <span>贴近超管后台</span>
        </section>
        <section class="line-split"></section>
        <el-form :model="ruleForm2" :rules="rules" status-icon ref="ruleForm2" class="login-ruleForm">
          <el-form-item class="login-title-item">
            <section class=" flex flex-pack-justify">
              <section class="login-title">登 录</section>
              <section class="register-title">
                <router-link to="/register">去注册</router-link>
              </section>
            </section>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input type="tel" maxlength="11" placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="ruleForm2.phone">
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <section class="flex flex-pack-justify">
              <el-input placeholder="请输入验证码" maxlength="6" prefix-icon="el-icon-goods" v-model="ruleForm2.code">
              </el-input>
              <el-button class="sendcode" @click="getCode({ phone: ruleForm2.phone, type: '2' })" :disabled="disabled" type="primary">{{ text }}</el-button>
            </section>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;margin-top:22px;" @click="submitForm('ruleForm2')">
              <span v-if="loading">
                <span class="el-icon-loading"></span>
                <span>正在登录</span>
              </span>
              <span v-else>登 录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-scrollbar>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "container",
  computed: {
    ...mapState("login", ["disabled", "text"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不可为空"));
      }
      if (!$async.isPhoneNum(value)) {
        callback(new Error("格式错误"));
      }
      callback();
    };
    return {
      ruleForm2: {
        phone: "",
        code: "",
        name: "",
        text: "发送验证码"
      },
      // disabled: false,
      loading: false,
      rules: {
        // phone: [
        //   { validator: validatePhone, trigger: 'blur'}
        // ],
        phone: [
          {
            required: true,
            message: "不可为空",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "不可为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "请输入6位验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("login", ["toLogin", "getCode"]),
    async submitForm(formName) {
      let self = this;
      self.loading = true;
      self.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await self.toLogin({
            phone: self.ruleForm2.phone,
            code: self.ruleForm2.code,
            udid: "",
            protocol: "GW"
          });
          if (res) {
            self.ruleForm2.code = "";
            if (self.authUser.type === 1) {
              self.$router.push({
                path: "/permission"
              });
            } else {
              if (JSON.stringify(self.authUser.permissions) != "{}") {
                // 去权限设置页面
                // 去城市管理页面
                // 去栏目管理 审核页面
                // 去栏目管理 工作量查看页面
                // 去操作日志页面
                // 去财务管理页面
                let permissions = self.authUser.permissions;
                if (permissions.permission) {
                  self.$router.push({
                    path: "/permission"
                  });
                } else if (permissions.city) {
                  self.$router.push({
                    path: "/city"
                  });
                } else if (permissions.content) {
                  self.$router.push({
                    path: "/content"
                  });
                } else if (
                  self.authUser.columnCity &&
                  JSON.parse(self.authUser.columnCity).length > 0
                ) {
                  self.$router.push({
                    path: "/column"
                  });
                } else if (permissions.finance) {
                  self.$router.push({
                    path: "/finance/records/column"
                  });
                } else if (permissions.log) {
                  self.$router.push({
                    path: "/log"
                  });
                } else if (permissions.config) {
                  self.$router.push({
                    path: "/config"
                  });
                } else if (permissions.closer) {
                  self.$router.push({
                    path: "/closer"
                  });
                } else if (permissions.notice) {
                  self.$router.push({
                    path: "/notice"
                  });
                } else if (permissions.acitivity) {
                  self.$router.push({
                    path: "/acitivity/management"
                  });
                } else if (permissions.acitivity_data) {
                  self.$router.push({
                    path: "/acitivity/data"
                  });
                } else if (permissions.product) {
                  self.$router.push({
                    path: "/product"
                  });
                }
              } else if (
                self.authUser.columnCity &&
                JSON.parse(self.authUser.columnCity).length > 0
              ) {
                self.$router.push({
                  path: "/column"
                });
              } else {
                self.$router.push({
                  path: "/general"
                });
              }
            }
          }
          self.loading = false;
        } else {
          self.$message.error("手机号或验证码错误");
          self.loading = false;
          return false;
        }
      });
    }
  },
  beforeMount() {
    timeUserFun(
      0.1,
      () => {
        return "clearIt";
      },
      "clearIt"
    );
  },
  mounted() {
    let self = this;
    document.addEventListener("keyup", function(event) {
      switch (event.keyCode) {
        case 13:
          self.submitForm("ruleForm2");
          return;
        default:
          return false;
      }
    });
  }
};
</script>
<style>
.page_container .el-scrollbar__wrap {
  overflow-x: auto;
}
</style>
<style scoped>
.container {
  overflow-x: auto;
  height: 100vh;
}

.page_container {
  height: 100%;
}

.form {
  margin: 15vh auto 0;
  height: 75vh;
}

.logo {
  font-size: 36px;
  color: #2c2c2c;
}

.logo {
  padding-top: 20vh;
  box-sizing: border-box;
}

.login-ruleForm {
  box-sizing: border-box;
  padding-top: 15vh;
}

.logo img {
  height: 116px;
  margin-bottom: 14px;
}

.sendcode {
  margin-left: 10px;
}

.line-split {
  height: 75vh;
  width: 1px;
  background-color: #979797;
  margin-left: 60px;
  margin-right: 200px;
}

.login-title-item {
  border-bottom: 1px solid #f4f4f4;
  margin-bottom: 5vh;
}

.login-title {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #fddb00;
  color: #666666;
  border-radius: 4px 4px 0 0;
}

.register-title a {
  color: #999;
}
</style>
