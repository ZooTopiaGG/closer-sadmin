<template>
  <section>
    <!-- dialog.信息  添加账号 结束  -->
    <!-- dialog 开始。邀请栏目 个人，企业 start-->
    <el-dialog :title="title" class="modify-el-dialog" :visible.sync="outerVisible2">
      <section class="flex">
        <section class="dialog-content">
          <el-form label-width="140px" class="column-ruleForm" :disabled="isdisabled">
            <el-form-item>
              <template slot-scope="scope">
                <span style="font-size: 20px;color:#1f2f3d">修改前</span>
              </template>
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
            <el-form-item label="贴近号分类" prop="class_list">
              <el-select v-model="class_list" placeholder="" multiple>
                <el-option v-for="item in closerList.data" :key="item.id" :label="item.class_name" :value="item.id">
                </el-option>
              </el-select>
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
        </section>
        <section class="dialog-content">
          <el-form label-width="140px" class="column-ruleForm" :disabled="isdisabled">
            <el-form-item>
              <template slot-scope="scope">
                <span style="font-size: 20px;color:#1f2f3d">修改后</span>
              </template>
            </el-form-item>
            <el-form-item label="栏目归属地">
              <label v-if="modifyRow.update.regionName">
                <el-input v-model="modifyRow.update.regionName"></el-input>
                <i class="el-icon-info" style="color: #E6A23C; margin-left: 5px;"></i>
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
                <i class="el-icon-info" style="color: #E6A23C; margin-left: 5px;"></i>
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
            <el-form-item label="贴近号分类" prop="class_list">
              <label v-if="modifyRow.update.class">
                <el-select v-model="update_class_list" placeholder="" multiple>
                  <el-option v-for="item in closerList.data" :key="item.id" :label="item.class_name" :value="item.id">
                  </el-option>
                </el-select>
                <i class="el-icon-info" style="color: #E6A23C; margin-left: 5px;"></i>
              </label>
              <el-select v-else v-model="modifyRow.current.own_class" placeholder="" multiple>
                <el-option v-for="item in closerList.data" :key="item.id" :label="item.class_name" :value="item.id">
                </el-option>
              </el-select>
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
        </section>
      </section>
      <section slot="footer" class="dialog-footer">
        <el-button @click="waitColumnPassOrRefuse(0)">拒 绝</el-button>
        <el-button type="primary" @click="waitColumnPassOrRefuse(1)">通 过</el-button>
      </section>
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
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  // 获取栏目 并对比
  props: ["modifyRow", "selfRow", "closerList"],
  computed: {
    class_list() {
      let arr = this.modifyRow.current.class_list.map(x => {
        return x.class_id;
      });
      return arr;
    },
    update_class_list() {
      return (
        this.modifyRow.update.class && this.modifyRow.update.class.split(",")
      );
    }
  },
  data() {
    return {
      dialogVisible2: false,
      title2: "拒绝",
      textarea2: "",
      row: {},
      // 上传地址
      uploadUrl: `${server.filePath}${server.file}`,
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
      loadingAvatarUpload: false
      // 栏目管理区域选
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
  mounted() {
    // console.log("m0dify", this.modifyRow);
    // console.log("self", this.selfRow);
    // console.log("closerlist", this.closerList);
    // console.log("class_list", this.class_list);
  }
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
