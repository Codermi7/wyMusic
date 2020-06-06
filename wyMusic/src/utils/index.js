export class HotMusic {
    constructor(info) {
        this.word = info.searchWord
        this.iconType = info.iconType
        this.score = info.score
        this.content = info.content
        this.iconUrl = info.iconUrl
    }
}
export class SearchList {
    constructor(info) {
        this.id = info.id;
        this.name = info.name
        this.author = info.artists[0].name
        this.album = info.album.name
    }
}

export  function debounce(func, delay){
    let timer = null
    return function (...args) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}