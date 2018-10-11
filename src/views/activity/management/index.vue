<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">活动管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center flex-1">
          <span class="labelname">
            城市名称
          </span>
          <el-select class='list-filter-select' @change="handleSelectRegion" v-model="fliterregion" placeholder="请选择城市">
            <el-option v-for="item in searchregion" :key="item.region_id" :label="item.region_name" :value="item.region_id">
            </el-option>
          </el-select>
          <section class="flex flex-align-center" style="margin-left: 10px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section class="flex flex-align-center" v-if="authUser.permissions && authUser.permissions.activity && authUser.permissions.activity[0].permissions === 'activity_update'">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addActivity">添加活动</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="activityLists.data" style="width: 100%">
          <el-table-column prop="activityName" label="活动名称">
          </el-table-column>
          <el-table-column prop="regionName" label="活动城市">
          </el-table-column>
          <el-table-column prop="size" label="尺寸（px）">
          </el-table-column>
          <el-table-column prop="url" width="280" label="关联页面">
          </el-table-column>
          <el-table-column label="展示图">
            <template slot-scope="scope">
              <section>
                <img :src="scope.row.logo" alt="" class="table_logo">
              </section>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="展示状态">
          </el-table-column>
          <el-table-column prop="buildVer" label="版本号">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="280">
            <template slot-scope="scope">
             <section v-if="authUser.type === 1" >
                <el-button  type="text" size="medium" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="medium" @click="start(scope.row)">
                <span v-if="scope.row.status ==='已停用'">启用</span>
                <span v-else>停用</span>
              </el-button>
              <el-button type="text" size="medium" @click="look(scope.row)">查看</el-button>
             </section>
             <section v-else>
              <el-button v-if="authUser.permissions && authUser.permissions.activity && authUser.permissions.activity[0].permissions === 'activity_update'" type="text" size="medium" @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="authUser.permissions && authUser.permissions.activity && authUser.permissions.activity[0].permissions === 'activity_update'" type="text" size="medium" @click="start(scope.row)">
                <span v-if="scope.row.status ==='已停用'">启用</span>
                <span v-else>停用</span>
              </el-button>
              <el-button v-if="authUser.permissions && authUser.permissions.activity && authUser.permissions.activity[0].permissions === 'activity_view'" type="text" size="medium" @click="look(scope.row)">查看</el-button>
             </section>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <el-dialog title="查看位置" :visible.sync="outerVisible1" style="text-align: center">
        <img src="@/assets/images/displaylogo.png" alt="">
      </el-dialog>
      <el-dialog title="编辑活动" :visible.sync="outerVisible">
          <section class="dialog-content">
            <el-form class="city-ruleform" :rules="rules" label-width="140px" :disabled="isdisabled">
              <el-form-item label="活动名称：">
                <section class="flex flex-align-center dialog-label">
                  <el-input v-model="displayname" placeholder="输入活动名称"></el-input>
                </section>
              </el-form-item>
              <el-form-item label="建议尺寸（px）：">
                <section class="flex flex-align-center dialog-label">
                  <span>{{ displaysize }}</span>
                </section>
              </el-form-item>
              <el-form-item label="关联页面：">
                <section class="flex flex-align-center">
                  <el-input type="url" v-model="displaypage" placeholder="输入链接"></el-input>
                </section>
              </el-form-item>
              <el-form-item label="城市名称：">
                <section class="flex flex-align-center">
                  <el-select class='list-filter-select' @change="handleSelectRegion2" v-model="fliterregion2" placeholder="请选择城市">
                    <el-option v-for="item in searchregion" :key="item.region_id" :label="item.region_name" :value="item.region_id">
                    </el-option>
                  </el-select>
                </section>
              </el-form-item>
              <el-form-item v-loading.body="loadingAvatarUpload" label="展示图：">
                <section class="activity-cell flex flex-align-start">
                  <el-upload class="avatar-uploader" 
                  :action="uploadUrl" 
                  :show-file-list="false" 
                  :on-error="handleError" 
                  :headers="headers"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <!-- <section class="prompt flex flex-v">
                    <span class="flex-1"></span>
                    <span>尺寸：750*930像素</span>
                    <span>大小：不超过500kb</span>
                  </section> -->
                </section>
              </el-form-item>
              <el-form-item label="版本号：">
                <section class="flex flex-align-center dialog-label">
                  <el-input v-model="buildVer" :disabled="verDisabled" placeholder="待审版本号"></el-input>
                </section>
              </el-form-item>
              <el-form-item label="展示位状态：">
                <section class="flex flex-align-center dialog-label">
                  <el-input v-model="displaystatus" :disabled="true"></el-input>
                </section>
              </el-form-item>
            </el-form>
          </section>
          <section slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保 存</el-button>
          </section>
        </el-dialog>
    </section>
  </section>
</template>
<script>
import options2 from "@/utils/city";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("activity", ["activityLists", "searchregion"]),
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
      activitypara: {
        pagenum: 1,
        pagesize: 10
      },
      isdisabled: false,
      verDisabled: false,
      rules: {},
      loadingAvatarUpload: false,
      outerVisible: false,
      outerVisible1: false,
      uploadUrl: `${server.filePath}${server.file}`,
      imageUrl: "",
      imageOnlineUrl: "",
      operationtype: "",
      row: {},
      display: {
        options: [
          {
            value: "停用",
            label: "启用"
          }
        ]
      },
      displayname: "",
      buildVer: 0,
      displaystatus: "",
      displaypage: "",
      displaysize: "246 * 246",
      fliterregion: "",
      fliterregion2: "小宇宙",
      obj: {
        regionName: "小宇宙",
        regionId: "0"
      }
    };
  },
  created() {
    this.getAllActivity(this.activitypara);
    this.getCityList({
      pagesize: 100
    });
  },
  methods: {
    ...mapActions("activity", [
      "getAllActivity",
      "updateActivity",
      "newActivity",
      "updateActivityStatus",
      "getCityList"
    ]),
    handleError(err) {
      this.$message.error("Network Error!");
      this.loadingAvatarUpload = false;
    },
    // 区域查找
    handleSelectRegion(item) {
      this.pagenum = 1;
      let obj = {};
      this.searchregion.map(x => {
        if (x.region_id === item) {
          obj = {
            regionName: x.region_name,
            regionId: x.region_id
          };
          return obj;
        }
      });
      this.getAllActivity(Object.assign(this.activitypara, obj));
    },
    handleSelectRegion2(item) {
      this.searchregion.map(x => {
        if (x.region_id === item) {
          this.obj = {
            regionName: x.region_name,
            regionId: x.region_id
          };
          return this.obj;
        }
      });
    },
    // 上传 图片
    handleAvatarSuccess(res, file) {
      let self = this;
      try {
        if (res.code === 0) {
          self.$message.success("上传成功");
          self.imageUrl = URL.createObjectURL(file.raw);
          self.imageUrl = `${server.filePath}${res.result.url}`;
        } else {
          self.$message.error(res.result);
        }
      } catch (err) {
        self.$message.error(err);
      }
      self.loadingAvatarUpload = false;
    },
    beforeAvatarUpload(file) {
      let self = this;
      self.loadingAvatarUpload = true;
      const isImage = file.type.indexOf("image/") > -1;
      const isLt750KB = file.size / 1024 / 1024 < 0.75;
      if (!isImage) {
        self.$message.error("只能上传图片!");
        self.loadingAvatarUpload = false;
      }
      if (!isLt750KB) {
        self.loadingAvatarUpload = false;
        self.$message.error("上传图片大小不能超过 750kb!");
      }
      return isImage && isLt750KB;
    },
    // 保存修改
    async save() {
      let self = this,
        para,
        obj = {},
        res;
      if (!self.displayname) {
        self.$message.warning("活动名称不能为空！");
        return;
      }
      if (!self.displaypage) {
        self.$message.warning("活动页面不能为空！");
        return;
      }
      // if (!self.$com.isUrl(self.displaypage)) {
      //   self.$message.warning("活动页面地址错误！");
      //   return;
      // }
      if (!self.imageUrl) {
        self.$message.warning("活动logo不能为空！");
        return;
      }
      // if (!self.buildVer) {
      //   self.$message.warning("版本号不能为空！");
      //   return;
      // }
      if (!self.fliterregion2) {
        self.$message.warning("活动城市不能为空！");
        return;
      }
      await self.searchregion.map(x => {
        if (x.region_id === self.fliterregion2) {
          self.obj = {
            regionName: x.region_name,
            regionId: x.region_id
          };
          return self.obj;
        }
      });
      para = {
        activityId: self.row.activityId,
        name: self.displayname,
        buildVer: self.buildVer || 0,
        size: self.displaysize,
        logo: self.imageUrl,
        url: self.displaypage
      };
      if (self.operationtype === "add") {
        res = await self.newActivity(Object.assign(para, self.obj));
      } else {
        res = await self.updateActivity(Object.assign(para, self.obj));
      }
      if (res) {
        self.outerVisible = false;
        await self.activityList();
      }
    },
    look() {
      this.outerVisible1 = true;
    },
    addActivity() {
      // 上传活动列表
      let self = this;
      self.displayname = "";
      self.buildVer = "";
      self.displaystatus = "活动添加成功后，请在活动面板启用活动";
      self.displaypage = "";
      self.imageUrl = "";
      self.fliterregion2 = "china";
      self.operationtype = "add";
      self.outerVisible = true;
    },
    edit(row) {
      let self = this;
      self.row = row;
      self.outerVisible = true;
      self.displayname = row.activityName;
      self.buildVer = row.buildVer;
      self.displaystatus = row.status;
      self.displaypage = row.url;
      self.imageUrl = row.logo;
      self.fliterregion2 = row.regionId;
      self.operationtype = "update";
      self.verDisabled = row.status === "已停用" ? true : false;
    },
    // 活动列表
    async activityList() {
      let self = this;
      await self.getAllActivity({
        pagenum: 1,
        pagesize: 10
      });
    },
    async sureStart(row) {
      let self = this,
        enabled = row.status === "已停用" ? false : true;
      let res = await self.updateActivityStatus({
        activityId: row.activityId,
        enabled: enabled
      });
      if (res) {
        await self.activityList();
      }
    },
    async start(row) {
      let self = this;
      let confirm =
        row.status === "已启用"
          ? `此操作将关闭“${row.activityName}”, 是否继续?`
          : `此操作将开启“${row.activityName}”, 是否继续?`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.sureStart(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    clearSearch() {
      this.fliterregion = "";
      let obj = {
        regionName: "",
        regionId: ""
      };
      this.getAllActivity(Object.assign(this.activitypara, obj));
    }
  }
};
</script>
<style scoped>
.activity-cell .avatar-uploader .avatar-uploader-icon {
  width: 164px;
  height: 164px;
  line-height: 164px;
}
.activity-cell .avatar {
  width: 164px;
  height: 164px;
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
  width: 80px;
}
</style>
