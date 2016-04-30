import Vue from 'vue'
import Vuex from 'vuex'
import messageMutations from './messages/mutations'

Vue.use(Vuex)

const state = {
  messages: []
}

const mutations = {
  ...messageMutations
}

export default new Vuex.Store({
  state,
  mutations
})
