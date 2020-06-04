<template>
    <div class="main-play">
        <div class="left" @click="handleClick">
            <div class="tx">
                <img :src="getCurrentImg">
            </div>
            <div>
                <p class="music-title">{{this.$store.state.currentMusic.title}}</p>
                <p class="music-author">{{this.$store.state.currentMusic.title}}</p>
            </div>
        </div>
        <div class="right">
           <span :class='($store.state.isStop?"icon-bofang":"icon-bofang2")+" iconfont"' @click="change"></span>
            <span class="iconfont icon-caidan-dakai" @click="showPopup"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            handleClick() {
                this.$emit('toPlay')
            },
            change(){
                this.$emit('change')
            },
            showPopup() {
                this.$emit('ShowPopup')
            }
        },
        computed: {
            getCurrentImg() {
                let localCur = localStorage.getItem('currentIndex')

                let Musics = JSON.parse(localStorage.getItem('MusicList'))
                console.log(Musics)
                return Musics[localCur].img

            }
        },
    }
</script>

<style scoped lang="less">
    .main-play {
        border-top: 1px solid #f2f2f2;
        position: fixed;
        bottom: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 6vh;
        padding: 0 10px;
        box-sizing: border-box;
        .left {
            display: flex;
            flex: 6;
            align-items: center;
            p {
                font-size: 12px;
                color: #999;
            }
            img {
                height: 4vh;
                border-radius: 50%;
                margin:0 20px 0 10px;
            }
        }
        .right {
            flex: 4;
            text-align: center;
            span {
                font-size: 30px;
                margin: 0 10px;
            }
        }
    }
</style>