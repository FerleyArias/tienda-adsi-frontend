
<template>
<div>
    <h1>Mostramos todos los usuarios que tienen acceso a la plataforma</h1>
</div>
</template>
<script>
import {useStore} from 'vuex';
import {computed, onMounted} from 'vue';

export default {
  name: 'Article',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*traemos el token del state*/
    const token = computed(() => store.state.token);
    /*Traer cosas del state*/
    const dataConsult = computed(() => store.state.articles);
    /*Llamar las acciones en el onMounted*/
    const getConsult = () => store.dispatch('getArticles');
    //traemos los datos
    onMounted(() => {
      getConsult()
    });

    return {
      dataConsult,
      token,
    };
  },
};
</script>
