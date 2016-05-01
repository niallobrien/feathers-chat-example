import * as services from '../../services'
import { FETCH_MESSAGES, ADD_MESSAGE, REMOVE_MESSAGE, ADD_PENDING, REMOVE_PENDING } from '../mutation-types'
export function fetchMessages ({ dispatch }) {
  console.log('fetch messages')
  // Call the messages service on the server via websocket
  services.messageService.find({}).then(messages => {
    console.log('Found them')
    dispatch(FETCH_MESSAGES, messages.data)
  })
}
export function removeMessage ({ dispatch }, message) {
  dispatch(REMOVE_MESSAGE, message)
  // If we are removing a message, mind as well remove a pending, it doesnt exists anymore!
  dispatch(REMOVE_PENDING, message)
}
export function addMessage ({ dispatch }, message) {
  dispatch(ADD_MESSAGE, message)
}
export function addPending ({ dispatch }, message) {
  dispatch(ADD_PENDING, message)
}
export function removePending ({ dispatch }, message) {
  dispatch(REMOVE_PENDING, message)
}
