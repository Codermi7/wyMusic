<template>
    <div class="main-play" v-show="hideshow">
        <div  v-if="curMusic!=undefined" class="left" @click="handleClick" >
            <img  :src="curMusic.img"
                 :class="{stop:$store.state.isStop}"
            >
            <div>
                <p class="music-title">{{curMusic.name}}</p>
                <p class="music-author">{{curMusic.author}}</p>
            </div>
        </div>
        <div  v-else class="left" @click="handleClick" >
            <img  :src="axtx"
                  :class="{stop:$store.state.isStop}"
            >
            <div>
                <p class="music-title">正在加载中...</p>
                <p class="music-author">正在加载中...</p>
            </div>
        </div>
        <div class="right">
           <span :class='($store.state.isStop?"icon-bofang":"icon-bofang2")+" iconfont"' @click="change"></span>
            <span class="iconfont icon-caidan-dakai" @click="showPopup"></span>
        </div>
    </div>
</template>

<script>
    import axtx from '../../assets/imgs/avtx.jpg'
    export default {
        name: "index",
        props: ["curMusic"],
        data(){
            return {
                docmHeight: document.documentElement.clientHeight ||document.body.clientHeight,
                showHeight: document.documentElement.clientHeight ||document.body.clientHeight,
                hideshow:true,  //显示或者隐藏footer
                axtx:axtx
            }
        },
        mounted() {
            // let winHeight = $(window).height();
            // $(window).resize(function() {
            //     var thisHeight = $(this).height();
            //     var keyboardHeight = thisHeight - winHeight;
            //     $(".main-play").css({'bottom': keyboardHeight + 'px'});
            // });
            window.onresize = ()=>{
                this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
            }
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
        watch: {
            //监听显示高度
            showHeight:function() {
                if(this.docmHeight > this.showHeight){
                    //隐藏
                    this.hideshow=false
                }else{
                    //显示
                    this.hideshow=true
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .main-play {
        border-top: 1px solid #f2f2f2;
        position: absolute;
        bottom: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 8vh;
        padding: 0 20px;
        box-sizing: border-box;
        .left {
            display: flex;
            flex: 6;
            align-items: center;
            p {
                font-size: 24px;
                color: #999;
            }
            img {
                height: 6vh;
                width: 6vh;
                border-radius: 50%;
                margin:0 20px 0 10px;
                animation: rotateMove 4s linear infinite;
                &.stop {
                    animation-play-state: paused;
                }
            }
            .music-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 38vw;
            }

        }
        .right {
            flex: 3;
            text-align: center;
            span {
                font-size: 60px;
                margin: 0 15px;
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