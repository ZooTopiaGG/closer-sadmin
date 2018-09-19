import {
  getQuestionList,
  localQuestionList,
  uploadQuestions,
  getTuzhuStatisticsList
} from './service';
import csv2array from "@/utils/csv2array.js";

export default {
  namespaced: true,
  state: {
    questionList: {
      data: [],
      count: 0
    },
    statisticList: {
      data: [],
      count: 0
    },
  },
  mutations: {
    questionList(state, para) {
      state.questionList = para
    },
    statisticList(state, para) {
      state.statisticList = para
    },
  },
  actions: {
    async getQuestionList({
      commit,
      state
    }, payload) {
      let {
        data
      } = await getQuestionList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let arr = await data.result.data.map((x, i) => {
          x["index"] = i + 1;
          x["topic"] = x.title;
          x["diffcult"] = x.level ? x.level : "-";
          x["answerA"] = x.answers[0].title;
          x["answerB"] = x.answers[1].title;
          x["answerC"] = x.answers[2].title;
          x["answerD"] = x.answers[3].title;
          return x;
        });
        let res = {
          data: arr,
          count: arr.length
        }
        commit('questionList', res)
      } else {
        $message.error(data.result)
      }
    },
    async localQuestionList({
      commit
    }, payload) {
      let data = await localQuestionList(payload)
      let newData = [];
      var reader = new FileReader();
      reader.readAsText(data.raw, "GB2312");
      reader.onload = async function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
          newData = await csv2array(reader.result.toString());
          await newData.shift();
          let a = "[";
          for (var i = 0, len = newData.length; i < len; i++) {
            a += `{"index": "${i + 1}", "topic": "${
                  newData[i][1]
                }", "diffcult": "${newData[i][2]}", "answerA": "${
                  newData[i][3]
                }", "answerB": "${newData[i][4]}", "answerC": "${
                  newData[i][5]
                }", "answerD": "${newData[i][6]}"},`;
          }
          a += "]";
          var arr = eval("(" + a + ")");
          let res = {
            data: arr,
            count: arr.length
          };
          commit("questionList", res);
        }
      };
    },
    async uploadQuestions({
      commit
    }, payload) {
      let {
        data
      } = await uploadQuestions(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        $message.success("保存成功！");
      }
    },
    async getTuzhuStatisticsList({
      commit
    }, payload) {
      let {
        data
      } = await getTuzhuStatisticsList(payload).catch(err => {
        $message.error('网络开小差了。。。')
      })
      if (data.code === 0) {
        let res = {
          data: [],
          count: 0
        };
        res["data"].push(data.result);
        res["count"] = res.length;
        commit('statisticList', res)
      }
    },
  },
};