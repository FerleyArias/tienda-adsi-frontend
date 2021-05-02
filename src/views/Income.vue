<template>
  <div>

    <table class="border-collapse border border-black">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="border border-black">Usuario</th>
          <th class="border border-black">Proveedor</th>
          <th class="border border-black">Tipo de comprobante</th>
          <th class="border border-black">Serie comprobante</th>
          <th class="border border-black">Número comprobante</th>
          <th class="border border-black">Fecha</th>
          <th class="border border-black">Impuesto</th>
          <th class="border border-black">Total</th>
          <th class="border border-black">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, i) in dataCompras.shopping" :key="i">
          <td class="border border-black p-2">
            {{ producto.user.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.person.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.typeProof}}
          </td>
          <td class="border border-black p-2">
            {{ producto.serieProof}}
          </td>
          <td class="border border-black p-2">
            {{ producto.numProof}}
          </td>
          <td class="border border-black p-2">
            {{ producto.createdAt}}
          </td>
          <td class="border border-black p-2">
            {{ producto.tax}}
          </td>
          <td class="border border-black p-2">
            {{ producto.total}}
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
  name: 'Income',
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
    const dataCompras = computed(() => store.state.compras);
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
    const getCompras = () => store.dispatch('getCompra');
    //traemos los datos
    onMounted(() => {
      if (!dataCompras.value.length) {
        getCompras();
      }
    });

    return {
      error,
      loading,
      dataCompras,
      token,
      /*item*/
    };
  },
};
</script>
