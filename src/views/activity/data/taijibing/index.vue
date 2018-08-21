<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">活动数据</section>
    <section class="permission_table">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex">
          <section class="flex flex-align-center" style="margin-right: 35px;">
            <span class="labelname">
              姓名
            </span>
            <el-input v-model="inputName" class="input-search" placeholder="请输入姓名" @keyup.enter.native="searchCityByName">
              <el-button slot="append" icon="el-icon-search" @click="searchCityByName"></el-button>
            </el-input>
          </section>
          <section class="flex flex-align-center">
            <span class="labelname">
              手机号
            </span>
            <el-input v-model="inputPhone" class="input-search" placeholder="请输入手机号" @keyup.enter.native="searchCityByPhone">
              <el-button slot="append" icon="el-icon-search" @click="searchCityByPhone"></el-button>
            </el-input>
          </section>
        </section>
        <!-- <section class="flex flex-align-center">
          <el-button type="primary" class="text-button">导出数据</el-button>
        </section> -->
      </section>
      <section class="permission_table_content">
        <el-table :data="waterList.data" style="width: 100%">
          <el-table-column prop="nickname" label="用户名">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="address" label="住址">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="waterList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="waterList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("activity", ["waterList"]),
    headers() {
      return {
        Authorization: `CloserSysAuth ${this.$store.state.token}`
      };
    },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      tjbpara: {
        name: "",
        phone: "",
        status: "",
        page: 1,
        count: 10
      },
      row: {},
      pagenum: 1,
      pagesize: 10,
      // 日期选择
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 绑定选择到的日期 数组
      dataValue: "",
      inputPhone: "",
      inputName: ""
    };
  },
  created() {
    this.activityWaterList(this.tjbpara);
  },
  methods: {
    ...mapActions("activity", ["activityWaterList"]),
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getList();
    },
    async getList() {
      let self = this;
      self.tjbpara["name"] = self.inputName;
      self.tjbpara["phone"] = self.inputPhone;
      self.tjbpara["page"] = self.pagenum;
      await self.activityWaterList(self.tjbpara);
    },
    searchCityByPhone() {
      this.pagenum = 1;
      this.getList();
    },
    searchCityByName() {
      this.pagenum = 1;
      this.getList();
    }
  }
};
</script>
<style scoped>
.input-search {
  width: 250px;
}
.activity-cell .avatar-uploader .avatar-uploader-icon {
  width: 164px;
  height: 164px;
  line-height: 164px;
}

.activity-cell .avatar {
  width: 164px;
  height: 164px;
}

.permission_table .permission_table_content {
  margin-top: 20px;
}

.dialog-label {
  max-width: 300px;
}

.prompt {
  font-size: 12px;
  color: #999;
  padding-bottom: 10px;
  margin-left: 20px;
}

.table_logo {
  max-height: 60px;
}

.labelname {
  margin-right: 10px;
  min-width: 60px;
}
</style>
