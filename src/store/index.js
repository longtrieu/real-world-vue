import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: ['FF7R', 'FEH', 'Dragalia Lost', 'KH3', 'Nier'],
  },
  modules: {
    user,
    event,
    notification,
  },
})
