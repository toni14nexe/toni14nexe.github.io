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
                    <th style="text-align: right">Quantity</th>
                    <th style="text-align: right; padding-right: 10px;">Price</th>
                    <th style="text-align: right; padding-right: 10px;"></th>
                </tr>
                <tr v-for="item in list" style="padding-bottom: 40px">
                    <td style="text-align: left; padding-left: 10px;">{{item.name}}</td>
                    <td style="text-align: right; padding-right: 10px;">{{item.quantity}}</td>
                    <td style="text-align: right; padding-right: 10px;">{{(item.price*item.quantity).toFixed(2)}} €</td>
                    <td style="text-align: right; padding-right: 10px;">
                        <button class="btn btn-outline-light" @click="removeFromCart(item.name)" style="margin-top: 3px;">
                            <img src="../../assets/images/removeFromCart.png">
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
        <div class="d-flex">
            <button class="btn" @click="$emit('firstPage')" style="width: 250px;">Back to order</button>
            <button class="btn" style="width: 250px;">Proceed to payment</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['cart'],
    data(){
        return{
            list: [],
            total: 0
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
                    this.list[j] = {
                        id: i,
                        name: this.cart[i].name,
                        price: this.cart[i].price,
                        quantity: this.cart[i].quantity,
                        model: this.cart[i].model,
                        inStock: this.cart[i].inStock
                    }
                    j++
                    this.total += this.cart[i].quantity * this.cart[i].price
                }
            }
        },

        removeFromCart(name){
            var id = this.list.indexOf(name)
            var removed = this.list.splice(id, 1)
            this.total -= removed[0].quantity * removed[0].price
            console.log(removed)
            
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
        margin-top: 20px;
        border: solid 2px white;
        padding-bottom: 30px;
        border-radius: 30px;
    }

    .btn:hover{
        background-color: var(--purple);
    }

    tr:nth-child(even){
        background-color: var(--gray);
    }
</style>