import http from './http'
export function getMusicDetail(ids) {
  return http.get('/song/detail',{ids})
}
//获取歌曲播放地址
export function getSongUrl(id) {
  return http.get('/song/url',{id})
}
//获取歌词
export function getLyric(id) {
  return http.get('/lyric',{id})
}
//进去默认歌曲
export function getFirstList() {
  return http.get('/playlist/detail',{id:2829883282})

}
//获取歌单精选
export function getTopPlayList() {
  return http.get('/top/playlist',{limit:4})
}
//获取热门搜索
export function getHotDetail() {
  return http.get('/search/hot/detail')
}
//搜索
export function searchMusic(keywords) {
  return http.get('/search',{keywords,limit:20})
}
export function getMusicListInfo(id) {
  return http.get('/playList/detail',{id})
}
export function localStore(name) {
  this.name = name
}
localStore.prototype = {
  getStore:function () {
    return JSON.parse(window.localStorage.getItem(this.name))
  },
  setStore:function (obj) {
    window.localStorage.setItem(this.name,JSON.stringify(obj))
  }
}
