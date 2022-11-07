<template>
  <div id="centro">
    <img :src="logo" alt="Logo do MVPO" class="logo">
    <h1 id="el"></h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

import logo from '@/static/img/icones/mvpo4.png'

export default {
  layout: 'load', 

  head(){
    return{
      titleTemplate: '%s - VERIFICANDO',
      title: 'MVPO',
    }
  }, 

  name: 'IndexPage',
  data() {
    return{
      token: false,
      logo,
      text: 'Seja muito bem-Vindo',
      interval: 150,
    }
  },
    
  methods:{

    showText(){
      const pr = document.querySelector('#el')

      const char = this.text.split("").reverse()

      const typer = setInterval(() => {
        if(!char.length){
          return clearInterval(typer)
        }
        
        const next  = char.pop()

        pr.innerHTML += next

      }, this.interval);
    },

    async loadSessetion(){
      try {
        await this.actionCheckToken(this.auth)

        this.token = this.husToken

        if(!this.token){
          setTimeout(() => {
            this.$router.push({name: 'auth-login'})
          }, 5000);
        }
        else{
          setTimeout(() => {
            this.$router.push({name: 'product'})
          }, 5000);
        }

      } 
      catch (error) {
        this.token = this.husToken

        if(!this.token){
          setTimeout(() => {
            this.$router.push({name: 'auth-login'})
          }, 5100);
        }
        else{
          setTimeout(() => {
            this.$router.push({name: 'product'})
          }, 5100);
        }
      }
    },

    ...mapActions('auth',['actionCheckToken', ]),
  },

  async mounted(){
    this.showText()
    this.loadSessetion()
  },

  computed:{
    ...mapState({
      auth: state => state.auth
    }),
    ...mapGetters('auth',['husToken'])
  },
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  display: flex;
}

#centro{
  padding-top: 3%;
  margin: 250px auto 0 auto;
  max-width: 90%;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0px 0px 6px 0px rgba(255, 255, 255, 0.452);
}

#centro img{
  max-width: 300px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float{
  0%{
    transform: translateY(0);
  }
  50%{
    transform: translateY(-25px);
  }
  100%{
    transform: translateY(0);
  }
}

h1{
  color: white;
}
#slid{
  padding: 0;
  margin: 0;
}
.titulo{
  padding: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

@media(min-width: 768px){
  #centro img{
    max-width: 600px;
  }
  #centro{
    max-width: 50%;
  }
}
</style>