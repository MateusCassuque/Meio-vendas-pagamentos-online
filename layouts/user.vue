<template>
    <v-app id="corpo">
        <v-main container>
            <Nuxt />
        </v-main>
    </v-app>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
    name: 'user',
    data() {
        return{
            token: false,
        }
    },
  
   methods:{ 
    async loadSessetion(){
      try {
        await this.actionCheckToken(this.auth)

        this.token = this.husToken

        if(!this.token){
          this.$router.push({name: 'auth-login'})
        }
      }
      catch (error) {
        this.token = this.husToken

        if(!this.token){
          this.$router.push({name: 'auth-login'})
        }
      }
    },

    ...mapActions('auth',['actionCheckToken', ]),
  },

  async mounted(){
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

<style>
</style>