import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logined:false,
    userName:''
  },
  mutations: {
    changeUserName(state,payload){
      state.userName = payload
    },
    userLogin(state,payload){
      state.logined=payload
    }
  },
  actions: {
    changeUserName(context,payload){
      context.commit('changeUserName',payload)
    },
    userLogin(context,payload){
      context.commit('userLogin',payload)
    }
  }
})
