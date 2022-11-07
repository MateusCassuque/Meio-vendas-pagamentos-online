<template>
    <div>
        <Register class="centro"/>
    </div>
</template>
<script>
import Register from '@/components/auth/Register.vue'
export default {
    name: 'register',
    head(){
        return{
        titleTemplate: '%s - CRIAR NOVO USUÁRIO',
        title: 'MVPO',
        }
    }, 
    components:{
        Register,
    },
    layout: 'auth',
    data() {
        return{

        }
    },
}
</script>

<style scoped>
.centro{
    margin: 10px auto 0 auto;
    max-width: 95%;
}
</style>