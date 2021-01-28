<template>
    <div class="home">
        <div class="search">
            <router-link to="/home/search"><span class="iconfont icon-sousuo"></span>搜索</router-link>
        </div>
        <play-music :class="playShow?'show':'hidden'"
                    @close="close"
                    ref="play"
                    :cur-music="getCurMusic"
                    v-if="curMusic"
                   >
        </play-music>
        <van-popup v-model="PopShow"
                   position="bottom"
                   :style="{ height: '40%' }"
                   closeable
                   close-icon="close"
        >
            <h3 class="pop_title">当前播放({{getMusicsLen}})</h3>
            <div class="music-list">
                <div v-for="(item,index) in Musics" :class='{active:index==currentIndex,"item-info":true}' :key="item.id">
                    <div class="list-left" @click="toPlay(index)">
                            <span v-show="currentIndex==index" class="iconfont icon-yinlianglabashengyin-xianxing cur"></span>
                            <span class="name">{{item.name}}</span>
                            <span class="author">{{item.author}}</span>
                    </div>
                    <span class="iconfont icon-iconfontshanchu5 list-right" @click="delMusic(index)"></span>
                </div>
            </div>
        </van-popup>
        <transition :name="transitionName">
            <keep-alive exclude="MusicPlayList">
                <router-view class="router"></router-view>
            </keep-alive>
        </transition>
        <main-play-bar @toPlay="goToPlay" @change="change" @ShowPopup="ShowPopup"
                       :cur-music="getCurMusic"
        >
        </main-play-bar>
    </div>

</template>

<script>
    import { MainPlayBar} from "../components";
    import { mapGetters } from "vuex";
    import PlayMusic from "./PlayMusic";
    import {getFirstList,localStore,getSongUrl,getLyric,getMusicDetail,checkMusic} from "../api/api";

    export default {
        name: "Home",
        components: {
            MainPlayBar,
            PlayMusic,
        },
        data() {
          return {
              playShow:false,//歌词也是否显示
              PopShow:false,//显示音乐播放列表
              Musics:null,//存储播放列表音乐
              currentIndex:null,//当前播放index
              curMusic:{},//当前播放音乐信息
              musicStore:null,//音乐localstorage
              idStore:null,//记录当前播放id的localstorage
              enter:true,//是否第一次进入页面
              transitionName:'slide-left',
              currentTime:0
          }
        },
        created() {
           this._renderPage()
        },
        mounted() {
            //显示播放列表
            this.$EventBus.$on('busPopup', ()=> {
              this.ShowPopup()
            })
            //下一首
            this.$EventBus.$on('next',()=>{
                this.currentIndex = this.currentIndex + 1 >= this.Musics.length ? 0 : this.currentIndex + 1
                this.$refs.play.isStop = false
                this.$refs.play.change( this.$refs.play.isStop)
            })
            //前一首
            this.$EventBus.$on('prev',()=>{
                this.currentIndex = this.currentIndex - 1 < 0 ? this.Musics.length-1 : this.currentIndex - 1
                this.$refs.play.isStop = false
                this.$refs.play.change( this.$refs.play.isStop)
            })
            //点击切换当前播放
            this.$EventBus.$on('updatePlay',(res)=>{
                this.addMusic(res)
            })
            //全部播放
            this.$EventBus.$on('addAll',(res)=>{
                this.addAllMusic(res)
            })

        },
        beforeDestroy() {
            this.$EventBus.$off('busPopup')
            this.$EventBus.$off('next')
            this.$EventBus.$off('prev')
            this.$EventBus.$off('updatePlay')
            this.$EventBus.$off('addAll')
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
                       const url = await getSongUrl(Music.id)
                       if(url.code==200){
                           Music.music = url.data[0].url
                       }
                       try {
                           const lrc = await getLyric(Music.id)
                           if(lrc.lrc){
                               Music.lyric = lrc.lrc.lyric
                           }else {
                               Music.lyric = ''
                           }
                       }catch (e) {
                           return
                       }
                       if(Music.music){
                           array.push(Music)
                       }
                   }
                   this.musicStore.setStore(array)
                   this.Musics = this.musicStore.getStore()
                   return  this.Musics
               }

            },
            _renderPage() {
                this.musicStore = new localStore('MusicList')
                this.idStore= new localStore('currentIndex')
                this.Musics = this.musicStore.getStore()
                this.currentIndex = this.idStore.getStore()
                if(!this.currentIndex||this.currentIndex>this.Musics.length){
                    this.currentIndex = 0
                    this.idStore.setStore(this.currentIndex)
                }
                if(!this.Musics){
                    this.Musics=[]
                    this._getFirstList().then(res=>{
                        this.curMusic = res[this.currentIndex]
                    })
                }
                else {
                    this.curMusic = this.Musics[this.currentIndex]
                }
                this.enter = false
            },
            goToPlay() {
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
            },
            toPlay(index) {
               this.currentIndex = index
                this.$refs.play.isStop = false
                this.$refs.play.change( this.$refs.play.isStop)
            },
            //添加单个歌曲
            async addMusic(info) {
                let Music={}
                let id = info.id;
                let flag=false;
                //得到id 遍历是否已存在列表
                for(let item of this.Musics){
                    if(item.id==id){
                        flag = true
                    }
                }
                //不存在 获取音乐信息
                if(!flag){
                    Music.name = info.name
                    Music.author = info.author
                    Music.id = id
                    try {
                        const detail = await  getMusicDetail(Music.id)
                        Music.img = detail.songs[0].al.picUrl
                        const url = await getSongUrl(Music.id)
                        Music.music = url.data[0].url
                        const lrc = await getLyric(Music.id)
                        Music.lyric = lrc.lrc.lyric
                    }
                    catch (e) {
                        this.$toast('暂无歌词')
                    }
                    if(Music.music){
                        this.Musics.splice(++this.currentIndex,0,Music)
                        this.musicStore.setStore(this.Musics)
                        this.$refs.play.isStop = false
                        this.$refs.play.change( this.$refs.play.isStop)
                        this.playShow = true
                    }
                    else {
                        this.$toast('《'+Music.name+'》暂时没有版权，很抱歉')
                    }
                }
                else {
                    //如果当前音乐与添加的音乐相同则只让他播放并显示歌词页面
                    if(this.curMusic.id==id){
                        this.$refs.play.isStop = false
                        this.$refs.play.change( this.$refs.play.isStop)
                        this.playShow = true
                    }
                    //否则找到那一首播放
                    else {
                        for(let i in this.Musics){
                            if(this.Musics[i].id==id){
                                this.playShow = true
                                this.toPlay(i)
                            }
                        }
                    }
                }
            },
            //移除歌曲
            delMusic(index) {
               //列表删除当前选项
                this.Musics.splice(index,1)
                //点击歌曲为当前正在播放
                if(index==this.currentIndex){
                    //如果当前是最后一首歌，播放序号设为0
                    if(this.currentIndex==this.Musics.length){
                        this.currentIndex = 0
                    }
                    this.curMusic = this.Musics[this.currentIndex]
                    this.$refs.play.change( this.$refs.play.isStop)
                }
                if(index<this.currentIndex){
                    this.currentIndex--
                }
                this.musicStore.setStore(this.Musics)
            },
            addAllMusic(res){
               let k = true
                res.forEach(item=>{
                    let out = this.checkId(item.id)
                    if(out){
                        checkMusic(item.id).then(res=>{
                            if(res.message=='ok'){
                                let obj = {}
                                obj.author = item.author
                                obj.name = item.name
                                obj.id = item.id
                                try {getMusicDetail(item.id).then(res=>{
                                    if(res){
                                        obj.img = res.songs[0].al.picUrl
                                        return getSongUrl(item.id)
                                    }
                                }).then(res=>{
                                    if(res){
                                        obj.music = res.data[0].url
                                        return getLyric(item.id)
                                    }
                                }).then(res=>{
                                    if(res){
                                        obj.lyric = ''
                                        if(res.lrc){
                                            obj.lyric = res.lrc.lyric
                                        }
                                        if(obj.music){
                                           if(k){
                                               this.Musics.splice(++this.currentIndex,0,obj)
                                               this.musicStore.setStore(this.Musics)
                                               this.$refs.play.isStop = false
                                               this.$refs.play.change( this.$refs.play.isStop)
                                               this.playShow = true
                                               k = false
                                           }
                                           else {
                                               this.Musics.splice(this.currentIndex,0,obj)
                                               this.musicStore.setStore(this.Musics)
                                           }

                                        }
                                    }
                                }) }
                                catch (e) {
                                    return false
                                }
                            }
                            else {
                                this.$toast("<"+item.name+">暂无版权")
                            }
                        })
                    }
                    else {
                        this.$refs.play.isStop = false
                        this.$refs.play.change( this.$refs.play.isStop)
                        this.playShow = true
                    }
                })
            },
            checkId(id) {
               let k = true
               this.Musics.forEach(item=>{
                 if(item.id == id){
                     k = false
                 }
               })
                return k

            },
        },
        computed: {
            ...mapGetters(['getStatus']),
            getCurMusic() {
                return this.curMusic
            },
            getMusicsLen(){
                return this.Musics.length
            }
        },
        watch: {
            "currentIndex":function () {
                if(!this.enter){
                    this.idStore.setStore(this.currentIndex)
                    this.curMusic = this.Musics[this.currentIndex]
                }
            },
            '$route' (to) {
                if(to.path == '/home/store'){
                    this.transitionName = 'slide-right';
                }else{
                    this.transitionName = 'slide-left';
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .home {
        overflow: hidden;
        /*background: #8cc5ff;*/
        .search {
            height: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
            background: #8cc5ff;
            font-size: 40px;
            span {
                font-size: 40px;
            }
            a {
                width: 80vw;
                height: 80px;
                border-radius: 36px;
                display: block;
                text-align: center;
                line-height: 80px;
                text-decoration: unset;
                color: #252525;
                background: #fff;
                box-shadow: 0 0 5px 1px pink;
            }
        }
        .hidden {
            z-index: -1;
            position: absolute;
            left: -100vw;
            top: 0;
            pointer-events: unset;
            /*transition: all ease-in 0.4s;*/
        }
        .show {
            z-index: 999;
            position: absolute;
            top: 0;
            left: 0;
            /*transition: left ease-in 0.4s;*/
        }
        .van-popup--bottom {
            position: absolute;
            width: 90vw;
            bottom: 6vh;
            margin: auto;
            left: 0;
            right: 0;
            border-radius: 30px;
            padding:20px 30px;
            box-sizing: border-box;
            overflow: hidden;



        }
        /deep/.van-popup__close-icon {
            font-size: 30px;
        }
        .music-list {
            height: 100%-13px;
            overflow-y: auto;
            &::-webkit-scrollbar-corner{
                display: none;
            }
        }
        .item-info {
            height: 5vh;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 36px;
            .list-left {
                flex: 7;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
                align-items: center;
                .cur {
                    font-size: 36px;
                    padding-right: 20px;
                }
                .name{
                    font-size: 32px;
                    padding-right: 20px;
                }
                .author {
                    font-size: 24px;
                    color:#b3b0b0;
                    margin-top: 2px;
                }
            }
            .list-right {
                flex: 1;
                text-align: right;
                padding-right: 10px;
                color:#b3b0b0;
                font-size: 30px;
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

        .pop_title {
                font-size: 40px;
        }
        .router {
            /*width: 100vw;*/
            transition: all .5s cubic-bezier(.55,0,.1,1);
        }
        .slide-left-enter, .slide-right-leave-active {
            opacity: 0;
            -webkit-transform: translate(30px, 0);
            transform: translate(30px, 0);
        }
        .slide-left-leave-active, .slide-right-enter {
            opacity: 0;
            -webkit-transform: translate(-30px, 0);
            transform: translate(-30px, 0);
        }
    }
    /deep/ .van-popup__close-icon {
        font-size: 40px;
    }
    /deep/ .van-skeleton__row,/deep/ .van-skeleton__title {
        height: 32px;
    }
</style>