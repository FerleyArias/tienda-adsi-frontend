<template>
  <main class="statistics">
    <canvas id="myChart" width="70vw" height="75vh"></canvas>
    {{sales}}
  </main>
</template>
<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const sales = computed(() => store.state.ventas);
    const getSales = () => store.dispatch("getVenta");
    onMounted(() => {
      getSales();
    });

    return {
      getSales,
      sales,
    };
  },
};
</script>
<style scoped>
.statistics {
  margin-left: 25vw;
  width: 70vw;
  height: 75vh;
  background-color: blue;
}
</style>
