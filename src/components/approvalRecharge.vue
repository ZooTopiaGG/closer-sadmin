<template>
  <section id="permission" class="flex flex-v">    
    <section>
      <section class="permission_table_top flex flex-pack-justify">
        <section class="flex flex-align-center" style="margin-right:20px;">
          <section class="flex flex-align-center">
            <el-input v-model="columnid" placeholder="请输入栏目名称" @keyup.enter.native="handleSearch">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
          </section>
          <section class="flex flex-align-center" style="margin-left: 15px">
            <el-button type="text" @click="clearSearch">清除搜索</el-button>
          </section>
          <el-autocomplete
            v-model="columnName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect2"
          ></el-autocomplete>
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
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook(scope.row)" size="medium">查看号</el-button>
              <el-button type="text" @click="thenSureOrRefuse('success', scope.row)" size="medium">同意</el-button>
              <el-button type="text" @click="thenSureOrRefuse('fail', scope.row)" size="medium">拒绝</el-button>
            </template>
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
    ...mapState("finance", ["rechargeList", 'searchCommunityList']),
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
      recharge_type_list: [],
      restaurants: [],
      timeout: null,
      bb: []
    };
  },
  created() {
    this.allRechargeList(this.financepara);
  },
  mounted() {
    this.bb= this.loadAll();
  },
  methods: {
    ...mapActions("finance", ["allRechargeList", "rechargeAudit", 'searchCommunity']),
    loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
    // 远程搜索
    async querySearchAsync(queryString, cb) {
      console.log('queryString===', queryString);
      let restaurants2 = await this.searchCommunity({
        communityName: queryString,
        page:1,
        count: 100
      });
      console.log("bb====", this.bb);
      console.log("restaurants====", restaurants2);
      var restaurants = this.bb
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      console.log('results===', results)
      // return
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    async createStateFilter(queryString) {
      return (state) => {
        console.log('satate====', state)
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect2(item) {
      console.log('item===', item);
    },
    async handleSelect() {
      let self = this;
      self.financepara["page"] = self.pagenum || 1;
      await self.allRechargeList(self.financepara);
    },
    async clearSearch() {
      this.pagenum = 1;
      this.columnid = "";
      await this.handleSelect();
    },
    async handleSearch() {
      this.pagenum = 1;
      await this.handleSelect();
    },
    async handleCurrentChange(val) {
      this.pagenum = val;
      await this.handleSelect();
    },
    handleLook(row) {
      this.$router.push({
        path: `/finance/closer?type=info&id=${row.communityId}`
      });
    },
    // 同意拒绝审批 commit_apply recharge_audit
    async sureOrRefuse(type) {
      let self = this,
        res = false;
      res = await self.rechargeAudit({
        rechargeId: self.row.rechargeId,
        auditStatus: type
      });
      if (res) {
        self.innerVisible = false;
        self.dialogTableVisible = false;
        await self.handleSelect();
      }
    },
    // 同意或者拒绝
    async thenSureOrRefuse(type, row) {
      let self = this;
      self.row = row;
      let confirm;
      if (type === "fail") {
        confirm = `此操作将拒绝${self.row.communityName}的审批, 是否继续?`;
      } else {
        confirm = `此操作将同意${self.row.communityName}的审批, 是否继续?`;
      }
      self
        .$confirm(confirm, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await self.sureOrRefuse(type);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },
  destroyed() {
    clearInterval(this.timer);
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
