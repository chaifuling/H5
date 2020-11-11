import { getInfoWs } from "@/api/home";
import dayjs from "dayjs";
export const bindTap = Vue => {
  Vue.directive("tap", {
    bind: function(el, binding) {
      let tapObj = {};
      let time;
      el.addEventListener(
        "touchstart",
        function(e) {
          let touches = e.touches[0];
          tapObj.pageX = touches.pageX;
          tapObj.pageY = touches.pageY;
          tapObj.clientX = touches.clientX;
          tapObj.clientY = touches.clientY;
          time = +new Date();
        },
        false
      );

      el.addEventListener(
        "touchend",
        function(e) {
          let touches = e.changedTouches[0];
          time = +new Date() - time;
          tapObj.distanceX = tapObj.pageX - touches.pageX;
          tapObj.distanceY = tapObj.pageY - touches.pageY;
          if (
            time < 150 &&
            Math.abs(tapObj.distanceX) < 2 &&
            Math.abs(tapObj.distanceY) < 2
          ) {
            e.preventDefault();
            el.exec();
          }
        },
        false
      );
      el.exec = function() {
        var data = binding.value;
        data[0].apply(this, data.slice(1));
      };
    },
    //更新页面
    componentUpdated: function(el, binding) {
      el.exec = function() {
        var data = binding.value;
        data[0].apply(this, data.slice(1));
      };
    },
    unbind: function(el) {
      el.exec = null;
    }
  });
};
//滚动条在Y轴上的滚动距离s
export function getScrollTop() {
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
//文档的总高度
export function getScrollHeight() {
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight;
  return scrollHeight;
}

//浏览器视口的高度
export function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

/**
 * 函数防抖
 */
export function debounce(fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  var delay = delay || 200;
  return function() {
    var args = arguments;
    var that = this;
    // 清除上一次延时器
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(that, args);
    }, delay);
  };
}

// 倒计时
var timeOut = 0;
export function countdown(newTime, nowTime) {
  // 定时器对象
  var time = dayjs(newTime).valueOf();
  // var time=new Date(myyear,mymonth,myday,myhour,myminute,mysecond).getTime();
  //获取当前时间
  var nowTime = Number(new Date().valueOf());
  // var nowTime=new Date().getTime();
  //获取时间差
  var timediff = Math.round((time - nowTime) / 1000);
  //获取还剩多少天
  var day = parseInt(timediff / 3600 / 24);
  //获取还剩多少小时
  var hour = parseInt((timediff / 3600) % 24);
  //获取还剩多少分钟
  var minute = parseInt((timediff / 60) % 60);
  //获取还剩多少秒
  var second = timediff % 60;
  //输出还剩多少时间
  document.getElementById("llw_d") &&
    (document.getElementById("llw_d").innerHTML = day);
  document.getElementById("llw_h") &&
    (document.getElementById("llw_h").innerHTML = hour);
  document.getElementById("llw_m") &&
    (document.getElementById("llw_m").innerHTML = minute);
  document.getElementById("llw_s") &&
    (document.getElementById("llw_s").innerHTML = second);
  return {
    clearTime: function() {
      window.clearInterval(timeOut);
    },
    getTimeText: function() {
      return {
        day,
        hour,
        minute,
        second
      };
    },
    startTime: function(newTime, noetime) {
      if (timediff < 0) {
        window.clearInterval(timeOut);
        countdown(newTime, noetime);
        return;
      }
      timeOut = window.setInterval(function() {
        countdown(newTime, noetime);
      }, 1000);
      if (timediff == 0) {
        window.clearInterval(timeOut);
        llw.backReload();
        return;
      }
    }
  };
}

export const head = {
  deviceType: "9",
  sysType: "Android",
  os: "9",
  teminalVersion: "android_5.1.2",
  sign: "",
  Token: "dc7a0a21538c54280b93198ca4ba9cbf",
  operator: "1",
  manufacturer: "HUAWEI",
  clientType: "android",
  areaId: "",
  fnId: "friend.activity.detail.get",
  invokeTime: "",
  imei: "869418043316557",
  model: "VCE-AL00",
  sn: ""
};
export const signUp = () => {
  const body = {
    body: {
      password: "12334566a",
      loginType: "2",
      longitude: "112.886368",
      city: "长沙市",
      latitude: "28.234803",
      district: "岳麓区",
      registerId: "160a3797c886530f4e2",
      province: "湖南省",
      place: "中国湖南省长沙市岳麓区望安路",
      mob: "13076866216"
    },
    head: {
      sysType: "Android",
      operator: "",
      sign: "",
      clientType: "android",
      imei: "865876037825954",
      areaId: "",
      deviceType: "7.0",
      sn: "",
      manufacturer: "Xiaomi",
      fnId: "user.login",
      invokeTime: "",
      os: "7.0",
      model: "Redmi Note 4X",
      teminalVersion: "android_5.0.3"
    }
  };
  getInfoWs(body).then(res => {
    const {
      data: {
        data: { respData }
      }
    } = res;
    respData.username = respData.llh;
    window.localStorage.setItem("baseInfo", JSON.stringify(respData));
  });
};

// 获取url 参数
export function getQuery(name) {
  var query = window.location.search.substring(1);
  // console.log(window.location.search)
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return false;
}

export function iosSort() {
  var _sort = Array.prototype.sort;
  Array.prototype.sort = function(fn) {
    if (!!fn && typeof fn === "function") {
      if (this.length < 2) return this;
      var i = 0,
        j = i + 1,
        l = this.length,
        tmp,
        r = false,
        t = 0;
      for (; i < l; i++) {
        for (j = i + 1; j < l; j++) {
          t = fn.call(this, this[i], this[j]);
          r = (typeof t === "number" ? t : !!t ? 1 : 0) > 0 ? true : false;
          if (r) {
            tmp = this[i];
            this[i] = this[j];
            this[j] = tmp;
          }
        }
      }
      return this;
    } else {
      return _sort.call(this);
    }
  };
}

export function setReduce(data, sort) {
  var obj = {};
  var person = data;
  var info = [];
  info = person.reduce((cur, next) => {
    !next.sortLevel && (next.sortLevel = Infinity);
    obj[next.momentsId] ? "" : (obj[next.momentsId] = true && cur.push(next));
    return cur;
  }, []);
  console.log(info);

  // if (/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)) iosSort();
  if (sort == 2) {
    info = info
      .sort((a, b) => b.momentsId - a.momentsId)
      .sort((a, b) => b.ifhot - a.ifhot)
      .sort((a, b) => a.sortLevel - b.sortLevel);
  }
  if (sort == 1) {
    info = info
      .sort((a, b) => b.momentsInfo.likedCount - a.momentsInfo.likedCount)
      .sort((a, b) => b.ifhot - a.ifhot)
      .sort((a, b) => a.sortLevel - b.sortLevel);
  }
  return info;
}

export function findvideocover(video) {
  const canvas = document.createElement("canvas");
  video.currentTime = 3; // 第一帧
  // if (video) {
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  //   return canvas.toDataURL("image/png");
  // }
}

export function getVideoBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (this.status == 200) {
      // 获取视频文件大小
      console.log(this.response.size / 1000000 + "MB");
      spiderVideoResponse = this.response;
      // 将response赋值为Video的src 或者也可以使用preView转换为base64的格式
      // 截取第一帧的图片方法跟第一种情况一样，而且还解决了获取图片时跨域的问题 一举两得
      video.src = URL.createObjectURL(this.response);
    }
  };
  xhr.send();
}

export function jsonp(options) {
  options = options || {};
  if (!options.url || !options.callback) {
    throw new Error("参数不合法");
  }

  //创建 script 标签并加入到页面中
  var callbackName = ("jsonp_" + Math.random()).replace(".", "");
  var oHead = document.getElementsByTagName("head")[0];
  options.data[options.callback] = callbackName;
  var params = formatParams(options.data);
  var oS = document.createElement("script");
  oHead.appendChild(oS);

  //创建jsonp回调函数
  window[callbackName] = function(json) {
    oHead.removeChild(oS);
    clearTimeout(oS.timer);
    window[callbackName] = null;
    options.success && options.success(json);
  };

  //发送请求
  oS.src = options.url + "?" + params;

  //超时处理
  if (options.time) {
    oS.timer = setTimeout(function() {
      window[callbackName] = null;
      oHead.removeChild(oS);
      options.fail && options.fail({ message: "超时" });
    }, time);
  }
}

//格式化参数
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[i]));
  }
  return arr.join("&");
}

export function InitSart() {
  if (llw.myWebview) {
    llw.GetInitInfo();
  } else {
    start();
  }
  function start() {
    llw.guide.Init();
    llw.Init({
      guidedata: {
        msgType: "16",
        msgParam: {
          tabIndex: "1",
          contentUrl: window.location.href
        }
      }
    });
  }
}

export function gethash() {
  let hashUrl = window.location.hash;
  let url = hashUrl.substring(hashUrl.indexOf("?") + 1, hashUrl.length);
  let arr = url.replace(/^\#/, "").split("&");
  let params = {};
  for (let i = 0; i < arr.length; i++) {
    let data = arr[i].split("=");
    if (data.length === 2) {
      params[data[0]] = data[1];
    }
  }
  return params;
}
