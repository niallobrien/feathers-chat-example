import * as services from '../../services'
import {
  FETCH_MESSAGES, PENDING_FETCH, SUCCESS_FETCH, FAIL_FETCH,
  ADD_MESSAGE, REMOVE_MESSAGE,
  ADD_PENDING, REMOVE_PENDING
  } from '../mutation-types'
export function fetchMessages ({ dispatch }) {
  // Call the messages service on the server via websocket
  dispatch(PENDING_FETCH)
  services.messageService.find({}).then(messages => {
    dispatch(SUCCESS_FETCH)
    dispatch(FETCH_MESSAGES, messages.data)
  })
  .catch((err) => {
    dispatch(FAIL_FETCH, err)
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
