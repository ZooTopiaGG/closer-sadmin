(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24bd"],{"1b49":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"flex flex-v",attrs:{id:"permission"}},[i("section",{staticClass:"permission_title"},[e._v("内容审核")]),i("section",{staticClass:"permission_table flex-1"},[i("section",{staticClass:"permission_table_top flex flex-pack-justify"},[i("section",{staticClass:"flex flex-align-center"},[i("el-select",{staticClass:"list-filter-select",attrs:{placeholder:"贴子状态"},on:{change:e.handleSelect},model:{value:e.fliterVerify,callback:function(t){e.fliterVerify=t},expression:"fliterVerify"}},e._l(e.verify.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),i("section",{staticClass:"flex flex-align-center"},[i("el-input",{attrs:{placeholder:"请输入贴子标题全称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleSelect(t):null}},model:{value:e.seachbytitle,callback:function(t){e.seachbytitle=t},expression:"seachbytitle"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleSelect},slot:"append"})],1)],1)],1),i("section",{staticClass:"flex flex-align-center"},[i("el-select",{staticClass:"list-filter-select",attrs:{placeholder:"贴子状态"},on:{change:e.handleSelect},model:{value:e.fliterfeeds,callback:function(t){e.fliterfeeds=t},expression:"fliterfeeds"}},e._l(e.feeds.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1!=e.authUser.type?i("a",{staticClass:"yetread",attrs:{href:"javascript:;"},on:{click:e.read}},[e._v("已读条数："+e._s(e.readCount))]):e._e(),0===e.fliterVerify?i("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(t){e.recover(e.fliterVerify)}}},[e._v("普通回收站")]):i("el-button",{attrs:{icon:"el-icon-delete"},on:{click:function(t){e.recover(e.fliterVerify)}}},[e._v("精华回收站")])],1)]),e.readList.data.length>0?i("ul",{ref:"feedList",staticClass:"feed-list flex-1",attrs:{id:"feed"}},e._l(e.readList.data,function(t,a){return i("li",{key:a,staticClass:"feed-list-cell",attrs:{sub:t.subjectid,status:0===e.flag},on:{click:function(i){e.toFeeds(t.subjectid)}}},[i("section",{staticClass:"feed-box"},[i("section",{staticClass:"feed-cell-title flex flex-align-center flex-pack-justify"},[i("p",{staticClass:"flex"},[i("span",[e._v("更新于："+e._s(t.long_update_time))]),e._v("\n                 \n              "),0===e.flag?i("span",{staticClass:"isRead"},[e._v("已读")]):e._e()]),i("el-button",{on:{click:function(i){i.stopPropagation(),e.dropoff(t.subjectid,a,-1)}}},[e._v("删 除")])],1),t.report_list&&t.report_list.length>0?i("section",{staticClass:"hasreport flex flex-align-start"},[i("span",[e._v("投诉理由：")]),i("section",{staticClass:"report-list flex flex-v"},e._l(t.report_list,function(t,a){return i("span",{key:a},[e._v(e._s(t.reportContents)+"（"+e._s(t.reportCount)+"）")])}))]):e._e(),i("section",{staticClass:"feed-cell-content"},[i("section",{staticClass:"columnname flex flex-align-center"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.$com.makeFileUrl(t.blogo),expression:"$com.makeFileUrl(item.blogo)"}]}),i("span",{staticClass:"name text-ellipse flex-1"},[e._v(e._s(t.communityName))]),i("span",{staticClass:"time"},[e._v(e._s(t.long_create_time))])]),0===t.int_type?i("section",{staticClass:"feedmain"},[t.content.text?i("section",{staticClass:"feedtitle text-ellipse"},[e._v("\n                "+e._s(t.content.text)+"\n              ")]):e._e(),t.content.images&&1==t.content.images.length?i("section",{staticClass:"flex flex-pack-justify feedcontent"},e._l(t.content.images,function(t,a){return i("section",{key:a,staticClass:"feeder-img-list",staticStyle:{width:"100%",height:"100%"}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.$com.makeFileUrl(t.link),expression:"$com.makeFileUrl(img.link)"}],staticClass:"feed-cover-list",style:{display:"block",position:"relative",height:"400px"}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"gif"},[e._v("GIF图")]):e._e()])})):e._e(),t.content.images&&2==t.content.images.length?i("section",{staticClass:"flex flex-pack-justify feedcontent"},e._l(t.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:backgroundImage",value:e.$com.makeFileUrl(t.link),expression:"$com.makeFileUrl(img.link)",arg:"backgroundImage"}],key:a,staticClass:"feeder-img-list",style:{width:"50%",height:"0",paddingBottom:"50%",backgroundSize:"cover",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}},[t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"gif"},[e._v("GIF图")]):e._e()])})):e._e(),t.content.images&&3==t.content.images.length||t.content.images&&t.content.images.length>4?i("section",{staticClass:"flex feedcontent"},e._l(t.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:backgroundImage",value:e.$com.makeFileUrl(t.link),expression:"$com.makeFileUrl(img.link)",arg:"backgroundImage"}],key:a,staticClass:"feeder-img-list",style:{width:"33%",height:"0",paddingBottom:"33%",marginBottom:"0.5%",marginRight:"0.5%",backgroundSize:"cover",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}},[t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"gif"},[e._v("GIF图")]):e._e()])})):e._e(),t.content.images&&4===t.content.images?i("section",{staticClass:"flex flex-pack-justify feedcontent"},e._l(t.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:backgroundImage",value:e.$com.makeFileUrl(t.link),expression:"$com.makeFileUrl(img.link)",arg:"backgroundImage"}],key:a,staticClass:"feeder-img-list",style:{width:"49.5%",height:"0",paddingBottom:"49.5%",marginBottom:"1%",backgroundSize:"cover",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}},[t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"gif"},[e._v("GIF图")]):e._e()])})):e._e()]):1===t.int_type?i("section",{staticClass:"feedmain"},[i("section",{staticClass:"feedcontent"},[t.content.videos[0].width>t.content.videos[0].height?i("section",{directives:[{name:"lazy",rawName:"v-lazy:backgroundImage",value:e.$com.makeFileUrl(t.content.videos[0].imageUrl),expression:"$com.makeFileUrl(item.content.videos[0].imageUrl)",arg:"backgroundImage"}],staticClass:"feeds-video",style:{width:"100%",paddingBottom:100*t.content.videos[0].height/t.content.videos[0].width+"%",height:0}},[i("span",{staticClass:"icon-shipin-2"}),i("section",{staticClass:"duration flex flex-align-center flex-pack-center"},[i("span",[e._v("00:00/"+e._s(e.$com.toCurrent(t.content.videos[0].duration)))])])]):i("section",{directives:[{name:"lazy",rawName:"v-lazy:backgroundImage",value:e.$com.makeFileUrl(t.content.videos[0].imageUrl),expression:"$com.makeFileUrl(item.content.videos[0].imageUrl)",arg:"backgroundImage"}],staticClass:"feeds-video feeds-video-vertical",style:{width:400*t.content.videos[0].width/t.content.videos[0].height+"px",height:"400px"}},[i("span",{staticClass:"icon-shipin-2"}),i("section",{staticClass:"duration flex flex-align-center flex-pack-center"},[i("span",[e._v("00:00/"+e._s(e.$com.toCurrent(t.content.videos[0].duration)))])])])]),t.content.text?i("section",{staticClass:"feedtitle text-ellipse"},[e._v(e._s(t.content.text))]):e._e()]):2===t.int_type?i("section",{staticClass:"feedmain"},[t.cover?i("section",{staticClass:"feedcover flex"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.$com.makeFileUrl(t.cover),expression:"$com.makeFileUrl(item.cover)"}],style:{display:"block",position:"relative"}})]):e._e(),i("section",{staticClass:"feedtype"},[t.title?i("section",{staticClass:"feedtitle text-ellipse"},[e._v("\n                  "+e._s(t.title)+"\n                ")]):e._e(),t.content.summary?i("section",{staticClass:"feedcontent feedcontent2"},[e._v("\n                  "+e._s(t.content.summary)+"\n                ")]):e._e()])]):e._e(),i("section",{staticClass:"feeddata flex flex-pack-justify flex-align-center"},[i("label",{staticClass:"flex flex-align-center"},[i("i",{staticClass:"icon iconfont icon-share"}),i("span",[e._v(e._s(t.long_share))])]),i("label",{staticClass:"flex flex-align-center"},[i("i",{staticClass:"icon iconfont icon-message"}),i("span",[e._v(e._s(t.commentNumber))])]),i("label",{staticClass:"flex flex-align-center"},[i("i",{staticClass:"icon iconfont icon-upvote"}),i("span",[e._v(e._s(t.like))])])])])])])})):i("section",{staticClass:"nocon"},[e._v("\n      暂无贴子\n    ")]),i("section",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"}],staticClass:"loading",attrs:{"infinite-scroll-disabled":"busy",autoFill:!1,"infinite-scroll-distance":"10"}},[i("section",[e._v("拼命加载中...")])]),i("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("section",[i("p",[e._v("选择以下原因后删除：")]),i("el-checkbox-group",{staticClass:"dropreason flex",model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[i("el-checkbox",{attrs:{label:"垃圾营销"}}),i("el-checkbox",{attrs:{label:"不实信息"}}),i("el-checkbox",{attrs:{label:"有害信息"}}),i("el-checkbox",{attrs:{label:"违法信息"}}),i("el-checkbox",{attrs:{label:"淫秽色情"}}),i("el-checkbox",{attrs:{label:"人身攻击"}}),i("el-checkbox",{attrs:{label:"抄袭我的内容"}}),i("el-checkbox",{attrs:{label:"违规有奖活动"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.updateVerify}},[e._v("确 定")])],1)])],1)])},n=[],s=(i("ac6a"),i("3846"),i("96cf"),i("3040")),l=i("c93e"),c=i("2f62"),r={computed:Object(l["a"])({},Object(c["c"])("content",["readCount","readList","loading_text","busy"]),{authUser:function(){return this.$store.state.authUser}}),data:function(){return{getreadlist:{flag:0,pagenum:1,pagesize:10,keywords:"",startTime:null,endTime:null,userid:"0",intVerify:1},seachbytitle:"",dialogVisible:!1,fliterfeeds:0,subjectid:"",flag:0,flags:-1,spliceIndex:null,pagenum:1,pagesize:10,checkList:["垃圾营销"],feeds:{options:[{value:0,label:"未读"},{value:1,label:"已读"}]},fliterVerify:1,verify:{options:[{value:1,label:"精华"},{value:0,label:"普通"}]}}},methods:Object(l["a"])({},Object(c["b"])("content",["getReadList","getReadList1","getReadCount","setUpdateVerify","setUpdateRead","loadMore"]),{recover:function(e){this.$router.push({path:"/content/recover?id=".concat(e)})},read:function(){this.$router.push({path:"/content/read"})},dropoff:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t,i,a){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=this,n.dialogVisible=!0,n.subjectid=t,n.flags=a,n.spliceIndex=i;case 5:case"end":return e.stop()}},e,this)}));return function(t,i,a){return e.apply(this,arguments)}}(),updateVerify:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.setUpdateVerify({subjectid:t.subjectid,flag:t.flags,drop_reason:t.checkList});case 3:i=e.sent,i&&(t.readList.data.splice(t.spliceIndex,1),t.dialogVisible=!1,t.seachbytitle="",t.flag=0);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),handleSelect:function(e){var t=this;t.flag=e,t.getreadlist["flag"]=e,t.getreadlist["keywords"]=t.seachbytitle,t.getreadlist["pagenum"]=1,t.getreadlist["userid"]=t.authUser.uid,t.getreadlist["intVerify"]=t.fliterVerify,t.getReadList1(t.getreadlist)},bindSearch:function(){var e=this;e.getreadlist["flag"]=e.flag,e.getreadlist["keywords"]=e.seachbytitle,e.getreadlist["pagenum"]=1,e.getreadlist["userid"]=e.authUser.uid,e.getReadList1(e.getreadlist)},getFeedList:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.getreadlist["flag"]=t.flag,t.getreadlist["keywords"]=t.seachbytitle,t.getreadlist["pagenum"]=t.pagenum,t.getreadlist["userid"]=t.authUser.uid,t.getreadlist["intVerify"]=t.fliterVerify,e.next=8,t.getReadList(t.getreadlist);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),toFeeds:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:window.open("/content/feed/".concat(t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},updateRead:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=this,e.next=3,i.setUpdateRead({subjectid:t});case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),_func:function(){var e=this;document.querySelectorAll("#feed>li").forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(i,a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!(Math.abs($("#feed").offset().top)&&Math.abs($("#feed").offset().top)+168>i.offsetTop+i.offsetHeight)){t.next=6;break}if("true"!=$("#feed>li").eq(a).attr("status")){t.next=6;break}return $("#feed>li").eq(a).attr("status",!1),$("#feed>li .isRead").eq(a).show(),t.next=6,e.updateRead($("#feed>li").eq(a).attr("sub"));case 6:case"end":return t.stop()}},t,this)}));return function(e,i){return t.apply(this,arguments)}}())},_scroll:function(e){var t=this;1!=t.authUser.type&&document.querySelector(".main .page_container .el-scrollbar__wrap").addEventListener("scroll",t._func,!1)}}),created:function(){var e=this;e.getreadlist["userid"]=e.authUser.uid,e.getReadList(e.getreadlist),e.getReadCount()},mounted:function(){this._scroll()}},o=r,d=(i("b5da"),i("2877")),f=Object(d["a"])(o,a,n,!1,null,"b1abd192",null);f.options.__file="index.vue";t["default"]=f.exports},"8d03":function(e,t,i){},b5da:function(e,t,i){"use strict";var a=i("8d03"),n=i.n(a);n.a}}]);
//# sourceMappingURL=chunk-24bd.e75c273e.js.map