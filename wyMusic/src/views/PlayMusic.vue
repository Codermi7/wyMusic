<template>
  <div
    class='play_box'
    :style="{backgroundImage:`url(${bg})`,color:'red'}"
  >
    <Record :img='img' @click="change" :isStop='isStop'></Record>

    <Lyric :lyric='lyric' :title='title' :currentTime='currentTime'></Lyric>
    <audio :src="music"  ref='audio'></audio>
    <play-bar @stop="change" @prev='prevFn' @next="nextFn" :isStop='isStop'></play-bar>
  </div>
</template>
<script>
// @ is an alias to /src
import { getMusicDetail,getSongUrl,getLyric } from "@/api/api.js";
import Record from './play/Record'
import Lyric from './play/Lyric'
import PlayBar from './play/PlayBar'
export default {
  name: "play",
  data() {
    return {
      title: "",
      img: "",
      lyric: "",
      bg: "",
      music:'',
      currentTime:0,
      timer:null ,
      isStop:true,
      idList:[569200213,569213220,1436910205],
      idIndex:0,
      duration:0
    };
  },
  created() {
    this.getMusicInfo(569200213);
  },
  mounted() {

  },
  components: {Record,Lyric,PlayBar},
  methods: {
    getMusicInfo(id) {
        switch (id) {
            case 569200213:this.title = '消愁';break;
            case 569213220:this.title = '像我这样的人';break;
            case 1436910205:this.title = '好像爱这个世界啊(Live)';break;
        }
      getMusicDetail(id).then(data => {
          if(data.code!=404){
              this.bg = data.playlist.creator.backgroundUrl;
              this.img = data.playlist.creator.avatarUrl;
          }
          else return
      })
        getSongUrl(id).then(data=> {
            console.log(data.data[0].url)
            this.music = data.data[0].url
        })
        getLyric(id).then(data=> {
            console.log(data)
            this.lyric = data.lrc.lyric
        })
    },
    prevFn(){
      this.idIndex = (this.idIndex - 1) < 0 ? this.idList.length-1 : this.idIndex - 1;
      this.getMusicInfo(this.idList[this.idIndex]);
      this.isStop = true
    },
    nextFn(){
      this.idIndex = (this.idIndex + 1) >= this.idList.length ? 0 : this.idIndex + 1;
      this.getMusicInfo(this.idList[this.idIndex]);
      this.isStop = true
    },
    change(state){
      this.isStop = state;
      if(!state){
        this.$refs.audio.play()
        this.updateTime();
      }else{
        this.$refs.audio.pause();
        clearInterval(this.timer)
      }
    },
    updateTime(){
      this.duration = this.$refs.audio.duration
      this.timer = setInterval(() => {
        this.currentTime = this.$refs.audio.currentTime;
        if(this.currentTime>=this.duration){
          this.nextFn()
          this.timer = null
        }
      }, 10);
    }
  },
  watch: {
    'music':function () {
      console.log('切换')
      this.$nextTick(()=>{
        this.isStop = !this.isStop
        this.change(this.isStop)
      })


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
}
</style>