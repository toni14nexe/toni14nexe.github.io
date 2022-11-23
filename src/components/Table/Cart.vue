<template>
    <div v-if="list.length == 0 || list == null" class="d-flex justify-content-center flex-column table-div">
            <h1 class="table-main-title" >Empty cart...</h1>
            <button class="btn" @click="$emit('firstPage')">Back to order</button>
    </div>

    <div v-else class="d-flex justify-content-center flex-column table-div">
        <h1 class="table-main-title" >Cart</h1>
        <div style="width: 100%">
            {{item}}
            <table>
                <tr>
                    <th style="text-align: left; padding-left: 10px;">Name</th>
                    <th style="text-align: center; padding-right: 10px;">Quantity</th>
                    <th style="text-align: center; padding-right: 10px;">Price</th>
                    <th style="text-align: center;">Sequence</th>
                    <th></th>
                </tr>
                <tr v-for="item in list" style="padding-bottom: 40px">
                    <td style="text-align: left; padding-left: 10px;">{{item.name}}</td>
                    <td style="text-align: center; padding-right: 10px;">{{item.quantity}}</td>
                    <td style="text-align: center; padding-right: 10px;">{{(item.price*item.quantity).toFixed(2)}} €</td>
                    <td>
                        <select :id=item.name @change="changeSequence(item.name)">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </td>
                    <td style="text-align: right; padding-right: 10px;">
                        <button class="btn btn-outline-light" @click="removeFromCart(item.id)" style="margin-top: 3px;">
                            <img class="remove-btn" src="../../assets/images/removeFromCart.png">
                        </button>
                    </td>
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
            <button class="btn" style="width: 250px;" @click="subComponent = 'question'">Place order</button>
        </div>
        <div v-if="subComponent == 'question'" style="text-align: center">
            <h3 class="small-title">Place order?</h3>
            <div class="d-flex">
                <button class="btn" @click="subComponent = 'main'" style="width: 250px;">No</button>
                <button class="btn" style="width: 250px;" @click="placeOrder(table)">Yes</button>
            </div>
        </div>
    </div>

    <toast :text="toastText" :trigger="toastTriggerCounter"/>

</template>

<script>
import Toast from '../Toast.vue'
import sql from '../../assets/sql.js'
import axios from 'axios'

export default {
    props:['cart', 'table'],
    components: {Toast},
    data(){
        return{
            list: [],
            total: 0,
            totalQuantity: null,
            subComponent: 'main',
            toastTriggerCounter: 0,
            toastText: null
        }
    },
    mounted(){
        if(this.cart)
            this.generateList()
    },
    methods:{
        generateList(){
            var j=0
            for(var i=0; i<this.cart.length; i++){
                if(this.cart[i] && this.cart[i].quantity > 0){
                    if(this.cart[i].amount == '0.1l' && this.cart[i].type == 'wine'){
                        this.list[j] = {
                            id: i,
                            name: this.cart[i].name,
                            price: this.cart[i].price,
                            quantity: this.cart[i].quantity,
                            inStock: this.cart[i].inStock,
                            sequence: 1,
                            type: this.cart[i].type,
                            amount: this.cart[i].amount
                        }
                    } else{
                        this.list[j] = {
                            id: i,
                            name: this.cart[i].name,
                            price: this.cart[i].price,
                            quantity: this.cart[i].quantity,
                            inStock: this.cart[i].inStock,
                            sequence: 1,
                            type: this.cart[i].type
                        }
                    }
                    j++
                    this.total += this.cart[i].quantity * this.cart[i].price
                    this.totalQuantity += this.cart[i].quantity
                }
            }
        },

        removeFromCart(databaseId){
            var i = null
            for(i=0; i<this.list.length; i++){
                if(this.list[i].id == databaseId){
                    break
                }
            }
            var removed = this.list.splice(i, 1)
            this.total -= removed[0].quantity * removed[0].price
            this.totalQuantity -= removed[0].quantity
            this.cart[removed[0].id].quantity = 0
        },

        changeSequence(name){
            var id = null
            for(var i=0; i<this.list.length; i++){
                if(this.list[i].name == name){
                    this.list[i].sequence = parseInt(document.getElementById(this.list[i].name).value)
                    break
                }
            }
        },

        async placeOrder(table){
            if(this.list.length > 50){
                this.toastTriggerCounter++
                this.toastText = 'ERR: Max number of items is 50!'
            } else{
                var order = '['
                for(var i=0; i<this.list.length; i++){
                    if(this.list[i].type == 'alcohol'){
                        order += '{"i":"' + this.list[i].id + '","q":"' + (this.list[i].quantity * 0.03).toFixed(2) + '"}'
                    } else if(this.list[i].type == 'wine' && this.list[i].amount == '0.1l'){
                        order += '{"i":"' + this.list[i].id + '","q":"' + (this.list[i].quantity * 0.1).toFixed(2) + '"}'
                    } else{
                        order += '{"i":"' + this.list[i].id + '","q":"' + this.list[i].quantity + '"}'
                    }
                    if(i < this.list.length-1) order += ','
                }
                order += ']'
            }
            window.location = sql.PlaceOrder() + '?itemsNum=' + this.list.length + '&table=./tables/' + table + '&order=' + order
        }
    }
}
</script>

<style scoped>
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