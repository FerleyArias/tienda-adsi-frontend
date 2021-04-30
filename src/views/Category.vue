
<template>
<div>
    <table class="border-collapse border border-black">
				<thead>
					<tr class="bg-blue-500 text-white">
						<th class="border border-black">Nombre</th>
						<th class="border border-black">Descripcion</th>
						<th class="border border-black">Estado</th>
						<th class="border border-black">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(producto, i) in dataCategory" :key=i>
						<td class="border border-black p-2">
              {{producto.name}}
            </td>
						<td class="border border-black p-2">
              {{producto.description}}
              </td>
            <td class="border border-black p-2"> 
              {{producto.state}}
            </td>
						<!-- <td>{{producto.costo}}</td>
						<td>{{producto.cantidad}}</td>
						<td>{{producto.proveedor}}</td> -->

						<!-- <td><input class="btn btn-info" type="button" value="add" @click="producto.cantidad++"></td>
						<td><input :disabled="producto.cantidad < 1" class="btn btn-success" type="button" value="sell"
								@click="producto.cantidad--"></td>
						<td>{{producto.precio - producto.costo}}</td>-->
						<td class="border border-black p-2">
              <input class="p-2 bg-red-500 rounded-md" type="button" value="eliminar" >
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
  name: 'Category',
  setup() {
    /*Instanciamos el store*/
    const store = useStore();
    /*traemos el token del state*/
    const token = computed(() => store.state.token);
    /*Traer cosas del state*/
    const dataCategory = computed(() => store.state.articles);
    /*Llamar las acciones en el onMounted*/
    const getCategory = () => store.dispatch('getArticles');
    //traemos los datos
    onMounted(() => {
      getCategory()
      console.log(dataCategory.value);
    });

    return {
      dataCategory,
      token,
    };
  },
};
</script>
