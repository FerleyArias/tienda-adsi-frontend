<template>
  <div class="min-h-screen relative">
    <my-header/>
    <div class="container mb-10 h-full">
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
import {mapActions} from 'vuex'

export default {
  name:"App",
    components: { MyHeader, MyFooter },
    methods: {
      //Importamos la función de obtener token de vuex
      ...mapActions(['getToken'])
    },
    created(){
      //En este ciclo verificamos si existe un token, si no, retorna null
      this.getToken()
    }
}
</script>

<style>

</style>
