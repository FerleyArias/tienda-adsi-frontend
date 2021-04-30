
<template>
<div>
    <h1>Categorias - Pruebas</h1>
    <p>{{ dataCategory }}</p>
</div>
</template>
<script>
import {useStore} from 'vuex';
import {computed, onMounted} from 'vue';

export default {
  name: 'Category',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*traemos el token del state*/
    const token = computed(() => store.state.token);
    /*Traer cosas del state*/
    const dataCategory = computed(() => store.state.articles);
    /*Llamar las acciones en el onMounted*/
    const getCategory = () => store.dispatch('getArticles');
    //traemos los datos
    onMounted(() => {
      getCategory()
    });

    return {
      dataCategory,
      token,
    };
  },
};
</script>
