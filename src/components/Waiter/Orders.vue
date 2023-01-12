<template>
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <div>
        <div v-if="orders.length < 1" style="display: none">{{getOrders()}}</div>
        <div class="table-div mt-3 pb-5">
            <div class="d-flex flex-row justify-content-end">
                <h5 style="color: green" class="mr-1">Green</h5>
                <h5 style="color: white">- served</h5>
            </div>
            <div class="d-flex flex-row justify-content-end">
                <h5 style="color: red" class="mr-1">Red</h5>
                <h5 style="color: white">- not served</h5>
            </div>
            <div class="d-flex flex-row justify-content-end mt-4">
                <h3 class="notification">Waiter: {{fullname}}</h3>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="d-flex flex-row justify-content-center">
                            <h1 class="table-main-title" >Waiting to pay: {{totalOrdersForPayment}}</h1>
                        </div>
                        <div v-for="order in orders" >
                            <div v-if="(order[0].payment)" class="order-div pt-2 pl-3 pr-3 pb-3">
                                <div class="d-flex flex-row justify-content-between">
                                    <h4>{{order[0].tableName}}</h4>
                                    <h4>{{order[0].time}}</h4>
                                </div>
                                <table>
                                    <tr>
                                        <th style="text-align: left; padding-left: 10px;">Name</th>
                                        <th style="text-align: center; padding-right: 10px;">Sequence</th>
                                        <th style="text-align: center; padding-right: 10px;">Quantity</th>
                                    </tr>
                                    <tr v-for="item in order">
                                        <td v-if="item.type == 'drink'" style="text-align: left; padding-left: 10px;">{{item.name}}</td>
                                        <td v-if="item.type == 'drink'" style="text-align: center; padding-right: 10px;">{{item.sequence}}</td>
                                        <td v-if="item.type == 'drink'" style="text-align: center; padding-right: 10px;">{{item.quantity}}</td>
                                    </tr>
                                </table>
                                <div v-if="component == 'main'" class="d-flex flex-row justify-content-center mt-3">
                                    <button class="normal btn my-btn" @click="component = `finish-${order[0].fileTableName}`">Paid</button>
                                </div>
                                <div v-else-if="component == `finish-${order[0].fileTableName}`">
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <h3 class="small-title mt-2" style="font-weight: 600">Paid order?</h3>
                                    </div>
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <button class="cancel normal btn my-btn" @click="component = 'main'">No</button>
                                        <button class="normal btn my-btn" @click="paidTable(order[0].fileTableName)">Yes</button>
                                    </div>
                                </div>
                                <div v-else-if="component == `cancel-${order[0].fileTableName}`">
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <h3 class="small-title mt-2" style="font-weight: 600">Cancel order?</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="d-flex flex-row justify-content-center">
                            <h1 class="table-main-title" >Orders: {{totalOrders - totalOrdersForPayment}}</h1>
                        </div>
                        <div v-for="order in orders" >
                            <div v-if="(!order[0].payment)" class="order-div pt-2 pl-3 pr-3 pb-3" :class="{done: order[0].waiter, not_done: !order[0].waiter}">
                                <div class="d-flex flex-row justify-content-between">
                                    <h4>{{order[0].tableName}}</h4>
                                    <h4>{{order[0].time}}</h4>
                                </div>
                                <table>
                                    <tr>
                                        <th style="text-align: left; padding-left: 10px;">Name</th>
                                        <th style="text-align: center; padding-right: 10px;">Sequence</th>
                                        <th style="text-align: center; padding-right: 10px;">Quantity</th>
                                    </tr>
                                    <tr v-for="item in order">
                                        <td v-if="item.type == 'drink'" style="text-align: left; padding-left: 10px;">{{item.name}}</td>
                                        <td v-if="item.type == 'drink'" style="text-align: center; padding-right: 10px;">{{item.sequence}}</td>
                                        <td v-if="item.type == 'drink'" style="text-align: center; padding-right: 10px;">{{item.quantity}}</td>
                                    </tr>
                                </table>
                                <div v-if="component == 'main'" class="d-flex flex-row justify-content-center mt-3">
                                    <button class="cancel normal btn my-btn" @click="component = `cancel-${order[0].fileTableName}`">Cancel</button>
                                    <button v-if="!order[0].waiter" class="normal btn my-btn" @click="component = `finish-${order[0].fileTableName}`">Finish</button>
                                </div>
                                <div v-else-if="component == `finish-${order[0].fileTableName}`">
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <h3 class="small-title mt-2" style="font-weight: 600">Finish order?</h3>
                                    </div>
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <button class="cancel normal btn my-btn" @click="component = 'main'">No</button>
                                        <button class="normal btn my-btn" @click="finishOrder(order[0].fileTableName)">Yes</button>
                                    </div>
                                </div>
                                <div v-else-if="component == `cancel-${order[0].fileTableName}`">
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <h3 class="small-title mt-2" style="font-weight: 600">Cancel order?</h3>
                                    </div>
                                    <div class="d-flex flex-row justify-content-center mt-3">
                                        <button class="normal btn my-btn" @click="component = 'main'">No</button>
                                        <button class="cancel normal btn my-btn" @click="cancelOrder(order[0].fileTableName)">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios'
    import functions from '../../assets/functions'
    import sql from '../../assets/sql.js'

    export default {
        props:['fullname', 'tableNumber'],
        data(){
            return{
                orders: [],
                component: 'main',
                totalOrders: 0,
                totalOrdersForPayment: 0
            }
        },
        created() {
            setInterval(() => this.getOrders(), 10000);
        },
        methods:{
            async getOrders(){
                this.totalOrders = 0
                let j=0
                for(let i=1; i<=this.tableNumber; i++){
                    await axios.get('https://toni-web.com/thepurplehat/tables/table' + i)
                    .then((result) => {
                        if(result.data.length>0){
                            this.orders[j] = result.data
                            this.totalOrders++
                            this.orders[j] = JSON.parse(this.orders[j])
                            if(result.data.search('\"type\":\"food\"') < 0){
                                this.orders[j][0].chef = true
                            }
                            this.orders[j][0].tableName = 'Table-' + i
                            this.orders[j][0].fileTableName = 'table' + i
                            this.orders[j][0].timestamp = parseInt(this.orders[j][0].time) * 1000
                            this.orders[j][0].time = functions.getDateFromTimestamp(this.orders[j][0].timestamp)
                            this.orders[j][0].empty = true
                            if((this.orders[j][0].payment)){
                                this.totalOrdersForPayment++
                            }
                            j++
                        }
                    })
                }
            },

            finishOrder(fileTableName){
                window.location = sql.WaiterFinish() + '?table=' + fileTableName
            },

            cancelOrder(fileTableName){
                window.location = sql.WaiterCancel() + '?table=' + fileTableName
            },

            paidTable(fileTableName){
                window.location = sql.PaidOrder() + '?table=' + fileTableName
            }
        }
    }
</script>

<style scoped>
    .normal{
        border-color:  var(--gray);
        min-width: 13%;
        border-color: var(--purple);
        margin: 0 1% 0 1%;
    }

    .cancel{
        border-color: red;
    }

    .cancel:hover{
        background-color: red;
    }

    .done{
        border-color: green;
    }

    .not_done{
        border-color: red;
    }
</style>