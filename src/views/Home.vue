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
import {useStore} from 'vuex'
import {ref, computed, onMounted} from 'vue'
export default {
  name: 'Home',
  setup(){
    const store = useStore()
    const dataDB = ref(null)
    //traemos el token del state
    const token = computed(()=> store.state.token)
    const protected_data = async () => {
      try {
        const res = await fetch('https://backend-adsi.herokuapp.com/api/category?value=',{
          headers: {
            'token': token.value
          }
        })

        dataDB.value = await res.json()
        console.log(dataDB.value);

      } catch(error) {
        console.log(`${error}`);
      }
    }

    //traemos los datos
    onMounted(protected_data)

    return{
      dataDB,
      token,
      protected_data,
    }
  }
}
</script>
