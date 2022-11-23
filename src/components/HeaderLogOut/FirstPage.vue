<template>
    <div class="main">
        <div class="image-div">
            <img class="hiding-large" v-if="slideImage == 1" src="../../assets/images/wallpaper1.jpeg">
            <img class="hiding-large" v-if="slideImage == 2" src="../../assets/images/wallpaper2.jpeg">
            <img class="hiding-large" v-if="slideImage == 3" src="../../assets/images/wallpaper3.jpeg">
            <img class="hiding-small" v-if="slideImage == 1" src="../../assets/images/wallpaper1small.jpeg">
            <img class="hiding-small" v-if="slideImage == 2" src="../../assets/images/wallpaper2small.jpeg">
            <img class="hiding-small" v-if="slideImage == 3" src="../../assets/images/wallpaper3small.jpeg">
            <img class="hiding-xs" v-if="slideImage == 1" src="../../assets/images/wallpaper1xs.jpeg">
            <img class="hiding-xs" v-if="slideImage == 2" src="../../assets/images/wallpaper2xs.jpeg">
            <img class="hiding-xs" v-if="slideImage == 3" src="../../assets/images/wallpaper3xs.jpeg">
            <img class="hiding-xxs" v-if="slideImage == 1" src="../../assets/images/wallpaper1xxs.jpeg">
            <img class="hiding-xxs" v-if="slideImage == 2" src="../../assets/images/wallpaper2xxs.jpeg">
            <img class="hiding-xxs" v-if="slideImage == 3" src="../../assets/images/wallpaper3xxs.jpeg">
            <img class="laptop" v-if="slideImage == 1" src="../../assets/images/wallpaper1laptop.jpeg">
            <img class="laptop" v-if="slideImage == 2" src="../../assets/images/wallpaper2laptop.jpeg">
            <img class="laptop" v-if="slideImage == 3" src="../../assets/images/wallpaper3laptop.jpeg">
        </div>

        <div class="overlay">
            <h1 id="image-text">Let Your Food To Be Your Medicine!</h1>
            <a href="#"><i @click="slideImage = 1" v-if="slideImage != 1" class="fa-solid fa-circle-notch dot"></i></a>
            <a href="#"><i v-if="slideImage == 1" class="fa-solid fa-circle dot"></i></a>
            <a href="#"><i @click="slideImage = 2" v-if="slideImage != 2" class="fa-solid fa-circle-notch dot"></i></a>
            <a href="#"><i v-if="slideImage == 2" class="fa-solid fa-circle dot"></i></a>
            <a href="#"><i @click="slideImage = 3" v-if="slideImage != 3" class="fa-solid fa-circle-notch dot"></i></a>
            <a href="#"><i v-if="slideImage == 3" class="fa-solid fa-circle dot"></i></a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                slideImage: 1
            }
        },
        methods:{
            changeSlideImage() {
                if(this.slideImage < 3) this.slideImage++
                else this.slideImage = 1
                setTimeout(this.changeSlideImage, 7000)
            },
        },
        created(){
            this.changeSlideImage()
        }
    }
</script>

<style scoped>
    .main{
        height: calc(100vh - 73.5px);
        margin-bottom: -32px;
    }
    .image-div{
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        height: 100%;
        max-height: 100%;
    }

    img{
        margin-top: -0.4rem;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        height: 100%;
        max-height: 100%;
    }

    .dot{
        color: white;
        margin-left: 5px;
        margin-right: 5px;
    }

    .overlay{
        position: absolute;
        bottom: 0rem;
        color: white;
        width: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        height: 15rem;
        padding-top: 4.5rem;
    }

    .hiding-large{
        transition: ease-in 0.3s;
        display: inherit;
        animation:opac 2s}@keyframes opac{from{opacity:0} to{opacity:1}
    }

    .hiding-small{
        transition: ease-in 0.3s;
        display: none;
        animation:opac 2s}@keyframes opac{from{opacity:0} to{opacity:1}
    }

    .hiding-xs{
        transition: ease-in 0.3s;
        display: none;
        animation:opac 2s}@keyframes opac{from{opacity:0} to{opacity:1}
    }

    .hiding-xxs{
        transition: ease-in 0.3s;
        display: none;
        animation:opac 2s}@keyframes opac{from{opacity:0} to{opacity:1}
    }

    .laptop{
        transition: ease-in 0.3s;
        display: none;
        animation:opac 2s}@keyframes opac{from{opacity:0} to{opacity:1}
    }

    @media screen and (max-width: 1600px) {
        #image-text{
            font-size: 1.6rem;
        }

        .hiding-large{
            display: none;
        }

        .hiding-small{
            display: inherit;
        }

        .hiding-xs{
            display: none;
        }

        .hiding-xxs{
            display: none;
        }

        .laptop{
            display: none
        }
    }

    @media screen and (max-width: 900px) {
        .hiding-large{
            display: none;
        }

        .hiding-small{
            display: none;
        }

        .hiding-xs{
            display: inherit;
        }

        .hiding-xxs{
            display: none;
        }

        .laptop{
            display: none
        }
    }

    @media screen and (
    max-width: 1600px) and (max-height: 1000px) and 
    (min-width: 1300px) and (min-height: 700px) {
        .hiding-large{
            display: none;
        }

        .hiding-small{
            display: none;
        }

        .hiding-xs{
            display: none;
        }

        .hiding-xxs{
            display: none;
        }

        .laptop{
            display: inherit
        }
    }

    @media screen and (max-width: 415px) {
        .hiding-large{
            display: none;
        }

        .hiding-small{
            display: none;
        }

        .hiding-xs{
            display: none;
        }

        .hiding-xxs{
            display: inherit;
        }

        .laptop{
            display: none
        }
    }
</style>