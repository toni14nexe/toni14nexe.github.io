<template>
  <meta http-equiv='cache-control' content='no-cache'>
  <meta http-equiv='expires' content='0'>
  <meta http-equiv='pragma' content='no-cache'>
  <div><!-- ------------ dovršiti to ------------ -->
    <navbar :role="role" :currentComponent="currentComponent" @priceList="currentComponent = 'PriceList'" 
    @cart="currentComponent = 'Cart'" @logout="logout()" @firstPage="switchToFirstPage()" :bill="bill"
    @bill="currentComponent = 'Bill'" />
       <!-- ------------ dovršiti to ------------ -->

    <generator v-if="role == 'generator'" :token="token" :code="code"/>
    
    <cart v-if="role == 'table' && currentComponent == 'Cart'" :role="role" :cart="emitCart" @firstPage="switchToFirstPage()" :table="username" :APICart="APICart" />
    <bill v-if="role == 'table' && currentComponent == 'Bill'" @firstPage="switchToFirstPage()" :table="username" :APICart="APICart" />
    <keep-alive>
      <price-list v-if="role == 'table' && currentComponent == 'PriceList'" :role="role" @cartEmit="(cart) => emitCart = cart"/>
    </keep-alive>

    <waiter-orders v-if="role == 'waiter'" :fullname="fullname" :tableNumber="tableNumber"/>
    <chef-orders v-if="role == 'chef'" :fullname="fullname" :tableNumber="tableNumber"/>

    <main-admin v-if="role == 'admin'" :fullname="fullname" :tableNumber="tableNumber"/>

  </div>
</template>

<script>
    import sql from '../assets/sql'
    import pageMainLink from '../assets/pageMainLink'
    import VueCookies from 'vue-cookies'
    import Navbar from './Navbar.vue'
    import Generator from './Generator/Generator.vue'
    import PriceList from './PriceList.vue'
    import axios from 'axios'
    import Cart from './Table/Cart.vue'
    import Bill from './Table/Bill.vue'
    import WaiterOrders from './Waiter/Orders.vue'
    import ChefOrders from './Chef/Orders.vue'
    import MainAdmin from './Admin/MainAdmin.vue'

    export default {
      components:{
        Navbar,
        Generator,
        PriceList,
        Cart,
        Bill,
        WaiterOrders,
        ChefOrders,
        MainAdmin
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
                emitCart: null,
                APICart: null,
                bill: false,
                tableNumber: null
            }
        },
        mounted(){
          this.verificateAndSetUser()
        
          if(this.role == 'table'){
            this.getTableAPI()
            this.switchToFirstPage()
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
            if(this.role == 'admin' || this.role == 'chef' || this.role == 'waiter'){
              this.getTableNumber()
              VueCookies.set('token' , this.$route.query.token, '4h')
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
          },

          async getTableAPI(){
            await axios.get('https://toni-web.com/thepurplehat/tables/' + this.username)
            .then((result) =>{
              this.APICart = result.data
              if(this.APICart.length > 0){
                this.APICart = JSON.parse(this.APICart)
                this.bill = true
              }
            })
          },

          async getTableNumber(){
            await axios.get('https://toni-web.com/thepurplehat/tables/tableNumber')
            .then((result) => {
              this.tableNumber = result.data
            })
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