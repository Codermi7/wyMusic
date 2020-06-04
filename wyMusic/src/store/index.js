import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
//安装插件
Vue.use(Vuex)
//创建Store对象
const store = new Vuex.Store({
  state: {
    currentMusic:{
      bg:'',
      title:'',
      img:'',
      music:'',
      lyric:'',
      author:''
    },
    timer:null,
    isStop:true,
    musicList:[569200213,569213220],
    currentIndex:0,
    duration:200,
    currentTime:0,
    idList:[569200213,569213220,1436910205]
  },
  mutations,
  actions,
  getters
})
export default store

