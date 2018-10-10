<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">操作日志</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <el-select class='list-filter-select' @change="handleSelectRegion" v-model="fliterregion" placeholder="所属区域">
            <el-option v-for="item in regionList" :key="item.region_name" :label="item.region_name" :value="item.region_id">
            </el-option>
          </el-select>
        </section>
        <section class="flex flex-align-center">
          <section>
            <span>今日剩余推送次数：<span style="color: red; font-size: 18px;">{{ pushList.remainingCount || 5 }}</span></span>
          </section>
          <section class="flex flex-align-center" style="margin-left: 30px;" >
            <el-button type="primary" @click="dialogFormVisible = true">建立推送</el-button>
          </section>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="pushList.data" style="width: 100%">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="phone" label="推送帖子链接">
            <template slot-scope="scope">
              <span>closer://feed/{{ scope.row.subjectId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="推送贴子名称">
          </el-table-column>
          <el-table-column prop="createTime" label="推送时间">
          </el-table-column>
          <el-table-column prop="status" label="推送状态">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="preview(scope.row.subjectId)">查看贴子</el-button>
              <el-button type="text" size="medium" v-if="scope.row.status ==='已推送'" @click="preview(scope.row.subjectId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <el-dialog title="建立推送" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="推送城市" :label-width="formLabelWidth">
          <section class="flex flex-align-center">
            <el-select class='list-filter-select' @change="handleSelectRegion" v-model="fliterregion" placeholder="所属区域">
              <el-option v-for="item in regionList" :key="item.region_name" :label="item.region_name" :value="item.region_id">
              </el-option>
            </el-select>
          </section>
        </el-form-item>
        <el-form-item label="贴子链接" :label-width="formLabelWidth">
          <el-input v-model="form.url" type="url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推送方式" :label-width="formLabelWidth">
          <el-radio v-model="pushWay" :label="1">立即推送</el-radio>
          <!-- <el-radio v-model="pushWay" label="立即推送">立即推送</el-radio> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="preview(subjectid)">查看贴子</el-button>
        <el-button type="primary" @click="sureCreatePush">确 定</el-button>
      </div>
    </el-dialog>
    <section class="block cloumn-block" v-if="pushList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="pushList.count">
      </el-pagination>
    </section>
    <el-dialog title="手机预览" class="preview" :visible.sync="dialogVisible" width="375px">
       <iframe :src="pre_src" frameborder="0" width="375px" height="667px"></iframe>
    </el-dialog>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("push", ["regionList", "pushList"])
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
      dialogVisible: false,
      formLabelWidth: "80px",
      form: {
        url: ""
      },
      pushWay: 1,
      // 分页
      pagenum: 1,
      pagesize: 10,
      fliterregion: "",
      flitername: "",
      searchregion: [],
      subjectid: "",
      pre_src: ""
    };
  },
  created() {
    this.subjectPushList(this.pushpara);
    this.allRegions();
  },
  methods: {
    ...mapActions("push", ["subjectPushList", "subjectPushAdd", "allRegions"]),
    async sureCreatePush() {
      let self = this;
      if (!self.fliterregion) {
        self.$message.warning("城市必选");
        return;
      }
      if (!self.pushWay) {
        self.$message.warning("推送方式必选");
        return;
      }
      if (!self.form["url"]) {
        self.$message.warning("推送链接必填");
        return;
      }
      await self.subjectPushAdd({
        pushtype: self.pushWay,
        subjecturl: self.form["url"],
        regionname: self.flitername || "",
        regionid: self.fliterregion || ""
      });
      // 字符串分割取id
      self.subjectid = self.form["url"].split("feed/")[1];
    },
    async handleSelectRegion(item) {
      let self = this;
      self.fliterregion = item;
      await self.regionList.map(x => {
        if (x.region_id === item) {
          self.flitername = x.region_name;
        }
      });
      await self.handleSelect();
    },
    preview(id) {
      let host = window.location.host,
        url;
      if (/sandbox.tiejin/.test(host)) {
        url = "https://h5-sandbox.tiejin.cn";
      } else if (/tiejin/.test(host)) {
        url = "https://h5.tiejin.cn";
      }
      this.pre_src = `${url}/feed/${id}?view=pre`;
      this.dialogVisible = true;
    },
    // 分页
    async handleCurrentChange(val) {
      this.pagenum = val;
      await this.handleSelect();
    },
    async handleSelect() {
      let self = this;
      self.pushpara["regionid"] = self.fliterregion || "";
      self.pushpara["pagenum"] = self.pagenum || 1;
      await self.subjectPushList(self.pushpara);
    }
  },
  mounted() {}
};
</script>
<style>
.preview .el-dialog {
  min-width: 375px !important;
  border-radius: 10px;
  box-shadow: 0px 0px 25px #333;
}
.preview .el-dialog__body {
  padding: 10px 0;
}
</style>

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
