<template>
  <div
    class='play_box'
    :style="{backgroundImage:`url(${bg})`,color:'red'}"
  >
    <Record :img='img' @click="change" :isStop='isStop'></Record>
    <Lyric :lyric='lyric' :title='title' :currentTime='currentTime'></Lyric>
    <audio :src="music" ref='audio'></audio>
    <BOTBTN @stop="change" @prev='prevFn' @next="nextFn" :isStop='isStop'></BOTBTN>
  </div>
</template>
<script>
// @ is an alias to /src
import { getMusicDetail,getSongUrl,getLyric } from "@/api/api.js";
import Record from './record'
import Lyric from './lyric'
import BOTBTN from './btn'
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
      idList:[1,2,3],
      idIndex:0
    };
  },
  created() {
    this.getInfo(569200213);
    this.getSong(569200213);
    this.getMusicLyric(569200213)
  },
  components: {Record,Lyric,BOTBTN},
  methods: {
    getInfo(id) {
      getMusicDetail(id).then(data => {
          console.log(data)
        this.bg = data.playlist.creator.backgroundUrl;
        this.img = data.playlist.creator.avatarUrl;
        // this.lyric = data.lyric;
        this.title = '消愁';
        // this.music = data.music;
        // this.currentTime = 0;
        // this.timer = null ;
        // this.isStop = true;
      })},
      getSong(id){
          getSongUrl(id).then(data=> {
              console.log(data.data[0].url)
              this.music = data.data[0].url
          })
        },
      getMusicLyric(id){
        getLyric(id).then(data=> {
            console.log(data)
            this.lyric = data.lrc.lyric
        })
      },
    prevFn(){
      this.idIndex = (this.idIndex - 1) < 0 ? this.idList.length-1 : this.idIndex - 1;
      this.getInfo(this.idList[this.idIndex]);
    },
    nextFn(){
      this.idIndex = (this.idIndex + 1) >= this.idList.length ? 0 : this.idIndex + 1;
      this.getInfo(this.idList[this.idIndex]);
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
      this.timer = setInterval(() => {
        this.currentTime = this.$refs.audio.currentTime;
      }, 10);
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