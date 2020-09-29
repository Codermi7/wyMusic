<template>
    <div class="hot-music">
        <h3>热搜榜</h3>
        <van-skeleton title :row="6" :loading="loading">
            <div class="box">
                <div v-for="(item,index) in hotMusics"
                     :key="index"
                     :class="{'list-item':true,active:index<3}"
                     @click="toSearchResult(index)"
                >
                    <span class="info-left">{{index+1}}</span>
                    <div class="info-right">
                        <div class="info-top">
                            <div>{{item.word}}<img v-if="item.iconType!==0" :src="item.iconUrl"></div>
                            <span>{{item.score}}</span>
                        </div>
                        <p class="info-b">{{item.content}}</p>
                    </div>
                </div>
            </div>
        </van-skeleton>
    </div>
</template>

<script>
    import {getHotDetail} from "../api/api";
    import {HotMusic} from "../utils";
    export default {
        name: "HotMusic",
        data(){
            return{
                hotMusics:[],
                loading:true
            }
        },
        created() {
            this._getHotDetail()
        },
        methods: {
            async _getHotDetail() {
                let res = await getHotDetail()
                if(res.code==200){
                    this.loading = false
                    for(let item of res.data){
                        let arr = new HotMusic(item)
                        this.hotMusics.push(arr)
                    }
                }
            },
            toSearchResult(index){
                if(this.$store.state.isShow){
                    this.$store.commit('isShowChange')
                    return
                }
                let keywords = this.hotMusics[index].word
                this.$router.push({path:'/home/search/result',query:{keywords}})
            }
        }
    }
</script>

<style scoped lang="less">
.hot-music {
    h3 {
        font-size: 32px;
        padding: 20px 40px;
    }
    .list-item {
        display: flex;
        padding: 15px 0;
        justify-content: center;
        align-items: center;
        &:active {
            background: #f2f2f2;
        }
        &.active {
            .info-left{
                color: red;
                font-weight: bold;
            }
            .info-right {
                .info-top {
                    div {
                        font-weight: bold;
                    }

                }
            }


        }
        .info-left {
            flex:2 ;
            text-align: center;
            color: #999999;

        }
        .info-right {
            flex: 8;
            padding-right: 5vw;
            .info-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 36px;
                margin-bottom: 5px;
                img {
                    height: 28px;
                    margin-left: 20px;
                }
                span {
                    font-size: 24px;
                }
            }
            .info-b {
                font-size: 24px;
                color:#b3b0b0;
            }
        }
    }
}
</style>