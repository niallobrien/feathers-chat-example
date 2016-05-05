
import VueRouter from 'vue-router'
import Vue from 'vue'
import Index from '../components/Hello'
import Messages from '../components/Messages'

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/index': {
    component: Index
  },
  '/messages': {
    component: Messages
  }
})

export default router
