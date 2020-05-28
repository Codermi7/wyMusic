import Vue from 'vue'
import App from './App.vue'
import './less/icon.less'
import Slider from 'element-ui'
Vue.config.productionTip = false
Vue.use(Slider)


new Vue({
  render: h => h(App),
}).$mount('#app')
