<template>
  <div v-show="modals[0]" class="fixed z-10 top-0 bottom-0 right-0 left-0">
    <button
      @click="closeModal(0)"
      class="absolute bg-black w-full h-full opacity-50"
    ></button>
    <form
      class="grid grid-cols-3 gap-x-3 relative z-20 mx-auto max-w-5xl bg-white p-5 mt-10 "
      @submit.prevent="
        () => {
          addCompra(item);
          closeModal(0);
        }
      "
    >
      <span
        @click="closeModal(0)"
        class="absolute cursor-pointer focus:outline-none top-1 right-2 text-gray-500"
      >
        <font-awesome-icon icon="times" />
      </span>
      <h1 class="text-center mb-3 col-span-3">Información del proveedor</h1>
      <div class="flex flex-col">
        <label for="typeProof">Tipo de comprobante</label>
        <select
          class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          id="typeProof"
          name="typeProof"
          v-model="item.typeProof"
        >
          <option value="NOTA DEBITO">NOTA DEBITO</option>
          <option value="FACTURA">FACTURA</option>
          <option value="NOTA CREDITO">NOTA CREDITO</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="serieProof">Serie de comprobante</label>
        <input
          class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          type="text"
          id="serieProof"
          name="serieProof"
          v-model="item.serieProof"
        />
      </div>
      <div class="flex flex-col">
        <label for="numProof">Numero de comprobante</label>
        <input
          class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          type="text"
          id="numProof"
          name="numProof"
          v-model="item.numProof"
        />
      </div>
      <div class="col-span-2 flex flex-col">
        <label for="vendor">Proveedor</label>
        <select
          class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          id="vendor"
          name="vendor"
          v-model="item.person"
        >
          <option
            v-for="(vendor, i) in dataVendors"
            :key="i"
            :value="vendor._id"
            >{{ vendor.name }}</option
          >
        </select>
      </div>
      <div class="flex items-center">
        <span class="text-2xl h-7 text-green-700" @click="add(1)">
          <font-awesome-icon class="" :icon="['fas', 'plus-circle']" />
        </span>
      </div>
      <div class="flex flex-col col-span-3 max-h-60 overflow-hidden" v-show="item.details.length">
        <table class="border-collapse border border-black w-max block overflow-auto">
          <thead>
            <tr class="bg-gray-200 border border border-l-0 border-r-0 border-black">
              <th class="p-2"></th>
              <th class="p-2">Nombre</th>
              <th class="p-2">Precio</th>
              <th class="p-2">Cantidad</th>
              <th class="p-2">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, i) in item.details" :key="i">
                <td class="border border border-l-0 border-r-0 border-black p-2">
                <span
                  class="cursor-pointer"
                  @click="deleteArticle(i)"
                >
                  <font-awesome-icon class="text-red-700 text-lg" :icon="['fas', 'minus-circle']" />
                </span>
              </td>
              <td class="border border border-l-0 border-r-0 border-black p-2">
                <span>
                  {{ producto.article }}
                </span>
              </td>
              <td class="border border border-l-0 border-r-0 border-black p-2">
                <span>
                  {{ producto.price }}
                </span>
              </td>
              <td class="border border border-l-0 border-r-0 border-black p-2">
                <input
                  class="focus:outline-none p-1 border border-gray-500 rounded-md"
                  type="number" 
                  v-model="producto.quantity"
                >
              </td>
              <td class="border border border-l-0 border-r-0 border-black p-2">
                <span>
                  {{ subTotalArticle(i) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col col-span-3">
        <span>Total: ${{totalArticles}}</span>
      </div>
      <div class="flex flex-col">
        <button
          class=" text-white font-bold bg-blue-600 p-2 focus:outline-none mt-3 w-min rounded-sm"
        >
          añadir
        </button>
      </div>
    </form>
    <div v-show="modals[1]" class="fixed z-20 top-0 bottom-0 right-0 left-0">
      <button
        @click="closeModal(1)"
        class="absolute bg-black w-full h-full opacity-50"
      ></button>
      <form
        class="grid grid-cols-2 gap-x-3 relative z-20 mx-auto max-w-lg bg-white p-5 mt-10 "
        @submit.prevent="
          () => {
            addArticle();
            closeModal(1);
          }
        "
      >
        <span
          @click="closeModal(1)"
          class="cursor-pointer absolute focus:outline-none top-1 right-2 text-gray-500"
        >
          <font-awesome-icon icon="times" />
        </span>
        <h1 class="text-center mb-3 col-span-2">
          Información de los articulos
        </h1>
        <div class="flex flex-col">
          <label for="article">article</label>
          <select
            class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            id="article"
            name="article"
            v-model="article._id"
          >
            <option
              v-for="(article, i) in dataArticle"
              :key="i"
              :value="article._id"
              >{{ article.name }}</option
            >
          </select>
        </div>
        <div class="flex flex-col">
          <label for="quantity">Cantidad</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="number"
            id="quantity"
            name="quantity"
            v-model="article.quantity"
            placeholder="quantity"
          />
        </div>
        <button
          type="submit"
          class=" text-white font-bold bg-blue-600 p-2 focus:outline-none mt-3 w-min rounded-sm"
        >
          añadir
        </button>
      </form>
    </div>
  </div>

  <div class="mx-auto max-w-6xl">
    <button
      @click="add(0)"
      class="p-2 focus:outline-none text-white bg-blue-500 rounded-md mb-3"
    >
      Añadir
    </button>
    <button
      type="submit"
      class="p-2 focus:outline-none text-white bg-blue-500 rounded-md mb-3 ml-6"
      @click="generarPDF(columns)"
    >
      Generar PDF
    </button>
    <div class="overflow-auto">
      <table class="border-collapse border border-black">
        <thead>
          <tr class="bg-blue-500 text-white">
            <th class="border border-black p-2">Usuario</th>
            <th class="border border-black p-2">Proveedor</th>
            <th class="border border-black p-2">Tipo de comprobante</th>
            <th class="border border-black p-2">Serie comprobante</th>
            <th class="border border-black p-2">Número comprobante</th>
            <th class="border border-black p-2">Fecha</th>
            <th class="border border-black p-2">Impuesto</th>
            <th class="border border-black p-2">Total</th>
            <th class="border border-black p-2">Estado</th>
            <th class="border border-black p-2">Opciones</th>
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
            <td
              :class="[producto.state ? 'text-blue-700' : 'text-red-700']"
              class="border border-black p-2"
            >
              {{ producto.state ? "Activado" : "Inactivo" }}
            </td>
            <td class="border border-black p-2">
              <button
                v-if="producto.state"
                class="p-2 focus:outline-none text-white bg-red-500 rounded-md mr-2"
                @click="deleteCompra(producto._id)"
              >
                <font-awesome-icon class="" :icon="['far', 'trash-alt']" />
              </button>
              <button
                v-else
                class="p-2 focus:outline-none text-white bg-green-500 rounded-md mr-2"
                @click="enableCompra(producto._id)"
              >
                <font-awesome-icon class="" :icon="['fas', 'check']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "Income",
  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    const dataCompras = computed(() => store.state.compras);
    const userId = computed(() => store.state.userId);
    const dataPersons = computed(() => store.state.persons);
    const dataVendors = computed(() => store.getters.allVendors);
    const dataArticle = computed(() => store.state.articles);

    const item = ref({
      user: userId.value,
      person: "",
      typeProof: "",
      serieProof: "",
      numProof: "",
      details: [],
    });

    const article = ref({
      _id: "",
      article: "",
      quantity: 0,
      price: 0,
    });

    const modals = ref([false, false]);

    const add = (modal) => {
      modals.value[modal] = true;
      if (modal === 0) {
        item.value.person = "";
        item.value.typeProof = "";
        item.value.serieProof = "";
        item.value.numProof = "";
        item.value.details = [];
      } else if (modal === 1) {
        article.value._id = "";
        article.value.name = "";
        article.value.quantity = 0;
        article.value.price = 0;
        article.value.discount = 0;
      }
    };

    const closeModal = (modal) => {
      modals.value[modal] = false;
    };

    const addArticle = () => {
      let index = dataArticle.value.findIndex(
        (item) => item._id === article.value._id
      );
      article.value.article = dataArticle.value[index].name;
      article.value.price = dataArticle.value[index].price;
      item.value.details.push({...article.value});
    };
    const deleteArticle = index => {
      item.value.details.splice(index,1)
    }

    const subTotalArticle = index => {
      const article = item.value.details[index]
      const total = article.price * article.quantity
      return total
    }

    const totalArticles = computed(() => {
      let total = 0
      item.value.details.forEach(article => total+= article.price * article.quantity)
      return total
    })

    const getPerson = () => store.dispatch("getPerson");
    const getArticle = () => store.dispatch("getArticle");
    const getCompras = () => store.dispatch("getCompra");
    const addCompra = (item) => store.dispatch("addCompra", item);
    const deleteCompra = (item) => store.dispatch("deleteCompra", item);
    const enableCompra = (item) => store.dispatch("enableCompra", item);

    const columns = ref([
      { title: "Usuario", dataKey: "usuario" },
      { title: "Proveedor", dataKey: "proveedor" },
      { title: "Comprobante", dataKey: "comprobante" },
      { title: "Serie", dataKey: "serie" },
      { title: "Número", dataKey: "numero" },
      { title: "Fecha", dataKey: "fecha" },
      { title: "Impuesto", dataKey: "impuesto" },
      { title: "Total", dataKey: "total" },
      { title: "Estado", dataKey: "estado" },
    ]);

    const generarPDF = (columns) => {
      const rows = [];
      dataCompras.value.map((x) => {
        let state = null;
        if (x.state == 1) {
          state = "Activado";
        } else {
          state = "Desactivado";
        }
        rows.push({
          usuario: x.user.name,
          proveedor: x.person.name,
          comprobante: x.typeProof,
          serie: x.serieProof,
          numero: x.numProof,
          fecha: x.createdAt,
          impuesto: x.tax,
          total: x.total,
          estado: state,
        });
      });
      const doc = new jsPDF("l", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function() {
          doc.text("Lista de Ingresos", 40, 30);
        },
      });

      doc.save("Ingresos.pdf");
    };

    onMounted(() => {
      if (!dataCompras.value.length) {
        getCompras();
      }
      if (!dataPersons.value.length) {
        getPerson();
      }
      if (!dataArticle.value.length) {
        getArticle();
      }
    });

    return {
      generarPDF,
      columns,
      modals,
      add,
      closeModal,
      subTotalArticle,
      addArticle,
      deleteArticle,
      totalArticles,
      deleteCompra,
      enableCompra,
      addCompra,
      error,
      loading,
      dataCompras,
      dataVendors,
      dataArticle,
      item,
      article,
    };
  },
};
</script>
