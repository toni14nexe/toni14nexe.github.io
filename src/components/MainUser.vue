<template>
  <div>
    <navbar />

  </div>
</template>

<script>
    import sql from '../assets/sql'
    import pageMainLink from '../assets/pageMainLink'
    import VueCookies from 'vue-cookies'
    import Navbar from './Navbar.vue'

    export default {
      components:{
        Navbar
      },
        data(){
            return{
                currentComponent: null,
                currentSubComponent: 'Account',
                username: null,
                fullname: null,
                role: null
            }
        },
        mounted(){
            this.verificateAndSetUser()
        },
        methods:{
          verificateAndSetUser(){
            if(this.$route.query.wrongToken == 'true'){
              VueCookies.remove('token')
              window.location = pageMainLink.link()
            }
            this.username = this.$route.query.username
            this.fullname = this.$route.query.fullname
            this.role = this.$route.query.role
            if(this.$route.query.ok == 'new'){
              VueCookies.set('token' , this.$route.query.token, '15min')
            } else if(this.$route.query.ok == 'true'){
              VueCookies.set('token' , VueCookies.get('token'), '15min')
            } else{
              window.location = sql.CheckUser() + '?token=' + VueCookies.get('token')
            }
            if((this.role != 'admin' || this.role != 'chef' || this.role != 'waiter' || this.role != 'user') && !VueCookies.get('token')){
              if(VueCookies.get('token')){
                VueCookies.remove('token')
              }
              window.location = pageMainLink.link()
            }
            window.history.pushState({}, document.title, "/");
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