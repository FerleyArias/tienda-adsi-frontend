<template>
  <header class="flex justify-between bg-blue-700 text-white p-5">
    <div class="flex items-center">
      <button class="mr-3 ">
        <font-awesome-icon icon="bars"/>
      </button>
      <h3 class="text-lg">Bodega</h3>
    </div>
    <button>
        <font-awesome-icon class="text-2xl" icon="sign-out-alt"/>
    </button>
  </header>
</template>

<script>
export default {
  name: 'MyHeader',
}
</script>