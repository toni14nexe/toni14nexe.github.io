<template>
        <span class="loader"></span>
        <h1 class="centered">{{countDown}}</h1>
        <h1 class="centered-text">Order code:</h1>
        <h1 class="centered-number">{{code}}</h1>
</template>

<script>
    import sql from '../../assets/sql'

    export default {
        props:['token', 'code'],
        data(){
            return{
                countDown: 60
            }
        },
        methods:{
            countDownTimer () {
                if (this.countDown == 0) {
                    window.location = sql.UpdateOrderCode() + '?lastCode=' + this.code + '&token=' + this.token
                }
                else if (this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            }
        },
        created () {
            this.countDownTimer()
        }
    }
</script>

<style scoped>
    div{
        width: 100%;
        background-color: bisque;
    }

    .centered {
        position: absolute;
        top: 40%;
        left: 25%;
        transform: translate(-50%, -50%);
    }

    .centered-number{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1000%;
    }

    .centered-text{
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 500%;
    }

    h1{
        font-size: 500%;
        color: #f361fb
    }

    .loader {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 47%;
        left: 24.5%;
        background: #FFF;
        box-shadow: -24px 0 #FFF, 24px 0 #FFF;
        box-sizing: border-box;
        animation: shadowPulse 2s linear infinite;
    }

    @keyframes shadowPulse {
        33% {
            background: #FFF;
            box-shadow: -24px 0 #f361fb, 24px 0 #FFF;
        }
        66% {
            background: #f361fb;
            box-shadow: -24px 0 #FFF, 24px 0 #FFF;
        }
        100% {
            background: #FFF;
            box-shadow: -24px 0 #FFF, 24px 0 #f361fb;
        }
    }

</style>