(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d4d4"],{aa88:function(e,t,a){"use strict";var r=a("bacd"),n=a.n(r);n.a},bacd:function(e,t,a){},cca0:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loadingAvatarUpload,expression:"loadingAvatarUpload",modifiers:{body:!0}}],staticClass:"flex flex-v",attrs:{id:"permission"}},[a("section",{staticClass:"permission_title"},[e._v("成都土著活动")]),a("section",{staticClass:"permission_table",staticStyle:{"padding-bottom":"80px"}},[a("section",{staticClass:"permission_table_top flex flex-pack-justify flex-align-center"},[a("section",{staticClass:"flex flex-1"}),a("section",{staticClass:"flex flex-align-center"},[a("el-upload",{staticClass:"upload-demo flex flex-align-center flex-pack-center",attrs:{headers:e.headers,action:e.uploadUrl,"on-error":e.handleError,"on-success":e.handleFileSuccess,"before-upload":e.beforeFileUpload,"file-list":e.fileList}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传配置")])],1)],1)]),a("section",{staticClass:"permission_table_content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.questionList.data}},[a("el-table-column",{attrs:{prop:"index",label:"序号",width:"80"}}),a("el-table-column",{attrs:{label:"题目信息"}},[a("el-table-column",{attrs:{prop:"topic",label:"题目",width:"120"}}),a("el-table-column",{attrs:{prop:"diffcult",label:"难度",width:"120"}}),a("el-table-column",{attrs:{label:"答案列表"}},[a("el-table-column",{attrs:{prop:"answerA",label:"答案A"}}),a("el-table-column",{attrs:{prop:"answerB",label:"答案B"}}),a("el-table-column",{attrs:{prop:"answerC",label:"答案C"}}),a("el-table-column",{attrs:{prop:"answerD",label:"答案D"}})],1)],1)],1)],1)]),a("section",{staticClass:"fixedBottom flex flex-align-center flex-pack-center"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.uploadAnswer}},[e._v("保 存")]),a("el-button",{attrs:{size:"small"},on:{click:e.back}},[e._v("返 回")])],1)])},n=[],i=(a("96cf"),a("3040")),s=a("c93e"),o=a("2f62"),l={computed:Object(s["a"])({headers:function(){return!!this.$store.state.token&&{Authorization:"CloserSysAuth ".concat(this.$store.state.token)}},authUser:function(){return!!this.$store.state.authUser&&JSON.parse(this.$store.state.authUser)}},Object(o["c"])("activity_question",{questionList:function(e){return e.questionList}})),data:function(){return{uploadUrl:"".concat(api.filePath).concat(api.file),radioRecord:"topic",row:{},pagenum:1,pagesize:10,fileList:[],fileOnlineUrl:"",loadingAvatarUpload:!1}},created:function(){var e={activityId:this.$route.query.id};this.getQuestionList(e)},methods:Object(s["a"])({},Object(o["b"])("activity_question",["getQuestionList","localQuestionList","uploadQuestions"]),{handleSelect:function(e){this.radioRecord=e},handleError:function(e){this.$message.error("Network Error!")},back:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,!t.isChange){e.next=5;break}t.$confirm("已上传了配置文档尚未保存，确认返回？","提示",{confirmButtonText:"保存",cancelButtonText:"返回",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.uploadAnswer();case 2:case"end":return e.stop()}},e,this)}))).catch(function(){t.goback()}),e.next=7;break;case 5:return t.goback(),e.abrupt("return");case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),uploadAnswer:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,t.loadingAvatarUpload=!0,t.fileOnlineUrl){e.next=6;break}return t.$message.warning("请先上传配置！"),t.loadingAvatarUpload=!1,e.abrupt("return");case 6:return e.next=8,t.uploadQuestions({questionFileUrl:t.fileOnlineUrl,activityId:t.$route.query.id});case 8:t.loadingAvatarUpload=!1;case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),handleFileSuccess:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,a,r){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=this,e.prev=1,0!==t.code){e.next=11;break}return n.fileList=r.slice(-1),n.fileOnlineUrl=t.result.url,e.next=7,n.localQuestionList({raw:a.raw});case 7:n.loadingAvatarUpload=!1,n.radioRecord="topic",e.next=12;break;case 11:n.$message.error(t.result);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](1),n.$message.error(e.t0);case 17:case"end":return e.stop()}},e,this,[[1,14]])}));return function(t,a,r){return e.apply(this,arguments)}}(),beforeFileUpload:function(e){var t=this,a="text/csv"===e.type;t.loadingAvatarUpload=!0;var r=e.size/1024/1024<1;return a||(t.$message.error("上传文件只能是 csv 文件!"),t.loadingAvatarUpload=!1),r||(t.$message.error("上传文件大小不能超过 1M!"),t.loadingAvatarUpload=!1),a&&r}})},c=l,u=(a("aa88"),a("2877")),p=Object(u["a"])(c,r,n,!1,null,"b976d42a",null);p.options.__file="config.vue";t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-d4d4.25668db7.js.map