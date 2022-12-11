<template>
    <div class="d-flex flex-row justify-content-center mt-4">
        <h1 class="title title-admin" style="font-size: 2.5rem;">Employees</h1>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="d-flex flex-row justify-content-center mt-4">
                    <h3 class="small-title">Waiters:</h3>
                    <button class="my-btn mx-2" @click="waiterComponent = 'add'">Add new</button>
                </div>
                <div v-if="waiterComponent == 'list'">
                    <table class="mt-4">
                        <tr>
                            <td>Name Surname</td>
                            <td>
                                <button class="delete my-btn mx-2" @click="deleteWaiter">Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-if="waiterComponent == 'add'">
                    <div class="d-flex flex-row mt-4 justify-content-center">
                        <h3 class="small-title">First name: </h3>
                        <input class="ml-4" v-model="waiterFirstname">
                    </div>
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Last name: </h3>
                        <input class="ml-4" v-model="waiterLastname">
                    </div>
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Username: </h3>
                        <input class="ml-4" v-model="waiterUsername">
                    </div>
                    <div class="d-flex flex-row mt-4 ml-1 justify-content-center">
                        <button class="delete my-btn mx-2" @click="waiterComponent = 'list'">Close</button>
                        <button
                            :disabled="(!waiterFirstname.length || !waiterLastname.length || !waiterUsername.length)"
                            class="my-btn mx-2" 
                            @click="addWaiter"
                            >Add
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="d-flex flex-row justify-content-center mt-4">
                    <h3 class="small-title">Chefs:</h3>
                    <button class="my-btn mx-2" @click="chefComponent = 'add'">Add new</button>
                </div>
                <div v-if="chefComponent == 'list'">
                    <table class="mt-4">
                        <tr>
                            <td>Name Surname</td>
                            <td>
                                <button class="delete my-btn mx-2" @click="deleteChef">Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-if="chefComponent == 'add'">
                    <div class="d-flex flex-row mt-4 justify-content-center">
                        <h3 class="small-title">First name: </h3>
                        <input class="ml-4" v-model="chefFirstname">
                    </div>
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Last name: </h3>
                        <input class="ml-4" v-model="chefLastname">
                    </div>
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Username: </h3>
                        <input class="ml-4" v-model="chefUsername">
                    </div>
                    <div class="d-flex flex-row mt-4 ml-1 justify-content-center">
                        <button class="delete my-btn mx-2" @click="chefComponent = 'list'">Close</button>
                        <button
                            :disabled="(!chefFirstname.length || !chefLastname.length || !chefUsername.length)"
                            class="my-btn mx-2" 
                            @click="addChef"
                            >Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                waiterComponent: 'list',
                chefComponent: 'list',
                waiterFirstname: '',
                waiterLastname: '',
                waiterUsername: '',
                chefFirstname: '',
                chefLastname: '',
                chefUsername: ''
            }
        },
        methods:{
            addWaiter(){
                console.log('add waiter')
            },

            addChef(){
                console.log('add chef')
            },

            deleteWaiter(){
                console.log('delete waiter')
            },

            deleteChef(){
                console.log('delete chef')
            }
        }
    }
</script>

<style scoped>
    .my-btn{
        padding: 0px 5px 0px 5px;
    }

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

    button:disabled{
        color: var(--dark-gray);
    }
</style>