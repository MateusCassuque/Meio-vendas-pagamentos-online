<template>
  <div>
    <Users :users="users"/>
  </div>
</template>

<script>
import { api } from '@/store/services'
import Users from '@/components/user/usersCard.vue'

export default {
  name: 'InspirePage',

  head(){
    return{
      titleTemplate: '%s - USUÁRIOS',
      title: 'MVPO',
    }
  },   

  data(){
    return{
      users: '',
      api,
    }
  },

  components:{
    Users,
  },

  async fetch(){
    api.get('/auth').then(res => {
      this.users = res.data
    })
  },
}
</script>
