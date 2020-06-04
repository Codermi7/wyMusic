import Vue from 'vue'
import App from './App.vue'
import './less/icon.less'
import Slider from 'element-ui'
import router from "./router";
import store from "./store";
import {Popup} from "vant";

Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(Slider)
Vue.use(Popup)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
