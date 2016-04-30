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
  dispatch('REMOVE_MESSAGE', message)
}
export function addMessage ({ dispatch }, message) {
  dispatch('ADD_MESSAGE', message)
}
// Connect Feather Events to Vuex Actions using FeathersVuex Utility
// Create object with this structure:
// 'event-name': function to execute
const dispatch = store.dispatch
const eventFunctions = {
  created: (message) => addMessage({ dispatch }, message),
  removed: (message) => removeMessage({ dispatch }, message)
}
export const messageVuexEvents = new FeathersVuex(services.messageService, eventFunctions)
