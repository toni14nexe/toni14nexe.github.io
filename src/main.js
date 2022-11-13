import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import NotFound from './components/NotFound.vue'
import Main from './components/Main.vue'
import MainUser from './components/MainUser.vue'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/mainUser',
        component: MainUser
    },
    {
        path: '/:notFound(.*)',
        component: NotFound
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app');

//installations

//npm i vue-router --save
//npm install bootstrap
//npm i --save @fortawesome/fontawesome-svg-core
//npm install vue-cookies
//npm install crypto-js
//npm install axios
//npm install json-server -g

//to run db server: json-server dbMenu.json