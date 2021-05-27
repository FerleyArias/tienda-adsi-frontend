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
        <button
          @click="closeModal"
          class="absolute focus:outline-none top-1 right-2 text-gray-500"
        >
          <font-awesome-icon icon="times" />
        </button>
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
          {{ modal.option === 1 ? 'añadir' : 'actualizar' }}
        </button>
      </form>
    </div>
    <div class="mx-auto w-max">
      <button
        @click="add"
        class="p-2 focus:outline-none text-white bg-blue-500 rounded-md mb-3"
      >
        Añadir
      </button>
      <table class="border-collapse border border-black">
        <thead>
          <tr class="bg-blue-500 text-white">
            <th class="border border-black">Nombre</th>
            <th class="border border-black">Tipo documento</th>
            <th class="border border-black">núm documento</th>
            <th class="border border-black">Dirección</th>
            <th class="border border-black">Teléfono</th>
            <th class="border border-black">Email</th>
            <th class="border border-black">Estado</th>
            <th class="border border-black">Opciones</th>
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
            <td class="border border-black p-2">
              {{ producto.state }}
            </td>
            <td class="border border-black p-2">
              <button
                class="p-2 bg-red-500 rounded-md"
                @click="deletePerson(producto._id)"
              >
                X
              </button>
              <button
                class="p-2 bg-purple-500 rounded-md"
                @click="enablePerson(producto._id)"
              >
                A
              </button>
              <button
                class="p-2 bg-blue-500 rounded-md"
                @click="modifyPersona(producto._id, item)"
              >
                M
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

    const modal = ref({
      active: false,
      option: null,
      id: null,
    });

    const item = ref({
      typePerson: 'Proveedor',
      name: '',
      document: '',
      idDocument: '',
      address: '',
      phone: '',
      email: '',
    });

    const add = () => {
      (modal.value.active = true), (modal.value.option = 1);
      item.value.name = '';
      item.value.document = '';
      item.value.idDocument = '';
      item.value.address = '';
      item.value.phone = '';
      item.value.email = '';
    };

    const modify = article => {
      (modal.value.active = true), (modal.value.option = 2);
      modal.value.id = article._id;
      item.value.name = article.name;
      item.value.document = article.document;
      item.value.idDocument = article.idDocument;
      item.value.address = article.address;
      item.value.phone = article.phone;
      item.value.email = article.email;
    };

    const closeModal = () => {
      (modal.value.active = false),
        (modal.value.option = null),
        (modal.value.id = null);
    };
    const dataPersons = computed(() => store.state.persons);
    const dataVendors = computed(() => store.getters.getAllVendors);


    const getPerson = () => store.dispatch('getPerson');
    const addPerson = item => store.dispatch('addPerson', item);
    const modifyPerson = (id, item) => store.dispatch('modifyPerson', {id, item});
    const deletePerson = item => store.dispatch('deletePerson', item);
    const enablePerson = item => store.dispatch('enablePerson', item);

    onMounted(() => {
      if (!dataPersons.value.length) {
        getPerson();
      }
    });

    return {
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
