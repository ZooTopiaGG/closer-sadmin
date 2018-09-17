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
        <section class="flex flex-align-center" style="width: 400px;margin-bottom:20px;">
          <span class="labelname">
            分类名称
          </span>
          <el-input v-model="closer_name" placeholder="请输入分类名称" @keyup.enter.native="searchCloser">
            <el-button slot="append" @click="searchCloser" icon="el-icon-search"></el-button>
          </el-input>
          <section class="flex flex-align-center" style="margin-left: 10px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
        </section>
        <section v-if="searchCloserList.data.length > 0 && isSearch">
          <section class="br2">搜索结果：</section>
          <el-checkbox-group 
            @change="handleChange2" 
            class="br"
            v-model="searchClassifies">
            <el-checkbox  style="width: 33.33%;margin: 0 0px 10px 0" v-for="cl in searchCloserList.data" :label="cl.class_name" :key="cl.id">{{cl.class_name}} <span style="margin-left: 40px">{{ cl.community_count }}个栏目</span></el-checkbox>
          </el-checkbox-group>
        </section>
        <section v-else-if="isSearch" class="br">暂无数据</section>
        <section class="br2">所有分类：</section>
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
    ...mapState("closer", ["closerList", "zeroList", "searchCloserList"])
  },
  data() {
    return {
      selectpara: {
        isAll: 1
      },
      closer_name: "",
      classifies: [],
      searchClassifies: [],
      isSearch: false,
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
      publishArr: [],
      _search: [],
      _classSearch: []
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
      "updateClassStatus",
      "selectClass",
      "selectClassLike2"
    ]),
    differenceWith(arr, arr2, comp) {
      return arr.filter(a => !arr2.find(b => comp(a, b)));
    },
    // 这个逻辑自己都看不懂～～～～～
    async handleChange(val) {
      var _diff = [],
        self = this;
      // 当下面部分的checkbox 变化的时候 监听 ，如果上一次的值的长度大于这次的，说明是在删除分类
      if (self._classSearch && self._classSearch.length > val.length) {
        // 通过数组比对 找出变化的哪一个值
        _diff = await self.differenceWith(
          self._classSearch,
          val,
          (a, b) => a == b
        );
        // 在另外的一个列表 进行同步更新
        self.searchClassifies.splice(
          self.searchClassifies.indexOf(_diff[0]),
          1
        );
        self._search = self.searchClassifies;
      } else {
        val.map(x => {
          self.searchCloserList.data.map(y => {
            if (x === y.class_name) {
              self.searchClassifies.push(y.class_name);
              // 数组去重
              self.searchClassifies = [...new Set(self.searchClassifies)];
              self._search = self.searchClassifies;
            }
          });
        });
      }
      self._classSearch = val;
      self.publishArr = self.classifies;
    },
    async handleChange2(val) {
      var _diff = [],
        self = this;
      if (self._search && self._search.length > val.length) {
        _diff = await self.differenceWith(self._search, val, (a, b) => a == b);
        self.classifies.splice(self.classifies.indexOf(_diff[0]), 1);
        self._classSearch = self.classifies;
      } else {
        self.classifies = self.classifies.concat(self.searchClassifies);
        self.classifies = [...new Set(self.classifies)];
        self._classSearch = self.classifies;
      }
      self._search = val;
      self.publishArr = self.classifies;
    },
    handleClose(item) {
      // console.log("sort==", item);
      // return;
      let self = this;
      self.classifies.splice(self.classifies.indexOf(item), 1);
      self.searchClassifies.splice(self.searchClassifies.indexOf(item), 1);
    },
    clearSearch() {
      let self = this;
      self.closer_name = "";
      self.isSearch = false;
    },
    async sort(event) {
      let arr = await event.items.map(x => {
        return x.item;
      });
      this.publishArr = arr;
    },
    async searchCloser() {
      let self = this;
      if (self.closer_name) {
        self.isSearch = true;
        let res = await self.selectClassLike2({
          class_name: self.closer_name
        });
        if (res.length > 0) {
          self.searchClassifies = res;
          self._search = res;
        }
      } else {
        return;
      }
    },
    async publishCloser() {
      let self = this;
      let arr = await self.publishArr.map(x => {
        self.closerList.data.map(y => {
          if (x === y.class_name) {
            x = y.id;
          }
        });
        return x;
      });
      let newarr = await arr.join(",");
      await self.updateClassStatus({
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
  top: -8px;
  right: -8px;
}
</style>

<style scoped="scoped">
.br {
  margin-bottom: 20px;
}
.br2 {
  margin-bottom: 10px;
}
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
