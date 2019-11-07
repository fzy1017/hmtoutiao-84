import MyBread from '@/components/my-bread'
import MyInput from '@/components/my-input'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('my-input', MyInput)
    Vue.component('my-image', MyImage)
  }
}
