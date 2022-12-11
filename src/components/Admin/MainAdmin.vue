<template>
    <div class="table-div mt-3 py-5">
        <div class="d-flex flex-row justify-content-center">
            <button class="my-btn mx-1" :class="{active: currentComponent == 'Products'}" @click="currentComponent='Products'">Products</button>
            <button class="my-btn mx-1" :class="{active: currentComponent == 'Tables'}" @click="currentComponent='Tables'">Tables</button>
            <button class="my-btn mx-1" :class="{active: currentComponent == 'Employees'}" @click="currentComponent='Employees'">Employees</button>
            <button class="my-btn mx-1" :class="{active: currentComponent == 'Orders'}" @click="currentComponent='Orders'">Orders</button>
            <button class="my-btn mx-1" :class="{active: currentComponent == 'Me'}" @click="currentComponent='Me'">Me</button>
        </div>

        <keep-alive>
            <component :is="currentComponent" class="mt-4 mb-4"></component>
        </keep-alive>

    </div>
</template>

<script>
    import Products from './Products.vue'
    import Tables from './Tables.vue'
    import Employees from './Employees.vue'
    import Me from './Me.vue'
    import Orders from './Orders.vue'

    export default {
        components:{
            Products,
            Tables,
            Employees,
            Me,
            Orders
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