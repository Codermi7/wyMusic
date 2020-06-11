<template>
    <div class="play-list" :style="getBackImg">
        <div class="mask">
            <div class="nav-head">
                <span class="iconfont icon-fanhui4" @click="goBack"></span>歌单
            </div>
            <div class="container">
                <div class="banner">
                    <div class="the-img">
                        <img :src="list.img">
                        <div class="play-count">
                            <span class="iconfont icon-arrow-"></span>
                            {{list.playCount/10000>10?(list.playCount/10000).toFixed(0)+'万':list.playCount}}
                        </div>
                    </div>
                    <div class="the-info" v-if="author">
                        <h3>{{getListName}}</h3>
                        <div class="au-info">
                            <img  :src="author.avUrl">
                            {{author.nickname}}
                            <span class="iconfont icon-xiangyou2"></span>
                        </div>
                        <div class="txt">
                            <p>{{getsignTxt}}</p>
                            <span class="iconfont icon-xiangyou2"></span>
                        </div>
                    </div>
                </div>
                <div class="music-list" ref="music_list">
                    <div class="player"  @click="addAll(MusicList)">
                        <span class="iconfont icon-bofang"></span>
                        <p>全部播放({{MusicList.length}})</p>
                    </div>
                    <div v-for="(item,index) in MusicList"
                         :key="item.id"
                         class="item"
                         @click="play(index)"
                    >
                        <span class="item-left">{{index+1}}</span>
                        <div class="item-right">
                            <p class="item-title">{{item.name}}</p>
                            <p class="item-author">{{item.author}} - {{item.album}}</p>
                        </div>
                        <span class="iconfont icon-gengduo"></span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {getMusicListInfo} from "../api/api";
    export default {
        name: "MusicPlayList",
        data() {
            return {
                list:{},
                author:null,
                MusicList:[]
            }
        },
        created() {
            console.log(this.$route.query.option)
            this.list = this.$route.query.option
            this._getListInfo()
        },
        methods: {
            goBack() {
                this.$router.back()
            },
            async _getListInfo() {
                let res = await getMusicListInfo(this.list.id)
                if(res.code==200){
                    let info = res.playlist.creator
                    let obj = {}
                    obj.avUrl = info.avatarUrl
                    obj.nickname = info.nickname
                    obj.signature = info.signature
                    obj.bacImg = info.backgroundUrl
                    this.author = obj
                    for(let item of res.playlist.tracks){
                        let resItem = {}
                        resItem.name = item.name
                        resItem.id = item.id
                        resItem.author = item.ar[0].name
                        resItem.album = item.al.name
                        this.MusicList.push(resItem)
                    }
                }
            },
            play(index) {
                this.$EventBus.$emit('updatePlay',this.MusicList[index])
            },
            addAll(data) {
                this.$EventBus.$emit('addAll',data)
            }
        },
        computed: {
            getBackImg() {
                return {"backgroundImage":"url("+this.list.img+")"}
            },
            getsignTxt(){
                if(!this.author) return
                if(this.author.signature.length>20){
                    return  this.author.signature.substring(0,20)+'...'
                }
                return this.author.signature
            },
            getListName() {
                if(this.list.name.length>15){
                    return this.list.name.substring(0,15)+'...'
                }
                return  this.list.name
            }
        }
    }
</script>

<style scoped lang="less">
    .mask {
        background: rgba(0,0,0,.4);
        padding-top: 55px;
    }
    .play-list {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        height: 92vh;

        background-repeat: no-repeat;
        background-position: center;
        box-sizing: border-box;
        .nav-head {
            color: #fff;
            height: 55px;
            display: flex;
            align-items: center;
            font-size: 20px;
            padding: 0 20px;
            position: fixed;
            top: 0;
            z-index: 10;
            /*background: rgba(0,0,0,.4);*/
            span {
                margin-right: 20px;
            }
        }
        .banner {
            display: flex;
            justify-content: space-between;
            color: #fff;
            padding: 20px 20px;
            height: 29vh;
            box-sizing: border-box;
            .the-img {
                width: 40vw;
                height: 40vw;
                position: relative;
                font-size: 14px;
                img {
                    height: 100%;
                    border-radius: 5px;
                }
                .play-count {
                    position: absolute;
                    right: 4px;
                    top: 2px;
                    .iconfont {
                        font-size: 10px;
                    }
                }
            }
            .the-info {
                color: #fff;
                padding-left: 20px;
                h3 {
                    font-size: 18px;
                }
                .au-info,.txt {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    margin: 10px 0;
                    color: #C6BEBB;
                    img {
                        height: 100%;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                }
                .txt {
                    color: #A49B96;
                }
            }
        }
        .music-list {
            background: #fff;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            box-shadow: 0 0 5px #f2f2f2;
            height: calc(92vh - 55px - 29vh);
            overflow: auto;
            .player {
                font-size: 24px;
                padding-left: 6vw;
                display: flex;
                height: 6vh;
                position: sticky;
                top: 0;
                align-items: center;
                background: #fff;
                .iconfont {
                    font-size: 30px;
                    margin-right: 10px;
                }
                &:active {
                    background: #f2f2f2;
                }
            }
            .wrap {
                overflow: scroll;
            }
            .item {
                display: flex;
                align-items: center;
                padding: 10px 0;
                .item-left {
                    flex: 2;
                    text-align: center;
                    color: #999;
                }
                .item-right {
                    flex: 6;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #444444;
                    .item-author {
                        font-size: 12px;
                        color:#b3b0b0;
                    }
                }
                .iconfont {
                    flex: 2;
                    text-align: center;
                    color: #B5B5B5;
                }
                &:active {
                    background: #f2f2f2;
                }
            }
        }
    }

</style>