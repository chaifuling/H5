import ModalComponent from './index.vue'

let $vm
export const factory = (Vue)=> {
  if (!$vm) {
    let Modal = Vue.extend(ModalComponent)
    $vm = new Modal({
      el: document.createElement('div')
    })
    document.body.appendChild($vm.$el)
  }
  return $vm
}