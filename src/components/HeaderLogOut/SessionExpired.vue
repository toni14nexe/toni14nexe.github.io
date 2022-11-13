<template>
    <div class="vh-100 text-center d-flex justify-content-center align-items-center">
        <div>
            <h3 class="notification">Session expired...</h3>
            <button @click="changeToLogIn" class="my-btn btn btn-outline-light btn-lg px-5" style="margin-top: 2rem;" type="submit">LogIn</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            changeToLogIn(){
                this.$emit("changeToLogIn");
            }
        }
    }
</script>

<style>

</style>