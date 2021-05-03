<template>
  <div>
    <form
      @submit.prevent="addCategory(item)">
      <h1>Información de las categorias</h1>
      <br>
      <h2>Nombre de la categoria</h2>
      <input
        type="text"
        id="name"
        name="name"
        v-model="item.name"
        placeholder="Nombre"
      />
      <br>
      <h2>Descripción de las categorias</h2>
      <input
        class="mb-2 focus:outline-none p-1"
        type="text"
        id="description"
        name="description"
        v-model="item.description"
        placeholder="Descripcion"
      />
      <br>
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
          <th class="border border-black">Nombre</th>
          <th class="border border-black">Descripcion</th>
          <th class="border border-black">Estado</th>
          <th class="border border-black">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, i) in dataCategory" :key="i">
          <td class="border border-black p-2">
            {{ producto.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.description }}
          </td>
          <td class="border border-black p-2">
            {{ producto.state }}
          </td>
          <!-- <td>{{producto.costo}}</td>
						<td>{{producto.cantidad}}</td>
						<td>{{producto.proveedor}}</td> -->

          <!-- <td><input class="btn btn-info" type="button" value="add" @click="producto.cantidad++"></td>
						<td><input :disabled="producto.cantidad < 1" class="btn btn-success" type="button" value="sell"
								@click="producto.cantidad--"></td>
						<td>{{producto.precio - producto.costo}}</td>-->
          <td class="border border-black p-2">
            <input
              class="p-2 bg-red-500 rounded-md"
              type="button"
              value="eliminar"
              @click="deleteCategory(producto._id)"
            />
            <input
              class="p-2 bg-purple-500 rounded-md"
              type="button"
              value="Activar"
              @click="enableCategory(producto._id)"
            />
            <input
              class="p-2 bg-blue-500 rounded-md"
              type="button"
              value="Modificar"
              @click="modifyCategory(producto._id, item)"
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
  name: 'Category',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*traemos el token del state*/
    const token = computed(() => store.state.token);
    /*Manejo del asincronismo*/
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    /*Traer cosas del state*/
    const dataCategory = computed(() => store.state.categories);
    /*nuevo item a categorias*/
    const item = ref({
      name: '',
      description: '',
    });
    /*Añadir item a categorias*/
    const addCategory = item => store.dispatch('addCategory', item);
    /*Desactivar "eliminar" un item*/
    const deleteCategory = id => store.dispatch('deleteCategory', id);
    /*Activar un item*/
    const enableCategory = id => store.dispatch('enableCategory', id);
    /*Modificar un item*/
    const modifyCategory = (id, item) => store.dispatch('modifyCategory', {id, item})
    /*Llamar las acciones en el onMounted*/
    const getCategory = () => store.dispatch('getCategories');
    //traemos los datos
    onMounted(() => {
      if (!dataCategory.value.length) {
        getCategory();
      }
    });

    return {
      item,
      error,
      loading,
      deleteCategory,
      addCategory,
      modifyCategory,
      enableCategory,
      dataCategory,
      token,
    };
  },
};
</script>
