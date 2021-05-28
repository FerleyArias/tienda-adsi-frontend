<template>
  <div>
    <div v-show="modal.active" class="fixed z-10 top-0 bottom-0 right-0 left-0">
      <button @click="closeModal" class="absolute bg-black w-full h-full opacity-50">
      </button>
      <form
        class="grid grid-cols-2 gap-x-3 relative z-20 mx-auto max-w-lg bg-white p-5 mt-10 "
        @submit.prevent="() => {
          if(modal.option === 1) {
            addUser(item)
          } else {
            modifyArticle(modal.id, item)
          }
          closeModal()
        }">
        <span @click="closeModal" class="cursor-pointer absolute focus:outline-none top-1 right-2 text-gray-500" >
          <font-awesome-icon
            icon="times"
          />
        </span>
        <h1 class="text-center mb-3 col-span-2">Información de los usuarios</h1>
        <div class="flex flex-col">
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
        <div class="flex flex-col">
          <label for="rol">Rol</label>
          <select
            class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            id="rol"
            name="rol"
            v-model="item.rol"
          >
            <option value="administrador">administrador</option>
            <option value="almacenista">almacenista</option>
            <option value="vendedor">vendedor</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="email"
            name="email"
            v-model="item.email"
            placeholder="Email"
          />
        </div>
        <div class="flex flex-col">
          <label for="password">Contraseña</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="password"
            id="password"
            name="password"
            v-model="item.password"
            placeholder="Contraseña"
          />
        </div>
        <button
          type="submit"
          class=" text-white font-bold bg-blue-600 p-2 focus:outline-none mt-3 w-min rounded-sm"
        >
         {{ modal.option === 1 ? "añadir" : "actualizar" }}
        </button>
      </form>
    </div>
    <div class="mx-auto max-w-6xl">
      <button
        @click="add"
        class="p-2 focus:outline-none text-white bg-blue-500 rounded-md mb-3"
      >
        Añadir
      </button>
      <div class="overflow-auto">
        <table class="border-collapse border border-black w-full">
          <thead>
            <tr class="bg-blue-500 text-white">
              <th class="border border-black p-2">Nombre</th>
              <th class="border border-black p-2">Email</th>
              <th class="border border-black p-2">Rol</th>
              <th class="border border-black p-2">Estado</th>
              <th class="border border-black p-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, i) in dataUsers" :key="i">
              <td class="border border-black p-2">
                {{ producto.name }}
              </td>
              <td class="border border-black p-2">
                {{ producto.email }}
              </td>
              <td class="border border-black p-2">
                {{ producto.rol }}
              </td>
              <td :class="[producto.state ? 'text-blue-700' : 'text-red-700']" class="border border-black p-2">
                {{ producto.state ? "Activado" : "Inactivo"}}
              </td>
              <td class="border border-black p-2">
                <button
                  v-if="producto.state"
                  class="p-2 focus:outline-none text-white bg-red-500 rounded-md mr-2"
                  @click="deleteUser(producto._id)"
                >
                  <font-awesome-icon class="" :icon="['far', 'trash-alt']" />
                </button>
                <button 
                  v-else
                  class="p-2 focus:outline-none text-white bg-green-500 rounded-md mr-2"
                  @click="enableUser(producto._id)"
                >
                  <font-awesome-icon class="" :icon="['fas', 'check']" />
                </button>
                <button
                  class="p-2 focus:outline-none text-white bg-blue-500 rounded-md"
                  @click="modify(producto)"
                >
                  <font-awesome-icon class="" :icon="['far', 'edit']" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, onMounted, ref} from 'vue';
export default {
  name: 'Users',
  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    const dataUsers = computed(() => store.state.users);

    const item = ref({
      name: '',
      email: '',
      password: '',
      rol: '',
    });

    const modal = ref({
      active: false,
      option: null,
      id: null
    })

    const add = ()=> {
      modal.value.active = true,
      modal.value.option = 1
      item.value.name = ''
      item.value.email = ''
      item.value.rol = ''
      item.value.password = ''
    }

    const modify = (user)=> {
      modal.value.active = true,
      modal.value.option = 2
      modal.value.id = user._id
      item.value.name = user.name
      item.value.email = user.email
      item.value.rol = user.rol
      item.value.password = user.password
    }

    const closeModal = () => {
      modal.value.active = false,
      modal.value.option = null,
      modal.value.id = null
    }

    const getUsers = () => store.dispatch('getUser');
    const addUser = item => store.dispatch('addUser', item);
    const modifyUser = (id, item) => store.dispatch('modifyUser', {id, item});
    const deleteUser = id => store.dispatch('deleteUser', id);
    const enableUser = id => store.dispatch('enableUser', id);

    onMounted(() => {
      if (!dataUsers.value.length) {
        getUsers();
      }
    });

    return {
      addUser,
      modifyUser,
      deleteUser,
      enableUser,
      error,
      loading,
      dataUsers,
      item,
      modal,
      add,
      modify,
      closeModal
    };
  },
};
</script>
