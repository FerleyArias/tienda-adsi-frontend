<template>
<div>
    <h1>Artículos - Pruebas</h1>
    <p>{{ dataArticle }}</p>
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
    const dataArticle = computed(() => store.state.articles);
    /*Llamar las acciones en el onMounted*/
    const getArticle = () => store.dispatch('getArticles');
    //traemos los datos
    onMounted(() => {
      getArticle()
    });

    return {
      dataArticle,
      token,
    };
  },
};
</script>
