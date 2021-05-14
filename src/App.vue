<template>
  <div class="min-h-screen relative overflow-hidden">
    <my-header/>
    <div class="container my-20 h-full">
      <router-view/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
//Importamos componentes
import MyHeader from "@/components/MyHeader.vue"
import MyFooter from "@/components/MyFooter.vue"

//Importamos las acciones de vuex
import {useStore} from 'vuex'

import {onMounted} from 'vue'

export default {
  name:"App",
  components: { MyHeader, MyFooter },
  setup(){
    const store = useStore()
    //Importamos la función de obtener token de vuex
    const getToken = () => store.dispatch('getToken')

    //En este ciclo verificamos si existe un token, si no, retorna null
    onMounted(getToken)

    return {
      getToken
    }
  }
}
</script>

<style>

</style>
