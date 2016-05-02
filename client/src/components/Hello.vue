<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Enjoy this simple starter that demonstrates an integration of FeathersJS and Vue!. Some highlights of this starter kit:
    </p>
    <ul>
      <li>Demonstrates use of FeathersJS Client for Server Communication</li>
      <li>Uses Vuex for Clients Application State Management</li>
      <li>Demonstrates use of real-time events</li>
      <li>Example of optimistic updates</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Welcome'
    }
  }
}
</script>
