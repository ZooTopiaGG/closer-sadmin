import Vue from 'vue';
import {
  mapActions,
  mapState
} from "vuex";
Vue.mixin({
  name: 'mixins',
  computed: {
    ...mapState("finance", ['searchCommunityList', 'withdrawList2csv', 'rechargeList2Csv']),
  },
  data() {
    return {
      timeout: null
    }
  },
  methods: {
    // 远程搜索
    ...mapActions("finance", ['searchCommunity', "withdrawAuthList2csv", "allRechargeList2csv", "rechargeSettingsApplyList2csv", "settingAuditList2csv", "subjectFeeList2csv", "userWalletDetail2csv"]),
    async querySearchAsync(queryString, cb) {
      await this.searchCommunity({
        communityName: queryString,
        page: 1,
        count: 100
      });
      var restaurants = this.searchCommunityList;
      let qs = await this.createStateFilter(queryString);
      var results = queryString ? restaurants.filter(qs) : restaurants;
      // return
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    async createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 导出数据
    async json2csv($arr, $key, $value, $head) {
      let self = this;
      if ($arr.length > 0) {
        JSonToCSV.setDataConver({
          data: $arr,
          fileName: `${$head}-${new Date().toLocaleString()}`,
          columns: {
            title: $key,
            key: $value,
            formatter: function (n, v) {
              if (n === 'createTime' || n === 'applyTime' || n === 'apply_time' || n === 'updateTime' || n === 'auditedTime' || n === 'auditTime' || n === "long_publish_time") return `Time: ${v}`;
              if (n === 'userPhone') return `Tel: ${v}`;
              if (n === 'certNo') return `Cert: ${v}`;
              if (n === 'payeeAccount') return `AliPay: ${v}`;
              if (!isNaN(Number(v)) && v.length > 11) return `Number: ${v}`;
            }
          }
        });
      }
    }
  }
})