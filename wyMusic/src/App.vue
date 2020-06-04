<template>
  <div id="app">
    <transition name="fade">
      <component :is="showCom"></component>
    </transition>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Play from './views/PlayMusic'
// import Home from './views/Home'
import Container from "./views/Container";
import Loading from './components/Loading/loading'
export default {
  name: 'App',
  data(){
    return{
      showCom:Loading,
    }
  },
  created() {
    window.addEventListener('load',()=>{
      setTimeout(() => {
        this.showCom = Container;
      }, 500);
    })
  }
}
</script>

<style lang='less'>
  @import "assets/css/icon.css";
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
button{
  position: fixed;
  z-index: 19;
}


</style>
