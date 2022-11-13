<template>
  <div class="d-flex flex-column justify-content-center">
    <h1 class="notification" style="margin-top: 30px">{{firstname}} {{lastname}}</h1>
    <h3 class="notification" style="margin-top: 20px; margin-bottom: 30px;">{{email}}</h3>

    <div v-if="showPasswordChange == 1" style="margin-top: 40px">
        <center>
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
        </center>
    </div>
    <button @click="changePassword()" class="my-btn btn btn-outline-light btn-lg px-5">Change password</button>
    <img :src='image'>
    <div v-if="showImageChange == 1" style="margin-top: 40px">
        <center>
            <input @change="bb" type="file" id="image-input" accept="image/jpeg, image/png, image/jpg">
            <div id="display-image"></div>
        </center>
    </div>
    <button @click="changeProfilImage" class="my-btn btn btn-outline-light btn-lg px-5" style="margin-top: 10px">Change profil image</button>

  </div>
</template>

<script>
    import checkInputs from '../../assets/checkInputs.js'
    import MD5 from "crypto-js/md5";
    import sql from '../../assets/sql.js';

    export default {
        props: [
            'firstname',
            'lastname',
            'email',
            'image',
            'emailToken'
        ],
        data(){
            return{
                showImageChange: 0,
                showImage: 0,
                showPasswordChange: 0,
                password: null,
                passwordMessage: null,
                passwordConfirm: null,
                passwordConfirmMessage: null
            }
        },
        methods:{
            changePassword(){
                if(this.showPasswordChange == 0){
                    this.showPasswordChange = 1
                }else if(this.showPasswordChange == 1){
                    this.passwordMessage = checkInputs.checkPassword(this.password)
                    this.passwordConfirmMessage = checkInputs.checkPasswordConfirm(this.password, this.passwordConfirm)
                    if(this.passwordMessage == null && this.passwordConfirmMessage == null)
                        window.location = sql.ChangePassword() + "?emailToken=" + this.emailToken + "&password=" + MD5(this.password).toString()
                }
            },

            changeProfilImage(){
                if(this.showImageChange == 0){
                    this.showImageChange = 1
                }
            },
            a(){
                console.log('asasa')
                this.showImage = 1
                const image_input = document.querySelector("#image-input");

  const reader = new FileReader();

                const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  reader.readAsDataURL(this.files[0]);

            },

            bb(){
  const reader = new FileReader();
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  reader.readAsDataURL(this.files[0]);
            }
        }
    }
</script>

<style scoped>
    .d-flex{
        text-align: center;
    }

    .my-btn{
        width: min-content;
        align-self: center;
        margin-top: 20px;
    }

    img{
        align-self: center;
        display: inherit;
        margin-top: 50px;
        min-height: 40vh;
        max-height: 40vh;
        min-width: 40vh;
        max-width: 40vh;
    }

    .my-input{
        background-color: white;
        color: var(--gray);
        max-width: fit-content;
    }

    .form-label{
        color: white;
    }

    #display-image{
  width: 400px;
  height: 225px;
  border: 1px solid black;
  background-position: center;
  background-size: cover;
}
</style>