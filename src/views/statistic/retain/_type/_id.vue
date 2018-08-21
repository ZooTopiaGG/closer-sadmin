<template>
  <section id="permission" class="flex flex-v">
    <section class="permission_title">数据统计/推广数据/留存数据</section>
    <section class="permission_table flex-1">
      <section class="permission_table_top flex flex-pack-justify">
       
          <section class="flex flex-align-center">
            <span class="labelname">
              渠道名称：{{ channelName }}
            </span>
          </section>
          <section class="flex flex-align-center">
            <section class="block2">
              <el-date-picker v-model="dataValue" type="daterange" :default-time="['00:00:00', '23:59:59']" @change="handleSelect" align="right"
                unlink-panels value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </section>
          </section>
      </section>
      <section class="permission_table_content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed="left" label="首次使用时间">
            <template slot-scope="scope">
              <section>
                <el-button type="text" size="small">
                  <span>{{ scope.row.username }}</span>
                </el-button>
              </section>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="新增用户">
          </el-table-column>
          <el-table-column prop="createTime" label="1天后">
          </el-table-column>
          <el-table-column prop="description" label="2天后">
          </el-table-column>
          <el-table-column fixed prop="username" label="3天后">
          </el-table-column>
          <el-table-column prop="phone" label="4天后">
          </el-table-column>
          <el-table-column prop="createTime" label="5天后">
          </el-table-column>
          <el-table-column prop="description" label="6天后">
          </el-table-column>
          <el-table-column fixed prop="username" label="7天后">
          </el-table-column>
          <el-table-column prop="phone" label="14天后">
          </el-table-column>
          <el-table-column prop="createTime" label="30天后">
          </el-table-column>
        </el-table>
      </section>
    </section>
    <section class="block cloumn-block" >
      <el-pagination @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, prev, pager, next, jumper"
        :total="10">
      </el-pagination>
    </section>
  </section>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      // 分页
      pagenum: 1,
      pagesize: 10,
      planTitle: "新建推广计划",
      // 日期选择
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          username: "360phone",
          phone: "1949494944",
          createTime: "2018.08.07",
          description: "that is impossiable"
        }
      ],
      // 绑定选择到的日期 数组
      dataValue: "",
      channelName: "应用宝商店"
    };
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${this.pagenum}`);
    },
    handleSelect() {
      console.log(`当前时间: ${this.dataValue}`);
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
.channelinput {
  width: 300px;
}
.list-filter-select {
  max-width: 100px;
  margin-right: 20px;
}

.user_phone {
  margin-right: 20px;
  max-width: 200px;
}

.permission_table_middle {
  height: 30px;
  background: #fff;
  padding: 0 20px;
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


