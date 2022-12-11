<template>
    <div class="d-flex flex-row justify-content-center mt-4">
        <h1 class="title title-admin" style="font-size: 2.5rem;">Tables</h1>
    </div>
    <div class="d-flex flex-row justify-content-center mt-2">
        <h3 class="a mx-3" @click="component = 'list'" :class="{active: component == 'list'}">List</h3>
        <div class="vl"></div>
        <h3 class="a mx-3" @click="component = 'add'" :class="{active: component == 'add'}">Add</h3>
        <div class="vl"></div>
        <h3 class="a mx-3" @click="component = 'remove'" :class="{active: component == 'remove'}">Remove</h3>
    </div>
    <div v-if="component == 'add'" class="mt-5">
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <h3 class="small-title">Are you sure you want to add new table?</h3>
        </div>
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <button class="delete my-btn mx-2" @click="closeTable">Close</button>
            <button class="my-btn mx-2" @click="addTable">Add</button>
        </div>
    </div>
    <div v-if="component == 'remove'" class="mt-5">
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <h3 class="small-title">Are you sure you want to remove one table?</h3>
        </div>
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <button class="my-btn mx-2" @click="closeTable">Close</button>
            <button class="delete my-btn mx-2" @click="deleteTable">Delete</button>
        </div>
    </div>
    <div v-if="component == 'list'" class="mt-5">
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <h3 class="small-title">Table list</h3>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                component: null
            }
        },
        methods:{
            closeTable(){
                this.component = null
                console.log('close')
            },

            addTable(){
                console.log('add')
            },

            deleteTable(){
                console.log('delete')
            }
        }
    }
</script>

<style scoped>
    .a:hover{
        cursor: pointer;
    }

    .my-btn{
        border-color: var(--purple);
        min-width: 150px;
        max-width: 150px;
    }

    .my-btn:hover{
        cursor: pointer;
    }

    .delete{
        border-color: red;
    }

    .delete:hover{
        background-color: red;
    }
</style>