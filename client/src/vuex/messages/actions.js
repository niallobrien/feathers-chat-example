import * as services from '../../services'
import { FETCH_MESSAGES, ADD_MESSAGE, REMOVE_MESSAGE } from '../mutation-types'
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
}
export function addMessage ({ dispatch }, message) {
  dispatch(ADD_MESSAGE, message)
}
