<template>
    <nav class="navbar navbar-expand-lg bg-dark d-flex justify-content-between bottom-border">
        <a @click="$emit('firstPage')">
          <div class="title-div">
              <img class="favicon" src="../../public/favicon.ico" alt="">
              <span class="navbar-brand title" href="#">The Purple Hat</span>
          </div>
        </a>

        <div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-list-ul fa-bars text-white"></i>
          </button>
          
          <form v-if="!role || tokenAlive" class="form-inline">
            <div class="collapse navbar-collapse my-2 my-lg-0" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item mr-sm-2">
                  <a class="a" @click="$emit('priceList')" :class="{active: currentComponent == 'PriceList'}" href="#">Price List</a>
                </li>
                <div class="vl"></div>
                <li class="nav-item mr-sm-2">
                  <a class="a" @click="$emit('login')" :class="{active: currentComponent == 'LogIn'}" href="#">LogIn</a>
                </li>
              </ul>
            </div>
          </form>

          <form v-else class="form-inline">
            <div class="collapse navbar-collapse my-2 my-lg-0" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item mr-sm-2">
                  <a class="a" @click="$emit('logout')" :class="{active: currentComponent == 'LogIn'}" href="#">LogOut</a>
                </li>
              </ul>
            </div>
          </form>
        </div>
    </nav>
</template>

<script>
  import VueCookies from 'vue-cookies'

  export default {
    props: [
      'role'
    ],
    data(){
      return{
        tokenAlive: false
      }
    },
    methods:{
      isTokenAlive(){
        if(VueCookies.get('token'))
          this.tokenAlive = true
      }
    }
  }
</script>

<style>

</style>