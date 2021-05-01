<template>
  <header
    class="flex z-10 fixed w-full justify-between bg-blue-700 text-white p-5"
  >
    <div class="flex items-center">
      <button @click="handleBurger" v-show="visible" class="mr-3 ">
        <font-awesome-icon icon="bars" />
      </button>
      <nav
        :class="{visibleMenu: visibleBurger}"
        class=" flex flex-col py-2 text-black menu left-0 bottom-0 flex h-full fixed bg-white"
      >
        <router-link to="/" class="p-3 bg-gray-200 w-full h-12">
          <font-awesome-icon class="text-xl" icon="home" />
          <span class="ml-3">Home</span>
        </router-link>
        <button
          @click="
            () => {
              handleSubMenus(0);
            }
          "
          class="py-2 px-5 flex justify-between items-center"
        >
          <span>Almacén</span>
          <font-awesome-icon
            class="text-gray-400 duration-200"
            :class="{activeSubMenu: subMenus[0]}"
            icon="chevron-down"
          />
        </button>
        <div :class="{visibleSubMenu: subMenus[0]}" class="subMenu">
          <router-link to="/category" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Categorías</span>
          </router-link>
          <router-link to="/article" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Artículos</span>
          </router-link>
        </div>
        <button
          @click="
            () => {
              handleSubMenus(1);
            }
          "
          class="py-2 px-5 flex justify-between items-center"
        >
          <span>Compras</span>
          <font-awesome-icon
            class="text-gray-400 duration-200"
            :class="{activeSubMenu: subMenus[1]}"
            icon="chevron-down"
          />
        </button>
        <div :class="{visibleSubMenu: subMenus[1]}" class="subMenu">
          <router-link to="/income" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Ingresos</span>
          </router-link>
          <router-link to="/vendors" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Proveedores</span>
          </router-link>
        </div>
        <button
          @click="
            () => {
              handleSubMenus(2);
            }
          "
          class="py-2 px-5 flex justify-between items-center"
        >
          <span>Ventas</span>
          <font-awesome-icon
            class="text-gray-400 duration-200"
            :class="{activeSubMenu: subMenus[2]}"
            icon="chevron-down"
          />
        </button>
        <div :class="{visibleSubMenu: subMenus[2]}" class="subMenu">
          <router-link to="/sales" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Ventas</span>
          </router-link>
          <router-link to="/customers" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Clientes</span>
          </router-link>
        </div>
        <button
          @click="
            () => {
              handleSubMenus(3);
            }
          "
          class="py-2 px-5 flex justify-between items-center"
        >
          <span>Accesos</span>
          <font-awesome-icon
            class="text-gray-400 duration-200"
            :class="{activeSubMenu: subMenus[3]}"
            icon="chevron-down"
          />
        </button>
        <div :class="{visibleSubMenu__single: subMenus[3]}" class="subMenu">
          <router-link to="/users" class="block p-3 w-full h-12">
            <font-awesome-icon class="text-xl text-gray-400" icon="store" />
            <span class="ml-3">Usuarios</span>
          </router-link>
        </div>
      </nav>
      <h3 class="text-lg">Bodega</h3>
    </div>
    <button v-show="visible" @click="logout">
      <font-awesome-icon class="text-2xl" icon="sign-out-alt" />
    </button>
  </header>
</template>

<script>
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';

export default {
  name: 'MyHeader',
  setup() {
    const store = useStore();
    const route = useRoute();
    const visible = ref(false);
    const subMenus = ref([false, false, false, false]);
    const visibleBurger = ref(false);
    const handleBurger = () => {
      visibleBurger.value = !visibleBurger.value;
    };
    const handleSubMenus = index => {
      for (let i = 0; i < subMenus.value.length; i++) {
        if (i != index) {
          subMenus.value[i] = false;
        }
      }
      subMenus.value[index] = !subMenus.value[index];
    };
    const logout = () => store.dispatch('logout');
    watch(route, () => {
      visibleBurger.value = false;
      if (route.path === '/login') {
        visible.value = false;
        visibleBurger.value = false;
      } else {
        visible.value = true;
      }
    });
    return {
      visible,
      logout,
      visibleBurger,
      handleBurger,
      subMenus,
      handleSubMenus,
    };
  },
};
</script>

<style scoped>
.menu {
  transform: translateX(-100%);
  top: 4.2rem;
  width: 15rem;
  transition-duration: 500ms;
}
.visibleMenu {
  transition-duration: 500ms;
  transform: translateX(0);
}
.subMenu {
  overflow: hidden;
  height: 0;
  transition-duration: 200ms;
}
.visibleSubMenu__single {
  height: 50px;
  transition-duration: 200ms;
}
.visibleSubMenu {
  height: 100px;
  transition-duration: 200ms;
}
.activeSubMenu {
  transform: rotate(180deg);
  color: #1976d2;
  transition-duration: 200ms;
}
</style>
