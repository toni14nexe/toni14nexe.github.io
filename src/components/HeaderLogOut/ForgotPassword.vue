<template>
    <div id="main">
        <section class="d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 290px)">
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white">
                            <div class="card-body p-5 text-center">

                                <div class="pb-5">

                                    <h2 class="fw-bold mb-2 text-uppercase">Reset password</h2>
                                    <p class="text-white-50 mb-5">Please enter your email!</p>

                                    <div class="form-outline mb-4">
                                        <p class="error-message" v-if="emailMessage">{{emailMessage}}</p>
                                        <input v-model="email" type="email" id="typeEmailX" class="my-input form-control form-control-lg" placeholder="Email" />
                                        <label class="form-label" for="typeEmailX">Email</label>
                                    </div>

                                    <button @click="reset"  class="my-btn btn btn-outline-light btn-lg px-5" type="submit">Reset</button>

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
    import checkInputs from '../../assets/checkInputs';
    import MD5 from "crypto-js/md5";
    import sql from "../../assets/sql.js"

    export default {
        data(){
            return{
                emailMessage: null,
                email: null,
                verificationLink: null
            }
        },
        methods:{
            reset(){
                this.emailMessage = checkInputs.checkEmail(this.email)
                if(this.emailMessage == null){
                    const d = new Date();
                    let time = d.getTime();
                    this.verificationLink = time + this.email;
                    window.location = sql.ForgotPassword() + "?verificationLink=" + MD5(this.verificationLink).toString() + "&email=" + this.email
                }
            }
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 320px) {
        .text-uppercase{
            font-size: 1.3rem;
        }
    }
</style>