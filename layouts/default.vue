<template>
  <v-app id="corpo-default">
    <Navbar />

    <v-main container>
        <Nuxt />
    </v-main>

    <!--Footer {Rodape}-->
    <!--v-footer :fixed="true" :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }} </span>
    </v-footer-->
  </v-app>
</template>

<script>

export default {
  name: 'DefaultLayout',
  //middleware: 'husAuth',
  data () {
    return {      
      itemsNavBotton: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-account-box',
          title: 'Cadastrar',
          to: 'register'
        },
        {
          icon: 'mdi-login',
          title: 'Entrar',
          to: 'login',
        },
      ],
    }
  },
}
</script>
<style scoped>
  .links{
    color: #FFF;
    margin-left: 30px;
  }
  #corpo-default{
    text-align: justify;
  }
</style>
