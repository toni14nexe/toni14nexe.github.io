<template>
    <div class="vh-100 text-center d-flex justify-content-center align-items-center">
        <div>
            <h3 class="notification">Ops...</h3>
            <h3 class="notification">That email is not registered!</h3>
            <button @click="changeToSignUp" class="my-btn btn btn-outline-light btn-lg px-5" style="margin-top: 2rem;" type="submit">Try to SignUp</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            changeToSignUp(){
                this.$emit("changeToSignUp");
            }
        }
    }
</script>

<style>

</style>