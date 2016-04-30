<template>
  <div>
    <input type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
    <button type="submit" @click="tryAddMessage">Add message</button>
    <ul>
      <li v-for="message in messages">
        <span>{{ message.text }}</span>
        <span @click="tryRemoveMessage(message)">x</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as services from '../services'
  import uuid from 'uuid'
  import { getMessages } from '../vuex/getters'
  import { fetchMessages, addMessage, removeMessage, messageVuexEvents } from '../vuex/messages/actions'
  export default {
    name: 'messages',
    vuex: {
      getters: {
        messages: getMessages
      },
      actions: {
        fetchMessages,
        addMessage,
        removeMessage
      }
    },
    data () {
      return {
        newMessage: ''
      }
    },
    ready () {
      this.fetchMessages()
      messageVuexEvents.createEvents() // Notice I dont use this
    },
    beforeDestroy () {
      messageVuexEvents.destroyEvents()
    },
    // TODO optimistic updates
    methods: {
      tryAddMessage () {
        if (this.newMessage.trim()) {
          // Persist a new message to the db
          const newMessage = { _id: uuid.v4(), text: this.newMessage }
          this.addMessage(newMessage) // Optimistic update
          services.messageService.create(newMessage)
            .then(this.newMessage = '')
            .catch(() => this.removeMessage(newMessage)) // Remove message from vuex store
        }
      },
      tryRemoveMessage (message) {
        // Remove message from the db
        this.removeMessage(message) // Optimistic Update
        services.messageService.remove(message._id)
        .catch((err) => {
          this.addMessage(message)
          console.log(err)
        })
      }
    }
  }
</script>
