(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5792"],{"534e":function(t,e,a){"use strict";var i=a("df5a"),l=a.n(i);l.a},5546:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"flex flex-v",attrs:{id:"permission"}},[a("section",{staticClass:"permission_title"},[t._v("活动统计")]),a("section",{staticClass:"permission_table flex-1"},[a("section",{staticClass:"permission_table_top flex flex-pack-justify"},[a("section",{staticClass:"flex flex-align-center"},[a("section",{staticClass:"block2"},[a("el-date-picker",{attrs:{type:"daterange","default-time":["00:00:00","23:59:59"],align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions2},on:{change:t.handleSelect},model:{value:t.dataValue,callback:function(e){t.dataValue=e},expression:"dataValue"}})],1)])]),a("section",{staticClass:"permission_table_content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.statisticList.data}},[a("el-table-column",{attrs:{prop:"pv",label:"页面pv"}}),a("el-table-column",{attrs:{prop:"uv",label:"页面uv"}}),a("el-table-column",{attrs:{prop:"joinUniqueNumber",label:"参与游戏的人数（去重）"}}),a("el-table-column",{attrs:{prop:"joinNumber",label:"参与游戏的人次（不去重）"}}),a("el-table-column",{attrs:{prop:"levelA",label:"100分人数（去重）"}}),a("el-table-column",{attrs:{prop:"levelB",label:"60-99分人数（去重）"}}),a("el-table-column",{attrs:{prop:"levelC",label:"0-59分人数（去重）"}}),a("el-table-column",{attrs:{prop:"completeUniqueTest",label:"完成答题总人数"}}),a("el-table-column",{attrs:{prop:"completeTest",label:"完成答题总人次"}}),a("el-table-column",{attrs:{prop:"shareNumber",label:"点击分享次数"}}),a("el-table-column",{attrs:{prop:"registerNumber",label:"注册数"}}),a("el-table-column",{attrs:{prop:"activateNumber",label:"激活量"}})],1)],1)]),t.statisticList.count>0?a("section",{staticClass:"block cloumn-block"},[a("el-pagination",{attrs:{"current-page":t.pagenum,"page-size":t.pagesize,layout:"total, prev, pager, next, jumper",total:t.statisticList.count},on:{"current-change":t.handleCurrentChange}})],1):t._e()])},l=[],n=(a("96cf"),a("3040")),s=a("c93e"),c=(a("cadf"),a("551c"),a("097d"),a("2f62")),r={computed:Object(s["a"])({},Object(c["c"])("activity_question",{statisticList:function(t){return t.statisticList}})),data:function(){return{pagenum:1,pagesize:10,pickerOptions2:{disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},dataValue:""}},created:function(){var t=this,e={startTime:t.dataValue[0]||null,endTime:t.dataValue[1]||null,activityId:t.$route.query.id};t.getTuzhuStatisticsList(e)},methods:Object(s["a"])({},Object(c["b"])("activity_question",["getTuzhuStatisticsList"]),{handleCurrentChange:function(t){this.pagenum=t,this.get_tuzhu_statistics()},handleSelect:function(){this.get_tuzhu_statistics()},get_tuzhu_statistics:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,e.getTuzhuStatisticsList({startTime:e.dataValue[0]||null,endTime:e.dataValue[1]||null,activityId:e.$route.query.id});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()})},u=r,o=(a("534e"),a("2877")),p=Object(o["a"])(u,i,l,!1,null,"8d26833a",null);p.options.__file="index.vue";e["default"]=p.exports},df5a:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5792.4e41b05e.js.map