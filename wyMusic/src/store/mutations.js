export default {
  //mutations 唯一目的是修改state中状态
    Statechange(state,payload){
        state.isStop = payload
    },
    isShowChange(state,payload){
        state.isShow = payload
    }

}
