<template>

  <div id="app">
    <div class="min-vh">
      <log-in-navbar v-if="logIn"/>
      <router-view/>
    </div>
    <footer-component/>
  </div>
</template>

<script>
  import Footer from './components/Footer.vue'

  export default {
    data(){
      return{
        logIn: false
      }
    },
    components:{
      'footer-component': Footer
    }
  }
</script>

<style>
  .min-vh{
    min-height: calc(100vh - 286.5px);
  }
</style>