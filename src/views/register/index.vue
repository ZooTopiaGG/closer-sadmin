<template>
  <div class="container">
    <el-scrollbar class="page_container">
      <div class="form flex flex-pack-center">
        <div class="logo flex flex-v flex-align-center">
          <img src="@/assets/images/logo-super.png">
          <span>贴近超管后台</span>
        </div>
        <div class="line-split"></div>
        <el-form :model="ruleForm2" :rules="rules" status-icon ref="ruleForm2" class="login-ruleForm">
          <el-form-item class="login-title-item">
            <div class=" flex flex-pack-justify">
              <div class="register-title">
                <router-link to="/login">去登录</router-link>
              </div>
              <div class="login-title">注 册</div>
            </div>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input type="tel" maxlength="11" placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="ruleForm2.phone">
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="flex flex-pack-justify">
              <el-input type="tel" placeholder="请输入验证码" maxlength="6" prefix-icon="el-icon-goods" v-model="ruleForm2.code">
              </el-input>
              <el-button class="sendcode" @click="getCode({ phone: ruleForm2.phone, type: '1' })" :disabled="disabled" type="primary">{{ ruleForm2.text }}</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="name">
            <el-input placeholder="请输入用户名" type="text" prefix-icon="el-icon-goods" v-model="ruleForm2.name">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;margin-top:22px;" @click="submitForm('ruleForm2')">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不可为空"));
      }
      if (!this.$com.isPhoneNum(value)) {
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
      disabled: false,
      rules: {
        phone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "不可为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "请输入2个到10个字符",
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
    ...mapActions("login", ["getCode", "toRegister"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          // this.$message.error('手机号或验证码错误')
          return false;
        }
      });
    },
    async register() {
      let self = this;
      let res = await self.toRegister({
        phone: self.ruleForm2.phone,
        code: self.ruleForm2.code,
        username: self.ruleForm2.name
      });
      if (res) {
        self.$router.push({
          path: "/login"
        });
      }
    }
  },
  mounted() {
    let self = this;
    $(document).keyup(function(event) {
      switch (event.keyCode) {
        case 13:
          self.submitForm("ruleForm2");
          return;
        default:
          return;
      }
    });
  }
};
</script>
<style>
/*必须*/

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
