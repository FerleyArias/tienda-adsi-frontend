<template>
  <form @submit.prevent="login(user)" class="container mt-10 m-auto bg-blue-300 max-w-sm rounded-lg overflow-hidden">
    <div class="bg-blue-700 text-white p-2">
      <h1 class="text-xl">Acceso al sistema</h1>
    </div>
    <div class="flex flex-col mx-auto p-10">
      <label class="mb-2 " for="email">Email:</label>
      <input class="mb-2 focus:outline-none p-1" type="email" id="email" name="email" v-model="user.email">
      <label class="mb-2" for="password">Password:</label>
      <input class="mb-2 focus:outline-none p-1" type="password" id="password" name="password" v-model="user.password">
      <button type="submit" class=" text-white font-bold bg-blue-600 p-2 mt-3 w-min rounded-sm">
        Ingresar
      </button>
      <span class="text-red-700">{{error}}</span>
    </div>
  </form>
</template>

<script>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const user = ref({
      email: 'edwin@gmail.com',
      password: '123456'
    })
    const error = computed(()=> store.state.error)
    const loading = computed(()=> store.state.loading)

    const login = (user) => store.dispatch('login', user)

    return{
      user,
      login,
      error,
      loading
    }
  }
}
</script>
