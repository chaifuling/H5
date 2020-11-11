import { factory } from './modalVm'
import { setProps } from './util'

let $vm

const libs = {
  open(options) {
    setProps($vm, options)
    //监听事件
    typeof options.onShow === 'function' && $vm.$once('show', options.onShow);
    typeof options.onHide === 'function' && $vm.$once('hide', options.onHide);
    $vm.open();
  },
  hide() {
    $vm.hide()
    $vm.$off('show')
    $vm.$off('hide')
  },
  //只配置文字
  text(options) {
    this.open(options)
  }
}

export default {
  install(Vue) {
    $vm = factory(Vue)
    Vue.prototype.$modal = libs
  }
}

export {
  libs as Modal
}