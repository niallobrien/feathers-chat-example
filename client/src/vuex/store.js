import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const state = {
  messages: []
}

const mutations = {
  FETCH_MESSAGES (state, messages) {
    state.messages = messages
  },

  ADD_MESSAGE (state, message) {
    state.messages.push(message)
  },

  REMOVE_MESSAGE (state, message) {
    // find the index of the obj to remove from array
    let index = _.findIndex(state.messages, { _id: message._id })
    // remove the obj at position [index] from array
    state.messages.$remove(state.messages[index])
  }
}

export default new Vuex.Store({
  state,
  mutations
})
