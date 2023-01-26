<template>
    <header>
        <template>
            <v-app-bar color="#2991b9" density="compact" id="navbar-top">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                
                <v-app-bar-title>
                <div class="" id="">
                    <router-link class="nav-link d-none d-md-block " to="/product"><img id="logo" :src="logo" alt="loga da MVD"></router-link>
                    
                    <router-link class="nav-link d-md-none " to="/product">
                    <v-img :src="logo" id="logoFone"></v-img>
                    </router-link>
                </div>
                </v-app-bar-title>

                <v-spacer />

                <v-btn icon x-large color="#FFF">
                <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <nuxt-link :to="userLink">
                    <v-avatar v-if="fotoPerfil">
                        <img :src="fotoPerfil" id="fotoPerfil" alt="Foto do Usuário">
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

                <v-list-item color="#ecf0f1" :to="userLink" router exact>
                    <v-list-item-action>
                        <v-icon large color="#FFF"> mdi-account-box </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Perfil</v-list-item-title>
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

        <template>
            <v-app-bar class="d-block d-sm-none" id="navbar-botton" density="compact" color="#2991b9">
                <router-link v-for="(link, i) in itemsDrawer" :key="i" :to="link.to" class="links"><v-icon class="plus">{{link.icon}}</v-icon></router-link>
                <router-link to="/product/create" class="links"><v-icon class="plus" id="plus">mdi-plus</v-icon></router-link>
                <span @click="logout" class="links"><v-icon class="plus" id="plus">mdi-logout</v-icon></span>
            </v-app-bar>
        </template>
    </header>
</template>
<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import logo from '@/static/img/icones/mvpo3.png'
import { api } from '@/store/services.js'

export default({
    name: 'Navbar',
    data() {
        return{
            logo,
            api,
            fotoPerfil: '',
            user: null,
            userLink: '/user',
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
        authUser() {
            this.user = this.auth.user
            this.person = this.auth.person
            this.getAvatar(this.user)
        },

        getAvatar(user){
            try {
                this.fotoPerfil = user.img_perfil_url
            } catch (error) {                
                console.log(error)
            }
        },

        async logout(){
            await this.actionSignOut()

            this.$router.push({name: 'auth-login'})
        },

        ...mapActions('auth', ['actionSignOut'])
    },
    
    fetch(){
        this.authUser()
    },
    
    mounted(){
        this.authUser()
    },

    computed: {
        ...mapState({
            auth: state => state.auth
        }),
    },
})

</script>

<style scoped>
  #navbar-botton .plus{
    color: rgb(19, 106, 137);
    background-color: #FFF;
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
  #navbar-botton,
  #navbar-top{
      box-shadow: none;
  }
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
  }
</style>
