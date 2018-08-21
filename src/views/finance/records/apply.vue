<template>
  <section id="record" class="flex flex-v">
    <section class="flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            栏目ID
          </span>
          <el-input v-model="columnid" maxlength="11" @keyup.enter.native="bindSearch" placeholder="请输入栏目ID">
            <el-button slot="append" icon="el-icon-search" @click="bindSearch"></el-button>
          </el-input>
          <el-select class='list-filter-select' @change="handleSelect" v-model="recordFinnace" placeholder="贴子状态">
            <el-option v-for="item in record.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </section>
      </section>
      <!-- table 改政策查看操作 -->
      <section class="permission_table_content">
        <el-table :data="rechargeList.data" style="width: 100%">
          <el-table-column fixed prop="communityName" label="栏目名称">
          </el-table-column>
          <el-table-column prop="communityId" label="栏目ID">
          </el-table-column>
          <el-table-column prop="fromUserName" label="申请人">
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
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("finance", ["rechargeList"])
  },
  data() {
    return {
      financepara: {
        page: 1,
        count: 7,
        toUid: null
      },
      recordFinnace: "充额度",
      record: {
        options: [
          {
            value: "改政策",
            label: "改政策"
          },
          {
            value: "充额度",
            label: "充额度"
          }
        ]
      },
      columnid: null,
      dialogTableVisible: false,
      pagenum: 1,
      pagesize: 7
    };
  },
  created() {
    this.allRechargeList(this.financepara);
  },
  methods: {
    ...mapActions("finance", ["allRechargeList", "rechargeSettingsApplyList"]),
    handleSelect(item) {
      this.pagenum = 1;
      if (this.recordFinnace === "改政策") {
        this.getModifyColumnList();
      } else {
        this.getApplyList();
      }
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      if (this.recordFinnace === "改政策") {
        this.getModifyColumnList();
      } else {
        this.getApplyList();
      }
    },
    bindSearch() {
      this.pagenum = 1;
      if (this.recordFinnace === "改政策") {
        this.getModifyColumnList();
      } else {
        this.getApplyList();
      }
    },
    // 获取改政策审核列表
    async getModifyColumnList() {
      let self = this;
      await self.rechargeSettingsApplyList({
        page: self.pagenum,
        count: self.pagesize,
        toUid: self.columnid,
        auditStatus: "all"
      });
    },
    // 获取充额度审核列表
    async getApplyList() {
      let self = this;
      self.financepara["page"] = self.pagenum;
      self.financepara["toUid"] = self.columnid;
      await self.allRechargeList(self.financepara);
    }
  }
};
</script>
<style scoped>
.labelname {
  margin-right: 10px;
  min-width: 65px;
}
.list-filter-select {
  margin-left: 20px;
}
</style>
