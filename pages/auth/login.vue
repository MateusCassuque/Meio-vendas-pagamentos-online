<template>
    <div class="centro">
        <Login/>
        <br/><br/>
    </div>
</template>
<script>
import Login from '@/components/auth/Login.vue'

export default {
    name:'login',
    head(){
        return{
        titleTemplate: '%s - LOGIN',
        title: 'MVPO',
        }
    }, 
    components:{
        Login,
    },
    layout: 'auth',
    data() {
        return{}
    },
}
</script>

<style scoped>
.centro{
    margin: 90px auto 0 auto;
    max-width: 95%;
}
</style>