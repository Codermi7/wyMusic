<template>
        <div class='bot_btn_box'>
            <span class="iconfont icon-caidan-dakai" @click="showPop"></span>
            <span class='icon_prev iconfont' @click="prev"></span>
            <span :class='(isStop?"icon_play":"icon_stop")+" iconfont"' @click='change'></span>
            <span class='icon_next iconfont' @click='next'></span>
            <span class="iconfont icon-caidan-dakai" @click="showPop"></span>
        </div>
</template>
<script>
// @ is an alias to /src
// icon_play
export default {
    name: 'PlayBar',
    props:["isStop"],
    data() {
        return {}
    },
    methods: {
      change(){
        // this.isStop = !this.isStop;
        this.$emit('stop',!this.isStop)
      },
      prev(){
        this.$EventBus.$emit('prev')
      },
      next(){
          this.$EventBus.$emit('next')
      },
        showPop(){
          this.$EventBus.$emit('busPopup')
        }
    },
    components: {

    }
}
</script>
<style lang="less">
  .bot_btn_box{
    position: fixed;
    bottom:0;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 200;
    text-align: center;
    color:#fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
    span:nth-child(3){
      font-weight: 600;
        font-size: 90px;
    }
    span{
      font-size: 80px;
    }
  }
</style>