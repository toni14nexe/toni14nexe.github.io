<template>
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <div >
        <div class="table-div">
            <div v-bind:key="mainType.id" v-for="mainType in mainTypes" style="padding-bottom: 40px">
                <p v-if="mainType.exist == true" class="table-main-title">{{mainType.name}}</p>
                <div class="row">
                    <div v-if="mainType.name == 'Drinks' && mainType.exist == true" v-for="subType in drinksTypes" class="col-sm">
                        <img @click="scrollTo(subType.type)" v-if="subType.type == 'hot'" class="product-img" src="../assets/images/hot.jpeg">
                        <img @click="scrollTo(subType.type)" v-else-if="subType.type == 'juice'" class="product-img" src="../assets/images/juice.jpeg">
                        <img @click="scrollTo(subType.type)" v-else-if="subType.type == 'beer'" class="product-img" src="../assets/images/beer.jpeg">
                        <img @click="scrollTo(subType.type)" v-else-if="subType.type == 'wine'" class="product-img" src="../assets/images/wine.jpeg">
                        <img @click="scrollTo(subType.type)" v-else class="product-img" src="../assets/images/alcohol.jpeg">
                    </div>
                </div>
                <div class="row">
                    <div v-if="mainType.name == 'Food' && mainType.exist == true" v-for="subType in foodTypes" class="col-sm">
                        <img @click="scrollTo(subType.type)" v-if="subType.type == 'soup'" class="product-img" src="../assets/images/soup.jpeg">
                        <img @click="scrollTo(subType.type)" v-else-if="subType.type == 'pizza'" class="product-img" src="../assets/images/pizza.jpeg">
                        <img @click="scrollTo(subType.type)" v-else-if="subType.type == 'grill'" class="product-img" src="../assets/images/grill.jpeg">
                        <img @click="scrollTo(subType.type)" v-else-if="subType.type == 'dish'" class="product-img" src="../assets/images/dish.jpeg">
                        <img @click="scrollTo(subType.type)" v-else class="product-img" src="../assets/images/dessert.jpeg">
                    </div>
                </div>
            </div>
        </div>

        <div  v-bind:key="mainType.id" v-for="mainType in mainTypes" :id=mainType.type class="table-div">
            <p v-if="mainType.exist == true" class="table-main-title">{{mainType.name}}</p>
            <div v-if="mainType.name == 'Drinks' && mainType.exist == true" v-for="subType in drinksTypes" :id="subType.type" :ref="subType.type">
                <p class="table-title">{{subType.name}}</p>
                <div class="d-flex justify-content-center">
                    <table v-if="subType.exist == true">
                        <tr>
                            <th style="text-align: left; padding-left: 10px;">Name</th>
                            <th>Amount</th>
                            <th style="text-align: right; padding-right: 10px;">Price</th>
                            <th style="max-width: fit-content;"></th>
                        </tr>
                        <tr  v-bind:key="product.id" v-for="product in productsList.data">
                            <td v-if="subType.type == product.type" style="text-align: left;">{{product.name}}</td>
                            <td v-if="subType.type == product.type">{{product.description}}</td>
                            <td v-if="subType.type == product.type" style="text-align: right;">{{(product.price)}} €</td>
                            <td style="text-align: right; max-width: fit-content;" v-if="subType.type == product.type && role== 'table'">
                                <input type="number" max="20" min="1" v-model="cart[product.id].model" class="num-input" />
                                <button class="btn btn-outline-light" @click="addToCart(product.id)">
                                    <img src="../assets/images/addToCart.png">
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-if="mainType.name == 'Food' && mainType.exist == true" v-for="subType in foodTypes"  :id="subType.type">
                <p v-if="subType.exist == true" class="table-title">{{subType.name}}</p>
                <div v-if="subType.exist == true" class="d-flex justify-content-center">
                    <table>
                        <tr>
                            <th style="text-align: left; padding-left: 10px;">Name</th>
                            <th style="text-align: left;">Ingredients</th>
                            <th style="text-align: right;  padding-right: 10px;">Price</th>
                            <th style="max-width: fit-content;"></th>
                        </tr>
                        <tr  v-bind:key="product.id" v-for="product in productsList.data">
                            <td v-if="subType.type == product.type" style="text-align: left;">{{product.name}}</td>
                            <td v-if="subType.type == product.type" style="text-align: left;">{{product.description}}</td>
                            <td v-if="subType.type == product.type" style="text-align: right;">{{product.price}} €</td>
                            <td style="text-align: right; max-width: fit-content;" v-if="subType.type == product.type && role== 'table'">
                                <input type="number" v-model="cart[product.id].model" class="num-input" />
                                <button class="btn btn-outline-light" @click="addToCart(product.id)">
                                    <img src="../assets/images/addToCart.png">
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <toast :text="toastText" :trigger="toastTriggerCounter"/>

</template>

<script>
    import axios from 'axios'
    import Toast from './Toast.vue'
    export default{
        components: {
            Toast
        },
        props: ['role'],
        data(){
            return{
                mainTypes: {
                    drinks: {
                        name: 'Drinks',
                        exist: false,
                        type: 'drinks'
                    },
                    food: {
                        name: 'Food',
                        exist: false,
                        type: 'food'
                    }
                },
                drinksTypes: {
                    hot: {
                        name: 'Hot drinks',
                        exist: false,
                        type: 'hot'
                    },
                    juice: {
                        name: 'Juices',
                        exist: false,
                        type: 'juice'
                    },
                    beer: {
                        name: 'Beers',
                        exist: false,
                        type: 'beer'
                    },
                    wine: {
                        name: 'Wines',
                        exist: false,
                        type: 'wine'
                    },
                    alcohol: {
                        name: 'Alcohol drinks',
                        exist: false,
                        type: 'alcohol'
                    }
                },
                foodTypes: {
                    soup: {
                        name: 'Soups',
                        exist: false,
                        type: 'soup'
                    },
                    pizza: {
                        name: 'Pizza',
                        exist: false,
                        type: 'pizza'
                    },
                    grill: {
                        name: 'Grill',
                        exist: false,
                        type: 'grill'
                    },
                    dish: {
                        name: 'Side dishes',
                        exist: false,
                        type: 'dish'
                    },
                    dessert: {
                        name: 'Desserts',
                        exist: false,
                        type: 'dessert'
                    }
                },
                productsList: null,
                imageUrl: ['/src/assets/images/', '.jpeg'],
                cart: [],
                toastText: 'Added to cart!',
                toastTriggerCounter: 0
            }
        },
        async mounted(){
            this.productsList = await axios.get('https://toni-web.com/thepurplehat/api')
            this.getProductsList()
            this.productsList = await axios.get('https://toni-web.com/thepurplehat/api')
        },
        methods:{
            getProductsList(){
                var j = 0
                for(var i=0; i<this.productsList.data.length; i++){
                    if(this.productsList.data[i].mainType == 'drink'){
                        this.cart[this.productsList.data[i].id] = {
                            name : this.productsList.data[i].name,
                            price: this.productsList.data[i].price,
                            inStock: this.productsList.data[i].inStock,
                            quantity: 0,
                            model: 1,
                            type: this.productsList.data[i].type,
                            amount: this.productsList.data[i].description
                        }

                        if(this.mainTypes.drinks.exist == false){
                            this.mainTypes.drinks.exist = true
                        }
                        if(this.productsList.data[i].type == 'hot'){
                            if(this.drinksTypes.hot.exist == false){
                                this.drinksTypes.hot.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'juice'){
                            if(this.drinksTypes.juice.exist == false){
                                this.drinksTypes.juice.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'beer'){
                            if(this.drinksTypes.beer.exist == false){
                                this.drinksTypes.beer.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'wine'){
                            if(this.drinksTypes.wine.exist == false){
                                this.drinksTypes.wine.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'alcohol'){
                            if(this.drinksTypes.alcohol.exist == false){
                                this.drinksTypes.alcohol.exist = true
                                continue
                            }
                            continue
                        }
                    } else{
                        this.cart[this.productsList.data[i].id] = {
                            name : this.productsList.data[i].name,
                            price: this.productsList.data[i].price,
                            inStock: this.productsList.data[i].inStock,
                            quantity: 0,
                            model: 1,
                            type: this.productsList.data[i].type
                        }

                        if(this.mainTypes.food.exist == false){
                            this.mainTypes.food.exist = true
                        }
                        if(this.productsList.data[i].type == 'soup'){
                            if(this.foodTypes.soup.exist == false){
                                this.foodTypes.soup.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'pizza'){
                            if(this.foodTypes.pizza.exist == false){
                                this.foodTypes.pizza.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'grill'){
                            if(this.foodTypes.grill.exist == false){
                                this.foodTypes.grill.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'dish'){
                            if(this.foodTypes.dish.exist == false){
                                this.foodTypes.dish.exist = true
                                continue
                            }
                            continue
                        }
                        else if(this.productsList.data[i].type == 'dessert'){
                            if(this.foodTypes.dessert.exist == false){
                                this.foodTypes.dessert.exist = true
                                continue
                            }
                            continue
                        }
                    } 
                }
            },

            scrollTo(element){
                document.getElementById(element).scrollIntoView({behavior: "smooth"});
            },

            addToCart(id){
                if(this.cart[id].model <= this.cart[id].inStock){
                    this.cart[id].quantity += this.cart[id].model
                    this.cart[id].inStock -= this.cart[id].model
                    this.cart[id].model = 1
                }
                this.$emit('cartEmit', this.cart)
                this.toastTriggerCounter ++
            }
        }
    }
</script>

<style scoped>
    .product-img{
        width: 100%;
        height: 98%;
        border-radius: 20px;
        border: solid 2px white;
    }

    .product-img:hover{
        transition: 0.2s ease-in;
        height: 100%;
        border: solid 2px var(--dark-gray);
        cursor: pointer;
    }

    .num-input{
        max-width: 50px;
        color: var(--dark-gray);
        text-align: center;
        border-radius: 5px;
    }

    .btn{
        margin: 0 0 5px 10px;
        padding: 5px 15px 5px 15px;
        height: 35px;
    }

    .btn:hover{
        background-color: var(--purple);
    }
</style>