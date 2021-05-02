
<template>
<div>
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
import {computed, onMounted} from 'vue';
export default {
  name: 'Users',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*traemos el token del state*/
    const token = computed(() => store.state.token);
    /*Manejo del asincronismo*/
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    /*Traer cosas del state*/
    /*Traer cosas del state*/
    const dataUsers = computed(() => store.state.users);
    /*Nueva compra*/
    /*const item = ref({*/
    /*user: "605b5387f853df1fceb9f862",*/
    /*person: "605b768c7a4a01529e6dee5b",*/
    /*typeProof: "1",*/
    /*serieProof: "2",*/
    /*numProof: "3",*/
    /*tax: 12,*/
    /*details: [*/
        /*{*/
            /*_id: "608dfbac8c58980015e24df0",*/
            /*article: "sdfdskfls",*/
            /*quantity: 0,*/
            /*price: 0*/
        /*}*/
    /*]*/
/*})*/
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
      token,
      /*item*/
    };
  },
};
</script>
