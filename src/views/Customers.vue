<template>
  <div>
    <form @submit.prevent="addPerson(item)">
      <h1>Información de la persona</h1>
      <h2>Nombre de la persona</h2>
      <input
        type="text"
        id="typePerson"
        name="typePerson"
        v-model="item.typePerson"
        placeholder="Tipo de persona"
      />
      <br />
      <h2>nomber de la persona</h2>
      <input
        type="text"
        id="name"
        name="name"
        v-model="item.name"
        placeholder="Nombre de la persona"
      />
      <br />
      <h2>documento de la persona</h2>
      <input
        type="text"
        id="document"
        name="document"
        v-model="item.document"
        placeholder="Documento de la persona"
      />
      <br />
      <h2>Número de documento de la persona</h2>
      <input
        type="text"
        id="idDocument"
        name="idDocument"
        v-model="item.idDocument"
        placeholder="Documento de la persona"
      />
      <br />
      <h2>Dirección</h2>
      <input
        type="text"
        id="address"
        name="address"
        v-model="item.address"
        placeholder="direccion de la persona"
      />
      <br />
      <h2>Número de telefono de la persona</h2>
      <input
        type="text"
        id="phone"
        name="phone"
        v-model="item.phone"
        placeholder="Telefono de la persona"
      />
      <br />
      <h2>email de la persona</h2>
      <input
        type="email"
        id="email"
        name="email"
        v-model="item.email"
        placeholder="Email de la persona"
      />
      <br>
      <button
        type="submit"
        class=" text-white font-bold bg-blue-600 p-2 mt-3 w-min rounded-sm"
      >
        AGREGAR
      </button>
    </form>

    <table class="border-collapse border border-black">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="border border-black">Nombre</th>
          <th class="border border-black">Tipo persona</th>
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
        <tr v-for="(producto, i) in dataPersons.person" :key="i">
          <td class="border border-black p-2">
            {{ producto.name}}
          </td>
          <td class="border border-black p-2">
            {{ producto.typePerson}}
          </td>
          <td class="border border-black p-2">
            {{ producto.document}}
          </td>
          <td class="border border-black p-2">
            {{ producto.idDocument}}
          </td>
          <td class="border border-black p-2">
            {{ producto.address}}
          </td>
          <td class="border border-black p-2">
            {{ producto.phone}}
          </td>
          <td class="border border-black p-2">
            {{ producto.email}}
          </td>
          <td class="border border-black p-2">
            {{ producto.state}}
          </td>
          <td class="border border-black p-2">
            <input
              class="p-2 bg-red-500 rounded-md"
              type="button"
              value="X"
              @click="deletePerson(producto._id)"
            />
            <input
              class="p-2 bg-purple-500 rounded-md"
              type="button"
              value="A"
              @click="enablePerson(producto._id)"
            />
            <input
              class="p-2 bg-blue-500 rounded-md"
              type="button"
              value="M"
              @click="modifyPerson(producto._id, item)"
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
    const dataPersons = computed(() => store.state.persons);
    /*Agregamos el form para la nueva persona*/
    const item = ref({
        typePerson: "",
        name: "",
        document: "",
        idDocument: "",
        address: "",
        phone: "",
        email: ""
      })
    /*Llamar las acciones en el onMounted*/
    const getPersons = () => store.dispatch('getPerson');
    //traemos los datos
    onMounted(() => {
      if (!dataPersons.value.length) {
        getPersons();
      }
    });

    return {
      error,
      loading,
      dataPersons,
      item
    };
  },
};
</script>
