// /services/index.js
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030')

export const app = feathers().configure(socketio(socket))
// repeat this line for every service in our backend
export const messageService = app.service('messages')

// in  actions.js, your component and anywhere else you need your services:
// import messageService from './services';

// or load all services at once: import * as services from './services'
// and access them as services.messageService etc.
