<template>
    <div class="d-flex flex-row justify-content-center mt-4">
        <h1 class="title title-admin" style="font-size: 2.5rem;">Orders</h1>
    </div >
    <div class="d-flex flex-row justify-content-center mt-4">
        <table>
            <tr v-bind:key="order" v-for="order in orders"></tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import functions from '../../assets/functions'

    export default {
        data(){
            return{
                orders: []
            }
        },
        async mounted(){
            await axios.get('https://toni-web.com/thepurplehat/tables/tableNumber')
            .then((tableNumber) => {
                this.getOrders(tableNumber.data)
            })
            console.log(this.orders)
        },
        methods:{
            async getOrders(tableNumber){
                let j=0
                for(let i=1; i<=parseInt(tableNumber); i++){
                    await axios.get('https://toni-web.com/thepurplehat/tables/table' + i)
                    .then((result) => {
                        if(result.data.length > 3){
                            this.orders[j] = result.data
                            if(result.data.search('"waiter\":\"true\"') < 0){
                                this.totalOrders++
                            }
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
            }
        }
    }
</script>

<style scoped>

</style>