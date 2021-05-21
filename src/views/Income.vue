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
        v-model="item.numProf"
        placeholder="Número de comprobante"
      />
      <br />
      <h2>Impuesto</h2>
      <input
        type="text"
        id="tax"
        name="tax"
        v-model="item.tax"
        placeholder="Impuesto"
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
  name: 'Income',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*Manejo del asincronismo*/
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    /*Traer cosas del state*/
    /*Traer cosas del state*/
    const dataCompras = computed(() => store.state.compras);
    /*Nueva compra*/
    const item = ref({
      user: '',
      person: '',
      typeProof: '',
      serieProof: '',
      numProof: '',
      tax: 0,
      details: [
        {
          _id: '',
          article: '',
          quantity: 0,
          price: 0,
        },
      ],
    });
    /*Añadir articulos a la lista de item*/
    const article = ref({
      _id: '',
      article: '',
      quantity: 0,
      price: 0,
    });

    /*Llamamos a get compra que está en actions*/
    const getCompras = () => store.dispatch('getCompra');

    /*Delete compra*/
    const deleteCompra = item => store.dispatch('deleteCompra', item);
    /*Activar compra*/
    const enableCompra = item => store.dispatch('enableCompra', item);
    /*Montamos las compras en el onMounted*/
    onMounted(() => {
      if (!dataCompras.value.length) {
        getCompras();
      }
    });

    return {
      deleteCompra,
      enableCompra,
      error,
      loading,
      dataCompras,
      item,
      article,
    };
  },
};
</script>
