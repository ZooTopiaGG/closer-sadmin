(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7706"],{"044d":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"flex flex-v",attrs:{id:"permission"}},[a("div",{staticClass:"permission_title"},[e._v("城市管理")]),a("div",{staticClass:"permission_table flex-1"},[a("div",{staticClass:"permission_table_top flex flex-pack-justify"},[a("div",{staticClass:"flex flex-align-center"},[a("span",{staticClass:"labelname"},[e._v("\n          城市名称\n        ")]),a("el-input",{attrs:{placeholder:"请输入城市名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchCityByKeywords(t):null}},model:{value:e.inputCity,callback:function(t){e.inputCity=t},expression:"inputCity"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchCityByKeywords},slot:"append"})],1)],1),1===e.authUser.type?a("div",{staticClass:"flex flex-align-center"},[a("el-button",{staticClass:"text-button",on:{click:e.bindColumn}},[e._v("绑定发布公告栏目")]),a("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:e.cityAdd}},[e._v("添加城市")])],1):e._e(),a("el-dialog",{attrs:{title:e.title,visible:e.outerVisible},on:{"update:visible":function(t){e.outerVisible=t}}},[a("el-dialog",{staticClass:"preview",attrs:{width:"574px",title:"预 览",visible:e.innerVisible,"append-to-body":""},on:{"update:visible":function(t){e.innerVisible=t}}},[a("div",{staticClass:"preview-box",style:{width:"534px",height:"852px",backgroundImage:"url("+i("5846")+")",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center -70px",position:"relative",overflow:"hidden"}},[a("div",{staticClass:"feed-box"},[e.imageOnlineUrl?a("img",{staticClass:"img-box",attrs:{src:e.imageOnlineUrl,onerror:e.defaultErrorImg}}):a("img",{staticClass:"img-box",attrs:{src:i("c069")}}),a("div",{staticClass:"feed-example-box"},[a("div",{staticClass:"feed-example-circle"}),a("div",{staticClass:"feed-example flex flex-pack-justify"},[a("div",{staticClass:"feed-example-top flex flex-align-center"},[a("img",{attrs:{src:i("c069")}}),a("span",[e._v("深夜成都")])]),a("span",[e._v("3小时前")])]),a("div",{staticClass:"cover"},[a("img",{attrs:{src:i("c069")}})])])]),a("div",{attrs:{id:"lottie"}})])]),a("div",{staticClass:"dialog-content"},[a("el-form",{staticClass:"city-ruleform",attrs:{rules:e.rules,disabled:e.isdisabled}},[a("el-form-item",[a("div",{staticClass:"flex flex-align-center"},[a("span",{staticClass:"dialog-label"},[e._v("城市名称：")]),a("el-cascader",{attrs:{disabled:1!=e.authUser.type,options:e.options2,props:e.props,"show-all-levels":!1},on:{change:e.handleItemChange},model:{value:e.cityvalue2,callback:function(t){e.cityvalue2=t},expression:"cityvalue2"}})],1)]),a("el-form-item",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loadingAvatarUpload,expression:"loadingAvatarUpload",modifiers:{body:!0}}]},[a("div",{staticClass:"city-cell flex flex-align-start"},[a("span",{staticClass:"dialog-label"},[e._v("城市背景：")]),a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,"show-file-list":!1,"on-error":e.handleError,headers:e.headers,"on-change":e.handleAvatarChange,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),2!=e.operationtype?a("div",{staticClass:"prompt flex flex-v"},[a("span",{staticClass:"flex-1"}),a("span",[e._v("尺寸：750*930像素")]),a("span",[e._v("大小：不超过750kb")])]):e._e()],1)]),a("el-form-item",[a("div",{staticClass:"city-cell flex flex-align-start"},[a("span",{staticClass:"dialog-label"},[e._v("城市插画：")]),a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{drag:"",headers:e.headers,action:e.uploadUrl,"on-error":e.handleError,"on-success":e.handleFileSuccess,"before-upload":e.beforeFileUpload,"file-list":e.fileList}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或\n                    "),a("em",[e._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("上传文件不超过500kb")])])],1)])],1)],1),2==e.operationtype?a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.outerVisible=!1}}},[e._v("确 认")])],1):a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.preview}},[e._v("预 览")]),0===e.operationtype?a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保 存")])],1)],1),a("el-dialog",{attrs:{title:e.title,visible:e.outerVisible2},on:{"update:visible":function(t){e.outerVisible2=t}}},[a("div",{staticClass:"dialog-content"},[e.getBindColumn?a("div",{staticClass:"desc"},[a("span",[e._v("目前绑定的发公告栏目：")]),a("span",{staticClass:"bind_column"},[e._v(e._s(e.getBindColumn.name))])]):e._e(),a("div",{staticClass:"search flex flex-align-center"},[a("el-input",{staticClass:"searchid",attrs:{placeholder:"请输入栏目ID","suffix-icon":"el-icon-search"},model:{value:e.state5,callback:function(t){e.state5=t},expression:"state5"}}),a("el-button",{on:{click:e.searchBindColumn}},[e._v("确 定")])],1),null!=e.getSearchColumn?a("div",{staticClass:"result flex flex-align-center"},[a("el-checkbox",{model:{value:e.defaultchecked,callback:function(t){e.defaultchecked=t},expression:"defaultchecked"}}),a("p",[e._v(e._s(e.getSearchColumn.name))]),a("p",[e._v(e._s(e.getSearchColumn.objectID))]),a("p",[a("img",{staticClass:"logo",attrs:{src:e.getSearchColumn.blogo,onerror:e.defaultErrorImg}})]),e.getSearchColumn.tags&&e.getSearchColumn.tags.indexOf("announce-cover")>-1?a("p",{staticStyle:{color:"#f00"}},[e._v("已经是发公告栏目")]):e._e()],1):e._e()]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.outerVisible2=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.setBindColumn}},[e._v("确 定")])],1)])],1),a("div",{staticClass:"permission_table_content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.regionsList.data}},[a("el-table-column",{attrs:{prop:"region_id",label:"城市id"}}),a("el-table-column",{attrs:{prop:"region_name",label:"城市名称"}}),a("el-table-column",{attrs:{prop:"long_update_time",label:"更新时间"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"medium"},on:{click:function(i){e.cityModify(t.row)}}},[e._v("修改")])]}}])})],1)],1)]),e.regionsList.count>0?a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.pagenum,"page-size":e.pagesize,layout:"total, prev, pager, next, jumper",total:e.regionsList.count},on:{"current-change":e.handleCurrentChange}})],1):e._e()])},n=[],r=(i("96cf"),i("3040")),l=i("c93e"),s=[{label:"北京",cities:[{label:"北京"}]},{label:"天津",cities:[{label:"天津"}]},{label:"上海",cities:[{label:"上海"}]},{label:"重庆",cities:[{label:"重庆"}]},{label:"内蒙古自治区",cities:[{label:"呼和浩特"}]},{label:"新疆维吾尔自治区",cities:[{label:"乌鲁木齐"}]},{label:"广西省",cities:[{label:"南宁"}]},{label:"宁夏回族自治区",cities:[{label:"银川"}]},{label:"西藏自治区",cities:[{label:"拉萨"}]},{label:"黑龙江省",cities:[{label:"哈尔滨"}]},{label:"吉林省",cities:[{label:"长春"}]},{label:"辽宁省",cities:[{label:"沈阳"}]},{label:"河北省",cities:[{label:"石家庄"}]},{label:"山西省",cities:[{label:"太原"}]},{label:"江苏省",cities:[{label:"南京"}]},{label:"浙江省",cities:[{label:"杭州"}]},{label:"安徽省",cities:[{label:"合肥"}]},{label:"福建省",cities:[{label:"福州"}]},{label:"江西省",cities:[{label:"南昌"}]},{label:"山东省",cities:[{label:"济南"}]},{label:"河南省",cities:[{label:"郑州"}]},{label:"湖北省",cities:[{label:"武汉"}]},{label:"湖南省",cities:[{label:"长沙"}]},{label:"广东省",cities:[{label:"广州"},{label:"深圳"}]},{label:"海南省",cities:[{label:"海口"}]},{label:"四川省",cities:[{label:"成都"}]},{label:"贵州省",cities:[{label:"贵阳"}]},{label:"云南省",cities:[{label:"昆明"}]},{label:"陕西省",cities:[{label:"西安"}]},{label:"甘肃省",cities:[{label:"兰州"}]},{label:"青海省",cities:[{label:"西宁"}]},{label:"台湾省",cities:[{label:"台北"}]},{label:"香港特别行政区",cities:[{label:"香港"}]},{label:"澳门特别行政区",cities:[{label:"澳门"}]},{label:"小宇宙",cities:[{label:"小宇宙"}]}],o=s,c=i("2f62"),u={data:function(){return{regionslist:{keywords:"",pagenum:1,pagesize:10},defaultErrorImg:'this.src="'+i("c069")+'"',res:{},inputCity:"",addormodifyorinputcity:"",state5:"",outerVisible:!1,outerVisible2:!1,innerVisible:!1,title:"添加城市",pagenum:1,pagesize:10,defaultchecked:!0,operationtype:0,cityvalue:"小宇宙",cityvalue2:[],rowData:{},update_region_id:"",uploadUrl:"".concat(api.filePath).concat(api.file),loadingAvatarUpload:!1,imageUrl:"",imageOnlineUrl:"",fileOnlineUrl:"",fileList:[],isdisabled:!1,rules:{},imageSize:!0,options2:o,props:{value:"label",children:"cities"}}},computed:Object(l["a"])({},Object(c["c"])("city",{regionsList:function(e){return e.regionsList},getBindColumn:function(e){return e.getBindColumn},getSearchColumn:function(e){return e.getSearchColumn}}),{headers:function(){return{Authorization:"CloserSysAuth ".concat(this.$store.state.token)}},authUser:function(){return this.$store.state.authUser}}),methods:Object(l["a"])({},Object(c["b"])("city",["getRegionsList","setBindAnnounceCommunity","getBindAnnounceCommunity","addRegion","showCommunity","updateRegion","showRegion"]),{handleItemChange:function(e){e[1]?this.cityvalue=e[1]:this.cityvalue="小宇宙"},handleSizeChange:function(e){console.log("每页 ".concat(e," 条"))},handleCurrentChange:function(e){console.log("当前页: ".concat(e))},handleError:function(e){console.log("eerrr===",e),this.$message.error("Network Error!"),this.loadingAvatarUpload=!1},handleAvatarSuccess:function(e,t){var i=this;i.loadingAvatarUpload=!1;try{0===e.code?(i.$message.success("上传成功"),i.imageUrl=URL.createObjectURL(t.raw),i.imageOnlineUrl="".concat(api.filePath).concat(e.result.url),i.imageSize=750===e.result.attributes.dimensions.width&&930===e.result.attributes.dimensions.height,i.imageSize||i.$message.error("请根据提示上传符合标准尺寸的图片！")):i.$message.error(e.result)}catch(e){i.$message.error(e)}},handleAvatarChange:function(e,t){},beforeAvatarUpload:function(e){var t=this;t.loadingAvatarUpload=!0;var i=e.type.indexOf("image/")>-1,a=e.size/1024/1024<.75;return i||(t.$message.error("只能上传图片!"),t.loadingAvatarUpload=!1),a||(t.loadingAvatarUpload=!1,t.$message.error("上传图片大小不能超过 750kb!")),i&&a},handleFileSuccess:function(e,t,i){var a=this;try{0===e.code?(a.fileList=i.slice(-1),a.fileOnlineUrl="".concat(api.filePath).concat(e.result.url)):a.$message.error(e.result)}catch(e){a.$message.error(e)}},beforeFileUpload:function(e){var t=this,i="application/json"===e.type,a=e.size/1024/1024<.49;return i||(t.$message.error("上传文件只能是 JSON 文件!"),t.loadingAvatarUpload=!1),a||(t.loadingAvatarUpload=!1,t.$message.error("上传文件大小不能超过 500kb!")),i&&a},searchCityByKeywords:function(){this.pagenum=1,this.addormodifyorinputcity=this.inputCity,this.getCitylist()},getCitylist:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.regionslist["keywords"]=t.addormodifyorinputcity||"",t.regionslist["pagenum"]=t.pagenum,e.next=5,t.getRegionsList(t.regionslist);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),save:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,i,a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,t.cityvalue){e.next=4;break}return t.$message.warning("请选择城市!"),e.abrupt("return");case 4:if(t.imageOnlineUrl){e.next=7;break}return t.$message.warning("请上传城市封面图片!"),e.abrupt("return");case 7:if(t.imageSize){e.next=10;break}return t.$message.error("请根据提示上传符合标准尺寸的图片！"),e.abrupt("return");case 10:if(t.fileOnlineUrl){e.next=13;break}return t.$message.warning("请根据提示上传符合规则的城市插画!"),e.abrupt("return");case 13:if(0!==t.operationtype){e.next=26;break}return e.next=16,t.addRegion({name:t.cityvalue,cover:t.imageOnlineUrl,gif:t.fileOnlineUrl});case 16:if(i=e.sent,!i){e.next=24;break}return t.addormodifyorinputcity="",t.pagesize=10,t.pagenum=1,e.next=23,t.getCitylist();case 23:t.outerVisible=!1;case 24:e.next=37;break;case 26:return a=t.rowData.region_name===t.cityvalue?{regionid:t.update_region_id,cover:t.imageOnlineUrl,gif:t.fileOnlineUrl}:{regionid:t.update_region_id,name:t.cityvalue,cover:t.imageOnlineUrl,gif:t.fileOnlineUrl},e.next=29,t.updateRegion(a);case 29:if(n=e.sent,!n){e.next=37;break}return t.addormodifyorinputcity="",t.pagesize=10,t.pagenum=1,e.next=36,t.getCitylist();case 36:t.outerVisible=!1;case 37:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),cityDetails:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,i){var a,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=this,e.next=3,a.showRegion({regionid:t.region_id});case 3:n=e.sent,n&&(a.rowData=n.result,a.cityvalue=n.result.region_name,a.cityvalue2=[n.result.province,n.result.region_name],a.imageUrl=n.result.cover,r=[{name:n.result.gif,url:n.result.gif}],a.fileList=r.slice(-1),a.imageOnlineUrl=n.result.cover,a.fileOnlineUrl=n.result.gif);case 5:case"end":return e.stop()}},e,this)}));return function(t,i){return e.apply(this,arguments)}}(),cityLook:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=this,e.next=3,i.cityDetails(t);case 3:i.title="查看城市",i.outerVisible=!0,i.isdisabled=!0,i.operationtype=2;case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),cityAdd:function(){var e=this;e.title="添加城市",e.isdisabled=!1,e.outerVisible=!0,e.operationtype=0,e.cityvalue="小宇宙",e.cityvalue2=["小宇宙","小宇宙"],e.fileList=[],e.imageUrl="",e.imageOnlineUrl="",e.fileOnlineUrl=""},cityModify:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=this,e.next=3,i.cityDetails(t);case 3:i.title="修改城市",i.outerVisible=!0,i.isdisabled=!1,i.operationtype=1,i.update_region_id=t.region_id;case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),bindColumn:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.getBindAnnounceCommunity();case 3:i=e.sent,i&&(t.title="绑定发公告的栏目",t.outerVisible2=!0,t.operationtype=1);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),searchBindColumn:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.showCommunity({communityid:t.state5});case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),setBindColumn:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.setBindAnnounceCommunity({communityid:t.state5});case 3:i=e.sent,i&&(t.outerVisible2=!1);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),handleSelect:function(e){console.log(e)},preview:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,t.fileOnlineUrl&&t.imageOnlineUrl){e.next=4;break}return t.$message.warning("请上传城市封面或插画"),e.abrupt("return");case 4:t.innerVisible=!0,setTimeout(Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return $("#lottie").empty(),e.next=3,bodymovin.loadAnimation({container:document.querySelector("#lottie"),path:t.fileOnlineUrl,renderer:"svg",loop:!1,autoplay:!1,name:"Hello World"});case 3:e.sent;case 4:case"end":return e.stop()}},e,this)})),0);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}),created:function(){var e=this;e.getRegionsList(e.regionslist)}},d=u,p=(i("501e"),i("76f3"),i("2877")),g=Object(p["a"])(d,a,n,!1,null,"dccb36a4",null);g.options.__file="index.vue";t["default"]=g.exports},"1ac5":function(e,t,i){},"501e":function(e,t,i){"use strict";var a=i("1ac5"),n=i.n(a);n.a},5846:function(e,t,i){e.exports=i.p+"img/preview-mobile.971c6e6e.png"},"76f3":function(e,t,i){"use strict";var a=i("aa85"),n=i.n(a);n.a},aa85:function(e,t,i){},c069:function(e,t,i){e.exports=i.p+"img/default.623ab71b.jpeg"}}]);
//# sourceMappingURL=chunk-7706.9617979a.js.map