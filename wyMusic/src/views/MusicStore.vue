<template>
    <div class="music-store">
        <h3>歌单精选</h3>
        <div class="music-list">
            <div class="list-item" v-for="item in playLists" :key="item.id">
                <div class="logo">
                    <img :src="item.img">
                    <p></p>
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
            }
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
                    p {
                        position: absolute;
                        height: 20%;
                        background: #b3b0b0;
                        bottom: 0;
                        left: 0;
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