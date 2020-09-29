<template>
  <div class='lyric_box'>
    <div class="til">{{title}}<span>{{author}}</span></div>
    <div style="height: 34vh">
      <div class="lyric">
        <div
                class="lyric_list"
                :style="{transform:`translateY(${moveY}px)`,transition:0.4+`s`}"
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


  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "Lyric",
  props: ["lyric", "title", "currentTime","author"],
  data() {
    return {
      moveY: 0
    };
  },
  created() {
    // console.log(document.documentElement.clientHeight*0.34/)
  },
  computed: {
    lyricAry() {
      let str = this.lyric;
      let ary = [];
      str.replace(/\[(\d+):(\d+)\.(\d+)\] *([^\n]+)/g, function(a, b, c, d,e) {
          var len = a.match(/\[/g).length
         switch(len){
            case 1:ary.push([b * 60 + c * 1 + d/1000, e]);break;
            case 2:
              a.replace(/\[(\d+):(\d+)\.(\d+)\]\[(\d+):(\d+)\.(\d+)\] *([^\n]+)/g,function (a,b,c,d,e,f,g,h) {
              ary.push([b * 60 + c * 1 + d/1000, h])
              ary.push([e * 60 + f * 1 + g/1000, h])
            });break;
            case 3:a.replace(/\[(\d+):(\d+)\.(\d+)\]\[(\d+):(\d+)\.(\d+)\]\[(\d+):(\d+)\.(\d+)\] *([^\n]+)/g,function (a,b,c,d,e,f,g,h,i,j,k) {
              ary.push([b * 60 + c * 1 + d/1000, k])
              ary.push([e * 60 + f * 1 + g/1000, k])
              ary.push([h * 60 + i * 1 + j/1000, k])
            });break;
         }
      });
      ary.sort((a,b)=>{
        return a[0]-b[0]
      })
      return ary;
    },
    activeIndex() {
      let temp = 0;
      let bol = this.lyricAry.some((item, index) => {
        temp = index;
        return this.currentTime <= item[0];
      });
      return bol ? temp - 1 : this.lyricAry.length-1;
    }
  },
  watch: {
    activeIndex(cur) {
      if(cur<3)return;
      this.moveY = 0
      for(let i = 3;i<=cur;i++){
        let el = this.$refs.p[i]
        if(el){
          let obj = getComputedStyle(el);
          this.moveY -= parseFloat(obj.height) + parseFloat(obj.paddingTop) * 2;
        }
      }
    },
    // activeIndex(cur) {
    //   console.log(cur)
    //   if(cur<3)return;
    //   let el = this.$refs.p[cur - 1];
    //   if (el) {
    //     let obj = getComputedStyle(el);
    //     this.moveY -= parseFloat(obj.height) + parseFloat(obj.paddingTop) * 2;
    //     console.log(this.moveY);
    //   }
    // },
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
  font-size: 34px;
  height: 42vh;
  overflow: hidden;
  text-align: center;
  .til {
    height: 6vh;
    width: 60vw;
    display: inline-block;
    padding-top: 2vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      font-size: 28px;
      padding-left: 10px;
    }
  }
  .lyric {
    height: 100%;
    color: #b3b0b0;
    overflow: hidden;
  }
  .lyric_list{
    /*transition: all 0.2s;*/
  }
  p {
    padding: 16px;
    height: 50px;
    line-height: 50px;
  }
  p.active {
    color: #fff;
  }
}
</style>