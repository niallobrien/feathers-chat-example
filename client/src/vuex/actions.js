import * as services from '../services'

export const fetchMessages = function ({dispatch}) {
  // Call the messages service on the server via websocket
  services.messageService.find({}).then(messages => {
    dispatch('FETCH_MESSAGES', messages.data)
  })
}

export const addMessage = function ({dispatch}) {
  // A new message has been created on the server, so dispatch a mutation to update our state/view
  services.messageService.on('created', message => {
    dispatch('ADD_MESSAGE', message)
  })
}

export const removeMessage = function ({dispatch}) {
  // A message has been removed from the server, so dispatch a mutation to update our state/view
  services.messageService.on('removed', message => {
    dispatch('REMOVE_MESSAGE', message)
  })
}
