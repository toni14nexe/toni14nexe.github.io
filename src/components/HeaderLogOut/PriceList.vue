<template>
    <div >
        <div class="table-div">
            <div v-for="mainType in mainTypes" style="padding-bottom: 40px">
                <p v-if="mainType.exist == true" class="table-main-title">{{mainType.name}}</p>
                <div class="row">
                    <div v-if="mainType.name == 'Drinks' && mainType.exist == true" v-for="subType in drinksTypes" class="col-sm">
                        <a :href="'#'+subType.type">
                            <img :src="imageUrl[0]+subType.type+imageUrl[1]" class="product-img">
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div v-if="mainType.name == 'Food' && mainType.exist == true" v-for="subType in foodTypes" class="col-sm">
                        <a v-if="subType.exist" :href="'#'+subType.type">
                            <img :src="imageUrl[0]+subType.type+imageUrl[1]" class="product-img">
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-for="mainType in mainTypes" :id=mainType.type class="table-div">
            <p v-if="mainType.exist == true" class="table-main-title">{{mainType.name}}</p>
            <div v-if="mainType.name == 'Drinks' && mainType.exist == true" v-for="subType in drinksTypes" :id="subType.type">
                <p class="table-title">{{subType.name}}</p>
                <div class="d-flex justify-content-center">
                    <table v-if="subType.exist == true">
                        <tr>
                            <th style="text-align: left; padding-left: 10px;">Name</th>
                            <th>Amount</th>
                            <th style="text-align: right; padding-right: 10px;">Price</th>
                        </tr>
                        <tr v-for="product in productsList.data">
                            <td v-if="subType.type == product.type" style="text-align: left;">{{product.name}}</td>
                            <td v-if="subType.type == product.type">{{product.description}}</td>
                            <td v-if="subType.type == product.type" style="text-align: right;">{{product.price}} €</td>
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
                        </tr>
                        <tr v-for="product in productsList.data">
                            <td v-if="subType.type == product.type" style="text-align: left;">{{product.name}}</td>
                            <td v-if="subType.type == product.type" style="text-align: left;">{{product.description}}</td>
                            <td v-if="subType.type == product.type" style="text-align: right;">{{product.price}} €</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default{
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
                imageUrl: ['/src/assets/images/', '.jpeg']
            }
        },
        async mounted(){
            this.productsList = await axios.get('https://toni-web.com/thepurplehat/api')
            this.getProductsList()
        },
        methods:{
            getProductsList(){
                for(var i=0; i<this.productsList.data.length; i++){
                    if(this.productsList.data[i].mainType == 'drink'){
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
                    } 
                }
            }
        }
    }
</script>

<style>
    .table-div{
        align-items: center;
        background-color: var(--dark-gray);
        max-width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        border-radius: 20px;
        padding: 70px 25px 0px 25px;
        margin-top: 50px;
    }

    .table-main-title{
        color: white;
        font-size: 3rem;
        text-align: center;
        font-weight: 700;
    }

    .table-title{
        color: white;
        font-size: 2.1rem;
        padding-top: 75px;
        font-weight: 700;
    }

    table{
        color: white;
        text-align: center;
        width: 100%;
    }

    th{
        color: white;
        text-align: center;
        border-top: solid white 1px;
        border-bottom: solid white 1px;
        font-size: 1.3rem;
    }

    tr{
        color: white;
        text-align: center;
        font-size: 1.3rem;
    }

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
    }
</style>