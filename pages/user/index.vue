<template>
    <div>
        <Navbar />

        <v-card class="">
            <div id="capaPerfil">
                <v-img class="capa" alt="foto de capa" v-if="fotoCapa" :src="fotoCapa"></v-img>

                <v-img v-else alt="foto de capa" :src="fotoModelo" class="capa"></v-img>

                <img v-if="fotoPerfil" :src="fotoPerfil" alt="Foto de Perfil" id="perfil">
            </div>

            <v-card-title class="centro"> {{ $store.state.auth.user.userNome }}</v-card-title>

            <v-card-subtitle>
                <p class="subTitle"> {{ $store.state.auth.user.email }} </p>
            </v-card-subtitle>

            <v-card-text class="">
                <p class="descricao">
                    <span> {{ $store.state.auth.user._id }} </span>
                </p>
            </v-card-text>
        </v-card>

        <v-bottom-navigation class="nave">
            <v-btn-toggle>
                <v-btn class="actionBtn text-caption text-md-auto" to="/user/loja" router color="accent">
                    <span class="d-sm-block white--text">Lojas</span>
                    <v-icon class="white--text">mdi-store</v-icon>
                </v-btn>

                <v-btn class="actionBtn text-caption text-md-auto" color="accent">
                    <span class="d-sm-block white--text">compras</span>
                    <v-icon class="white--text">mdi-shopping</v-icon>
                </v-btn>

                <v-btn class="actionBtn text-caption text-md-auto" color="success">
                    <span class="d-sm-block white--text">vendas</span>
                    <v-icon class="white--text">mdi-wallet</v-icon>
                </v-btn>

                <v-btn class="actionBtn text-caption text-md-auto" to="/user/sobre" router color="secondary">
                    <span class="d-sm-block white--text">Sobre</span>
                    <v-icon class="white--text">mdi-help</v-icon>
                </v-btn>
            </v-btn-toggle>
        </v-bottom-navigation>

        <v-btn class="text-md-auto" width="100%" color="primary" to="/product/create" route>Criar Producto</v-btn>

        <v-progress-linear v-if="false" color="deep-purple accent-4" indeterminate rounded
            height="6"></v-progress-linear>

        <Products :products="products" />

    </div>
</template>

<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import fotoModelo from '@/static/img/slid-banner/computador-compras.jpg'

import Navbar from '@/components/user/Navbar.vue'
import Products from '@/components/user/Products.vue'

import { api } from '@/store/services.js'

export default {
    name: 'authDashboard',
    layout: 'user',

    head() {
        return {
            titleTemplate: '%s - PERFIL',
            title: 'MVPO',
        }
    },
    components: {
        Navbar,
        Products,
    },
    data() {
        return {
            fotoModelo,
            fotoCapa: '',
            fotoPerfil: '',
            user: '',
            person: '',
            token: false,
            api,
            products: [],
            message: '',
        }
    },


    fetch() {
        this.authUser()
        try {
            api.get('/products/user/' + this.user._id).then(res => {
                this.products = res.data

                this.getImages(this.products)
            })
        }
        catch (error) {
            this.message = error
        }
    },

    methods: {
        async loadSessetion() {
            try {
                await this.actionCheckToken(this.auth)

                this.token = this.husToken

                if (!this.token) {
                    this.$router.push({ name: 'auth-login' })
                }
            }
            catch (error) {
                this.token = this.husToken

                if (!this.token) {
                    this.$router.push({ name: 'auth-login' })
                }
            }

        },

        getImages(products) {
            products.forEach(product => {
                try {
                    api.get('/image/' + product.images[0]).then(res => {
                        product.foto = res.data.url
                    })
                } catch (error) {

                }
            })
        },

        authUser() {
            this.user = this.auth.user
            this.person = this.auth.person

            this.authImages(this.user._id)
        },

        authImages(id) {
            try {
                const perfil = api.get('/userImg/perfil/' + id).then(res => {
                    this.fotoPerfil = res.data.url
                })

                const capa = api.get('/userImg/capa/' + id).then(res => {
                    this.fotoCapa = res.data.url
                })

            } catch (error) {
                console.log(error)
            }
        },

        ...mapActions('auth', ['actionCheckToken',]),

    },

    async mounted() {
        this.loadSessetion()
        this.authUser()

    },

    computed: {
        ...mapGetters('auth', ['husToken']),
        ...mapState({
            auth: state => state.auth
        }),
    },
}
</script>

<style scoped>
.actionBtn {
    margin: 4px 20px;
    width: 100px;
}

.nave {
    justify-content: left;
    box-shadow: none;
    border-bottom: .2px solid rgb(209, 209, 209);
    margin-bottom: 30px;
}

.centro {
    display: flex;
    flex-direction: column;
}

.capa {
    max-height: 300px;
    color: rgb(92, 6, 6);
}

.descricao {
    text-align: center;
}

.subTitle {
    text-align: center;
}

#capaPerfil {
    position: relative;
}

#capaPerfil #perfil {
    /* Posicionamento do imagem circular para o perfil  */
    position: absolute;
    top: 44%;
    left: 30%;

    /** dimencionamento da imagem de perfil enviada pelo usuário*/
    width: 155px;
    height: 150px;

    /** Estilisão de borda com sombra e posicionameto */
    box-shadow: 0 0 5px black;
    border-radius: 100%;

    /* Posicionamento da Imagem de redondaa */
    margin: 0 auto;
    display: flex;
}

/*Formatação única para os PCs*/
@media(min-width: 720px) {
    #capaPerfil #perfil {
        /* Posicionamento do imagem circular para o perfil  */
        top: 40%;
        left: 45%;

        /** dimencionamento da imagem de perfil enviada pelo usuário*/
        width: 200px;
        height: 195px;
    }
}
</style>