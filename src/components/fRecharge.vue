<template>
  <section id="permission" class="flex flex-v">    
    <section>
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="flex flex-align-center" style="margin-right: 15px;">
            <el-select class='list-filter-select' @change="handleSelectType" v-model="recharge_type" placeholder="全部结果">
              <el-option v-for="item in recharge_type_list" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </section>
          <section class="flex flex-align-center">
            <el-autocomplete
            v-model="columnName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入栏目名称"
            @select="handleSearch"
          ><el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-autocomplete>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
         <section class="flex flex-align-center">
          <section style="margin-left: 15px;">
            <el-button type="primary">导出数据</el-button>
          </section>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content" style="margin-top: 0;">
        <el-table :data="rechargeList.data" style="width: 100%">
          <el-table-column fixed prop="communityName" label="申请贴近号">
          </el-table-column>
          <el-table-column prop="communityId" label="贴近号ID">
          </el-table-column>
          <el-table-column prop="fromUserName" label="申请者昵称">
          </el-table-column>
          <el-table-column prop="rechargeAmt" label="一次性到账金额">
          </el-table-column>
          <el-table-column prop="totalAllowanceAmt" label="缓释金额">
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间">
          </el-table-column>
          <el-table-column prop="auditStatus" label="审核结果">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block" v-if="rechargeList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="rechargeList.count">
      </el-pagination>
    </section>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["rechargeList"]),
    authUser() {
      return this.$store.state.authUser;
    }
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 10,
        auditStatus: "apply"
      },
      columnid: "",
      columnName: '',
      pagenum: 1,
      pagesize: 10,
      dialogTableVisible: false,
      innerVisible: false,
      row: "",
      recharge_type: "",
      recharge_type_list: [
        {
          label: "全部结果",
          value: ""
        },
        {
          label: "审核失败",
          value: "fail"
        },
        {
          label: "审核成功",
          value: "success"
        }
      ]
    };
  },
  created() {
    this.allRechargeList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["allRechargeList"]),
    async handleSearch(item) {
      this.pagenum = 1;
      this.columnid = item.objectID;
      await this.handleSelect();
    },
    async handleSelect() {
      let self = this;
      self.financepara["page"] = self.pagenum || 1;
      self.financepara["auditStatus"] = self.recharge_type || "";
      self.financepara["uid"] = self.columnid || null;
      await self.allRechargeList(self.financepara);
    },
    async clearSearch() {
      this.pagenum = 1;
      this.recharge_type = "";
      this.columnid = null;
      this.columnName = '';
      await this.handleSelect();
    },
    async handleSelectType() {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async handleCurrentChange(val) {
      this.pagenum = val;
      await this.handleSelect();
    }
  }
};
</script>
<style type="text/css">
.userinfo .el-input .el-input__inner {
  width: 150px;
}
</style>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 65px;
}
.inputCode {
  width: 200px;
}
.userinfo .middle-label {
  width: 200px;
}
.userinfo .middle-label-2 {
  width: 215px;
}
.userinfo .long-label {
  width: 380px;
}

.hr {
  background-color: #e6e6e6;
  height: 1px;
  margin-top: 20px;
}
</style>
