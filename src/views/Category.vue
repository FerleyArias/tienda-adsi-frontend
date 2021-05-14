<template>
  <div>
    <div v-show="modal.active" class="fixed z-10 top-0 bottom-0 right-0 left-0">
      <button @click="closeModal" class="absolute bg-black w-full h-full opacity-50">
      </button>
      <form
        class="relative z-20 mx-auto max-w-xs bg-white p-5 mt-10"
        @submit.prevent="() => {
          if(modal.option === 1) {
            addCategory(item)
          } else {
            modifyCategory(modal.id, item)
          }
        }">
        <button @click="closeModal" class="absolute focus:outline-none top-2 right-2 text-gray-500" >
          <font-awesome-icon
            icon="times"
          />
        </button>
        <h1>Información de las categorias</h1>
        <br>
        <h2>Nombre</h2>
        <input
          class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          type="text"
          id="name"
          name="name"
          v-model="item.name"
          placeholder="Nombre"
        />
        <br>
        <h2>Descripción</h2>
        <input
          class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          type="text"
          id="description"
          name="description"
          v-model="item.description"
          placeholder="Descripcion"
        />
        <br>
        <button
          type="submit"
          class=" text-white font-bold bg-blue-600 p-2 focus:outline-none mt-3 w-min rounded-sm"
        >
         {{ modal.option === 1 ? "añadir" : "actualizar" }}
        </button>
      </form>
    </div>
    <div class="mx-auto w-max">
      <button @click="add" class="p-2 focus:outline-none text-white bg-blue-500 rounded-md mb-3">
        Añadir
      </button>
      <table class="border-collapse border border-black">
        <thead>
          <tr class="bg-blue-500 text-white">
            <th class="border border-black p-2">Nombre</th>
            <th class="border border-black p-2">Descripcion</th>
            <th class="border border-black p-2">Estado</th>
            <th class="border border-black p-2">Opciones</th>
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
              <button
                class="p-2 focus:outline-none text-white bg-red-500 rounded-md mr-2"
                @click="deleteCategory(producto._id)"
              >
              Eliminar
              </button>
              <button
                class="p-2 focus:outline-none text-white bg-purple-500 rounded-md mr-2"
                @click="enableCategory(producto._id)"
              >
                Activar
              </button>
              <button
                class="p-2 focus:outline-none text-white bg-blue-500 rounded-md"
                @click="modify(producto)"
              >
                Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    const modal = ref({
      active: false,
      option: null,
      id: null
    })
    const item = ref({
      name: '',
      description: '',
    });

    const add = ()=> {
      modal.value.active = true,
      modal.value.option = 1
      item.value.name = ''
      item.value.description = ''
    }

    const modify = (category)=> {
      modal.value.active = true,
      modal.value.option = 2
      modal.value.id = category._id
      item.value.name = category.name
      item.value.description = category.description
    }

    const closeModal = () => {
      modal.value.active = false,
      modal.value.option = null,
      modal.value.id = null
    }
    /*Añadir item a categorias*/
    const addCategory = item => {
      closeModal()
      store.dispatch('addCategory', item)
    };
    /*Desactivar "eliminar" un item*/
    const deleteCategory = id => store.dispatch('deleteCategory', id);
    /*Activar un item*/
    const enableCategory = id => store.dispatch('enableCategory', id);
    /*Modificar un item*/
    const modifyCategory = (id, item) => {
      closeModal()
      store.dispatch('modifyCategory', {id, item})
    }
    /*Llamar las acciones en el onMounted*/
    const getCategory = () => store.dispatch('getCategories');
    //traemos los datos
    onMounted(() => {
      if (!dataCategory.value.length) {
        getCategory();
      }
    });

    return {
      closeModal,
      add,
      modal,
      modify,
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
