<template>
    <div id="principal">
        <v-card v-if="product.user">
            <v-card-title>Vendedor</v-card-title>
            <v-card-subtitle>{{ product.user.userNome }}</v-card-subtitle>
            <small class="ml-4">{{ product.user.email }}</small>

                <v-card-text class="my-auto">
                    <v-img v-if="product.user.img_perfil_url" height="500" alt="Imagem do produto" 
                        :src="product.user.img_perfil_url">
                    </v-img>

                    <v-img v-else :src="imgTeste" contain max-height="250"></v-img>
                    
                </v-card-text>
                
                <v-card-actions>
                    <v-btn class="info" text :to="`/user/${product.user._id}`" router> Contactar Vendedor </v-btn>
                </v-card-actions>
        </v-card>
    </div>
</template>


<script>
import imgTeste from '@/static/img/icones/mvpo3.png'

export default {
    name: 'userCard',
    props: {
        produto: {}
    },

    data(){
        return{
            product: '',
            imgTeste,
        }
    },

    methods:{
        getProductos(){
            setTimeout(() => {
                this.product = this.$props.produto
            }, 1500);
        }
    },

    mounted(){
        this.getProductos()
    },
}
</script>

<style>
.principal #produto{
    border: solid 1px rgb(162, 172, 107);
    border-radius: 25px;
}
</style>