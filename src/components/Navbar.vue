<template>
    <nav class="navbar navbar-expand-lg bg-dark d-flex justify-content-between bottom-border">
        <a @click="$emit('firstPage')">
          <div class="title-div">
              <img class="favicon" src="../../public/favicon.ico" alt="">
              <h1 class="navbar-brand title">The Purple Hat</h1>
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
                  <span class="a" @click="$emit('priceList')" :class="{active: currentComponent == 'PriceList'}" href="#">Price List</span>
                </li>
                <div class="vl"></div>
                <li class="nav-item mr-sm-2">
                  <span class="a" @click="$emit('login')" :class="{active: currentComponent == 'LogIn'}" href="#">LogIn</span>
                </li>
              </ul>
            </div>
          </form>

          <form v-else class="form-inline">
            <div class="collapse navbar-collapse my-2 my-lg-0" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li v-if="role == 'table'" class="nav-item mr-sm-2">
                  <span class="a" @click="$emit('priceList')" :class="{active: currentComponent == 'PriceList'}" href="#">Order</span>
                </li>
                <div v-if="role == 'table'" class="vl"></div>
                <li v-if="role == 'table'" class="nav-item mr-sm-2">
                  <span class="a" @click="$emit('cart')" :class="{active: currentComponent == 'Cart'}" href="#">Cart</span>
                </li>
                <div v-if="role == 'table' && bill" class="vl"></div>
                <li v-if="role == 'table' && bill" class="nav-item mr-sm-2">
                  <span class="a" @click="$emit('bill')" :class="{active: currentComponent == 'Bill'}" href="#">Bill</span>
                </li>
                <div v-if="role == 'table'" class="vl"></div>
                <li class="nav-item mr-sm-2">
                  <span class="a" @click="$emit('logout')" href="#">LogOut</span>
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
      'role',
      'currentComponent',
      'bill'
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

<style scoped>
  .a{
    cursor: pointer;
  }
</style>