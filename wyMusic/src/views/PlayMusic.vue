<template>
  <div
          class='play_box'
  >
<!--    :style="{backgroundImage:`url(${curMusic.img})`}"-->
      <div class="gs_bg"  :style="{ backgroundImage:`url(${curMusic.img})`}" ></div>
          <span class="iconfont icon-fanhui back" @click="goBack"></span>
          <Record :img='curMusic.img' @click="change" :isStop='isStop' ref="avImg"></Record>

          <Lyric  :lyric='curMusic.lyric ? curMusic.lyric : ""'
                  :title='curMusic.name'
                  :currentTime='currentTime'
                  :author="curMusic.author"
          ></Lyric>
          <audio :src="getMusic" id="audio"  ref='audio'></audio>
          <ProgressBar v-if="duration" :current-time="currentTime" @JumpProgress="JumpProgress" :total-time="duration"></ProgressBar>
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
  import {localStore} from "../api/api";

  export default {
    name: "PlayMusic",
    data() {
      return {
        currentTime:0,
        timer:null ,
        isStop:true,
        duration:null,
        isFirst:true,
        history:0,
        // baseUrl:' https://music.163.com/song/media/outer/url?id=1449213110.mp3'
      };
    },
    props:["curMusic"],
    components: {Record,Lyric,PlayBar,ProgressBar},
    created() {
        let timer = setInterval(()=>{
            if(this.$refs.audio){
                let {duration} = this.$refs.audio
                this.duration = duration
                clearInterval(timer)
            }
        },500)
        this.listenPageClose()
    },
      mounted() {
          this.history = new localStore('curTime')
          if(this.isFirst){
              let time = this.history.getStore()
              if(time){
                  this.currentTime = this.$refs.audio.currentTime = time
              }
          }
    },
      beforeDestroy() {
        this.clearListen()
      },
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
          },
          joint(id){
              return 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
          },
          listenPageClose() {
              window.addEventListener('pagehide',()=>{
                  this.history.setStore(this.currentTime)
              })
          },
          clearListen(){
              window.removeEventListener('pagehide',null)
          }


    },
    computed: {
        getMusic() {
            return this.joint(this.curMusic.id)
        }
    },
    watch: {
      'curMusic':function () {
        if(this.curMusic){
            this.currentTime = 0
          if(!this.isFirst){
            this.$nextTick(()=>{
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
      background: #000000;
      overflow: hidden;
      .gs_bg {
          z-index: -1;
          filter: blur(70px);
          background-size: auto 100%;
          background-position: center center;
          background-repeat: no-repeat;
          transform-origin: center top;
          background-color: #000000a3;
          position: absolute;
          width: 150vw;
          left: -15vw;
          top: -15vh;
          height: 150vh;
      }
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0,0,0,.5);
    }
    .back {
      font-size: 60px;
      position: absolute;
      top: 10vw;
      left: 8vw;
      color:#fff;
      z-index: 999;
    }
  }
</style>