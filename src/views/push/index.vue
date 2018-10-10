<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">操作日志</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <el-select class='list-filter-select' @change="handleSelectRegion" v-model="fliterregion" placeholder="所属区域">
            <el-option v-for="item in searchregion" :key="item.region_name" :label="item.region_name" :value="item.region_id">
            </el-option>
          </el-select>
        </section>
        <section class="flex flex-align-center">
          <section>
            <span>今日剩余推送次数：<span style="color: red; font-size: 18px;">5</span></span>
          </section>
          <section class="flex flex-align-center" style="margin-left: 30px;" >
            <el-button type="primary" @click="dialogFormVisible = true">建立推送</el-button>
          </section>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="logList.data" style="width: 100%">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="phone" label="推送帖子链接">
          </el-table-column>
          <el-table-column prop="phone" label="推送贴子名称">
          </el-table-column>
          <el-table-column prop="phone" label="推送时间">
          </el-table-column>
          <el-table-column prop="phone" label="推送状态">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="medium">查看贴子</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <el-dialog title="建立推送" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="贴子链接" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推送方式" :label-width="formLabelWidth">
          <el-radio v-model="pushWay" label="立即推送">立即推送</el-radio>
          <!-- <el-radio v-model="pushWay" label="立即推送">立即推送</el-radio> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">查看贴子</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <section class="block cloumn-block" v-if="logList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="logList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("push", ["logList"])
  },
  data() {
    return {
      logpara: {
        page: 1,
        count: 10,
        phone: "",
        startTime: null,
        endTime: null
      },
      pushpara: {
        pagenum: 1,
        pagesize: 10,
        regionid: ""
      },
      user_phone: "",
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        name: "",
        region: ""
      },
      pushWay: "立即推送",
      // 分页
      pagenum: 1,
      pagesize: 10,
      fliterregion: "",
      searchregion: []
    };
  },
  created() {
    this.getLog(this.logpara);
    this.subjectPushList(this.pushpara);
  },
  methods: {
    ...mapActions("push", ["getLog", "subjectPushList"]),
    handleSelectRegion() {},
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getLogList();
    },
    handleSelect() {
      this.getLogList();
    },
    searchLog() {
      this.pagenum = 1;
      this.getLogList();
    },
    async getLogList() {
      let self = this;
      self.logpara["page"] = self.pagenum;
      self.logpara["phone"] = self.user_phone || "";
      self.logpara["startTime"] = self.dataValue[0] || null;
      self.logpara["endTime"] = self.dataValue[1] || null;
      await self.getLog(self.logpara);
    }
  },
  mounted() {}
};
</script>
<style scoped="scoped">
.labelname {
  margin-right: 10px;
  min-width: 130px;
}

.dialog-label {
  width: 120px;
}

.dialog-sure {
  margin-left: 20px;
}

.searchtrue {
  height: 40px;
  border-bottom: 1px solid #f4f4f4;
}

.searchname {
  margin: 0 40px;
}

.searcherror {
  color: red;
}
</style>
