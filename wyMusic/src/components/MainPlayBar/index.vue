<template>
    <div class="main-play" >
        <div class="left" @click="handleClick" >
            <img :src="curMusic.img"
                 :class="{stop:$store.state.isStop}"
            >
            <div>
                <p class="music-title">{{curMusic.name}}</p>
                <p class="music-author">{{curMusic.author}}</p>
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
        props: ["curMusic","img"],
        mounted() {
            let winHeight = $(window).height();
            $(window).resize(function() {
                var thisHeight = $(this).height();
                var keyboardHeight = thisHeight - winHeight;
                $(".main-play").css({ 'bottom': keyboardHeight + 'px' });
            });
        },
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
        height: 8vh;
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
                height: 6vh;
                border-radius: 50%;
                margin:0 20px 0 10px;
                animation: rotateMove 4s linear infinite;
                &.stop {
                    animation-play-state: paused;
                }
            }

        }
        .right {
            flex: 4;
            text-align: center;
            span {
                font-size: 36px;
                margin: 0 10px;
            }
        }
        @keyframes rotateMove {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>