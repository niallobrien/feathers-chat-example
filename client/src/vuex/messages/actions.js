import * as services from '../../services'
import FeathersVuex from '../../utils/feathers-vuex'
import store from '../store'

export function fetchMessages ({ dispatch }) {
  // Call the messages service on the server via websocket
  services.messageService.find({}).then(messages => {
    dispatch('FETCH_MESSAGES', messages.data)
  })
}
export function removeMessage ({ dispatch }, message) {
  console.log('REMOVE')
  dispatch('REMOVE_MESSAGE', message)
}
export function addMessage ({ dispatch }, message) {
  dispatch('ADD_MESSAGE', message)
}

const dispatch = store.dispatch
const eventFunctions = {
  created: (message) => addMessage({ dispatch }, message),
  removed: (message) => removeMessage({ dispatch }, message)
}
export const messageVuexEvents = new FeathersVuex(services.messageService, eventFunctions)
