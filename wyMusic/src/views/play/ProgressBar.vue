<template>
    <div class="progress-bar">
        <div class="style-time">{{getCurrentTime}}</div>
        <div class="block">
            <span class="demonstration"></span>
            <el-slider class="base"
                       ref="progress"
                       @touchstart.native="handleStart"
                       @touchmove.native="handleMove"
                       @touchend.native="handleEnd"
                       @change="sendCurrentPro"
                       :format-tooltip="ShowDate"
                       v-model="percent"
                       :show-tooltip="false"
            >
            </el-slider>
<!--            -->
        </div>
        <div class="style-time">{{totalTime|toFormDate}}</div>
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
                percent:0,
                flag:true,
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
            handleStart() {
              this.flag = false
            },
            handleEnd() {
              this.$emit('JumpProgress',this.$refs.progress.value)
              this.flag = true

            },
            handleMove(){
                this.flag = false
            },
          sendCurrentPro() {
              this.$emit('JumpProgress',this.$refs.progress.value)
              this.flag = true
          }

        },
        computed: {
            getCurrentTime() {
                return this.ShowDate(this.percent)
            }
        },
        watch: {
            'currentTime':function () {
                if(this.flag){
                    this.percent = (this.currentTime/this.totalTime)*100
                }

            }
        },
        filters: {
            toFormDate(value) {
                let date;
                let f = parseInt(value/60);
                let m = parseInt(value-f*60);
                if(m<10){
                    m = '0'+ m
                }
                date = '0'+f+":"+m
                return date
            }
        }
    }
</script>

<style scoped lang="less">
    .progress-bar {
        position: fixed;
        bottom: 10vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .style-time {
            color: #fff;
            font-size: 12px;
            padding: 0 10px;
        }
        .base {
            width: 70vw;
            border-radius: 30px;
        }
        /deep/.el-slider__runway {
            height: 1px;
            background: darkgray;
            margin: 2px 0;
        }
        /deep/.el-slider__bar {
            height: 1px;
            background: azure;
        }
        /deep/.el-slider__button-wrapper {
            height: 26px;
            width: 5px;
            top:-12px;
            .el-slider__button {
                height: 5px;
                width: 5px;
                border: none;
            }
        }
    }
</style>