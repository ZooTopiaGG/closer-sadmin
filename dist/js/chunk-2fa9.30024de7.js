(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2fa9"],{7424:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"wait"},[e._v("功能暂未开发，敬请期待！")])},r=[],i=(n("7f7f"),n("96cf"),n("3040")),s={middleware:"auth",asyncData:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var n,a,r,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.app,a=t.error,e.prev=1,r={name:"",page:1,count:10,startTime:null,endTime:null},e.next=5,n.$axios.$post("".concat(api.promotion.activity_config_list),r);case 5:if(i=e.sent,0!==i.code){e.next=14;break}return console.log("logdata====",i),e.next=10,i.result.data.map(function(e){return e.imageUrl?e.newImageUrl=e.imageUrl:e.newImageUrl="-",e});case 10:return s=e.sent,e.abrupt("return",{res:{data:s,count:i.result.count}});case 14:a({message:"错误代码:".concat(i.code,", ").concat(i.result)});case 15:e.next=20;break;case 17:e.prev=17,e.t0=e["catch"](1),a({message:"".concat(e.t0)});case 20:case"end":return e.stop()}},e,this,[[1,17]])}));return function(t){return e.apply(this,arguments)}}(),computed:{headers:function(){return!!this.$store.state.token&&{Authorization:"CloserSysAuth ".concat(this.$store.state.token)}},authUser:function(){return!!this.$store.state.authUser&&JSON.parse(this.$store.state.authUser)}},data:function(){return{res:{data:[],count:""},searchname:"",pagenum:1,pagesize:10,planTitle:"新建推广计划",op:"",uploadUrl:"".concat(api.filePath).concat(api.file),pickerOptions2:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]},dataValue:"",outerVisible:!1,planForm:{activityid:"",fileOnlineUrl:""},stype:"",fileList:[],loadingAvatarUpload:!1}},methods:{handleRemove:function(e,t){console.log(e,t)},handlePreview:function(e){console.log(e)},beforeRemove:function(e,t){return this.$confirm("确定移除 ".concat(e.name,"？"))},handleFileSuccess:function(e,t,n){var a=this;try{0===e.code?(a.fileList=n.slice(-1),a.planForm.fileOnlineUrl="".concat(api.filePath).concat(e.result.url),console.log("self.fileOnlineUrl====",a.planForm.fileOnlineUrl)):a.$message.error(e.result)}catch(e){a.$message.error(e)}},beforeFileUpload:function(e){var t=this,n=e.type.indexOf("image")>-1,a=e.size/1024/1024<.8;return n||(t.$message.error("上传文件只能是 JSON 文件!"),t.loadingAvatarUpload=!1),a||(t.loadingAvatarUpload=!1,t.$message.error("上传文件大小不能超过 800kb!")),n&&a},addSetting:function(){var e=this;e.outerVisible=!0,e.planTitle="新建配置",e.planForm={activityid:"",fileOnlineUrl:""}},updateSetting:function(e){var t=this;if(t.outerVisible=!0,t.planTitle="修改配置",t.planForm={activityid:e.activityId,fileOnlineUrl:e.imageUrl},e.imageUrl){var n=[{name:e.imageUrl,url:e.imageUrl}];t.fileList=n.slice(-1)}else t.fileList=[]},sureAddSetting:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,t.planForm.activityid){e.next=4;break}return t.$message.warning("活动id不能为空！"),e.abrupt("return");case 4:if(t.planForm.fileOnlineUrl){e.next=7;break}return t.$message.warning("配置图片不能为空！"),e.abrupt("return");case 7:return e.prev=7,n={activityId:t.planForm.activityid,imageUrl:t.planForm.fileOnlineUrl},e.next=11,t.$axios.$post("".concat(api.promotion.activity_config_add),n);case 11:if(a=e.sent,0!==a.code){e.next=19;break}return t.$message.success("操作成功！"),e.next=16,t.getList();case 16:t.outerVisible=!1,e.next=20;break;case 19:t.$message.error(a.result);case 20:e.next=25;break;case 22:e.prev=22,e.t0=e["catch"](7),t.$message.error(e.t0);case 25:case"end":return e.stop()}},e,this,[[7,22]])}));return function(){return e.apply(this,arguments)}}(),spread:function(e){this.$router.push({path:"/statistic/spread/".concat(e.planid,"?type=").concat(e.name)})},retain:function(){this.$router.push({path:"/statistic/retain/channel/8asd19ds"})},getList:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,n,a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.prev=1,n={name:t.searchname,page:t.pagenum,count:t.pagesize,startTime:t.dataValue[0]||null,endTime:t.dataValue[1]||null},e.next=5,t.$axios.$post("".concat(api.promotion.activity_config_list),n);case 5:if(a=e.sent,0!==a.code){e.next=13;break}return e.next=9,a.result.data.map(function(e){return e.createTime=t.$com.createTime(e.createTime,"yy-mm-dd hh:MM"),e.imageUrl||(e.imageUrl="-"),e});case 9:r=e.sent,t.res={data:r,count:a.result.count},e.next=14;break;case 13:t.$message.error(a.result);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](1),t.$message.error(e.t0);case 19:case"end":return e.stop()}},e,this,[[1,16]])}));return function(){return e.apply(this,arguments)}}(),handleCurrentChange:function(e){this.pagenum=e,this.getList()},handleSelect:function(e){var t=this;t.getList()},handleSelectByTime:function(e){this.getList()}},beforeMount:function(){var e=this,t=this;t.res.data.map(function(n){return n.createTime=e.$com.createTime(n.createTime,"yy-mm-dd hh:MM"),t.res.data})},mounted:function(){}},c=s,o=(n("d3cf"),n("2877")),u=Object(o["a"])(c,a,r,!1,null,"1df72f9c",null);u.options.__file="index.vue";t["default"]=u.exports},a630:function(e,t,n){},d3cf:function(e,t,n){"use strict";var a=n("a630"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-2fa9.30024de7.js.map