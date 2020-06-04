export default {
  //mutations 唯一目的是修改state中状态
    updateMusic(state,payload){
        console.log(payload)
       state.currentMusic.title=payload.title
        state.currentMusic.bg=payload.bg
        state.currentMusic.img=payload.img
        state.currentMusic.music=payload.music
        state.currentMusic.lyric=payload.lyric
    },
    Statechange(state,payload){
        state.isStop = payload ? payload : !state.isStop
    },
    setTimer(state,payload) {
        state.timer = payload
    },
    clearTimer(state){
        clearInterval(state.timer)
    },
    updateCurrentTime(state,payload){
        state.currentTime = payload
    },
    updateDuration(state,payload){
        state.duration = payload
    },
    updateCurrentIndex(state,payload) {
        state.currentIndex = payload
    }
}
