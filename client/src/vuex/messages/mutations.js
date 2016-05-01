import { FETCH_MESSAGES, ADD_MESSAGE, REMOVE_MESSAGE, ADD_PENDING, REMOVE_PENDING } from '../mutation-types'
import { findIndex, indexOf } from 'lodash'

// initial state
const state = {
  messages: [], // List of Message objects
  pending: [] // List of Mesage object not confirmed to have been commmited to db disk
}
// Define Mutations for this state
const mutations = {
  [FETCH_MESSAGES] (state, messages) {
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
  },
  [ADD_PENDING] (state, message) {
    state.pending.push(message._id)
  },
  [REMOVE_PENDING] (state, message) {
    let index = indexOf(state.pending, message._id)
    if (index > -1) state.pending.$remove(state.pending[index])
  }
}
export default {
  state,
  mutations
}
