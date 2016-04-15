import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

import store from './vuex/store'

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  store,
  components: { App }
})

