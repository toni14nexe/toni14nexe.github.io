<template>
  <div><!-- ------------ dovršiti to ------------ -->
    <navbar :role="role" :currentComponent="currentComponent" @priceList="currentComponent = 'PriceList'" 
    @cart="currentComponent = 'Cart'" @logout="logout()" @firstPage="switchToFirstPage()"/>
       <!-- ------------ dovršiti to ------------ -->

    <generator v-if="role == 'generator'" :token="token" :code="code"/>
    
    <cart v-if="role == 'table' && currentComponent == 'Cart'" :role="role" :cart="emitCart" @firstPage="switchToFirstPage()" :table="username"/>
    <keep-alive>
      <price-list v-if="role == 'table' && currentComponent == 'PriceList'" :role="role" @cartEmit="(cart) => emitCart = cart"/>
    </keep-alive>

  </div>
</template>

<script>
    import sql from '../assets/sql'
    import pageMainLink from '../assets/pageMainLink'
    import VueCookies from 'vue-cookies'
    import Navbar from './Navbar.vue'
    import Generator from './Generator/Generator.vue'
    import PriceList from './PriceList.vue'
    import Cart from './Table/Cart.vue'

    export default {
      components:{
        Navbar,
        Generator,
        PriceList,
        Cart
      },
        data(){
            return{
                username: null,
                fullname: null,
                role: null,
                token: null,
                code: null,
                component: null,
                currentComponent: null,
                emitCart: null
            }
        },
        mounted(){
            this.verificateAndSetUser()
            this.switchToFirstPage()

            if(window.location.search == '?placedOrder'){
              console.log('?placedOrder')
              //this.currentComponent = 'Error'
              //this.setEmptyURL()
            }
        },
        methods:{
          verificateAndSetUser(){
            if(this.$route.query.ok == 'true' && this.$route.query.role == 'generator'){
              this.code = this.$route.query.newCode
              VueCookies.set('token' , this.$route.query.token, '15min')
            }
            if(this.$route.query.wrongToken == 'true'){
              this.logout()
            }
            this.username = this.$route.query.username
            this.token = this.$route.query.token
            this.fullname = this.$route.query.fullname
            this.role = this.$route.query.role
            if(this.$route.query.ok == 'new'){
              VueCookies.set('token' , this.$route.query.token, '15min')
            } else if(this.$route.query.ok == 'true'){
              VueCookies.set('token' , VueCookies.get('token'), '15min')
            } else{
              window.location = sql.CheckUser() + '?token=' + VueCookies.get('token')
            }
            if((this.role != 'admin' || this.role != 'chef' || this.role != 'waiter' || this.role != 'table' || this.role != 'generator') && !VueCookies.get('token')){
              if(VueCookies.get('token')){
                VueCookies.remove('token')
              }
              window.location = pageMainLink.link()
            }
            window.history.pushState({}, document.title, "/");
          },

          logout(){
            if(this.role == 'generator'){
              VueCookies.remove('token')
              window.location = sql.RemoveOrderCodes()
            } else{
              VueCookies.remove('token')
              window.location = pageMainLink.link()
            }
          },

          switchToFirstPage(){
            if(this.currentComponent == 'PriceList') {
              window.scrollTo({ top:0, left: 0, behavior: 'smooth'})
            }
            else if(this.role == 'table') {
              this.currentComponent = 'PriceList'
            }  
          }
        }
    }
</script>

<style scoped>
  .title-div{
    color: white;
  }

  .title-div:hover{
    color: var(--pink);
  }

  .fa-solid{
    padding-right: 7px;
  }

  .activeList{
    background-color: white;
    color: var(--gray);
  }

  .nav-item{
    color: white;
  }

  .nav-item:hover{
    color: var(--pink);
    text-decoration: underline;
    cursor: pointer;
  }
</style>