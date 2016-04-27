import * as services from '../services'

export const fetchMessages = function ({dispatch}) {
  // Call the messages service on the server via websocket
  services.messageService.find({}).then(messages => {
    dispatch('FETCH_MESSAGES', messages.data)
  })
}
// Listener Object, held in local scope to remove later on component unmount
let addListener = null
let removeListener = null
export const addMessage = function ({dispatch}) {
  // A new message has been created on the server, so dispatch a mutation to update our state/view
  addListener = (message) => { dispatch('ADD_MESSAGE', message) }
  services.messageService.on('created', addListener)
}
export const removeMessage = function ({dispatch}) {
  // A message has been removed from the server, so dispatch a mutation to update our state/view
  removeListener = (message) => { dispatch('REMOVE_MESSAGE', message) }
  services.messageService.on('removed', removeListener)
}
export const stopAddMessageListener = function () {
  // Stop listening to add messages
  // Prevents memory leak and duplicate messages because a new addMessage listener will be created when the component remounts (hot reload, navigation)
  services.messageService.off('created', addListener)
}
export const stopRemoveMessageListener = function () {
  services.messageService.off('removed', removeListener)
}
