<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark d-flex justify-content-between bottom-border">
        <a @click="currentComponent = 'FirstPage'" href="#">
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
                  <a class="a" @click="currentComponent = 'PriceList'" :class="{active: currentComponent == 'PriceList'}" href="#">Price List</a>
                </li>
                <div class="vl"></div>
                <li class="nav-item mr-sm-2">
                <a class="a" @click="currentComponent = 'LogIn'" :class="{active: currentComponent == 'LogIn'}" href="#">LogIn</a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </nav>

    <KeepAlive>
      <component :is="currentComponent" @forgotPassword="currentComponent = 'ForgotPassword'" @priceList="currentComponent = 'PriceList'"
        @logIn="currentComponent = 'LogIn'" @changeToHome="currentComponent = 'FirstPage'" @changeToLogIn="currentComponent = 'LogIn'" 
      ></component>
    </KeepAlive>

    </div>
  </template>
  
  <script>
    import LogIn from './HeaderLogOut/LogIn.vue'
    import PriceList from './HeaderLogOut/PriceList.vue'
    import ForgotPassword from './HeaderLogOut/ForgotPassword.vue'
    import FirstPage from './HeaderLogOut/FirstPage.vue'
    import Error from './HeaderLogOut/Error.vue'
    import RegistrationSuceed from './admin/RegistrationSuceed.vue'
    import UserExist from './HeaderLogOut/UserExist.vue'
    import Verified from './HeaderLogOut/Verified.vue'
    import ResetSuceed from './HeaderLogOut/ResetSuceed.vue'
    import WrongEmail from './HeaderLogOut/WrongEmail.vue'
    import NewPasswordSuceed from './HeaderLogOut/NewPasswordSuceed.vue'
    import EmailSent from './HeaderLogOut/EmailSent.vue'
    import NewPassword from './HeaderLogOut/NewPassword.vue'
    import SessionExpired from './HeaderLogOut/SessionExpired.vue'
  
    export default {
      components:{
        LogIn,
        PriceList,
        ForgotPassword,
        FirstPage,
        Error,
        RegistrationSuceed,
        UserExist,
        Verified,
        ResetSuceed,
        WrongEmail,
        NewPasswordSuceed,
        EmailSent,
        NewPassword,
        SessionExpired
      },
      data(){
        return{
          currentComponent: 'FirstPage',
        }
      },
      mounted(){
        if(window.location.search.substring(0,10) == '?JSONfile='){
          this.setEmptyURL()
        }
        if(window.location.search == '?registrationSuceed'){
          this.currentComponent = 'RegistrationSuceed'
          this.setEmptyURL()
        }
        if(window.location.search == '?error'){
          this.currentComponent = 'Error'
          this.setEmptyURL()
        }
        if(window.location.search == '?userExist'){
          this.currentComponent = 'UserExist'
          this.setEmptyURL()
        }
        if(window.location.search == '?verified'){
          this.currentComponent = 'Verified'
          this.setEmptyURL()
        }
        if(window.location.search == '?resetSuceed'){
          this.currentComponent = 'ResetSuceed'
          this.setEmptyURL()
        }
        if(window.location.search == '?wrongEmail'){
          this.currentComponent = 'WrongEmail'
          this.setEmptyURL()
        }
        if(window.location.search == '?newPasswordSuceed'){
          this.currentComponent = 'NewPasswordSuceed'
          this.setEmptyURL()
        }
        if(window.location.search == '?emailSent'){
          this.currentComponent = 'EmailSent'
          this.setEmptyURL()
        }
        if(window.location.search.substring(0,12) == '?newPassword'){
          this.currentComponent = 'NewPassword'
        }
        if(window.location.search == '?wrongLogIn'){
          this.currentComponent = 'LogIn'
        }
        if(window.location.search == '?sessionExpired'){
          this.currentComponent = 'SessionExpired'
        }
      },
      methods:{
        setEmptyURL(){
          window.history.pushState({}, document.title, "/");
        }
      }
    }
  </script>
  
  <style>
  </style>