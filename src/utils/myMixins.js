import Vue from 'vue';
import { mapActions, mapState } from "vuex";
Vue.mixin({
  name: 'mixins',
  computed: {
    ...mapState("finance", ['searchCommunityList']),
  },
  data() {
    return {
      timeout: null
    }
  },
  methods: {
    // 远程搜索
    ...mapActions("finance", ['searchCommunity']),
    async querySearchAsync(queryString, cb) {
      await this.searchCommunity({
        communityName: queryString,
        page:1,
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
  }
})