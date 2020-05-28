<template>
    <div class="progress-bar">
        <div class="block">
            <span class="demonstration"></span>
            <el-slider class="base" ref="progress" @click.native="sendCurrentPro" :format-tooltip="ShowDate"  v-model="percent"></el-slider>
<!--            -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props: {
            currentTime:{
                type:Number
            },
            totalTime:{
                type:Number
            }
        },
        data(){
            return {
                percent:0
            }
        },
        methods: {
          ShowDate(value){
              let time = (value/100)*this.totalTime
              let date;
              let f = parseInt(time/60);
              let m = parseInt(time-f*60);
              if(m<10){
                  m = '0'+ m
              }
              date = '0'+f+":"+m
              return date
          },
          sendCurrentPro() {
              console.log('555')
              this.$emit('JumpProgress',this.$refs.progress.value)
          }

        },
        computed: {
        },
        watch: {
            'currentTime':function () {
                this.percent = (this.currentTime/this.totalTime)*100
            }
        }
    }
</script>

<style scoped lang="less">
    .progress-bar {
        position: fixed;
        bottom: 10vh;
        .base {
            width: calc(100vw - 40px);
            margin-right: 20px;
            margin-left: 20px;
            border-radius: 30px;
        }
    }
</style>