<template>
    <div class="music-store">
        <music-swiper :Musics="getMusics" ref="swiper"></music-swiper>
        <h3>歌单精选</h3>
        <div class="music-list">
            <div class="list-item" v-for="(item,index) in playLists" :key="item.id" @click="toMusicList(index)">
                <div class="logo">
                    <img :src="item.img">
                    <p class="count"><span class="iconfont icon-tianchongxing-"></span>{{getCount(index)}}</p>
                </div>
                <p>{{item.name.substring(0,10)+'...'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTopPlayList,getMvHot} from "../api/api";
    import {MusicSwiper} from "../components";

    export default {
        name: "MusicStore",
        data() {
          return {
              playLists:[],
              Musics:[]
          }
        },
        components: {
          MusicSwiper
        },
        created() {
            this._getTopPlayList()
            this._getMvHot()
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
            },
            _getMvHot() {
               this.Musics=[]
               getMvHot().then(res=>{
                   if(res.code==200){
                       let arr = []
                       let data = res.data
                       for(let i in data){
                           if(i>1){
                               let item =data[i]
                               let obj = {}
                               obj.id = item.id
                               obj.name = item.name
                               obj.src = item.cover
                               obj.author = item.artistName
                               arr.push(obj)
                           }

                       }
                       this.Musics=[...arr]
                       this.$refs.swiper.getSwiper()
                   }
               })

            },
            getCount(index) {
               let num = this.playLists[index].playCount
                if(num>100000000){
                    return (num/100000000).toFixed(0)+'亿'
                }
                else  if(num>100000){
                    return  (num/10000).toFixed(0)+'万'
                }
                return num
            }
        },
        computed: {
            getMusics() {
                if(this.Musics.length){
                    return this.Musics
                }
                return []
            }
        }
    }
</script>

<style scoped lang="less">
    .music-store {
        .music-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .list-item {
                text-align: center;
                width: 20vw;
                padding: 5px 8px 0;
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