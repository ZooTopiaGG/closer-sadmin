<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">权限设置</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            用户（员工）手机号
          </span>
          <el-input v-model="state4" maxlength="11" placeholder="请输入用户手机号" @keyup.enter.native="bindSearch">
            <el-button slot="append" @click="bindSearch" icon="el-icon-search"></el-button>
          </el-input>
        </section>
        <el-dialog :title="title" :visible.sync="outerVisible">
          <el-form class="dialog-content" :disabled="disabled">
            <!-- 搜索信息 operationtype判断操作类型 0添加1修改2查看-->
            <section v-if="operationtype === 0">
              <section class="persmission-dialog flex flex-align-center">
                <span class="dialog-label">手机号：</span>
                <el-input placeholder="请输入手机" maxlength="11" prefix-icon="el-icon-phone" v-model="phonenum">
                </el-input>
                <el-button class="dialog-sure" @click="searchadminbyphone">确 定</el-button>
              </section>
              <section v-if="nosearch">
                <section v-if="searchuserinfo" class="searchtrue flex flex-align-center">
                  <el-checkbox v-model="checked" disabled></el-checkbox>
                  <span class="searchname">掌声</span>
                  <span>122923993249</span>
                </section>
                <section v-else class="searchtrue flex flex-align-center flex-pack-around">
                  <span class="searcherror">用户不存在</span>
                </section>
              </section>
            </section>
            <section v-else>
              <section class="persmission-dialog flex flex-v">
                <label class="flex flex-align-center">
                  <span class="dialog-label">用户名：</span>
                  <el-input  maxlength="20" :disabled="username_visible" v-model="u_username">
                  </el-input>
                  <el-button v-if="operationtype === 1" type="text" @click="username_visible = false">修改</el-button>
                </label>
                <label class="flex flex-align-center">
                  <span class="dialog-label">手机号：</span>
                  <el-input maxlength="11" :disabled="phone_visible" v-model="u_phone">
                  </el-input>
                  <el-button v-if="operationtype === 1" type="text" @click="phone_visible = false">修改</el-button>
                </label>
              </section>
            </section>
            <!-- 权限信息 根据权限设置可用与不可用 查看只显示拥有的权限-->
            <el-tabs v-model="activeName" class="tabs-manage">
              <el-tab-pane label="Boss" name="Boss" v-if="authUser && authUser.type === 1">
                <section class="role-manage manage flex">
                  <span class="manage-label">角色管理权限：</span>
                  <el-checkbox-group :max="1" v-model="checkListPermission">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.permission" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="city-manage manage flex">
                  <span class="manage-label">城市管理权限：</span>
                  <el-checkbox-group v-model="checkListCity" :max="1">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.city" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="city-column-manage manage flex">
                  <span class="manage-label">城市栏目管理员：</span>
                  
                  <el-select v-model="checkListColumn" class="region_list" multiple placeholder="请选择">
                    <el-option
                      v-for="item in regionlist"
                      :key="item.region_id"
                      :label="item.region_name"
                      :value="item.region_id">
                    </el-option>
                  </el-select>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">财务管理：</span>
                  <el-checkbox-group :max="1" v-model="checkListFinance">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.finance" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="logo-manage manage flex">
                  <span class="manage-label">操作日志：</span>
                  <el-checkbox-group v-model="checkListLog" :max="1">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.log" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">数据统计：</span>
                  <el-checkbox-group :max="1" v-model="checkListData">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.data" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">产品管理员权限：</span>
                  <el-checkbox-group :max="1" v-model="checkListNotice">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.notice" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">配置管理权限：</span>
                  <el-checkbox-group :max="1" v-model="checkListConfig">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.config" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
              </el-tab-pane>
              <el-tab-pane label="其他" name="其他">
                <section class="content-manage manage flex flex-align-center">
                  <span class="manage-label">内容审核权限：</span>
                  <section class="flex flex-v">
                    <el-select v-model="checkListColumn2" multiple placeholder="请选择" @change="handleSelect1">
                    <el-option
                      v-for="item in regionlist"
                      :key="item.region_id"
                      :label="item.region_name"
                      :value="item.region_id">
                    </el-option>
                  </el-select>
                  <el-checkbox-group v-model="checkContent" :max="1" v-show="blurCheckRegion">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.content" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                  </section>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">活动管理：</span>
                  <el-checkbox-group :max="1" v-model="checkListActivity">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.activity" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">活动数据：</span>
                  <el-checkbox-group v-model="checkListActivityData">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.activity_data" v-if="item.permissions === 'activity_data_view'" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
                <section class="role-manage manage flex">
                  <span class="manage-label">通知管理：</span>
                  <el-checkbox-group :max="1" v-model="checkListNotice">
                    <el-checkbox :label="item.id" v-for="item in permissionlist.notice" :key="item.id">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
              </el-tab-pane>
            </el-tabs>
          </el-form>
          <section v-if="operationtype === 2" slot="footer" class="dialog-footer">
            <el-button type="primary" @click="outerVisible = false">确定</el-button>
          </section>
          <section v-else slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifyPermission">保 存</el-button>
          </section>
        </el-dialog>
        <!-- dialog.信息  添加账号 结束  -->

      </section>
      <!-- table 修改查看操作 -->
      <section class="permission_table_content">
        <el-table :data="userList.data" style="width: 100%">
          <el-table-column fixed prop="username" label="用户名">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="newUser" label="员工状态">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <section v-if="authUser && authUser.type === 1">
                <el-button type="text" size="medium" @click="permissionModify(scope.row, '修改')">修改</el-button>
                <el-button @click="permissionDelete(scope.row)" type="text" size="medium">删除</el-button>
              </section>
              <section v-else-if="authUser && authUser.permissions && authUser.permissions.permission">
                <el-button v-for="(item, index) in authUser.permissions.permission" type="text" :key="index" size="medium" @click="permissionModify(scope.row, item.name)">{{ item.name }}</el-button>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="userList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="userList.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "permission",
  computed: {
    authUser() {
      return this.$store.state.authUser;
    },
    ...mapState("permission", {
      userList: state => state.userList,
      searchuserinfo: state => state.searchuserinfo,
      permissionlist: state => state.permissionlist,
      regionlist: state => state.regionlist
    })
  },
  data() {
    return {
      // 查询参数
      getuserlist: {
        page: 0,
        count: 1,
        phone: ""
      },
      // 通过手机号查询 用户
      state4: "",
      operationtype: 0, // 0添加 1修改 2查看
      // 分页
      pagenum: 1,
      pagesize: 10,
      // dialog
      outerVisible: false,
      title: "添加账号",
      // 手机号验证
      phonenum: "",
      // 多选状态
      checked: true,
      nosearch: false,
      // 修改情况下
      scope_row: {},
      username_visible: true,
      phone_visible: true,
      u_username: "",
      u_phone: "",
      // tabs:
      activeName: "Boss",
      // 复选框
      blurCheckRegion: false,
      checkListCity: [],
      checkListColumn: [],
      checkListColumn2: [],
      checkListPermission: [],
      checkListLog: [],
      checkContent: [],
      checkListFinance: [],
      checkListData: [],
      checkListActivity: [],
      checkListActivityData: [],
      checkListNotice: [],
      checkListConfig: [],
      contentChecked: false,
      // 表单禁用
      disabled: false
    };
  },
  created() {
    let self = this;
    self.getuserlist = {
      page: self.pagenum,
      count: self.pagesize,
      phone: self.u_phone
    };
    self.getUserList(self.getuserlist);
  },
  methods: {
    ...mapActions("permission", [
      "getUserList",
      "delUserInfo",
      "updateUserInfo",
      "getMenuList",
      "getRegionList"
    ]),
    bindSearch() {
      this.pagenum = 1;
      this.searchadminlistbyphone();
    },
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.u_phone = "";
      this.getuserlist["page"] = val;
      this.getuserlist["phone"] = "";
      this.getUserList(this.getuserlist);
    },
    handleSelect1() {
      this.blurCheckRegion = this.checkListColumn2.length > 0 ? true : false;
    },
    // 点击删除操作
    permissionDelete(row) {
      let self = this;
      let confirm = `确认删除？`;
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.deleteUser(row);
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async deleteUser(row) {
      let self = this;
      let res = await self.delUserInfo({
        userId: row.id
      });
      if (res) {
        self.u_phone = "";
        self.pagenum = 1;
        self.getuserlist["page"] = self.pagenum;
        self.getuserlist["phone"] = "";
        await self.getUserList(self.getuserlist);
      }
    },
    // 获取权限列表, 城市列表
    async getPermissionList() {
      let self = this;
      await self.getMenuList({
        keywords: "",
        pagenum: 1,
        pagesize: 100 // 城市列表
      });
    },
    // 点击修改操作
    async permissionModify(row, textType) {
      let self = this;
      // 先清空权限 列表 再重新赋值 避免数据干扰
      self.username_visible = true;
      self.phone_visible = true;
      self.checkListColumn = [];
      self.checkListPermission = [];
      self.checkListData = [];
      self.checkListActivity = [];
      self.checkListActivityData = [];
      self.checkListNotice = [];
      self.checkListConfig = [];
      self.checkListLog = [];
      self.checkListCity = [];
      self.checkContent = [];
      self.checkListFinance = [];

      self.scope_row = row;
      await self.getPermissionList();
      self.u_username = row.username;
      self.u_phone = row.phone;
      if (JSON.stringify(row.permissions) != "{}") {
        // 权限管理
        if (row.permissions.permission) {
          self.checkListPermission = row.permissions.permission.map(x => {
            return x.id;
          });
        }
        // 城市管理
        if (row.permissions.city) {
          self.checkListCity = row.permissions.city.map(x => {
            return x.id;
          });
        }
        if (self.checkListColumn2.length > 0) {
          // 内容审核
          if (row.permissions.content) {
            self.checkContent = row.permissions.content.map(x => {
              return x.id;
            });
          }
        } else {
          // 没有城市权限， 是没有审核或者工作量查看权限
          self.checkContent = [];
        }
        // 城市栏目
        if (row.columnCity) {
          self.checkListColumn = JSON.parse(row.columnCity);
        }
        // 财务管理
        if (row.permissions.finance) {
          self.checkListFinance = row.permissions.finance.map(x => {
            return x.id;
          });
        }
        // 操作日志
        if (row.permissions.log) {
          self.checkListLog = row.permissions.log.map(x => {
            return x.id;
          });
        }
        // 数据统计
        if (row.permissions.data) {
          self.checkListData = row.permissions.data.map(x => {
            return x.id;
          });
        }
        // 活动管理
        if (row.permissions.activity) {
          self.checkListActivity = row.permissions.activity.map(x => {
            return x.id;
          });
        }
        // 活动数据
        if (row.permissions.activity_data) {
          self.checkListActivityData = row.permissions.activity_data.map(x => {
            return x.id;
          });
        }
        // 通知管理
        if (row.permissions.notice) {
          self.checkListNotice = row.permissions.notice.map(x => {
            return x.id;
          });
        }
        // 配置管理
        if (row.permissions.config) {
          self.checkListConfig = row.permissions.config.map(x => {
            return x.id;
          });
        }
      }
      if (textType === "修改") {
        self.title = "修改账号";
        self.operationtype = 1;
        self.disabled = false;
      } else {
        self.disabled = true;
        self.title = "查看账号";
        self.operationtype = 2;
      }
      self.outerVisible = true;
    },
    // 修改并保存用户权限信息
    async modifyPermission() {
      let self = this;
      // checkListLog, checkListCity, checkListPermission, checkContent
      let arr = await self.checkListPermission.concat(
        self.checkListCity,
        self.checkListFinance,
        self.checkListLog,
        self.checkListData,
        self.checkListActivity,
        self.checkListActivityData,
        self.checkListNotice,
        self.checkListConfig,
        self.checkContent
      );
      if (!$async.isPhoneNum(self.u_phone)) {
        self.$message.error("手机号格式错误！");
        return;
      }
      let res = await self.updateUserInfo({
        id: self.scope_row.id,
        phone: self.u_phone,
        username: self.u_username,
        columnCity: self.checkListColumn,
        permissions: arr,
        citys: self.checkListColumn2
      });
      if (res) {
        self.outerVisible = false;
        self.getuserlist["page"] = self.pagenum;
        self.getuserlist["phone"] = "";
        await self.getUserList(self.getuserlist);
      }
    },
    // 通过手机号查询信息(添加账号)
    async searchadminbyphone() {
      let self = this;
      if (self.phonenum == "") {
        self.$message.warning("请输入手机号");
        return;
      }
      if (!$async.isPhoneNum(self.phonenum)) {
        self.$message.warning("手机号格式不对");
        return;
      }
      let res = await searchUser({
        phone: self.phonenum
      });
      if (res) {
        self.nosearch = true;
      }
    },
    // 通过手机号查询列表
    async searchadminlistbyphone() {
      let self = this;
      if (self.state4 != "") {
        if (!$async.isPhoneNum(self.state4)) {
          self.$message.warning("手机号格式不对");
          return;
        }
      }
      self.u_phone = self.state4;
      self.getuserlist["page"] = self.pagenum;
      self.getuserlist["phone"] = self.u_phone;
      await self.getUserList(self.getuserlist);
    }
  },
  mounted() {
    this.activeName =
      this.authUser && this.authUser.type === 1 ? "Boss" : "其他";
  }
};
</script>
<style>
.persmission-dialog .el-input {
  width: 200px;
  margin-right: 20px;
}
</style>
<style scoped="scoped">
.region_list {
  width: 300px;
  max-width: 300px;
}
.labelname {
  margin-right: 10px;
  min-width: 140px;
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

.dialog-sure {
  margin-left: 20px;
}

.searchtrue {
  height: 70px;
}

.searchname {
  margin: 0 40px;
}

.searcherror {
  color: red;
}
</style>
