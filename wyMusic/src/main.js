import Vue from 'vue'
import App from './App.vue'
import './less/icon.less'
import Slider from 'element-ui'
import router from "./router";
import store from "./store";
import {Popup} from "vant";
import { Toast } from "vant";
import { Skeleton } from 'vant';
import 'amfe-flexible'

Vue.use(Skeleton);

Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(Slider)
Vue.use(Popup)
Vue.use(Toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
