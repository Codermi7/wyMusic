<template>
  <div class='record_box'>
    <div
      class="record"
      :class='{stop:isStop}'
    >
        <img
                id="imgs"
                :src="img"
                alt=""
                crossorigin="anonymous"
        >
      <div class="record_bg" @click='click'></div>
    </div>
    <div class="btn" @click='click' v-show='isStop'>

    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import ColorThief from "colorthief";
export default {
  name: "Record",
  props: ["img",'isStop'],
  data() {
    return {
      stop: "stop",
        colors:''
    };
  },
    mounted() {
      this.imgColor()
    },
    methods: {
    click() {
        this.$emit('click',!this.isStop)
    },
      imgColor() {
          let colorthief = new ColorThief();
          let domImg = document.querySelector('#imgs');
          domImg.addEventListener('load', () => {
              console.log('加载好了并取色', colorthief.getPalette(domImg, 2));//第二个参数可选(1~10)
              this.colors = colorthief.getPalette(domImg)[0];
              console.log(this.colors)
          })
      }
  },
};
</script>
<style lang="less">
.record_box {
  position: relative;
  height: 42vh;
  &::before {
    content: "";
    display: block;
    width: 30vw;
    height: 30vw;
    position: absolute;
    background-image: url("../../assets/imgs/needle.png");
    background-size: contain;
    background-repeat: no-repeat;
    left: 45%;
    z-index: 100;
  }
  .record {
    width: 60vw;
    height: 60vw;
    position: relative;
    z-index: 20;
    margin: auto;
    top: 15vw;
    animation: rotateMove 4.2s linear infinite;
    img {
      position: absolute;
      width: 65%;
      height: 65%;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .record_bg {
      position: relative;
      width: 100%;
      height: 100%;
      top: 0;
      border-radius: 50%;
      background-image: url("../../assets/imgs/circle.png");
      background-position: center center;
      background-size: contain;
    }
  }
  .stop {
    animation-play-state: paused;
  }
  .btn {
    position: absolute;
    z-index: 120;
    width: 15vw;
    height: 15vw;
    left: 50%;
    top: 37vw;
    transform: translate(-50%,0);
		background: url('../../assets/imgs/play_btn.png') no-repeat center center;
		background-size: contain;
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