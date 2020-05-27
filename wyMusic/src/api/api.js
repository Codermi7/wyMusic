import http from './http'
import $ from 'jquery'
export function getMusicDetail(id) {
  return http.get('/playlist/detail',{id})
}
export function getSongUrl(id) {
  return http.get('/song/url',{id})
}
export function getLyric(id) {
  return http.get('/lyric',{id})
}
export function getRandom() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url:'https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json',
      success:(res)=>{
        resolve(res)
      },
      error:(err)=> {
        reject(err)
      }
    })
  })
}