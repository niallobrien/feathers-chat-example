import App from './App'
import { sync } from 'vuex-router-sync'
import './styles'

import store from './vuex/store'
import router from './router/index'

sync(store, router)

router.start(App, 'body')
