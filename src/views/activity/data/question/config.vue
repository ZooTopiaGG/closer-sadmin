<template>
  <section id="permission" class="flex flex-v" v-loading.body="loadingAvatarUpload">
    <section class="permission_title">成都土著活动</section> 
    <section class="permission_table" style="padding-bottom: 80px">
      <section class="permission_table_top flex flex-pack-justify flex-align-center">
        <section class="flex flex-1">
          <!-- <el-radio-group v-model="radioRecord" @change="handleSelect">
            <el-radio label="topic">上传题目配置</el-radio>
            <el-radio label="project">项目配置</el-radio>
          </el-radio-group> -->
        </section> 
        <section class="flex flex-align-center">
          <el-upload
            class="upload-demo flex flex-align-center flex-pack-center"
            :headers="headers"
            :action="uploadUrl"
            :on-error="handleError" 
            :on-success="handleFileSuccess"
            :before-upload="beforeFileUpload" 
            :file-list="fileList">
            <el-button size="small" type="primary">上传配置</el-button>
          </el-upload>
        </section> 
      </section> 
      <!-- <section class="permission_table_content" v-if="radioRecord === 'topic'"> -->
      <section class="permission_table_content">
        <el-table :data="questionList.data" style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column label="题目信息">
            <el-table-column
              prop="topic"
              label="题目"
              width="120">
            </el-table-column>
            <el-table-column
              prop="diffcult"
              label="难度"
              width="120">
            </el-table-column>
            <el-table-column label="答案列表">
              <el-table-column
                prop="answerA"
                label="答案A">
              </el-table-column>
              <el-table-column
                prop="answerB"
                label="答案B">
              </el-table-column>
              <el-table-column
                prop="answerC"
                label="答案C">
              </el-table-column>
              <el-table-column
                prop="answerD"
                label="答案D">
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </section> 
      <!-- <section class="permission_table_content intro" v-else>
        <section class="list flex flex-v">
          <p>
            <span class="score">100分：</span>
            <span>王者级成都土著</span>
          </p>
          <p>
            <span class="score">60-99分：</span>
            <span>黄金级成都土著</span>
          </p>
          <p>
            <span class="score">0-59分：</span>
            <span>砖头级成都土著</span>
          </p>
          <p>
            <span class="score">每次从简单题集抽取数量：</span>
            <span>6</span>
          </p>
          <p>
            <span class="score">每次从困难题集抽取数量：</span>
            <span>2</span>
          </p>
          <p>
            <span class="score">每次答题扣减次数：</span>
            <span>1</span>
          </p>
          <p>
            <span class="score">王者称号奖励金额：</span>
            <span>5元</span>
          </p>
          <p>
            <span class="score">黄金称号奖励金额：</span>
            <span>2元</span>
          </p>
          <p>
            <span class="score">金额获取上限：</span>
            <span>200元</span>
          </p>
        </section> 
      </section>  -->
    </section> 
    <section class="fixedBottom flex flex-align-center flex-pack-center">
      <el-button size="small" type="primary"  @click="uploadAnswer">保 存</el-button>
      <el-button size="small" @click="back">返 回</el-button>
    </section> 
  </section> 
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    headers() {
      if (this.$store.state.token) {
        return {
          Authorization: `CloserSysAuth ${this.$store.state.token}`
        };
      } else {
        return false;
      }
    },
    authUser() {
      return this.$store.state.authUser
        ? JSON.parse(this.$store.state.authUser)
        : false;
    },
    ...mapState("activity_question", {
      questionList: state => state.questionList
    })
  },
  data() {
    return {
      // 加载
      uploadUrl: `${api.filePath}${api.file}`,
      radioRecord:'topic',
      row: {},
      pagenum: 1,
      pagesize: 10,
      fileList: [],
      fileOnlineUrl: "",
      loadingAvatarUpload: false
    };
  },
  created() {
    let para = {
      activityId: this.$route.query.id
    };
    this.getQuestionList(para);
  },
  methods: {
    ...mapActions("activity_question", [
      "getQuestionList",
      "localQuestionList",
      "uploadQuestions"
    ]),
    handleSelect(val) {
      this.radioRecord = val;
    },
    // 上传异常
    handleError(err) {
      this.$message.error("Network Error!");
    },
    async back() {
      let self = this;
      if (self.isChange) {
        self
          .$confirm("已上传了配置文档尚未保存，确认返回？", "提示", {
            confirmButtonText: "保存",
            cancelButtonText: "返回",
            type: "warning"
          })
          .then(async () => {
            await self.uploadAnswer();
          })
          .catch(() => {
            self.goback();
          });
      } else {
        self.goback();
        return;
      }
    },
    async uploadAnswer() {
      let self = this;
      self.loadingAvatarUpload = true;
      if (!self.fileOnlineUrl) {
        self.$message.warning("请先上传配置！");
        self.loadingAvatarUpload = false;
        return;
      }
      await self.uploadQuestions({
        questionFileUrl: self.fileOnlineUrl,
        activityId: self.$route.query.id
      });
      self.loadingAvatarUpload = false;
    },
    // 上传 文件
    async handleFileSuccess(res, file, fileList) {
      let self = this;
      try {
        if (res.code === 0) {
          self.fileList = fileList.slice(-1);
          self.fileOnlineUrl = res.result.url;
          await self.localQuestionList({ raw: file.raw });
          self.loadingAvatarUpload = false;
          self.radioRecord = "topic";
        } else {
          self.$message.error(res.result);
        }
      } catch (err) {
        self.$message.error(err);
      }
    },
    beforeFileUpload(file) {
      let self = this;
      const isCSV = file.type === "text/csv";
      self.loadingAvatarUpload = true;
      const isLt1M = file.size / 1024 / 1024 < 1.0;
      if (!isCSV) {
        self.$message.error("上传文件只能是 csv 文件!");
        self.loadingAvatarUpload = false;
      }
      if (!isLt1M) {
        self.$message.error("上传文件大小不能超过 1M!");
        self.loadingAvatarUpload = false;
      }
      return isCSV && isLt1M;
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
.fixedBottom {
  position: fixed;
  width: calc(100% - 226px);
  height: 80px;
  bottom: 0px;
  left: calc(50% + 130px);
  transform: translate(-50%, 0);
  background: #f2f2f2;
}

.fixedBottom button {
  width: 200px;
}
.intro {
  font-size: 18px;
  line-height: 2;
}
</style>
