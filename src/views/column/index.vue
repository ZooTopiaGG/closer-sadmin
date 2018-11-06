<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">
      <section>城市栏目管理</section>
      <!-- <span class="bind-prompt flex-1" v-if="JSON.stringify(res.needBindCover) === 'true'">当前选择城市暂未绑定城市封面栏目，
        <span class="tobind" @click="tobindcover(res.needBindCover)">去绑定</span>
        后城市才能在首页显示
      </span> -->
    </section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center flex-1">
          <section class="flex flex-align-center searchbyphone">
            <span class="labelname column_labelname">
              栏目主手机号
            </span>
            <el-input v-model="columnerphone" style="width:200px" maxlength="11" placeholder="请输入栏目主手机号" @keyup.enter.native="bindSearch">
              <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
            </el-input>
          </section>
          <section class="list-filter">
            <el-select class='list-filter-select' @change="handleSelectRegion" v-model="fliterregion" placeholder="所属区域">
              <el-option v-for="item in searchregion" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </section>
          <section class="list-filter list-filter-2">
            <el-select class='list-filter-select' @change="handleSelect" v-model="filtercondition" placeholder="请选择">
              <el-option v-for="item in condition.options" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
          </section>
        </section>
        <section class="flex flex-align-center">
          <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="columnAdd">添加默认栏目</el-button> -->
          <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="tobindcover(res.needBindCover)">
            <span v-if="JSON.stringify(res.needBindCover) === 'true'">设置封面栏目</span>
            <span v-else>修改封面栏目</span>
          </el-button> -->
          <el-button type="primary" icon="el-icon-circle-check-outline" @click="columnInvite">邀请栏目</el-button>
        </section>
        <!-- dialog.信息 开始 设置默认栏目 绑定/设置城市封面  -->
        <el-dialog :title="title" :visible.sync="outerVisible">
          <section class="dialog-content">
            <section v-if="type === 0">
              <span>所属区域：</span>
              <el-select class='list-filter-select' disabled v-model="fliterregion" placeholder="所属区域">
                <el-option v-for="item in allregion" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </section>
            <section class="search">
              <el-input v-model="state5" placeholder="请输入栏目ID" suffix-icon="el-icon-search" class="searchid"></el-input>
              <el-button @click="searchDefault">确 定</el-button>
            </section>
            <!-- 待修改 城市封面栏目 -->
            <section class="result flex flex-align-center" v-if="showResult">
              <el-radio v-if="searchRow.int_self === 1 && type === 0" v-model="defaultradio" label="1">{{ searchRow.name }}</el-radio>
              <el-checkbox v-else v-model="defaultchecked" disabled>{{ searchRow.name }}</el-checkbox>
              <p>{{ searchRow.objectID }}</p>
              <p>
                <img class="logo" :src="searchRow.blogo">
              </p>
              <p v-if="searchRow.int_self === 1 && type === 0" style="color: #f00">已经是默认栏目</p>
            </section>
          </section>
          <section slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary" v-if=" type === 0 " :disabled="!searchRow.name" @click="setDefault">确 定</el-button>
          </section>
        </el-dialog>
        <!-- dialog.信息  添加账号 结束  -->
        <!-- dialog 开始。邀请栏目 个人，企业 start-->
        <el-dialog :title="title" :visible.sync="outerVisible2">
          <el-dialog width="30%" class="tj-eldialog" title="复制邀请码" :visible.sync="innerVisible2" append-to-body>
            <section>
              <p>已生成邀请码</p>
              <p class="tj-invite-p flex flex-align-center">
                <span class="flex-1">邀请码：{{ copyInviteValue }}</span>
                <el-button type="primary" @click="handleBtn(copyInviteValue)">复制</el-button>
              </p>
              <p class="flex flex-align-center">
                <span class="flex-1">邀请链接： {{ copyInviteLink }}</span>
                <el-button type="primary" @click="handleBtn(copyInviteLink)">复制</el-button>
              </p>
            </section>
          </el-dialog>
          <section class="dialog-content" v-loading.body="loadingAvatarUpload">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="column-ruleForm" :disabled="isdisabled">
              <el-form-item v-if="operationtype != 2" label="栏目类型" prop="columntype" required>
                <el-radio-group v-model="ruleForm.columntype">
                  <el-radio label="个人"></el-radio>
                  <el-radio label="企业"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="栏目归属地" prop="city">
                <el-select v-model="ruleForm.city" @change="handleSelectColumuCity" placeholder="请选择城市" :disabled="authUser.type != 1 && operationtype === 2">
                  <el-option v-for="item in allregion" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="ruleForm.columntype==='企业'" label="企业名称" prop="companyname">
                <el-input v-model="ruleForm.companyname"></el-input>
              </el-form-item>
              <el-form-item v-if="operationtype === 2" label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="栏目名称" prop="columnname">
                <el-input v-model="ruleForm.columnname"></el-input>
              </el-form-item>
              <el-form-item v-if="operationtype === 2" label="栏目logo" prop="blogo" class="blogo">
                <section class="flex">
                  <el-upload class="avatar-uploader" :headers="headers" :action="uploadUrl" :show-file-list="false" :on-error="handleError"
                  :on-success="handleBlogoSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.blogoUrl" :src="ruleForm.blogoUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <section style="margin-left: 10px; color: #999; font-size:12px">
                  <span>尺寸 70*30像素；</span>
                  <span>大小不超过 500k</span>
                </section>
                </section>
              </el-form-item>
              <el-form-item v-if="operationtype === 2" label="栏目类别" prop="category">
                <el-input v-model="ruleForm.columntype" :disabled="cateisdisabled"></el-input>
              </el-form-item>
              <el-form-item label="贴近号分类" prop="class_list">
                <el-select v-model="ruleForm.classes" :multiple-limit="3" @change="handleSelectClass" placeholder="请选择分类" multiple>
                  <el-option v-for="item in closerList.data" :key="item.id" :label="item.class_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="ruleForm.columntype==='企业'" label="法人姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item v-else label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item v-if="ruleForm.columntype==='企业'" label="法人身份证号" prop="idcard">
                <el-input maxlength="18" v-model="ruleForm.idcard"></el-input>
              </el-form-item>
              <el-form-item v-else label="身份证号" prop="idcard">
                <el-input maxlength="18" v-model="ruleForm.idcard"></el-input>
              </el-form-item>
              <el-form-item v-if="operationtype === 2" label="创建时间" prop="createtime">
                <el-input v-model="ruleForm.createtime" disabled></el-input>
              </el-form-item>
              <el-form-item v-if="operationtype === 2" label="邀请人" prop="inviter">
                <el-input v-model="ruleForm.inviter" disabled></el-input>
              </el-form-item>

              <el-form-item label="身份证正面照">
                <el-upload class="avatar-uploader" :headers="headers" :action="uploadUrl" :show-file-list="false" :on-error="handleError"
                  :on-success="handleFrontSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.frontCredUrl" :src="ruleForm.frontCredUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="身份证反面照">
                <el-upload class="avatar-uploader" :headers="headers" :action="uploadUrl" :show-file-list="false" :on-error="handleError"
                  :on-success="handleBackSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.backCredUrl" :src="ruleForm.backCredUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="手持身份证正面照">
                <el-upload class="avatar-uploader" :headers="headers" :action="uploadUrl" :show-file-list="false" :on-error="handleError"
                  :on-success="handleFrontHandSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.frontHandCredUrl" :src="ruleForm.frontHandCredUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="ruleForm.columntype==='企业'" label="社会信用代码" prop="licenseCode">
                <el-input v-if="operationtype == 2" disabled v-model="ruleForm.licenseCode"></el-input>
                <el-input v-else v-model="ruleForm.licenseCode"></el-input>
              </el-form-item>
              <el-form-item v-if="ruleForm.columntype==='企业'" label="营业执照正面">
                <el-upload class="avatar-uploader" :headers="headers" :action="uploadUrl" :show-file-list="false" :on-error="handleError"
                  :on-success="handleLicenseSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.frontLicenseUrl" :src="ruleForm.frontLicenseUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="operationtype === 1" style="text-align: right;">
                <el-button type="primary" @click="generateInviteCode('ruleForm')">生成邀请码</el-button>
              </el-form-item>
              <el-form-item v-else-if="operationtype === 2" style="text-align: right;">
                <el-button @click="outerVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
              </el-form-item>
            </el-form>
          </section>
          <section slot="footer" v-if="operationtype === 5" class="dialog-footer">
            <el-button @click="waitColumnPassOrRefuse(row, 0)">拒 绝</el-button>
            <el-button type="primary" @click="waitColumnPassOrRefuse(row, 1)">通 过</el-button>
          </section>
        </el-dialog>
        <!-- dialog 开始。邀请栏目 个人，企业 end-->
      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content">
        <el-table :data="res.data" style="width: 100%">
          <!-- <el-table-column fixed>
            <template slot-scope="scope">
              <span v-if="scope.row.isCover" class="covers">封面</span>
            </template>
          </el-table-column> -->
          <el-table-column fixed prop="objectID" label="栏目id">
          </el-table-column>
          <el-table-column fixed prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="regionName" label="所属区域">
          </el-table-column>
          <el-table-column label="栏目logo" width="100">
            <template slot-scope="scope">
              <img v-lazy="scope.row.blogo" alt="logo" srcset="" style="height: auto; width: 90px;">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="栏目名称">
          </el-table-column>
          <el-table-column prop="active" label="激活状态">
          </el-table-column>
          <el-table-column prop="invite_type" label="邀请类别">
          </el-table-column>
          <el-table-column prop="invite_code" label="邀请码">
          </el-table-column>
          <el-table-column prop="int_self_2" label="是否默认栏目">
          </el-table-column>
          <el-table-column prop="int_apply_type" label="申请类别">
          </el-table-column>
          <el-table-column prop="long_apply_time" label="申请时间">
          </el-table-column>
          <el-table-column prop="long_verify_time" label="审核时间">
          </el-table-column>
          <el-table-column prop="long_create_time" label="创建时间">
          </el-table-column>
          <el-table-column prop="apply_text" label="修改内容">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <!-- 根据不同筛选显示不同操作按钮 -->
            <template slot-scope="scope">
              <section v-if="filtercondition == '未上线待审' || filtercondition === '已上线待改'">
                <el-button type="text" size="small" @click="waitColumnPassOrRefuse(scope.row, 1)">
                  <span>通过</span>
                </el-button>
                <el-button @click="waitColumnPassOrRefuse(scope.row, 0)" type="text" size="small">拒绝</el-button>
                <el-button @click="waitColumnReview(scope.row, 2)" type="text" size="small">
                  <span>查看栏目</span>
                </el-button>
              </section>
              <section v-else>
                <el-button type="text" size="small" @click="columnShut(scope.row, scope.$index)">
                  <span v-if="!scope.row.bool_ban">禁言</span>
                  <span v-else>取消禁言</span>
                </el-button>
                <el-button @click="columnEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="columnDefault(scope.row)" type="text" v-if="scope.row.int_self === 1" size="small">
                  <span>取消默认</span>
                </el-button>
                <el-button @click="columnDefault(scope.row)" type="text" v-else size="small">
                  <span>设成默认栏目</span>
                </el-button>
                <!-- <el-button type="text" v-if="!scope.row.isCover" size="small" @click="tosetbindcover(scope.row)">
                  <span>设置封面栏目</span>
                </el-button> -->
              </section>
            </template>
          </el-table-column>
        </el-table>
        <!-- 拒绝时 提示输入拒绝理由 -->
        <el-dialog :title="title2" :visible.sync="dialogVisible" width="30%">
          <el-input type="textarea" autosize placeholder="请输入拒绝理由" v-model="textarea2">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="verify(0)">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </section>
    <section class="block cloumn-block" v-if="res.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="res.count">
      </el-pagination>
    </section>
    <section class="modify-dialog" v-if="modifyDialogVisible">
      <Modify :modifyRow="modifyRow" :selfRow="selfRow" :closerList="closerList"></Modify>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Modify from "@/components/modifycontrast.vue";
export default {
  computed: {
    ...mapState("column", ["res", "allregion", "searchregion", "closerList"]),
    // 上传文件 请求头设置
    headers() {
      return {
        Authorization: `CloserSysAuth ${this.$store.state.token}`
      };
    },
    authUser() {
      return this.$store.state.authUser;
    }
  },
  components: {
    Modify
  },
  data() {
    var checkIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证不能为空"));
      }
      if (
        !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
          value
        )
      ) {
        callback(new Error("身份证格式错误"));
      } else {
        callback();
      }
    };
    return {
      communitypara: {
        regionid: "0",
        phone: "",
        flag: 0,
        pagenum: 1,
        pagesize: 10
      },
      regionspara: {
        keywords: "",
        pagenum: 1,
        pagesize: 100, // 城市列表
        columnCity: []
      },
      copyInviteValue: "xxxxaaaa",
      copyInviteLink: "",
      dialogVisible: false,
      modifyDialogVisible: false,
      modifyRow: {},
      selfRow: {},
      title2: "",
      // 上传地址
      uploadUrl: `${server.filePath}${server.file}`,
      columnerphone: "",
      state5: "",
      // 分页
      pagenum: 1,
      pagesize: 10,
      operationtype: 0, // 操作类型
      communityid: "", // 栏目id
      regionid: "", // 城市id
      setcommunityid: "", // 设置栏目封面id
      row: {}, // 操作当前栏目列表
      // dialog
      innerVisible2: false,
      outerVisible: false,
      outerVisible2: false,
      type: 0, // 0 添加默认栏目。// 1绑定城市封面栏目
      title: "添加默认栏目",
      // 搜索的默认栏目
      defaultchecked: true,
      defaultradio: "1",
      showResult: false,
      textarea2: "",
      // 查找的栏目列表详情
      searchRow: {},
      // 栏目管理区域选择
      fliterregion: "",
      region: [],
      // 筛选条件
      condition: {
        options: [
          {
            value: "正常栏目",
            label: "正常栏目"
          },
          {
            value: "未上线待审",
            label: "未上线待审"
          },
          {
            value: "已上线待改",
            label: "已上线待改"
          }
        ]
      },
      filtercondition: "正常栏目",
      // 局部加载
      loadingAvatarUpload: false,
      // 操作邀请栏目表单
      ruleForm: {
        classes: [],
        columntype: "个人", // 栏目类型 个人 企业
        companyname: "", // 公司名称
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
            max: 20,
            message: "长度在 2 到 20 个字符",
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
            validator: checkIdCard,
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
      },
      isdisabled: false,
      cateisdisabled: false,
      imageSize: true // 验证图片尺寸
    };
  },
  created() {
    let self = this,
      columnCity = [],
      region_id,
      defaultRegion;
    // 1.判断 是否是超管，是regionid默认为0，不是则选择在权限中所勾选的城市
    if (self.authUser.type === 1) {
      region_id = "0";
      self.fliterregion = "0";
    } else {
      if (self.authUser.columnCity != "") {
        columnCity = JSON.parse(self.authUser.columnCity);
        if (columnCity.length > 0) {
          if (columnCity.includes("wfXYXEpsBEyN")) {
            defaultRegion = "wfXYXEpsBEyN";
          } else if (columnCity.includes("0")) {
            defaultRegion = "0";
          } else if (columnCity.includes("wsJK3jZqhgxR")) {
            defaultRegion = "wsJK3jZqhgxR";
          } else if (columnCity.includes("wghHCWxHxgYV")) {
            defaultRegion = "wghHCWxHxgYV";
          } else if (columnCity.includes("wg2JligjGo3a")) {
            defaultRegion = "wg2JligjGo3a";
          } else {
            defaultRegion = columnCity[0];
          }
          self.fliterregion = defaultRegion;
        }
      }
    }
    // 2.判断 如果是超管 直接通过接口获取所有城市 否则是获取到columnCity的城市列表
    self.communitypara["regionid"] = self.fliterregion;
    self.getCommunitiesList(self.communitypara);
    self.regionspara["columnCity"] = columnCity;
    self.getRegionList(self.regionspara);
    self.selectAll();
  },
  methods: {
    ...mapActions("column", [
      "getCommunitiesList",
      "showCommunity",
      "setCoverRegionCommunity",
      "getRegionList",
      "verifyUpdateCommunity",
      "verifyCommunity",
      "getApplyByCommunity",
      "updateCommunity",
      "inviteCode",
      "setSelfCommunity",
      "ban",
      "fnVerifyCommunity",
      "selectAll"
    ]),
    bindSearch() {
      this.pagenum = 1;
      this.getCommunityList();
    },
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getCommunityList();
    },
    // table操作
    handleClick1(tab, event) {},
    // 区域查找
    handleSelectRegion(item) {
      this.pagenum = 1;
      this.getCommunityList();
    },
    handleSelectColumuCity() {},
    handleSelectClass() {},
    // 选择框 查找
    handleSelect(item) {
      this.pagenum = 1;
      this.getCommunityList();
    },
    // 添加默认栏目， 绑定封面栏目
    async searchDefault() {
      let self = this;
      // 设置row
      let res = await self.showCommunity({
        communityid: self.state5,
        regionid: self.fliterregion
      });
      if (res) {
        self.showResult = true;
        self.row = res;
        self.searchRow = res;
      }
    },
    // 确认添加默认栏目
    setDefault() {
      if (this.row.int_self === 1) {
        this.$message.warning("已经是默认栏目，请勿重复添加！");
        return;
      }
      this.columnDefault(this.row);
    },
    // 修改栏目表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateColumn();
        } else {
          return false;
        }
      });
    },
    // 上传身份证正面
    handleFrontSuccess(res, file) {
      this.loadingAvatarUpload = false;
      try {
        if (res.code === 0) {
          this.$message.success("上传成功");
          // 本地展示图片
          this.ruleForm.frontCredUrl = URL.createObjectURL(file.raw);
          // 线上图片 上传到服务器
          this.ruleForm.frontCredOnlineUrl = server.filePath + res.result.url;
          // res.result.attributes //图片属性
        } else {
          this.$meeage.error(res.result);
        }
      } catch (err) {
        this.$meeage.error(err);
      }
    },
    // 上传身份证反面
    handleBackSuccess(res, file) {
      this.loadingAvatarUpload = false;
      try {
        if (res.code === 0) {
          this.$message.success("上传成功");
          // 本地展示图片
          this.ruleForm.backCredUrl = URL.createObjectURL(file.raw);
          // 线上图片 上传到服务器
          this.ruleForm.backCredOnlineUrl = server.filePath + res.result.url;
          // res.result.attributes //图片属性
        } else {
          this.$meeage.error(res.result);
        }
      } catch (err) {
        this.$meeage.error(err);
      }
    },
    // 上传手持身份证正面
    handleFrontHandSuccess(res, file) {
      this.loadingAvatarUpload = false;
      try {
        if (res.code === 0) {
          this.$message.success("上传成功");
          // 本地展示图片
          this.ruleForm.frontHandCredUrl = URL.createObjectURL(file.raw);
          // 线上图片 上传到服务器
          this.ruleForm.frontHandCredOnlineUrl =
            server.filePath + res.result.url;
          // res.result.attributes //图片属性
        } else {
          this.$meeage.error(res.result);
        }
      } catch (err) {
        this.$meeage.error(err);
      }
    },
    // 上传执业证
    handleLicenseSuccess(res, file) {
      this.loadingAvatarUpload = false;
      try {
        if (res.code === 0) {
          this.$message.success("上传成功");
          // 本地展示图片
          this.ruleForm.frontLicenseUrl = URL.createObjectURL(file.raw);
          // 线上图片 上传到服务器
          this.ruleForm.frontLicenseOnlineUrl =
            server.filePath + res.result.url;
          // res.result.attributes //图片属性
        } else {
          this.$meeage.error(res.result);
        }
      } catch (err) {
        this.$meeage.error(err);
      }
    },
    // 上传blogo handleBlogoSuccess
    handleBlogoSuccess(res, file) {
      let self = this;
      this.loadingAvatarUpload = false;
      try {
        if (res.code === 0) {
          this.$message.success("上传成功");
          // 本地展示图片
          this.ruleForm.blogoUrl = URL.createObjectURL(file.raw);
          // 线上图片 上传到服务器
          this.ruleForm.blogoOnlineUrl = server.filePath + res.result.url;
          // res.result.attributes //图片属性
          self.imageSize =
            res.result.attributes.dimensions.width === 164 &&
            res.result.attributes.dimensions.height === 64;
          if (!self.imageSize) {
            self.$message.error("请根据提示上传符合标准尺寸的图片！");
          }
        } else {
          this.$message.error(res.result);
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 上传失败
    handleError() {
      this.loadingAvatarUpload = false;
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      this.loadingAvatarUpload = true;
      const isImage = file.type.indexOf("image/") > -1;
      const isLt500kb = file.size / 1024 / 1024 < 0.5;
      if (!isImage) {
        this.loadingAvatarUpload = false;
        this.$message.error("上传图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt500kb) {
        this.loadingAvatarUpload = false;
        this.$message.error("上传图片大小不能超过 500kb!");
      }
      return isImage && isLt500kb;
    },
    // 获取栏目列表
    async getCommunityList() {
      let self = this;
      let flag;
      if (self.filtercondition == "未上线待审") {
        flag = 1;
      } else if (self.filtercondition == "已上线待改") {
        flag = 2;
      } else {
        flag = 0;
      }
      self.communitypara["regionid"] = self.fliterregion || "0";
      self.communitypara["phone"] = self.columnerphone || "";
      self.communitypara["flag"] = flag || 0;
      self.communitypara["pagenum"] = self.pagenum;
      await self.getCommunitiesList(self.communitypara);
    },
    /* 
           operationtype:
             0 添加默认栏目
             1 邀请栏目
             2 编辑栏目
             3 绑定城市封面栏目
             4 设置城市封面栏目
             5 查看栏目
           type:
             0 操作添加默认栏目
             1 操作城市封面
           isdisabled:
             当 operation === 5 时。为true
             否则 false
         */
    // 表单操作
    resetForm() {
      this.ruleForm = {
        classes: [],
        companyname: "",
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
      };
    },
    // 点击添加操作
    columnAdd() {
      this.title = "添加默认栏目";
      this.state5 = "";
      this.showResult = false;
      this.operationtype = 0;
      this.type = 0;
      this.outerVisible = true;
    },
    // 点击邀请操作
    columnInvite() {
      let self = this;
      self.resetForm();
      self.title = "邀请栏目";
      self.operationtype = 1;
      self.outerVisible2 = true;
      self.isdisabled = false;
    },
    // 点击生成邀请码
    generateInviteCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.inviteColumn();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 绑定城市封面
    async tobindcover(flag) {
      let self = this,
        regionName;
      self.operationtype = 3;
      self.type = 1;
      self.outerVisible = true;
      self.searchRow = "";
      // self.searchregion.forEach(x => {
      //   if (x.value === self.fliterregion) {
      //     regionName = x.label;
      //     return;
      //   }
      // });
      // console.log("regionName===", regionName);
      if (flag) {
        self.title = "绑定城市封面栏目";
      } else {
        self.title = "修改城市封面栏目";
      }
    },
    tosetbindcover(row) {
      let self = this;
      if (row == null || row == undefined || row == "") {
        self.$message.error("communityid not exist");
        return;
      }
      self.searchRow = row;
      let confirm = `确认设置“${row.name}”为城市封面栏目？`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.setbindcover();
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 设置绑定城市封面
    async setbindcover() {
      let self = this;
      let res = await self.setCoverRegionCommunity({
        communityid: self.searchRow.objectID,
        regionid: self.searchRow.region_id
      });
      if (res) {
        self.outerVisible = false;
        self.getCommunityList();
      }
    },
    // 编辑栏目
    async columnEdit(row) {
      let self = this;
      self.row = row;
      await self.communityDetails();
      self.title = "编辑";
      self.operationtype = 2;
      self.outerVisible2 = true;
      self.isdisabled = false;
    },
    // 通过，拒绝审核或者修改接口
    async verify(type) {
      let self = this;
      let res = await self.fnVerifyCommunity({
        communityid: self.row.objectID,
        applyid: self.row.applyid,
        flag: type,
        text: self.textarea2,
        filtercondition_type: self.filtercondition
      });
      if (res) {
        await self.getCommunityList();
        self.outerVisible2 = false;
        self.dialogVisible = false;
      }
    },
    // 通过，拒绝，查看栏目
    waitColumnPassOrRefuse(row, type) {
      let self = this;
      self.row = row;
      // console.log('rows===', self.row)
      let confirm;
      if (type === 1) {
        confirm = `是否通过“${row.name}”的申请？`;
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
        self.title2 = `确认拒绝 ${row.name} 的申请？`;
        self.dialogVisible = true;
      }
    },
    // 查看栏目 对比
    async waitColumnReview(row, type) {
      let self = this;
      if (type === 2) {
        if (self.filtercondition === "未上线待审") {
          self.row = row;
          await self.communityDetails();
          self.title = "查看栏目";
          self.outerVisible2 = true;
          self.isdisabled = true;
          self.operationtype = 5;
        } else {
          self.modifyDialogVisible = false;
          let res = await self.getApplyByCommunity({
            communityid: row.objectID,
            applyid: row.applyid
          });
          if (res) {
            self.modifyDialogVisible = true;
            res.current.int_type = res.current.int_type === 0 ? "个人" : "企业";
            res.current.long_create_time = self.$com.createTime(
              res.current.long_create_time,
              "yy-mm-dd hh:MM"
            );
            self.modifyRow = res;
            self.selfRow = row;
          }
        }
      } else {
        return false;
      }
    },
    // 获取栏目详情
    async communityDetails() {
      let self = this;
      let res = await self.showCommunity({
        communityid: self.row.objectID,
        regionid: self.row.region_id
      });
      if (res) {
        // 栏目详情对应字段
        self.ruleForm.companyname = res.companyname;
        self.ruleForm.columntype = res.int_type === 0 ? "个人" : "企业";
        self.ruleForm.city = res.region_id || "0";
        self.ruleForm.phone = res.phone || "********";
        self.ruleForm.inviter = res.invite_user;
        self.ruleForm.columnname = res.name;
        self.ruleForm.name = res.person_name;
        self.ruleForm.idcard = res.id_card;
        self.ruleForm.frontCredUrl = res.idcardfrontimg; // 线下
        self.ruleForm.frontCredOnlineUrl = res.idcardfrontimg; // 线上
        self.ruleForm.backCredUrl = res.idcardbackimg;
        self.ruleForm.backCredOnlineUrl = res.idcardbackimg;
        self.ruleForm.frontHandCredUrl = res.idcardfrontbyhandimg;
        self.ruleForm.frontHandCredOnlineUrl = res.idcardfrontbyhandimg;
        self.ruleForm.licenseCode = res.business_license;
        self.ruleForm.frontLicenseUrl = res.businesslicenseimg;
        self.ruleForm.frontLicenseOnlineUrl = res.businesslicenseimg;
        self.ruleForm.blogoUrl = res.blogo;
        self.ruleForm.blogoOnlineUrl = res.blogo;
        self.ruleForm.createtime = self.$com.createTime(
          res.long_create_time,
          "yy-mm-dd hh:MM"
        );
        self.ruleForm.classes = await res.class_list.map(x => {
          return x.class_id;
        });
        if (res.int_type === 1) {
          self.cateisdisabled = true;
        } else {
          self.cateisdisabled = false;
        }
      }
    },
    // 编辑栏目实体
    async updateColumn() {
      let self = this;
      if (!self.imageSize) {
        self.$message.error("请根据提示上传符合标准尺寸的图片！");
        return;
      }
      let columntype = self.ruleForm.columntype === "个人" ? 0 : 1,
        licenseCode =
          self.ruleForm.columntype === "个人" ? "" : self.ruleForm.licenseCode,
        frontLicenseOnlineUrl =
          self.ruleForm.columntype === "个人"
            ? ""
            : self.ruleForm.frontLicenseOnlineUrl;
      let res = await self.updateCommunity({
        communityid: self.row.objectID,
        name: self.ruleForm.columnname || "小宇宙", // 栏目名字
        regionid: self.ruleForm.city || "0", // 区域id
        userName: self.ruleForm.name, // 拦住名
        blogo: self.ruleForm.blogoOnlineUrl,
        idCardNum: self.ruleForm.idcard,
        type: columntype,
        idCardFrontIMG: self.ruleForm.frontCredOnlineUrl, // 需改为线上地址
        idCardBackIMG: self.ruleForm.backCredOnlineUrl,
        idCardFrontByHandIMG: self.ruleForm.frontHandCredOnlineUrl,
        businessLicense: licenseCode,
        businessLicenseIMG: frontLicenseOnlineUrl,
        companyname: self.ruleForm.companyname,
        // 分类id
        classSet: self.ruleForm.classes.join(",")
      });
      if (res) {
        // 隐藏dialog
        this.outerVisible2 = false;
      }
    },
    // 邀请栏目
    async inviteColumn(callback) {
      let self = this;
      let columntype = self.ruleForm.columntype === "个人" ? 0 : 1,
        licenseCode =
          self.ruleForm.columntype === "个人" ? "" : self.ruleForm.licenseCode,
        frontLicenseOnlineUrl =
          self.ruleForm.columntype === "个人"
            ? ""
            : self.ruleForm.frontLicenseOnlineUrl;
      let res = await self.inviteCode({
        name: self.ruleForm.columnname || "小宇宙", // 栏目名字
        regionid: self.ruleForm.city || "0", // 区域id
        personname: self.ruleForm.name, // 拦住名
        idcard: self.ruleForm.idcard,
        type: columntype,
        idcardfrontimg: self.ruleForm.frontCredOnlineUrl, // 需改为线上地址
        idcardbackimg: self.ruleForm.backCredOnlineUrl,
        idcardfrontbyhandimg: self.ruleForm.frontHandCredOnlineUrl,
        businesslicense: licenseCode,
        businesslicenseimg: frontLicenseOnlineUrl,
        companyname: self.ruleForm.companyname,
        // class分类id
        classSet: self.ruleForm.classes.join(",")
      });
      if (res) {
        self.copyInviteValue = res.invite_code;
        self.copyInviteLink = server.invitepath + res.invite_code;
        self.innerVisible2 = true;
      }
    },
    // 默认操作
    async handleDefault(callback) {
      let self = this;
      await self.setSelfCommunity({
        communityid: self.row.objectID,
        flag: self.row.int_self === 1 ? 0 : 1
      });
    },
    // 添加默认
    async columnDefault(row) {
      let self = this;
      self.row = row;
      // do something
      let confirm;
      if (row.int_self === 1) {
        confirm = `是否取消“${row.name}”默认推荐状态？`;
      } else {
        confirm = `设置“${row.name}”为默认推荐状态？`;
      }
      this.$confirm(confirm, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await self.handleDefault();
          row.int_self = !row.int_self;
          await self.getCommunityList();
          self.outerVisible = false;
          self.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 禁言操作
    async handleBan() {
      let self = this;
      await self.ban({
        communityid: self.row.objectID,
        flag: self.row.bool_ban ? 0 : 1,
        content: ""
      });
    },
    // 禁言
    async columnShut(row) {
      // do something
      let self = this;
      self.row = row;
      let confirm = "";
      let confirmsure = "";
      if (!row.bool_ban) {
        confirm = `是否对”${row.name}“栏目禁言？`;
      } else {
        confirm = `是否对”${row.name}“栏目取消禁言？`;
      }
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.handleBan();
          row.bool_ban = !row.bool_ban;
          self.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //复制
    handleBtn(value) {
      let self = this;
      self.$com.clipBorad(value, () => {
        self.$message.success("复制成功！");
      });
    }
  }
};
</script>
<style>
.tj-eldialog .el-dialog {
  min-width: 450px;
}

.persmission-dialog .el-input {
  width: 200px;
  margin-right: 20px;
}

.list-filter .el-radio + .el-radio {
  margin-left: 10px;
}

.column-ruleForm .el-input {
  width: 240px;
}
</style>
<style scoped="scoped">
.block.cloumn-block {
  margin-bottom: 10px;
}

.labelname {
  margin-right: 10px;
  min-width: 100px;
}

.persmission-dialog > label {
  margin-bottom: 20px;
}

.tabs-manage {
  margin-top: 20px;
}

.manage-label {
  min-width: 140px;
}

.manage {
  margin-top: 20px;
}

.list-filter {
  margin-left: 30px;
}

.list-filter-2 {
  margin-right: 30px;
}

.list-filter-select {
  width: 120px;
}

.searchid {
  width: 220px;
  margin-right: 30px;
}

.search {
  margin: 20px 0;
}

.tobind {
  color: #108ee9;
  cursor: pointer;
}

.permission_title {
  position: relative;
}

.bind-prompt {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.result img {
  height: 50px;
}

.result p {
  margin-left: 30px;
}

.tj-invite-p {
  margin-bottom: 10px;
}
.covers {
  padding: 10px;
  background: #a71616;
  color: #fff;
}
</style>
