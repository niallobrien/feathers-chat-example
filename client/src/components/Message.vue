<template>
  <td><span v-bind:class="{ 'pending': isPending }">{{ message.text }}</span></td>
  <td><button :disabled="isPending" type="submit" @click="tryRemoveMessage(message)">X</button></td>
</template>
<style media="screen">
  .pending {
    opacity: 0.5;
  }
</style>

<script>
  import * as services from '../services'
  import { addMessage, removeMessage } from '../vuex/messages/actions'
  export default {
    name: 'message',
    props: ['message', 'isPending'],
    vuex: {
      actions: {
        addMessage,
        removeMessage
      }
    },
    methods: {
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
      }
    }
  }
</script>
