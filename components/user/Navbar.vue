<template>
    <div>
        <template>
            <v-app-bar color="#2991b9" density="compact" id="navbar-top">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                
                <v-app-bar-title>
                <div class="" id="">
                    <router-link class="nav-link d-none d-md-block " to="/product">
                        <img id="logo" :src="logo" alt="loga da MVD">
                    </router-link>
                    
                    <router-link class="nav-link d-md-none " to="/product">
                        <v-img :src="logo" id="logoFone"></v-img>
                    </router-link>
                </div>
                </v-app-bar-title>

                <v-spacer />
                
                 <nuxt-link :to="userLink">
                    <v-avatar v-if="fotoPerfil">
                        <img :src="require(`@/mvpo_back_End/tmp/uploads/files/img/user/${fotoPerfil}`)" id="fotoPerfil" alt="Foto do Usuário">
                    </v-avatar>
                        
                    <v-icon v-else x-large color="#FFF">mdi-account-circle</v-icon>
                </nuxt-link>
            </v-app-bar>
        </template>
        
        <template>
            
            <v-navigation-drawer color="#2991b9" v-model="drawer" temporary app>
                <v-list>
                    <v-list-item color="#ecf0f1" v-for="(item, i) in itemsDrawer" :key="i" :to="item.to" router exact>
                    <v-list-item-action>
                        <v-icon large color="#FFF"> {{item.icon}} </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                    </v-list-item>                    
                
                    <v-list-item to="/product/create" router color="#ecf0f1">
                        <v-list-item-action>
                            <v-icon large color="#FFF"> mdi-plus </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Crear Producto</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item @click="logout" color="#ecf0f1">
                        <v-list-item-action>
                            <v-icon large color="#FFF"> mdi-logout </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list>
            </v-navigation-drawer>
        </template>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import logo from '@/static/img/icones/mvpo3.png'
import { api } from '@/store/services.js'

export default {
    name: 'dasheboardNavbar',
    data() {
        return{
            user: null,
            api,
            fotoPerfil: '',
            userLink: '/user',
            logo,
            drawer: false,
            itemsDrawer: [
                {
                    icon: 'mdi-home',
                    title: 'Casa',
                    to: '/product',
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire',
                },
            ],

        }    
    },

    methods:{
        getUser(){
            this.user = this.$store.state.auth.user
            
            this.getAvatar()
        },

        getAvatar(){
            try {
                const dados = api.get('/userImg/perfil/' + this.user._id).then(res => {
                    this.fotoPerfil = res.data.key
                })

            } catch (error) {
                console.log(error)
            }
        },
        
        async logout(){
            await this.actionSignOut()

            this.$router.push({name: 'auth-login'})
        },

        ...mapActions('auth', ['actionSignOut']),
     },

    mounted(){
        this.getUser()
    }
}
</script>

<style scoped>
  img#logo{
    width: 150px; 
    padding-top: 4px;
    margin: 0;
  }
  #logoFone{
    width: 150px;
  }
  .links{
      margin: 0 auto;
      text-decoration: none;
      box-shadow: 0px 1px 0px rgba(255, 251, 251, 0.219);
  }
</style>