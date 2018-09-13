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
              <el-tag type="success" class="tags" style="width: 65px;padding: 0;box-sizing: initial;text-align:center;" closable @close="handleClose(props.item)">{{props.item}}</el-tag>
            </template>
          </grid>
        </section>
        <section class="flex flex-align-center">
          <el-button type="primary" @click="publishCloser">发 布</el-button>
        </section>
      </section>
      <section class="permission_table_content">
        <el-checkbox-group 
          @change="handleChange"
          v-model="classifies">
          <el-checkbox  style="width: 33.33%;margin: 0 0px 10px 0" v-for="cl in closerList.data" :label="cl.class_name" :key="cl.id">{{cl.class_name}} <span style="margin-left: 40px">{{ cl.community_count }}个栏目</span></el-checkbox>
        </el-checkbox-group>
      </section>
    </section>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("closer", ["closerList", "zeroList"])
  },
  data() {
    return {
      selectpara: {
        isAll: 1
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
      updateRow: {},
      publishArr: []
    };
  },
  created() {
    this.selectAll({
      isAll: 1
    });
  },
  methods: {
    ...mapActions("closer", ["selectAll", "updateClassStatus", "selectClass"]),
    handleChange() {
      this.publishArr = this.classifies;
    },
    handleClose(item) {
      this.classifies.splice(this.classifies.indexOf(item), 1);
    },
    async sort(event) {
      console.log(event);
      let arr = await event.items.map(x => {
        return x.item;
      });
      this.publishArr = arr;
    },
    searchCloser() {
      if (this.closer_name) {
        this.selectClass(this.closer_name);
      } else {
        return;
      }
    },
    async publishCloser() {
      let arr = await this.publishArr.map(x => {
        this.closerList.data.map(y => {
          if (x === y.class_name) {
            x = y.id;
          }
        });
        return x;
      });
      let newarr = await arr.join(",");
      await this.updateClassStatus({
        class_ids: newarr,
        status: 0
      });
    }
  },
  watch: {
    zeroList(newVal, oldVal) {
      this.classifies = newVal;
      this.publishArr = newVal;
    }
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
.tags {
  position: relative;
}
.tags .el-tag__close {
  position: absolute;
  top: -7px;
  right: -6px;
}
.tags.el-tag--success .el-tag__close {
  border: 1px solid #67c23a;
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
