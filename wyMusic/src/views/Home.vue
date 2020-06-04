<template>
    <div class="home">
        <div class="search">
            <router-link to="/search"><span class="iconfont icon-sousuo"></span>搜索</router-link>
        </div>

        <audio ref="audio" :src="getMusicUrl"></audio>
        <play-music :class="playShow?'show':'hidden'" @close="close" ref="play"></play-music>
        <van-popup v-model="PopShow"
                   position="bottom"
                   :style="{ height: '40%' }"
                   closeable
                   close-icon="close"
        >
            <h3>当前播放</h3>
            <div v-for="(item,index) in Musics" :class='{active:index==currentIndex,"item-info":true}' :key="item.id">
                <div class="list-left">
                    <span v-show="currentIndex==index" class="iconfont icon-yinlianglabashengyin-xianxing cur"></span>
                    <span class="name">{{item.name}}</span>
                    <span class="author">{{item.author}}</span>
                </div>
                <span class="iconfont icon-close list-right"></span>
            </div>
            <div></div>
        </van-popup>
        <main-play-bar @toPlay="goToPlay" @change="change" @ShowPopup="ShowPopup"></main-play-bar>
    </div>

</template>

<script>
    import {MainPlayBar} from "../components";
    import { mapGetters,mapState } from "vuex";
    import PlayMusic from "./PlayMusic";
    import {getFirstList,localStore,getSongUrl,getLyric} from "../api/api";
    import bg from '@/assets/imgs/bg.jpg'
    // import img from '@/assets/imgs/avtx.jpg'
    export default {
        name: "Home",
        components: {
            MainPlayBar,
            PlayMusic
        },
        data() {
          return {
              playShow:false,
              PopShow:false,
              Musics:null,
              currentIndex:null
          }
        },
        created() {
            const store = new localStore('MusicList')
            const currentIndex = new localStore('currentIndex')
            this.Musics = store.getStore()
            this.currentIndex = currentIndex.getStore()
            if(!this.Musics){
                this._getFirstList()
            }
            if(!this.currentIndex){
                this.currentIndex = 0
                currentIndex.setStore(this.currentIndex)
            }

        },
        mounted() {
            this.$EventBus.$on('busPopup', ()=> {
              this.PopShow = true
            })
        },
        methods: {
           async _getFirstList() {
               const res = await getFirstList()
               if(res.code==200){
                   let result = res.playlist.tracks
                   let array=[]
                   for(let item of result){
                       let Music = {}
                       Music.name = item.name
                       Music.author = item.ar[0].name
                       Music.id = item.id
                       Music.img = item.al.picUrl
                       Music.bg = bg
                       const url = await getSongUrl(Music.id)
                           if(url.code==200){
                               Music.music = url.data[0].url
                           }
                       const lrc = await getLyric(Music.id)
                       Music.lyric = lrc.lrc.lyric
                       array.push(Music)
                   }
                   this.store.setStore(array)
                   this.Musics = this.store.getStore()
               }

            },
            goToPlay() {
                // this.$router.push('/play')
                this.playShow = true
            },
            close() {
              this.playShow = false
            },
            change(){
                this.$refs.play.change(!this.getStatus)
            },
            ShowPopup() {
                this.PopShow = true;
            }
            // updateTime(){
            //     let flag = true
            //     this.$store.dispatch('SetTimer',setInterval(() => {
            //         console.log(this.$refs.audio.currentTime)
            //         if(this.$refs.audio.currentTime)
            //           this.$store.commit('updateCurrentTime',this.$refs.audio.currentTime)
            //         if(this.$refs.audio.duration && flag){
            //             this.$store.commit('updateDuration',this.$refs.audio.duration)
            //             flag = false
            //         }
            //         if(this.getCurrentTime>=this.getDuration){
            //             console.log('over')
            //             this.$store.commit('clearTimer')
            //             this.$store.commit('updateCurrentTime',0)
            //             // this.nextFn()
            //         }
            //     }, 10))
            // },
        },
        computed: {
            ...mapGetters(['getMusicUrl','getDuration','getCurrentTime','getStatus']),
            ...mapState(['currentMusic'])
        }
    }
</script>

<style scoped lang="less">
    .home {
        .search {
            height: 8vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;

            a {
                width: 80vw;
                height: 6vh;
                border-radius: 30px;
                display: block;
                text-align: center;
                line-height: 6vh;
                text-decoration: unset;
                border: 1px solid #b3b0b0;
                color: #252525;
            }
        }
        .hidden {
            opacity: 0;
            z-index: -1;
            position: absolute;
            left: 0;
            bottom: -999px;
            pointer-events: unset;
        }
        .show {
            opacity: 1;
            z-index: 999;
            position: absolute;
            top: 0;
            left: 0;
        }
        .van-popup--bottom {
            position: absolute;
            width: 90vw;
            bottom: 6vh;
            margin: auto;
            left: 0;
            right: 0;
            border-radius: 15px;
            padding: 15px;
            box-sizing: border-box;
            z-index: 99999;
        }
        .item-info {
            height: 5vh;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .list-left {
                flex: 7;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .cur {
                    font-size: 18px;
                    padding-right: 10px;
                }
                .name{
                    font-size: 16px;
                    padding-right: 10px;
                }
                .author {
                    font-size: 12px;
                    color:#b3b0b0;
                }
            }
            .list-right {
                flex: 3;
                text-align: right;
                padding-right: 10px;
                color:#b3b0b0;
            }
            &.active {
               .list-left {
                   color: red;
                   .author {
                       color: red;
                   }
               }
            }
        }


    }

</style>