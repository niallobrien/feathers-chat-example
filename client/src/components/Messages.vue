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
  import { getMessages } from '../vuex/getters'
  import { fetchMessages, addMessage, removeMessage } from '../vuex/actions'

  export default {
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
      this.addMessage()
      this.removeMessage()
    },

    methods: {
      tryAddMessage () {
        if (this.newMessage.trim()) {
          // Persist a new message to the db
          services.messageService.create({ text: this.newMessage }).then(this.newMessage = '')
        }
      },
      tryRemoveMessage (message) {
        // Remove message from the db
        services.messageService.remove(message._id)
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>
