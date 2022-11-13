<template>
  <div>
    <section class="gradient-custom d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">

                <div class="pb-5">

                  <h2 class="fw-bold mb-2 text-uppercase">Reset password</h2>
                  <p class="text-white-50 mb-5">Please enter your login and password!</p>

                  <div class="form-outline mb-4">
                    <p class="error-message" v-if="codeMessage">{{codeMessage}}</p>
                    <input v-model="code" type="text" id="code" class="my-input form-control form-control-lg" placeholder="Verify code" />
                    <label class="form-label" for="code">Verify code - in your email</label>
                  </div>

                  <div class="form-outline mb-4">
                    <p class="error-message" v-if="passwordMessage">{{passwordMessage}}</p>
                    <input type="password" v-model="password" id="typePasswordX" class="my-input form-control form-control-lg" placeholder="Password" />
                    <label class="form-label" for="typePasswordX">Password</label>
                  </div>

                    <div class="form-outline mb-4">
                        <p class="error-message" v-if="passwordConfirmMessage">{{passwordConfirmMessage}}</p>
                        <input type="password" v-model="passwordConfirm" id="typePasswordXX" class="my-input form-control form-control-lg" placeholder="Password" />
                        <label class="form-label" for="typePasswordXX">Confirm password</label>
                    </div>

                  <button @click="Reset" class="my-btn btn btn-outline-light btn-lg px-5" type="submit">Reset</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import checkInputs from '../../assets/checkInputs.js'
    import MD5 from "crypto-js/md5";
    import sql from "../../assets/sql.js"

    export default {
        data(){
            return{
                code: null,
                password: null,
                passwordConfirm: null,
                codeMessage: null,
                passwordMessage: null,
                passwordConfirmMessage: null,
                newVerificationLink: null
            }
        },
        mounted(){
          this.code = window.location.search.substring(12,window.location.search.length)
          window.history.pushState({}, document.title, "/");
        },
        methods:{
            Reset(){
                this.codeMessage = checkInputs.checkCode(this.code)
                this.passwordMessage = checkInputs.checkPassword(this.password)
                this.passwordConfirmMessage = checkInputs.checkPasswordConfirm(this.password, this.passwordConfirm)
                const d = new Date();
                let time = d.getTime();
                this.newVerificationLink = time + this.code.substr(13,this.code.length);

                if(this.passwordMessage == null && this.passwordConfirmMessage == null && this.codeMessage == null)
                    window.location = sql.NewPassword() + "?verificationLink=" + this.code 
                        + "&newVerificationLink=" + MD5(this.newVerificationLink).toString() + "&password=" + MD5(this.password).toString()
            }
        }
    }
</script>

<style>

</style>