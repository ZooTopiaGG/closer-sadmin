<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">城市管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            城市名称
          </span>
          <el-input v-model="inputCity" placeholder="请输入城市名称" @keyup.enter.native="searchCityByKeywords">
            <el-button slot="append" icon="el-icon-search" @click="searchCityByKeywords"></el-button>
          </el-input>
        </section>
        <section class="flex flex-align-center" v-if="authUser.type === 1">
          <el-button class="text-button" @click="bindColumn">绑定发布公告栏目</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="cityAdd">添加城市</el-button>
        </section>
        <!-- dialog信息 添加城市-->
        <el-dialog :title="title" :visible.sync="outerVisible">
          <el-dialog width="574px" class="preview" title="预 览" :visible.sync="innerVisible" append-to-body>
            <section class="preview-box" :style="{width: '534px', height: '852px', backgroundImage: 'url('+require('@/assets/images/preview-mobile.png')+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center -70px', position: 'relative', overflow: 'hidden'}">
              <section class="feed-box">
                <img v-if="imageOnlineUrl" :src="imageOnlineUrl" class="img-box" :onerror="defaultErrorImg">
                <img v-else class="img-box" src="@/assets/images/default.jpeg">
                <section class="feed-example-box">
                  <section class="feed-example-circle"></section>
                  <section class="feed-example flex flex-pack-justify">
                    <section class="feed-example-top flex flex-align-center">
                      <img src="@/assets/images/default.jpeg">
                      <span>深夜成都</span>
                    </section>
                    <span>3小时前</span>
                  </section>
                  <section class="cover">
                    <img src="@/assets/images/default.jpeg">
                  </section>
                </section>
              </section>
              <section id="lottie"></section>
            </section>
          </el-dialog>
          <section class="dialog-content">
            <el-form class="city-ruleform" :rules="rules" :disabled="isdisabled">
              <el-form-item>
                <section class="flex flex-align-center">
                  <span class="dialog-label">城市名称：</span>
                  <el-cascader
                    :disabled="authUser.type != 1"
                    :options="options2"
                    @change="handleItemChange"
                    :props="props"
                    v-model="cityvalue2"
                    :show-all-levels="false"
                  ></el-cascader>
                  <!-- <el-select v-model="cityvalue" placeholder="请选择" :disabled="authUser.type != 1">
                    <el-option v-for="item in citys.options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select> -->
                </section>
              </el-form-item>
              <el-form-item v-loading.body="loadingAvatarUpload">
                <section class="city-cell flex flex-align-start">
                  <span class="dialog-label">城市背景：</span>
                  <el-upload class="avatar-uploader" 
                  :action="uploadUrl" 
                  :show-file-list="false" 
                  :on-error="handleError" 
                  :headers="headers"
                  :on-change="handleAvatarChange"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <section v-if="operationtype != 2" class="prompt flex flex-v">
                    <span class="flex-1"></span>
                    <span>尺寸：750*930像素</span>
                    <span>大小：不超过750kb</span>
                  </section>
                </section>
              </el-form-item>
              <el-form-item>
                <section class="city-cell flex flex-align-start">
                  <span class="dialog-label">城市插画：</span>
                  <el-upload class="upload-demo" 
                  ref="upload" drag 
                  :headers="headers" 
                  :action="uploadUrl" 
                  :on-error="handleError" 
                  :on-success="handleFileSuccess"
                    :before-upload="beforeFileUpload" 
                    :file-list="fileList">
                    <!-- <el-button size="small" type="primary">选取文件</el-button> -->
                    <i class="el-icon-upload"></i>
                    <section class="el-upload__text">将文件拖到此处，或
                      <em>点击上传</em>
                    </section>
                    <section slot="tip" class="el-upload__tip">上传文件不超过500kb</section>
                  </el-upload>
                </section>
              </el-form-item>
            </el-form>
          </section>
          <section slot="footer" v-if="operationtype == 2" class="dialog-footer">
            <el-button type="primary" @click="outerVisible = false">确 认</el-button>
          </section>
          <section slot="footer" v-else class="dialog-footer">
            <el-button @click="preview">预 览</el-button>
            <el-button type="primary" @click="save" v-if="operationtype === 0">确 定</el-button>
            <el-button type="primary" @click="save" v-else>保 存</el-button>
          </section>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="outerVisible2">
          <section class="dialog-content">
            <section v-if="getBindColumn" class="desc">
              <span>目前绑定的发公告栏目：</span>
              <span class="bind_column">{{ getBindColumn.name }}</span>
            </section>
            <section class="search flex flex-align-center">
              <el-input v-model="state5" placeholder="请输入栏目ID" suffix-icon="el-icon-search" class="searchid"></el-input>
              <el-button @click="searchBindColumn">确 定</el-button>
            </section>
            <section v-if="getSearchColumn != null" class="result flex flex-align-center">
              <el-checkbox v-model="defaultchecked"></el-checkbox>
              <p>{{ getSearchColumn.name }}</p>
              <p>{{ getSearchColumn.objectID }}</p>
              <p>
                <img class="logo" :src="getSearchColumn.blogo" :onerror="defaultErrorImg">
              </p>
              <p v-if="getSearchColumn.tags && getSearchColumn.tags.indexOf('announce-cover') > -1 " style="color: #f00">已经是发公告栏目</p>
            </section>
          </section>
          <section slot="footer" class="dialog-footer">
            <el-button @click="outerVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="setBindColumn">确 定</el-button>
          </section>
        </el-dialog>
      </section>
      <section class="permission_table_content">
        <el-table :data="regionsList.data" style="width: 100%">

          <el-table-column prop="region_id" label="城市id">
          </el-table-column>

          <el-table-column prop="region_name" label="城市名称">
          </el-table-column>

          <el-table-column prop="long_update_time" label="更新时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="cityModify(scope.row)">修改</el-button>
              <!-- <el-button @click="cityLook(scope.row)" type="text" size="medium">查看</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="regionsList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="regionsList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import options2 from "@/utils/city";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      regionslist: {
        keywords: "",
        pagenum: 1,
        pagesize: 10
      },
      defaultErrorImg:
        'this.src="' + require("@/assets/images/default.jpeg") + '"',
      res: {},
      inputCity: "",
      addormodifyorinputcity: "",
      state5: "",
      // dialog 显示/隐藏
      outerVisible: false,
      outerVisible2: false,
      innerVisible: false,
      // 城市title
      title: "添加城市",
      // 分页
      pagenum: 1,
      pagesize: 10,
      defaultchecked: true,
      // 操作类型 0 添加 1 修改 2查看
      operationtype: 0,
      // 选择城市
      cityvalue: "小宇宙",
      cityvalue2: [],
      rowData: {},
      // 修改城市时 使用
      update_region_id: "",
      //上传图片
      // 加载
      uploadUrl: `${server.filePath}${server.file}`,
      loadingAvatarUpload: false,
      // 图片地址
      imageUrl: "",
      imageOnlineUrl: "",
      fileOnlineUrl: "",
      fileList: [],
      isdisabled: false,
      rules: {},
      imageSize: true,
      options2: options2,
      props: {
        value: "label",
        children: "cities"
      }
    };
  },
  computed: {
    ...mapState("city", {
      regionsList: state => state.regionsList,
      getBindColumn: state => state.getBindColumn,
      getSearchColumn: state => state.getSearchColumn
    }),
    headers() {
      return {
        Authorization: `CloserSysAuth ${this.$store.state.token}`
      };
    },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  methods: {
    ...mapActions("city", [
      "getRegionsList",
      "setBindAnnounceCommunity",
      "getBindAnnounceCommunity",
      "addRegion",
      "showCommunity",
      "updateRegion",
      "showRegion"
    ]),
    // 城市级联选择
    handleItemChange(val) {
      if (val[1]) {
        this.cityvalue = val[1];
      } else {
        this.cityvalue = "小宇宙";
      }
    },
    // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.regionslist["pagenum"] = val;
      this.getRegionsList(this.regionslist);
    },
    // 上传异常
    handleError(err) {
      this.$message.error("Network Error!");
      this.loadingAvatarUpload = false;
    },
    // 上传 图片
    handleAvatarSuccess(res, file) {
      let self = this;
      self.loadingAvatarUpload = false;
      try {
        if (res.code === 0) {
          self.$message.success("上传成功");
          self.imageUrl = URL.createObjectURL(file.raw);
          self.imageOnlineUrl = `${server.filePath}${res.result.url}`;
          self.imageSize =
            res.result.attributes.dimensions.width === 750 &&
            res.result.attributes.dimensions.height === 930;
          if (!self.imageSize) {
            self.$message.error("请根据提示上传符合标准尺寸的图片！");
          }
        } else {
          self.$message.error(res.result);
        }
      } catch (err) {
        self.$message.error(err);
      }
    },
    handleAvatarChange(file, fileList) {
      // console.log("file===", file);
      // let image = new Image();
      // image.src = file.url;
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
    // 上传 文件 变化
    handleFileSuccess(res, file, fileList) {
      let self = this;
      try {
        if (res.code === 0) {
          self.fileList = fileList.slice(-1);
          self.fileOnlineUrl = `${server.filePath}${res.result.url}`;
        } else {
          self.$message.error(res.result);
        }
      } catch (err) {
        self.$message.error(err);
      }
    },
    beforeFileUpload(file) {
      let self = this;
      const isJSON = file.type === "application/json";
      const isLt500KB = file.size / 1024 / 1024 < 0.49;
      if (!isJSON) {
        self.$message.error("上传文件只能是 JSON 文件!");
        self.loadingAvatarUpload = false;
      }
      if (!isLt500KB) {
        self.loadingAvatarUpload = false;
        self.$message.error("上传文件大小不能超过 500kb!");
      }
      return isJSON && isLt500KB;
    },
    // 按城市关键字搜索
    searchCityByKeywords() {
      // console.log("1111");
      this.pagenum = 1;
      this.addormodifyorinputcity = this.inputCity;
      this.getCitylist();
    },
    // 获取城市列表
    async getCitylist() {
      let self = this;
      self.regionslist["keywords"] = self.addormodifyorinputcity || "";
      self.regionslist["pagenum"] = self.pagenum;
      await self.getRegionsList(self.regionslist);
    },
    // 保存操作
    async save() {
      let self = this;
      if (!self.cityvalue) {
        self.$message.warning("请选择城市!");
        return;
      }
      if (!self.imageOnlineUrl) {
        self.$message.warning("请上传城市封面图片!");
        return;
      }
      if (!self.imageSize) {
        self.$message.error("请根据提示上传符合标准尺寸的图片！");
        return;
      }
      if (!self.fileOnlineUrl) {
        self.$message.warning("请根据提示上传符合规则的城市插画!");
        return;
      }
      if (self.operationtype === 0) {
        // 添加城市
        let res = await self.addRegion({
          name: self.cityvalue,
          cover: self.imageOnlineUrl,
          gif: self.fileOnlineUrl
        });
        if (res) {
          // 刷新城市列表
          self.addormodifyorinputcity = "";
          self.pagesize = 10;
          self.pagenum = 1;
          await self.getCitylist();
          self.outerVisible = false;
        }
      } else {
        // 修改城市
        let para;
        if (self.rowData.region_name === self.cityvalue) {
          // 城市被修改过
          para = {
            regionid: self.update_region_id,
            cover: self.imageOnlineUrl,
            gif: self.fileOnlineUrl
          };
        } else {
          para = {
            regionid: self.update_region_id,
            name: self.cityvalue,
            cover: self.imageOnlineUrl,
            gif: self.fileOnlineUrl
          };
        }
        let res = await self.updateRegion(para);
        if (res) {
          // 刷新城市列表
          self.addormodifyorinputcity = "";
          self.pagesize = 10;
          self.pagenum = 1;
          await self.getCitylist();
          self.outerVisible = false;
        }
      }
    },
    // 城市详情
    async cityDetails(row, callback) {
      let self = this;
      let data = await self.showRegion({
        regionid: row.region_id
      });
      if (data) {
        self.rowData = data.result;
        self.cityvalue = data.result.region_name;
        self.cityvalue2 = [data.result.province, data.result.region_name];
        self.imageUrl = data.result.cover;
        let _fileList = [
          {
            name: data.result.gif,
            url: data.result.gif
          }
        ];
        self.fileList = _fileList.slice(-1);
        // 监听判断 上传图片是否存在
        self.imageOnlineUrl = data.result.cover;
        self.fileOnlineUrl = data.result.gif;
      }
    },
    // 查看城市
    async cityLook(row) {
      let self = this;
      await self.cityDetails(row);
      self.title = "查看城市";
      self.outerVisible = true;
      self.isdisabled = true;
      self.operationtype = 2;
    },
    // table操作
    cityAdd() {
      let self = this;
      self.title = "添加城市";
      self.isdisabled = false;
      self.outerVisible = true;
      // 设置operationtype  保存时用到
      self.operationtype = 0;
      // 清空所有
      self.cityvalue = "小宇宙";
      self.cityvalue2 = ["小宇宙", "小宇宙"];
      self.fileList = [];
      self.imageUrl = "";
      self.imageOnlineUrl = "";
      self.fileOnlineUrl = "";
    },
    // 修改城市
    async cityModify(row) {
      // console.log(row)
      let self = this;
      await self.cityDetails(row);
      self.title = "修改城市";
      self.outerVisible = true;
      self.isdisabled = false;
      self.operationtype = 1;
      self.update_region_id = row.region_id;
    },
    // 绑定发公告栏目
    async bindColumn() {
      let self = this;
      let res = await self.getBindAnnounceCommunity();
      if (res) {
        self.title = "绑定发公告的栏目";
        self.outerVisible2 = true;
        self.operationtype = 1;
      }
    },
    // 查找栏目
    async searchBindColumn() {
      let self = this;
      await self.showCommunity({
        communityid: self.state5
      });
    },
    // 设置发公告栏目
    async setBindColumn() {
      let self = this;
      let res = await self.setBindAnnounceCommunity({
        communityid: self.state5
      });
      if (res) {
        self.outerVisible2 = false;
      }
    },
    handleSelect(item) {
      console.log(item);
    },
    async preview() {
      let self = this;
      if (!self.fileOnlineUrl || !self.imageOnlineUrl) {
        self.$message.warning("请上传城市封面或插画");
        return;
      }
      self.innerVisible = true;
      setTimeout(async () => {
        $("#lottie").empty();
        var animation = await bodymovin.loadAnimation({
          container: document.querySelector("#lottie"), // Required
          path: self.fileOnlineUrl, // Required
          renderer: "svg", // Required
          loop: false, // Optional
          autoplay: false, // Optional
          name: "Hello World" // Name for future reference. Optional.
        });
      }, 0);
    }
  },
  created() {
    let self = this;
    self.getRegionsList(self.regionslist);
  }
};
</script>
<style>
.preview .el-dialog {
  margin-top: 5vh !important;
}
</style>
<style scoped="scoped">
.city-ruleform .el-form-item {
  margin-bottom: 0;
}

.labelname {
  margin-right: 10px;
  min-width: 60px;
}

.dialog-sure {
  margin-left: 20px;
}

.searchtrue {
  height: 40px;
  border-bottom: 1px solid #f4f4f4;
}

.searcherror {
  color: red;
}

.searchid {
  width: 220px;
  margin-right: 30px;
}

.city-cell {
  margin-top: 20px;
}

.prompt {
  font-size: 12px;
  color: #999;
  padding-bottom: 10px;
  margin-left: 20px;
}

.result {
  margin-top: 20px;
}

.result img {
  height: 50px;
}

.result p {
  margin-left: 30px;
}

.desc {
  margin-bottom: 10px;
}

.bind_column {
  color: red;
}

.feed-box {
  position: absolute;
  left: 80px;
  top: 44px;
  width: 374px;
  height: 852px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.img-box {
  width: 374px;
  height: 495px;
  border-radius: 10px 10px 0 0;
}

#lottie {
  position: absolute;
  top: 458px;
  left: 84px;
  width: 370px;
  z-index: 9999;
}

.feed-example {
  width: 374px;
  margin: 20px 0 15px;
  padding-right: 20px;
  box-sizing: border-box;
}

.feed-example-top {
  height: 30px;
}

.feed-example-top img {
  height: 30px;
  width: 76.88px;
  margin-right: 20px;
  border-radius: 0 3px 3px 0;
}

.cover img {
  width: 374px;
  height: 179px;
  border-radius: 0 0 10px 10px;
}

.feed-example-box {
  position: relative;
}

.feed-example-circle {
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 407px;
  height: 31px;
  top: -42px;
  left: -13px;
}
</style>
