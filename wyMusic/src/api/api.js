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