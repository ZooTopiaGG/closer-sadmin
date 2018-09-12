(function ($) {
  var funObj = {
    timeUserFun: 'timeUserFun',
    st: 'st'
  }
  $[funObj.timeUserFun] = function (time, cb, type) {
    var init = 0,
      changeInit = 0;
    var time = time || 2;
    var userTime = time * 60;
    var objTime = {
      time: function () {
        init += 1;
        changeInit += 1;
        if (init == userTime) {
          clearInterval(testUser);
          cb && cb(); // 用户到达未操作事件 做一些处理
        }
        if (type === 'clearIt') {
          clearInterval(testUser);
          init = 0;
        }
      },
      eventFun: function () {
        clearInterval(testUser);
        init = 0;
        testUser = setInterval(objTime.time, 1000);
      }
    }
    var testUser = setInterval(objTime.time, 1000);

    var body = document.querySelector('html');
    body.addEventListener("click", objTime.eventFun);
    body.addEventListener("keydown", objTime.eventFun);
    body.addEventListener("mousemove", objTime.eventFun);
    body.addEventListener("mousewheel", objTime.eventFun);
  }
  // $[funObj.st] = function () {
  //   return [changeInit, init]
  // }
})(window)