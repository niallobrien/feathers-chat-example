<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <p>
          Two second delay added to demonstrate optimistic upates.
          <span class="pending-fetch" v-show="pendingFetch">Fetching New Messages...</span>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <input type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
      </div>
      <div class="column">
        <button :disabled="pendingFetch" type="submit" @click="tryAddMessage">Add message</button>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <table>
          <thead>
            <th>Messsage</th>
            <th>Action</th>
          </thead>
          <tbody v-for="message in messages">
            <tr is="message" :message="message" :is-pending="isPending(message)" ></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style media="screen">
  .pending {
    opacity: 0.5;
  }
  .pending-fetch{
    color: #9b4dca;
  }
</style>

<script>
  import Message from './Message'
  import * as services from '../services'
  import uuid from 'uuid'
  import { findIndex } from 'lodash'
  import { getMessages, getPending, getFetchStatus } from '../vuex/getters'
  import { fetchMessages, addMessage, removeMessage, addPending, removePending } from '../vuex/messages/actions'
  import { messageVuexEvents } from '../vuex/messages/events'
  export default {
    name: 'messages',
    components: {
      'message': Message
    },
    vuex: {
      getters: {
        messages: getMessages,
        pending: getPending,
        fetchStatus: getFetchStatus
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
    computed: {
      pendingFetch () {
        return this.fetchStatus === 'PENDING_FETCH'
      }
    },
    methods: {
      tryAddMessage () {
        if (this.newMessage.trim()) {
          // Persist a new message to the db
          const newMessage = { _id: uuid.v4(), text: this.newMessage }
          this.newMessage = ''
          this.addMessage(newMessage) // Optimistic update
          this.addPending(newMessage) // Mark Message as Pending
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
      isPending (message) {
        return (findIndex(this.pending, { _id: message._id }) !== -1 || this.pendingFetch)
      }
    }
  }
</script>
