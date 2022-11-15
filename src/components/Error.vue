<template>
    <div class="vh-100 text-center d-flex justify-content-center align-items-center">
        <div>
            <h3 class="notification">Ops...</h3>
            <h3 class="notification">Something went wrong!</h3>
            <button @click="changeToHome" class="my-btn btn btn-outline-light btn-lg px-5" style="margin-top: 2rem;" type="submit">Home</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            changeToHome(){
                this.$emit("changeToHome");
            }
        }
    }
</script>

<style>

</style>