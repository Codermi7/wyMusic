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
  return http.get('/top/playlist',{limit:16})
}
//获取热门搜索
export function getHotDetail() {
  return http.get('/search/hot/detail')
}
//搜索
export function searchMusic(keywords,limit) {
  limit = limit || 20
  return http.get('/search',{keywords,limit})
}
export function getMusicListInfo(id) {
  return http.get('/playList/detail',{id})
}
//存本地方法
export function localStore(name) {
  this.name = name
}

//热门mv
export function getMvHot() {
  return http.get('/top/mv',{limit:8})
}
//检测音乐是否可播放
export  function checkMusic(id) {
  return http.get('/check/music',{id})
}
localStore.prototype = {
  getStore:function () {
    return JSON.parse(window.localStorage.getItem(this.name))
  },
  setStore:function (obj) {
    window.localStorage.setItem(this.name,JSON.stringify(obj))
  }
}
