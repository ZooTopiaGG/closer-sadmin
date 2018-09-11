<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">贴近号管理 / 菜单管理</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center">
          <grid
            style="height: 30px;"
            :draggable="true"
            :sortable="true"
            :items="classifies"
            @sort="sort">
            <template slot="cell" scope="props">
              <!-- <div>{{props.item}}</div> -->
              <el-tag type="success" style="width: 70px;padding: 0;box-sizing: initial;text-align:center;" closable @close="handleClose(props.item)">{{props.item}}</el-tag>
            </template>
          </grid>
        </section>
        <section class="flex flex-align-center">
          <el-button type="primary" @click="addCloser">发 布</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <!-- <section class="flex flex-align-center" style="margin-bottom: 20px;">
          <span class="labelname">
            分类名称
          </span>
          <el-input v-model="closer_name" placeholder="请输入分类名称" @keyup.enter.native="searchCloser" style="width: 200px;">
            <el-button slot="append" @click="searchCloser" icon="el-icon-search"></el-button>
          </el-input>
        </section> -->
        <el-checkbox-group 
          @change="handleChange"
          v-model="classifies">
          <el-checkbox  style="width: 33.33%;margin: 0 0px 10px 0" v-for="cl in closerList.data" :label="cl.class_name" :key="cl.id">{{cl.class_name}} <span style="margin-left: 40px">{{ cl.community_count }}个栏目</span></el-checkbox>
        </el-checkbox-group>
        <section class="flex flex-align-center">
          <div class="flex-1"></div>
          <el-button type="primary" @click="addCloser">确 定</el-button>
        </section>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("closer", ["closerList"]),
    statusZero() {
      let arr = this.closerList.data.map(x => {
        if (x.status === 0) {
          return x;
        }
      });
      console.log("arr===", arr);
      return arr;
    }
  },
  data() {
    return {
      logpara: {
        page: 1,
        count: 10,
        phone: "",
        startTime: null,
        endTime: null
      },
      closer_name: "",
      classifies: [],
      items: [],
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
    this.selectAll();
  },
  methods: {
    ...mapActions("closer", [
      "selectAll",
      "insertClass",
      "updateClass",
      "deleteClass",
      "selectClass"
    ]),
    handleChange() {
      console.log(this.classifies);
    },
    handleClose(item) {
      console.log(item);
    },
    sort(event) {
      console.log("sort", event);
    },
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
        self.$message.warnning("分类名称不能为空！");
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
        await self.selectAll();
        self.dialogFormVisible = false;
      }
    },
    async delCloser(row) {
      let self = this;
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
      await this.selectAll();
    }
  },
  mounted() {
    console.log(this.statusZero);
  }
};
</script>
<style>
.v-grid-item-wrapper.v-grid-item-animate,
.v-grid-item-wrapper.v-grid-item-animate {
  width: auto !important;
  height: auto !important;
  margin-right: 20px;
}
</style>

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
