<template>
    <div class="table-div mt-3 py-5">
        <div class="d-flex flex-row justify-content-center">
            <button class="my-btn mx-1" :class="{active: currentComponent == 'Products'}" @click="currentComponent='Products'">Products</button>
            <button class="my-btn mx-1">Tables</button>
            <button class="my-btn mx-1">Employees</button>
            <button class="my-btn mx-1">Orders</button>
            <button class="my-btn mx-1">Me</button>
        </div>

        <keep-alive>
            <component :is="currentComponent" class="mt-4 mb-4"></component>
        </keep-alive>

    </div>
</template>

<script>
    import Products from './Products.vue'

    export default {
        components:{
            Products
        },
        data(){
            return{
                currentComponent: null
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

    .active{
        border-color: white;
        color: white;
    }
</style>