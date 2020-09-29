<template>
    <div class="search-box">
        <div class="nav-head">
            <span class="iconfont icon-fanhui4" @click="goBack"></span>
            <input type="text" v-model="keywords"
                   @focus="_focus"
                   @keyup="handleSearch"
                   @keydown="searchEnter"
                   placeholder="搜索"
            />
        </div>
        <div class="popup" ref="popup" v-show="wordsList.length!=0 && $store.state.isShow&& keywords!=''">
            <div v-for="(item,index) in wordsList"
                 :key="index"
                 class="pop-item"
                 @click="toSearchResult(index)"
            >
                <span class="iconfont icon-sousuo"></span>{{item}}
            </div>
        </div>
        <keep-alive exclude="ResultMusic">
            <router-view class="box"></router-view>
        </keep-alive>

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
            _focus() {
                this.isShow = true
                this.$store.state.isShow = true
                let body = document.getElementsByClassName('search-box')
                body.scrollTop = body.scrollHeight

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
            },
            searchEnter(e) {
                let keywords = this.keywords
                if(e.keyCode==13&&keywords){
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
    }
</script>

<style scoped lang="less">
    body,html {
       /*overflow: hidden;*/
    }
    .search-box {
        position: absolute;
        top: 0;
        width: 100vw;
        background: #ffffff;
        height: 92vh;
        overflow: auto;
        .nav-head {
            position: sticky;
            background: #fff;
            top: 0;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100px;
            overflow: hidden;
            /*box-shadow: inset 0 0 5px 2px pink;*/
            .iconfont {
                font-size: 40px;
                flex: 2;
            }
            input {
                border: none;
                margin-right: 10vw;
                flex: 8;
                padding: 5px;
                border-bottom: 1px solid pink;
                box-sizing: border-box;
                font-size: 40px;
                &::-webkit-input-placeholder {
                    text-align: center;
                    color: pink;
                    font-size: 36px;
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
                font-size: 30px;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                    padding: 0 20px;
                    color: #c8c9cc;
                    font-size: 30px;
                }
            }
        }

    }
</style>