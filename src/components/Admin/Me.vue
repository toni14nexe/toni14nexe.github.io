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
</template>

<script>
    export default {
        data(){
            return{
                newPassword: '',
                repeatPasssword: ''
            }
        },
        methods:{
            changePassword(){
                console.log('change password')
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