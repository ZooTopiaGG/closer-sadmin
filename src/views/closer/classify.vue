<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">贴近号管理 / 栏目分类</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <span class="labelname">
            分类名称
          </span>
          <el-input v-model="closer_name" placeholder="请输入分类名称" @keyup.enter.native="searchCloser">
            <el-button slot="append" @click="searchCloser" icon="el-icon-search"></el-button>
          </el-input>
        </section>
        <section class="flex flex-align-center">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addCloser">新增分类</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="closerList.data" style="width: 100%">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="class_name" label="分类名称">
          </el-table-column>
          <el-table-column prop="community_count" label="栏目数量">
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="updateCloser(scope.row)">编辑</el-button>
              <el-button type="text" size="medium" @click="delCloser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <!-- <section class="block cloumn-block" v-if="closerList.count > 0">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="closerList.count">
      </el-pagination>
    </section> -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <section slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </section>
    </el-dialog>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("closer", ["closerList"])
  },
  data() {
    return {
      selectpara: {
        isAll: 1
      },
      closer_name: "",
      // 分页
      pagenum: 1,
      pagesize: 10,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: ""
      },
      title: "新增分类",
      optype: 0,
      updateRow: {}
    };
  },
  created() {
    this.selectAll({
      isAll: 1
    });
  },
  methods: {
    ...mapActions("closer", [
      "selectAll",
      "insertClass",
      "updateClass",
      "deleteClass",
      "selectClass"
    ]),
    searchCloser() {
      if (this.closer_name) {
        this.selectClass(this.closer_name);
      } else {
        return;
      }
    },
    addCloser() {
      this.title = "新增分类";
      this.optype = 0;
      this.form["name"] = "";
      this.dialogFormVisible = true;
    },
    updateCloser(row) {
      this.title = "编辑分类";
      this.optype = 1;
      this.updateRow = row;
      this.form["name"] = row.class_name;
      this.dialogFormVisible = true;
    },
    async save() {
      let self = this,
        res;
      if (!self.form.name) {
        self.$meesage.warning("分类名称不能为空！");
        return;
      }
      if (self.optype === 0) {
        // 新增
        res = await self.insertClass({
          class_name: self.form["name"]
        });
      } else {
        // 修改
        res = await self.updateClass({
          class_name: self.form["name"],
          class_id: self.updateRow.id
        });
      }
      if (res) {
        await self.selectAll(self.selectpara);
        self.dialogFormVisible = false;
      }
    },
    async delCloser(row) {
      let self = this;
      if (row.community_count > 0) {
        self.$meesage.warning("该分类下已经有栏目了，不能删除！");
        return;
      }
      self
        .$confirm(`此操作将删除${row.class_name}分类，是否继续？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.del(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async del(row) {
      await this.deleteClass({
        class_id: row.id
      });
      await this.selectAll(this.selectpara);
    }
  },
  mounted() {}
};
</script>
<style scoped="scoped">
.labelname {
  margin-right: 10px;
  min-width: 60px;
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
