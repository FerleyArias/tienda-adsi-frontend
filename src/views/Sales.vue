<template>
  <div>
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
          <label for="customer">Clientes</label>
          <select
            class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            id="customer"
            name="customer"
            v-model="item.person"
          >
            <option
              v-for="(customer, i) in dataCustomers"
              :key="i"
              :value="customer._id"
              >{{ customer.name }}</option
            >
          </select>
        </div>
        <div class="flex items-center">
          <span class="text-2xl h-7 text-green-700" @click="add(1)">
            <font-awesome-icon class="" :icon="['fas', 'plus-circle']" />
          </span>
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
        <table class="border-collapse border border-black w-full">
          <thead>
            <tr class="bg-blue-500 text-white">
              <th class="border border-black p-2">Usuario</th>
              <th class="border border-black p-2">Cliente</th>
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
            <tr v-for="(producto, i) in dataVentas" :key="i">
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
                  @click="deleteVenta(producto._id)"
                >
                  <font-awesome-icon class="" :icon="['far', 'trash-alt']" />
                </button>
                <button
                  v-else
                  class="p-2 focus:outline-none text-white bg-green-500 rounded-md mr-2"
                  @click="enableVenta(producto._id)"
                >
                  <font-awesome-icon class="" :icon="['fas', 'check']" />
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
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "Ventas",
  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    const dataVentas = computed(() => store.state.ventas);
    const userLogin = computed(() => store.state.userLogin);
    const dataPersons = computed(() => store.state.persons);
    const dataCustomers = computed(() => store.getters.allCustomers);
    const dataArticle = computed(() => store.state.articles);

    const item = ref({
      user: userLogin.value._id,
      person: "605b77a8b1692a568abe22a7",
      typeProof: "0001",
      serieProof: "0092",
      numProof: "0083",
      details: [],
    });

    const article = ref({
      _id: "60afb9985aa8370015020be0",
      article: "Hp Pro Book",
      quantity: 2,
      price: 1000,
      discount: 1000,
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
      article.value.name = dataArticle.value[index].name;
      article.value.price = dataArticle.value[index].price;
      item.value.details.push(article);
    };

    const getVentas = () => store.dispatch("getVenta");
    const getPerson = () => store.dispatch("getPerson");
    const getArticle = () => store.dispatch("getArticle");
    const addVenta = (item) => store.dispatch("addVenta", item);
    const deleteVenta = (item) => store.dispatch("deleteVenta", item);
    const enableVenta = (item) => store.dispatch("enableVenta", item);

    const columns = ref([
      { title: "Usuario", dataKey: "usuario" },
      { title: "Cliente", dataKey: "cliente" },
      { title: "Comprobante", dataKey: "comprobante" },
      { title: "Serie", dataKey: "serie" },
      { title: "Número", dataKey: "numero" },
      { title: "Fecha de creación", dataKey: "fecha" },
      { title: "Impuesto", dataKey: "impuesto" },
      { title: "Total", dataKey: "total" },
      { title: "Estado", dataKey: "estado" },
    ]);

    const generarPDF = (columns) => {
      const rows = [];
      dataVentas.value.map((x) => {
        let state = null;
        if (x.state == 1) {
          state = "Activado";
        } else {
          state = "Desactivado";
        }
        rows.push({
          usuario: x.user.name,
          cliente: x.person.name,
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
          doc.text("Lista de ventas", 40, 30);
        },
      });

      doc.save("Ventas.pdf");
    };

    onMounted(() => {
      if (!dataVentas.value.length) {
        getVentas();
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
      dataCustomers,
      addArticle,
      addVenta,
      deleteVenta,
      enableVenta,
      error,
      loading,
      dataVentas,
      item,
      article,
      dataArticle,
    };
  },
};
</script>
