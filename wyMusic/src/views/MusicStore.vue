<template>
    <div class="music-store">
        <h3>歌单精选</h3>
        <div class="music-list">
            <div class="list-item" v-for="(item,index) in playLists" :key="item.id" @click="toMusicList(index)">
                <div class="logo">
                    <img :src="item.img">
                    <p class="count"><span class="iconfont icon-tianchongxing-"></span>{{item.playCount/10000>10?(item.playCount/10000).toFixed(0)+'万':item.playCount}}</p>
                </div>
                <p>{{item.name.substring(0,10)+'...'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTopPlayList} from "../api/api";
    export default {
        name: "MusicStore",
        data() {
          return {
              playLists:[]
          }
        },
        created() {
            this._getTopPlayList()
        },
        methods: {
           async _getTopPlayList() {
               let res = await getTopPlayList()
               if(res.code==200){
                   let ar = res.playlists
                   for(let item of ar){
                       let cate = {}
                       cate.name= item.name
                       cate.id = item.id
                       cate.img = item.coverImgUrl
                       cate.playCount = item.playCount
                       this.playLists.push(cate)
                   }
               }
            },
            toMusicList(index){
               console.log(this.playLists[index])
                this.$router.push({path:'/home/list',query:{option:this.playLists[index]}})
            }
        },
        computed: {
        }
    }
</script>

<style scoped lang="less">
    .music-store {
        .music-list {

            display: flex;
            justify-content: space-around;
            .list-item {
                text-align: center;
                padding: 5px 10px 0;
                .logo {
                    position: relative;
                    height: 20vw;
                    .count {
                        position: absolute;
                        height: 25%;
                        background: rgba(0,0,0,.7);
                        bottom: 0;
                        left: 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                        color: #fff;
                        .iconfont {
                            font-size: 12px;
                        }
                    }
                }
                img {
                    width: 20vw;
                    height: 100%;
                }
                p {
                    font-size: 12px;
                    text-align: left;
                    padding: 0;
                }
            }
        }
    }
</style>