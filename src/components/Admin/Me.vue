<template>
    <div class="d-flex flex-row justify-content-center mt-4">
        <h1 class="title title-admin" style="font-size: 2.5rem;">My admin account</h1>
    </div>
    <div class="d-flex flex-row mt-4 justify-content-center">
        <h3 class="small-title">New password: </h3>
        <input type="password" v-model="newPassword" style="margin-left: 39px">
    </div>
    <div class="d-flex flex-row mt-4 justify-content-center">
        <h3 class="small-title">Repeat password: </h3>
        <input class="ml-2" type="password" v-model="repeatPasssword">
    </div>
    <div class="d-flex flex-row mt-4 ml-1 justify-content-center">
        <button
            :disabled="(!newPassword.length || !repeatPasssword.length)"
            class="my-btn mx-2" 
            @click="changePassword"
            >Add
        </button>
    </div>

    <toast :text="toastText" :trigger="toastTriggerCounter"/>

</template>

<script>
    import Toast from '../Toast.vue'
    import sql from "../../assets/sql.js"
    import MD5 from "crypto-js/md5";

    export default {
        components: {
            Toast
        },
        data(){
            return{
                newPassword: '',
                repeatPasssword: '',
                toastText: '',
                toastTriggerCounter: 0
            }
        },
        methods:{
            changePassword(){
                if(this.newPassword.length < 5){
                    this.toastText = 'Too short password!'
                    this.toastTriggerCounter++
                }else if(this.newPassword != this.repeatPasssword){
                    this.toastText = 'You entered different passwords!'
                    this.toastTriggerCounter++
                }else{
                    window.location = sql.ResetAdminPassword() + "?password=" + MD5(this.newPassword)
                }
            }
        }
    }
</script>

<style scoped>
    .my-btn{
        border-color: var(--purple);
        min-width: 150px;
        max-width: 150px;
    }

    .my-btn:hover{
        cursor: pointer;
    }

    button:disabled{
        color: var(--dark-gray);
    }
</style>