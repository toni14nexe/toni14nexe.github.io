<template>
    <div v-if="list.length == 0 || list == null" class="d-flex justify-content-center flex-column table-div">
            <h1 class="table-main-title" >Empty cart...</h1>
            <button class="btn" @click="$emit('firstPage')">Back to order</button>
    </div>
</template>

<script>
export default {
    props:['cart'],
    data(){
        return{
            list: []
        }
    },
    mounted(){
        if(this.cart)
            this.generateList()

        console.log(this.cart)
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
                    console.log(this.list)
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
        margin-top: 20px;
        border: solid 2px white;
        padding-bottom: 30px;
    }
</style>