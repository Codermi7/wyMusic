import {request} from './request'

export  function getNewsMusic() {
    return request({
        url:'/personalized/newsong',
        // params:{
        //     from: 'music'
        // }
    })
}
export function getPlayUrl(id) {
    return request({
        url:'/music/url',
        params: {
            id
        }
    })
}
export  function getLyric(id) {
    return request({
        url:'/lyric',
        params: {
            id
        }
    })
}
export class NewSong {
    constructor(MusicInfo) {
        this.id = MusicInfo.id
        this.name = MusicInfo.name
        this.bg = MusicInfo.song.artists[0].img1v1Url
        this.author = MusicInfo.song.artists[0].name
        this.img = MusicInfo.picUrl
    }
}