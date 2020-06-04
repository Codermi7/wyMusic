export default {
    getMusicUrl(state) {
        console.log(state.currentMusic)
        return state.currentMusic.music;
    },
    getMusicTimer(state) {
        return state.timer
    },
    getCurrentTime(state){
        return state.currentTime
    },
    getDuration(state) {
        return state.duration
    },
    getMusicLyric(state) {
        return state.currentMusic.lyric
    },
    getMusicBg(state){
        return state.currentMusic.bg
    },
    getMusicAcImg(state){
        return state.currentMusic.img
    },
    getCurrentIndex(state){
        return state.currentIndex
    },
    getMusicTitle(state) {
        return state.currentMusic.title
    },
    getStatus(state) {
        return state.isStop
    },
    getMusicList(state) {
        return state.musicList
    }



}
