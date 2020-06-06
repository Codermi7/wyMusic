export default {
  //mutations 唯一目的是修改state中状态
    Statechange(state,payload){
        state.isStop = payload ? payload : !state.isStop
    },
    isShowChange(state,payload){
        state.isShow = payload ? payload : !state.isShow
    }

}
