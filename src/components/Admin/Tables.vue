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
        <div v-if="tableNumber < 10">
            <div class="d-flex flex-row justify-content-center mb-5 text-center">
                <h3 class="small-title">Are you sure you want to add new table?</h3>
            </div>
            <div class="d-flex flex-row justify-content-center mb-5 text-center">
                <button class="delete my-btn mx-2" @click="closeTable">Close</button>
                <button class="my-btn mx-2" @click="addTable">Add</button>
            </div>
        </div>
        <div v-else class="d-flex flex-row justify-content-center mb-5 text-center">
            <h3 class="small-title">You reach your maximum table number!</h3>
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
        <div v-bind:key="number" v-for="number in tableNumber" 
            class="d-flex flex-row justify-content-center text-center"
        >
            <h3 class="small-title border-bottom pb-1">Table-{{ number }}</h3>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import sql from '../../assets/sql.js'

    export default {
        data(){
            return{
                component: null,
                tableNumber: null
            }
        },
        mounted(){
            this.getTableNumber()
        },
        methods:{
            async getTableNumber(){
                await axios.get('https://toni-web.com/thepurplehat/tables/tableNumber')
                .then((result) => {
                    this.tableNumber = result.data
                })
            },

            closeTable(){
                this.component = null
            },

            addTable(){
                let fullname = 'Table ' + (this.tableNumber + 1)
                let username = 'table' + (this.tableNumber + 1)
                let password = 'dba1350c0b190d36b28b2a1514ff0f31'
                let newTableNum = this.tableNumber + 1
                window.location = sql.AddTable() + '?username=' + username + '&password=' + password + '&fullname=' + fullname + '&newTableNum=' + newTableNum
            },

            deleteTable(){
                let username = 'table' + (this.tableNumber)
                let newTableNum = this.tableNumber - 1
                window.location = sql.DeleteTable() + '?username=' + username + '&newTableNum=' + newTableNum
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

    .border-bottom{
        border-bottom: 2px solid white;
    }
</style>