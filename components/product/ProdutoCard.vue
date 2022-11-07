<template>
    <div class="principal">
        <v-card id="produto">
                
                <v-img v-if="product.foto" height="500" alt="Imagem do produto" 
                    :src="require(`@/mvpo_back_End/tmp/uploads/files/img/product/${product.foto}`)">
                </v-img>
                        
                <v-img v-else height="300" alt="Imagem do produto" :src="imgTeste"></v-img>
                
                <v-card-title> {{ product.name }} </v-card-title>
                        
                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="grey--text ms-4"> 4.5 (413) </div>
                    </v-row>
                            
                    <div class="my-4 text-subtitle-1"> <span>Preço: </span>  <strong> {{ product.preco }} AOA</strong></div>
                    <div v-if="product.description"> {{ product.description.detalhe }} </div>
                </v-card-text>
                        
                <v-divider class="mx-4"></v-divider>
                        
                <v-card-actions>
                    <v-btn class="success ml-4" text router>Comprar</v-btn>
                </v-card-actions>
            </v-card>
    </div>
</template>

<script>
import imgTeste from '@/static/img/icones/mvpo3.png'

export default {
    name: 'produtoCard',
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
            }, 1000);
        }
    },

    mounted(){
        this.getProductos()
    },
}
</script>

<style>
.principal #produto{
    border: solid 1px rgba(162, 172, 107, 0.835);
    border-radius: 25px;
}
</style>