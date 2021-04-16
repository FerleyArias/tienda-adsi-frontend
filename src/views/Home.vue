<template>
 <div v-if="token">
   <h1>Token</h1><br>
    <p>{{token}}</p><br>
    <!-- Trayendo categoria como pruebas -->
   <h1>Categorias - Pruebas </h1><br>
   <p>{{dataDB}}</p>
 </div>
</template>
<script>
//Importamos el state para ver si el token existe
import {mapState} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      dataDB: null
    }
  },
  computed:{
    //traemos el token del state
    ...mapState(['token'])
  },
  methods: {
    async protected_data() {
      try {
        const res = await fetch('https://backend-adsi.herokuapp.com/api/category?value=',{
          headers: {
            'token': this.token
          }
        })

        this.dataDB = await res.json()
        console.log(this.dataDB);

      } catch(error) {
        console.log(`${error}`);
      }
    }
  },
  created(){
    this.protected_data()
  }
}
</script>
