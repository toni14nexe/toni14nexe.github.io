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
                        <tr v-bind:key="employee.id" v-for="employee in employees.data">
                            <div v-if="employee.role == 'waiter'" class="d-flex flex-row justify-content-between mx-4">
                                <td>{{employee.fullname}}</td>
                                <td>
                                    <button class="delete my-btn mx-2" @click="deleteEmployee(employee.id)">Delete</button>
                                </td>
                            </div>
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
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Password: </h3>
                        <input type="password" style="margin-left: 31px" v-model="waiterPassword[0]">
                    </div>
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Repeat: </h3>
                        <input type="password" style="margin-left: 60px" v-model="waiterPassword[1]">
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
                        <tr v-bind:key="employee.id" v-for="employee in employees.data">
                            <div v-if="employee.role == 'chef'" class="d-flex flex-row justify-content-between mx-4">
                                <td>{{employee.fullname}}</td>
                                <td>
                                    <button class="delete my-btn mx-2" @click="deleteEmployee(employee.id)">Delete</button>
                                </td>
                            </div>
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
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Password: </h3>
                        <input type="password" style="margin-left: 31px" v-model="chefPassword[0]">
                    </div>
                    <div class="d-flex flex-row mt-2 ml-1 justify-content-center">
                        <h3 class="small-title">Repeat: </h3>
                        <input type="password" style="margin-left: 60px" v-model="chefPassword[1]">
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

    <toast :text="toastText" :trigger="toastTriggerCounter"/>

</template>

<script>
    import sql from '../../assets/sql'
    import Toast from '../Toast.vue'
    import MD5 from "crypto-js/md5";
    import axios from 'axios'

    export default {
        components: {
            Toast
        },
        data(){
            return{
                waiterComponent: 'list',
                chefComponent: 'list',
                waiterFirstname: '',
                waiterLastname: '',
                waiterUsername: '',
                waiterPassword: [],
                chefFirstname: '',
                chefLastname: '',
                chefUsername: '',
                chefPassword: [],
                employees: [],
                toastText: '',
                toastTriggerCounter: 0
            }
        },
        mounted(){
            this.getEmployees()
        },
        methods:{
            async getEmployees(){
                this.employees = await axios.get('https://toni-web.com/thepurplehat/employees')
            },

            addWaiter(){
                if(this.waiterPassword[0].length < 5){
                    this.toastText = 'Too short password!'
                    this.toastTriggerCounter++
                }else if(this.waiterPassword[0] != this.waiterPassword[1]){
                    this.toastText = 'You entered different passwords!'
                    this.toastTriggerCounter++
                }else{
                    window.location = sql.AddEmployee() + '?role=waiter&password=' + MD5(this.waiterPassword[0])
                        + '&fname=' + this.waiterFirstname + '&lname=' + this.waiterLastname + '&username=' + this.waiterUsername
                }
            },

            addChef(){
                if(this.chefPassword[0].length < 5){
                    this.toastText = 'Too short password!'
                    this.toastTriggerCounter++
                }else if(this.chefPassword[0] != this.chefPassword[1]){
                    this.toastText = 'You entered different passwords!'
                    this.toastTriggerCounter++
                }else{
                    window.location = sql.AddEmployee() + '?role=chef&password=' + MD5(this.chefPassword[0])
                        + '&fname=' + this.chefFirstname + '&lname=' + this.chefLastname + '&username=' + this.chefUsername
                }
            },

            deleteEmployee(id){
                window.location = sql.DeleteEmployee() + '?id=' + id
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

    tr{
        border-top: 1px solid var(--gray);
    }
</style>