<template>
  <nav v-if="authUser" class="top-nav flex flex-align-center">
        <!-- <i v-if="!isCollapse" class="el-icon-d-arrow-left" @click="isCollapse=!isCollapse"></i> -->
        <!-- <i v-else class="el-icon-d-arrow-right" @click="isCollapse=!isCollapse"></i> -->
        <ul class="flex flex-1 flex-align-center flex-pack-end top-nav-list">
          <li class="top-nav-list-cell">
            <router-link to="/" class="help flex flex-align-center">
              <i class="icon iconfont icon-tip-"></i>
              帮助
            </router-link>
          </li>
          <li class="top-nav-list-cell">
            <el-dropdown class="drop-operation" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link flex flex-align-center">
                <img v-if="authUser.avatar" class="avatar" :src="$com.makeFileUrl(authUser.avatar, 'src', 36)"> {{ authUser.username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="fnlogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dialog title="个人信息" :visible.sync="outerVisible">
              <div class="dialog-content">
                <el-form label-width="100px" class="info-ruleForm">
                  <el-form-item label="用户名：" prop="name">
                    <el-input :value="authUser.username" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="手机号：" prop="phone">
                    <el-input :value="authUser.phone" disabled></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="角色名：" prop="role">
                    <el-input value="renshi" disabled></el-input>
                  </el-form-item> -->
                </el-form>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </li>
        </ul>
      </nav>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      isCollapse: false,
      outerVisible: false,
      timer: {}
    };
  },
  methods: {
    ...mapActions("login", ["logout"]),
    handleCommand(command) {
      if (command === "info") {
        this.outerVisible = true;
      } else {
        this.fnlogout();
      }
    },
    async fnlogout(type) {
      let self = this;
      try {
        await self.logout();
        if (type === "timeout") {
          clearInterval(this.timer);
          $alert("登录已超时，请重新登录！", "提示", {
            confirmButtonText: "确定",
            center: true,
            showClose: false,
            lockScroll: true,
            closeOnClickModal: false,
            type: "warning",
            callback: action => {
              self.$router.push({
                path: "/login"
              });
            }
          });
        } else {
          // 登录后操作
          this.$router.push({
            path: "/login"
          });
        }
      } catch (e) {
        $message.error(e.message);
      }
    },
    getDuration() {
      return Math.ceil(new Date().getTime() / 1000);
    }
  },
  mounted() {
    let self = this;
    // 监听器 30分钟无响应 则退出登录
    timeUserFun(30, async () => {
      await self.fnlogout("timeout");
    });
    self.timer = setInterval(async () => {
      // 设定时间段区间 一分钟检测一次
      let t = st();
      if (t[1] >= 1740) {
        console.log("30分钟时间到了，用户没有操作");
        clearInterval(self.timer);
      } else if (t[1] < 1740 && t[0] >= 1740 && t[0] - t[1] > 10) {
        console.log("30分钟时间到了用户还在操作，需要更新token");
        clearInterval(self.timer);
        // 更新token
      } else {
        console.log("正在等待。。。。");
      }
    }, 60000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style>
</style>
