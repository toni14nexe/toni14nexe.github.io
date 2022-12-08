<template>
    <div class="d-flex flex-row justify-content-center mt-4">
        <h1 class="title title-admin" style="font-size: 2.5rem;">Products</h1>
    </div>
    <div class="d-flex flex-row justify-content-center mt-2">
        <h3 class="a mx-3" @click="component = 'add'" :class="{active: component == 'add'}">Add</h3>
        <div class="vl"></div>
        <h3 class="a mx-3" @click="component = 'edit'" :class="{active: component == 'edit'}">Edit</h3>
        <div class="vl"></div>
        <h3 class="a mx-3" @click="component = 'delete'" :class="{active: component == 'delete'}">Delete</h3>
    </div>
    <div v-if="component == 'add'" class="mt-5">
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <select v-model="drinkOrFood">
                <option value="drink" class="text-center">Drink</option>
                <option value="food" class="text-center">Food</option>
            </select>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div v-if="drinkOrFood == 'drink'">
                <div class="d-flex flex-row justify-content-end">
                    <h3 class="small-title">Name:</h3>
                    <input class="ml-4" type="text" v-model="drinkName">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Price (€):</h3>
                    <input class="ml-4" type="number" min="0" v-model="drinkPrice">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Amount:</h3>
                    <select v-model="drinkAmount" class="ml-4">
                        <option value="cup" class="text-center">Cup</option>
                        <option value="glass" class="text-center">Glass</option>
                        <option value="0.03l" class="text-center">0.03l</option>
                        <option value="0.2l" class="text-center">0.2l</option>
                        <option value="0.33l" class="text-center">0.33l</option>
                        <option value="0.5l" class="text-center">0.5l</option>
                        <option value="1.0l" class="text-center">1.0l</option>
                    </select>
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Type:</h3>
                    <select v-model="drinkType" class="ml-4">
                        <option value="hot" class="text-center">Hot</option>
                        <option value="juice" class="text-center">Juice</option>
                        <option value="beer" class="text-center">Beer</option>
                        <option value="alcohol" class="text-center">Alcohol</option>
                        <option value="wine" class="text-center">Wine</option>
                    </select>
                </div>
                <div class="d-flex flex-row mt-5 justify-content-center">
                    <button 
                        :disabled="(!drinkName.length || drinkPrice<=0 || !drinkAmount.length || !drinkType.length)" 
                        class="my-btn" @click="add()">Add</button
                    >
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div v-if="drinkOrFood == 'food'">
                <div class="d-flex flex-row justify-content-end">
                    <h3 class="small-title">Name:</h3>
                    <input class="ml-4" type="text" v-model="foodName">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Price (€):</h3>
                    <input class="ml-4" type="number" v-model="foodPrice">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Description:</h3>
                    <input class="ml-4" type="text" v-model="foodDescription">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Type:</h3>
                    <select v-model="foodType" class="ml-4">
                        <option value="soup" class="text-center">Soup</option>
                        <option value="pizza" class="text-center">Pizza</option>
                        <option value="grill" class="text-center">Grill</option>
                        <option value="dish" class="text-center">Dish</option>
                        <option value="dessert" class="text-center">Dessert</option>
                    </select>
                </div>
                <div class="d-flex flex-row mt-5 justify-content-center">
                    <button 
                        :disabled="(!foodName.length || foodPrice<=0 || !foodType.length || !foodDescription.length)" 
                        class="my-btn" @click="add()">Add</button
                    >
                </div>
            </div>
        </div>
    </div>
    <div v-if="component == 'edit'" class="mt-5">
        <div class="d-flex flex-row justify-content-center mb-5 text-center">
            <select v-model="drinkOrFoodEdit">
                <option value="drink" class="text-center">Drink</option>
                <option value="food" class="text-center">Food</option>
            </select>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div v-if="drinkOrFoodEdit == 'drink'">
                <div class="d-flex flex-row justify-content-end">
                    <h3 class="small-title">Name:</h3>
                    <input class="ml-4" type="text" v-model="drinkNameEdit">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Price (€):</h3>
                    <input class="ml-4" type="number" min="0" v-model="drinkPriceEdit">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Amount:</h3>
                    <select v-model="drinkAmountEdit" class="ml-4">
                        <option value="cup" class="text-center">Cup</option>
                        <option value="glass" class="text-center">Glass</option>
                        <option value="0.03l" class="text-center">0.03l</option>
                        <option value="0.2l" class="text-center">0.2l</option>
                        <option value="0.33l" class="text-center">0.33l</option>
                        <option value="0.5l" class="text-center">0.5l</option>
                        <option value="1.0l" class="text-center">1.0l</option>
                    </select>
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Type:</h3>
                    <select v-model="drinkTypeEdit" class="ml-4">
                        <option value="hot" class="text-center">Hot</option>
                        <option value="juice" class="text-center">Juice</option>
                        <option value="beer" class="text-center">Beer</option>
                        <option value="alcohol" class="text-center">Alcohol</option>
                        <option value="wine" class="text-center">Wine</option>
                    </select>
                </div>
                <div class="d-flex flex-row mt-5 justify-content-center">
                    <button 
                        :disabled="(!drinkNameEdit.length || drinkPriceEdit<=0 || !drinkAmountEdit.length || !drinkTypeEdit.length)" 
                        class="my-btn" @click="edit()">Edit</button
                    >
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div v-if="drinkOrFoodEdit == 'food'">
                <div class="d-flex flex-row justify-content-end">
                    <h3 class="small-title">Name:</h3>
                    <input class="ml-4" type="text" v-model="foodNameEdit">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Price (€):</h3>
                    <input class="ml-4" type="number" v-model="foodPriceEdit">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Description:</h3>
                    <input class="ml-4" type="text" v-model="foodDescriptionEdit">
                </div>
                <div class="d-flex flex-row mt-2 justify-content-end">
                    <h3 class="small-title">Type:</h3>
                    <select v-model="foodTypeEdit" class="ml-4">
                        <option value="soup" class="text-center">Soup</option>
                        <option value="pizza" class="text-center">Pizza</option>
                        <option value="grill" class="text-center">Grill</option>
                        <option value="dish" class="text-center">Dish</option>
                        <option value="dessert" class="text-center">Dessert</option>
                    </select>
                </div>
                <div class="d-flex flex-row mt-5 justify-content-center">
                    <button 
                        :disabled="(!foodNameEdit.length || foodPriceEdit<=0 || !foodTypeEdit.length || !foodDescriptionEdit.length)" 
                        class="my-btn" @click="edit()">Edit</button
                    >
                </div>
            </div>
        </div>
    </div>









    <div v-if="component == 'delete'" class="mt-5">
        <div class="d-flex flex-row justify-content-center mb-2 text-center">
            <select v-model="drinkOrFoodDelete">
                <option value="drink" class="text-center">Drink</option>
                <option value="food" class="text-center">Food</option>
            </select>
        </div>
        <div v-if="drinkOrFoodDelete == 'drink'" 
            class="d-flex flex-row justify-content-center mb-2 text-center" 
            style="margin-right: 24px"
        >
        <select v-model="drinkTypeDelete" class="ml-4">
            <option value="hot" class="text-center">Hot</option>
            <option value="juice" class="text-center">Juice</option>
            <option value="beer" class="text-center">Beer</option>
            <option value="alcohol" class="text-center">Alcohol</option>
            <option value="wine" class="text-center">Wine</option>
        </select>
        </div>
        <div v-if="drinkOrFoodDelete == 'drink'"
            class="d-flex flex-row justify-content-center mb-5 text-center" 
            style="margin-right: 24px"
        >
            <select v-model="drinkDelete" class="ml-4" :disabled="!drinkTypeDelete.length">
                <option value="sok1" class="text-center">sok1</option>
                <option value="sok2" class="text-center">sok2</option>
                <option value="sok3" class="text-center">sok3</option>
            </select>
        </div>
        <div v-if="drinkOrFoodDelete == 'drink'" class="d-flex flex-row justify-content-center">
            <button :disabled="(!drinkTypeDelete.length || !drinkDelete.length)" class="my-btn" @click="deleteItem">Delete</button>
        </div>
        <div v-if="drinkOrFoodDelete == 'food'" 
            class="d-flex flex-row justify-content-center mb-2 text-center" 
            style="margin-right: 24px"
        >
        <select v-model="foodTypeDelete" class="ml-4">
            <option value="soup" class="text-center">Soup</option>
            <option value="pizza" class="text-center">Pizza</option>
            <option value="grill" class="text-center">Grill</option>
            <option value="dish" class="text-center">Dish</option>
            <option value="dessert" class="text-center">Dessert</option>
        </select>
        </div>
        <div v-if="drinkOrFoodDelete == 'food'" 
            class="d-flex flex-row justify-content-center mb-5 text-center" 
            style="margin-right: 24px"
        >
            <select v-model="foodDelete" class="ml-4" :disabled="!foodTypeDelete.length">
                <option value="hrana1" class="text-center">hrana1</option>
                <option value="hrana2" class="text-center">hrana2</option>
                <option value="hrana3" class="text-center">hrana3</option>
            </select>
        </div>
        <div v-if="drinkOrFoodDelete == 'food'" class="d-flex flex-row justify-content-center">
            <button :disabled="(!foodTypeDelete.length || !foodDelete.length)" class="my-btn" @click="deleteItem">Delete</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                component: null,
                drinkOrFood: null,
                drinkOrFoodEdit: null,
                drinkOrFoodDelete: null,
                drinkType: null,
                drinkTypeEdit: null,
                drinkTypeDelete: '',
                drinkDelete: '',
                foodName: '',
                foodNameEdit: '',
                foodPrice: null,
                foodPriceEdit: null,
                foodDescription: '',
                foodDescriptionEdit: '',
                foodType: '',
                foodTypeEdit: '',
                foodTypeDelete: '',
                foodDelete: '',
                drinkName: '',
                drinkNameEdit: '',
                drinkPrice: null,
                drinkPriceEdit: null,
                drinkAmount: '',
                drinkAmountEdit: '',
                drinkType: '',
                drinkTypeEdit: ''
            }
        },
        methods:{
            add(){
                console.log('add')
            },

            edit(){
                console.log('edit')
            },

            deleteItem(){
                console.log('delete')
            }
        }
    }
</script>

<style scoped>
    .a:hover{
        cursor: pointer;
    }

    input{
        border-radius: 50px;
        min-width: 250px;
    }

    select{
        border-radius: 50px;
        min-width: 250px;
        height: 35px;
        color: var(--dark-gray);
    }

    input{
        text-align: center;
    }

    .my-btn{
        border-color: var(--purple);
        min-width: 150px;
        max-width: 150px;
    }

    .my-btn:hover{
        cursor: pointer;
    }

    button:disabled{
        color: var(--dark-gray);
    }
</style>