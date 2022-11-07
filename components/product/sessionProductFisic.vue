<template>
    <div id="principal">
        <v-container fluid>
                <v-row class="mx-auto">
                    <v-card class="col-md-4 my-4 mx-auto" max-width="350" v-for="product in produtos" :key="product._id">

                        <v-img v-if="product.foto" cover height="250" alt="Imagem do produto" :src="require(`@/mvpo_back_End/tmp/uploads/files/img/product/${product.foto}`)">
                            <v-card-title id="tituloFoto"> <span class="tituloFoto"> {{ product.name }} </span> </v-card-title>
                        </v-img>

                         <v-img v-else height="200" alt="Imagem do produto" :src="mvpoLogo">
                            <v-card-title> {{ product.name }} </v-card-title>
                        </v-img>
                            
                        <v-row align="center" class="mx-0 mt-4">
                            <v-rating :value="3" color="amber" dense half-increments readonly size="14"></v-rating>
                            <div class="grey--text ms-4"> 3 (3000) </div>
                        </v-row>

                        <v-card-subtitle class="pt-4"> <span>Preço: </span> {{ product.preco }} AOA </v-card-subtitle>
                        
                        
                       <v-card-text class="text--primary">
                            <div>
                                <p><span>Quantidade: </span> <span> {{ product.quantidade }} </span></p>
                            </div>
                            <div>
                                <span>Tipo de Produto:</span> <span>Físico</span>
                            </div>
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn color="orange" variant="text" :to="`/product/${product._id}`" route> Ver Detalhes </v-btn>
                            <v-btn color="orange" variant="text"> Comprar </v-btn> 
                        </v-card-actions>
                    </v-card>
                </v-row>

        </v-container>
    </div>
</template>

<script>
import mvpoLogo from '@/static/img/icones/mvpo3.png'

export default {
    name:'sectionProductFisical',

    props:{
        products: []
    },
    
    data(){
        return{
            produtos: '',
            mvpoLogo,
        }
    },

    methods:{
        getProductos(){
            setTimeout(() => {
                this.produtos = this.$props.products.reverse()
            }, 3500);
        }
    },

    mounted(){
        this.getProductos()
    },
}
</script>

<style scoped>
#tituloFoto .tituloFoto{
    color: white;
    background-color: rgba(0, 0, 0, 0.586);
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgb(255, 248, 248);
    margin: 85px auto;
    padding: 20px;
    font-size: 14px;
    text-transform: uppercase;
}
</style>