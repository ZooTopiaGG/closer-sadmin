<template>
  <div>
    <!-- dialog.信息  添加账号 结束  -->
    <!-- dialog 开始。邀请栏目 个人，企业 start-->
    <el-dialog :title="title" class="modify-el-dialog" :visible.sync="outerVisible2">
      <div class="flex">
        <div class="dialog-content">
          <el-form label-width="140px" class="column-ruleForm" :disabled="isdisabled">
            <el-form-item label="修改前">
            </el-form-item>
            <el-form-item label="栏目归属地">
              <el-input v-model="modifyRow.current.regionName"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" v-if="modifyRow.current.int_type ==='企业'">
              <el-input v-model="modifyRow.current.companyname"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="modifyRow.current.person_name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="modifyRow.current.phone"></el-input>
            </el-form-item>
            <el-form-item label="栏目名称" prop="columnname">
              <el-input v-model="modifyRow.current.name"></el-input>
            </el-form-item>
            <el-form-item label="栏目logo" class="logo" prop="blogo">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.blogo" :src="modifyRow.current.blogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="栏目类别" prop="category">
              <el-input v-model="modifyRow.current.int_type"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="modifyRow.current.id_card"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createtime">
              <el-input v-model="modifyRow.current.long_create_time"></el-input>
            </el-form-item>
            <el-form-item label="邀请人" prop="inviter">
              <el-input v-if="modifyRow.current.invite_user && modifyRow.current.invite_user != 'null'" v-model="modifyRow.current.invite_user"></el-input>
              <el-input v-else></el-input>
            </el-form-item>
            <el-form-item v-if="modifyRow.current.int_type ==='企业'" label="社会信用代码">
              <el-input v-model="modifyRow.current.business_license"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面照">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.idcardfrontimg" :src="modifyRow.current.idcardfrontimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面照">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.idcardbackimg" :src="modifyRow.current.idcardbackimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="手持身份证正面照">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.idcardfrontbyhandimg" :src="modifyRow.current.idcardfrontbyhandimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item v-if="modifyRow.current.int_type ==='企业'" label="营业执照正面">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.businesslicenseimg" :src="modifyRow.current.businesslicenseimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog-content">
          <el-form label-width="140px" class="column-ruleForm" :disabled="isdisabled">
            <el-form-item label="修改前">
            </el-form-item>
            <el-form-item label="栏目归属地">
              <label v-if="modifyRow.update.regionName">
                <el-input v-model="modifyRow.update.regionName"></el-input>
                <i class="el-icon-info" style="color: red; margin-left: 5px;"></i>
              </label>
              <el-input v-else v-model="modifyRow.current.regionName">
              </el-input>
            </el-form-item>
            <el-form-item label="企业名称" v-if="modifyRow.current.int_type ==='企业'">
              <el-input v-model="modifyRow.current.companyname"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="modifyRow.current.person_name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="modifyRow.current.phone"></el-input>
            </el-form-item>
            <el-form-item label="栏目名称" prop="columnname">
              <label v-if="modifyRow.update.name">
                <el-input v-model="modifyRow.update.name"></el-input>
                <i class="el-icon-info" style="color: red; margin-left: 5px;"></i>
              </label>
              <el-input v-else v-model="modifyRow.current.name">
              </el-input>
            </el-form-item>
            <el-form-item label="栏目logo" class="logo" prop="blogo">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.blogo" :src="modifyRow.current.blogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="栏目类别" prop="category">
              <el-input v-model="modifyRow.current.int_type"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="modifyRow.current.id_card"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createtime">
              <el-input v-model="modifyRow.current.long_create_time"></el-input>
            </el-form-item>
            <el-form-item label="邀请人" prop="inviter">
              <el-input v-if="modifyRow.current.invite_user && modifyRow.current.invite_user != 'null'" v-model="modifyRow.current.invite_user"></el-input>
              <el-input v-else></el-input>
            </el-form-item>
            <el-form-item v-if="modifyRow.current.int_type ==='企业'" label="社会信用代码">
              <el-input v-model="modifyRow.current.business_license"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面照">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.idcardfrontimg" :src="modifyRow.current.idcardfrontimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面照">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.idcardbackimg" :src="modifyRow.current.idcardbackimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="手持身份证正面照">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.idcardfrontbyhandimg" :src="modifyRow.current.idcardfrontbyhandimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item v-if="modifyRow.current.int_type ==='企业'" label="营业执照正面">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false">
                <img v-if="modifyRow.current.businesslicenseimg" :src="modifyRow.current.businesslicenseimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="waitColumnPassOrRefuse(0)">拒 绝</el-button>
        <el-button type="primary" @click="waitColumnPassOrRefuse(1)">通 过</el-button>
      </div>
    </el-dialog>
    <!-- 拒绝时 提示输入拒绝理由 -->
    <el-dialog :title="title2" :visible.sync="dialogVisible2" width="30%">
      <el-input type="textarea" autosize placeholder="请输入拒绝理由" v-model="textarea2">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="verify(0)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog 开始。邀请栏目 个人，企业 end-->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  // 获取栏目 并对比
  props: ["modifyRow", "selfRow"],
  data() {
    return {
      dialogVisible2: false,
      title2: "拒绝",
      textarea2: "",
      row: {},
      // 上传地址
      uploadUrl: `${api.filePath}${api.file}`,
      res: {},
      operationtype: 0, // 操作类型
      // dialog
      outerVisible2: true,
      type: 0, // 0 添加默认栏目。// 1绑定城市封面栏目
      title: "栏目审核数据对比",
      // 搜索的默认栏目
      isdisabled: true,
      cateisdisabled: false,
      // 局部加载
      loadingAvatarUpload: false,
      // 栏目管理区域选择
      fliterregion: "0",
      region: [
        {
          value: "0",
          label: "小宇宙"
        },
        {
          value: "1",
          label: "成都"
        }
      ],
      // 操作邀请栏目表单
      ruleForm: {
        columntype: "个人", // 栏目类型 个人 企业
        name: "", // 法人姓名
        city: "", // 归属地
        idcard: "", // 身份证号
        blogo: "", // blogo
        blogoOnlineUrl: "",
        columnname: "", // 栏目名称
        frontCredUrl: "", // 身份证正面z
        frontCredOnlineUrl: "", // 线上
        frontHandCredUrl: "", // 手持身份证正面照
        frontHandCredOnlineUrl: "",
        backCredUrl: "", // // 身份证反面照
        backCredOnlineUrl: "",
        frontLicenseUrl: "", //执照正面照
        frontLicenseOnlineUrl: "",
        licenseCode: "", //执照编号
        // exp: '', // 示例
        inviter: "", // 邀请人
        createtime: "", // 栏目创建时间
        logo: "", //栏目logo
        phone: "" // 手机号
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "请选择归属地",
            trigger: "change"
          }
        ],
        columnname: [
          {
            required: true,
            message: "请输入栏目名称",
            trigger: "blur"
          },
          {
            min: 2,
            message: "栏目名称必须大于2个字符",
            trigger: "blur"
          }
        ],
        idcard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          },
          {
            min: 18,
            max: 18,
            message: "请输入18位身份证号",
            trigger: "blur"
          }
        ],
        frontCredUrl: [
          {
            required: true,
            message: "请上传身份证正面照",
            trigger: "change"
          }
        ],
        backCredUrl: [
          {
            required: true,
            message: "请上传身份证反面照",
            trigger: "change"
          }
        ],
        frontHandCredUrl: [
          {
            required: true,
            message: "请上传手持身份证正面照",
            trigger: "change"
          }
        ],
        frontLicenseUrl: [
          {
            required: true,
            message: "请上传营业执照正面照",
            trigger: "change"
          }
        ],
        licenseCode: [
          {
            required: true,
            message: "请输入营业执照编号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("column", ["verifyUpdateCommunity"]),
    // 通过，拒绝审核或者修改接口
    async verify(type) {
      let self = this;
      if (type === 0) {
        if (self.textarea2 === "") {
          self.$message.warning("请输入拒绝理由");
          return false;
        }
      } else {
        self.textarea2 === "";
      }
      let res = await self.verifyUpdateCommunity({
        communityid: self.selfRow.objectID,
        applyid: self.selfRow.applyid,
        flag: type,
        text: self.textarea2
      });
      if (res) {
        self.dialogVisible2 = false;
        self.outerVisible2 = false;
        self.$router.go(0);
      }
    },
    // 通过，拒绝，查看栏目
    waitColumnPassOrRefuse(type) {
      let self = this;
      let confirm;
      if (type === 1) {
        confirm = `是否通过“${self.selfRow.name}”的申请？`;
        self
          .$confirm(confirm, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            self.verify(1);
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        self.title2 = `确认拒绝 ${self.selfRow.name} 的申请？`;
        self.dialogVisible2 = true;
      }
    }
  },
  mounted() {}
};
</script>
<style>
.modify-el-dialog .el-dialog {
  width: 60%;
  min-width: 850px !important;
}

.modify-el-dialog .el-dialog {
  margin-top: 5vh !important;
}

.column-ruleForm .el-input {
  width: 180px;
}

.column-ruleForm .logo .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 164px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}

.column-ruleForm .logo .avatar {
  width: 164px;
  height: 64px;
  display: block;
}
</style>
