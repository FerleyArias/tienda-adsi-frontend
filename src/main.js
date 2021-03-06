import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars, 
  faSignOutAlt, 
  faHome, 
  faChevronDown, 
  faStore, 
  faTimes, 
  faCheck, 
  faPlusCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faSignOutAlt, faHome, faChevronDown, faStore, faTimes, faTrashAlt, faCheck, faEdit, faPlusCircle, faMinusCircle)

import "tailwindcss/tailwind.css"

const app = createApp(App)

app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)



app.mount('#app')
