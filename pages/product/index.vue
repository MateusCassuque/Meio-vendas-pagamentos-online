<template>
  <div>
    <KeepAlive>
      <SlidPrincipal/>
    </KeepAlive>
        
    <h2 class="text-caption text-md-h5 titulo"> {{ $store.state.auth.user.userNome }}, há produtos disponiveis perto de você! </h2>

    <KeepAlive>
      <TabProdutos/>
    </KeepAlive>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

import SlidPrincipal from '@/components/home/SlidPrincipal.vue'
import TabProdutos from '@/components/home/TabProdutos.vue'

export default {  
  components: { SlidPrincipal, TabProdutos },
  name: 'produts',

  head(){
    return{
      titleTemplate: '%s - HOME',
      title: 'MVPO',
    }
  }, 
 data () {
    return {
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
    ...mapGetters('auth',['husToken'])
  },

}
</script>

<style scoped>
#slid{
  padding: 0;
  margin: 0;
}
.titulo{
  padding: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>