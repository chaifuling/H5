const UA = {
  isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
  isIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

const llwJSBridge = {
  doCall: function (functionName, data) {
    var _this = this
    // 解决连续调用问题
    if (this.lastCallTime && (Date.now() - this.lastCallTime < 100)) {
      setTimeout(function () {
        _this.doCall(functionName, data)
      }, 100)
    }
    this.lastCallTime = Date.now()
    if (UA.isIOS) {
      const iosMessage = window.webkit.messageHandlers[functionName]
      iosMessage.postMessage(JSON.stringify(data))
    } else if (UA.isAndroid) {
      window.NativeAPI && window.NativeAPI[functionName] && window.NativeAPI[functionName](JSON.stringify(data))
    } else {
      console.error('未获取到对应客户端信息，调用API失败')
    }
  }
}

export default llwJSBridge
