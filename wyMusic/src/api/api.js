import http from './http'
export function getMusicDetail(id) {
  return http.get('/playlist/detail',{id})
}
export function getSongUrl(id) {
  return http.get('/song/url',{id})
}
export function getLyric(id) {
  return http.get('/lyric',{id})
}
//进去默认歌曲
export function getFirstList() {
  return http.get('/playList/detail',{id:2829883282})

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
