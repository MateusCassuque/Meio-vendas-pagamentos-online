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
    name: 'auth',
    data() {
        return{
            token: false,
            date: null,
            time: null,
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
        else{
          this.$router.push({name: 'product'})
        }
      }
      catch (error) {
        this.token = this.husToken

        if(!this.token){
          this.$router.push({name: 'auth-login'})
        }
        else{
          this.$router.push({name: 'product'})
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

<style scoped>
#corpo{
    background-color: rgba(0, 0, 0, 0.761);
}
@media (min-width: 880px) {
    #corpo{
        background-image: url('@/static/img/slid-banner/fundo-login1.jpg');
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center ;
    }
}
</style>