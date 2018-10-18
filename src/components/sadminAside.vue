<template>
  <aside class="aside-nav container">
      <section class="logo">
        <router-link to="/" class='flex flex-align-center'>
          <img src="@/assets/images/logo-super.png">
          <transition name="fade">
            <span class="logo-title" v-if="!isCollapse">
              贴近超管后台
            </span>
          </transition>
        </router-link>
      </section>
      <el-scrollbar class='page_container'>
        <el-menu v-if="authUser && authUser.type === 1" :default-active="activeIndex" class="el-menu-vertical" background-color="#464646"
          text-color="#fff" active-text-color="#FDDB00" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
          <el-menu-item index="权限设置">
            <i class="el-icon-setting"></i>
            <span slot="title">权限设置</span>
          </el-menu-item>
          <el-menu-item index="城市管理">
            <i class="icon iconfont icon-computer"></i>
            <span slot="title">城市管理</span>
          </el-menu-item>
          <el-submenu index="content">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">内容管理</span>
            </template>
            <el-menu-item index="审核">审核</el-menu-item>
            <el-menu-item index="封面文章">封面文章</el-menu-item>
            <el-menu-item index="工作量查看">工作量查看</el-menu-item>
          </el-submenu>
          <el-menu-item index="栏目管理">
            <i class="el-icon-menu"></i>
            <span slot="title">城市栏目管理</span>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              <i class="icon iconfont icon-computer"></i>
              <span slot="title">财务管理</span>
            </template>
            <el-menu-item index="财务申请">财务申请</el-menu-item>
            <el-menu-item index="财务审核">财务审核</el-menu-item>
            <el-menu-item index="提现审核">提现审核</el-menu-item>
          </el-submenu>
          <el-menu-item index="活动管理">
            <i class="el-icon-setting"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
          <el-menu-item index="活动数据">
            <i class="el-icon-setting"></i>
            <span slot="title">活动数据</span>
          </el-menu-item>
          <!-- <el-menu-item index="通知管理">
            <i class="icon iconfont icon-computer"></i>
            <span slot="title">通知管理</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="数据统计">
            <i class="el-icon-setting"></i>
            <span slot="title">数据统计</span>
          </el-menu-item> -->
          <el-submenu index="7">
            <template slot="title">
              <i class="icon iconfont icon-computer"></i>
              <span slot="title">贴近号管理</span>
            </template>
            <el-menu-item index="贴近号分类">贴近号分类</el-menu-item>
            <el-menu-item index="菜单管理">菜单管理</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="6">
            <template slot="title">
              <i class="icon iconfont icon-computer"></i>
              <span slot="title">产品管理</span>
            </template>
            <el-menu-item index="群消息智能提示设置">群消息智能提示设置</el-menu-item>
          </el-submenu> -->
          <el-menu-item index="配置管理">
            <i class="el-icon-setting"></i>
            <span slot="title">配置管理</span>
          </el-menu-item>
          <el-menu-item index="推送管理">
            <i class="el-icon-setting"></i>
            <span slot="title">推送管理</span>
          </el-menu-item>
          <el-menu-item index="操作日志">
            <i class="el-icon-setting"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
        </el-menu>
        <el-menu v-else-if="authUser" :default-active="activeIndex" class="el-menu-vertical" background-color="#464646" text-color="#fff"
          active-text-color="#FDDB00" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
          <el-menu-item index="权限设置" v-if="authUser.permissions && authUser.permissions.permission">
            <i class="el-icon-setting"></i>
            <span slot="title">权限设置</span>
          </el-menu-item>
          <el-menu-item index="城市管理" v-if="authUser.permissions && authUser.permissions.city">
            <i class="icon iconfont icon-computer"></i>
            <span slot="title">城市管理</span>
          </el-menu-item>
          <el-submenu index="content" v-if="authUser.permissions && authUser.permissions.content">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">内容管理</span>
            </template>
            <el-menu-item :index="item.name" v-for="(item, index) in authUser.permissions.content"
                :key="index">{{ item.name }}</el-menu-item>
          </el-submenu>
          <el-menu-item index="栏目管理" v-if="authUser.columnCity && JSON.parse(authUser.columnCity).length > 0">
            <i class="el-icon-menu"></i>
            <span slot="title">城市栏目管理</span>
          </el-menu-item>
          <el-submenu index="5" v-if="authUser.permissions && authUser.permissions.finance">
            <template slot="title">
              <i class="icon iconfont icon-computer"></i>
              <span slot="title">财务管理</span>
            </template>
            <el-menu-item :index="item.name" v-for="(item, index) in authUser.permissions.finance"
                :key="index">{{ item.name }}</el-menu-item>
          </el-submenu>
          <el-menu-item index="活动管理" v-if="authUser.permissions && authUser.permissions.activity">
            <i class="el-icon-setting"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
          <el-menu-item index="活动数据" v-if="authUser.permissions && authUser.permissions.activity_data">
            <i class="el-icon-setting"></i>
            <span slot="title">活动数据</span>
          </el-menu-item>
          <!-- <el-menu-item index="通知管理" v-if="authUser.permissions && authUser.permissions.notice">
            <i class="icon iconfont icon-computer"></i>
            <span slot="title">通知管理</span>
          </el-menu-item> -->
          <!-- <el-submenu index="6" v-if="authUser.permissions && authUser.permissions.product">
            <template slot="title">
              <i class="icon iconfont icon-computer"></i>
              <span slot="title">产品管理</span>
            </template>
            <el-menu-item index="群消息智能提示设置">群消息智能提示设置</el-menu-item>
          </el-submenu> -->
          <el-submenu index="7" v-if="authUser.permissions && authUser.permissions.community">
            <template slot="title">
              <i class="icon iconfont icon-computer"></i>
              <span slot="title">贴近号管理</span>
            </template>
            <el-menu-item :index="item.name" v-for="(item, index) in authUser.permissions.community" :key="index">{{ item.name }}</el-menu-item>
          </el-submenu>
          <el-menu-item index="配置管理" v-if="authUser.permissions && authUser.permissions.config">
            <i class="el-icon-setting"></i>
            <span slot="title">配置管理</span>
          </el-menu-item>
          <el-menu-item index="推送管理"  v-if="authUser.permissions && authUser.permissions.subject">
            <i class="el-icon-setting"></i>
            <span slot="title">推送管理</span>
          </el-menu-item>
          <el-menu-item index="操作日志" v-if="authUser.permissions && authUser.permissions.log">
            <i class="el-icon-setting"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
          <!-- <el-menu-item index="活动落地页" v-if="authUser.permissions && authUser.permissions.setting">
            <i class="el-icon-setting"></i>
            <span slot="title">线上活动落地页</span>
          </el-menu-item>
          <el-menu-item index="数据统计" v-if="authUser.permissions && authUser.permissions.data">
            <i class="el-icon-setting"></i>
            <span slot="title">数据统计</span>
          </el-menu-item> -->
        </el-menu>
      </el-scrollbar>
    </aside>
</template>
<script>
export default {
  name: "aside-nav",
  computed: {
    authUser() {
      return this.$store.state.authUser;
    },
    activeIndex() {
      return this.$store.state.activeIndex;
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {
      switch (key) {
        case "权限设置":
          this.$router.push({
            path: "/permission"
          });
          break;
        case "城市管理":
          this.$router.push({
            path: "/city"
          });
          break;
        case "审核":
          this.$router.push({
            path: "/content"
          });
          break;
        case "封面文章":
          this.$router.push({
            path: "/content/cover"
          });
          break;
        case "工作量查看":
          this.$router.push({
            path: "/content/workload"
          });
          break;
        case "栏目管理":
          this.$router.push({
            path: "/column"
          });
          break;
        // case "/finance":
        //   this.$router.push({
        //     path: "/finance"
        //   });
        //   break;
        case "财务申请":
          this.$router.push({
            path: "/finance/manage/update"
          });
          break;
        case "财务审核":
          this.$router.push({
            path: "/finance/manage/review"
          });
          break;
        case "提现审核":
          this.$router.push({
            path: "/finance/withdraw"
          });
          break;
        case "贴近号分类":
          this.$router.push({
            path: "/closer/classify"
          });
          break;
        case "菜单管理":
          this.$router.push({
            path: "/closer/menu"
          });
          break;
        case "操作日志":
          this.$router.push({
            path: "/log"
          });
          break;
        case "活动数据":
          this.$router.push({
            path: "/activity/data"
          });
          break;
        case "活动管理":
          this.$router.push({
            path: "/activity/management"
          });
          break;
        case "活动落地页":
          this.$router.push({
            path: "/setting"
          });
          break;
        case "数据统计":
          this.$router.push({
            path: "/statistic"
          });
          break;
        case "通知管理":
          this.$router.push({
            path: "/notice"
          });
          break;
        case "群消息智能提示设置":
          this.$router.push({
            path: "/product/group_message_remind"
          });
          break;
        case "配置管理":
          this.$router.push({
            path: "/config"
          });
          break;
        case "推送管理":
          this.$router.push({
            path: "/push"
          });
          break;
        default:
          this.$router.push({
            path: "/"
          });
      }
    }
  }
};
</script>
<style>
</style>

