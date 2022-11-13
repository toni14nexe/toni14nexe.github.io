<template>
  <div class="text-center" v-if="currentComponent == null">
    <h1 class="notification">Not found</h1>
    <a href="./"><button class="my-btn btn btn-outline-light btn-lg px-5" style="margin-top: 2rem;" type="submit">Home</button></a>
  </div>

  <component :is="currentComponent"></component>
</template>

<script>
  export default {}
</script>

<style>

</style>