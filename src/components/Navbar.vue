<template>
    <nav class="navbar navbar-expand-lg bg-dark d-flex justify-content-between bottom-border">
        <a @click="$emit('firstPage')" href="#">
          <div class="title-div">
              <img class="favicon" src="../../public/favicon.ico" alt="">
              <a class="navbar-brand title" href="#">The Purple Hat</a>
          </div>
        </a>

        <div>
          <button class="navbar-toggler" @click="currentComponent = 'LogIn'" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-list-ul fa-bars text-white"></i>
          </button>
            
          <form class="form-inline">
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
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style>

</style>