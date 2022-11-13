<template>
    <div>
        <div v-if="modalImage == null">
            <div v-if="searchText" style="width: 100%">
                <div class="d-flex justify-content-center" style="width: 100%">
                    <h3 class="notification">Results for `{{searchText}}`:</h3>
                </div>
                <div v-for="value in users" :key="value.id" class="container">
                    <div class="top-row row">
                        <div class="col-2"></div>
                        <div class="col-8">
                            <table>
                                <tr class="row">
                                    <a @click="openImageModal(value.image, value.fullname, value.email)" href="#"><img class="icon" :src='value.image'></a>
                                    <td><a @click="openImageModal(value.image, value.fullname, value.email)" class="a" href="#"><h3 class="fix-margin">{{ value.fullname }}</h3></a></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-2"></div>
                    </div>
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-6 d-flex">
                            <i class="envelope-fix fa-solid fa-envelope"></i>
                            <h5 class="notification">{{ value.email }}</h5>
                        </div>
                        <div class="col-2">
                            <button class="my-btn fix-message-btn btn btn-outline-light btn-lg px-5">Message</button>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </div>

            </div>
            <h3 v-else class="notification a">No results...</h3>
        </div>

        <div v-else>
            <div class="container">
                <div class="row" style="padding-top: 50px">
                    <div class="col-1"></div>
                    <div class="col-5">
                        <h3 class="notification">{{selectedFullname}}</h3>
                        <i class="envelope-fix fa-solid fa-envelope" style="margin: 50px 0 0 0;"></i>
                        <h5 class="notification" style="display: inline; margin-left: 10px">{{ selectedEmail }}</h5>
                    </div>
                    <div class="col-5">
                        <div class="d-flex justify-content-center align-items-start">
                            <img class="image-modal" :src='modalImage'>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row d-flex justify-content-center">
                    <button @click="closeImageModal()" class="my-btn btn btn-outline-light btn-lg px-5" style="margin-top: 20px;">Close</button>
                </div>
            </div>            
        </div>

    </div>
</template>

<script>
    import mainUser from '../../assets/mainUser.js';

    export default {
        data(){
            return{
                users: [],
                modalImage: null,
                selectedFullname: null,
                selectedEmail: null
            }
        },
        mounted(){
            this.users = mainUser.getSearchUsers()

            window.history.pushState({}, document.title, "/");
        },
        props: ['searchText'],
        methods:{
            openMessage(userId){
                console.log(userId)
            },

            openImageModal(src, fullname, email){
                this.modalImage = src
                this.selectedFullname = fullname
                this.selectedEmail = email
                console.log(src)
            },

            closeImageModal(){
                this.modalImage = null
                this.selectedFullname = null
                this.selectedEmail = null
            }
        }
    }
</script>

<style scoped>
    .icon{
        max-width: 50px;
        max-height: 50px;
        border-radius: 50%;
        border: 2px solid;
        border-color: var(--gray-dark);
    }

    .icon:hover{
        border-color: var(--pink);
    }

    .top-row{
        margin-top: 40px;
    }

    .a{
        text-decoration: none;
    }

    .fix-margin{
        margin-top: 5px;
        margin-left: 10px;
    }

    .image-modal{
        height: 100%;
        max-height: 50vh;
        width: auto;
        max-width: 80%;
    }

    .envelope-fix{
        color: white;
        font-size: 25px;
        margin-left: 45px;
        margin-right: 10px;
    }

    .fix-message-btn{
        margin-top: -25px;
    }
</style>