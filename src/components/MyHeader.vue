<template>
  <header class="flex justify-between bg-blue-700 text-white p-5">
    <div class="flex items-center">
      <button v-show="visible" class="mr-3 ">
        <font-awesome-icon icon="bars"/>
      </button>
      <h3 class="text-lg">Bodega</h3>
    </div>
    <button v-show="visible" @click="logout">
        <font-awesome-icon class="text-2xl" icon="sign-out-alt"/>
    </button>
  </header>
</template>

<script>
import {ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default {
  name: 'MyHeader',
  setup() {
    const store = useStore()
    const route = useRoute()
    const visible = ref(false)
    const logout = () => store.dispatch('logout')
    watch(route, ()=>{
      visible.value = !(route.path === "/login")
    })
    return{
      visible,
      logout
    }
  }
}
</script>