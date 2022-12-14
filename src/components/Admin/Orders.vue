<template>
    <div class="d-flex flex-row justify-content-center mt-4">
        <h1 class="title title-admin" style="font-size: 2.5rem;">Orders</h1>
    </div >
    <div class="d-flex flex-row justify-content-center mt-4">
        <h3 class="small-title pink-color">Active/Finished orders: </h3>
    </div>
    <div class="d-flex flex-row justify-content-center mt-1">
        <select v-model="ordersSelect" @change="ordersSelected" class="ml-4">
            <option value="active" class="text-center">Active orders</option>
            <option value="finished" class="text-center">Finished orders</option>
        </select>
    </div>
    <div class="d-flex flex-row justify-content-center mt-5">
        <table>
            <tr v-if="orders.length">
                <td class="pink-color">Table</td>
                <td class="pink-color">Time</td>
                <td class="pink-color">Total</td>
            </tr>
            <tr v-bind:key="orderCounter" v-for="order in orders">
                <td>{{order[0].tableName}}</td>
                <td>{{order[0].time}}</td>
                <td>{{order[0].total}} €</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import functions from '../../assets/functions'

    export default {
        data(){
            return{
                orders: [],
                ordersSelect: null,
                tableNumber: null
            }
        },
        mounted(){
            this.getTableNumber()
        },
        methods:{
            async getTableNumber(){
                this.tableNumber = await axios.get('https://toni-web.com/thepurplehat/tables/tableNumber')
            },

            ordersSelected(){
                if(this.ordersSelect == 'active'){
                    this.getOrders()
                } else{
                    this.getFinishedOrders()
                }
            },

            async getOrders(){
                this.orders = []
                let j=0
                for(let i=1; i<=parseInt(this.tableNumber.data); i++){
                    await axios.get('https://toni-web.com/thepurplehat/tables/table' + i)
                    .then((result) => {
                        if(result.data.length > 3){
                            this.orders[j] = result.data
                            this.orders[j] = JSON.parse(this.orders[j])
                            this.orders[j][0].tableName = 'Table-' + i
                            this.orders[j][0].fileTableName = 'table' + i
                            this.orders[j][0].timestamp = parseInt(this.orders[j][0].time) * 1000
                            this.orders[j][0].time = functions.getDateFromTimestamp(this.orders[j][0].timestamp)
                            this.orders[j][0].empty = true
                            this.orders[j][0].total = 0
                            if((this.orders[j][0].payment)){
                                this.totalOrdersForPayment++
                            }
                            j++
                        }
                    })
                }
                this.orders.forEach(order => {
                    order.forEach(item => {
                        order[0].total += (item.price * item.quantity)
                    });
                });
            },

            async getFinishedOrders(){
                this.orders = []
                let i = 0
                await axios.get('https://toni-web.com/thepurplehat/tables/allOrders')
                    .then((result) => {
                        this.orders = result.data
                        if(result.data.length > 0){
                            this.orders.forEach(order => {
                                let total = 0
                                this.orders[i] = JSON.parse(order)
                                this.orders[i].forEach(item => {
                                    total += parseInt(item.quantity) * parseInt(item.price)
                                });
                                this.orders[i][0].total = total
                                this.orders[i][0].tableName = 'T' + this.orders[i][0].tableName.substring(1, 5) + '-' 
                                    + this.orders[i][0].tableName.substring(5, this.orders[i][0].tableName.length)
                                    this.orders[i][0].timestamp = this.orders[i][0].time*1000
                                this.orders[i][0].time = functions.getDateFromTimestamp(parseInt(this.orders[i][0].time*1000))
                                i++
                            });
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .a:hover{
        cursor: pointer;
    }

    input{
        border-radius: 50px;
        min-width: 250px;
    }

    select{
        border-radius: 50px;
        min-width: 250px;
        height: 35px;
        color: var(--dark-gray);
    }

    input{
        text-align: center;
    }

    .pink-color{
        color: var(--pink)
    }

    .btn{
        border: 1px var(--purple) solid;
        min-width: 150px;
    }

    .btn:hover{
        border: 1px var(--pink) solid;
    }
</style>