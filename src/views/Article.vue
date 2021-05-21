<template>
  <div>
    <div v-show="modal.active" class="fixed z-10 top-0 bottom-0 right-0 left-0">
      <button @click="closeModal" class="absolute bg-black w-full h-full opacity-50">
      </button>
      <form
        class="grid grid-cols-2 gap-x-3 relative z-20 mx-auto max-w-lg bg-white p-5 mt-10 "
        @submit.prevent="() => {
          if(modal.option === 1) {
            addArticle(item)
          } else {
            modifyArticle(modal.id, item)
          }
          closeModal()
        }">
        <button @click="closeModal" class="absolute focus:outline-none top-1 right-2 text-gray-500" >
          <font-awesome-icon
            icon="times"
          />
        </button>
        <h1 class="text-center mb-3 col-span-2">Información de los articulos</h1>
        <div class="col-span-2 flex flex-col">
          <label for="name">Nombre</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="name"
            name="name"
            v-model="item.name"
            placeholder="Nombre"
          />
        </div>
        <div class="col-span-2 flex flex-col">
          <label for="description">Descripción</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="description"
            name="description"
            v-model="item.description"
            placeholder="Descripcion"
          />
        </div>
        <div class="flex flex-col">
          <label for="stock">Stock</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="number"
            id="stock"
            name="stock"
            v-model="item.stock"
            placeholder="Stock"
          />
        </div>
        <div class="flex flex-col">
          <label for="price">Price</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="number"
            id="price"
            name="price"
            v-model="item.price"
            placeholder="Price"
          />
        </div>
        <div class="flex flex-col">
          <label for="code">Code</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="code"
            name="code"
            v-model="item.code"
            placeholder="Code"
          />
        </div>
        <div class="flex flex-col">
          <label for="category">Category</label>
          <select
            class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            id="category"
            name="category"
            v-model="item.category"
          >
            <option v-for="(category, i) in dataCategory" :key="i" :value="category._id">{{category.name}}</option>
          </select>
        </div>
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
              <button
                class="p-2 focus:outline-none text-white bg-red-500 rounded-md mr-2"
                @click="deleteArticle(producto._id)"
              >
              Eliminar
              </button>
              <button
                class="p-2 focus:outline-none text-white bg-purple-500 rounded-md mr-2"
                @click="enableArticle(producto._id)"
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
  name: 'Article',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*Manejo del asincronismo*/
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    /*Traer cosas del state*/
    const dataArticle = computed(() => store.state.articles);
    const dataCategory = computed(() => store.state.categories);
    /*Nuevo item articulos*/
    const modal = ref({
      active: false,
      option: null,
      id: null
    })
    const item = ref({
      code: '',
      name: '',
      category: '',
      stock: 0,
      price: 0,
      description: '',
    });

    const add = ()=> {
      modal.value.active = true,
      modal.value.option = 1
      item.value.name = ''
      item.value.description = ''
      item.value.category = ''
      item.value.stock = 0
      item.value.price = 0
      item.value.code = ''
    }

    const modify = (article)=> {
      modal.value.active = true,
      modal.value.option = 2
      modal.value.id = article._id
      item.value.name = article.name
      item.value.description = article.description
      item.value.category = article.category._id
      item.value.stock = article.stock
      item.value.price = article.price
      item.value.code = article.code
    }

    const closeModal = () => {
      modal.value.active = false,
      modal.value.option = null,
      modal.value.id = null
    }

    /*Añadir articulos*/
    const addArticle = item => store.dispatch('addArticle', item);
    /*Desactivar "eliminar" un item*/
    const deleteArticle = id => store.dispatch('deleteArticle', id);
    /*Activar un item*/
    const enableArticle = id => store.dispatch('enableArticle', id);
    /*Modificar un item*/
    const modifyArticle = (id, item) => store.dispatch('modifyArticle', {id, item});
    /*Llamar las acciones en el onMounted*/
    const getArticle = () => store.dispatch('getArticle');
    const getCategory = () => store.dispatch('getCategories');
    //traemos los datos
    onMounted(() => {
      if (!dataArticle.value.length) {
        getArticle();
      }
      if(!dataCategory.value.length) {
        getCategory()
      }
    });

    return {
      add,
      modify,
      closeModal,
      modal,
      error,
      loading,
      item,
      addArticle,
      modifyArticle,
      deleteArticle,
      enableArticle,
      dataArticle,
      dataCategory,
    };
  },
};
</script>
