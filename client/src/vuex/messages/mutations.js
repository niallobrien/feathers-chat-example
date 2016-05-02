import {
  FETCH_MESSAGES, PENDING_FETCH, SUCCESS_FETCH, FAIL_FETCH,
  ADD_MESSAGE, REMOVE_MESSAGE,
  ADD_PENDING, REMOVE_PENDING
  } from '../mutation-types'
import { findIndex } from 'lodash'

// initial state
const state = {
  messages: [], // List of Message *objects*
  pending: [], // List of Message objects not confirmed to have been commmited to db disk
  fetchStatus: ''
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
    if (index > -1) state.messages.$remove(state.messages[index])
  },
  [ADD_PENDING] (state, message) {
    state.pending.push(message)
  },
  [REMOVE_PENDING] (state, message) {
    let index = findIndex(state.pending, { _id: message._id })
    if (index > -1) state.pending.$remove(state.pending[index])
  },
  [PENDING_FETCH] (state) {
    state.fetchStatus = PENDING_FETCH
  },
  [SUCCESS_FETCH] (state) {
    state.fetchStatus = SUCCESS_FETCH
  },
  [FAIL_FETCH] (state) {
    state.fetchStatus = FAIL_FETCH
  }
}
export default {
  state,
  mutations
}
