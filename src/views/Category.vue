<template>
  <div>
    <div v-show="modal.active" class="fixed z-10 top-0 bottom-0 right-0 left-0">
      <button
        @click="closeModal"
        class="absolute bg-black w-full h-full opacity-50"
      ></button>
      <form
        class="relative flex flex-col z-20 mx-auto max-w-xs bg-white p-5 mt-10"
        @submit.prevent="
          () => {
            if (modal.option === 1) {
              addCategory(item);
            } else {
              modifyCategory(modal.id, item);
            }
          }
        "
      >
        <span
          @click="closeModal"
          class="cursor-pointer absolute focus:outline-none top-1 right-2 text-gray-500"
        >
          <font-awesome-icon icon="times" />
        </span>
        <h1 class="text-center mb-3">Información de las categorias</h1>
        <label for="name">Nombre</label>
        <input
          class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          type="text"
          id="name"
          name="name"
          v-model="item.name"
          placeholder="Nombre"
        />
        <label for="description">Descripción</label>
        <input
          class="mb-2 focus:outline-none p-1 border border-gray-500 rounded-md"
          type="text"
          id="description"
          name="description"
          v-model="item.description"
          placeholder="Descripcion"
        />
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
              <th class="border border-black p-2">Descripcion</th>
              <th class="border border-black p-2">Estado</th>
              <th class="border border-black p-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, i) in dataCategory" :key="i">
              <td class="border border-black p-2">
                {{ producto.name }}
              </td>
              <td class="border border-black p-2">
                {{ producto.description }}
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
                  @click="deleteCategory(producto._id)"
                >
                  <font-awesome-icon class="" :icon="['far', 'trash-alt']" />
                </button>
                <button
                  v-else
                  class="p-2 focus:outline-none text-white bg-green-500 rounded-md mr-2"
                  @click="enableCategory(producto._id)"
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
  name: "Category",
  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    const dataCategory = computed(() => store.state.categories);

    const modal = ref({
      active: false,
      option: null,
      id: null,
    });
    const item = ref({
      name: "",
      description: "",
    });

    const add = () => {
      (modal.value.active = true), (modal.value.option = 1);
      item.value.name = "";
      item.value.description = "";
    };

    const modify = (category) => {
      (modal.value.active = true), (modal.value.option = 2);
      modal.value.id = category._id;
      item.value.name = category.name;
      item.value.description = category.description;
    };

    const closeModal = () => {
      (modal.value.active = false),
        (modal.value.option = null),
        (modal.value.id = null);
    };

    const addCategory = (item) => {
      closeModal();
      store.dispatch("addCategory", item);
    };

    const deleteCategory = (id) => store.dispatch("deleteCategory", id);
    const enableCategory = (id) => store.dispatch("enableCategory", id);
    const modifyCategory = (id, item) => {
      closeModal();
      store.dispatch("modifyCategory", { id, item });
    };

    const getCategory = () => store.dispatch("getCategories");
    onMounted(() => {
      if (!dataCategory.value.length) {
        getCategory();
      }
    });

    const columns = ref([
      { title: "Nombre", dataKey: "nombre" },
      { title: "Descripción", dataKey: "descripcion" },
      { title: "Estado", dataKey: "estado" },
    ]);

    const generarPDF = (columns) => {
      const rows = [];
      dataCategory.value.map((x) => {
          let state = null;
        if (x.state == 1) {
          state = "Activado";
        } else {
          state = "Desactivado";
        }

        rows.push({
          nombre: x.name,
          descripcion: x.description,
          estado: state,
        });
      });
      const doc = new jsPDF("l", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function() {
          doc.text("Lista de Categorias", 40, 30);
        },
      });

      doc.save("Categorias.pdf");
    };

    return {
      columns,
      generarPDF,
      closeModal,
      add,
      modal,
      modify,
      item,
      error,
      loading,
      deleteCategory,
      addCategory,
      modifyCategory,
      enableCategory,
      dataCategory,
    };
  },
};
</script>
