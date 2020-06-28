<template>
    <div id="swiper" class="swiper-container" >
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in Musics" :key="index">
                <img :src="item.src">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/css/swiper.css'
    export default {
        name: "index",
        props: {
            Musics: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
          return {
          }
        },
        methods: {
            getSwiper() {
                //数据加载完才创建swiper，防止滚动失效
                this.$nextTick(()=>{
                    return new Swiper ('#swiper',{
                        loop:true,
                        autoplay:true,
                        autoPlay: {
                            disableOnInteraction: false
                        },
                        effect : 'slide',
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        observe:true,
                        observeParents:false
                    })
                })

            }

        },

    }
</script>

<style scoped lang="less">
    .swiper-container {
        height: 210px;
        width: 100%;
        --swiper-pagination-color: #f40;
        .swiper-slide {
            height: 100%;
            width: 100%;
            img{
                width: 100%;
            }
        }
    }

</style>

