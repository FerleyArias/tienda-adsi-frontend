<template>
  <div>
    <form @submit.prevent="addCompra(item)">
      <h1>Información de la compra</h1>
      <h2>Usuario</h2>
      <input
        type="text"
        id="user"
        name="user"
        v-model="item.user"
        placeholder="User"
      />
      <br />
      <h2>Persona - proveedor</h2>
      <input
        type="text"
        id="person"
        name="person"
        v-model="item.person"
        placeholder="Person"
      />
      <br />
      <h2>tipo de comprobante</h2>
      <input
        type="text"
        id="typeProof"
        name="typeProof"
        v-model="item.typeProof"
        placeholder="Tipo de comprobante"
      />
      <br />
      <h2>Serie comprobante</h2>
      <input
        type="text"
        id="serieProof"
        name="serieProof"
        v-model="item.serieProof"
        placeholder="Serie comprobante"
      />
      <br />
      <h2>Número de comprobante</h2>
      <input
        type="text"
        id="numProf"
        name="numProf"
        v-model="item.numProof"
        placeholder="Número de comprobante"
      />
      <br />
      <button
        type="submit"
        class=" text-white font-bold bg-blue-600 p-2 mt-3 w-min rounded-sm"
      >
        GENERAR COMPRA
      </button>
    </form>
    <br />

    <h2>Añadir items</h2>
    <form @submit.prevent="addArticle(article)">
      <br />
      <h2>Id del articulo</h2>
      <input
        type="text"
        id="_id"
        name="_id"
        v-model="article._id"
        placeholder="ID articulo"
      />
      <br />
      <h2>Nombre del articulo</h2>
      <input
        type="text"
        id="article"
        name="article"
        v-model="article.name"
        placeholder="Nombre articulo"
      />
      <br />
      <h2>Cantidad del articulo</h2>
      <input
        type="number"
        id="quantity"
        name="quantity"
        v-model="article.quantity"
      />
      <br />
      <h2>Precio del articulo</h2>
      <input type="number" id="price" name="price" v-model="article.price" />
      <br />

      <button
        type="submit"
        class=" text-white font-bold bg-blue-600 p-2 mt-3 w-min rounded-sm"
      >
        AÑADIR ITEM
      </button>
    </form>

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
          <th class="border border-black">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, i) in dataCompras" :key="i">
          <td class="border border-black p-2">
            {{ producto.user.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.person.name }}
          </td>
          <td class="border border-black p-2">
            {{ producto.typeProof }}
          </td>
          <td class="border border-black p-2">
            {{ producto.serieProof }}
          </td>
          <td class="border border-black p-2">
            {{ producto.numProof }}
          </td>
          <td class="border border-black p-2">
            {{ producto.createdAt }}
          </td>
          <td class="border border-black p-2">
            {{ producto.tax }}
          </td>
          <td class="border border-black p-2">
            {{ producto.total }}
          </td>
          <td class="border border-black p-2">
            {{ producto.state }}
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
  name: 'Income',
  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    const dataCompras = computed(() => store.state.compras);

    const item = ref({
      user: '6079bde5488271001556f61d',
      person: '605b77a8b1692a568abe22a7',
      typeProof: '0001',
      serieProof: '0001',
      numProof: '0001',
      details: [],
    });

    const article = ref({
      _id: '60afb9985aa8370015020be0',
      name: 'Hp Pro Book',
      quantity: 2,
      price: 1000,
      discount: 0
    });

    const addArticle = article => {
      item.value.details.push(article);
    };

    const getCompras = () => store.dispatch('getCompra');
    const addCompra = item => store.dispatch('addCompra', item);
    const deleteCompra = item => store.dispatch('deleteCompra', item);
    const enableCompra = item => store.dispatch('enableCompra', item);

    onMounted(() => {
      if (!dataCompras.value.length) {
        getCompras();
      }
    });

    return {
      addArticle,
      deleteCompra,
      enableCompra,
      addCompra,
      error,
      loading,
      dataCompras,
      item,
      article,
    };
  },
};
</script>
