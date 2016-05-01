<template>
  <div>
    <input type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
    <button type="submit" @click="tryAddMessage">Add message</button>
    <ul>
      <li v-for="message in messages">
        <span v-bind:class="{ 'pending': isPending(message) }">{{ message.text }}</span>
        <!-- <span v-bind:class="{ 'pending': isPending(message) }" @click="tryRemoveMessage(message)">x</span> -->
        <button :disabled="isPending(message)" type="submit" @click="tryRemoveMessage(message)">X</button>
      </li>
    </ul>
  </div>
</template>
<style media="screen">
  .pending {
    opacity: 0.5;
  }
</style>

<script>
  import * as services from '../services'
  import uuid from 'uuid'
  import { getMessages, getPending } from '../vuex/getters'
  import { fetchMessages, addMessage, removeMessage, addPending, removePending } from '../vuex/messages/actions'
  import { messageVuexEvents } from '../vuex/messages/events'
  export default {
    name: 'messages',
    vuex: {
      getters: {
        messages: getMessages,
        pending: getPending
      },
      actions: {
        fetchMessages,
        addMessage,
        removeMessage,
        addPending,
        removePending
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
          this.newMessage = ''
          this.addMessage(newMessage) // Optimistic update
          this.addPending(newMessage)
          services.messageService.create(newMessage)
            .then(() => {
              this.removePending(newMessage)
            })
            .catch(() => {
              // Pending marker will be automatically removed through removeMessage action
              // TODO UI Error Handling
              this.removeMessage(newMessage)
            })
        }
      },
      tryRemoveMessage (message) {
        // Remove message from the db
        this.removeMessage(message) // Optimistic Update
        services.messageService.remove(message._id)
        .catch((err) => {
          // Error deleting! Add back the message
          // TODO UI Error Handling
          this.addMessage(message)
          console.log(err)
        })
      },
      isPending (message) {
        return this.pending.indexOf(message._id) !== -1
      }
    }
  }
</script>
