<template>
  <div>
    <form @submit.prevent="addArticle(item)">
      <input
        type="text"
        id="category"
        name="category"
        v-model="item.category"
        placeholder="Categoria"
      />
      <input
        type="text"
        id="code"
        name="code"
        v-model="item.code"
        placeholder="Codigo"
      />
      <input
        type="text"
        id="name"
        name="name"
        v-model="item.name"
        placeholder="Nombre"
      />
      <input
        type="text"
        id="description"
        name="description"
        v-model="item.description"
        placeholder="Descripcion"
      />
      <input
        type="number"
        id="price"
        name="price"
        v-model="item.price"
        placeholder="Precio"
      />
      <input
        type="number"
        id="stock"
        name="stock"
        v-model="item.stock"
        placeholder="Stock"
      />
      <button
        type="submit"
        class=" text-white font-bold bg-blue-600 p-2 mt-3 w-min rounded-sm"
      >
        Añadir
      </button>
    </form>

    <table class="border-collapse border border-black">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="border border-black">Codigo</th>
          <th class="border border-black">Nombre</th>
          <th class="border border-black">Categoria</th>
          <th class="border border-black">Stock</th>
          <th class="border border-black">Precio Venta</th>
          <th class="border border-black">Descripcion</th>
          <th class="border border-black">Estado</th>
          <th class="border border-black">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, i) in dataArticle" :key="i">
          <td class="border border-black p-2">
            {{ producto.code }}
          </td>
          <td class="border border-black p-2">
            {{ producto.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.category.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.stock }}
          </td>
          <td class="border border-black p-2">
            {{ producto.price }}
          </td>
          <td class="border border-black p-2">
            {{ producto.description }}
          </td>
          <td class="border border-black p-2">
            {{ producto.state }}
          </td>
          <td class="border border-black p-2">
            <input
              class="p-2 bg-red-500 rounded-md"
              type="button"
              value="eliminar"
              @click="deleteArticle(producto._id)"
            />
            <input
              class="p-2 bg-purple-500 rounded-md"
              type="button"
              value="Activar"
              @click="enableArticle(producto._id)"
            />
            <input
              class="p-2 bg-blue-500 rounded-md"
              type="button"
              value="Modificar"
              @click="modifyArticle(producto._id, item)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {useStore} from 'vuex';
import {computed, onMounted, ref} from 'vue';
export default {
  name: 'Article',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*traemos el token del state*/
    const token = computed(() => store.state.token);
    /*Manejo del asincronismo*/
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    /*Traer cosas del state*/
    const dataArticle = computed(() => store.state.articles);
    /*Nuevo item articulos*/
    const item = ref({
      code: '',
      name: '',
      category: '605b5b7048d0b925073ce18c',
      stock: 0,
      price: 0,
      description: '',
    });
    /*Añadir articulos*/
    const addArticle = item => store.dispatch('addArticle', item);
    /*Desactivar "eliminar" un item*/
    const deleteArticle = id => store.dispatch('deleteArticle', id)
    /*Activar un item*/
    const enableArticle = id => store.dispatch('enableArticle', id)
    /*Modificar un item*/
    const modifyArticle = (id, item) => store.dispatch('modifyArticle', {id, item})
    /*Llamar las acciones en el onMounted*/
    const getArticle = () => store.dispatch('getArticle');
    //traemos los datos
    onMounted(() => {
      if (!dataArticle.value.length) {
        getArticle();
      }
    });

    return {
      error,
      loading,
      item,
      addArticle,
      modifyArticle,
      deleteArticle,
      enableArticle,
      dataArticle,
      token,
    };
  },
};
</script>
