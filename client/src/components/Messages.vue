<template>
  <div>
    <div class="row">
      <div class="column">
        <input type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
      </div>
      <div class="column">
        <button type="submit" @click="tryAddMessage">Add message</button>
      </div>
    </div>
    <table>
      <thead>
        <th>Messsage</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="message in messages">
          <td><span v-bind:class="{ 'pending': isPending(message) }">{{ message.text }}</span></td>
          <td><button :disabled="isPending(message)" type="submit" @click="tryRemoveMessage(message)">X</button></td>
        </tr>
      </tbody>
    </table>
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
  import { findIndex } from 'lodash'
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
      messageVuexEvents.createEvents() // Notice I dont use *this*,
    },
    beforeDestroy () {
      messageVuexEvents.destroyEvents() // Notice I dont use *this*,
    },
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
        return findIndex(this.pending, { _id: message._id }) !== -1
      }
    }
  }
</script>
