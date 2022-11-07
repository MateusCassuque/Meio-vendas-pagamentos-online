<template>
    <v-app id="corpo">
        <v-main container>
            <Nuxt />
        </v-main>
    </v-app>
</template>

<script>
import fundo from '@/static/img/slid-banner/fundologin3.jpg'
    
export default {
    name: 'load',
    data() {
        return{
            fundo,
        }
    },
}
</script>

<style scoped>

#corpo{
    background-color: rgb(25, 116, 152);
    color: white;
}

@media (min-width: 720px) { }
</style>