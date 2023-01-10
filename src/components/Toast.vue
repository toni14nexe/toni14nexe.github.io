<template>
    <Transition>
        <div :key="trigger" v-if="trigger > 0" class="toast">
            <button class="x-btn" @click="trigger = 0">x</button>
            <p>{{text}}</p>
        </div>
    </Transition>
</template>

<script>
    export default {
        props: [
            'text',
            'trigger'
        ]
    }
</script>

<style>
    .toast{
        position: fixed;
        top: 15%;
        right: 5%;
        background-color: var(--purple);
        color: white;
        min-width: 30%;
        min-height: 5%;        
        text-align: center;
        border-radius: 20px;
        padding-top: 1%;
        border: solid 2px white; 
        opacity: 0.85;
        z-index: 1;
    }

    .x-btn{
        position: fixed;
        top: 16.7%;
        border-radius: 50%;
        padding: 0px 20px 5px 10px;
        right: 5.8%;
        width: 20px;
        background: none;
        color: white;
        text-align: center;
        border-radius: 20px;
        border: none; 
        opacity: 0.85;
        z-index: 1;
        border: solid 1px white;
    }

    .x-btn:hover{
        cursor: pointer;
        transition: 0.3s ease;
        background-color: var(--pink);
    }

    /* Toast enter */
    .v-enter-from{
        opacity: 0;
        transform: translateY(-60px);
    }

    .v-enter-to{
        opacity: 1;
        transform: translateY(0px);
    }

    .v-enter-active{
        transition: all 0.3s ease;
    }

    /* Toast leave */
    .v-leave-from{
        opacity: 1;
        transform: translateY(0px);
    }

    .v-leave-to{
        opacity: 0;
        transform: translateY(-60px);
    }

    .v-leave-active{
        transition: all 0.3s ease;
    }

    @media screen and (max-width: 779px) {
        .toast{
            text-align: left !important;
            padding-left: 5px;
            padding-top: 15px;
            min-width: 70%;
        }
    }

    @media screen and (max-width: 312px) {
        .toast{
            margin-top: 50px;
        }

        .x-btn{
            margin-top: 50px;
        }
    }
</style>