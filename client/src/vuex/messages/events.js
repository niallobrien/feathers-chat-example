import * as services from '../../services'
import { addMessage, removeMessage } from './actions'
import FeathersVuex from '../../utils/feathers-vuex'
import store from '../store'

const dispatch = store.dispatch
// Connect Feather Events to Vuex Actions using FeathersVuex Utility
// Create object with this structure:
// 'event-name': function (action) to execute
const eventFunctions = {
  created: (message) => addMessage({ dispatch }, message),
  removed: (message) => removeMessage({ dispatch }, message)
}
export const messageVuexEvents = new FeathersVuex(services.messageService, eventFunctions)
