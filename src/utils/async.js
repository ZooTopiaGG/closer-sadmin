import api from './api'
let options = {
  str: '', // 文本字符串
  flg: '', // 需要插入的值 可为空
  splitStr1: '', // 需要分割的标签
  size: 500
}
export default {
  createTime(milliseconds, type) {
    let time = new Date(milliseconds);
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = time.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = time.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = time.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let seconds = time.getSeconds();
    seconds = seconds < 10 ? ('0' + seconds) : seconds;
    if (type === 'yy-mm-dd hh:MM') {
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds;
    } else if (type === 'yy-mm-dd MM:ss') {
      return y + '-' + m + '-' + d + ' ' + minute + ':' + seconds;
    } else if (type === '年/月/日') {
      return y + '年' + m + '月' + d + '日';
    } else {
      return y + '-' + m + '-' + d;
    }
  },
  getCommonTime(milliseconds, type) {
    let time = new Date(milliseconds),
      time_ = new Date(),
      time1 = time.getTime(time), //发布时间
      time_1 = time_.getTime(time_), //现在时间
      jTime = time_1 - time1,
      days = jTime / 1000 / 60 / 60 / 24,
      daysRound = Math.floor(days),
      hours = jTime / 1000 / 60 / 60 - (24 * daysRound),
      hoursRound = Math.floor(hours),
      minutes = jTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound),
      minutesRound = Math.floor(minutes),
      seconds = jTime / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
      secondsRound = Math.floor(seconds);
    if (daysRound > 0) {
      return this.createTime(milliseconds, type)
    } else {
      if (hoursRound > 0) {
        return hoursRound + "小时前";
      } else {
        if (minutesRound > 10) {
          return minutesRound + "分钟前";
        } else {
          if (secondsRound > 0) {
            return "刚刚";
          }
        }
      }
    }
  },
  insert_flg(str, flg, splitStr1, splitStr2, url) {
    let newstr = "";
    let tmp1 = str.split(splitStr1);
    let tmp2 = tmp1[1].split(splitStr2);
    newstr = `${splitStr1}${tmp1[0]} ${flg} ${tmp2[0]}${splitStr2}${url} style="width:100%;">`;
    return newstr;
  },
  // 正则表达式处理
  regexImg(options, callback) {
    const regexSrc = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const regexPImg = new RegExp("<" + options.splitStr1 + "><img.*?(?:>|/>)", "gi");
    // const regexPImg = /<p><img.*?(?:>|\/>)/gi
    let pImg = options.str.match(regexPImg);
    // 判断 是否匹配到图片
    if (pImg) {
      for (let i = 0; i < pImg.length; i++) {
        let srcArray = pImg[i].match(regexSrc);
        // 替换插入需要的值
        let newPimg = this.insert_flg(pImg[i], options.flg, `<${options.splitStr1}`, ' src=', `"${srcArray[1]}?s=${options.size}"`);
        // 正则替换富文本内的img标签
        let _htmls = options.str.replace(regexPImg, newPimg);
        return _htmls
      }
    } else {
      return options.str
    }
  },
  // 图片地址处理
  makeFileUrl(url, type, size) {
    if (url) {
      let sizes = size ? size : 500
      if (type === 'src') {
        return (url.indexOf('://') !== -1) ? url + '?s=' + sizes : api.filePath + url + '?s=' + sizes;
      } else {
        return (url.indexOf('://') !== -1) ? url : api.filePath + url;
      }
    } else {
      return
    }
  },
  once(fn, context) {
    var result;
    return function () {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }

      return result;
    };
  },
  // 获取cookie通过name
  getCookiebyName(cookie, name) {
    var pair = cookie.match(new RegExp(name + '=([^;]+)'));
    return !!pair ? pair[1] : null;
  },
  // 正则验证手机号
  isPhoneNum(str) {
    let regex = /^1[^01][0-9]\d{8}$/;
    return regex.test(str)
  },
  /**
   * 

   * @desc  判断是否为身份证号

   * @param  {String|Number} str 

   * @return {Boolean}

   */
  isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  },
  /**

   * 

   * @desc   判断是否为URL地址

   * @param  {String} str 

   * @return {Boolean}

   */
  isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str)
  },
  /**

 * 

 * @desc   判断是否为纯英文

 * @param  {String} str 

 * @return {Boolean}

 */
  isEn(str) {
    return /^[a-zA-Z]+$/i.test(str)
  },
  // 毫秒转换为分秒格式
  toCurrent(d) {
    let m = Math.round(d / 1000);
    if (m >= 60) {
      let f = Math.floor(m / 60),
        c = m - 60 * f,
        a, z;
      if (f < 10) {
        a = `0${f}`
      } else {
        a = `${f}`
      }
      if (c < 10) {
        z = `0${c}`
      } else {
        z = `${c}`
      }
      return `${a}:${z}`
    } else if (m < 60) {
      if (m < 10) {
        return `00:0${m}`
      } else {
        return `00:${m}`
      }
    }
  },
  // 判断设为正整数
  isInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0
  },
  clipBorad(value, callback) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', value);
    input.select();
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      callback()
    }
    document.body.removeChild(input);
  },
}