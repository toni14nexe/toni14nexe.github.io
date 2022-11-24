<template>

    <div class="d-flex justify-content-center flex-column table-div">
        <h1 class="table-main-title" >Bill</h1>
        <div style="width: 100%">
            <table>
                <tr>
                    <th style="text-align: left; padding-left: 10px;">Name</th>
                    <th style="text-align: center; padding-right: 10px;">Sequence</th>
                    <th style="text-align: center; padding-right: 10px;">Quantity</th>
                    <th style="text-align: center;">Price</th>
                </tr>
                <tr v-for="item in APICart" style="padding-bottom: 40px">
                    <td style="text-align: left; padding-left: 10px;">{{item.name}}</td>
                    <td style="text-align: center; padding-right: 10px;">1-6</td>
                    <td style="text-align: center; padding-right: 10px;">{{item.quantity}}</td>
                    <td>{{(item.price*item.quantity).toFixed(2)}} €</td>
                </tr>
            </table>
            <table style="margin-top: 50px;">
                <tr style="background-color: var(--gray); margin-top: 50px;;">
                    <td></td><td></td>
                    <td style="text-align: right; padding-right: 10px;background-color: var(--gray); font-size: 1.9rem;">Total:</td>
                </tr>
                <tr style="background-color: var(--gray);">
                    <td></td><td></td>
                    <td style="text-align: right; padding-right: 10px;background-color: var(--gray); font-size: 1.8rem;">{{total.toFixed(2)}} €</td>
                </tr>
            </table>
        </div>
        <div style="height: 10px; background-color: white; z-index: 100;"/>
        <div v-if="subComponent == 'main'" class="d-flex">
            <button class="btn" @click="$emit('firstPage')" style="width: 250px;">Back to order</button>
            <button class="btn" style="width: 250px;" @click="subComponent = 'question'">Pay order</button>
        </div>
        <div v-if="subComponent == 'question'" style="text-align: center">
            <h3 class="small-title">Call waiter to pay order?</h3>
            <div class="d-flex">
                <button class="btn" @click="subComponent = 'main'" style="width: 250px;">No</button>
                <button class="btn" style="width: 250px;" @click="finishOrder()">Yes</button>
            </div>
        </div>
    </div>

    <toast :text="toastText" :trigger="toastTriggerCounter"/>

</template>

<script>
    import sql from '../../assets/sql.js'
    import Toast from '../Toast.vue'

    export default {
        props: ['APICart', 'table'],
        components:{Toast},
        data(){
            return{
                total: 0,
                subComponent: 'main',
                toastText: null,
                toastTriggerCounter: 0
            }
        },
        mounted(){
            this.getTotal()
        },
        methods:{
            getTotal(){
                for(var i=0; i<this.APICart.length; i++){
                    this.APICart[i].price = parseInt(this.APICart[i].price) 
                    this.APICart[i].quantity = parseInt(this.APICart[i].quantity)
                    this.total += (this.APICart[i].price * this.APICart[i].quantity)
                }
            },

            finishOrder(){
                if(this.APICart.length > 3){
                    this.toastText = 'ERR: Max number of items is 50!'
                    this.toastTriggerCounter++
                } else{
                    var order = '['
                    for(var i=0; i<this.APICart.length; i++){
                        if(this.APICart[i].type == 'alcohol'){
                            order += '{"i":"' + this.APICart[i].id + '","q":"' + (this.APICart[i].quantity * 0.03).toFixed(2) + '"}'
                        } else if(this.APICart[i].type == 'wine' && this.APICart[i].amount == '0.1l'){
                            order += '{"i":"' + this.APICart[i].id + '","q":"' + (this.APICart[i].quantity * 0.1).toFixed(2) + '"}'
                        } else{
                            order += '{"i":"' + this.APICart[i].id + '","q":"' + this.APICart[i].quantity + '"}'
                        }
                        if(i < this.APICart.length-1) order += ','
                    }
                    order += ']'

                    console.log(order)
                    console.log(sql.FinishOrder() + '?itemsNum=' + this.APICart.length + '&table=./tables/' + this.table + '&order=' + order)
                    //window.location = sql.finishOrder() + '?itemsNum=' + this.APICart.length + '&table=./tables/' + table + '&order=' + order
                }
            }
        }
    }
</script>

<style>
    .table-div{
        margin-top: 20px;
        padding-top: 20px;
    }

    .btn{
        border: solid 2px white;
        padding-bottom: 30px;
        border-radius: 30px;
        margin: 0 0 5px 10px;
        padding: 5px 15px 5px 15px;
        height: 35px;
    }

    .btn:hover{
        background-color: var(--purple);
    }

    tr:nth-child(even){
        background-color: var(--gray);
    }

    .remove-btn{
        margin-top: -6px;
    }
</style>