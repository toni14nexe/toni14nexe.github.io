<template>
  <div>
    <navbar @login="currentComponent = 'LogIn'" :currentComponent="currentComponent" @priceList="currentComponent = 'PriceList'" @firstPage="firstPage()"/>

    <KeepAlive>
      <component :is="currentComponent" @forgotPassword="currentComponent = 'ForgotPassword'" @priceList="currentComponent = 'PriceList'"
        @logIn="currentComponent = 'LogIn'" @changeToHome="currentComponent = 'FirstPage'" @changeToLogIn="currentComponent = 'LogIn'" 
      ></component>
    </KeepAlive>

  </div>
</template>
  
  <script>
    import LogIn from './HeaderLogOut/LogIn.vue'
    import PriceList from './PriceList.vue'
    import ForgotPassword from './HeaderLogOut/ForgotPassword.vue'
    import FirstPage from './HeaderLogOut/FirstPage.vue'
    import Error from './Error.vue'
    import RegistrationSuceed from './Admin/RegistrationSuceed.vue'
    import UserExist from './Admin/UserExist.vue'
    import Verified from './HeaderLogOut/Verified.vue'
    import ResetSuceed from './HeaderLogOut/ResetSuceed.vue'
    import NewPasswordSuceed from './HeaderLogOut/NewPasswordSuceed.vue'
    import EmailSent from './Admin/EmailSent.vue'
    import NewPassword from './HeaderLogOut/NewPassword.vue'
    import SessionExpired from './HeaderLogOut/SessionExpired.vue'
    import WrongCode from './HeaderLogOut/WrongCode.vue'
    import Navbar from './Navbar.vue'
    import VueCookies from 'vue-cookies'
    import pageMainLink from '../assets/pageMainLink'
  
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
        NewPasswordSuceed,
        EmailSent,
        NewPassword,
        SessionExpired,
        Navbar,
        WrongCode
      },
      data(){
        return{
          currentComponent: 'FirstPage',
        }
      },
      mounted(){
        if(VueCookies.get('token') && window.location.search == '?wrongCode=true'){
          VueCookies.remove('token')
          this.setEmptyURL()
          this.currentComponent = 'WrongCode'
        }
        if(VueCookies.get('token')){
          window.location = pageMainLink.link() + 'main'
        }
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
        if(window.location.search == '?logIn'){
          this.currentComponent = 'LogIn'
        }
        if(window.location.search == '?sessionExpired'){
          this.currentComponent = 'SessionExpired'
        }
      },
      methods:{
        setEmptyURL(){
          window.history.pushState({}, document.title, "/");
        },

        firstPage(){
          this.currentComponent = 'FirstPage'
          window.scrollTo({ top:0, left: 0, behavior: 'smooth'})
        }
      }
    }
  </script>
  
  <style>
  </style>