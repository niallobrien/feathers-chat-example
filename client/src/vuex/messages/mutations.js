import { FETCH_MESSAGES, ADD_MESSAGE, REMOVE_MESSAGE } from '../mutation-types'
import { findIndex } from 'lodash'

// initial state
const state = {
  messages: []
}
// Define Mutations for this state
const mutations = {
  [FETCH_MESSAGES] (state, messages) {
    console.log('fetch message', state, messages)
    state.messages = messages
  },
  [ADD_MESSAGE] (state, message) {
    let index = findIndex(state.messages, { _id: message._id })
    if (index === -1) state.messages.push(message)
  },
  [REMOVE_MESSAGE] (state, message) {
    // find the index of the obj to remove from array
    let index = findIndex(state.messages, { _id: message._id })
    // remove the obj at position [index] from array
    if (index > -1) state.messages.$remove(state.messages[index])
  }
}
export default {
  state,
  mutations
}
