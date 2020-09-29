<template>
    <div class="result-music">

        <div class="wrap">
            <h3>单曲</h3>
            <van-skeleton title :row="6" :loading="loading">
                <div v-for="(item,index) in MusicList" :key="item.id" class="item" @click="play(index)">
                    <div class="info">
                        <p class="m-name">{{item.name}}</p>
                        <p class="m-author">{{item.author}} - {{item.album}}</p>
                    </div>
                    <span class="iconfont icon-yinle"></span>
                </div>
            </van-skeleton>
        </div>
    </div>
</template>

<script>
    import {searchMusic} from "../api/api";
    import {SearchList} from "../utils";

    export default {
        name: "ResultMusic",
        data() {
            return{
                keywords:'',
                MusicList:[],
                loading:true,
                curIsClick: {}
            }
        },
        created() {
           this.getMusicList()
        },
        methods: {
            async _searchMusic(keywords){
                let res = await searchMusic(keywords)
                if(res.code==200){
                    this.loading = false
                    for(let item of res.result.songs){
                            let resItem = new SearchList(item)
                            this.MusicList.push(resItem)
                    }
                }
            },
            getMusicList(){
                this.MusicList=[]
                this.keywords=this.$route.query.keywords
                this._searchMusic(this.keywords)
            },
            play(index){
                if(this.curIsClick[index]){
                    if(Date.now()-this.curIsClick[index]<500) return;
                    if(this.$store.state.isShow){
                        this.$store.commit('isShowChange')
                        return
                    }
                    this.$EventBus.$emit('updatePlay',this.MusicList[index])
                }else {
                    this.curIsClick[index] = Date.now()
                    if(this.$store.state.isShow){
                        this.$store.commit('isShowChange')
                        return
                    }
                    this.$EventBus.$emit('updatePlay',this.MusicList[index])
                }

            }
        },
        watch: {
            $route(){
                this.getMusicList()
            }
        }
    }
</script>

<style scoped lang="less">
    .result-music {
        .wrap {
            padding: 20px 40px;
            h3 {
                margin-bottom: 10px;
                font-size: 40px;
            }
            .item {
                padding: 20px 40px 10px 10px;
                display: flex;
                justify-content: space-between;
                &:active {
                    background: #f2f2f2;
                }
                .info {
                    width: 80%;
                    .m-name {
                        font-size: 36px;
                        color: #444;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .m-author {
                        font-size: 28px;
                        color: #909090;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .iconfont {
                    text-align: right;
                    font-size: 24px;
                    padding-top: 5px;
                }
            }

        }
    }
</style>