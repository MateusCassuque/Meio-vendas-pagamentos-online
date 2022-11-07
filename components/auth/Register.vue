<template>
  <v-card class="mx-auto" max-width="500" color="rgba(255, 255, 255, 0.9)">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar color="primary" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      
      <v-window-item :value="1">

        <v-card-text class="row col-12">

          <span class="col-12 text-caption grey--text text--darken-1">
            Dados de Usuário
          </span><br><br>
          
          <v-row class="col-12 mb-2">
            <v-text-field class="col-6" name="nome" label="Name" 
              v-model="nome" placeholder="Nome" 
              :rules="ruleName" hide-details="auto" prepend-inner-icon="mdi-account">
            </v-text-field> 

            <v-text-field class="col-6" name="sobreNome" label="Sobre Nome" 
              v-model="sobreNome" placeholder="Apelido" 
              :rules="ruleName" hide-details="auto">
            </v-text-field> 
          </v-row>

          <v-text-field class="col-12" name="email" type="email" label="Email" 
              v-model="user.email" placeholder="meuEmail@mvpo.com" 
              :rules="emailRules" prepend-inner-icon="mdi-email">
          </v-text-field>

          <v-text-field label="Password" type="password" 
            v-model="user.senha" :rules="rules" hide-details="auto"
            prepend-inner-icon="mdi-lock" class="col-6" name="senha">
          </v-text-field>

          <v-text-field label="Confirm Password" type="password" 
            v-model="confirSenha" prepend-inner-icon="mdi-lock" 
            class="col-6" name="confirmSenha">
          </v-text-field>

          <span class="col-12 message" v-show="message"> {{message}} </span>

        </v-card-text>

      </v-window-item>

      <v-window-item :value="2">

        <v-card-text>
          <v-card-title> Capa do Teu Negócio </v-card-title>
          <v-file-input prepend-icon="" prepend-inner-icon="mdi-camera" 
            show-size accept="image/*" name="fileCapa"
            id="fileCapa" @change="mostraImgCapa" class="ml-4">

            <template v-slot:label>
              <span>Capa</span>
            </template>

          </v-file-input>  
          
          <div v-show="(file || fileCapa)" id="quadro">
            <img src="" alt="texte" id="fotoPerfil">          
          </div>

          <v-card-title> Perfil </v-card-title>
          <v-file-input prepend-icon="" prepend-inner-icon="mdi-camera" 
            show-size accept="image/*" name="file"
            id="file" @change="mostraImg" class="ml-4">

            <template v-slot:label>
              <span> Perfil</span>
            </template>

          </v-file-input>  
          
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <v-card-text>
          <span class="text-caption grey--text text--darken-1">
            Dados Pessoas
          </span><br><br>

          <v-input disabled class="ml-4">Nome: &nbsp;
            <v-icon>mdi-account</v-icon>
            {{this.nome}}  {{this.sobreNome}}
          </v-input>
          <v-input disabled class="ml-4">usuário: &nbsp;
            <v-icon>mdi-account-box</v-icon>
            {{ this.sobreNome }}{{ this.nome }} 
          </v-input>

          <v-row class="col">
            <v-text-field type="date" class="col-5" name="idade" v-model="person.age"
              prepend-inner-icon="mdi-calendar" label="Data de nascimento">
            </v-text-field>

            <v-text-field type="text" class="col-7" name="identification"
              prepend-inner-icon="mdi-fingerprint" placeholder="B.I / acento nascimento"
              label="Nº de identificação (B.I)" v-model="person.identification">
            </v-text-field>
          </v-row>

          <v-row v-show="this.person.age" class="">
            <v-card class="col-12" color="rgba(255, 255, 255, 0.3)">
              
              <v-card-subtitle> <v-icon>mdi-home</v-icon> Endereço</v-card-subtitle>
             
              <v-card-text>
              
                <v-row class="col">
                  
                  <v-text-field v-model="pais" class="col-6" label="Pais" name="pais"
                    prepend-inner-icon="mdi-label">
                  </v-text-field>
                  
                  <v-text-field v-model="provincia" class="col-6" label="Província" name="cidade"></v-text-field>

                  <v-text-field v-model="municipio" class="col-6" label="Município" name="Municipio"></v-text-field>

                  <v-text-field v-model="bairro" class="col-6" label="Bairro / distrito" name="Bairro"></v-text-field>

                  <v-text-field v-model="rua" class="col-6" label="Rua" name="Rua"></v-text-field>

                  <v-text-field v-model="residencia" class="col-6" label="Residência" name="Residencia"></v-text-field>

                  <v-text-field v-model="referencia" class="" label="Referência" name="Referencia"></v-text-field>
               
                </v-row>
             
              </v-card-text>

            </v-card>

          </v-row>       

        </v-card-text>

      </v-window-item>

      <v-window-item :value="4">
        <div class="pa-4 text-center">

          <v-img
            class="mb-4 logaMarca"
            contain
            height="128"
            src="../img/icones/mao-pret-branco.png"
          ></v-img>

          <h3 class="text-h6 font-weight-light mb-2">
            Bem-vindo ao MVPO
          </h3>

          <span class="text-caption grey--text">
            Obrigado por se cadastrar no mvpo!
          </span>

        </div>
      </v-window-item>
    </v-window>
    
    <router-link to="/auth/login" class="ml-4 text-link" v-if="step === 1">
      <span class="text-caption">Tem conta? Click aqui para fazer login!</span>
    </router-link>
 
    <v-divider v-if="step != 3"></v-divider>

    <v-card-actions>
      <v-btn v-if="(step > 1 && step <= 3)" text @click="step--"> Voltar </v-btn>
      <v-spacer></v-spacer>
      
      <v-btn v-if="(step == 1)" color="primary" @click="nextStep()"> Proximo </v-btn>
      <v-btn v-if="(step == 2 )" color="primary" @click="salvarFoto()"> Proximo </v-btn>
      <v-btn v-show="step == 3" color="primary" @click="cadastrar"> Enviar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import { api } from '@/store/services.js'

  export default {
    data(){
      return{
        step: 1,
        confirSenha:'',
        nome: '',
        sobreNome: '',
        message: '',
        file: '',
        fileCapa: '',
        api,
        
        user:{
          userNome: '',
          email: '',
          senha: '',
        },
          
        person:{
          name: '',
          age: '',
          identification: '',
          photo: '',
          address: '',
        },

        pais: '',
        provincia: '',
        municipio: '',
        bairro: '',
        rua: '',
        residencia: '',
        referencia: '',
        
        rules: [
          
          value => !!value || 'Required.',
          value => (value && value.length >= 8) || 'Min 8 characters',

        ],

        ruleName: [
          
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',

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
      
      async nextStep(){

        this.message = ''

        if((this.nome == '') || (this.sobreNome == '')){
          return this.message = 'Preencha devidamente os Nomes!'
        }
          
        if((this.nome.length < 3) || (this.sobreNome.length < 3)){
          if(this.nome.length < 3){
            this.nome = ''
          }
          if(this.sobreNome.length < 3){
            this.sobreNome = ''
          }
          return this.message = 'Nome invalído!'
        }

        for(let i = 0; i < this.emailRules.length; i++){
          if(this.emailRules[i](this.user.email) != true){
            return this.message = 'email ' + this.emailRules[i](this.user.email)
          }
        }

        if((this.user.senha === '') || (this.user.senha != this.confirSenha)){
          
          this.confirSenha = ''
      
          return this.message = 'Por favor confirme a senha!'
          
        }

        this.user.userNome = this.sobreNome + this.nome
        this.person.name = this.nome + " " + this.sobreNome

        try {
          await this.actionUserRegister(this.user)
          this.step++
                  
        } catch (error) {
          this.step = 1
          
          if(error == 401){
            return this.message = 'Usuário já existe!'
          }

          return  this.message = 'Falha ao criar o registro'
        }
      },

      async salvarFoto(){
        try {
          let formDataPerfil = new FormData()
          let formDataCapa = new FormData()

          formDataPerfil.append('file', this.file)
          formDataCapa.append('file', this.fileCapa)

          const perfil = await api.post('/userImg/', 
            formDataPerfil, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res =>{}).catch(err => {
              console.log('Erro: ' + err)
            })

            const capa = await api.post('/userImg/capa/', 
            formDataCapa, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res =>{ }).catch(err => {
              console.log('Erro: ' + err)
            })
            
            this.step++

        } catch (error) {
          console.log(error)
        }
      },
      
      async cadastrar(){
        try {
          
          this.person.address = this.pais + '/' + this.provincia + '/' + this.municipio + '/' + this.bairro + '/' + this.rua + '/' + this.residencia + '/' +this.referencia

          await this.actionPersonRegister(this.person)

          this.step++
          this.message = ''

          setTimeout(() => {
            this.$router.push({name: 'auth-login'})
          }, 1500);
          
        } catch (error) {
            this.step = 2
            
            if(error == 401){
              return this.message = 'Já tem conta!'
            }

            if(error == 404){
              this.message = 'Usuário não encontrado!'
            }

            this.message = error.message
        }

      },

      mostraImg(e){

        try {
          const tgt = e.target || window.event.srcElement
          
          const files = tgt.files
          const fr = new FileReader()
          
          fr.onload = function(){
            document.querySelector('#fotoPerfil').src = fr.result
          }

          fr.readAsDataURL(files[0])

          this.file = files[0]
        } catch (error) {
          return console.log({Error: 'Error ao salvar a imagem ' + error})
        }
      },
      
      mostraImgCapa(e){

        try {
          const tgt = e.target || window.event.srcElement
          
          const files = tgt.files
          const fr = new FileReader()
          
          fr.onload = function(){
            document.querySelector('#quadro').style = `background-image: url(${fr.result});`
          }

          fr.readAsDataURL(files[0])

          this.fileCapa = files[0]
        } catch (error) {
          return console.log({Error: 'Error ao salvar a imagem ' + error})
        }
      },

      ...mapActions('auth', ['actionUserRegister', 'actionPersonRegister']),
    },

    mounted(){
      // this.showText('Enviar Foto de Perfil')
    },

    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Dados de Usuario'
          case 2: return 'Imagens de Usuario'
          case 3: return 'Dados Pessoais'
          case 4: return 'Conta criada com Sucesso'
          default: return 'Create Account'
        }
      },
    },
  }
</script>

<style scoped>
.logaMarca{
  transform: rotateZ(10deg);
  animation: turn 1.5s ease-out forwards .5s;
}

@keyframes turn {
  50% {
    transform: rotateZ(-20deg);
  }
}

.text-link{
  text-decoration: underline;
}
.text-link:hover{
  text-decoration: none;
}

#fotoPerfil{
  /** dimencionamento da imagem de perfil enviada pelo usuário*/
  width: 195px;
  height: 190px;

  /** Estilisão de borda com sombra e posicionameto */
  box-shadow: 0 0 5px black;
  border-radius: 100%;

/* Posicionamento da Imagem de redondaa */
  margin: auto;
  display: flex;  
}
#quadro{
  padding: 10px 80px;
  box-shadow: 0 0 3px black;
  margin: 0 auto 15px auto;
  height: 210px;

  /* Formatação do fundo da div, background da capa */
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
}

.message{
  color: rgb(255, 0, 0);
  padding: 0;
  margin: -10px auto -2px 12px;
  animation: error .5s ease-in-out .3s;
}

@keyframes error{
  0%{
    transform: translateX(0);
  }
  50%{
    transform: translateX(15px);
  }
  100%{
    transform: translateX(0);
  }
}
</style>