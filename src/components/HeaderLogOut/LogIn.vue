<template>
  <section class="gradient-custom d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white">
            <div class="card-body p-5 text-center">

              <div v-if="component == 'user'" class="pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">User Login</h2>
                <hr v-if="componentSwitch" class="hr-login">
                <h2 v-if="componentSwitch" style="color: var(--pink)">To log-in refresh the page!</h2>
                <button v-if="componentSwitch" class="my-btn btn btn-outline-light btn-lg px-5"
                  style="margin-top: 20px" @click="refresh">Refresh
                </button>
                <div id="qr-reader" style="width: 100%; height: 100%; display: inherit"></div>
              </div>

              <div :key="component" v-if="component == 'employee'" class="pb-5" @keydown.enter="LogIn()">
                <h2 class="fw-bold mb-2 text-uppercase">Employee Login</h2>
                <div id="qr-reader" style="width: 100%; height: 100%;"></div>
                <p class="text-white-50 mb-5">Please enter your login and password!</p>
                <div class="form-outline mb-4">
                  <p class="error-message" v-if="usernameMessage">{{usernameMessage}}</p>
                  <input v-model="username" @change="usernameMessage = null" type="username" id="username" class="my-input form-control form-control-lg" placeholder="Username" />
                  <label class="form-label" for="username">Username</label>
                </div>
                <div class="form-outline mb-4">
                  <p class="error-message" v-if="passwordMessage">{{passwordMessage}}</p>
                  <input v-model="password" @change="usernameMessage = null" type="password" id="typePasswordX" class="my-input form-control form-control-lg" placeholder="Password" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                <!--<p class="small mb-5 pb-lg-2"><a class="link" @click="switchToForgotPassword" href="#">Forgot password?</a></p>-->
                <button @click="LogIn()" class="my-btn btn btn-outline-light btn-lg px-5" type="submit">Login</button>
              </div>

              <hr class="hr-login">
              <p v-if="component == 'user'" class="link" @click="component = 'employee'">Switch to employee login</p>
              <p v-else class="link" @click="component = 'user'; componentSwitch = true">Switch to user login</p>
              <hr class="hr-login">

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import checkInputs from '../../assets/checkInputs'
  import MD5 from "crypto-js/md5";
  import sql from "../../assets/sql.js"

  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned = ${decodedText}`, decodedResult)
    window.location = decodedText
  }

  export default {
    data(){
      return{
        username: null,
        usernameMessage: null,
        password: null,
        passwordMessage: null,
        token: null,
        tokenExpiration: null,
        component: 'user',
        componentSwitch: false
      }
    },
    mounted(){
      var html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader", { fps: 10, qrbox: 250 });
      html5QrcodeScanner.render(onScanSuccess);
      document.getElementById('qr-reader').style.border = 'none'


      if(window.location.search == '?wrongLogIn'){
        this.usernameMessage = 'Wrong username or password!'
        this.component = 'employee'
        window.history.pushState({}, document.title, "/")
      }
    },
    methods:{
      switchToForgotPassword(){
        this.$emit("forgotPassword");
      },

      switchToSignUp(){
        this.$emit("signUp");
      },

      LogIn(){
        this.passwordMessage = checkInputs.checkPasswordLength(this.password)
        this.usernameMessage = checkInputs.checkUsernameLength(this.username)
        const d = new Date();
        let time = d.getTime();
        this.token = time + MD5(this.username).toString()
 
        if(this.usernameMessage == null && this.passwordMessage == null)
          window.location = sql.LogIn() + "?password=" + MD5(this.password).toString() + "&username=" + this.username + "&token=" + this.token
      },

      refresh(){
        window.location = '../?logIn'
      }
    }
  }
</script>

<style>
  button{
    background-color: var(--dark-gray);
    color: white;
    transition: 0.3s;
    border: sold 10px white;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
  }

  button:hover{
      transition: 0.3s;
      background-color: var(--pink);
  }

  #qr-reader__header_message{
    color: white;
  }

  #qr-reader__dashboard_section_swaplink{
    display: none
  }

  #qr-reader{
    border: 0px solid silver;
  }

  #qr-reader__status_span{
    display: none;
  }

  .hr-login{
    background-color: var(--gray)
  }

  #qr-reader__dashboard_section_csr button{
    background-color: var(--dark-gray);
    color: white;
    transition: 0.3s;
    border: sold 10px white;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
    max-width: 100%;
  }

  #qr-reader__dashboard_section_csr button:hover{
    transition: 0.3s;
    background-color: var(--pink);
  }

  #qr-reader__status_span{
    color: white
  }

  #qr-reader div span a{
    color: white;
  }

  #qr-reader__camera_selection{
    color: var(--dark-gray);
    border-radius: 7px;
    padding: 5px 10px 5px 10px;
    margin: 10px 0 15px 0;
    max-width: 100%;
  }

  #qr-shaded-region{
    display: none;
  }

  #qr-reader__scan_region video{
    border-radius: 15px;
    max-width: 100%;
  }

  .text-uppercase{
    font-size: 1.4rem;
  }

  h2{
    font-size: 1.2rem;
  }
</style>