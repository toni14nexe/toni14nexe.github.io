<template>
  <section class="gradient-custom d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white">
            <div class="card-body p-5 text-center">

              <div class="pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Employee Login</h2>
                <div id="qr-reader" style="width: 100%; height: 100%;"></div>

                <p class="text-white-50 mb-5">Please enter your login and password!</p>

                <div class="form-outline mb-4">
                  <p class="error-message" v-if="emailMessage">{{emailMessage}}</p>
                  <input v-model="email" type="email" id="typeEmailX" class="my-input form-control form-control-lg" placeholder="Email" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline mb-4">
                  <p class="error-message" v-if="passwordMessage">{{passwordMessage}}</p>
                  <input v-model="password" type="password" id="typePasswordX" class="my-input form-control form-control-lg" placeholder="Password" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <p class="small mb-5 pb-lg-2"><a class="link" @click="switchToForgotPassword" href="#">Forgot password?</a></p>

                <button @click="LogIn" class="my-btn btn btn-outline-light btn-lg px-5" type="submit">Login</button>

              </div>

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
    console.log(`Code scanned = ${decodedText}`, decodedResult);
  }

  export default {
    data(){
      return{
        email: null,
        emailMessage: null,
        password: null,
        passwordMessage: null,
        token: null,
        tokenExpiration: null
      }
    },
    mounted(){
      var html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader", { fps: 10, qrbox: 250 });
      html5QrcodeScanner.render(onScanSuccess);
      if(window.location.search == '?wrongLogIn'){
          this.emailMessage = 'Wrong email or password!'
          window.history.pushState({}, document.title, "/");
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
        this.emailMessage = checkInputs.checkEmail(this.email)
        this.passwordMessage = checkInputs.checkPasswordLength(this.password)
        const d = new Date();
        let time = d.getTime();
        this.token = time + MD5(this.email).toString()
        this.tokenExpiration = new Date().toLocaleString()

        if(this.emailMessage == null && this.passwordMessage == null)
          window.location = sql.LogIn() + "?password=" + MD5(this.password).toString() + "&email=" + this.email
            + "&emailToken=" + MD5(this.email).toString() + "&token=" + this.token + "&tokenExpiration=" + this.tokenExpiration
      }
    }
  }
</script>

<style scoped>
</style>