<template>
  <div>
    <navbar :role="role" @firstPage="component = 'aaa'" @logout="logout()"/>

    <generator v-if="role == 'generator'" :token="token" :code="code"/>

  </div>
</template>

<script>
    import sql from '../assets/sql'
    import pageMainLink from '../assets/pageMainLink'
    import VueCookies from 'vue-cookies'
    import Navbar from './Navbar.vue'
    import Generator from './Generator/Generator.vue'

    export default {
      components:{
        Navbar,
        Generator
      },
        data(){
            return{
                username: null,
                fullname: null,
                role: null,
                token: null,
                code: null,
                component: null
            }
        },
        mounted(){
            this.verificateAndSetUser()
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
            if((this.role != 'admin' || this.role != 'chef' || this.role != 'waiter' || this.role != 'user' || this.role != 'generator') && !VueCookies.get('token')){
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