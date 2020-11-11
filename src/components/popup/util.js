export const setProps = ($vm, options) => {
    const defaults = {}
    Object.keys($vm.$options.props).forEach(k => {
      defaults[k] = $vm.$options.props[k].default
    })
    const _options = Object.assign({}, defaults, options)
    for (let i in _options) {
      $vm.$props[i] = _options[i]
    }
  }