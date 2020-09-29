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
                    <van-skeleton :row="6" :loading="loading">
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
                    </van-skeleton>

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
                MusicList:[],
                loading:true,
                curIsClick:{}
            }
        },
        created() {
            this.list = JSON.parse(this.$route.query.option)
            this._getListInfo()
        },
        methods: {
            goBack() {
                this.$router.back()
            },
            async _getListInfo() {
                let res = await getMusicListInfo(this.list.id)
                if(res.code==200){
                    this.loading = false
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
                if(this.curIsClick[index]){
                    if(Date.now() - this.curIsClick[index] < 500)return
                    this.$EventBus.$emit('updatePlay',this.MusicList[index])
                }else {
                    this.curIsClick[index]=Date.now()
                    this.$EventBus.$emit('updatePlay',this.MusicList[index])
                }
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
        background-size: cover;
        box-sizing: border-box;
        .nav-head {
            color: #fff;
            height: 90px;
            display: flex;
            align-items: center;
            font-size: 40px;
            padding: 0 40px;
            position: fixed;
            top: 0;
            z-index: 10;
            span {
                margin-right: 20px;
                font-size: 40px;
            }
        }
        .banner {
            display: flex;
            color: #fff;
            padding: 40px 40px;
            height: 29vh;
            box-sizing: border-box;
            .the-img {
                width: 40vw;
                height: 40vw;
                position: relative;
                font-size: 28px;
                img {
                    height: 100%;
                    border-radius: 5px;
                }
                .play-count {
                    position: absolute;
                    right: 16px;
                    top: 4px;
                    .iconfont {
                        font-size: 10px;
                    }
                }
            }
            .the-info {
                color: #fff;
                padding-left: 60px;
                h3 {
                    font-size: 36px;
                }
                .au-info,.txt {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    font-size: 24px;
                    margin: 20px 0;
                    color: #C6BEBB;
                    span {
                        font-size: 28px;
                    }
                    img {
                        height: 100%;
                        border-radius: 50%;
                        margin-right: 20px;
                    }
                }
                .txt {
                    color: #A49B96;
                }
            }
        }
        .music-list {
            background: #fff;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            box-shadow: 0 0 5px #f2f2f2;
            height: calc(92vh - 55px - 29vh);
            overflow: auto;
            .player {
                font-size: 40px;
                padding-left: 6vw;
                display: flex;
                height: 6vh;
                position: sticky;
                top: 0;
                align-items: center;
                background: #fff;
                /*box-shadow: 0 0 1px 1px rgba(0,0,0,.1);*/
                .iconfont {
                    font-size: 48px;
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
                padding: 15px 0;
                font-size: 30px;
                .item-left {
                    flex: 2;
                    text-align: center;
                    color: #999;
                }
                .item-right {
                    flex-wrap: nowrap;
                    width: 60%;
                    color: #444444;
                    .item-author ,.item-title{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
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