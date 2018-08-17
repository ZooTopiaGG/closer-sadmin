<template>
  <div id="app">
    <div class="flex">
    <sadmin-aside v-if="!isLoginPage"></sadmin-aside>
    <div :class="{
      main:true, 'flex-1': true, container: true, loginpage: isLoginPage
    }">
      <sadmin-nav v-if="!isLoginPage"></sadmin-nav>
      <el-scrollbar class="page_container">
        <router-view/>
      </el-scrollbar>
    </div>
  </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import sadminAside from "@/components/sadminAside.vue";
import sadminNav from "@/components/sadminNav.vue";
export default {
  data() {
    return {};
  },
  computed: {
    authUser() {
      return this.$store.state.authUser;
    },
    ...mapState(["isLoginPage"])
  },
  components: {
    sadminNav,
    sadminAside
  },
  methods: {},
  mounted() {
    console.log("this.authUser===", this.authUser);
    console.log("this.state===", this.$store.state);
  }
};
</script>
<style>
.info-ruleForm .el-input {
  width: 200px;
}

.el-menu {
  border-right: 0;
}

/*必须*/

.container {
  height: 100vh;
  overflow-x: auto;
}

.main {
  background-color: #f4f4f4;
}
.loginpage {
  background: #fff;
}
.top-nav {
  height: 61px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
}

.page_container {
  height: calc(100% - 61px);
}

/*必须*/

.page_container .el-scrollbar__wrap {
  overflow-x: auto;
}

.aside-nav {
  background-color: #464646;
}

.aside-nav .logo {
  height: 61px;
  line-height: 61px;
}

.aside-nav .logo img {
  height: 38px;
  display: block;
  margin-right: 10px;
}

.aside-nav .logo a {
  color: #fff;
  font-size: 14px;
  margin-left: 13px;
  height: 61px;
}

.aside-nav .el-menu-vertical:not(.el-menu--collapse) {
  width: 224px;
  /*min-height: 400px;*/
  height: 100%;
  border-right: 0;
}

.top-nav-list {
  height: 61px;
}

.top-nav-list li {
  padding-left: 50px;
  font-size: 14px;
}

.drop-operation img.avatar {
  width: 28px;
  height: 28px;
  border-radius: 100%;
  margin-right: 5px;
}

.drop-operation .el-dropdown-link {
  outline: none;
}

.logo-title {
  width: 100px;
  height: 61px;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: width 0.5s;
}

.fade-enter,
.fade-leave-to {
  width: 0;
  height: 0;
}

.icon-computer {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
}

.help {
  color: #495060;
}

.help i {
  font-size: 18px;
  width: 20px;
  text-align: center;
  margin-right: 5px;
}
</style>
