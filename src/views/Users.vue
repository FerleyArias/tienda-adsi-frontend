
<template>
<div>
    <form @submit.prevent="addUser(item)">
    <h1>Información del usuario</h1>
      <h2>Nombre usuario</h2>
      <input
        type="text"
        id="name"
        name="name"
        v-model="item.name"
        placeholder="Nombre de usuario"
      />
      <br>
      <h2>Email usuario</h2>
      <input
        type="email"
        id="email"
        name="email"
        v-model="item.email"
        placeholder="Email@gmail.com"
      />
      <br>
      <h2>Contraseña</h2>
      <input
        type="password"
        id="password"
        name="password"
        v-model="item.typeProof"
        placeholder="Contraseña"
      />
      <br>
      <h2>rol del usuario</h2>
      <input
        type="text"
        id="rol"
        name="rol"
        v-model="item.rol"
        placeholder="Rol usuario"
      />
      <br>
      <button
        type="submit"
        class=" text-white font-bold bg-blue-600 p-2 mt-3 w-min rounded-sm">
     Crear 
      </button>
    </form>

    <table class="border-collapse border border-black">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="border border-black">Nombre</th>
          <th class="border border-black">Email</th>
          <th class="border border-black">Rol</th>
          <th class="border border-black">Estado</th>
          <th class="border border-black">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, i) in dataUsers.user" :key="i">
          <td class="border border-black p-2">
            {{ producto.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.email}}
          </td>
          <td class="border border-black p-2">
            {{ producto.rol}}
          </td>
          <td class="border border-black p-2">
            {{ producto.state}}
          </td>
          <td class="border border-black p-2">
            <input
              class="p-2 bg-red-500 rounded-md"
              type="button"
              value="X"
              @click="deleteCompra(producto._id)"
            />
            <input
              class="p-2 bg-purple-500 rounded-md"
              type="button"
              value="A"
              @click="enableCompra(producto._id)"
            />
            <input
              class="p-2 bg-blue-500 rounded-md"
              type="button"
              value="M"
              @click="modifyCompra(producto._id, item)"
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
  name: 'Users',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*Manejo del asincronismo*/
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    /*Traer cosas del state*/
    /*Traer cosas del state*/
    const dataUsers = computed(() => store.state.users);
    const item = ref({
    name: "",
    email: "",
    password: "",
    rol: "",
})
    /*Llamar las acciones en el onMounted*/
    const getUsers = () => store.dispatch('getUser');
    //traemos los datos
    onMounted(() => {
      if (!dataUsers.value.length) {
        getUsers();
      }
    });

    return {
      error,
      loading,
      dataUsers,
      item
    };
  },
};
</script>
