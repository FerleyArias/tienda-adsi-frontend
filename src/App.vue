<template>
  <div class="min-h-screen relative">
    <my-header/>
    <div class="container mb-10 h-full">
      <router-view/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue"
import MyFooter from "@/components/MyFooter.vue"
export default {
  components: { MyHeader, MyFooter },
  name:"App",
}
</script>

<style>

</style>
