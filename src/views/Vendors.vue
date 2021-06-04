<template>
  <div>
    <div v-show="modal.active" class="fixed z-10 top-0 bottom-0 right-0 left-0">
      <button
        @click="closeModal"
        class="absolute bg-black w-full h-full opacity-50"
      ></button>
      <form
        class="grid grid-cols-2 gap-x-3 relative z-20 mx-auto max-w-lg bg-white p-5 mt-10 "
        @submit.prevent="
          () => {
            if (modal.option === 1) {
              addPerson(item);
            } else {
              modifyPerson(modal.id, item);
            }
            closeModal();
          }
        "
      >
        <span
          @click="closeModal"
          class="cursor-pointer absolute focus:outline-none top-1 right-2 text-gray-500"
        >
          <font-awesome-icon icon="times" />
        </span>
        <h1 class="text-center mb-3 col-span-2">Información del proveedor</h1>
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
          <label for="address">Direccion</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="address"
            name="address"
            v-model="item.address"
            placeholder="Direccion"
          />
        </div>
        <div class="flex flex-col">
          <label for="document">Documento</label>
          <select
            class="bg-white mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            id="document"
            name="document"
            v-model="item.document"
          >
            <option value="CC">CC</option>
            <option value="NIT">NIT</option>
            <option value="PASAPORTE">PASAPORTE</option>
            <option value="NE">NE</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="idDocument">Nº de documento</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="idDocument"
            name="idDocument"
            v-model="item.idDocument"
          />
        </div>
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="email"
            name="email"
            v-model="item.email"
          />
        </div>
        <div class="flex flex-col">
          <label for="phone">Celular</label>
          <input
            class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
            type="text"
            id="phone"
            name="phone"
            v-model="item.phone"
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
              <th class="border border-black p-2">Nombre</th>
              <th class="border border-black p-2">Tipo documento</th>
              <th class="border border-black p-2">núm documento</th>
              <th class="border border-black p-2">Dirección</th>
              <th class="border border-black p-2">Teléfono</th>
              <th class="border border-black p-2">Email</th>
              <th class="border border-black p-2">Estado</th>
              <th class="border border-black p-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, i) in dataVendors" :key="i">
              <td class="border border-black p-2">
                {{ producto.name }}
              </td>
              <td class="border border-black p-2">
                {{ producto.document }}
              </td>
              <td class="border border-black p-2">
                {{ producto.idDocument }}
              </td>
              <td class="border border-black p-2">
                {{ producto.address }}
              </td>
              <td class="border border-black p-2">
                {{ producto.phone }}
              </td>
              <td class="border border-black p-2">
                {{ producto.email }}
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
                  @click="deletePerson(producto._id)"
                >
                  <font-awesome-icon class="" :icon="['far', 'trash-alt']" />
                </button>
                <button
                  v-else
                  class="p-2 focus:outline-none text-white bg-green-500 rounded-md mr-2"
                  @click="enablePerson(producto._id)"
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

    const modal = ref({
      active: false,
      option: null,
      id: null,
    });

    const item = ref({
      typePerson: "Proveedor",
      name: "",
      document: "",
      idDocument: "",
      address: "",
      phone: "",
      email: "",
    });

    const add = () => {
      (modal.value.active = true), (modal.value.option = 1);
      item.value.name = "";
      item.value.document = "";
      item.value.idDocument = "";
      item.value.address = "";
      item.value.phone = "";
      item.value.email = "";
    };

    const modify = (person) => {
      (modal.value.active = true), (modal.value.option = 2);
      modal.value.id = person._id;
      item.value.name = person.name;
      item.value.document = person.document;
      item.value.idDocument = person.idDocument;
      item.value.address = person.address;
      item.value.phone = person.phone;
      item.value.email = person.email;
    };

    const closeModal = () => {
      (modal.value.active = false),
        (modal.value.option = null),
        (modal.value.id = null);
    };
    const dataPersons = computed(() => store.state.persons);
    const dataVendors = computed(() => store.getters.allVendors);

    const getPerson = () => store.dispatch("getPerson");
    const addPerson = (item) => store.dispatch("addPerson", item);
    const modifyPerson = (id, item) =>
      store.dispatch("modifyPerson", { id, item });
    const deletePerson = (item) => store.dispatch("deletePerson", item);
    const enablePerson = (item) => store.dispatch("enablePerson", item);

    const columns = ref([
      { title: "Nombre", dataKey: "nombre" },
      { title: "Tipo", dataKey: "tipo" },
      { title: "Documento", dataKey: "documento" },
      { title: "Número", dataKey: "numero" },
      { title: "Dirección", dataKey: "direccion" },
      { title: "Teléfono", dataKey: "telefono" },
      { title: "Correo electrónico", dataKey: "email" },
      { title: "Estado", dataKey: "estado" },
    ]);

    const generarPDF = (columns) => {
      const rows = [];
      dataPersons.value.map((x) => {
        if (x.typePerson === "Proveedor") {
            let state = null;
          if (state == 1) {
            x.state = "Activado";
          } else {
            state = "Desactivado";
          }
          rows.push({
            nombre: x.name,
            tipo: x.typePerson,
            documento: x.document,
            numero: x.idDocument,
            direccion: x.address,
            telefono: x.phone,
            email: x.email,
            estado: state,
          });
        }
      });
      const doc = new jsPDF("l", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function() {
          doc.text("Lista de Proveedores", 40, 30);
        },
      });

      doc.save("Proveedores.pdf");
    };

    onMounted(() => {
      if (!dataPersons.value.length) {
        getPerson();
      }
    });

    return {
      generarPDF,
      columns,
      addPerson,
      deletePerson,
      enablePerson,
      modifyPerson,
      error,
      loading,
      dataPersons,
      dataVendors,
      item,
      closeModal,
      modal,
      add,
      modify,
    };
  },
};
</script>
