import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faSignOutAlt)

import "tailwindcss/tailwind.css"

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
