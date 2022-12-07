<template>
    <div v-if="list.length == 0 || list == null" class="d-flex justify-content-center flex-column table-div">
            <h1 class="table-main-title" >Empty cart...</h1>
            <button class="btn" @click="$emit('firstPage')">Back to order</button>
    </div>

    <div v-else class="d-flex justify-content-center flex-column table-div">
        <h1 class="table-main-title" >Cart</h1>
        <div style="width: 100%">
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
                    <td style="text-align: right; padding-right: 10px;background-color: var(--gray); font-size: 1.9rem; font-weight: 600;">Total:</td>
                </tr>
                <tr style="background-color: var(--gray);">
                    <td></td><td></td>
                    <td style="text-align: right; padding-right: 10px;background-color: var(--gray); font-size: 1.8rem; font-weight: 600;">{{total.toFixed(2)}} €</td>
                </tr>
            </table>
        </div>
        <div style="height: 10px; background-color: white; z-index: 100;"/>
        <div v-if="subComponent == 'main'" class="d-flex">
            <button v-if="allowShopping" class="btn" @click="$emit('firstPage')" style="width: 250px;">Back to order</button>
            <button v-if="allowShopping" class="btn" style="width: 250px;" @click="subComponent = 'question'">Place order</button>
            <h3 v-if="!allowShopping" style="color: white">Can't order while waiting payment!</h3>
        </div>
        <div v-if="subComponent == 'question'" style="text-align: center">
            <h3 class="small-title" style="font-weight: 600">Enter order code:</h3>
            <div class="d-flex justify-content-center">
                <input type="number" v-model="genNum" class="mb-3 text-center" style="width: 250px;" />
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn" style="width: 100px;" @click="placeOrder(table)">OK</button>
            </div>
        </div>
    </div>

    <toast :text="toastText" :trigger="toastTriggerCounter"/>

</template>

<script>
import Toast from '../Toast.vue'
import sql from '../../assets/sql.js'

export default {
    props:['cart', 'table', 'APICart'],
    components: {Toast},
    data(){
        return{
            list: [],
            total: 0,
            totalQuantity: null,
            subComponent: 'main',
            toastText: null,
            toastTriggerCounter: 0,
            allowShopping: true,
            genNum: null
        }
    },
    mounted(){
        if(this.cart)
            this.generateList()
        if(this.APICart.length == 0){
            this.allowShopping = true
        }
        else{
            if(this.APICart[0].payment == 'true'){
                this.allowShopping = false
            }
        }
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
            if(this.genNum < 1000 || this.genNum > 9999){
                this.toastText = 'Wrong order code!'
                this.toastTriggerCounter++
            }else{
                var found = false
                if(this.APICart.length > 0){
                    var APICartLength = this.APICart.length
                    for(var j=0; j<this.list.length; j++){
                        found = false
                        for(var i=0; i<this.APICart.length; i++){
                            this.APICart[i].quantity = parseInt(this.APICart[i].quantity)
                            if(this.APICart[i].id == this.list[j].id){
                                this.APICart[i].quantity += this.list[j].quantity
                                found = true
                            }
                        }
                        if(found == false){
                            this.APICart[APICartLength] = {
                                id: this.list[j].id,
                                name: this.list[j].name,
                                price: this.list[j].price,
                                quantity: this.list[j].quantity,
                                sequence: this.list[j].sequence
                            }
                            found = false
                            APICartLength++
                        }
                    }
                }
                if(this.APICart.length > 50){
                    this.toastTriggerCounter++
                    this.toastText = 'ERR: Large bill! First pay please!'
                } else{
                    if(this.APICart.length > 0){
                        var order = '['
                        for(var i=0; i<this.APICart.length; i++){
                            //to send quantity for alcohol like 0.03 & for wine like 0.1
                            /*if(this.list[i].type == 'alcohol'){
                                order += '{"i":"' + this.list[i].id + '","q":"' + (this.list[i].quantity * 0.03).toFixed(2) + '","s":"' + this.list[i].sequence + '"}'
                            } else if(this.list[i].type == 'wine' && this.list[i].amount == '0.1l'){
                                order += '{"i":"' + this.list[i].id + '","q":"' + (this.list[i].quantity * 0.1).toFixed(2) + '","s":"' + this.list[i].sequence + '"}'
                            } else{*/
                            order += '{"i":"' + this.APICart[i].id + '","q":"' + this.APICart[i].quantity + '","s":"' + this.APICart[i].sequence + '"}'
                            //}
                            if(i < this.APICart.length-1) order += ','
                        }
                        order += ']'
                        window.location = sql.PlaceOrder() + '?itemsNum=' + this.APICart.length + '&table=./tables/' + table + '&order=' + order + '&genNum=' + this.genNum
                    }else{
                        var order = '['
                        for(var i=0; i<this.list.length; i++){
                            order += '{"i":"' + this.list[i].id + '","q":"' + this.list[i].quantity + '","s":"' + this.list[i].sequence + '"}'
                            if(i < this.list.length-1) order += ','
                        }
                        order += ']'
                        window.location = sql.PlaceOrder() + '?itemsNum=' + this.list.length + '&table=./tables/' + table + '&order=' + order + '&genNum=' + this.genNum
                    }
                }
            }
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
        padding: 5px 15px 30px 15px;
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

    input{
        color: var(--gray);
        height: 2.2rem;
        border-radius: 50px;
        max-width: 150px;
    }

    input:focus{
        border-color: var(--gray);
    }
</style>