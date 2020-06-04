<template>
  <div
          class='play_box'
          :style="{backgroundImage:`url(${curMusic.bg})`}"
  >
    <span class="iconfont icon-fanhui back" @click="goBack"></span>
    <Record :img='curMusic.img' @click="change" :isStop='isStop'></Record>

    <Lyric  :lyric='curMusic.lyric ? curMusic.lyric:""' :title='curMusic.name' :currentTime='currentTime'></Lyric>
    <audio :src="curMusic.music"  ref='audio'></audio>
    <ProgressBar :current-time="currentTime" @JumpProgress="JumpProgress" :total-time="duration"></ProgressBar>
    <play-bar @stop="change" :isStop='isStop'></play-bar>
  </div>
</template>
<script>
  // @ is an alias to /src
  import Record from './play/Record'
  import Lyric from './play/Lyric'
  import PlayBar from './play/PlayBar'
  import ProgressBar from "./play/ProgressBar";
  import {mapMutations} from 'vuex'
  export default {
    name: "PlayMusic",
    data() {
      return {
        currentTime:0,
        timer:null ,
        isStop:true,
        duration:200,
        isFirst:true
      };
    },
    props:["curMusic"],
    created() {
    },
    components: {Record,Lyric,PlayBar,ProgressBar},
    methods: {
      ...mapMutations(["Statechange"]),
      change(state){
        this.isStop = state;
        this.Statechange(state)
        if(this.isFirst){this.isFirst=false}
        if(!state){
          this.$refs.audio.play()
          this.updateTime();
        }else{
          this.$refs.audio.pause();
          clearInterval(this.timer)
        }
      },
      updateTime(){
        let flag = true
        this.timer = setInterval(() => {
          if(this.$refs.audio.currentTime)
            this.currentTime = this.$refs.audio.currentTime
          if(this.$refs.audio.duration && flag){
            this.duration = this.$refs.audio.duration
            flag = false
          }
          if(this.currentTime>=this.duration){
            clearInterval(this.timer)
            this.currentTime = 0
            this.$EventBus.$emit('next')
          }
        }, 10);
      },
      JumpProgress(pre) {
        this.$refs.audio.currentTime = this.duration*pre/100
      },
      goBack() {
        this.$emit('close')
      }

    },
    watch: {
      'curMusic':function () {
        if(this.curMusic){
          if(!this.isFirst){
            this.$nextTick(()=>{
              this.isStop = !this.isStop
              this.change(this.isStop)
            })
          }
        }
      }
    }
  };
</script>
<style lang="less">
  .play_box {
    width: 100%;
    height: 100vh;
    background-size: auto 100%;
    background-position: center center;
    transform-origin: center top;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .back {
      font-size: 30px;
      position: absolute;
      top: 10vw;
      left: 8vw;
      color:#fff;
      z-index: 999;
    }
  }
</style>