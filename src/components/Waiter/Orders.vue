<template>
    <div>
        
        <div v-if="orders.length < 1" style="display: none">{{getOrders()}}</div>
        <div class="table-div mt-3 pb-5">
            <div class="d-flex flex-row justify-content-end">
                <h3 class="notification">Waiter: {{fullname}}</h3>
            </div>
            <div class="d-flex flex-row justify-content-center">
                <h1 class="table-main-title" >Orders</h1>
            </div>
            <div v-for="order in orders" >
                <div v-if="!order[0].waiter" class="order-div pt-2 pl-3 pr-3 pb-3">
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
                        <button class="cancel normal btn my-btn" @click="component = 'cancel'">Cancel</button>
                        <button class="normal btn my-btn" @click="component = 'finish'">Finish</button>
                    </div>
                    <div v-else-if="component == 'finish'">
                        <div class="d-flex flex-row justify-content-center mt-3">
                            <h3 class="small-title mt-2" style="font-weight: 600">Finish order?</h3>
                        </div>
                        <div class="d-flex flex-row justify-content-center mt-3">
                            <button class="cancel normal btn my-btn" @click="component = 'main'">No</button>
                            <button class="normal btn my-btn" @click="finishOrder(order[0].fileTableName)">Yes</button>
                        </div>
                    </div>
                    <div v-else-if="component == 'cancel'">
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
                component: 'main'
            }
        },
        methods:{
            async getOrders(){
                for(let i=1; i<=this.tableNumber; i++){
                    await axios.get('https://toni-web.com/thepurplehat/tables/table' + i)
                    .then((result) => {
                        this.orders[i-1] = result.data
                        this.orders[i-1] = JSON.parse(this.orders[i-1])
                        this.orders[i-1][0].tableName = 'Table-' + i
                        this.orders[i-1][0].fileTableName = 'table' + i
                        this.orders[i-1][0].timestamp = parseInt(this.orders[i-1][0].time) * 1000
                        this.orders[i-1][0].time = functions.getDateFromTimestamp(this.orders[i-1][0].timestamp)
                    })
                }
            },

            finishOrder(fileTableName){
                console.log('finish')
                //window.location = sql.WaiterFinish() + '?table=' + fileTableName
            },

            cancelOrder(fileTableName){
                console.log('cancel')
                //window.location = sql.WaiterCancel() + '?table=' + fileTableName
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
</style>