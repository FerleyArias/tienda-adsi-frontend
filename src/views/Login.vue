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
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Login',
  data(){
    return {
      user: {
        email: 'edwin@gmail.com',
        password: '123456'
      }
    }
  },
  methods: {
    ...mapActions(['login'])
  }
}
</script>
