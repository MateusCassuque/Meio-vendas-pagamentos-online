<template>
    <v-card
    class="mx-auto"
    width="450"
    color="rgba(255, 255, 255, 0.9)"
  >
    <v-card-title class="">
      <span class="text-h6 font-weight-regular">Entrar</span> 
    </v-card-title>

    <v-window>
      <v-window-item>
          <v-card-text>
            <span class="text-caption grey--text text--darken-1">
                Insira os teus dados para fazer Login no MVPO
            </span>

            <div class="pa-4 text-center logo">
                <v-img contain src="../img/icones/mao-pret-branco.png" id="logaMarca"></v-img>
            </div>

            <v-text-field name="email" label="Email" type="text" v-model="login.email" 
            hide-details="auto" :rules="emailRules" placeholder="john@vuetifyjs.com"></v-text-field>

            <v-text-field label="Password" type="password" 
            :rules="rules" hide-details="auto" v-model="login.senha"></v-text-field>
            
          <span v-show="( login.senha.length == 0 )" class="text-caption red--text text--darken-1"> {{erro}} </span>
                
        </v-card-text>
      </v-window-item>
    </v-window>


    <v-divider></v-divider> 

    <v-card-actions>
      <router-link to="/auth/register" class="text-link">
        <span class="text-caption  grey--text text--darken-1">Não tenho uma conta!</span>
      </router-link>
      <v-spacer></v-spacer>
      
      <v-btn color="primary" depressed @click="entrar">

        <span v-if="mstPr">
          Enviar
        </span>
        
        <v-progress-circular
        v-if="!mstPr"
        :size="25"
        color="white"
        indeterminate
        ></v-progress-circular>

      </v-btn>
    </v-card-actions>
  </v-card>

</template>
<script>

import {mapActions} from 'vuex'

export default {
    name: 'login',
    data() {
        return{
          login: {
            email: '',
            senha: '',
            },

            mstPr: true,
            erro: '',

            rules: [
              value => !!value || 'Required.',
              value => (value && value.length >= 8) || 'Min 8 characters',
            ],
            emailRules: [
              value => !!value || 'Required.',
              value => (value && value.length >= 15) || 'Min 15 characters',
              value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
                },
              ],
        }
    },
    methods:{
        async entrar(){

          this.mstPr = false

          for(let i = 0; i < this.emailRules.length; i++){
            if(this.emailRules[i](this.login.email) != true){
              
              this.login.senha = ''
              this.erro = 'email ' + this.emailRules[i](this.login.email)
            
              return this.mstPr = true
            }
          }

          try {
            
            const dados = await this.actionLogin(this.login).then((res => {
              return res
            }))

            
            try {
              const txt = dados.toString()
              
              const txtErr = txt.substring(0,5)
  
              if(txtErr === 'Error'){
                const statusIndex = txt.indexOf('4')
                const status = txt.substring(statusIndex, statusIndex + 3)
  
                if(status == '401'){
                  this.login.senha = ''
                  this.erro = 'Verifica o email e Senha e tenta novamente!'
                  
                  return this.mstPr = true

                }else  if(status == '404'){

                  this.login.senha = ''
                  this.erro = 'Usuário não encontrado!'
                  return this.mstPr = true

                }else{

                  this.login.senha = ''
                  this.erro = 'Servidor temporariamente indisponivel!'

                  return this.mstPr = true
                }
              }
              
            } catch (error) {
              this.$router.push({name: 'product'})
            }
            
          } catch (error) {
            if (error == 'Error: Request failed with status code 401') {
            
              this.login.senha = ''
              this.erro = 'Verifica o email e Senha e tenta novamente'
              
            } else {
              this.login.senha = ''
              this.erro = 'Servico temporariamente indisponivel' + error
            }
          }
        },
        ...mapActions('auth', ['actionLogin']),
    },
}
</script>

<style scoped>
#logaMarca{
  height: 80px;
  transform: rotateZ(10deg);
  animation: turn 2.7s ease-out forwards 1.5s infinite;
}
@media (min-width: 680px) {
  #logaMarca{
    height: 120px;
  }
}

@keyframes turn {
  50% {
    transform: rotateZ(-20deg);
  }
}


</style>