<template>
    <div class="result-music">

        <div class="wrap">
            <h3>单曲</h3>
            <div v-for="(item,index) in MusicList" :key="item.id" class="item" @click="play(index)">
                <p class="m-name">{{item.name}}</p>
                <p class="m-author">{{item.author}} - {{item.album}}</p>
            </div>
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
                MusicList:[]
            }
        },
        created() {
           this.getMusicList()
        },
        methods: {
            async _searchMusic(keywords){
                let res = await searchMusic(keywords)
                if(res.code==200){
                    for(let item of res.result.songs){
                        if(this.MusicList.length<10){
                            let resItem = new SearchList(item)
                            this.MusicList.push(resItem)
                        }
                        else {

                            return
                        }
                    }
                }
            },
            getMusicList(){
                this.MusicList=[]
                this.keywords=this.$route.query.keywords
                this._searchMusic(this.keywords)
            },
            play(index){
                this.$EventBus.$emit('updatePlay',this.MusicList[index])
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
            padding: 10px 20px;
            h3 {
                margin-bottom: 10px;
            }
            .item {
                padding: 5px;
                .m-name {
                    font-size: 18px;
                    color: #336699;
                }
                .m-author {
                    font-size: 14px;
                    color: #909090;
                }
            }

        }
    }
</style>