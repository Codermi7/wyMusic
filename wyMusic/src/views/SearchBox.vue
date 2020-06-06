<template>
    <div class="search-box">
        <div class="nav-head">
            <span class="iconfont icon-fanhui4" @click="goBack"></span>
            <input type="text" v-model="keywords"
                   @blur="_blur"
                   @focus="_focus"
                   @keyup="handleSearch"
                   placeholder="搜索"
            />
        </div>
        <div class="popup" ref="popup" v-show="wordsList.length!=0 && isShow&& keywords!=''">
            <div v-for="(item,index) in wordsList"
                 :key="index"
                 class="pop-item"
                 @click="toSearchResult(index)"
            >
                <span class="iconfont icon-sousuo"></span>{{item}}
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {searchMusic} from "../api/api";
    import merge from 'webpack-merge';
    export default {
        name: "SearchBox",
        data() {
            return {
                hotMusics:[],
                keywords:"",
                timer:null,
                wordsList:[],
                isShow:false,

            }
        },
        created() {

        },
        methods: {
            goBack() {
                this.$router.back()
            },
            async _searchMusic(keywords){
                let res = await searchMusic(keywords)
                if(res.code==200){
                    this.wordsList=[]
                    for(let item of res.result.songs){
                        if(!this.wordsList.includes(item.name)&&this.wordsList.length<10){
                            this.wordsList.push(item.name)
                        }
                        else {
                            return
                        }
                    }
                }
            },
            handleSearch() {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    if(this.keywords!=''){
                        this._searchMusic(this.keywords)
                    }
                },500)
            },
            _blur() {
                if(this.keywords){
                    return
               }
               else {
                   this.isShow = false
               }
            },
            _focus() {
                this.isShow = true

            },
            toSearchResult(index) {
                    let keywords = this.wordsList[index]
                    if(this.$route.path=='/home/search/hot'){
                        this.$router.push({path:'/home/search/result',query:{keywords}})
                    }
                    else if(this.$route.path=='/home/search/result'){
                        this.$router.replace({
                            query:merge(this.$route.query,{keywords})
                        })
                    }
                    this.keywords=''
            }
        }
    }
</script>

<style scoped lang="less">
    body,html {
       overflow: hidden;
    }
    .search-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        height: 92vh;
        overflow: auto;
        .nav-head {
            position: sticky;
            background: #fff;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 55px;
            .iconfont {
                flex: 2;
                font-size: 20px;
            }
            input {
                flex: 8;
                border: none;
                margin-right: 10vw;
                padding: 5px;
                border-bottom: 1px solid #b3b0b0;
                &::-webkit-input-placeholder {
                    text-align: center;
                }
            }
        }
        .popup {
            position: fixed;
            top: 60px;
            left: 5vw;
            background: #fff;
            box-shadow: 0 0 5px 1px #c8c9cc;
            width: 90vw;
            padding: 10px 0;
            .pop-item {
                padding: 5px;
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                    padding: 0 10px;
                    color: #c8c9cc;
                }
            }
        }

    }
</style>