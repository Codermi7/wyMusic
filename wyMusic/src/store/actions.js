export default {
    UpdateMusic(context,payLoad){
        return new Promise(((resolve, reject) => {
            context.commit('updateMusic',payLoad)
            resolve()
            reject()
        }))
    },
    SetTimer(context,payload) {
        return new Promise(((resolve, reject) => {
            context.commit('setTimer',payload)
            resolve()
            reject()
        }))
    }
}
