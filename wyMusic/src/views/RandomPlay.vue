<template>
        <div
                class='play_box'
                :style="{backgroundImage:`url(${bg})`,color:'red'}"
        >
            <Record :img='img' @click="change" :isStop='isStop'></Record>

            <Lyric :lyric='lyric' :title='title' :currentTime='currentTime'></Lyric>
            <audio :src="music"  ref='audio'></audio>
            <ProgressBar :current-time="currentTime" @JumpProgress="JumpProgress" :total-time="duration"></ProgressBar>
            <play-bar @stop="change" @prev='prevFn' @next="nextFn" :isStop='isStop'></play-bar>
        </div>
    
</template>

<script>
    import { getNewsMusic,NewSong,getPlayUrl,getLyric } from "@/api/music.js";
    import Record from './play/Record'
    import Lyric from './play/Lyric'
    import PlayBar from './play/PlayBar'
    import ProgressBar from "./play/ProgressBar";
    export default {
        name: "RandomPlay",
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
                duration:300,
                newsMusicList:[]
            };
        },
        created() {
            this._getHotsMusic()
        },
        components: {Record,Lyric,PlayBar,ProgressBar},
        methods: {
            _getHotsMusic(){
                getNewsMusic().then(res=>{
                    for(let i of res.result){
                        let obj = JSON.parse(JSON.stringify(new NewSong(i)))
                        this.newsMusicList.push(obj)
                    }
             }).then(()=>{
                    this._getMusicInfo(this.idIndex)
                })
            },
            _getMusicInfo(curIndex) {
                let  { id,author,bg,img,name } = this.newsMusicList[curIndex]
                this.title=name+'     '+author
                this.bg = bg
                this.img = img
                getPlayUrl(id).then(res=>{
                    this.music = res.data[0].url
                })
                getLyric(id).then(res=>{
                    this.lyric = res.lrc.lyric
                })
            },
            prevFn(){
                this.idIndex = (this.idIndex - 1) < 0 ? this.newsMusicList.length-1 : this.idIndex - 1;
                this._getMusicInfo(this.idIndex);
                this.isStop = true
            },
            nextFn(){
                this.idIndex = (this.idIndex + 1) >= this.newsMusicList.length ? 0 : this.idIndex + 1;
                this._getMusicInfo(this.idIndex);
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
                this.timer = setInterval(() => {
                    if(this.$refs.audio.currentTime)
                    this.currentTime = this.$refs.audio.currentTime
                    if(this.$refs.audio.duration){
                        this.duration = this.$refs.audio.duration
                    }
                    if(this.currentTime>=this.duration){
                        console.log('over')
                        clearInterval(this.timer)
                        this.currentTime = 0
                        this.nextFn()
                    }
                }, 10);
            },
            JumpProgress(pre) {
                console.log(pre)
                this.$refs.audio.currentTime = this.duration*pre/100
                console.log(this.currentTime)
            }
        },
        watch: {
            'music':function () {
                console.log('切换')
                this.$nextTick(()=>{
                this.isStop = !this.isStop
                this.change(this.isStop)
                })

            },
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