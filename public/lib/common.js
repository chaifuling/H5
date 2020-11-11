var llw_h5_configuration = {
  school_shop_admin: {
    name: '商家后台',
    hid: 'school_shop_admin',
    api: {
      dev: [
        {
          name: 'base',
          url: 'http://192.168.57.218:8122/api',
          des: '测试接口地址1号'
        }
      ],
      pro: [{ name: 'base', url: 'u1' }],
      prepro: [{ name: 'base', url: 'u1' }],
      uat: [{ name: 'base', url: 'u1' }]
    },
    envwords: {
      dev: 'http://192.168.57.218:8122/api',
      pro: 'xxxx2',
      prepro: 'xxxx3',
      uat: 'xxxx4'
    }
  }
}
// 环境初始化
// 创建命名空间
var llwh5 = {}
// llwh5.namespace("apiurl");
// 设置项目对象
llwh5.obj = llw_h5_configuration[llw_h5_info.hid]
// 设置环境
llwh5.env = (function () {
  var url = window.location.href
  var envName = ''
  for (var o in llwh5.obj.envwords) {
    if (url.indexOf(llwh5.obj.envwords[o]) > 0) {
      envName = o
      break
    }
  }
  return envName === '' ? 'dev' : envName
})()
// 对象体集合
llwh5.setVal = {
  // 赋值url实现
  setApiUrl: function () {
    var list = llwh5.obj.api[llwh5.env]
    var loacl_list = llw_h5_info.apiurlname
    for (var i in loacl_list) {
      for (var o in list) {
        var cname = loacl_list[i]
        // 赋值接口对象
        if (list[o].name === cname) {
          llw_h5_info.apiurl[cname] = {}
          llw_h5_info.apiurl[cname].url = list[o].url
          llw_h5_info.apiurl[cname].des = list[o].des
        }
      }
    }
  }
}
// 遥控器对象
llwh5.createCommand = function (obj) {
  // 遥控器赋值url功能定义
  var doApiUrl = function () {
    return obj.setApiUrl() // 执行
  }
  return {
    doApiUrl: doApiUrl
  }
}
// 功能遥控器执行对象
llwh5.setCommand = llwh5.createCommand(llwh5.setVal)
llwh5.setCommand.doApiUrl()
