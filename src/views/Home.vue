<template>
  <main class="statistics">
      <Doughnut class="Doughnut" :data="testData" />
  </main>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, onMounted, watch } from "vue";
import { Doughnut } from "vue-chart-3";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "Home",
  components: { Doughnut },
  setup() {
    const store = useStore();
    const sales = computed(() => store.state.ventas);
    const getSales = () => store.dispatch("getVenta");
    const dataValues = ref([0,0,0,0,0,0,0,0,0,0,0,0]);
    
    const getSalesByMonth = (sales) => {
      sales.forEach(sale => {
        const date = new Date(sale.createdAt)
        const month = date.getMonth()
        dataValues.value[month]++
      })
    }

    watch(sales, (sales) => {
      if(sales) {
        getSalesByMonth(sales)
      }
    })

    const testData = computed(() => ({
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "#FFF042", //1
            "#FFA32F", //2
            "#F46D21", //3
            "#F4322B", //4
            "#EA0045", //5
            "#BB0064", //6
            "#6D0284", //7
            "#4516A2", //8
            "#0235A5", //9
            "#008AAC", //10
            "#00985C", //11
            "#60AA38", //12
          ],
        },
      ],
    }));


    onMounted(() => {
      getSales();
    });

    return {
      getSales,
      sales,
      testData
    };
  },
};
</script>
<style scoped>
.statistics {
  margin: 0 auto;
  width: 40%;
  height: 40%;
}

.Doughnut {
    margin: 0 auto;
    width: 100%;
    height: 100%;
}
</style>
