<template>
  <header class="flex z-10 fixed w-full justify-between bg-blue-700 text-white p-5">
    <div class="flex items-center">
      <button @click="handleBurger" v-show="visible" class="mr-3 ">
        <font-awesome-icon icon="bars"/>
      </button>
      <nav :class="{visibleMenu:visibleBurger}" class=" flex flex-col py-2 text-black menu left-0 bottom-0 flex h-full fixed bg-white">
        <router-link to="/" class="p-3 bg-gray-200 w-full h-12">
          <font-awesome-icon class="text-xl" icon="home"/>
          <span class="ml-3">Home</span>
        </router-link>
        <button class="flex justify-between">
          <span>Almacén</span>
          <font-awesome-icon class="text-xl" icon="chevron-down"/>
        </button>
      </nav>
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
    const visibleBurger = ref(false)
    const handleBurger = () => {
      visibleBurger.value = !visibleBurger.value
    }
    const logout = () => store.dispatch('logout')
    watch(route, ()=>{
      if(route.path === "/login") {
        visible.value = false
        visibleBurger.value = false
      } else {
        visible.value = true
      }
    })
    return{
      visible,
      logout,
      visibleBurger,
      handleBurger
    }
  }
}
</script>

<style scoped>
.menu {
  transform: translateX(-100%);
  top:4.2rem;
  width: 15rem;
  transition-duration: 500ms;
}
.visibleMenu {
  transition-duration: 500ms;
  transform: translateX(0);
}
.visibleSubMenu {
  height: auto;
}
</style>