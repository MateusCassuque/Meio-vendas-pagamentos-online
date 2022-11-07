<template>
  <div>
 
 <v-card max-width="auto" class="mx-auto">
    <v-toolbar color="cyan" dark>
      <v-toolbar-title>Usuáros</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-card-subtitle>Novo-Antigo</v-card-subtitle>

      <v-list-item three-line color="#ecf0f1" v-for="(user, i) in usuarios" :key="i" :to="baseLink + user._id" router exact>
        
        <v-list-item-avatar color="red">
          <img :src="require(`@/mvpo_back_End/tmp/uploads/files/img/user/${user.foto}`)" 
          id="fotoPerfil" alt="Foto do Usuário" v-if="user.foto">

          <v-icon v-else color="#FFF" large>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Nome: {{user.userNome}}</v-list-item-title>
          <span class="text-primary"> Email: {{user.email}}</span>
        
            <v-divider></v-divider>
        </v-list-item-content>

      </v-list-item>

    </v-list>

  </v-card>

  </div>
</template>

<script>
export default {
  name: 'usersCard', 

  props:{
      users: []
  },

  data(){
    return{
      baseLink: '/user/',
      usuarios: '',
    }
  },
  
    methods:{
        getusers(){
            setTimeout(() => {
                this.usuarios = this.$props.users.reverse()
            }, 3500);
        }
    },     

    mounted(){
        this.getusers()
    },    

}
</script>
