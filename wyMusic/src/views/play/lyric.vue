<template>
  <div class='lyric_box'>
    <div class="til">{{title}}</div>
    <div class="lyric">
      <div
        class="lyric_list"
        :style="{transform:`translateY(${moveY}px)`}"
      >
        <p
          v-for='(item,index) in lyricAry'
          ref='p'
          :key='index'
          :class='{active:activeIndex == index}'
        >{{item[1]}}</p>
      </div>
    </div>

  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "Lyric",
  props: ["lyric", "title", "currentTime"],
  data() {
    return {
      // lyricAry:[]
      moveY: 0
    };
  },
  computed: {
    lyricAry() {
      let str = this.lyric;
      //   console.log(str);
      // console.log(str.match(/:/g).length)
      let ary = [];
      str.replace(/\[(\d+):(\d+)\.(\d+)\] *([^\n]+)/g, function(a, b, c, d,e) {

          console.log(e)
          ary.push([b * 60 + c * 1 + d/1000, e]);

      });
      return ary;
    },
    activeIndex() {
      let temp = 0;
      let bol = this.lyricAry.some((item, index) => {
          // console.log('item:'+item,'index:'+index)
        temp = index;
        return this.currentTime <= item[0];
      });
      return bol ? temp - 1 : this.lyricAry.length-1;
    }
  },
  watch: {
    activeIndex(cur) {
      if(cur<3)return;
      let el = this.$refs.p[cur - 1];
      if (el) {
        let obj = getComputedStyle(el);
        this.moveY -= parseFloat(obj.height) + parseFloat(obj.paddingTop) * 2;
        // console.log(this.moveY);
      }
    },
    lyricAry(){
      this.moveY = 0;
    }
  },
  methods: {
    matchLyric() {}
  },
  components: {}
};
</script>
<style lang="less">
.lyric_box {
  color: #fff;
  position: relative;
  font-size: 17px;
  height: 48vh;
  overflow: hidden;
  text-align: center;
  .til {
    height: 6vh;
    padding-top: 2vh;
  }
  .lyric {
    height: 40vh;
    color: #b3b0b0;
    overflow: hidden;
  }
  .lyric_list{
    transition: all 0.2s;
  }
  p {
    padding: 10px;
  }
  p.active {
    color: #fff;
  }
}
</style>