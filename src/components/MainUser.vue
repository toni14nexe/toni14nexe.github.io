<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark d-flex justify-content-between">
          <div @click="currentSubComponent = 'Account', currentComponent = null" class="title-div">
              <img class="favicon" src="../../public/favicon.ico" alt="">
              <a class="navbar-brand title">VoiceApp</a>
          </div>

        <div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-list-ul fa-bars text-white"></i>
          </button>
            
          <form class="form-inline">
            <div class="collapse navbar-collapse my-2 my-lg-0" id="navbarSupportedContent">
                <div class="input-group" style="margin-right: 20px">
                <div class="form-outline">
                    <input v-model="searchLive" type="search" id="form1" class="my-input form-control" placeholder="Search..."/> 
                </div>
                <button @click="search" type="button" class="my-btn btn btn-outline-light" style="border-color: white">
                    <i class="fas fa-search"></i>
                </button>
            </div>
              <ul class="navbar-nav mr-auto">
                <li @click="currentComponent = null, currentSubComponent = 'Account'" class="nav-item mr-sm-2">
                  <a class="a" :class="{active: currentComponent == null}">{{ firstname + ' ' + lastname }}</a>
                </li>
                <div class="vl"></div>
                  <li class="nav-item mr-sm-2">
                    <a class="a" href="./">LogOut</a>
                  </li>
              </ul>
            </div>
          </form>
        </div>
      </nav>

      <div class="row">
        <div v-if="currentComponent == null" class="side-bar col-sm-6 col-md-4 col-lg-3">
          <nav id="sidebarMenu" class="d-lg-block sidebar">
              <div class="list-group list-group-flush mx-3 mt-4">
                <a @click="currentComponent = 'Account'" href="#" class="listed list-group-item list-group-item-action py-2 ripple"
                  :class="{activeList: currentSubComponent == 'Account'}">
                  <i class="fa-solid fa-user"></i><span>My account</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
                <a href="#" class="listed list-group-item list-group-item-action py-2 ripple">
                  <i class="fa-solid fa-message"></i><span>Some user</span>
                </a>
              </div>
          </nav>
        </div>

        <div class="col-sm-6 col-md-8 col-lg-9">
          <component :is="currentSubComponent" :firstname='firstname' :lastname='lastname'  :email='email' 
            :image='image' :emailToken='emailToken'
          ></component>
        </div>
      </div>


      <KeepAlive>
        <component :is="currentComponent" :searchText='searchText'
        ></component>
      </KeepAlive>
  </div>
</template>

<script>
    import mainUser from '../assets/mainUser.js'
    import sql from '../assets/sql'
    import VueCookies from 'vue-cookies'
    import Search from './LoggedIn/Search.vue'
    import Messages from './LoggedIn/Messages.vue'
    import EmptySearch from './LoggedIn/EmptySearch.vue'
    import Account from './LoggedIn/Account.vue'

    export default {

        components:{
            Search,
            Messages,
            EmptySearch,
            Account
        },
        data(){
            return{
                currentComponent: null,
                currentSubComponent: 'Account',
                email: null,
                emailToken: null,
                firstname: null,
                lastname: null,
                image: null,
                searchText: null,
                searchLive: null
            }
        },
        mounted(){
            if(!VueCookies.get('email')) mainUser.setCookies()

            this.email = VueCookies.get('email')
            this.firstname = VueCookies.get('firstname')
            this.lastname = VueCookies.get('lastname')
            this.image = VueCookies.get('image')
            this.emailToken = VueCookies.get('emailToken')

            if(window.location.search.indexOf('?link=1') > -1){
                this.searchText = mainUser.getSearch()
                this.currentComponent = 'Search'
                this.currentSubComponent = null
            }
            else if(window.location.search.substring(window.location.search.length-11, window.location.search.length) == '?empty=true')
                this.currentComponent = 'EmptySearch'

            else
                window.history.pushState({}, document.title, "/");
        },
        methods:{
            search(){
                this.searchText = this.searchLive
                if(this.searchText){
                    this.currentSubComponent = null
                    window.location = sql.Search() + "?search=" + this.searchText
                }
                else
                    this.currentComponent = null
            }
        }
    }
</script>

<style scoped>
  .side-bar{
    min-height: 100%;
    max-height: 100%;
    background-color: var(--gray);
    padding-top: 10px;
    padding-bottom: 30px;
  }

  .listed{
    background-color: var(--gray);
    color: white;
  }

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